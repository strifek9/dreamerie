import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test, type TestContext } from 'node:test'
import { createService } from '../server/http.ts'
import { openStore } from '../server/store.ts'
import { advanceDueRoom } from '../server/scheduler.ts'
import { initializeLifecycle, LOBBY_LIFETIME_MS, RECAP_RETENTION_MS } from '../server/roomLifecycle.ts'
import type { RoomView, SessionView } from '../shared/rooms.ts'
import type { GameAction } from '../shared/game.ts'
import { readGame } from '../server/gameState.ts'

const origin = 'http://127.0.0.1:5173'
type App = Awaited<ReturnType<typeof createService>>
interface User { cookie: string; csrf: string }
const post = (app: App, user: User, url: string, payload: object) => app.inject({ method: 'POST', url, headers: { origin, cookie: user.cookie, 'x-dreamerie-csrf': user.csrf }, payload })
async function user(app: App): Promise<User> {
  const response = await app.inject({ method: 'POST', url: '/api/session', headers: { origin }, payload: {} })
  assert.equal(response.statusCode, 200)
  return { cookie: `dreamerie_session=${response.cookies[0].value}`, csrf: response.json<SessionView>().csrfToken }
}
async function view(app: App, user: User, id: string) {
  const response = await app.inject({ url: `/api/rooms/${id}`, headers: { cookie: user.cookie } })
  assert.equal(response.statusCode, 200, response.body)
  return response.json<RoomView>()
}
async function act(app: App, user: User, id: string, action: GameAction) {
  const room = await view(app, user, id)
  return post(app, user, `/api/rooms/${id}/commands`, { requestId: randomUUID(), expectedRevision: room.revision,
    weekId: room.game?.weekId ?? null, roundId: room.game?.roundId ?? null, action })
}
async function fixture(t: TestContext, interval = 60_000) {
  const directory = mkdtempSync(join(tmpdir(), 'dreamerie-lifecycle-'))
  const databasePath = join(directory, 'rooms.sqlite')
  const clock = { now: Date.parse('2026-09-01T18:00:00Z') }
  const options = { databasePath, origin, rateLimits: false, now: () => clock.now, schedulerIntervalMs: interval }
  const app = await createService(options), db = openStore(databasePath)
  t.after(async () => { await app.close(); db.close(); rmSync(directory, { recursive: true, force: true }) })
  const host = await user(app), guest = await user(app)
  const entry = { requestId: randomUUID(), displayName: 'Host', mode: 'personal' as const }
  const room = (await post(app, host, '/api/rooms', entry)).json<RoomView>()
  assert.equal((await post(app, guest, '/api/rooms/join', { requestId: randomUUID(), displayName: 'Friend', inviteCode: room.inviteCode })).statusCode, 200)
  const started = await act(app, host, room.id, { type: 'start', mode: 'personal' })
  assert.equal(started.statusCode, 200, started.body)
  for (const player of [host, guest]) {
    let current = await view(app, player, room.id)
    while (current.game!.preparation.next) {
      const p = current.game!.preparation
      const saved = await act(app, player, room.id, { type: 'save', conceptId: p.next!.id, cardId: p.hand[0].id, clue: 'A private dream of autumn' })
      assert.equal(saved.statusCode, 200, saved.body)
      current = saved.json<RoomView>()
    }
  }
  return { app, db, host, guest, room, entry, clock, options }
}
async function complete(f: Awaited<ReturnType<typeof fixture>>) {
  let room = await view(f.app, f.host, f.room.id)
  while (room.schedule) {
    f.clock.now = room.schedule.deadline
    advanceDueRoom(f.db, room.id, f.clock.now)
    room = await view(f.app, f.host, room.id)
  }
  assert.equal(room.phase, 'complete')
  return room
}

