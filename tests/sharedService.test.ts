import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test, type TestContext } from 'node:test'
import { createService } from '../server/http.ts'
import { openStore } from '../server/store.ts'
import { readGame } from '../server/gameState.ts'
import type { GameAction, GameCommand } from '../shared/game.ts'
import type { RoomView, SessionView } from '../shared/rooms.ts'
import { playerId } from '../shared/parse.ts'
import type { DreamMode } from '../src/game/types.ts'
import { parseGameView } from '../shared/gameParsing.ts'

const origin = 'http://127.0.0.1:5173'

test('room mode is previewed privately before joining and cannot be changed at start or by a retry', async (t) => {
  const { app, users, room } = await fixture(t, 2, 'classic')
  const path = `/api/invitations/${room.inviteCode}`
  assert.equal((await app.inject({ url: path })).statusCode, 401)
  const outsider = await user(app, 'New guest')
  const preview = await app.inject({ url: path, headers: { cookie: outsider.cookie } })
  assert.equal(preview.statusCode, 200)
  assert.equal(preview.headers['cache-control'], 'no-store')
  assert.deepEqual(preview.json(), { mode: 'classic' })
  assert.equal((await app.inject({ url: `/api/rooms/${room.id}`, headers: { cookie: outsider.cookie } })).statusCode, 403)
  assert.equal((await send(app, users[0], room.id, command(room, { type: 'start', mode: 'personal' }))).statusCode, 400)
  const body = { requestId: randomUUID(), displayName: 'Author', mode: 'personal' as const }
  const made = await post(app, outsider, '/api/rooms', body)
  const created = made.json<RoomView>()
  assert.equal(created.mode, 'personal')
  assert.deepEqual((await post(app, outsider, '/api/rooms', body)).json(), created)
  assert.equal((await post(app, outsider, '/api/rooms', { ...body, mode: 'classic' })).statusCode, 409)
  assert.equal((await post(app, outsider, '/api/rooms', { ...body, requestId: randomUUID(), mode: 'invalid' })).statusCode, 400)
  const personalPreview = await app.inject({ url: `/api/invitations/${created.inviteCode}`, headers: { cookie: users[0].cookie } })
  assert.deepEqual(personalPreview.json(), { mode: 'personal' })
})

test('personal clues are still required, while Word of the Day accepts card-only choices', async (t) => {
  for (const mode of ['personal', 'classic'] as const) {
    const { app, users, room } = await fixture(t, 2, mode)
    const started = await act(app, users[0], room.id, { type: 'start' })
    const prep = started.game!.preparation
    const saved = await send(app, users[0], room.id, command(started, { type: 'save', conceptId: prep.next!.id, cardId: prep.hand[0].id }))
    assert.equal(saved.statusCode, mode === 'personal' ? 400 : 200)
    if (mode === 'classic') {
      const after = saved.json<RoomView>()
      assert.equal(after.game!.preparation.saved[0].clue, '')
      assert.equal(after.game!.preparation.hand.length, 6)
      assert.ok(!after.game!.preparation.hand.some((card) => card.id === prep.hand[0].id))
    }
  }
})
type App = Awaited<ReturnType<typeof createService>>
interface User { cookie: string; csrf: string; name: string }
async function fixture(t: TestContext, count = 3, mode: DreamMode = 'personal') {
  const directory = mkdtempSync(join(tmpdir(), 'dreamerie-shared-service-'))
  const path = join(directory, 'game.sqlite')
  const app = await createService({ databasePath: path, origin, rateLimits: false })
  t.after(async () => { await app.close(); rmSync(directory, { recursive: true, force: true }) })
  const users = []
  for (let i = 0; i < count; i++) users.push(await user(app, `Human ${i}`))
  const response = await post(app, users[0], '/api/rooms', { requestId: randomUUID(), displayName: users[0].name, ...(mode === 'personal' ? { mode } : {}) })
  const room = response.json<RoomView>()
  for (const guest of users.slice(1)) assert.equal((await joinRoom(app, guest, room)).statusCode, 200)
  return { app, users, room: await view(app, users[0], room.id), path }
}
async function user(app: App, name: string): Promise<User> {
  const response = await app.inject({ method: 'POST', url: '/api/session', headers: { origin }, payload: {} })
  assert.equal(response.statusCode, 200)
  return { name, cookie: `dreamerie_session=${response.cookies[0].value}`, csrf: response.json<SessionView>().csrfToken }
}
function post(app: App, user: User, url: string, payload: object) {
  return app.inject({ method: 'POST', url, headers: { origin, cookie: user.cookie, 'x-dreamerie-csrf': user.csrf }, payload })
}
const joinRoom = (app: App, user: User, room: RoomView) => post(app, user, '/api/rooms/join', { requestId: randomUUID(), displayName: user.name, inviteCode: room.inviteCode })
async function view(app: App, user: User, roomId: string) {
  const response = await app.inject({ url: `/api/rooms/${roomId}`, headers: { cookie: user.cookie } })
  assert.equal(response.statusCode, 200, response.body)
  return response.json<RoomView>()
}
function command(room: RoomView, action: GameAction): GameCommand {
  return { requestId: randomUUID(), expectedRevision: room.revision, weekId: room.game?.weekId ?? null, roundId: room.game?.roundId ?? null, action }
}
const send = (app: App, user: User, roomId: string, body: GameCommand) => post(app, user, `/api/rooms/${roomId}/commands`, body)
async function act(app: App, user: User, id: string, action: GameAction) {
  const room = await view(app, user, id)
  const response = await send(app, user, id, command(room, action))
  assert.equal(response.statusCode, 200, response.body)
  return response.json<RoomView>()
}
async function prepare(app: App, user: User, id: string) {
  let room = await view(app, user, id)
  while (room.game?.preparation.next) {
    const prep = room.game.preparation
    room = await act(app, user, id, { type: 'save', conceptId: prep.next!.id, cardId: prep.hand[0].id,
      ...(room.game!.mode === 'personal' ? { clue: `${user.name} secret ${prep.next!.label}` } : {}) })
  }
  return room
}
async function finishGuesses(app: App, user: User, id: string, path: string) {
  let room = await view(app, user, id)
  while (room.game?.board?.currentFriend) {
    const db = openStore(path)
    const game = readGame(db, id)!
    db.close()
    const target = room.game.board.currentFriend.id
    const actual = game.week.dreams.get(target)!.get(room.game.board.concept.id)!
    room = await act(app, user, id, { type: 'lock', playerId: target, cardId: actual })
  }
  return room
}

