import assert from 'node:assert/strict'
import test from 'node:test'
import { existsSync } from 'node:fs'
import { authoredDreams } from '../src/data/authoredDreams.ts'
import { constrainView, imagePoint, RESTING_VIEW, zoomAt } from '../src/game/imageInspection.ts'

import { changeSession, dailyStorageKey, parseSession, sessionSnapshot, updateStoredSession, type DailySession } from '../src/game/dailySession.ts'
import {
  GAME_CONFIG,
  compareResults,
  confirmGuess,
  createDifferences,
  createRecallState,
  createPlayUrl,
  createShareText,
  formatClock,
  findDifference,
  getAnswerReveals,
  getNextAuthoredDream,
  type RecallResult,
} from '../src/game/dailyRecall.ts'

const differences = createDifferences('card-022')

test('full-stage inspection centers letterboxed axes and bounds pan against the larger window', () => {
  const portrait = { x: 1, y: 3.4 }
  assert.deepEqual(constrainView({ scale: 2, x: 10, y: 10 }, portrait), { scale: 2, x: .5, y: 0 })
  const tallZoom = constrainView({ scale: 4, x: -10, y: 10 }, portrait)
  assert.equal(tallZoom.x, -1.5)
  assert.ok(Math.abs(tallZoom.y - .3) < 1e-9)
  assert.deepEqual(constrainView({ scale: 2, x: 1, y: 1 }, { x: 3, y: 1 }), { scale: 2, x: 0, y: .5 })
  assert.deepEqual(constrainView(tallZoom, { x: 4, y: 4 }), { scale: 4, x: 0, y: 0 })
  assert.deepEqual(constrainView({ ...tallZoom, scale: 1 }, portrait), RESTING_VIEW)
  assert.equal(zoomAt(RESTING_VIEW, 2, { x: .25, y: .1 }, portrait).y, 0)
})

test('full-stage taps use the enlarged painting, including areas beyond the original fitted frame', () => {
  const fitted = { left: 10, top: 350, width: 360, height: 200 }
  const zoomed = { left: -170, top: 250, width: 720, height: 400 }
  const point = { x: 190, y: 280 }
  assert.equal(imagePoint(point, fitted), null)
  assert.deepEqual(imagePoint(point, zoomed), { x: .5, y: .075 })
  assert.equal(imagePoint({ x: 190, y: 200 }, zoomed), null)
})

const startTime = 1_800_000_000_000
const newSession = () => changeSession(null, { type: 'start' }, 'card-022', differences, startTime)!
const markedSession = () => changeSession(newSession(), { type: 'mark', point: { x: .5, y: .5 }, side: 'original' }, 'card-022', differences, startTime + 1000)!
const confirmSaved = (session: DailySession, now: number) => changeSession(session, { type: 'confirm', expectedCount: session.guesses.length, point: session.pending!.point, side: session.pending!.side }, 'card-022', differences, now)!

test('daily attempts restore pending markers and the original timer after refresh', () => {
  const restored = parseSession(JSON.stringify(markedSession()), 'card-022')!
  const snapshot = sessionSnapshot(restored, differences, startTime + 31_000)
  assert.equal(snapshot.phase, 'play')
  assert.equal(snapshot.recallLeft, 89)
  assert.deepEqual(snapshot.recall.pending, { x: .5, y: .5 })
  assert.equal(snapshot.pendingSide, 'original')
  assert.equal(snapshot.recall.confirmed.length, 0)
  assert.equal(changeSession(restored, { type: 'start' }, 'card-022', differences, startTime + 31_000), restored)
})

test('closing the browser does not pause the attempt; expired attempts cannot restart', () => {
  const saved = confirmSaved(markedSession(), startTime + 10_000)
  const restored = parseSession(JSON.stringify(saved), 'card-022')!
  const snapshot = sessionSnapshot(restored, differences, startTime + 121_000)
  assert.equal(snapshot.phase, 'result')
  assert.equal(snapshot.result?.elapsedSeconds, 120)
  assert.equal(snapshot.result?.reason, 'time')
  assert.equal(snapshot.recall.confirmed.length, 1)
  assert.equal(changeSession(restored, { type: 'start' }, 'card-022', differences, startTime + 121_000), restored)
  assert.equal(changeSession(restored, { type: 'mark', point: { x: .1, y: .1 }, side: 'original' }, 'card-022', differences, startTime + 121_000), restored)
})

