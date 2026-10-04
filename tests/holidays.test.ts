import assert from 'node:assert/strict'
import test from 'node:test'
import { easterSunday, holidayForDate, type HolidayId } from '../src/v3/holidayCalendar.ts'
import { readFileSync } from 'node:fs'
import { currentDreams, dreamForDate, playableDreams } from '../src/v3/dailyDream.ts'
import { legacyHolidayDreams } from '../src/v3/legacyHolidayDreams.ts'
import { holidayDreams } from '../src/v3/holidayDreams.ts'
import { v4OrdinaryDreams, v4HolidayDreams, v4ForDay } from '../src/v4/releasedCollection.ts'
import { differencesFor, landscapeDay, landscapeForDay, LANDSCAPE_SESSION_OPTIONS } from '../src/v2/landscapeCollection.ts'
import { changeSession, parseSession, sessionSnapshot } from '../src/game/dailySession.ts'
import { compareResults, findDifference } from '../src/game/dailyRecall.ts'
import { answerCrop } from '../src/v3/dreamRitual.ts'

test('Halloween and Christmas replace only their local calendar day, every year', () => {
  for (const year of [2026, 2027, 2028, 2029, 2030, 2100]) {
    for (const hour of [0, 12, 23]) {
      assert.equal(holidayForDate(new Date(year, 9, 31, hour, 59)), 'halloween')
      assert.equal(holidayForDate(new Date(year, 11, 25, hour, 59)), 'christmas')
    }
    for (const [month, day] of [[9, 30], [10, 1], [11, 24], [11, 26], [0, 2]]) {
      assert.equal(holidayForDate(new Date(year, month, day)), null)
    }
  }
  assert.throws(() => holidayForDate(new Date(NaN)), /Invalid dream date/)
})

test('U.S. Thanksgiving is the fourth Thursday, not a fixed November date', () => {
  for (const [year, day] of [[2026, 26], [2027, 25], [2028, 23], [2029, 22], [2030, 28]]) {
    assert.equal(holidayForDate(new Date(year, 10, day)), 'thanksgiving')
    assert.equal(holidayForDate(new Date(year, 10, day - 1, 23, 59)), null)
    assert.equal(holidayForDate(new Date(year, 10, day + 1)), null)
    assert.equal(holidayForDate(new Date(year, 10, day - 7)), null)
  }
  // A complete Gregorian leap-year cycle, including years with a fifth Thursday.
  for (let year = 2000; year < 2400; year++) {
    const thursdays = Array.from({ length: 30 }, (_, i) => new Date(year, 10, i + 1)).filter(d => d.getDay() === 4)
    assert.deepEqual(thursdays.filter(d => holidayForDate(d) === 'thanksgiving').map(d => d.getDate()), [thursdays[3].getDate()])
  }
})

test('holiday overrides never reorder or shift the ordinary daily rotation', () => {
  assert.equal(currentDreams.length, 383)
  assert.equal(playableDreams.length, 941)
  assert.equal(new Set(playableDreams.map(d => d.id)).size, 941)
  assert.deepEqual(playableDreams.slice(0, 365), v4OrdinaryDreams)
  for (let day = 0; day < 366; day++) {
    const date = new Date(2028, 0, 1 + day, 12)
    const holiday = holidayForDate(date)
    assert.equal(dreamForDate(date).id, holiday ? v4HolidayDreams.find(card => card.holiday === holiday)!.id : v4ForDay(landscapeDay(date)).id)
  }
  assert.equal(dreamForDate(new Date(2026, 9, 31)).id, 'v4-dream-halloween')
  assert.equal(dreamForDate(new Date(2026, 10, 26)).id, 'v4-dream-thanksgiving')
  assert.equal(dreamForDate(new Date(2026, 11, 25)).id, 'v4-dream-christmas')
  assert.equal(dreamForDate(new Date(2026, 9, 31)).id, dreamForDate(new Date(2027, 9, 31)).id)
  const key = (date: Date) => `${LANDSCAPE_SESSION_OPTIONS.namespace}:${landscapeDay(date)}`
  assert.notEqual(key(new Date(2026, 9, 31)), key(new Date(2027, 9, 31)), 'annual artwork repeats, attempts do not')
})

test('an existing ordinary or holiday attempt wins over a newly published schedule', () => {
  const date = new Date(2026, 9, 31), regular = landscapeForDay(landscapeDay(date))
  const edits = differencesFor(regular)
  let saved = changeSession(null, { type: 'start' }, regular.id, edits, 1000)
  saved = changeSession(saved, { type: 'mark', point: edits[0], side: 'changed' }, regular.id, edits, 2000)
  saved = changeSession(saved, { type: 'confirm', point: edits[0], side: 'changed', expectedCount: 0 }, regular.id, edits, 2000)
  const raw = JSON.stringify(saved)
  const restored = dreamForDate(date, raw)
  assert.equal(restored.id, regular.id)
  assert.deepEqual(parseSession(raw, restored.id), saved)
  assert.equal(sessionSnapshot(saved, edits, 122000).result?.reason, 'time', 'no new deadline')
  for (const holiday of [...holidayDreams, ...legacyHolidayDreams]) {
    const session = changeSession(null, { type: 'start' }, holiday.id, differencesFor(holiday), 1000)
    assert.equal(dreamForDate(date, JSON.stringify(session)).id, holiday.id)
  }
  for (const broken of ['', '{}', 'null', '{"cardId":"unknown"}', JSON.stringify({ ...saved, startedAt: -1 })]) {
    assert.throws(() => dreamForDate(date, broken), 'damaged progress must never silently reset')
  }
})

