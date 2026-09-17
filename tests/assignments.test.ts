import assert from 'node:assert/strict'
import { test } from 'node:test'
import { assignDream, getNextGuessTarget, unassignDream } from '../src/game/assignments.ts'
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
    targetPlayerIds: ['player-nancy', 'player-song'], ownDreamId: 'card-004',
    cardIds: ['card-004', 'card-001', 'card-002', 'card-003', 'card-005', 'card-006'],
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
  assert.throws(() => assignDream(round, 'player-nancy', round.ownDreamId), /Your Dream is a reference/)
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
  const action = { type: 'assign' as const, roundId: state.round.id, playerId: 'player-nancy' as const, cardId: state.round.cardIds[1]! }
  assert.equal(localGameReducer(state, { ...action, roundId: 'round-stale' }), state)
  const nancy = localGameReducer(state, action)
  assert.ok(nancy.phase === 'guessing')
  assert.equal(nancy.week, state.week)
  const repeated = localGameReducer(nancy, action)
  assert.ok(repeated.phase === 'guessing')
  assert.equal(repeated.round, nancy.round)
  assert.ok(repeated.error)
  const song = localGameReducer(nancy, { ...action, playerId: 'player-song', cardId: state.round.cardIds[2]! })
  assert.equal(song.phase, 'ready-for-reveal')
  assert.equal(localGameReducer(song, action), song)
  assert.equal(song.week, state.week)
})

test('presentation exposes only the next friend and player-chosen locks, never correctness', () => {
  const state = guessing()
  assert.ok(state.phase !== 'preparation')
  const nancy = assignDream(state.round, 'player-nancy', state.round.cardIds[1]!)
  const view = getGuessingBoardView(state.week, nancy, cards, players)
  assert.equal(view.currentFriend?.name, 'Song')
  assert.deepEqual([...view.locks], [[state.round.cardIds[1], 'Nancy']])
  assert.deepEqual(Object.keys(view).sort(), ['cards', 'concept', 'currentFriend', 'friends', 'locks', 'ownDream'])
  const song = assignDream(nancy, 'player-song', state.round.cardIds[2]!)
  const completed = getGuessingBoardView(state.week, song, cards, players)
  assert.equal(completed.currentFriend, null)
  assert.equal(completed.locks.size, 2)
  assert.deepEqual(completed.cards, view.cards)
})

test('unlock releases only the chosen guess, preserves the board, and allows a different replacement', () => {
  const nancy = assignDream(freshRound(), 'player-nancy', 'card-001')
  const both = assignDream(nancy, 'player-song', 'card-002')
  const before = structuredClone(both)
  const unlocked = unassignDream(both, 'card-001')
  assert.equal(getNextGuessTarget(unlocked), 'player-nancy')
  assert.deepEqual([...unlocked.assignments], [['player-song', 'card-002']])
  assert.equal(unlocked.cardIds, both.cardIds)
  assert.deepEqual(both, before)
  assert.equal(unassignDream(unlocked, 'card-001'), unlocked)
  assert.equal(unassignDream(unlocked, 'card-unknown'), unlocked)
  assert.throws(() => assignDream(unlocked, 'player-nancy', 'card-002'), /already assigned/)
  const revised = assignDream(unlocked, 'player-nancy', 'card-003')
  assert.equal(getNextGuessTarget(revised), null)
  assert.equal(revised.assignments.get('player-nancy'), 'card-003')
})

test('unlocking while ready disables reveal; reassigning scores the revised guess only', () => {
  let state = guessing()
  assert.ok(state.phase !== 'preparation')
  const round = state.round
  const actualNancy = state.week.dreams.get('player-nancy')!.get(round.conceptId)!
  const actualSong = state.week.dreams.get('player-song')!.get(round.conceptId)!
  const decoy = round.cardIds.find((id) => id !== round.ownDreamId && id !== actualNancy && id !== actualSong)!
  state = localGameReducer(state, { type: 'assign', roundId: round.id, playerId: 'player-nancy', cardId: decoy })
  state = localGameReducer(state, { type: 'assign', roundId: round.id, playerId: 'player-song', cardId: actualSong })
  const unlock = { type: 'unassign' as const, roundId: round.id, cardId: decoy }
  state = localGameReducer(state, unlock)
  assert.equal(state.phase, 'guessing')
  assert.equal(localGameReducer(state, { type: 'reveal', roundId: round.id }), state)
  assert.equal(localGameReducer(state, unlock), state)
  state = localGameReducer(state, { type: 'assign', roundId: round.id, playerId: 'player-nancy', cardId: actualNancy })
  assert.equal(state.phase, 'ready-for-reveal')
  state = localGameReducer(state, { type: 'reveal', roundId: round.id })
  assert.equal(state.results[0]?.points, 2)
  assert.equal(state.results[0]?.guesses[0]?.chosenCardId, actualNancy)
  assert.equal(localGameReducer(state, { ...unlock, cardId: actualNancy }), state)
})

test('unlocking during guessing preserves exposure and ignores commands from a stale round', () => {
  const state = guessing()
  assert.ok(state.phase !== 'preparation')
  const chosen = state.round.cardIds[1]!
  const locked = localGameReducer(state, { type: 'assign', roundId: state.round.id, playerId: 'player-nancy', cardId: chosen })
  assert.equal(localGameReducer(locked, { type: 'unassign', roundId: 'round-stale', cardId: chosen }), locked)
  const unlocked = localGameReducer(locked, { type: 'unassign', roundId: state.round.id, cardId: chosen })
  assert.equal(unlocked.phase, 'guessing')
  assert.equal(unlocked.week, state.week)
  assert.equal(unlocked.round.cardIds, state.round.cardIds)
  assert.equal(unlocked.round.assignments.size, 0)
})