test('five saved guesses freeze the score and measured time across reloads', () => {
  let saved = newSession()
  for (let n = 0; n < 5; n++) {
    saved = changeSession(saved, { type: 'mark', point: { x: .5, y: .5 }, side: 'changed' }, 'card-022', differences, startTime + (n + 1) * 1000)!
    saved = confirmSaved(saved, startTime + (n + 1) * 1000)
  }
  const first = sessionSnapshot(saved, differences, startTime + 5000)
  const later = sessionSnapshot(parseSession(JSON.stringify(saved), 'card-022'), differences, startTime + 900_000)
  assert.deepEqual(later.result, first.result)
  assert.equal(later.result?.elapsedSeconds, 5)
  assert.equal(later.recall.confirmed.length, 5)
  assert.equal(changeSession(saved, { type: 'start' }, 'card-022', differences, startTime + 900_000), saved)
})

test('stale or double confirmations cannot use another guess or another tab’s marker', () => {
  const marked = markedSession()
  const action = { type: 'confirm' as const, expectedCount: 0, point: { x: .5, y: .5 }, side: 'original' as const }
  const first = changeSession(marked, action, 'card-022', differences, startTime + 1000)!
  const secondMark = changeSession(first, { type: 'mark', point: { x: .2, y: .3 }, side: 'original' }, 'card-022', differences, startTime + 2000)!
  assert.equal(changeSession(secondMark, action, 'card-022', differences, startTime + 3000), secondMark)
  assert.equal(changeSession(secondMark, { ...action, expectedCount: 1 }, 'card-022', differences, startTime + 3000), secondMark)
})

test('storage updates read the latest attempt and each new date gets its own key', () => {
  const items = new Map<string, string>()
  const storage = { getItem: (key: string) => items.get(key) ?? null, setItem: (key: string, value: string) => { items.set(key, value) } }
  const key = dailyStorageKey(266)
  updateStoredSession(storage, key, { type: 'start' }, 'card-022', differences, startTime)
  const secondTab = updateStoredSession(storage, key, { type: 'start' }, 'card-022', differences, startTime + 10_000)!
  assert.equal(secondTab.startedAt, startTime)
  assert.notEqual(key, dailyStorageKey(267))
  assert.equal(storage.getItem(dailyStorageKey(267)), null)
  items.delete(key) // User clearing site data intentionally permits a fresh attempt.
  const cleared = updateStoredSession(storage, key, { type: 'start' }, 'card-022', differences, startTime + 20_000)!
  assert.equal(cleared.startedAt, startTime + 20_000)
})

test('malformed or incompatible saved attempts fail closed rather than silently resetting', () => {
  for (const raw of ['broken', '{}', JSON.stringify({ ...newSession(), cardId: 'card-023' }), JSON.stringify({ ...newSession(), guesses: [{ point: { x: 3, y: .5 }, elapsedSeconds: 2 }] }), JSON.stringify({ ...newSession(), guesses: [{ point: { x: .5, y: .5 }, elapsedSeconds: 120 }] })]) {
    assert.throws(() => parseSession(raw, 'card-022'))
  }
  assert.equal(parseSession(null, 'card-022'), null)
})

test('storage failures do not report a successfully started or saved attempt', () => {
  const storage = { getItem: () => null, setItem: () => { throw new Error('Storage unavailable') } }
  assert.throws(() => updateStoredSession(storage, dailyStorageKey(266), { type: 'start' }, 'card-022', differences, startTime))
})

test('viewer pan remains bounded and zooming out restores a fully fitted painting', () => {
  assert.deepEqual(constrainView({ scale: 1, x: .4, y: -.3 }), RESTING_VIEW)
  assert.deepEqual(constrainView({ scale: 2, x: 9, y: -9 }), { scale: 2, x: .5, y: -.5 })
  assert.deepEqual(constrainView({ scale: 8, x: 9, y: -9 }), { scale: 4, x: 1.5, y: -1.5 })
  assert.deepEqual(constrainView({ scale: .5, x: 1, y: 1 }), RESTING_VIEW)
})

test('zoom keeps the detail under the pointer stationary', () => {
  const zoomed = zoomAt(RESTING_VIEW, 2, { x: .75, y: .25 })
  assert.deepEqual(zoomed, { scale: 2, x: -.25, y: .25 })
  assert.deepEqual(zoomAt(zoomed, 1, { x: .75, y: .25 }), RESTING_VIEW)
})

