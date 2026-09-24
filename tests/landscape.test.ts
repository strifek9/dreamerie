import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { landscapeDifferences as differences, landscapeDream as dream, V2_SESSION_OPTIONS } from '../src/v2/landscapeDream.ts'
import { changeSession, sessionSnapshot, type DailySession } from '../src/game/dailySession.ts'
import { compareResults, findDifference, GAME_CONFIG } from '../src/game/dailyRecall.ts'

const at = 1800000000000
const change = (session: DailySession | null, action: Parameters<typeof changeSession>[1], now = at) => changeSession(session, action, dream.id, differences, now, dream.aspectRatio)!
test('V2 preserves full-resolution originals and exactly five reachable landscape regions', () => {
  assert.equal(differences.length, 5)
  for (const path of [dream.original, dream.altered]) {
    const png = readFileSync(new URL(`../public${path}`, import.meta.url))
    assert.ok(png.readUInt32BE(16) >= 1600)
    assert.ok(png.readUInt32BE(20) >= 900)
  }
  for (const d of differences) assert.equal(findDifference(d, [], differences, dream.aspectRatio)?.id, d.id)
  assert.notEqual(V2_SESSION_OPTIONS.namespace, 'dreamerie:daily:v1')
})
test('landscape circle overlap uses width units on both axes, including edges', () => {
  const d = differences[0]
  const y = d.box.top + d.box.height + GAME_CONFIG.guessRadius * dream.aspectRatio
  assert.equal(findDifference({ x: d.x, y }, [], [d], dream.aspectRatio)?.id, d.id)
  assert.equal(findDifference({ x: d.x, y: y + .001 }, [], [d], dream.aspectRatio), undefined)
})
test('marking either landscape never submits; duplicate confirmations cannot score or consume twice', () => {
  let session = change(null, { type: 'start' })
  for (const side of ['original', 'changed'] as const) session = change(session, { type: 'mark', point: differences[0], side })
  assert.equal(session.guesses.length, 0)
  const confirm = { type: 'confirm', point: differences[0], side: 'changed', expectedCount: 0 } as const
  session = change(session, confirm, at + 1000)
  session = change(session, confirm, at + 1500)
  assert.equal(session.guesses.length, 1)
  for (let i = 1; i < 6; i++) {
    session = change(session, { type: 'mark', point: differences[0], side: 'original' }, at + i * 2000)
    session = change(session, { type: 'confirm', point: differences[0], side: 'original', expectedCount: i }, at + i * 2000)
  }
  assert.equal(session.guesses.length, 5)
  assert.equal(sessionSnapshot(session, differences, at + 20000, dream.aspectRatio).result?.accuracy, 1)
})
test('V2 deadline cannot pause or restart and whole-second results rank accuracy first', () => {
  const session = change(null, { type: 'start' })
  assert.equal(change(session, { type: 'start' }, at + 60000).startedAt, at)
  const result = sessionSnapshot(JSON.parse(JSON.stringify(session)), differences, at + 150000, dream.aspectRatio).result!
  assert.deepEqual(result, { accuracy: 0, elapsedSeconds: 120, reason: 'time' })
  assert.ok(compareResults({ ...result, accuracy: 5 }, { ...result, accuracy: 4, elapsedSeconds: 1 }) < 0)
  assert.ok(compareResults({ ...result, elapsedSeconds: 20 }, { ...result, elapsedSeconds: 30 }) < 0)
  assert.equal(compareResults(result, { ...result }), 0)
})