for (const mode of ['classic', 'personal'] as const) for (const count of [2, 6]) test(`HTTP: ${count} humans prepare, guess and reveal an entire ${mode} week privately`, async (t) => {
  const { app, users, room, path } = await fixture(t, count, mode)
  assert.equal(room.mode, mode)
  const started = await act(app, users[0], room.id, { type: 'start', ...(mode === 'personal' ? { mode } : {}) })
  assert.equal(started.game?.mode, mode)
  for (const guest of users) await prepare(app, guest, room.id)
  for (const guest of users) {
    const privateView = await view(app, guest, room.id)
    assert.equal(privateView.game?.preparation.saved.length, 6)
    assert.deepEqual(parseGameView(privateView.game), privateView.game)
    for (const other of users.filter((entry) => entry !== guest)) assert.ok(!JSON.stringify(privateView).includes(`${other.name} secret`))
    assert.equal(privateView.game?.board, undefined)
    assert.equal(privateView.game?.reveal, undefined)
    assert.deepEqual(privateView.game?.history, [])
    for (const forbidden of ['roundOrder', 'allocation', 'available', 'reserved', 'assignments', 'state_json', 'credential_hash']) assert.ok(!JSON.stringify(privateView).includes(`"${forbidden}"`))
  }
  let current = await act(app, users[0], room.id, { type: 'open-day' })
  for (let day = 2; day <= 7; day++) {
    assert.equal(current.game?.day, day)
    const boards = new Map<string, string>()
    for (const guest of users) {
      const before = await view(app, guest, room.id)
      boards.set(guest.name, JSON.stringify(before.game?.board?.cards))
      assert.equal(before.game?.board?.friends.length, count - 1)
      const friend = before.game!.board!.currentFriend!
      const serialized = JSON.stringify(before.game!.board)
      for (const other of users.filter((entry) => entry.name !== friend.name)) assert.ok(!serialized.includes(`${other.name} secret`))
      await finishGuesses(app, guest, room.id, path)
      const ready = await view(app, guest, room.id)
      assert.equal(ready.game?.reveal, undefined)
      assert.equal(ready.game?.board?.locks.length, count - 1)
    }
    const beforeReveal = await view(app, users[0], room.id)
    const body = command(beforeReveal, { type: 'reveal' })
    const replies = await Promise.all([send(app, users[0], room.id, body), send(app, users[0], room.id, body)])
    assert.equal(replies[0].statusCode, 200); assert.deepEqual(replies[0].json(), replies[1].json())
    for (const guest of users) {
      const revealed = await view(app, guest, room.id)
      assert.equal(revealed.phase, 'revealed')
      assert.equal(revealed.game?.reveal?.points, mode === 'classic' ? 3 : count - 1)
      assert.equal(revealed.game?.reveal?.recognitionPoints, mode === 'classic' ? 3 : 0)
      assert.equal(revealed.game?.history.length, day - 1)
      assert.equal(revealed.game?.totalScore, (day - 1) * (mode === 'classic' ? 3 : count - 1))
      assert.equal(JSON.stringify(revealed.game?.board?.cards), boards.get(guest.name))
      const invalid = await send(app, guest, room.id, command(revealed, { type: 'unlock', cardId: revealed.game!.board!.locks[0][0] }))
      assert.equal(invalid.statusCode, 400)
    }
    current = await act(app, users[0], room.id, { type: 'advance' })
  }
  assert.equal(current.phase, 'complete')
  assert.equal(current.game?.history.length, 6)
  const db = openStore(path)
  try { assert.equal(db.prepare('SELECT * FROM round_outcomes').all().length, count * 6) } finally { db.close() }
})