test('legacy holiday progress keeps its original geometry, score and deadline', () => {
  const date = new Date(2026, 9, 31)
  for (const card of legacyHolidayDreams) {
    assert.ok(!currentDreams.some(current => current.id === card.id))
    const differences = differencesFor(card)
    let saved = changeSession(null, { type: 'start' }, card.id, differences, 1000, card.aspectRatio)
    saved = changeSession(saved, { type: 'mark', point: differences[0], side: 'original' }, card.id, differences, 2000, card.aspectRatio)
    saved = changeSession(saved, { type: 'confirm', point: differences[0], side: 'original', expectedCount: 0 }, card.id, differences, 3000, card.aspectRatio)
    const restored = dreamForDate(date, JSON.stringify(saved))
    assert.equal(restored, card)
    assert.deepEqual(differencesFor(restored), differences)
    assert.deepEqual(sessionSnapshot(saved, differencesFor(restored), 121000, restored.aspectRatio).result,
      { accuracy: 1, elapsedSeconds: 120, reason: 'time' })
  }
})

test('all eighteen holiday pairs have five independent, in-bounds changes and aligned full-resolution assets', () => {
  assert.equal(holidayDreams.length, 18)
  for (const card of holidayDreams) {
    const dimensions = [...new Set([card.original, card.altered, ...card.edits.flatMap(e => e.source ? [e.source] : [])])].map(path => {
      const png = readFileSync(new URL(`../public${path}`, import.meta.url))
      assert.equal(png.subarray(1, 4).toString(), 'PNG')
      const width = png.readUInt32BE(16), height = png.readUInt32BE(20)
      // The generator may round one source width by a single pixel. The existing
      // compositor explicitly maps every source to the same 1672 × 941 artboard.
      assert.ok(width >= 1671 && height >= 941, path)
      return [width, height]
    })
    assert.deepEqual(dimensions[0], [1672, 941])
    for (const [width, height] of dimensions) {
      assert.ok(Math.abs(width - dimensions[0][0]) <= 1)
      assert.equal(height, dimensions[0][1])
    }
    assert.equal(card.edits.length, 5)
    assert.equal(new Set(card.edits.map(e => e.id)).size, 5)
    assert.equal(card.verse.length, 2)
    assert.ok(card.verse.join(' ').length < 150)
    const differences = differencesFor(card)
    let session = changeSession(null, { type: 'start' }, card.id, differences, 1000, card.aspectRatio)
    for (const [i, d] of differences.entries()) {
      const b = d.box
      assert.ok(b.left >= 0 && b.top >= 0 && b.width > 0 && b.height > 0)
      assert.ok(b.left + b.width <= 1 && b.top + b.height <= 1)
      assert.equal(findDifference(d, [], differences, card.aspectRatio)?.id, d.id)
      const crop = answerCrop(b), epsilon = 1e-7
      assert.ok(crop.x <= b.left * 1672 + epsilon && crop.y <= b.top * 941 + epsilon)
      assert.ok(crop.x + crop.width >= (b.left + b.width) * 1672 - epsilon)
      assert.ok(crop.y + crop.height >= (b.top + b.height) * 941 - epsilon)
      session = changeSession(session, { type: 'mark', point: d, side: i % 2 ? 'original' : 'changed' }, card.id, differences, 2000 + i * 1000, card.aspectRatio)
      assert.equal(session!.guesses.length, i, 'tapping never submits')
      const action = { type: 'confirm', point: d, side: i % 2 ? 'original' : 'changed', expectedCount: i } as const
      session = changeSession(session, action, card.id, differences, 2000 + i * 1000, card.aspectRatio)
      session = changeSession(session, action, card.id, differences, 2500 + i * 1000, card.aspectRatio)
      assert.equal(session!.guesses.length, i + 1, 'double-confirmation cannot spend another guess')
    }
    assert.equal(sessionSnapshot(session, differences, 7000, card.aspectRatio).result?.accuracy, 5)
  }
})

