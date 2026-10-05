import { createHash } from 'node:crypto'
import { fairnessCorrections } from '../src/v4/fairnessCorrections.ts'
import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { currentDreams, playableDreams, v3CurrentDreams, v3PlayableDreams, publishedDreams, dreamForDate } from '../src/v3/dailyDream.ts'
import { v4OrdinaryDreams, v4HolidayDreams, v4ForDay, v4ReplacementId, v4VerseId, v4HolidayDetails } from '../src/v4/releasedCollection.ts'
import { holidayForDate } from '../src/v3/holidayCalendar.ts'
import { differencesFor, landscapeDay, LANDSCAPE_SESSION_OPTIONS } from '../src/v2/landscapeCollection.ts'
import { changeSession, sessionSnapshot, parseSession, dailyStorageKey } from '../src/game/dailySession.ts'
import { confirmGuess, createRecallState, createShareText } from '../src/game/dailyRecall.ts'
import { artworkDelivery as historicalDelivery } from '../src/v3/artworkDelivery.generated.ts'
import { originalArtwork, artworkSources } from '../src/v3/artworkDelivery.ts'

test('complete owner-approved V4 selection is versioned and preserves all 558 published IDs', () => {
  assert.equal(currentDreams.length, 383)
  assert.equal(v4OrdinaryDreams.length, 365)
  assert.equal(v4HolidayDreams.length, 18)
  assert.equal(v3CurrentDreams.length, 383)
  assert.equal(v3PlayableDreams.length, 558)
  assert.equal(playableDreams.length, 941 + fairnessCorrections.length)
  assert.equal(new Set(playableDreams.map(d => d.id)).size, 941 + fairnessCorrections.length)
  const ledger = JSON.parse(readFileSync(new URL('../docs/artwork/V4_DECISIONS.json', import.meta.url), 'utf8'))
  assert.equal(ledger.ownerCollectionReleaseApproval.sourceId, 'Sentinel_6eb6db8149ec819186b799bc3b23d779')
  assert.equal(ledger.ownerCollectionReleaseApproval.humanTimedDifficulty, 'not performed')
  assert.equal(ledger.ownerCollectionReleaseApproval.physicalPhone, 'not performed')
  for (const [index, old] of v3CurrentDreams.entries()) {
    const selected = currentDreams[index]
    assert.equal(selected.id, v4ReplacementId(old.id))
    assert.ok(selected.original.startsWith('/artwork/v4/'))
    assert.equal(selected.edits.length, 5)
    assert.equal(playableDreams.find(d => d.id === old.id), old)
    const row = ledger.decisions.find((row: { id: string }) => row.id === old.id)
    assert.equal(row.decision, 'revise')
    assert.equal(row.replacementId, selected.id)
    assert.equal(row.humanDifficultyApproval, 'pending')
    assert.equal(row.physicalPhoneApproval, 'pending')
  }
})

test('new V4 days keep 365-day order and all eighteen holiday overrides for 20 years', () => {
  for (let day = -366; day <= 732; day++) {
    const index = ((day - 1) % 365 + 365) % 365
    assert.equal(v4ForDay(day).id, v4ReplacementId(v3CurrentDreams[index].id))
  }
  const holidays = new Set<string>()
  for (let year = 2026; year < 2046; year++) for (let day = 1; day <= 366; day++) {
    const date = new Date(year, 0, day, 12)
    const holiday = holidayForDate(date)
    const scheduled = dreamForDate(date)
    assert.equal(scheduled.id, holiday ? v4HolidayDreams.find(d => d.holiday === holiday)!.id : v4ForDay(landscapeDay(date)).id)
    if (holiday) holidays.add(holiday)
  }
  assert.equal(holidays.size, 18)
})