test('HTTP: host authority, cross-room access, validation, concurrent saves and stale retries', async (t) => {
  const { app, users, room } = await fixture(t)
  assert.equal((await send(app, users[1], room.id, command(room, { type: 'start', mode: 'personal' }))).statusCode, 403)
  const outsider = await user(app, 'Outsider')
  assert.equal((await send(app, outsider, room.id, command(room, { type: 'start', mode: 'personal' }))).statusCode, 403)
  const started = await act(app, users[0], room.id, { type: 'start', mode: 'personal' })
  const guest = await view(app, users[1], room.id)
  assert.ok(!JSON.stringify(started).includes(guest.game!.preparation.hand[0].id))
  const foreign = command(started, { type: 'save', conceptId: started.game!.preparation.next!.id, cardId: guest.game!.preparation.hand[0].id, clue: 'Invalid' })
  assert.equal((await send(app, users[0], room.id, foreign)).statusCode, 400)
  const bodies = [started, guest].map((view) => command(view, { type: 'save', conceptId: view.game!.preparation.next!.id, cardId: view.game!.preparation.hand[0].id, clue: 'First clue' }))
  const results = await Promise.all(bodies.map((body, index) => send(app, users[index], room.id, body)))
  assert.deepEqual(results.map((response) => response.statusCode).sort(), [200, 409])
  const accepted = results.findIndex((response) => response.statusCode === 200)
  const current = await view(app, users[accepted], room.id)
  assert.equal(current.game!.preparation.saved.length, 1)
  const retry = await send(app, users[accepted], room.id, bodies[accepted])
  assert.equal(retry.statusCode, 200)
  assert.equal(retry.json<RoomView>().game!.preparation.saved.length, 1)
  const altered = { ...bodies[accepted], action: { ...bodies[accepted].action, clue: 'Changed' } }
  assert.equal((await post(app, users[accepted], `/api/rooms/${room.id}/commands`, altered)).statusCode, 409)
  assert.equal((await post(app, users[0], `/api/rooms/${room.id}/commands`, { ...bodies[0], actorId: guest.selfId })).statusCode, 400)
  assert.equal((await send(app, users[0], room.id, command(await view(app, users[0], room.id), { type: 'open-day' }))).json().code, 'CONFIRM_MISSING')
})

test('HTTP: early closure scores incomplete players zero, late joins cannot change current boards', async (t) => {
  const { app, users, room, path } = await fixture(t)
  await act(app, users[0], room.id, { type: 'start', mode: 'personal' })
  await prepare(app, users[0], room.id)
  await prepare(app, users[1], room.id)
  const before = await view(app, users[0], room.id)
  const opened = await act(app, users[0], room.id, { type: 'open-day', confirmMissing: before.game!.preparingPlayerIds })
  assert.equal(opened.game!.board!.friends.length, 1)
  const absent = await view(app, users[2], room.id)
  assert.equal(absent.game?.board, undefined)
  assert.equal(absent.game?.canGuess, false)
  const newcomer = await user(app, 'Late human')
  const joined = await joinRoom(app, newcomer, room)
  assert.equal(joined.statusCode, 200)
  assert.equal(joined.json<RoomView>().game?.waitingForNextDay, true)
  await prepare(app, newcomer, room.id)
  await prepare(app, users[2], room.id)
  assert.deepEqual((await view(app, users[0], room.id)).game?.board, opened.game!.board)
  await finishGuesses(app, users[0], room.id, path)
  const pending = await view(app, users[0], room.id)
  assert.equal((await send(app, users[0], room.id, command(pending, { type: 'reveal' }))).statusCode, 409)
  await act(app, users[0], room.id, { type: 'reveal', confirmMissing: pending.game!.unfinishedPlayerIds })
  assert.equal((await view(app, users[0], room.id)).game?.reveal?.points, 1)
  const missed = await view(app, users[1], room.id)
  assert.equal(missed.game?.reveal?.missed, true)
  assert.equal(missed.game?.reveal?.points, 0)
  assert.equal(missed.game?.reveal?.receivedGuesses[0].correct, true)
  assert.equal((await view(app, newcomer, room.id)).game?.history.length, 0)
  const next = await act(app, users[0], room.id, { type: 'advance' })
  assert.equal(next.game?.board?.friends.length, 3)
  assert.equal((await view(app, newcomer, room.id)).game?.canGuess, true)
})

