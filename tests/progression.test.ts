import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cards } from '../src/data/cards.ts'
import { concepts } from '../src/data/concepts.ts'
import { CURRENT_PLAYER_ID, players } from '../src/data/players.ts'
import { createLocalGame, getLocalDay, localGameReducer, prepareGuessingAction } from '../src/game/localGame.ts'
import type { LocalGame } from '../src/game/localGame.ts'
import { createDreamWeek } from '../src/game/week.ts'
import { prepareSimulatedDreams } from '../src/game/simulation.ts'
import { assignDream } from '../src/game/assignments.ts'
import { createGuessingBoard, getGuessingBoardView } from '../src/game/board.ts'
import { getRoundRevealView, getTotalScore, scoreRound } from '../src/game/scoring.ts'
import type { WeekId } from '../src/game/types.ts'

const newWeek = (id: WeekId = 'week-fixture') => prepareSimulatedDreams(
  createDreamWeek(id, concepts, cards, players, () => 0.5), CURRENT_PLAYER_ID, () => 0.25,
)
function preparation(): LocalGame {
  let state = createLocalGame(newWeek(), CURRENT_PLAYER_ID)
  for (const concept of concepts) state = localGameReducer(state, {
    type: 'choose', conceptId: concept.id, cardId: state.week.allocation.hands.get(CURRENT_PLAYER_ID)![0]!,
  })
  return state
}
function guessBoth(state: LocalGame): LocalGame {
  assert.equal(state.phase, 'guessing')
  const round = state.round
  let next: LocalGame = state
  for (const playerId of round.targetPlayerIds) next = localGameReducer(next, {
    type: 'assign', roundId: round.id, playerId, cardId: state.week.dreams.get(playerId)!.get(round.conceptId)!,
  })
  return next
}

test('zero, one and two correct guesses score exactly 0, 1 and 2 without mutation', () => {
  const { week, round } = createGuessingBoard(preparation().week, CURRENT_PLAYER_ID, 0, () => 0)
  const actual = round.targetPlayerIds.map((id) => week.dreams.get(id)!.get(round.conceptId)!)
  const decoys = round.cardIds.filter((id) => !actual.includes(id))
  for (const count of [0, 1, 2]) {
    let chosen = round
    round.targetPlayerIds.forEach((id, index) => { chosen = assignDream(chosen, id, index < count ? actual[index]! : decoys[index]!) })
    const before = structuredClone(chosen)
    const result = scoreRound(week, chosen)
    assert.equal(result.points, count)
    assert.equal(result.guesses.filter((guess) => guess.correct).length, count)
    assert.deepEqual(chosen, before)
    const view = getRoundRevealView(result, cards, players)
    assert.deepEqual(view.guesses.map((guess) => guess.actual.id), actual)
    assert.equal(view.points, count)
  }
})

test('scoring rejects incomplete, duplicate, foreign-player and off-board assignments', () => {
  const { week, round } = createGuessingBoard(preparation().week, CURRENT_PLAYER_ID, 0, () => 0)
  assert.throws(() => scoreRound(week, round), /different image for each friend/)
  const first = assignDream(round, 'player-nancy', round.cardIds[0]!)
  assert.throws(() => scoreRound(week, first), /different image for each friend/)
  const duplicate = { ...round, assignments: new Map([['player-nancy' as const, round.cardIds[0]!], ['player-song' as const, round.cardIds[0]!]]) }
  assert.throws(() => scoreRound(week, duplicate), /different image for each friend/)
  const wrong = { ...round, assignments: new Map([['player-nancy' as const, round.cardIds[0]!], ['player-charlie' as const, round.cardIds[1]!]]) }
  assert.throws(() => scoreRound(week, wrong), /incomplete or invalid/)
  const outside = { ...round, assignments: new Map([['player-nancy' as const, round.cardIds[0]!], ['player-song' as const, 'card-missing' as const]]) }
  assert.throws(() => scoreRound(week, outside), /incomplete or invalid/)
})

test('reveal waits for both guesses, scores once, and stale reveal or early finish cannot advance', () => {
  const state = localGameReducer(preparation(), prepareGuessingAction(preparation(), () => 0))
  // An action prepared from a different state is deliberately rejected.
  assert.equal(state.phase, 'preparation')
  const prepared = preparation()
  let entered = localGameReducer(prepared, prepareGuessingAction(prepared, () => 0))
  assert.ok(entered.phase !== 'preparation')
  const action = { type: 'reveal' as const, roundId: entered.round.id }
  assert.equal(localGameReducer(entered, action), entered)
  assert.throws(() => prepareGuessingAction(entered), /before advancing/)
  entered = guessBoth(entered)
  assert.equal(entered.results.length, 0)
  assert.equal(localGameReducer(entered, { ...action, roundId: 'round-stale' }), entered)
  const revealed = localGameReducer(entered, action)
  assert.equal(revealed.phase, 'revealed')
  assert.equal(getTotalScore(revealed.results), 2)
  assert.equal(localGameReducer(revealed, action), revealed)
  assert.equal(localGameReducer(revealed, { type: 'finish-week', roundId: action.roundId }), revealed)
  const next = localGameReducer(revealed, prepareGuessingAction(revealed, () => 0))
  assert.equal(getLocalDay(next), 3)
  assert.equal(localGameReducer(next, action), next)
  assert.equal(getTotalScore(next.results), 2)
})