test('every old saved pending/completed round stays on its exact art, geometry, score and deadline', () => {
  const date = new Date(2026, 9, 4, 12)
  for (const old of publishedDreams) {
    const edits = differencesFor(old)
    let saved = changeSession(null, { type: 'start' }, old.id, edits, 1000, old.aspectRatio)!
    saved = changeSession(saved, { type: 'mark', point: edits[0], side: 'changed' }, old.id, edits, 2000, old.aspectRatio)!
    saved = changeSession(saved, { type: 'confirm', point: edits[0], side: 'changed', expectedCount: 0 }, old.id, edits, 2000, old.aspectRatio)!
    saved = changeSession(saved, { type: 'mark', point: edits[1], side: 'original' }, old.id, edits, 3000, old.aspectRatio)!
    let raw = JSON.stringify(saved)
    const restored = dreamForDate(date, raw)
    assert.deepEqual(restored, old)
    assert.deepEqual(sessionSnapshot(parseSession(raw, restored.id), differencesFor(restored), 4000, old.aspectRatio), sessionSnapshot(saved, edits, 4000, old.aspectRatio))
    assert.deepEqual(differencesFor(restored), edits)
    assert.equal(restored.original, old.original)
    assert.equal(JSON.stringify(saved), raw)
    for (let i = 1; i < 5; i++) {
      saved = changeSession(saved, { type: 'mark', point: edits[i], side: 'original' }, old.id, edits, 3000 + i * 1000, old.aspectRatio)!
      saved = changeSession(saved, { type: 'confirm', point: edits[i], side: 'original', expectedCount: i }, old.id, edits, 3000 + i * 1000, old.aspectRatio)!
    }
    raw = JSON.stringify(saved)
    assert.deepEqual(dreamForDate(date, raw), old)
    assert.deepEqual(sessionSnapshot(JSON.parse(raw), differencesFor(dreamForDate(date, raw)), 999999, old.aspectRatio).result, sessionSnapshot(saved, edits, 9000, old.aspectRatio).result)
    assert.equal(saved.startedAt, 1000)
  }
  assert.equal(`${LANDSCAPE_SESSION_OPTIONS.namespace}:6`, dailyStorageKey(6))
})

test('all current V4 targets score five distinct locks, repeats spend a guess and old delivery stays selected', () => {
  for (const card of currentDreams) {
    const edits = differencesFor(card)
    let state = createRecallState()
    for (const edit of edits) state = confirmGuess(state, edit, 5, edits, card.aspectRatio).state
    assert.equal(state.foundDifferenceIds.length, 5, card.id)
    assert.equal(state.confirmed.length, 5)
    const first = confirmGuess(createRecallState(), edits[0], 1, edits, card.aspectRatio).state
    const repeated = confirmGuess(first, edits[0], 2, edits, card.aspectRatio).state
    assert.equal(repeated.confirmed.length, 2)
    assert.equal(repeated.confirmed[1].correct, false)
    assert.equal(repeated.foundDifferenceIds.length, 1)
  }
  for (const old of v3CurrentDreams) assert.equal(originalArtwork(old), historicalDelivery[old.id as keyof typeof historicalDelivery].original)
  const share = createShareText(7, { accuracy: 4, elapsedSeconds: 31, reason: 'guesses' }, differencesFor(currentDreams[0]), [], 'https://dreamerie.onrender.com/')
  assert.ok(share.includes('https://dreamerie.onrender.com/'))
  assert.ok(!share.includes('v4-review') && !share.includes('?dream='))
})

test('fairness versions retain original verses, holiday metadata and published V4 pairs', () => {
  assert.equal(publishedDreams.length, 941)
  for (const corrected of fairnessCorrections) {
    const suffix = corrected.id.replace(/^v4-fairness-dream-/, '').replace(/-v1$/, '')
    const original = publishedDreams.find(card => card.id === `v4-dream-${suffix}`)!
    assert.ok(original, corrected.id)
    assert.notEqual(corrected.id, original.id)
    assert.equal(v4VerseId(corrected.id), v4VerseId(original.id))
    assert.equal(currentDreams.filter(card => card.id === corrected.id).length, 1)
    assert.ok(!currentDreams.some(card => card.id === original.id))
    assert.equal(corrected.edits.length, 5)
    const oldHoliday = v4HolidayDetails(original.id)
    if (oldHoliday) {
      const newHoliday = v4HolidayDetails(corrected.id)!
      assert.equal(newHoliday.holiday, oldHoliday.holiday)
      assert.deepEqual(newHoliday.verse, oldHoliday.verse)
    }
  }
})

test('all 941 published metadata objects and delivery selections match immutable release 5920a05', () => {
  const fixture = JSON.parse(readFileSync(new URL('./fixtures/publishedDreams-5920a05.json', import.meta.url), 'utf8'))
  assert.equal(fixture.cards.length, 941)
  for (const row of fixture.cards) {
    const savedCard = playableDreams.find(card => card.id === row.id)!
    assert.ok(savedCard, row.id)
    assert.equal(createHash('sha256').update(JSON.stringify(savedCard)).digest('hex'), row.cardSha256, row.id)
    assert.deepEqual(artworkSources(savedCard), row.deliveries, row.id)
  }
})
