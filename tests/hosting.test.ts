import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test, type TestContext } from 'node:test'
import { copyDatabase, verifyDatabase } from '../server/databaseBackup.ts'
import { openStore } from '../server/store.ts'
import { createSession, csrfToken } from '../server/sessions.ts'
import { enterRoom } from '../server/rooms.ts'
import { commandRoom } from '../server/gameCommands.ts'
import { roomView } from '../server/views.ts'
import { createService } from '../server/http.ts'
import type { GameAction } from '../shared/game.ts'
import { serviceConfig } from '../server/config.ts'
import type { RoomView, SessionView } from '../shared/rooms.ts'

function fixture(t: TestContext) {
  const directory = mkdtempSync(join(tmpdir(), 'dreamerie-hosting-'))
  const source = join(directory, 'live.sqlite'), db = openStore(source)
  t.after(() => { db.close(); rmSync(directory, { force: true, recursive: true }) })
  return { directory, source, db }
}

test('online backup and restore preserve WAL gameplay, identity, deadlines and safe command retries', async (t) => {
  const { directory, source, db } = fixture(t)
  const now = Date.parse('2026-09-18T18:00:00Z'), origin = 'http://127.0.0.1:5173'
  const host = createSession(db, now), guest = createSession(db, now)
  const room = enterRoom(db, host.session.id, 'create', { requestId: randomUUID(), displayName: 'Host' }, now)
  enterRoom(db, guest.session.id, 'join', { requestId: randomUUID(), displayName: 'Guest', inviteCode: room.inviteCode }, now)
  function command(sessionId: string, action: GameAction) {
    const view = roomView(db, room.id, sessionId, now)
    return { requestId: randomUUID(), expectedRevision: view.revision, weekId: view.game?.weekId ?? null, roundId: view.game?.roundId ?? null, action }
  }
  const act = (id: string, action: GameAction) => commandRoom(db, room.id, id, command(id, action), now)
  act(host.session.id, { type: 'start' })
  for (const player of [host, guest]) {
    let view = roomView(db, room.id, player.session.id, now)
    while (view.game!.preparation.next) {
      const p = view.game!.preparation
      view = act(player.session.id, { type: 'save', conceptId: p.next!.id, cardId: p.hand[0].id, clue: 'A dream worth keeping' })
    }
  }
  act(host.session.id, { type: 'open-day' })
  act(host.session.id, { type: 'reveal', confirmMissing: roomView(db, room.id, host.session.id, now).game!.unfinishedPlayerIds })
  const next = act(host.session.id, { type: 'advance' })
  const board = next.game!.board!
  const chosen = board.cards.find((card) => card.id !== board.ownDream.id)!
  const lockedCommand = command(host.session.id, { type: 'lock', playerId: board.currentFriend!.id, cardId: chosen.id })
  const before = commandRoom(db, room.id, host.session.id, lockedCommand, now)
  assert.ok(existsSync(`${source}-wal`))
  const backup = join(directory, 'snapshot.sqlite'), restored = join(directory, 'restored.sqlite')
  assert.deepEqual(await copyDatabase(source, backup), { rooms: 1 })
  act(host.session.id, { type: 'unlock', cardId: chosen.id })
  await copyDatabase(backup, restored)
  const app = await createService({ databasePath: restored, origin, now: () => now })
  try {
    const cookie = `dreamerie_session=${host.credential}`
    const view = await app.inject({ url: `/api/rooms/${room.id}`, headers: { cookie } })
    assert.equal(view.statusCode, 200)
    assert.deepEqual(view.json(), before)
    const retry = await app.inject({ method: 'POST', url: `/api/rooms/${room.id}/commands`, payload: lockedCommand,
      headers: { cookie, origin, 'x-dreamerie-csrf': csrfToken(host.credential) } })
    assert.deepEqual(retry.json(), before)
    assert.equal((await app.inject({ url: `/api/rooms/${room.id}` })).statusCode, 401)
  } finally { await app.close() }
})

test('maintenance refuses overwrite, sidecar collisions, public snapshots, missing and unsupported sources', async (t) => {
  const { directory, source, db } = fixture(t)
  const destination = join(directory, 'backup.sqlite')
  writeFileSync(destination, 'keep this file')
  await assert.rejects(copyDatabase(source, destination), /already exist/)
  assert.equal(readFileSync(destination, 'utf8'), 'keep this file')
  await assert.rejects(copyDatabase(source, source), /already exist/)
  const sidecar = join(directory, 'collision.sqlite')
  writeFileSync(`${sidecar}-wal`, 'keep sidecar')
  await assert.rejects(copyDatabase(source, sidecar), /already exist/)
  await assert.rejects(copyDatabase(source, `public/${randomUUID()}.sqlite`), /outside public/)
  await assert.rejects(copyDatabase(source, `dist/${randomUUID()}.sqlite`), /outside public/)
  await assert.rejects(copyDatabase(join(directory, 'missing.sqlite'), join(directory, 'new.sqlite')))
  assert.equal(existsSync(join(directory, 'missing.sqlite')), false)
  db.pragma('user_version = 999')
  await assert.rejects(copyDatabase(source, join(directory, 'unsupported.sqlite')), /schema/)
  assert.equal(existsSync(join(directory, 'unsupported.sqlite')), false)
})

