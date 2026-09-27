import test from 'node:test'
import assert from 'node:assert/strict'
import { readPlayStats, streakShareLine, summarizePlayDays } from '../src/game/playStats.ts'
import { LANDSCAPE_SESSION_OPTIONS, landscapeDay } from '../src/v2/landscapeCollection.ts'

const namespace = LANDSCAPE_SESSION_OPTIONS.namespace
const known = new Set(['dream-001', 'holiday-halloween'])
const now = Date.UTC(2026, 8, 27, 18)
function saved(count = 5, startedAt = now - 60_000, cardId = 'dream-001') {
  return JSON.stringify({ version: 1, cardId, startedAt, guesses: Array.from({ length: count }, (_, i) => ({ point: { x: 0, y: 0 }, elapsedSeconds: i + 1 })), pending: null })
}
function storage(entries: [string, string][]) {
  const data = new Map(entries)
  return { get length() { return data.size }, key: (i: number) => [...data.keys()][i] ?? null, getItem: (key: string) => data.get(key) ?? null }
}
const key = (day: number) => `${namespace}:${day}`

test('new players have zero stats; completed days are sorted and deduplicated', () => {
  assert.deepEqual(summarizePlayDays([], 4), { current: 0, best: 0, played: 0, completedToday: false })
  assert.deepEqual(summarizePlayDays([4, 2, 3, 4, NaN, 0, 1.5, 5], 4), { current: 3, best: 3, played: 3, completedToday: true })
})

test('yesterday keeps a streak alive; a missed calendar day resets only current', () => {
  assert.deepEqual(summarizePlayDays([1, 2, 3], 4), { current: 3, best: 3, played: 3, completedToday: false })
  assert.deepEqual(summarizePlayDays([1, 2, 3], 5), { current: 0, best: 3, played: 3, completedToday: false })
  assert.deepEqual(summarizePlayDays([1, 2, 3, 5], 5), { current: 1, best: 3, played: 4, completedToday: true })
})

test('five confirmed guesses count even when all are misses, and rereading never increments', () => {
  const store = storage([[key(4), saved()]])
  const expected = { current: 1, best: 1, played: 1, completedToday: true }
  assert.deepEqual(readPlayStats(store, namespace, known, 4, now), expected)
  assert.deepEqual(readPlayStats(store, namespace, known, 4, now), expected)
})

test('an unfinished attempt counts only at its original timeout, even after closing the tab', () => {
  const store = storage([[key(4), saved(0, now)]])
  assert.equal(readPlayStats(store, namespace, known, 4, now + 119_999).played, 0)
  assert.equal(readPlayStats(store, namespace, known, 4, now + 120_000).played, 1)
  assert.equal(readPlayStats(store, namespace, known, 5, now + 86_400_000).current, 1)
})

test('existing V2 records and holiday rounds count without any storage writes', () => {
  const store = storage([[key(2), saved()], [key(3), saved()], [key(4), saved(5, now - 60_000, 'holiday-halloween')]])
  assert.equal(readPlayStats(store, namespace, known, 4, now).current, 3)
  assert.equal(store.length, 3)
})

test('previews, legacy namespaces, unknown cards, malformed keys and future days cannot add stats', () => {
  const store = storage([
    ['dreamerie:daily:v1:4', saved()], [`${namespace}:preview`, saved()],
    [`${namespace}:04`, saved()], [`${namespace}:4:extra`, saved()],
    [key(5), saved()], [key(4), saved(5, now - 60_000, 'unknown')],
  ])
  assert.equal(readPlayStats(store, namespace, known, 4, now).played, 0)
})

test('future start times or confirmations do not count after a clock rollback', () => {
  assert.equal(readPlayStats(storage([[key(4), saved(5, now + 1000)]]), namespace, known, 4, now).played, 0)
  assert.equal(readPlayStats(storage([[key(4), saved(5, now - 1000)]]), namespace, known, 4, now).played, 0)
})

test('damaged or unavailable history is reported without rewriting or pretending it is empty', () => {
  for (const raw of ['{bad', 'null', saved(6), saved().replace('"version":1', '"version":2')]) {
    assert.throws(() => readPlayStats(storage([[key(4), raw]]), namespace, known, 4, now))
  }
  const blocked = { length: 1, key: () => key(4), getItem: () => { throw new Error('Storage blocked') } }
  assert.throws(() => readPlayStats(blocked, namespace, known, 4, now))
})

test('calendar streaks cross month, year, leap-day and daylight-saving boundaries', () => {
  for (const [year, month, day] of [[2026, 8, 30], [2026, 11, 31], [2028, 1, 28], [2027, 2, 13], [2026, 9, 31]]) {
    const days = [0, 1, 2].map(offset => landscapeDay(new Date(year, month, day + offset, 23, 59)))
    assert.deepEqual(days, [days[0], days[0] + 1, days[0] + 2])
    assert.equal(summarizePlayDays(days, days[2]).current, 3)
  }
})

test('history reflects other-tab updates and cleared site data without a stale counter', () => {
  assert.equal(readPlayStats(storage([[key(3), saved()]]), namespace, known, 4, now).current, 1)
  assert.equal(readPlayStats(storage([[key(3), saved()], [key(4), saved()]]), namespace, known, 4, now).current, 2)
  assert.equal(readPlayStats(storage([]), namespace, known, 4, now).current, 0)
})

test('only a completed-today streak of at least two days adds a short share line', () => {
  assert.equal(streakShareLine(null), '')
  assert.equal(streakShareLine(summarizePlayDays([4], 4)), '')
  assert.equal(streakShareLine(summarizePlayDays([2, 3], 4)), '')
  assert.equal(streakShareLine(summarizePlayDays([2, 3, 4], 4)), '✦ 3-day streak')
})
