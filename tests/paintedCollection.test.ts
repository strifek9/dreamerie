import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { paintedCollection, paintedForDay, publishedPaintedCollection, supersededPaintedCollection } from '../src/v3/paintedCollection.ts'
import { revisitedCollection, revisitIds } from '../src/v3/revisitedCollection.generated.ts'
import { supersededHolidayDreams } from '../src/v3/holidayDreams.ts'
import { v3CurrentDreams as currentDreams, playableDreams, dreamForDate } from '../src/v3/dailyDream.ts'
import { differencesFor, landscapeCollection, LANDSCAPE_SESSION_OPTIONS } from '../src/v2/landscapeCollection.ts'
import { verseForDream } from '../src/v2/dreamVerses.ts'
import { changeSession, sessionSnapshot } from '../src/game/dailySession.ts'
import { findDifference, compareResults, GAME_CONFIG } from '../src/game/dailyRecall.ts'
import { answerCrop } from '../src/v3/dreamRitual.ts'
import { yearExpansion, yearVerses } from '../src/v3/yearExpansion.generated.ts'

const audit = JSON.parse(readFileSync(new URL('../docs/artwork/ORDINARY_PAINTED_PROVENANCE.json', import.meta.url), 'utf8'))

test('37 revisited pairs match inspected sources and preserve all superseded saved attempts', () => {
  const review = JSON.parse(readFileSync(new URL('../docs/artwork/REVISIT_PROVENANCE.json', import.meta.url), 'utf8'))
  assert.equal(revisitedCollection.length, 37)
  assert.equal(supersededPaintedCollection.length, 35)
  assert.equal(supersededHolidayDreams.length, 2)
  for (const card of revisitedCollection) {
    const plan = review.cards.find((p: { id: string }) => p.id === card.id)
    assert.equal(plan.qa.fullComposite, 'passed')
    assert.equal(plan.qa.fiveAnswerCrops, 'passed')
    assert.equal(card.edits.length, 5)
    assert.equal(revisitIds[plan.previousId], card.id)
    assert.ok(currentDreams.some(current => current.id === card.id))
    card.edits.forEach((edit, index) => {
      const expected = plan.edits[index]
      assert.equal(edit.label, expected.label)
      assert.equal(edit.source?.split('/').at(-1), expected.source?.split('/').at(-1))
      assert.deepEqual(edit.box, {left:expected.box[0]/1672,top:expected.box[1]/941,width:expected.box[2]/1672,height:expected.box[3]/941})
    })
  }
  for (const record of review.assets) {
    const png = readFileSync(new URL(`../public/artwork/v3/collection-revisit-v1/${record.file}`, import.meta.url))
    assert.equal(createHash('sha256').update(png).digest('hex'), record.sha256)
    assert.equal(png.readUInt32BE(16), record.width)
    assert.equal(png.readUInt32BE(20), record.height)
  }
  for (const old of [...supersededPaintedCollection, ...supersededHolidayDreams]) {
    assert.ok(!currentDreams.includes(old))
    assert.equal(playableDreams.find(card => card.id === old.id), old)
    const differences = differencesFor(old)
    let saved = changeSession(null, {type:'start'}, old.id, differences, 1000, old.aspectRatio)
    saved = changeSession(saved, {type:'mark',point:differences[0],side:'original'}, old.id, differences, 2000, old.aspectRatio)
    saved = changeSession(saved, {type:'confirm',point:differences[0],side:'original',expectedCount:0}, old.id, differences, 2000, old.aspectRatio)
    const raw = JSON.stringify(saved)
    assert.equal(dreamForDate(new Date(2026,10,11), raw), old)
    assert.deepEqual(sessionSnapshot(saved,differences,121000,old.aspectRatio).result,{accuracy:1,elapsedSeconds:120,reason:'time'})
    assert.equal(JSON.stringify(saved),raw)
  }
})

