import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cards } from '../src/data/cards.ts'
import { concepts } from '../src/data/concepts.ts'
import { CURRENT_PLAYER_ID, players } from '../src/data/players.ts'
import { createFirstGuessingBoard, getGuessingBoardView } from '../src/game/board.ts'
import { localGameReducer, prepareGuessingAction } from '../src/game/localGame.ts'
import type { LocalGame } from '../src/game/localGame.ts'
import { chooseDream } from '../src/game/selection.ts'
import { prepareSimulatedDreams } from '../src/game/simulation.ts'
import { getPreparedFirstRound } from '../src/game/preparation.ts'
import { createDreamWeek } from '../src/game/week.ts'
import type { DreamWeek } from '../src/game/types.ts'

function preparedWeek(): DreamWeek {
  let week = prepareSimulatedDreams(
    createDreamWeek('week-fixture', concepts, cards, players, () => 0.25), CURRENT_PLAYER_ID, () => 0.5,
  )
  for (const concept of concepts) {
    week = chooseDream(week, CURRENT_PLAYER_ID, concept.id, week.allocation.hands.get(CURRENT_PLAYER_ID)![0]!)
  }
  return week
}

function preparation(week = preparedWeek()): LocalGame {
  return { phase: 'preparation', week, humanPlayerId: CURRENT_PLAYER_ID, error: null, remembered: null, results: [],
    firstRound: getPreparedFirstRound(week, CURRENT_PLAYER_ID) }
}

test('first board contains own Dream first, two friend Dreams and three fresh decoys, with only Charlie exposed', () => {
  const input = preparedWeek()
  const before = structuredClone(input)
  const { week, round } = createFirstGuessingBoard(input, CURRENT_PLAYER_ID, () => 0)
  assert.equal(round.conceptId, input.roundOrder[0])
  assert.equal(new Set(round.cardIds).size, 6)
  assert.deepEqual(round.targetPlayerIds, ['player-nancy', 'player-song'])
  const actual = round.targetPlayerIds.map((id) => input.dreams.get(id)!.get(round.conceptId)!)
  for (const id of actual) assert.ok(round.cardIds.includes(id))
  const decoys = round.cardIds.filter((id) => id !== round.ownDreamId && !actual.includes(id))
  assert.equal(decoys.length, 3)
  assert.equal(round.cardIds[0], input.dreams.get(CURRENT_PLAYER_ID)!.get(round.conceptId))
  for (const id of decoys) {
    assert.ok(input.allocation.available.includes(id))
    assert.ok(!input.allocation.reserved.has(id))
    assert.ok(!input.allocation.seen.get(CURRENT_PLAYER_ID)!.has(id))
  }
  assert.ok(round.cardIds.slice(1).every((id) => ![...input.dreams.get(CURRENT_PLAYER_ID)!.values()].includes(id)))
  assert.deepEqual(week.allocation.seen.get(CURRENT_PLAYER_ID), new Set([...input.allocation.seen.get(CURRENT_PLAYER_ID)!, ...round.cardIds]))
  for (const id of round.targetPlayerIds) assert.equal(week.allocation.seen.get(id), input.allocation.seen.get(id))
  assert.equal(week.allocation.hands, input.allocation.hands)
  assert.equal(week.allocation.reserved, input.allocation.reserved)
  assert.equal(week.allocation.available, input.allocation.available)
  assert.equal(week.dreams, input.dreams)
  assert.deepEqual(input, before)
})

test('decoy eligibility filters seen, reserved, unknown and duplicate candidates without weakening rules', () => {
  const week = preparedWeek()
  const fresh = week.allocation.available.slice(0, 3)
  const seenCard = week.allocation.available[3]!
  const reservedCard = week.allocation.hands.get('player-nancy')![0]!
  const seen = new Map(week.allocation.seen)
  seen.set(CURRENT_PLAYER_ID, new Set([...seen.get(CURRENT_PLAYER_ID)!, seenCard]))
  const filtered = { ...week, allocation: { ...week.allocation, seen,
    available: [seenCard, reservedCard, 'card-unknown' as const, ...fresh, ...fresh] } }
  const { round } = createFirstGuessingBoard(filtered, CURRENT_PLAYER_ID, () => 0.5)
  assert.ok(fresh.every((id) => round.cardIds.includes(id)))
  assert.ok(!round.cardIds.includes(seenCard))
  assert.ok(!round.cardIds.includes(reservedCard))
  assert.ok(!round.cardIds.includes('card-unknown'))
  assert.equal(new Set(round.cardIds).size, 6)
})

test('insufficient distinct unseen decoys fail before randomness without changing input or exposure', () => {
  const week = preparedWeek()
  const first = week.allocation.available.slice(0, 2)
  const short = { ...week, allocation: { ...week.allocation, available: [...first, ...first] } }
  const before = structuredClone(short)
  let calls = 0
  assert.throws(() => createFirstGuessingBoard(short, CURRENT_PLAYER_ID, () => { calls++; return 0 }), /Not enough unseen/)
  assert.equal(calls, 0)
  assert.deepEqual(short, before)
  const seen = new Map(week.allocation.seen)
  seen.set(CURRENT_PLAYER_ID, new Set([...seen.get(CURRENT_PLAYER_ID)!, ...week.allocation.available]))
  assert.throws(() => createFirstGuessingBoard({ ...week, allocation: { ...week.allocation, seen } }, CURRENT_PLAYER_ID), /Not enough unseen/)
})

