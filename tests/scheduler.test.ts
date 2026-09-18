import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test, type TestContext } from 'node:test'
import { createService } from '../server/http.ts'
import { openStore } from '../server/store.ts'
import { advanceDueRoom, initializeSchedules, runDueRooms } from '../server/scheduler.ts'
import { chicagoMidnight, fullDayDeadline } from '../server/roomClock.ts'
import { readGame } from '../server/gameState.ts'
import type { GameAction, GameCommand } from '../shared/game.ts'
import type { RoomView, SessionView } from '../shared/rooms.ts'
import { playerId } from '../shared/parse.ts'

const origin = 'http://127.0.0.1:5173'
type App = Awaited<ReturnType<typeof createService>>
interface User { cookie: string; csrf: string }
async function fixture(t: TestContext, interval = 60_000) {
  const directory = mkdtempSync(join(tmpdir(), 'dreamerie-clock-'))
  const databasePath = join(directory, 'room.sqlite')
  const clock = { now: Date.parse('2026-03-07T19:00:00Z') }
  const options = { databasePath, origin, rateLimits: false, now: () => clock.now, schedulerIntervalMs: interval }
  const app = await createService(options)
  const db = openStore(databasePath)
  t.after(async () => { await app.close(); db.close(); rmSync(directory, { recursive: true, force: true }) })
  const users: User[] = []
  for (let i = 0; i < 3; i++) {
    const response = await app.inject({ method: 'POST', url: '/api/session', headers: { origin }, payload: {} })
    users.push({ cookie: `dreamerie_session=${response.cookies[0].value}`, csrf: response.json<SessionView>().csrfToken })
  }
  let room = (await post(app, users[0], '/api/rooms', { requestId: randomUUID(), displayName: 'Host' })).json<RoomView>()
  for (let i = 1; i < 3; i++) await post(app, users[i], '/api/rooms/join', { requestId: randomUUID(), displayName: `Friend ${i}`, inviteCode: room.inviteCode })
  room = await act(app, users[0], room.id, { type: 'start' })
  return { app, db, room, users, clock, options }
}
function post(app: App, user: User, url: string, payload: object) {
  return app.inject({ method: 'POST', url, headers: { origin, cookie: user.cookie, 'x-dreamerie-csrf': user.csrf }, payload })
}
async function view(app: App, user: User, id: string) {
  const response = await app.inject({ url: `/api/rooms/${id}`, headers: { cookie: user.cookie } })
  assert.equal(response.statusCode, 200, response.body)
  return response.json<RoomView>()
}
function command(room: RoomView, action: GameAction): GameCommand {
  return { requestId: randomUUID(), expectedRevision: room.revision, weekId: room.game?.weekId ?? null, roundId: room.game?.roundId ?? null, action }
}
const send = (app: App, user: User, id: string, body: GameCommand) => post(app, user, `/api/rooms/${id}/commands`, body)
async function act(app: App, user: User, id: string, action: GameAction) {
  const response = await send(app, user, id, command(await view(app, user, id), action))
  assert.equal(response.statusCode, 200, response.body)
  return response.json<RoomView>()
}
async function prepare(app: App, user: User, id: string) {
  let room = await view(app, user, id)
  while (room.game!.preparation.next) {
    const preparation = room.game!.preparation
    room = await act(app, user, id, { type: 'save', conceptId: preparation.next!.id, cardId: preparation.hand[0].id, clue: 'A clock made of clouds' })
  }
}
async function finish(app: App, db: ReturnType<typeof openStore>, user: User, id: string) {
  let room = await view(app, user, id)
  while (room.game!.board!.currentFriend) {
    const board = room.game!.board!
    const playerId = board.currentFriend!.id
    const actual = readGame(db, id)!.week.dreams.get(playerId)!.get(board.concept.id)!
    room = await act(app, user, id, { type: 'lock', playerId, cardId: actual })
  }
}

test('Chicago calendar deadlines handle full-day windows, both DST changes, leap days and year rollover', () => {
  assert.equal(new Date(fullDayDeadline(Date.parse('2026-09-14T23:00:00Z'))).toISOString(), '2026-09-16T05:00:00.000Z')
  const spring = Date.parse('2026-03-08T06:00:00Z')
  assert.equal(chicagoMidnight(spring, 1) - spring, 23 * 60 * 60 * 1000)
  const autumn = Date.parse('2026-11-01T05:00:00Z')
  assert.equal(chicagoMidnight(autumn, 1) - autumn, 25 * 60 * 60 * 1000)
  assert.equal(new Date(fullDayDeadline(Date.parse('2026-03-07T19:00:00Z'))).toISOString(), '2026-03-09T05:00:00.000Z')
  assert.equal(new Date(fullDayDeadline(Date.parse('2028-02-28T18:00:00Z'))).toISOString(), '2028-03-01T06:00:00.000Z')
  assert.equal(new Date(fullDayDeadline(Date.parse('2026-12-31T18:00:00Z'))).toISOString(), '2027-01-02T06:00:00.000Z')
  assert.throws(() => fullDayDeadline(NaN), /clock/)
})