test('verification rejects malformed game data without running migrations or altering the source', (t) => {
  const { db, source } = fixture(t)
  const now = Date.now(), user = createSession(db, now)
  const room = enterRoom(db, user.session.id, 'create', { requestId: randomUUID(), displayName: 'Host' }, now)
  db.prepare('INSERT INTO room_games VALUES (?, ?)').run(room.id, '{"broken":true}')
  assert.throws(() => verifyDatabase(source))
  assert.equal(db.pragma('user_version', { simple: true }), 3)
  assert.equal(db.prepare('SELECT phase FROM rooms WHERE id = ?').pluck().get(room.id), 'lobby')
})

test('hosted config refuses ephemeral or public database paths and preserves local defaults', () => {
  assert.equal(serviceConfig({}).origin, 'http://127.0.0.1:5173')
  for (const DATABASE_PATH of [undefined, ':memory:', 'relative.sqlite']) {
    assert.throws(() => serviceConfig({ NODE_ENV: 'production', APP_ORIGIN: 'https://dreamerie.example', DATABASE_PATH }), /absolute persistent/)
  }
  for (const directory of ['public', 'dist']) {
    assert.throws(() => serviceConfig({ DATABASE_PATH: join(process.cwd(), directory, 'private.sqlite') }), /outside/)
  }
  const settings = serviceConfig({ NODE_ENV: 'production', APP_ORIGIN: 'https://dreamerie.example', DATABASE_PATH: join(tmpdir(), 'private.sqlite'), HOST: '0.0.0.0', PORT: '10000' })
  assert.equal(settings.port, 10000)
  assert.equal(settings.host, '0.0.0.0')
  assert.equal(settings.production, true)
  assert.throws(() => serviceConfig({ PORT: '0' }), /PORT/)
})

test('public site entry needs no shared password while HTTPS sessions and room privacy remain enforced', async (t) => {
  const { directory, source } = fixture(t)
  const staticRoot = join(directory, 'site'), origin = 'https://dreamerie.example'
  mkdirSync(staticRoot)
  writeFileSync(join(staticRoot, 'index.html'), '<!doctype html><title>Dreamerie</title>')
  const app = await createService({ databasePath: source, origin, production: true, staticRoot })
  try {
    const home = await app.inject({ url: '/?play=rooms' })
    assert.equal(home.statusCode, 200)
    assert.equal(home.headers['www-authenticate'], undefined)
    assert.equal((await app.inject({ url: '/api/session' })).statusCode, 401)
    assert.equal((await app.inject({ method: 'POST', url: '/api/session', payload: {} })).statusCode, 403)
    async function visitor() {
      const response = await app.inject({ method: 'POST', url: '/api/session', headers: { origin }, payload: {} })
      assert.equal(response.statusCode, 200)
      assert.match(String(response.headers['set-cookie']), /Secure/)
      return { cookie: `dreamerie_session=${response.cookies[0].value}`, origin, 'x-dreamerie-csrf': response.json<SessionView>().csrfToken }
    }
    const host = await visitor(), guest = await visitor()
    assert.notEqual(host.cookie, guest.cookie)
    const created = await app.inject({ method: 'POST', url: '/api/rooms', headers: host, payload: { requestId: randomUUID(), displayName: 'Host' } })
    assert.equal(created.statusCode, 200)
    const room = created.json<RoomView>(), url = `/api/rooms/${room.id}`
    assert.equal((await app.inject({ url })).statusCode, 401)
    assert.equal((await app.inject({ url, headers: guest })).statusCode, 403)
    const joined = await app.inject({ method: 'POST', url: '/api/rooms/join', headers: guest,
      payload: { requestId: randomUUID(), displayName: 'Guest', inviteCode: room.inviteCode } })
    assert.equal(joined.statusCode, 200)
    async function act(headers: typeof host, action: GameAction) {
      const current = (await app.inject({ url, headers })).json<RoomView>()
      return app.inject({ method: 'POST', url: `${url}/commands`, headers, payload: {
        requestId: randomUUID(), expectedRevision: current.revision, weekId: current.game?.weekId ?? null, roundId: current.game?.roundId ?? null, action,
      } })
    }
    assert.equal((await act(guest, { type: 'start' })).statusCode, 403)
    const started = (await act(host, { type: 'start' })).json<RoomView>()
    const p = started.game!.preparation
    assert.equal((await act(host, { type: 'save', conceptId: p.next!.id, cardId: p.hand[0].id, clue: 'Private before reveal' })).statusCode, 200)
    const guestView = await app.inject({ url, headers: guest })
    assert.equal(guestView.statusCode, 200)
    assert.equal(guestView.headers['cache-control'], 'no-store')
    assert.equal(guestView.body.includes('Private before reveal'), false)
    assert.deepEqual(guestView.json<RoomView>().game!.preparation.saved, [])
  } finally { await app.close() }
})