test('viewer taps use transformed artwork bounds at different sizes and reject outside taps', () => {
  for (const width of [280, 390, 620]) for (const zoom of [1, 2, 4]) {
    const bounds = { left: -width / 2, top: 44, width: width * zoom, height: width * zoom * 1.25 }
    const point = imagePoint({ x: bounds.left + bounds.width * .25, y: bounds.top + bounds.height * .75 }, bounds)
    assert.deepEqual(point, { x: .25, y: .75 })
    assert.equal(imagePoint({ x: bounds.left - 1, y: bounds.top }, bounds), null)
    assert.equal(imagePoint({ x: bounds.left, y: bounds.top + bounds.height + 1 }, bounds), null)
  }
  assert.equal(imagePoint({ x: 0, y: 0 }, { left: 0, top: 0, width: 0, height: 0 }), null)
})

test('results split found answers left and missed answers right without renumbering', () => {
  const found = [differences[1].id, differences[4].id]
  const left = getAnswerReveals(differences, found, 'original')
  const right = getAnswerReveals(differences, found, 'changed')
  assert.deepEqual(left.map((answer) => answer.number), [2, 5])
  assert.deepEqual(right.map((answer) => answer.number), [1, 3, 4])
  assert.ok(left.every((answer) => answer.found))
  assert.ok(right.every((answer) => !answer.found))
  assert.equal(new Set([...left, ...right].map((answer) => answer.difference.id)).size, 5)
  assert.equal(getAnswerReveals(differences, [], 'original').length, 0)
  assert.equal(getAnswerReveals(differences, [], 'changed').length, 5)
  assert.equal(getAnswerReveals(differences, differences.map((d) => d.id), 'changed').length, 0)
})

test('new test days visit every authored pair and wrap safely', () => {
  const first = authoredDreams[0]
  let current: (typeof authoredDreams)[number] = first
  const seen = new Set<string>()
  for (let day = 0; day < authoredDreams.length; day += 1) {
    seen.add(current.id)
    const next = getNextAuthoredDream(current.id)
    assert.notEqual(next.id, current.id)
    current = next
  }
  assert.equal(seen.size, 120)
  assert.equal(current.id, first.id)
  assert.throws(() => getNextAuthoredDream('card-999'), /Missing difference profile/)
})

test('placing or repositioning a pending marker does not submit a guess', () => {
  const state = createRecallState()
  const placed = { ...state, pending: { x: 0.1, y: 0.2 } }
  const repositioned = { ...placed, pending: { x: 0.8, y: 0.9 } }
  assert.equal(placed.confirmed.length, 0)
  assert.equal(repositioned.confirmed.length, 0)
})

test('each confirmation consumes exactly one guess, whether correct or false', () => {
  const firstDifference = differences[0]
  const correct = confirmGuess(createRecallState(), firstDifference, 8, differences).state
  assert.equal(correct.confirmed.length, 1)
  assert.equal(correct.foundDifferenceIds.length, 1)

  const falseMemory = confirmGuess(correct, { x: 0.99, y: 0.99 }, 12, differences).state
  assert.equal(falseMemory.confirmed.length, 2)
  assert.equal(falseMemory.foundDifferenceIds.length, 1)
})

test('five confirmed guesses end the game and a sixth can never be recorded', () => {
  let state = createRecallState()
  let finalResult: RecallResult | null = null
  for (let index = 0; index < GAME_CONFIG.maxGuesses; index += 1) {
    const outcome = confirmGuess(state, { x: 0.99, y: 0.99 - index * 0.015 }, 20 + index, differences)
    state = outcome.state
    finalResult = outcome.result
  }
  assert.equal(state.confirmed.length, 5)
  assert.equal(finalResult?.reason, 'guesses')
  const blocked = confirmGuess(state, differences[0], 40, differences)
  assert.strictEqual(blocked.state, state)
  assert.equal(blocked.state.confirmed.length, 5)
})

test('a found difference cannot score twice but the duplicate confirmation is consumed', () => {
  const target = differences[0]
  const first = confirmGuess(createRecallState(), target, 4, differences).state
  const duplicate = confirmGuess(first, target, 6, differences).state
  assert.equal(duplicate.confirmed.length, 2)
  assert.equal(duplicate.confirmed[1]?.correct, false)
  assert.deepEqual(duplicate.foundDifferenceIds, [target.id])
})

test('finding all five differences ends immediately with perfect accuracy', () => {
  let state = createRecallState()
  let result = null
  for (const difference of differences) {
    const outcome = confirmGuess(state, difference, 37, differences)
    state = outcome.state
    result = outcome.result
  }
  assert.equal(state.confirmed.length, 5)
  assert.deepEqual(result, { accuracy: 5, elapsedSeconds: 37, reason: 'complete' })
})

