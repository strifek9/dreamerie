import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cards } from '../src/data/cards.ts'
import { concepts } from '../src/data/concepts.ts'
import { CURRENT_PLAYER_ID, players } from '../src/data/players.ts'
import { chooseDream, getNextDreamConcept } from '../src/game/selection.ts'
import { getPreparedFirstRound, prepareSimulatedDreams } from '../src/game/simulation.ts'
import { createDreamWeek, getWeekIntroduction } from '../src/game/week.ts'
import type { DreamWeek } from '../src/game/types.ts'

const fresh = () => createDreamWeek('week-fixture', concepts, cards, players, () => 0)
function prepareCharlie(input: DreamWeek): DreamWeek {
  let week = input
  for (const concept of concepts) {
    week = chooseDream(week, CURRENT_PLAYER_ID, concept.id, week.allocation.hands.get(CURRENT_PLAYER_ID)![0]!)
  }
  return week
}

test('friends use shared selection and replacement rules without changing Charlie’s prepared Dreams', () => {
  const week = prepareCharlie(fresh())
  const prepared = prepareSimulatedDreams(week, CURRENT_PLAYER_ID, () => 0.5)
  assert.equal(prepared.dreams.get(CURRENT_PLAYER_ID), week.dreams.get(CURRENT_PLAYER_ID))
  assert.equal(prepared.allocation.hands.get(CURRENT_PLAYER_ID), week.allocation.hands.get(CURRENT_PLAYER_ID))
  assert.equal(prepared.allocation.seen.get(CURRENT_PLAYER_ID), week.allocation.seen.get(CURRENT_PLAYER_ID))
  assert.equal(prepared.roundOrder, week.roundOrder)
  const selected = [...prepared.dreams.values()].flatMap((dreams) => [...dreams.values()])
  const hands = [...prepared.allocation.hands.values()].flat()
  assert.equal(selected.length, 18)
  assert.equal(new Set([...selected, ...hands]).size, 36)
  assert.equal(prepared.allocation.reserved.size, 36)
  assert.equal(prepared.allocation.available.length, cards.length - 36)
  for (const player of players) {
    assert.equal(prepared.allocation.hands.get(player.id)?.length, 6)
    assert.equal(prepared.dreams.get(player.id)?.size, 6)
    assert.equal(prepared.allocation.seen.get(player.id)?.size, 12)
  }
  assert.equal(week.dreams.get('player-nancy')?.size, 0)
  assert.equal(week.dreams.get('player-song')?.size, 0)
  assert.equal(week.allocation.available.length, cards.length - 24)
})

test('startup simulation excludes Charlie and the public introduction does not expose friends or schedule', () => {
  const week = fresh()
  const prepared = prepareSimulatedDreams(week, CURRENT_PLAYER_ID, () => 0)
  assert.equal(prepared.dreams.get(CURRENT_PLAYER_ID)?.size, 0)
  assert.equal(prepared.allocation.hands.get(CURRENT_PLAYER_ID), week.allocation.hands.get(CURRENT_PLAYER_ID))
  assert.equal(prepared.allocation.seen.get(CURRENT_PLAYER_ID)?.size, 6)
  assert.deepEqual(getWeekIntroduction(prepared), getWeekIntroduction(week))
  assert.equal(getPreparedFirstRound(prepared, CURRENT_PLAYER_ID), null)
  const completed = prepareCharlie(prepared)
  assert.deepEqual(getPreparedFirstRound(completed, CURRENT_PLAYER_ID), {
    conceptId: completed.roundOrder[0],
    guesserId: CURRENT_PLAYER_ID,
    targetPlayerIds: ['player-nancy', 'player-song'],
  })
  assert.equal(completed.allocation.available.length, cards.length - 36)
})

test('simulation can resume partial friends, is reproducible, and completed friends draw nothing twice', () => {
  let week = fresh()
  week = chooseDream(week, 'player-nancy', 'concept-time', week.allocation.hands.get('player-nancy')![3]!)
  const existing = week.dreams.get('player-nancy')?.get('concept-time')
  const first = prepareSimulatedDreams(week, CURRENT_PLAYER_ID, () => 0.25)
  assert.deepEqual(first, prepareSimulatedDreams(week, CURRENT_PLAYER_ID, () => 0.25))
  assert.equal(first.dreams.get('player-nancy')?.get('concept-time'), existing)
  assert.equal(getNextDreamConcept(first, 'player-nancy'), null)
  assert.equal(getNextDreamConcept(first, 'player-song'), null)
  assert.equal(prepareSimulatedDreams(first, CURRENT_PLAYER_ID, () => { throw new Error('Must not draw again') }), first)
})

test('insufficient replacement cards fail before any simulation, leaving input untouched', () => {
  const week = fresh()
  const short = { ...week, allocation: { ...week.allocation, available: week.allocation.available.slice(0, 11) } }
  const before = structuredClone(short)
  let calls = 0
  assert.throws(() => prepareSimulatedDreams(short, CURRENT_PLAYER_ID, () => { calls++; return 0 }), /Not enough/)
  assert.equal(calls, 0)
  assert.deepEqual(short, before)
})

test('invalid randomness after partial work and unknown human IDs cannot mutate the input', () => {
  const week = fresh()
  const before = structuredClone(week)
  let calls = 0
  assert.throws(() => prepareSimulatedDreams(week, CURRENT_PLAYER_ID, () => ++calls < 4 ? 0 : 1), /Randomness/)
  assert.deepEqual(week, before)
  assert.throws(() => prepareSimulatedDreams(week, 'player-missing'), /Unknown human/)
  assert.throws(() => getPreparedFirstRound(week, 'player-missing'), /Unknown human/)
  assert.equal(getPreparedFirstRound(prepareCharlie(week), CURRENT_PLAYER_ID), null)
})
