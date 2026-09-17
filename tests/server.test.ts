import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test, type TestContext } from 'node:test'
import { createService } from '../server/http.ts'
import { openStore } from '../server/store.ts'
import type { RoomView, SessionView } from '../shared/rooms.ts'

const origin = 'http://127.0.0.1:5173'
type App = Awaited<ReturnType<typeof createService>>
interface Browser { cookie: string; csrf: string }
async function fixture(t: TestContext, now = Date.now) {
  const directory = mkdtempSync(join(tmpdir(), 'dreamerie-room-test-'))
  const databasePath = join(directory, 'rooms.sqlite')
  const app = await createService({ databasePath, origin, now, rateLimits: false })
  t.after(async () => { await app.close(); rmSync(directory, { recursive: true, force: true }) })
  return { app, databasePath, directory }
}
async function browser(app: App): Promise<Browser> {
  const response = await app.inject({ method: 'POST', url: '/api/session', headers: { origin }, payload: {} })
  assert.equal(response.statusCode, 200, response.body)
  const cookie = response.cookies.find((entry) => entry.name === 'dreamerie_session')
  assert.ok(cookie)
  return { cookie: `dreamerie_session=${cookie.value}`, csrf: response.json<SessionView>().csrfToken }
}
function post(app: App, user: Browser, url: string, payload: object, extra: Record<string, string> = {}) {
  return app.inject({ method: 'POST', url, headers: { origin, cookie: user.cookie, 'x-dreamerie-csrf': user.csrf, ...extra }, payload })
}
async function createRoom(app: App, user: Browser, displayName = 'Charlie') {
  const response = await post(app, user, '/api/rooms', { requestId: randomUUID(), displayName })
  assert.equal(response.statusCode, 200, response.body)
  return response.json<RoomView>()
}
function joinRoom(app: App, user: Browser, room: RoomView, displayName = 'Nancy', requestId = randomUUID()) {
  return post(app, user, '/api/rooms/join', { requestId, displayName, inviteCode: room.inviteCode })
}

test('private sessions, stable seats and six accents persist across refresh', async (t) => {
  const { app } = await fixture(t)
  const host = await browser(app)
  const room = await createRoom(app, host)
  const users = [host]
  for (let i = 1; i < 6; i++) {
    const guest = await browser(app); users.push(guest)
    const response = await joinRoom(app, guest, room, `Dreamer ${i}`)
    assert.equal(response.statusCode, 200)
    const view = response.json<RoomView>()
    assert.equal(view.members.length, i + 1)
    assert.equal(view.members[i].accentSlot, i)
    assert.equal(view.selfId, view.members[i].playerId)
    assert.equal(view.hostId, room.selfId)
  }
  const selfIds = []
  for (const user of users) {
    const response = await app.inject({ url: '/api/session', headers: { cookie: user.cookie } })
    assert.equal(response.headers['cache-control'], 'no-store')
    const restored = response.json<SessionView>().rooms[0]
    selfIds.push(restored.selfId)
    assert.deepEqual(restored.members.map((member) => member.accentSlot), [0, 1, 2, 3, 4, 5])
    assert.equal(restored.revision, 6)
    assert.deepEqual(Object.keys(restored).sort(), ['hostId', 'id', 'inviteCode', 'members', 'phase', 'revision', 'selfId'])
    for (const member of restored.members) assert.deepEqual(Object.keys(member).sort(), ['accentSlot', 'displayName', 'playerId'])
  }
  assert.equal(new Set(selfIds).size, 6)
})

test('concurrent join attempts cannot overfill a room', async (t) => {
  const { app } = await fixture(t)
  const room = await createRoom(app, await browser(app))
  const users = await Promise.all(Array.from({ length: 9 }, () => browser(app)))
  const responses = await Promise.all(users.map((user, i) => joinRoom(app, user, room, `Guest ${i}`)))
  assert.equal(responses.filter((response) => response.statusCode === 200).length, 5)
  const rejected = responses.filter((response) => response.statusCode !== 200)
  assert.equal(rejected.length, 4)
  assert.ok(rejected.every((response) => response.json().code === 'ROOM_FULL'))
})