test('completed recaps expire after exactly seven days; polling, retries and new rooms cannot extend or revive them', async (t) => {
  const f = await fixture(t)
  const ended = await complete(f)
  assert.equal(ended.expiresAt, f.clock.now + RECAP_RETENTION_MS)
  assert.equal(ended.game!.history.length, 6)
  assert.deepEqual(ended.game!.preparation, { next: null, hand: [], saved: [] })
  assert.equal(ended.game!.board, undefined)
  const newRoom = (await post(f.app, f.host, '/api/rooms', { requestId: randomUUID(), displayName: 'Host', mode: 'personal' as const })).json<RoomView>()
  assert.notEqual(newRoom.id, ended.id)
  assert.deepEqual(await view(f.app, f.host, ended.id), ended)
  f.clock.now = ended.expiresAt! - 1
  assert.equal((await view(f.app, f.host, ended.id)).game!.history.length, 6)
  const receipt = await post(f.app, f.host, '/api/rooms', f.entry)
  assert.equal(receipt.json<RoomView>().expiresAt, ended.expiresAt)
  f.clock.now++
  const expired = await view(f.app, f.host, ended.id)
  assert.equal(expired.phase, 'expired')
  assert.equal(expired.game, undefined)
  assert.equal(expired.schedule, undefined)
  assert.ok(!JSON.stringify(expired).includes('private dream'))
  assert.equal(f.db.prepare('SELECT * FROM room_games WHERE room_id = ?').all(ended.id).length, 0)
  assert.equal(f.db.prepare('SELECT * FROM round_outcomes WHERE room_id = ?').all(ended.id).length, 0)
  assert.equal((await act(f.app, f.host, ended.id, { type: 'start', mode: 'personal' })).statusCode, 409)
  const retry = (await post(f.app, f.host, '/api/rooms', f.entry)).json<RoomView>()
  assert.equal(retry.id, ended.id)
  assert.equal(retry.phase, 'expired')
  const newcomer = await user(f.app)
  assert.equal((await post(f.app, newcomer, '/api/rooms/join', { requestId: randomUUID(), displayName: 'New', inviteCode: ended.inviteCode })).statusCode, 410)
  const session = await f.app.inject({ url: '/api/session', headers: { cookie: f.host.cookie } })
  assert.ok(!session.json<SessionView>().rooms.some((room) => room.id === ended.id))
})

test('background expiry removes only due private data and keeps the original host of active rooms', async (t) => {
  const f = await fixture(t, 10)
  const ended = await complete(f)
  f.clock.now = ended.expiresAt! - 60_000
  const other = (await post(f.app, f.host, '/api/rooms', { requestId: randomUUID(), displayName: 'Host', mode: 'personal' as const })).json<RoomView>()
  await post(f.app, f.guest, '/api/rooms/join', { requestId: randomUUID(), displayName: 'Friend', inviteCode: other.inviteCode })
  assert.equal((await act(f.app, f.host, other.id, { type: 'start', mode: 'personal' })).statusCode, 200)
  const before = await view(f.app, f.guest, other.id)
  f.clock.now = ended.expiresAt!
  for (let i = 0; i < 100 && f.db.prepare('SELECT * FROM room_games WHERE room_id = ?').get(ended.id); i++) await new Promise((resolve) => setTimeout(resolve, 10))
  assert.equal(f.db.prepare('SELECT * FROM room_games WHERE room_id = ?').get(ended.id), undefined)
  assert.deepEqual(await view(f.app, f.guest, other.id), before)
  assert.equal(before.hostId, other.hostId)
})

test('legacy terminal rooms receive one fresh retention window; restart does not extend it', async (t) => {
  const f = await fixture(t)
  const ended = await complete(f)
  await f.app.close()
  f.db.prepare('UPDATE rooms SET expires_at = NULL WHERE id = ?').run(ended.id)
  f.clock.now += 60_000
  const restarted = await createService(f.options)
  try {
    const restored = await view(restarted, f.host, ended.id)
    assert.equal(restored.expiresAt, f.clock.now + RECAP_RETENTION_MS)
    assert.deepEqual(restored.game!.history, ended.game!.history)
    f.clock.now += 60_000
    initializeLifecycle(f.db, f.clock.now)
    assert.deepEqual(await view(restarted, f.host, ended.id), restored)
  } finally { await restarted.close() }
})