test('all six concepts use 24 different fresh decoys, finish on Day 7 and restart with no old state', () => {
  let state = preparation()
  const order = [...state.week.roundOrder]
  const originalHands = state.week.allocation.hands
  const originalDreams = state.week.dreams
  const allDecoys = new Set<string>()
  const roundIds = new Set<string>()
  let staleReveal: { type: 'reveal'; roundId: `round-${string}` } | undefined
  assert.equal(getLocalDay(state), 1)
  for (let index = 0; index < 6; index++) {
    const before = state
    const action = prepareGuessingAction(state, () => 0.2)
    state = localGameReducer(state, action)
    assert.ok(state.phase !== 'preparation')
    assert.equal(state.phase, 'guessing')
    assert.equal(getLocalDay(state), index + 2)
    assert.equal(state.round.conceptId, order[index])
    assert.equal(state.round.assignments.size, 0)
    assert.equal(state.results.length, index)
    assert.equal(localGameReducer(state, action), state)
    roundIds.add(state.round.id)
    const currentRound = state.round
    const actual = currentRound.targetPlayerIds.map((id) => state.week.dreams.get(id)!.get(currentRound.conceptId)!)
    for (const id of state.round.cardIds.filter((id) => !actual.includes(id))) {
      assert.ok(!allDecoys.has(id))
      assert.ok(!before.week.allocation.seen.get(CURRENT_PLAYER_ID)!.has(id))
      assert.ok(!before.week.allocation.reserved.has(id))
      allDecoys.add(id)
    }
    const publicView = getGuessingBoardView(state.week, state.round, cards, players)
    assert.equal(publicView.currentFriend?.name, 'Nancy')
    state = guessBoth(state)
    assert.ok(state.phase === 'ready-for-reveal')
    staleReveal = { type: 'reveal', roundId: state.round.id }
    state = localGameReducer(state, staleReveal)
    assert.equal(state.phase, 'revealed')
    assert.equal(getTotalScore(state.results), (index + 1) * 2)
  }
  assert.equal(allDecoys.size, 24)
  assert.equal(roundIds.size, 6)
  assert.equal(state.week.allocation.hands, originalHands)
  assert.equal(state.week.dreams, originalDreams)
  assert.ok(state.phase === 'revealed')
  assert.throws(() => prepareGuessingAction(state), /outside this week/)
  const finish = { type: 'finish-week' as const, roundId: state.round.id }
  state = localGameReducer(state, finish)
  assert.equal(state.phase, 'complete')
  assert.equal(getLocalDay(state), 7)
  assert.equal(localGameReducer(state, finish), state)
  const fresh = newWeek('week-next')
  const restart = { type: 'restart' as const, sourceWeek: state.week, week: fresh }
  const restarted = localGameReducer(state, restart)
  assert.equal(restarted.phase, 'preparation')
  assert.equal(getLocalDay(restarted), 1)
  assert.equal(restarted.results.length, 0)
  assert.equal(getTotalScore(restarted.results), 0)
  assert.equal(restarted.week.dreams.get(CURRENT_PLAYER_ID)!.size, 0)
  assert.equal(restarted.week.allocation.hands.get(CURRENT_PLAYER_ID)!.length, 6)
  assert.equal(restarted.week.allocation.seen.get(CURRENT_PLAYER_ID)!.size, 6)
  assert.notEqual(restarted.week.allocation, state.week.allocation)
  assert.ok(!('round' in restarted))
  assert.equal(localGameReducer(restarted, restart), restarted)
  assert.ok(staleReveal)
  assert.equal(localGameReducer(restarted, staleReveal), restarted)
})

test('later-day exhaustion preserves the current reveal and rejects invalid round indices', () => {
  const prepared = preparation()
  const entered = localGameReducer(prepared, prepareGuessingAction(prepared, () => 0))
  const ready = guessBoth(entered)
  assert.ok(ready.phase !== 'preparation')
  const revealed = localGameReducer(ready, { type: 'reveal', roundId: ready.round.id })
  const short = { ...revealed, week: { ...revealed.week, allocation: { ...revealed.week.allocation, available: [] } } }
  const before = structuredClone(short)
  assert.throws(() => prepareGuessingAction(short), /Not enough unseen/)
  assert.deepEqual(short, before)
  for (const index of [-1, 6, 0.5, NaN]) {
    assert.throws(() => createGuessingBoard(prepared.week, CURRENT_PLAYER_ID, index), /outside this week/)
  }
})
