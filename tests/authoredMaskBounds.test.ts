import assert from 'node:assert/strict'
import test from 'node:test'
import { authoredMaskBounds, authoredMaskProblem } from '../src/v4/authoredMaskBounds.ts'
import { currentDreams, playableDreams, dreamForDate } from '../src/v3/dailyDream.ts'
import { v4PreviewDreams } from '../src/v4/previewDreams.ts'
import { fairnessCorrections } from '../src/v4/fairnessCorrections.ts'
import { differencesFor } from '../src/v2/landscapeCollection.ts'
import { createRecallState, confirmGuess } from '../src/game/dailyRecall.ts'
import { changeSession, sessionSnapshot } from '../src/game/dailySession.ts'

test('authored polygon bounds support absolute, relative and implicit line commands', () => {
  assert.deepEqual(authoredMaskBounds('M10,20 30,20 H40 V60 L10 60 Z'), { left: 10, top: 20, right: 40, bottom: 60 })
  assert.deepEqual(authoredMaskBounds('m10 20 20 0 h10 v40 l-30 0 z'), { left: 10, top: 20, right: 40, bottom: 60 })
  assert.deepEqual(authoredMaskBounds('M1e1 2e1 h+3e1 v4e1 z M100 100 h5 v5 z'), { left: 10, top: 20, right: 105, bottom: 105 })
  assert.throws(() => authoredMaskBounds('M0 0 C1 2 3 4 5 6'), /Unsupported.*C/)
  assert.throws(() => authoredMaskBounds('M0 0 A10 10 0 0 0 5 5'), /Unsupported.*A/)
  assert.throws(() => authoredMaskBounds('M0 0 L10'), /Missing finite/)
  assert.throws(() => authoredMaskBounds('H10'), /begin with M/)
  assert.throws(() => authoredMaskBounds('M0! 0'), /syntax/)
})

test('published yarn-to-case out-of-hitbox mask is detected, preserved and excluded from current cards', () => {
  const old = v4PreviewDreams.find(card => card.id === 'v4-dream-155')!
  const edit = old.edits.find(clue => clue.id === 'yarn-to-case')!
  assert.ok(edit)
  assert.match(authoredMaskProblem(edit)!, /extend outside accepted hit rectangle/)
  assert.equal(playableDreams.find(card => card.id === old.id)?.edits.find(clue => clue.id === edit.id)?.maskPath, edit.maskPath)
  for (const card of currentDreams) for (const clue of card.edits) assert.equal(authoredMaskProblem(clue), null, `${card.id}/${clue.id}`)
})

test('cloth-river curl is one answer and repeats spend one of five locks', () => {
  const card = currentDreams.find(card => card.id === 'v4-fairness-dream-012-v1')!
  const clues = differencesFor(card)
  const curl = { x: 908 / 1672, y: 570 / 941 }
  const hit = confirmGuess(createRecallState(), curl, 1, clues, card.aspectRatio)
  assert.equal(hit.state.foundDifferenceIds.length, 1)
  assert.equal(hit.state.foundDifferenceIds[0], 'river-edge-curl')
  let state = confirmGuess(hit.state, curl, 2, clues, card.aspectRatio).state
  assert.equal(state.confirmed.length, 2)
  assert.equal(state.confirmed[1].correct, false)
  assert.equal(state.foundDifferenceIds.length, 1)
  for (const clue of clues.filter(clue => clue.id !== 'river-edge-curl').slice(0, 3)) state = confirmGuess(state, clue, 3, clues, card.aspectRatio).state
  assert.equal(state.confirmed.length, 5)
  assert.equal(state.foundDifferenceIds.length, 4)
  assert.deepEqual(confirmGuess(state, clues[4], 6, clues, card.aspectRatio).state, state)
})

test('every corrected version restores pending and completed attempts without changing the round', () => {
  for (const card of fairnessCorrections) {
    const clues = differencesFor(card)
    let saved = changeSession(null, { type: 'start' }, card.id, clues, 1000, card.aspectRatio)!
    saved = changeSession(saved, { type: 'mark', point: clues[0], side: 'changed' }, card.id, clues, 2000, card.aspectRatio)!
    const pending = JSON.stringify(saved)
    const restored = dreamForDate(new Date(2026, 9, 5, 12), pending)
    assert.equal(restored.id, card.id)
    assert.deepEqual(restored.edits, card.edits)
    assert.deepEqual(sessionSnapshot(JSON.parse(pending), differencesFor(restored), 3000, restored.aspectRatio), sessionSnapshot(saved, clues, 3000, card.aspectRatio))
    for (let i = 0; i < 5; i++) {
      saved = changeSession(saved, { type: 'mark', point: clues[i], side: 'changed' }, card.id, clues, 4000 + i * 1000, card.aspectRatio)!
      saved = changeSession(saved, { type: 'confirm', point: clues[i], side: 'changed', expectedCount: i }, card.id, clues, 4000 + i * 1000, card.aspectRatio)!
    }
    const completed = JSON.stringify(saved)
    assert.equal(dreamForDate(new Date(2026, 9, 5, 12), completed).id, card.id)
    assert.deepEqual(sessionSnapshot(JSON.parse(completed), clues, 999999, card.aspectRatio).result, sessionSnapshot(saved, clues, 9000, card.aspectRatio).result)
    assert.equal(saved.startedAt, 1000)
  }
})