test('long downtime expires completed recap from its scheduled ending, not server recovery time', async (t) => {
  const f = await fixture(t)
  await f.app.close()
  f.clock.now = Date.parse('2026-09-25T18:00:00Z')
  const restarted = await createService(f.options)
  try {
    const expired = await view(restarted, f.host, f.room.id)
    assert.equal(expired.phase, 'expired')
    assert.equal(expired.game, undefined)
    assert.equal(f.db.prepare('SELECT * FROM round_outcomes').all().length, 0)
    assert.equal(f.db.prepare('SELECT * FROM room_schedules').all().length, 0)
  } finally { await restarted.close() }
})

test('waiting rooms expire 24 hours from creation; joining never extends expiry and starting removes it', async (t) => {
  const f = await fixture(t)
  const waiting = (await post(f.app, f.host, '/api/rooms', { requestId: randomUUID(), displayName: 'Host', mode: 'personal' as const })).json<RoomView>()
  assert.equal(waiting.expiresAt, f.clock.now + LOBBY_LIFETIME_MS)
  f.clock.now = waiting.expiresAt! - 1
  const joined = (await post(f.app, f.guest, '/api/rooms/join', { requestId: randomUUID(), displayName: 'Friend', inviteCode: waiting.inviteCode })).json<RoomView>()
  assert.equal(joined.expiresAt, waiting.expiresAt)
  const expiredRoom = (await post(f.app, f.host, '/api/rooms', { requestId: randomUUID(), displayName: 'Host', mode: 'personal' as const })).json<RoomView>()
  const started = (await act(f.app, f.host, waiting.id, { type: 'start', mode: 'personal' })).json<RoomView>()
  assert.equal(started.phase, 'preparation')
  assert.equal(started.expiresAt, undefined)
  f.clock.now++
  assert.equal((await view(f.app, f.host, waiting.id)).phase, 'preparation')
  f.clock.now = expiredRoom.expiresAt!
  const staleStart = await post(f.app, f.host, `/api/rooms/${expiredRoom.id}/commands`, {
    requestId: randomUUID(), expectedRevision: expiredRoom.revision, weekId: null, roundId: null, action: { type: 'start', mode: 'personal' },
  })
  assert.equal(staleStart.statusCode, 409)
  assert.equal((await view(f.app, f.host, expiredRoom.id)).phase, 'expired')
  const join = await post(f.app, f.guest, '/api/rooms/join', { requestId: randomUUID(), displayName: 'Friend', inviteCode: expiredRoom.inviteCode })
  assert.equal(join.statusCode, 410)
  assert.equal(f.db.prepare('SELECT * FROM memberships WHERE room_id = ?').all(expiredRoom.id).length, 1)
})

