import assert from 'node:assert/strict'
import test from 'node:test'
import { existsSync } from 'node:fs'
import { authoredDreams } from '../src/data/authoredDreams.ts'
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
      assert.equal(findDifference({ x: left - .001, y: entry.y }, [], [entry]), undefined)
      assert.equal(findDifference({ x: left + width + .001, y: entry.y }, [], [entry]), undefined)
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

test('share text reports the Wordle-style score without revealing locations', () => {
  const result = { accuracy: 2, elapsedSeconds: 67, reason: 'guesses' as const }
  const text = createShareText(42, result, differences, [differences[0].id, differences[3].id], 'https://example.com/dreamerie/?review=card-022#private')
  assert.equal(text, 'Dreamerie #42\n2/5 · 1:07\n🟪⬛⬛🟪⬛\nFind the five differences before the dream fades.\nhttps://example.com/dreamerie/')
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