test('accuracy ranks before time and time breaks accuracy ties', () => {
  const fourSlow = { accuracy: 4, elapsedSeconds: 110, reason: 'guesses' as const }
  const threeFast = { accuracy: 3, elapsedSeconds: 8, reason: 'guesses' as const }
  const fourFast = { accuracy: 4, elapsedSeconds: 42, reason: 'guesses' as const }
  assert.ok(compareResults(fourSlow, threeFast) < 0)
  assert.ok(compareResults(fourFast, fourSlow) < 0)
  assert.equal(compareResults(fourFast, { ...fourFast }), 0)
})

test('time display stays simple and human-readable', () => {
  assert.equal(formatClock(67), '1:07')
  assert.equal(formatClock(120), '2:00')
})

test('only reviewed image pairs are playable, with five individually hittable object answers', () => {
  assert.equal(authoredDreams.length, 120)
  assert.deepEqual(authoredDreams.map((dream) => dream.id).sort(),
    Array.from({ length: 120 }, (_, index) => `card-${String(index + 1).padStart(3, '0')}`))
  assert.throws(() => createDifferences('card-999'), /Missing difference profile/)
  assert.equal(new Set(authoredDreams.map((dream) => dream.id)).size, authoredDreams.length)
  for (const dream of authoredDreams) {
    assert.ok(existsSync(new URL('../public' + dream.editedArtwork, import.meta.url)))
    assert.ok(existsSync(new URL(`../public/artwork/dreams/${dream.id}.jpg`, import.meta.url)))
    assert.ok(existsSync(new URL('../public' + dream.editedArtwork.replace(/\.png$/, '.provenance.json'), import.meta.url)))
    const entries = createDifferences(dream.id)
    assert.equal(entries.length, 5)
    assert.equal(new Set(entries.map((entry) => entry.id)).size, 5)
    for (const entry of entries) {
      const { left, top, width, height } = entry.box
      assert.ok(width > 0 && height > 0 && left >= 0 && top >= 0 && left + width <= 1 && top + height <= 1, entry.id)
      assert.ok(entry.label.length > 10)
      // A smaller detail can sit at a larger object's center (e.g. a doorknob).
      // Every answer must still have reachable interior points of its own.
      const candidates = Array.from({ length: 81 }, (_, index) => ({
        x: left + width * ((index % 9 + 1) / 10),
        y: top + height * ((Math.floor(index / 9) + 1) / 10),
      }))
      assert.ok(candidates.some((point) => findDifference(point, [], entries)?.id === entry.id), entry.id)
      assert.equal(findDifference({ x: left - GAME_CONFIG.guessRadius - .001, y: entry.y }, [], [entry]), undefined)
      assert.equal(findDifference({ x: left + width + GAME_CONFIG.guessRadius + .001, y: entry.y }, [], [entry]), undefined)
    }
  }
})

test('small nested details retain their hit area after being found', () => {
  const outer = { ...differences[0], id: 'outer', box: { left: .2, top: .2, width: .4, height: .4 } }
  const inner = { ...differences[1], id: 'inner', box: { left: .3, top: .3, width: .05, height: .05 } }
  const point = { x: .325, y: .325 }
  assert.equal(findDifference(point, [], [outer, inner])?.id, 'inner')
  assert.equal(findDifference(point, ['inner'], [outer, inner]), undefined)
  assert.equal(findDifference({ x: .5, y: .5 }, ['inner'], [outer, inner])?.id, 'outer')
})

test('the visible circle counts side overlaps and exact tangency, not just its center', () => {
  const target = { ...differences[0], id: 'target', box: { left: .4, top: .4, width: .1, height: .1 } }
  const rx = GAME_CONFIG.guessRadius
  const ry = rx * GAME_CONFIG.artworkAspectRatio
  const edges = [
    { x: .4 - rx, y: .45 }, { x: .5 + rx, y: .45 },
    { x: .45, y: .4 - ry }, { x: .45, y: .5 + ry },
  ]
  for (const point of edges) assert.equal(findDifference(point, [], [target])?.id, target.id)
  assert.equal(findDifference({ x: .4 - rx - .0001, y: .45 }, [], [target]), undefined)
  assert.equal(findDifference({ x: .45, y: .4 - ry - .0001 }, [], [target]), undefined)
})

