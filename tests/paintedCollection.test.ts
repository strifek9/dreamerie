import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { paintedCollection, paintedForDay } from '../src/v3/paintedCollection.ts'
import { currentDreams, playableDreams, dreamForDate } from '../src/v3/dailyDream.ts'
import { differencesFor, landscapeCollection, LANDSCAPE_SESSION_OPTIONS } from '../src/v2/landscapeCollection.ts'
import { verseForDream } from '../src/v2/dreamVerses.ts'
import { changeSession, sessionSnapshot } from '../src/game/dailySession.ts'
import { findDifference, compareResults, GAME_CONFIG } from '../src/game/dailyRecall.ts'
import { answerCrop } from '../src/v3/dreamRitual.ts'

const audit = JSON.parse(readFileSync(new URL('../docs/artwork/ORDINARY_PAINTED_PROVENANCE.json', import.meta.url), 'utf8'))

test('120 painted pairs match reviewed metadata and immutable asset checksums', () => {
  assert.equal(paintedCollection.length, 120)
  assert.equal(audit.cards.length, 120)
  const paths = new Set<string>()
  for (const card of paintedCollection) {
    const reviewed = audit.cards.find((c: { id: string }) => `painted-${c.id}` === card.id)
    assert.equal(reviewed.qa.fullComposite, 'passed')
    assert.equal(reviewed.qa.fiveAnswerCrops, 'passed')
    assert.equal(reviewed.qa.originalFinish, 'passed')
    assert.equal(card.edits.length, 5)
    assert.equal(new Set(card.edits.map(e => e.id)).size, 5)
    card.edits.forEach((e, i) => {
      const expected = reviewed.edits[i]
      assert.equal(e.label, expected.label)
      assert.deepEqual(e.box, { left: expected.box[0] / 1672, top: expected.box[1] / 941, width: expected.box[2] / 1672, height: expected.box[3] / 941 })
      assert.equal(e.edgeFade, expected.edgeFade ?? 2)
      assert.equal(e.maskPath, expected.maskPath)
      assert.equal(e.source?.split('/').at(-1), expected.source?.split('/').at(-1))
    })
    assert.equal(verseForDream(card.id.replace(/^painted-/, '')).length, 2)
    for (const path of [card.original, card.altered, ...card.edits.flatMap(e => e.source ? [e.source] : [])]) paths.add(path)
  }
  assert.equal(paths.size, audit.assets.length)
  for (const path of paths) {
    const png = readFileSync(new URL(`../public${path}`, import.meta.url))
    const record = audit.assets.find((a: { file: string }) => path.endsWith('/' + a.file))
    assert.ok(record, path)
    assert.equal(createHash('sha256').update(png).digest('hex'), record.sha256, path)
    assert.equal(png.subarray(1, 4).toString(), 'PNG')
    assert.ok(Math.abs(png.readUInt32BE(16) - 1672) <= 1, path)
    assert.equal(png.readUInt32BE(20), 941, path)
  }
})