test('lost create/join responses and duplicate requests do not duplicate rooms or seats', async (t) => {
  const { app } = await fixture(t)
  const host = await browser(app)
  const body = { requestId: randomUUID(), displayName: 'Charlie' }
  const first = await post(app, host, '/api/rooms', body)
  const room = first.json<RoomView>()
  const guest = await browser(app)
  const requestId = randomUUID()
  const joins = await Promise.all([joinRoom(app, guest, room, 'Nancy', requestId), joinRoom(app, guest, room, 'Nancy', requestId)])
  assert.deepEqual(joins[0].json(), joins[1].json())
  const replay = await post(app, host, '/api/rooms', body)
  assert.equal(replay.json<RoomView>().id, room.id)
  assert.equal(replay.json<RoomView>().members.length, 2, 'retry gets a fresh permitted view')
  const memberships = await app.inject({ url: '/api/session', headers: { cookie: host.cookie } })
  assert.equal(memberships.json<SessionView>().rooms.length, 1)
  const conflict = await post(app, host, '/api/rooms', { ...body, displayName: 'Song' })
  assert.equal(conflict.statusCode, 409)
  assert.equal(conflict.json().code, 'REQUEST_REUSED')
  const resume = await joinRoom(app, guest, room, 'Charlie')
  assert.equal(resume.json<RoomView>().selfId, joins[0].json<RoomView>().selfId)
  assert.equal(resume.json<RoomView>().members[1].displayName, 'Nancy', 'a different name cannot switch seats')
})

test('duplicate names are rejected after whitespace, Unicode and case normalization', async (t) => {
  const { app } = await fixture(t)
  const room = await createRoom(app, await browser(app), '  Nancy   Rose  ')
  assert.equal(room.members[0].displayName, 'Nancy Rose')
  for (const displayName of ['nancy rose', ' NANCY  ROSE ', 'Ｎａｎｃｙ Ｒｏｓｅ']) {
    const result = await joinRoom(app, await browser(app), room, displayName)
    assert.equal(result.statusCode, 409)
    assert.equal(result.json().code, 'NAME_TAKEN')
  }
  const distinct = await joinRoom(app, await browser(app), room, 'Nancy R.')
  assert.equal(distinct.statusCode, 200)
})

test('rooms isolate membership and reject actor spoofing, missing cookies and foreign CSRF', async (t) => {
  const { app } = await fixture(t)
  const a = await browser(app); const b = await browser(app)
  const room = await createRoom(app, a)
  await createRoom(app, b, 'Nancy')
  assert.equal((await app.inject({ url: `/api/rooms/${room.id}`, headers: { cookie: b.cookie } })).statusCode, 403)
  assert.equal((await app.inject({ url: `/api/rooms/${room.id}` })).statusCode, 401)
  assert.equal((await post(app, b, '/api/rooms', { requestId: randomUUID(), displayName: 'X', playerId: room.selfId })).statusCode, 400)
  assert.equal((await post(app, b, '/api/rooms', { requestId: randomUUID(), displayName: 'X' }, { 'x-dreamerie-csrf': a.csrf })).statusCode, 403)
  assert.equal((await post(app, a, '/api/rooms', { requestId: randomUUID(), displayName: 'X' }, { origin: 'https://elsewhere.example' })).statusCode, 403)
  assert.equal((await app.inject({ method: 'POST', url: '/api/session', payload: {} })).statusCode, 403)
  assert.equal((await app.inject({ method: 'POST', url: '/api/session', payload: {}, headers: { origin: 'null' } })).statusCode, 403)
  const rooms = (await app.inject({ url: '/api/session', headers: { cookie: b.cookie } })).json<SessionView>().rooms
  assert.equal(rooms.length, 1)
  assert.notEqual(rooms[0].id, room.id)
})

test('invalid names, codes, body types and oversized bodies do not create a seat', async (t) => {
  const { app } = await fixture(t)
  const user = await browser(app)
  for (const displayName of ['', '   ', 'x'.repeat(25), 'name\u202E', 7, null]) {
    assert.equal((await post(app, user, '/api/rooms', { requestId: randomUUID(), displayName })).statusCode, 400)
  }
  assert.equal((await post(app, user, '/api/rooms/join', { requestId: randomUUID(), displayName: 'X', inviteCode: 'BAD' })).statusCode, 400)
  assert.equal((await post(app, user, '/api/rooms/join', { requestId: randomUUID(), displayName: 'X', inviteCode: '0000000000' })).statusCode, 404)
  assert.equal((await post(app, user, '/api/rooms', { requestId: randomUUID(), displayName: 'x'.repeat(5000) })).statusCode, 413)
  assert.deepEqual((await app.inject({ url: '/api/session', headers: { cookie: user.cookie } })).json<SessionView>().rooms, [])
})