test('closing preserves only revealed results, hides unfinished cards and survives retries and restart', async (t) => {
  const f = await fixture(t)
  await act(f.app, f.host, f.room.id, { type: 'open-day' })
  // Give both players correct guesses so preservation includes earned points.
  const privateGame = readGame(f.db, f.room.id)!
  for (const player of [f.host, f.guest]) {
    const current = await view(f.app, player, f.room.id)
    const target = current.game!.board!.currentFriend!
    const cardId = privateGame.week.dreams.get(target.id)!.get(current.game!.board!.concept.id)!
    assert.equal((await act(f.app, player, f.room.id, { type: 'lock', playerId: target.id, cardId })).statusCode, 200)
  }
  const revealed = (await act(f.app, f.host, f.room.id, { type: 'reveal' })).json<RoomView>()
  assert.equal(revealed.game!.totalScore, 1)
  const next = (await act(f.app, f.host, f.room.id, { type: 'advance' })).json<RoomView>()
  const command = { requestId: randomUUID(), expectedRevision: next.revision, weekId: next.game!.weekId,
    roundId: next.game!.roundId, action: { type: 'close', confirmed: true } }
  const url = `/api/rooms/${f.room.id}/commands`
  assert.equal((await post(f.app, f.guest, url, command)).statusCode, 403)
  for (const confirmed of [undefined, false]) {
    assert.equal((await post(f.app, f.host, url, { ...command, action: { type: 'close', confirmed } })).statusCode, 400)
  }
  const closedResponse = await post(f.app, f.host, url, command)
  assert.equal(closedResponse.statusCode, 200, closedResponse.body)
  const closed = closedResponse.json<RoomView>()
  assert.equal(closed.phase, 'closed')
  assert.equal(closed.expiresAt, f.clock.now + RECAP_RETENTION_MS)
  assert.deepEqual(closed.game!.history, revealed.game!.history)
  assert.equal(closed.game!.totalScore, 1)
  assert.equal(closed.game!.board, undefined)
  assert.equal(closed.game!.reveal, undefined)
  assert.equal(closed.game!.roundId, null)
  assert.deepEqual(closed.game!.preparation, { next: null, saved: [], hand: [] })
  assert.equal(closed.schedule, undefined)
  assert.equal(f.db.prepare('SELECT * FROM round_outcomes WHERE room_id = ?').all(f.room.id).length, 2)
  const guest = await view(f.app, f.guest, f.room.id)
  assert.equal(guest.phase, 'closed')
  assert.equal(guest.game!.history.length, 1)
  assert.equal(guest.game!.totalScore, 1)
  assert.equal((await act(f.app, f.host, f.room.id, { type: 'reveal' })).statusCode, 409)
  const stranger = await user(f.app)
  assert.equal((await post(f.app, stranger, '/api/rooms/join', { requestId: randomUUID(), displayName: 'Stranger', inviteCode: closed.inviteCode })).statusCode, 410)
  f.clock.now += 60_000
  assert.deepEqual((await post(f.app, f.host, url, command)).json<RoomView>(), closed)
  assert.equal(advanceDueRoom(f.db, f.room.id, f.clock.now), 0)
  await f.app.close()
  const restarted = await createService(f.options)
  try {
    assert.deepEqual(await view(restarted, f.host, f.room.id), closed)
    f.clock.now = closed.expiresAt!
    assert.equal((await post(restarted, f.host, url, command)).json<RoomView>().phase, 'expired')
    assert.equal(f.db.prepare('SELECT * FROM round_outcomes WHERE room_id = ?').all(f.room.id).length, 0)
  } finally { await restarted.close() }
})

test('a host can close a waiting or preparation room without creating any results', async (t) => {
  const f = await fixture(t)
  const waiting = (await post(f.app, f.host, '/api/rooms', { requestId: randomUUID(), displayName: 'Host', mode: 'personal' as const })).json<RoomView>()
  for (const id of [waiting.id, f.room.id]) {
    const closed = (await act(f.app, f.host, id, { type: 'close', confirmed: true })).json<RoomView>()
    assert.equal(closed.phase, 'closed')
    assert.equal(closed.expiresAt, f.clock.now + RECAP_RETENTION_MS)
    assert.equal(closed.schedule, undefined)
    assert.deepEqual(closed.game?.history ?? [], [])
    assert.equal(f.db.prepare('SELECT * FROM round_outcomes WHERE room_id = ?').all(id).length, 0)
  }
})

test('deadline reconciliation rejects stale closure, then a fresh close retains the resolved day only', async (t) => {
  const f = await fixture(t)
  const guessing = (await act(f.app, f.host, f.room.id, { type: 'open-day' })).json<RoomView>()
  f.clock.now = guessing.schedule!.deadline
  const stale = await post(f.app, f.host, `/api/rooms/${f.room.id}/commands`, {
    requestId: randomUUID(), expectedRevision: guessing.revision, weekId: guessing.game!.weekId,
    roundId: guessing.game!.roundId, action: { type: 'close', confirmed: true },
  })
  assert.equal(stale.statusCode, 409)
  assert.equal(stale.json().code, 'STALE_ROOM')
  const current = await view(f.app, f.host, f.room.id)
  assert.equal(current.phase, 'guessing')
  assert.equal(current.game!.day, 3)
  assert.equal(current.game!.history.length, 1)
  const closed = (await act(f.app, f.host, f.room.id, { type: 'close', confirmed: true })).json<RoomView>()
  assert.deepEqual(closed.game!.history, current.game!.history)
  assert.equal(closed.game!.totalScore, 0)
  assert.equal(advanceDueRoom(f.db, f.room.id, f.clock.now + 3 * LOBBY_LIFETIME_MS), 0)
  assert.equal(f.db.prepare('SELECT * FROM round_outcomes WHERE room_id = ?').all(f.room.id).length, 2)
})
