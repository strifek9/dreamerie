import test from 'node:test'
import assert from 'node:assert/strict'
import { answerCrop, guessFeedback, resultVerse } from '../src/v3/dreamRitual.ts'
import { confirmGuess, createRecallState } from '../src/game/dailyRecall.ts'
import { differencesFor, landscapeCollection } from '../src/v2/landscapeCollection.ts'
import { atmosphereFor } from '../src/v3/atmosphereTheme.ts'

test('daily marginalia uses the public scene title, with a stable quiet fallback', () => {
  assert.equal(atmosphereFor('The Seamstress of Rain'), 'water')
  assert.equal(atmosphereFor('The Cloud in the Shoe'), 'clouds')
  assert.equal(atmosphereFor('The Sleeping Garden'), 'leaves')
  assert.equal(atmosphereFor('The Sleeping Constellation'), 'stars')
  assert.equal(atmosphereFor('The Train Beneath the Pillow'), 'stars')
  assert.equal(atmosphereFor('The Hat Full of Rainbows'), 'clouds')
  for (const dream of landscapeCollection) {
    assert.ok(['water', 'clouds', 'leaves', 'stars'].includes(atmosphereFor(dream.title)))
    assert.equal(atmosphereFor(dream.title), atmosphereFor(dream.title))
  }
})

test('all 600 answer crops contain their full detail, stay within native artwork, and are square', () => {
  for (const dream of landscapeCollection) for (const edit of dream.edits) {
    const crop = answerCrop(edit.box)
    const epsilon = 1e-7
    assert.equal(crop.width, crop.height)
    assert.ok(crop.width >= 160)
    assert.ok(crop.x >= 0 && crop.y >= 0)
    assert.ok(crop.x + crop.width <= 1672 + epsilon && crop.y + crop.height <= 941 + epsilon)
    assert.ok(crop.x <= edit.box.left * 1672 + epsilon, `${dream.id}/${edit.id} left`)
    assert.ok(crop.y <= edit.box.top * 941 + epsilon, `${dream.id}/${edit.id} top`)
    assert.ok(crop.x + crop.width >= (edit.box.left + edit.box.width) * 1672 - epsilon, `${dream.id}/${edit.id} right`)
    assert.ok(crop.y + crop.height >= (edit.box.top + edit.box.height) * 941 - epsilon, `${dream.id}/${edit.id} bottom`)
    assert.deepEqual(answerCrop(edit.box), crop)
  }
})

test('guess feedback distinguishes pending, correct, repeat and miss without changing scoring', () => {
  const dream = landscapeCollection[1], differences = differencesFor(dream)
  const initial = createRecallState()
  assert.equal(guessFeedback(initial, differences, dream.aspectRatio), 'Tap a difference in either image.')
  const marked = { ...initial, pending: differences[0] }
  assert.equal(guessFeedback(marked, differences, dream.aspectRatio), 'Circle placed. Remember uses 1 guess.')
  assert.equal(marked.confirmed.length, 0)
  const found = confirmGuess(initial, differences[0], 1, differences, dream.aspectRatio).state
  assert.equal(guessFeedback(found, differences, dream.aspectRatio), 'Found. A fragment remembered.')
  const repeat = confirmGuess(found, differences[0], 2, differences, dream.aspectRatio).state
  assert.equal(guessFeedback(repeat, differences, dream.aspectRatio), 'Already found—guess used.')
  assert.equal(repeat.confirmed.length, 2)
  assert.equal(repeat.foundDifferenceIds.length, 1)
  const miss = confirmGuess(repeat, { x: 0, y: 0 }, 3, differences, dream.aspectRatio).state
  assert.equal(guessFeedback(miss, differences, dream.aspectRatio), 'Not a difference—guess used.')
  assert.equal(miss.confirmed.length, 3)
  assert.equal(miss.foundDifferenceIds.length, 1)
})

test('result language acknowledges zero, partial and perfect accuracy', () => {
  assert.equal(resultVerse(0), 'The dream slipped away.')
  for (const n of [1, 2]) assert.equal(resultVerse(n), 'A few fragments stayed.')
  for (const n of [3, 4]) assert.equal(resultVerse(n), 'Much of the dream stayed.')
  assert.equal(resultVerse(5), 'Nothing escaped you.')
})