test('started, closed and expired rooms reject new seats but preserve existing identities', async (t) => {
  const { app, databasePath } = await fixture(t, () => 1000)
  const host = await browser(app)
  const room = await createRoom(app, host)
  const db = openStore(databasePath)
  try {
    for (const [phase, code] of [['preparation', 'ROOM_STARTED'], ['guessing', 'ROOM_STARTED'], ['closed', 'ROOM_CLOSED'], ['expired', 'ROOM_EXPIRED']]) {
      db.prepare('UPDATE rooms SET phase = ? WHERE id = ?').run(phase, room.id)
      const rejected = await joinRoom(app, await browser(app), room)
      assert.equal(rejected.json().code, code)
      const existing = await joinRoom(app, host, room, 'Someone else')
      assert.equal(existing.statusCode, 200)
      assert.equal(existing.json<RoomView>().selfId, room.selfId)
      assert.equal(existing.json<RoomView>().phase, phase)
    }
    db.prepare("UPDATE rooms SET phase = 'lobby', expires_at = 1000 WHERE id = ?").run(room.id)
    assert.equal((await joinRoom(app, await browser(app), room)).json().code, 'ROOM_EXPIRED')
  } finally { db.close() }
})

test('service restart retains sessions, seats, receipts and host identity', async (t) => {
  const { app, databasePath } = await fixture(t)
  const host = await browser(app)
  const body = { requestId: randomUUID(), displayName: 'Charlie' }
  const room = (await post(app, host, '/api/rooms', body)).json<RoomView>()
  const guest = await browser(app)
  const joined = (await joinRoom(app, guest, room)).json<RoomView>()
  await app.close()
  const restored = await createService({ databasePath, origin, rateLimits: false })
  try {
    assert.deepEqual((await app.inject({ url: '/api/health' }).catch(() => null)), null)
    const response = await restored.inject({ url: `/api/rooms/${room.id}`, headers: { cookie: guest.cookie } })
    assert.deepEqual(response.json(), joined)
    const retry = await post(restored, host, '/api/rooms', body)
    assert.equal(retry.json<RoomView>().id, room.id)
    assert.equal(retry.json<RoomView>().members.length, 2)
    const db = openStore(databasePath)
    try {
      const rows = db.prepare('SELECT * FROM sessions').all()
      assert.ok(!JSON.stringify(rows).includes(host.cookie.split('=')[1]), 'credential is hashed at rest')
      assert.equal(db.pragma('journal_mode', { simple: true }), 'wal')
    } finally { db.close() }
  } finally { await restored.close() }
})

test('session expiry prevents taking actions as the old player', async (t) => {
  let now = 1000
  const { app } = await fixture(t, () => now)
  const user = await browser(app)
  const room = await createRoom(app, user)
  now += 30 * 24 * 60 * 60 * 1000
  assert.equal((await app.inject({ url: `/api/rooms/${room.id}`, headers: { cookie: user.cookie } })).statusCode, 401)
  const fresh = await browser(app)
  assert.equal((await app.inject({ url: `/api/rooms/${room.id}`, headers: { cookie: fresh.cookie } })).statusCode, 403)
  assert.equal((await joinRoom(app, fresh, room, 'Charlie')).json().code, 'NAME_TAKEN')
})

test('production requires HTTPS and sends a secure HttpOnly session cookie', async () => {
  await assert.rejects(createService({ databasePath: ':memory:', origin, production: true }), /HTTPS/)
  const app = await createService({ databasePath: ':memory:', origin: 'https://dreamerie.example', production: true })
  try {
    const response = await app.inject({ method: 'POST', url: '/api/session', payload: {}, headers: { origin: 'https://dreamerie.example' } })
    assert.equal(response.statusCode, 200)
    assert.match(String(response.headers['set-cookie']), /HttpOnly/)
    assert.match(String(response.headers['set-cookie']), /Secure/)
    assert.match(String(response.headers['set-cookie']), /SameSite=Lax/)
    assert.ok(!JSON.stringify(response.json()).includes(response.cookies[0].value))
  } finally { await app.close() }
})

test('create attempts are bounded and cannot fall through to static responses', async (t) => {
  const { directory } = await fixture(t)
  writeFileSync(join(directory, 'index.html'), '<!doctype html><title>Dreamerie test</title>')
  const app = await createService({ databasePath: ':memory:', origin, staticRoot: directory })
  try {
    assert.equal((await app.inject({ url: '/' })).statusCode, 200)
    assert.equal((await app.inject({ url: '/api/unknown' })).statusCode, 404)
    const user = await browser(app)
    for (let i = 0; i < 10; i++) await createRoom(app, user)
    const limited = await post(app, user, '/api/rooms', { requestId: randomUUID(), displayName: 'Charlie' })
    assert.equal(limited.statusCode, 429)
    assert.equal(limited.json().code, 'TOO_MANY_REQUESTS')
    assert.equal((await app.inject({ method: 'POST', url: '/api/rooms/anything/commands', payload: {}, headers: { origin } })).statusCode, 404, 'future phase commands are unavailable')
  } finally { await app.close() }
})