test('HTTP: unlock/reveal races serialize; personal results survive a schema-3 upgrade and restart', async (t) => {
  const { app, users, room, path } = await fixture(t, 2)
  await act(app, users[0], room.id, { type: 'start', mode: 'personal' })
  for (const guest of users) await prepare(app, guest, room.id)
  await act(app, users[0], room.id, { type: 'open-day' })
  for (const guest of users) await finishGuesses(app, guest, room.id, path)
  const host = await view(app, users[0], room.id), guest = await view(app, users[1], room.id)
  const race = await Promise.all([
    send(app, users[1], room.id, command(guest, { type: 'unlock', cardId: guest.game!.board!.locks[0][0] })),
    send(app, users[0], room.id, command(host, { type: 'reveal' })),
  ])
  assert.deepEqual(race.map((response) => response.statusCode).sort(), [200, 409])
  let current = await view(app, users[0], room.id)
  if (current.phase === 'guessing') {
    assert.equal(current.game!.unfinishedPlayerIds.length, 1)
    await finishGuesses(app, users[1], room.id, path)
    current = await act(app, users[0], room.id, { type: 'reveal' })
  }
  const old = await view(app, users[1], room.id)
  await app.close()
  // Reproduce the deployed pre-mode schema with accepted clues, guesses and scores.
  const previousSchema = openStore(path)
  previousSchema.exec('ALTER TABLE rooms DROP COLUMN mode; PRAGMA user_version = 3;')
  previousSchema.close()
  const restarted = await createService({ databasePath: path, origin, rateLimits: false })
  try {
    assert.deepEqual(await view(restarted, users[1], room.id), old)
    assert.equal((await send(restarted, users[0], room.id, command(current, { type: 'reveal' }))).statusCode, 400)
    const db = openStore(path)
    try { assert.equal(db.prepare('SELECT * FROM round_outcomes').all().length, 2) } finally { db.close() }
    await act(restarted, users[0], room.id, { type: 'advance' })
    assert.equal((await send(restarted, users[1], room.id, command(old, { type: 'lock', playerId: playerId(current.selfId), cardId: old.game!.board!.cards[1].id }))).statusCode, 409)
  } finally { await restarted.close() }
})

test('HTTP: last guess and confirmed missed-day closure cannot both apply at one revision', async (t) => {
  for (const closeFirst of [false, true]) {
    const { app, users, room, path } = await fixture(t, 2)
    await act(app, users[0], room.id, { type: 'start', mode: 'personal' })
    for (const guest of users) await prepare(app, guest, room.id)
    await act(app, users[0], room.id, { type: 'open-day' })
    await finishGuesses(app, users[0], room.id, path)
    const host = await view(app, users[0], room.id), guest = await view(app, users[1], room.id)
    const board = guest.game!.board!
    const guess = () => send(app, users[1], room.id, command(guest, { type: 'lock', playerId: board.currentFriend!.id, cardId: host.game!.board!.ownDream.id }))
    const close = () => send(app, users[0], room.id, command(host, { type: 'reveal', confirmMissing: host.game!.unfinishedPlayerIds }))
    const responses = await Promise.all((closeFirst ? [close, guess] : [guess, close]).map((run) => run()))
    assert.deepEqual(responses.map((response) => response.statusCode).sort(), [200, 409])
    let after = await view(app, users[1], room.id)
    const closedBeforeGuess = after.phase === 'revealed'
    if (!closedBeforeGuess) {
      assert.equal(after.game!.board!.locks.length, 1)
      // Two distinct reveal IDs still create only one set of outcomes.
      const fresh = await view(app, users[0], room.id)
      const reveals = await Promise.all([send(app, users[0], room.id, command(fresh, { type: 'reveal' })), send(app, users[0], room.id, command(fresh, { type: 'reveal' }))])
      assert.deepEqual(reveals.map((response) => response.statusCode).sort(), [200, 409])
      after = await view(app, users[1], room.id)
    }
    assert.equal(after.game!.reveal!.missed, closedBeforeGuess)
    assert.equal(after.game!.reveal!.points, closedBeforeGuess ? 0 : 1)
    const db = openStore(path)
    try { assert.equal(db.prepare('SELECT * FROM round_outcomes').all().length, 2) } finally { db.close() }
  }
})