test('all 245 expansion pairs match reviewed geometry, corrections, verses and native master hashes', () => {
  const expansion = JSON.parse(readFileSync(new URL('../docs/artwork/YEAR_EXPANSION_PROVENANCE.json', import.meta.url), 'utf8'))
  assert.equal(yearExpansion.length, 245)
  assert.equal(expansion.cards.length, 245)
  assert.deepEqual(publishedPaintedCollection.slice(120), yearExpansion)
  const paths = new Set<string>()
  for (const [i, card] of yearExpansion.entries()) {
    assert.equal(card.id, `painted-dream-${i + 121}`)
    const reviewed = expansion.cards[i]
    assert.match(reviewed.status, /^visual QA passed/)
    assert.equal(card.title, reviewed.title)
    assert.equal(card.edits.length, 5)
    card.edits.forEach((edit, index) => {
      const expected = reviewed.edits[index]
      assert.equal(edit.id, expected.id)
      assert.equal(edit.label, expected.label)
      assert.equal(edit.edgeFade, expected.edgeFade ?? 2)
      assert.equal(edit.maskPath, expected.maskPath)
      assert.equal(edit.source?.split('/').at(-1), expected.source?.split('/').at(-1))
      assert.deepEqual(edit.box, { left: expected.box[0]/1672, top: expected.box[1]/941, width: expected.box[2]/1672, height: expected.box[3]/941 })
    })
    assert.deepEqual(yearVerses[reviewed.id], typeof reviewed.verse === 'string' ? reviewed.verse.split('\n') : reviewed.verse)
    assert.ok(yearVerses[reviewed.id].every(line => line.length > 10 && line.length < 150))
    for (const path of [card.original, card.altered, ...card.edits.flatMap(e => e.source ? [e.source] : [])]) paths.add(path)
  }
  assert.equal(paths.size, expansion.assets.length)
  for (const path of paths) {
    const png = readFileSync(new URL(`../public${path}`, import.meta.url))
    const record = expansion.assets.find((a: { file: string }) => path.endsWith('/' + a.file))
    assert.ok(record, path)
    assert.equal(createHash('sha256').update(png).digest('hex'), record.sha256, path)
    assert.equal(png.readUInt32BE(16), record.width)
    assert.equal(png.readUInt32BE(20), record.height)
  }
  const replacement = yearExpansion.find(card => card.id === 'painted-dream-214')!
  assert.equal(replacement.title, 'The Laundry of Borrowed Shadows')
  assert.match(replacement.original, /dream-214-replacement-v1.png$/)
})

test('365-day wrap preserves published positions and all saved painted attempts across schedule changes', () => {
  assert.equal(paintedForDay(120).id, 'painted-dream-120')
  assert.equal(paintedForDay(121).id, 'painted-dream-121')
  assert.equal(paintedForDay(365).id, 'painted-dream-365')
  assert.equal(paintedForDay(366).id, 'painted-dream-001')
  assert.equal(paintedForDay(0).id, 'painted-dream-365')
  for (const [index, card] of paintedCollection.entries()) {
    assert.equal(paintedForDay(index + 366), card)
    const differences = differencesFor(card)
    let session = changeSession(null, { type: 'start' }, card.id, differences, 1000, card.aspectRatio)
    session = changeSession(session, { type: 'mark', point: differences[0], side: 'changed' }, card.id, differences, 2000, card.aspectRatio)
    session = changeSession(session, { type: 'confirm', point: differences[0], side: 'changed', expectedCount: 0 }, card.id, differences, 2000, card.aspectRatio)
    const raw = JSON.stringify(session)
    assert.equal(dreamForDate(new Date(2027, 9, 31), raw), card, 'saved card wins even on a holiday')
    assert.equal(session!.startedAt, 1000)
    assert.equal(sessionSnapshot(session, differences, 121000, card.aspectRatio).result?.elapsedSeconds, 120)
    assert.equal(JSON.stringify(session), raw, 'resolution must not mutate progress')
  }
})

test('120 painted pairs match reviewed metadata and immutable asset checksums', () => {
  assert.equal(paintedCollection.length, 365)
  assert.equal(audit.cards.length, 120)
  const paths = new Set<string>()
  for (const card of publishedPaintedCollection.slice(0, 120)) {
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

test('all 1825 painted differences are independently reachable, fit answer crops and finish in five confirmations', () => {
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
  assert.equal(currentDreams.length, 383)
  assert.equal(playableDreams.length, 941)
  assert.equal(LANDSCAPE_SESSION_OPTIONS.namespace, 'dreamerie:v2:daily-collection:v1')
  for (const [index, card] of landscapeCollection.entries()) {
    const expectedId = revisitIds[`painted-${card.id}`] ?? `painted-${card.id}`
    assert.equal(paintedForDay(index + 1).id, expectedId)
    assert.equal(paintedForDay(index + 366).id, expectedId)
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