test('all 600 painted differences are independently reachable, fit answer crops and finish in five confirmations', () => {
  for (const card of paintedCollection) {
    const differences = differencesFor(card)
    let session = changeSession(null, { type: 'start' }, card.id, differences, 1000, card.aspectRatio)
    for (const [i, d] of differences.entries()) {
      const b = d.box
      assert.ok(b.left >= 0 && b.top >= 0 && b.width > 0 && b.height > 0 && b.left + b.width <= 1 && b.top + b.height <= 1, `${card.id}/${d.id} bounds`)
      const crop = answerCrop(b), epsilon = 1e-6
      assert.ok(crop.x <= b.left * 1672 + epsilon && crop.y <= b.top * 941 + epsilon)
      assert.ok(crop.x + crop.width >= (b.left + b.width) * 1672 - epsilon && crop.y + crop.height >= (b.top + b.height) * 941 - epsilon)
      const candidates = [.5, .25, .75, .1, .9].flatMap(x => [.5, .25, .75, .1, .9].map(y => ({ x: b.left + b.width * x, y: b.top + b.height * y })))
      const point = candidates.find(p => findDifference(p, [], differences, card.aspectRatio)?.id === d.id)
      assert.ok(point, `${card.id}/${d.id} reachable`)
      const side = i % 2 ? 'original' : 'changed'
      session = changeSession(session, { type: 'mark', point, side }, card.id, differences, 2000 + i * 1000, card.aspectRatio)
      assert.equal(session!.guesses.length, i, 'tapping only moves a marker')
      const action = { type: 'confirm', point, side, expectedCount: i } as const
      session = changeSession(session, action, card.id, differences, 2000 + i * 1000, card.aspectRatio)
      session = changeSession(session, action, card.id, differences, 2500 + i * 1000, card.aspectRatio)
      assert.equal(session!.guesses.length, i + 1, 'one confirmation consumes exactly one guess')
      assert.equal(findDifference(point, [d.id], differences, card.aspectRatio), undefined, 'repeat cannot score a neighbor')
      const edge = { x: d.x, y: b.top + b.height + GAME_CONFIG.guessRadius * card.aspectRatio }
      assert.equal(findDifference(edge, [], [d], card.aspectRatio)?.id, d.id, 'circle edge overlap still counts')
    }
    assert.equal(sessionSnapshot(session, differences, 7000, card.aspectRatio).result?.accuracy, 5, card.id)
    assert.equal(changeSession(session, { type: 'confirm', point: differences[0], side: 'original', expectedCount: 5 }, card.id, differences, 8000, card.aspectRatio)!.guesses.length, 5)
  }
})

test('painted duplicates consume guesses, expiry cannot pause, and accuracy always outranks time', () => {
  for (const card of paintedCollection) {
    const differences = differencesFor(card), point = differences[4]
    let session = changeSession(null, { type: 'start' }, card.id, differences, 1000, card.aspectRatio)
    for (let i = 0; i < 7; i++) {
      session = changeSession(session, { type: 'mark', point, side: 'original' }, card.id, differences, 2000 + i * 1000, card.aspectRatio)
      session = changeSession(session, { type: 'confirm', point, side: 'original', expectedCount: i }, card.id, differences, 2000 + i * 1000, card.aspectRatio)
    }
    assert.equal(session!.guesses.length, 5)
    const result = sessionSnapshot(session, differences, 9000, card.aspectRatio).result!
    assert.equal(result.accuracy, 1, card.id)
    assert.equal(result.elapsedSeconds, 5)
    assert.deepEqual(sessionSnapshot(JSON.parse(JSON.stringify(session)), differences, 999000, card.aspectRatio).result, result)
    const started = changeSession(null, { type: 'start' }, card.id, differences, 1000, card.aspectRatio)
    assert.equal(changeSession(started, { type: 'start' }, card.id, differences, 60000, card.aspectRatio)!.startedAt, 1000)
    assert.deepEqual(sessionSnapshot(started, differences, 121000, card.aspectRatio).result, { accuracy: 0, elapsedSeconds: 120, reason: 'time' })
    assert.ok(compareResults({ ...result, accuracy: 5, elapsedSeconds: 119 }, { ...result, accuracy: 4, elapsedSeconds: 1 }) < 0)
    assert.ok(compareResults({ ...result, elapsedSeconds: 20 }, { ...result, elapsedSeconds: 30 }) < 0)
    assert.equal(compareResults(result, { ...result }), 0)
  }
})

test('painted rotation preserves order and every old saved round keeps its own artwork and deadline', () => {
  assert.equal(currentDreams.length, 138)
  assert.equal(playableDreams.length, 276)
  assert.equal(LANDSCAPE_SESSION_OPTIONS.namespace, 'dreamerie:v2:daily-collection:v1')
  for (const [index, card] of landscapeCollection.entries()) {
    assert.equal(paintedForDay(index + 1).id, `painted-${card.id}`)
    assert.equal(paintedForDay(index + 121).id, `painted-${card.id}`)
    assert.ok(!currentDreams.includes(card))
    const differences = differencesFor(card)
    const saved = changeSession(null, { type: 'start' }, card.id, differences, 1000, card.aspectRatio)
    const restored = dreamForDate(new Date(2026, 8, 28), JSON.stringify(saved))
    assert.equal(restored, card)
    assert.deepEqual(differencesFor(restored), differences)
    assert.equal(sessionSnapshot(saved, differences, 121000, card.aspectRatio).result?.elapsedSeconds, 120)
  }
  assert.throws(() => paintedForDay(NaN))
})