test('corner overlap uses a circle rather than an expanded rectangular hit area', () => {
  const target = { ...differences[0], id: 'target', box: { left: .4, top: .4, width: .1, height: .1 } }
  const r = GAME_CONFIG.guessRadius
  const aspect = GAME_CONFIG.artworkAspectRatio
  assert.equal(findDifference({ x: .4 - r * .6, y: .4 - r * aspect * .6 }, [], [target])?.id, target.id)
  assert.equal(findDifference({ x: .4 - r * .8, y: .4 - r * aspect * .8 }, [], [target]), undefined)
})

test('multiple overlaps score only the nearest region; found targets never fall through', () => {
  const near = { ...differences[0], id: 'near', box: { left: .4, top: .4, width: .05, height: .05 } }
  const far = { ...differences[1], id: 'far', box: { left: .48, top: .4, width: .05, height: .05 } }
  const point = { x: .46, y: .42 }
  assert.equal(findDifference(point, [], [far, near])?.id, 'near')
  const first = confirmGuess(createRecallState(), point, 10, [near, far])
  assert.deepEqual(first.state.foundDifferenceIds, ['near'])
  const repeated = confirmGuess(first.state, point, 12, [near, far])
  assert.deepEqual(repeated.state.foundDifferenceIds, ['near'])
  assert.equal(repeated.state.confirmed.length, 2)
  assert.equal(repeated.state.confirmed[1].correct, false)
})

test('center hits take priority over nearby overlaps and ties are deterministic', () => {
  const outer = { ...differences[0], id: 'outer', box: { left: .2, top: .2, width: .4, height: .4 } }
  const inner = { ...differences[1], id: 'inner', box: { left: .3, top: .3, width: .05, height: .05 } }
  assert.equal(findDifference({ x: .29, y: .32 }, [], [inner, outer])?.id, 'outer')
  assert.equal(findDifference({ x: .32, y: .32 }, [], [outer, inner])?.id, 'inner')
  const same = { ...inner, id: 'another' }
  assert.equal(findDifference({ x: .29, y: .32 }, [], [inner, same])?.id,
    findDifference({ x: .29, y: .32 }, [], [same, inner])?.id)
})

test('overlap allowance scales with the artwork on phone, desktop and zoomed views', () => {
  const target = { ...differences[0], id: 'target', box: { left: .4, top: .4, width: .1, height: .1 } }
  for (const width of [280, 370, 520]) {
    for (const zoom of [1, 2, 4]) {
      const renderedWidth = width * zoom
      const renderedHeight = renderedWidth / GAME_CONFIG.artworkAspectRatio
      const radiusPixels = GAME_CONFIG.guessRadius * renderedWidth
      const inside = { x: (.4 * renderedWidth - radiusPixels * .9) / renderedWidth, y: .45 }
      const outside = { x: .45, y: (.4 * renderedHeight - radiusPixels * 1.1) / renderedHeight }
      assert.equal(findDifference(inside, [], [target])?.id, 'target')
      assert.equal(findDifference(outside, [], [target]), undefined)
    }
  }
})

test('share text reports the Wordle-style score without revealing locations', () => {
  const result = { accuracy: 2, elapsedSeconds: 67, reason: 'guesses' as const }
  const text = createShareText(42, result, differences, [differences[0].id, differences[3].id], 'https://example.com/dreamerie/?review=card-022#private')
  assert.equal(text, 'Dreamerie #42\n2/5 · 1:07\n🟪⬛⬛🟪⬛\nYour turn to dream.\nhttps://example.com/dreamerie/')
  for (const difference of differences) assert.ok(!text.includes(difference.label))
})

test('play links preserve the hosted path without leaking query, fragment or credentials', () => {
  assert.equal(createPlayUrl('https://name:password@example.com/play/?token=secret#private'), 'https://example.com/play/')
  assert.equal(createPlayUrl('http://127.0.0.1:5173/?review=card-001'), 'http://127.0.0.1:5173/')
  assert.throws(() => createPlayUrl('javascript:alert(1)'), /Expected a web address/)
})

test('share grids include all five outcomes for perfect and expired rounds', () => {
  const url = 'https://example.com/'
  const perfect = createShareText(1, { accuracy: 5, elapsedSeconds: 8, reason: 'complete' }, differences, differences.map((d) => d.id), url)
  const expired = createShareText(1, { accuracy: 0, elapsedSeconds: 120, reason: 'time' }, differences, [], url)
  assert.ok(perfect.includes('5/5 · 0:08\n🟪🟪🟪🟪🟪'))
  assert.ok(expired.includes('0/5 · 2:00\n⬛⬛⬛⬛⬛'))
})