test('the complete 2026 calendar covers federal holidays plus popular celebrations', () => {
  const expected: [number, number, HolidayId][] = [
    [0, 1, 'new-years'], [0, 19, 'mlk'], [1, 14, 'valentines'], [1, 16, 'presidents'],
    [2, 17, 'st-patricks'], [3, 5, 'easter'], [4, 10, 'mothers'], [4, 25, 'memorial'],
    [5, 19, 'juneteenth'], [5, 21, 'fathers'], [6, 4, 'independence'], [8, 7, 'labor'],
    [9, 12, 'october-observance'], [9, 31, 'halloween'], [10, 11, 'veterans'],
    [10, 26, 'thanksgiving'], [11, 25, 'christmas'], [11, 31, 'new-years-eve'],
  ]
  assert.deepEqual(expected.map(e => e[2]).sort(), holidayDreams.map(d => d.holiday).sort())
  for (const [month, day, id] of expected) {
    for (const hour of [0, 12, 23]) assert.equal(holidayForDate(new Date(2026, month, day, hour, 59)), id)
  }
  const actual = []
  for (let i = 0; i < 365; i++) {
    const date = new Date(2026, 0, 1 + i), holiday = holidayForDate(date)
    if (holiday) actual.push([date.getMonth(), date.getDate(), holiday])
  }
  assert.deepEqual(actual, expected)
})

test('Gregorian Easter handles movable dates and the earliest/latest exceptions', () => {
  for (const [year, month, day] of [[1818, 2, 22], [1954, 3, 18], [2026, 3, 5], [2027, 2, 28], [2028, 3, 16], [2029, 3, 1], [2030, 3, 21], [2038, 3, 25]]) {
    assert.deepEqual(easterSunday(year), { month, day })
    assert.equal(holidayForDate(new Date(year, month, day)), 'easter')
    assert.notEqual(holidayForDate(new Date(year, month, day - 1)), 'easter')
    assert.notEqual(holidayForDate(new Date(year, month, day + 1)), 'easter')
  }
  for (let year = 1583; year <= 4099; year++) {
    const { month, day } = easterSunday(year)
    assert.equal(new Date(year, month, day).getDay(), 0)
    assert.ok((month === 2 && day >= 22 && day <= 31) || (month === 3 && day >= 1 && day <= 25))
  }
  for (const year of [NaN, 1582, 10000, 2026.5]) assert.throws(() => easterSunday(year))
})

test('fixed-date holidays use the actual day, never substitute bank-holiday dates', () => {
  assert.equal(holidayForDate(new Date(2026, 6, 3)), null)
  assert.equal(holidayForDate(new Date(2026, 6, 4)), 'independence')
  for (const [month, day] of [[5, 18], [6, 5], [11, 24]]) assert.equal(holidayForDate(new Date(2027, month, day)), null)
  assert.equal(holidayForDate(new Date(2027, 5, 19)), 'juneteenth')
  assert.equal(holidayForDate(new Date(2027, 11, 25)), 'christmas')
  assert.equal(holidayForDate(new Date(2027, 11, 31)), 'new-years-eve')
  assert.equal(holidayForDate(new Date(2028, 0, 1)), 'new-years')
})

test('each annual special gets exactly one date, including the Juneteenth/Father’s Day collision', () => {
  assert.equal(holidayForDate(new Date(2033, 5, 19)), 'juneteenth')
  assert.equal(holidayForDate(new Date(2033, 5, 20)), 'fathers')
  assert.equal(holidayForDate(new Date(2033, 5, 21)), null)
  const ids = holidayDreams.map(d => d.holiday).sort()
  for (let year = 2000; year < 2400; year++) {
    const found: HolidayId[] = []
    for (let offset = 0; ; offset++) {
      const date = new Date(year, 0, 1 + offset)
      if (date.getFullYear() !== year) break
      const holiday = holidayForDate(date)
      if (holiday) found.push(holiday)
    }
    assert.deepEqual(found.sort(), ids, String(year))
  }
})

test('holiday repeats, misses, five-guess ceiling, expiry and accuracy-first ordering stay unchanged', () => {
  for (const card of [...holidayDreams, ...v4HolidayDreams]) {
    const edits = differencesFor(card)
    let session = changeSession(null, { type: 'start' }, card.id, edits, 1000, card.aspectRatio)
    for (let i = 0; i < 7; i++) {
      const point = i === 2 ? { x: 0, y: 0 } : edits[0]
      session = changeSession(session, { type: 'mark', point, side: 'original' }, card.id, edits, 2000 + i * 1000, card.aspectRatio)
      session = changeSession(session, { type: 'confirm', point, side: 'original', expectedCount: i }, card.id, edits, 2000 + i * 1000, card.aspectRatio)
    }
    const result = sessionSnapshot(session, edits, 9000, card.aspectRatio).result!
    assert.equal(session!.guesses.length, 5)
    assert.equal(result.accuracy, 1)
    assert.equal(result.elapsedSeconds, 5)
    assert.deepEqual(sessionSnapshot(JSON.parse(JSON.stringify(session)), edits, 999000, card.aspectRatio).result, result)
    const started = changeSession(null, { type: 'start' }, card.id, edits, 1000, card.aspectRatio)
    assert.deepEqual(sessionSnapshot(started, edits, 121000, card.aspectRatio).result, { accuracy: 0, elapsedSeconds: 120, reason: 'time' })
    assert.ok(compareResults({ ...result, accuracy: 5, elapsedSeconds: 119 }, { ...result, accuracy: 4, elapsedSeconds: 1 }) < 0)
    assert.ok(compareResults({ ...result, elapsedSeconds: 20 }, { ...result, elapsedSeconds: 30 }) < 0)
    assert.equal(compareResults(result, { ...result }), 0)
  }
})
