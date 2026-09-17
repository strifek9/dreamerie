import assert from 'node:assert/strict'
import { test } from 'node:test'
import { assignDream, getNextGuessTarget } from '../src/game/assignments.ts'
import { localGameReducer } from '../src/game/localGame.ts'
import type { LocalGame } from '../src/game/localGame.ts'
import { createFirstGuessingBoard, getGuessingBoardView } from '../src/game/board.ts'
import { chooseDream } from '../src/game/selection.ts'
import { prepareSimulatedDreams } from '../src/game/simulation.ts'
import { createDreamWeek } from '../src/game/week.ts'
import { cards } from '../src/data/cards.ts'
import { concepts } from '../src/data/concepts.ts'
import { players, CURRENT_PLAYER_ID } from '../src/data/players.ts'
import type { GuessingRound } from '../src/game/types.ts'

function freshRound(): GuessingRound {
  return {
    id: 'round-fixture-1', conceptId: 'concept-freedom', guesserId: CURRENT_PLAYER_ID,
    targetPlayerIds: ['player-nancy', 'player-song'],
    cardIds: ['card-001', 'card-002', 'card-003', 'card-004', 'card-005', 'card-006'],
    assignments: new Map(),
  }
}

function guessing(): LocalGame {
  let week = prepareSimulatedDreams(createDreamWeek('week-fixture', concepts, cards, players, () => 0), CURRENT_PLAYER_ID, () => 0)
  for (const concept of concepts) week = chooseDream(week, CURRENT_PLAYER_ID, concept.id, week.allocation.hands.get(CURRENT_PLAYER_ID)![0]!)
  return { phase: 'guessing', ...createFirstGuessingBoard(week, CURRENT_PLAYER_ID, () => 0), humanPlayerId: CURRENT_PLAYER_ID, error: null, remembered: null, results: [] }
}

test('Nancy then Song commit distinct guesses while preserving the exact board and input', () => {
  const round = freshRound()
  const before = structuredClone(round)
  assert.equal(getNextGuessTarget(round), 'player-nancy')
  const nancy = assignDream(round, 'player-nancy', 'card-003')
  assert.equal(getNextGuessTarget(nancy), 'player-song')
  assert.equal(nancy.cardIds, round.cardIds)
  assert.equal(nancy.assignments.get('player-nancy'), 'card-003')
  const song = assignDream(nancy, 'player-song', 'card-001')
  assert.equal(getNextGuessTarget(song), null)
  assert.equal(song.cardIds, round.cardIds)
  assert.deepEqual([...song.assignments], [['player-nancy', 'card-003'], ['player-song', 'card-001']])
  assert.deepEqual(round, before)
  assert.equal(nancy.assignments.size, 1)
})

test('out-of-order, own, unknown and off-board guesses leave the round intact', () => {
  const round = freshRound()
  const before = structuredClone(round)
  for (const id of ['player-song', 'player-charlie', 'player-missing'] as const) {
    assert.throws(() => assignDream(round, id, 'card-001'), /friend currently shown/)
  }
  assert.throws(() => assignDream(round, 'player-nancy', 'card-missing'), /Choose an image/)
  assert.deepEqual(round, before)
})

test('locked images cannot be reused or revised and completion rejects further guesses', () => {
  const nancy = assignDream(freshRound(), 'player-nancy', 'card-002')
  const before = structuredClone(nancy)
  assert.throws(() => assignDream(nancy, 'player-nancy', 'card-003'), /friend currently shown/)
  assert.throws(() => assignDream(nancy, 'player-song', 'card-002'), /already assigned/)
  assert.deepEqual(nancy, before)
  const complete = assignDream(nancy, 'player-song', 'card-006')
  assert.throws(() => assignDream(complete, 'player-song', 'card-005'), /already been remembered/)
})

test('local state rejects stale rounds and repeated friend actions, then waits for reveal', () => {
  const state = guessing()
  assert.ok(state.phase !== 'preparation')
  const action = { type: 'assign' as const, roundId: state.round.id, playerId: 'player-nancy' as const, cardId: state.round.cardIds[0]! }
  assert.equal(localGameReducer(state, { ...action, roundId: 'round-stale' }), state)
  const nancy = localGameReducer(state, action)
  assert.ok(nancy.phase === 'guessing')
  assert.equal(nancy.week, state.week)
  const repeated = localGameReducer(nancy, action)
  assert.ok(repeated.phase === 'guessing')
  assert.equal(repeated.round, nancy.round)
  assert.ok(repeated.error)
  const song = localGameReducer(nancy, { ...action, playerId: 'player-song', cardId: state.round.cardIds[1]! })
  assert.equal(song.phase, 'ready-for-reveal')
  assert.equal(localGameReducer(song, action), song)
  assert.equal(song.week, state.week)
})

test('presentation exposes only the next friend and player-chosen locks, never correctness', () => {
  const state = guessing()
  assert.ok(state.phase !== 'preparation')
  const nancy = assignDream(state.round, 'player-nancy', state.round.cardIds[0]!)
  const view = getGuessingBoardView(state.week, nancy, cards, players)
  assert.equal(view.currentFriend?.name, 'Song')
  assert.deepEqual([...view.locks], [[state.round.cardIds[0], 'Nancy']])
  assert.deepEqual(Object.keys(view).sort(), ['cards', 'concept', 'currentFriend', 'friends', 'locks'])
  const song = assignDream(nancy, 'player-song', state.round.cardIds[1]!)
  const completed = getGuessingBoardView(state.week, song, cards, players)
  assert.equal(completed.currentFriend, null)
  assert.equal(completed.locks.size, 2)
  assert.deepEqual(completed.cards, view.cards)
})