test('background loop advances without browser requests, reveals missed days, and stops with the service', async (t) => {
  const { app, db, room, users, clock } = await fixture(t, 10)
  for (const user of users) await prepare(app, user, room.id)
  clock.now = room.schedule!.deadline
  const phase = () => db.prepare<[string], { phase: string }>('SELECT phase FROM rooms WHERE id = ?').get(room.id)!.phase
  for (let i = 0; i < 100 && phase() !== 'guessing'; i++) await new Promise((resolve) => setTimeout(resolve, 10))
  assert.equal(phase(), 'guessing')
  assert.equal(readGame(db, room.id)!.roundIndex, 0)
  const opened = await view(app, users[0], room.id)
  assert.equal(opened.schedule!.deadline, chicagoMidnight(clock.now, 1))
  clock.now = opened.schedule!.deadline
  for (let i = 0; i < 100 && readGame(db, room.id)!.roundIndex === 0; i++) await new Promise((resolve) => setTimeout(resolve, 10))
  assert.equal(readGame(db, room.id)!.roundIndex, 1)
  const after = await view(app, users[0], room.id)
  assert.equal(after.game!.history[0].missed, true)
  assert.equal(after.game!.history[0].reveal.points, 0)
  assert.equal(db.prepare('SELECT * FROM round_outcomes').all().length, 3)
  await app.close()
  clock.now = after.schedule!.deadline
  await new Promise((resolve) => setTimeout(resolve, 35))
  assert.equal(readGame(db, room.id)!.roundIndex, 1)
})

test('deadline rejects late save/guess/unlock and preserves due work even when the command fails', async (t) => {
  const { app, db, room, users, clock } = await fixture(t)
  for (const user of users) await prepare(app, user, room.id)
  clock.now = room.schedule!.deadline
  const opened = await view(app, users[0], room.id)
  await finish(app, db, users[0], room.id)
  const locked = await view(app, users[0], room.id)
  const guest = await view(app, users[1], room.id)
  const board = guest.game!.board!
  const lastGuess = command(guest, { type: 'lock', playerId: board.currentFriend!.id, cardId: board.cards[1].id })
  clock.now = opened.schedule!.deadline
  const responses = await Promise.all([
    send(app, users[1], room.id, lastGuess),
    send(app, users[0], room.id, command(locked, { type: 'unlock', cardId: locked.game!.board!.locks[0][0] })),
    send(app, users[0], room.id, command(locked, { type: 'reveal', confirmMissing: locked.game!.unfinishedPlayerIds })),
  ])
  assert.ok(responses.every((response) => response.statusCode === 409))
  const after = await view(app, users[0], room.id)
  assert.equal(after.game!.day, 3)
  assert.equal(after.game!.history[0].reveal.points, 2)
  assert.equal(db.prepare('SELECT * FROM round_outcomes').all().length, 3)
  assert.equal(advanceDueRoom(db, room.id, clock.now, opened.schedule!.deadline), 0)
})

test('manual progression resets only newly opened days; reveal and accepted retries never extend a cutoff', async (t) => {
  const { app, db, room, users, clock } = await fixture(t)
  for (const user of users) await prepare(app, user, room.id)
  clock.now = room.schedule!.deadline - 60_000
  let opened = await act(app, users[0], room.id, { type: 'open-day' })
  assert.equal(opened.schedule!.deadline, fullDayDeadline(clock.now))
  assert.equal(advanceDueRoom(db, room.id, room.schedule!.deadline, room.schedule!.deadline), 0)
  for (const user of users) await finish(app, db, user, room.id)
  const current = await view(app, users[0], room.id)
  const reveal = command(current, { type: 'reveal' })
  opened = (await send(app, users[0], room.id, reveal)).json<RoomView>()
  assert.equal(opened.schedule!.deadline, current.schedule!.deadline)
  clock.now += 120_000
  const advanced = await act(app, users[0], room.id, { type: 'advance' })
  assert.equal(advanced.schedule!.deadline, fullDayDeadline(clock.now))
  const retried = await send(app, users[0], room.id, reveal)
  assert.equal(retried.statusCode, 200)
  assert.deepEqual(retried.json<RoomView>(), advanced)
  assert.equal(db.prepare('SELECT * FROM round_outcomes').all().length, 3)
})

test('restart catches up an entire overdue week with no players online and no duplicate scores', async (t) => {
  const { app, db, room, users, clock, options } = await fixture(t)
  for (const user of users) await prepare(app, user, room.id)
  await app.close()
  clock.now = Date.parse('2026-03-20T18:00:00Z')
  const restarted = await createService(options)
  try {
    const stored = db.prepare<[string], { phase: string }>('SELECT phase FROM rooms WHERE id = ?').get(room.id)!
    assert.equal(stored.phase, 'complete')
    assert.equal(db.prepare('SELECT * FROM round_outcomes').all().length, 18)
    const completed = await view(restarted, users[0], room.id)
    assert.equal(completed.schedule, undefined)
    assert.equal(completed.game!.history.length, 6)
    assert.ok(completed.game!.history.every((day) => day.missed && day.reveal.points === 0))
    assert.equal(completed.game!.totalScore, 0)
    assert.equal(advanceDueRoom(db, room.id, clock.now), 0)
    assert.deepEqual(await view(restarted, users[0], room.id), completed)
  } finally { await restarted.close() }
})

