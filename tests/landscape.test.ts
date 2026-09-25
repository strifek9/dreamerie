import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { landscapeDifferences as differences, landscapeDream as dream, V2_SESSION_OPTIONS } from '../src/v2/landscapeDream.ts'
import { changeSession, sessionSnapshot, type DailySession } from '../src/game/dailySession.ts'
import { compareResults, findDifference, GAME_CONFIG } from '../src/game/dailyRecall.ts'
import { differencesFor, landscapeCollection, landscapeDay, landscapeForDay, LANDSCAPE_SESSION_OPTIONS } from '../src/v2/landscapeCollection.ts'
import { dreamVerses, verseForDream } from '../src/v2/dreamVerses.ts'

test('all 120 daily paintings have their own short couplet, stable on reload and rotation', () => {
  assert.deepEqual(Object.keys(dreamVerses).sort(), landscapeCollection.map(card => card.id).sort())
  const poems = new Set<string>()
  for (const card of landscapeCollection) {
    const lines = verseForDream(card.id)
    assert.equal(lines.length, 2)
    for (const line of lines) assert.ok(line.trim().length > 10 && line.length <= 80, card.id)
    const sentences = lines.join(' ').split(/[.!?]+/u).filter(sentence => sentence.trim())
    assert.ok(sentences.length >= 1 && sentences.length <= 2, `${card.id}: at most two sentences`)
    poems.add(lines.join('\n'))
  }
  assert.equal(poems.size, 120)
  assert.deepEqual(verseForDream(landscapeForDay(1).id), verseForDream(landscapeForDay(121).id))
  assert.notDeepEqual(verseForDream(landscapeForDay(1).id), verseForDream(landscapeForDay(2).id))
  assert.throws(() => verseForDream('missing-card'), /Missing dream verse/)
})

test('all 120 landscape cards have five distinct reachable answers and can finish perfectly', () => {
  assert.equal(landscapeCollection.length, 120)
  assert.equal(new Set(landscapeCollection.map(c => c.id)).size, 120)
  for (const card of landscapeCollection) {
    const edits = differencesFor(card)
    assert.equal(edits.length, 5, card.id)
    assert.equal(new Set(edits.map(d => d.id)).size, 5, card.id)
    let session: DailySession | null = changeSession(null, { type: 'start' }, card.id, edits, 1000, card.aspectRatio)
    for (const [index, d] of edits.entries()) {
      for (const value of Object.values(d.box)) assert.ok(Number.isFinite(value) && value >= 0 && value <= 1, `${card.id}/${d.id}`)
      assert.ok(d.box.width > 0 && d.box.height > 0, `${card.id}/${d.id} has a visible area`)
      assert.ok(d.box.left + d.box.width <= 1 && d.box.top + d.box.height <= 1, `${card.id}/${d.id} in frame`)
      // A small detail may legitimately sit inside a larger changed object.
      const candidates = [.5, .25, .75].flatMap(x => [.5, .25, .75].map(y => ({ x: d.box.left + d.box.width * x, y: d.box.top + d.box.height * y })))
      const point = candidates.find(p => findDifference(p, [], edits, card.aspectRatio)?.id === d.id)
      assert.ok(point, `${card.id}/${d.id} independently reachable`)
      session = changeSession(session, { type: 'mark', point, side: index % 2 ? 'original' : 'changed' }, card.id, edits, 2000 + index * 1000, card.aspectRatio)
      assert.equal(session!.guesses.length, index, 'mark does not confirm')
      session = changeSession(session, { type: 'confirm', point, side: index % 2 ? 'original' : 'changed', expectedCount: index }, card.id, edits, 2000 + index * 1000, card.aspectRatio)
    }
    assert.equal(sessionSnapshot(session, edits, 7000, card.aspectRatio).result?.accuracy, 5, card.id)
    for (const path of new Set([card.original, card.altered, ...card.edits.flatMap(d => d.source ? [d.source] : [])])) {
      const png = readFileSync(new URL(`../public${path}`, import.meta.url))
      assert.ok(png.readUInt32BE(16) >= 1600 && png.readUInt32BE(20) >= 900, path)
    }
  }
})

test('daily landscape rotation visits every card, wraps, and isolates existing saved games', () => {
  assert.equal(landscapeDay(new Date(2026, 8, 24, 0, 0)), 1)
  assert.equal(landscapeDay(new Date(2026, 8, 24, 23, 59)), 1)
  assert.equal(landscapeDay(new Date(2026, 8, 25, 0, 0)), 2)
  assert.equal(new Set(Array.from({ length: 120 }, (_, i) => landscapeForDay(i + 1).id)).size, 120)
  assert.equal(landscapeForDay(121).id, landscapeForDay(1).id)
  assert.equal(landscapeForDay(0).id, landscapeForDay(120).id)
  assert.throws(() => landscapeForDay(NaN))
  assert.notEqual(LANDSCAPE_SESSION_OPTIONS.namespace, V2_SESSION_OPTIONS.namespace)
  assert.notEqual(LANDSCAPE_SESSION_OPTIONS.namespace, 'dreamerie:daily:v1')
})

test('every collection card matches its visual audit and preserves the five-guess ceiling on repeats and expiry', () => {
  const audit = JSON.parse(readFileSync(new URL('../docs/artwork/V2_PLAYABLE_AUDIT.json', import.meta.url), 'utf8'))
  for (const card of landscapeCollection) {
    const reviewed = audit.cards.find((c: { id: string }) => c.id === card.id)
    assert.equal(reviewed.status, 'composite-reviewed', card.id)
    assert.deepEqual(card.edits, reviewed.differences, card.id)
    const edits = differencesFor(card)
    const d = edits[0]
    const point = [.5, .25, .75].flatMap(x => [.5, .25, .75].map(y => ({ x: d.box.left + d.box.width * x, y: d.box.top + d.box.height * y }))).find(p => findDifference(p, [], edits, card.aspectRatio)?.id === d.id)!
    let session = changeSession(null, { type: 'start' }, card.id, edits, 1000, card.aspectRatio)
    for (let i = 0; i < 7; i++) {
      session = changeSession(session, { type: 'mark', point, side: 'changed' }, card.id, edits, 2000 + i * 1000, card.aspectRatio)
      session = changeSession(session, { type: 'confirm', point, side: 'changed', expectedCount: i }, card.id, edits, 2000 + i * 1000, card.aspectRatio)
    }
    assert.equal(session!.guesses.length, 5, card.id)
    const result = sessionSnapshot(session, edits, 20000, card.aspectRatio).result!
    assert.equal(result.accuracy, 1, card.id)
    assert.equal(result.elapsedSeconds, 5, card.id)
    assert.deepEqual(sessionSnapshot(JSON.parse(JSON.stringify(session)), edits, 200000, card.aspectRatio).result, result, card.id)
    const started = changeSession(null, { type: 'start' }, card.id, edits, 1000, card.aspectRatio)
    const expired = changeSession(started, { type: 'mark', point, side: 'original' }, card.id, edits, 122000, card.aspectRatio)
    assert.deepEqual(sessionSnapshot(expired, edits, 122000, card.aspectRatio).result, { accuracy: 0, elapsedSeconds: 120, reason: 'time' }, card.id)
  }
})

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