test('incomplete preparation, duplicate target Dreams and unknown players are rejected atomically', () => {
  const incomplete = createDreamWeek('week-fixture', concepts, cards, players, () => 0)
  assert.throws(() => createFirstGuessingBoard(incomplete, CURRENT_PLAYER_ID), /Everyone must remember/)
  const week = preparedWeek()
  const dreams = new Map(week.dreams)
  dreams.set('player-song', new Map(week.dreams.get('player-nancy')))
  const duplicate = { ...week, dreams }
  const before = structuredClone(duplicate)
  assert.throws(() => createFirstGuessingBoard(duplicate, CURRENT_PLAYER_ID), /distinct Dreams/)
  assert.deepEqual(duplicate, before)
  assert.throws(() => createFirstGuessingBoard(week, 'player-missing'), /Unknown guessing player/)
})

test('shuffle is reproducible and failures in the final shuffle do not expose a partial board', () => {
  const week = preparedWeek()
  const before = structuredClone(week)
  assert.deepEqual(createFirstGuessingBoard(week, CURRENT_PLAYER_ID, () => 0.25), createFirstGuessingBoard(week, CURRENT_PLAYER_ID, () => 0.25))
  assert.notDeepEqual(createFirstGuessingBoard(week, CURRENT_PLAYER_ID, () => 0).round.cardIds, createFirstGuessingBoard(week, CURRENT_PLAYER_ID, () => 0.99).round.cardIds)
  let calls = 0
  assert.throws(() => createFirstGuessingBoard(week, CURRENT_PLAYER_ID, () => ++calls < week.allocation.available.length ? 0 : NaN), /Randomness/)
  assert.deepEqual(week, before)
})

test('entering stores one stable board and ignores repeated entry and stale selections', () => {
  const state = preparation()
  const action = prepareGuessingAction(state, () => 0)
  const entered = localGameReducer(state, action)
  assert.equal(entered.phase, 'guessing')
  assert.equal(localGameReducer(entered, action), entered)
  assert.equal(localGameReducer(entered, prepareGuessingAction(state, () => 0.99)), entered)
  assert.equal(localGameReducer(entered, { type: 'choose', conceptId: concepts[0]!.id, cardId: state.week.allocation.hands.get(CURRENT_PLAYER_ID)![0]! }), entered)
  assert.throws(() => prepareGuessingAction(entered), /Remember all six/)
  const otherWeek = preparation()
  assert.equal(localGameReducer(otherWeek, action), otherWeek)
})

test('public board data includes only current concept, uniform image metadata and friend identities', () => {
  const { week, round } = createFirstGuessingBoard(preparedWeek(), CURRENT_PLAYER_ID, () => 0)
  const view = getGuessingBoardView(week, round, cards, players)
  assert.deepEqual(Object.keys(view).sort(), ['cards', 'concept', 'currentFriend', 'friends', 'locks', 'ownDream'])
  assert.equal(view.ownDream.id, week.dreams.get(CURRENT_PLAYER_ID)!.get(round.conceptId))
  assert.equal(view.cards[0]?.id, view.ownDream.id)
  assert.equal(view.currentFriend?.id, 'player-nancy')
  assert.equal(view.locks.size, 0)
  assert.deepEqual(view.cards.map((card) => card.id), round.cardIds)
  for (const card of view.cards) assert.deepEqual(Object.keys(card).sort(), ['artwork', 'description', 'id'])
  assert.deepEqual(view.friends.map((friend) => friend.id), ['player-nancy', 'player-song'])
  assert.equal(view.concept.id, week.roundOrder[0])
})

test('six local choices enable deliberate entry, and board failure preserves the completed preparation', () => {
  const week = prepareSimulatedDreams(createDreamWeek('week-fixture', concepts, cards, players, () => 0), CURRENT_PLAYER_ID, () => 0)
  let state = preparation(week)
  assert.throws(() => prepareGuessingAction(state), /Remember all six/)
  for (const concept of concepts) {
    state = localGameReducer(state, { type: 'choose', conceptId: concept.id, cardId: state.week.allocation.hands.get(CURRENT_PLAYER_ID)![0]! })
    assert.equal(state.phase, 'preparation')
  }
  assert.ok(state.phase === 'preparation' && state.firstRound)
  const exhausted = { ...state, week: { ...state.week, allocation: { ...state.week.allocation, available: [] } } }
  const before = structuredClone(exhausted)
  assert.throws(() => prepareGuessingAction(exhausted), /Not enough unseen/)
  assert.deepEqual(exhausted, before)
  assert.equal(localGameReducer(exhausted, { type: 'error', message: 'Not enough unseen images.' }).week, exhausted.week)
})