test('empty preparation catches up as missed days and a late join cannot enter the final opened day', async (t) => {
  const { app, db, room, users, clock } = await fixture(t)
  const prep = room.game!.preparation
  const staleSave = command(room, { type: 'save', conceptId: prep.next!.id, cardId: prep.hand[0].id, clue: 'Too late' })
  clock.now = room.schedule!.deadline
  assert.equal((await send(app, users[0], room.id, staleSave)).statusCode, 409)
  assert.equal(readGame(db, room.id)!.week.dreams.get(playerId(room.selfId))!.size, 0)
  for (let day = 2; day < 7; day++) clock.now = chicagoMidnight(clock.now, 1)
  const newcomer = await app.inject({ method: 'POST', url: '/api/session', headers: { origin }, payload: {} })
  const user = { cookie: `dreamerie_session=${newcomer.cookies[0].value}`, csrf: newcomer.json<SessionView>().csrfToken }
  assert.equal((await post(app, user, '/api/rooms/join', { requestId: randomUUID(), displayName: 'Late', inviteCode: room.inviteCode })).statusCode, 409)
  const current = await view(app, users[0], room.id)
  assert.equal(current.game!.day, 7)
  assert.equal(current.members.length, 3)
  assert.equal(current.game!.history.length, 5)
  assert.ok(current.game!.history.every((day) => day.missed))
})

test('upgrade gives existing manual rooms one fresh window and never extends it again', async (t) => {
  const { app, db, room, users, clock, options } = await fixture(t)
  await prepare(app, users[0], room.id)
  const before = readGame(db, room.id)
  await app.close()
  // Recreate the previous schema in this isolated test database.
  db.exec('DROP TABLE room_schedules; PRAGMA user_version = 2;')
  clock.now = Date.parse('2026-03-20T18:00:00Z')
  const restarted = await createService(options)
  try {
    const upgraded = await view(restarted, users[0], room.id)
    assert.equal(upgraded.phase, 'preparation')
    assert.equal(upgraded.schedule!.deadline, fullDayDeadline(clock.now))
    assert.deepEqual(readGame(db, room.id), before)
    initializeSchedules(db, clock.now + 12 * 60 * 60 * 1000)
    assert.deepEqual(await view(restarted, users[0], room.id), upgraded)
    assert.equal(db.prepare('SELECT * FROM round_outcomes').all().length, 0)
  } finally { await restarted.close() }
})

test('failed due transition rolls back results, exposure, phase and deadline for retry', async (t) => {
  const { app, db, room, users, clock } = await fixture(t)
  for (const user of users) await prepare(app, user, room.id)
  const opened = await act(app, users[0], room.id, { type: 'open-day' })
  const before = readGame(db, room.id)
  db.exec(`CREATE TRIGGER fail_next_game BEFORE UPDATE ON room_games BEGIN SELECT RAISE(ABORT, 'test interruption'); END;`)
  clock.now = opened.schedule!.deadline
  const failures: string[] = []
  runDueRooms(db, clock.now, (id) => failures.push(id))
  assert.deepEqual(failures, [room.id])
  assert.deepEqual(readGame(db, room.id), before)
  assert.equal(db.prepare('SELECT * FROM round_outcomes').all().length, 0)
  assert.equal(db.prepare<[string], { deadline: number }>('SELECT deadline FROM room_schedules WHERE room_id = ?').get(room.id)!.deadline, opened.schedule!.deadline)
  db.exec('DROP TRIGGER fail_next_game')
  assert.equal(advanceDueRoom(db, room.id, clock.now), 1)
  assert.equal(db.prepare('SELECT * FROM round_outcomes').all().length, 3)
})

test('host reveal before midnight preserves scores while the timer opens the next day', async (t) => {
  const { app, db, room, users, clock } = await fixture(t)
  for (const user of users) await prepare(app, user, room.id)
  const opened = await act(app, users[0], room.id, { type: 'open-day' })
  clock.now = opened.schedule!.deadline - 1
  for (const user of users) await finish(app, db, user, room.id)
  const revealed = await act(app, users[0], room.id, { type: 'reveal' })
  assert.equal(revealed.game!.totalScore, 2)
  const outcomes = db.prepare('SELECT * FROM round_outcomes').all()
  clock.now++
  assert.equal(advanceDueRoom(db, room.id, clock.now), 1)
  const next = await view(app, users[0], room.id)
  assert.equal(next.game!.day, 3)
  assert.equal(next.game!.totalScore, 2)
  assert.deepEqual(next.game!.history, revealed.game!.history)
  assert.deepEqual(db.prepare('SELECT * FROM round_outcomes').all(), outcomes)
})
