import assert from 'node:assert/strict'
import { test } from 'node:test'
import { cards } from '../src/data/cards.ts'
import { concepts } from '../src/data/concepts.ts'
import { CURRENT_PLAYER_ID, players } from '../src/data/players.ts'
import { chooseDream, getNextDreamConcept } from '../src/game/selection.ts'
import { createDreamWeek } from '../src/game/week.ts'
import type { DreamWeek } from '../src/game/types.ts'

const freshWeek = () => createDreamWeek('week-fixture', concepts, cards, players, () => 0)
const snapshot = (week: DreamWeek) => ({
  available: [...week.allocation.available],
  reserved: [...week.allocation.reserved],
  hands: [...week.allocation.hands].map(([id, hand]) => [id, [...hand]]),
  seen: [...week.allocation.seen].map(([id, seen]) => [id, [...seen]]),
  dreams: [...week.dreams].map(([id, dreams]) => [id, [...dreams]]),
})

test('choosing records the Dream, replaces the same slot, reserves and exposes the new image', () => {
  const week = freshWeek()
  const before = snapshot(week)
  const hand = week.allocation.hands.get(CURRENT_PLAYER_ID)!
  const chosen = hand[2]!
  const replacement = week.allocation.available[0]!
  const updated = chooseDream(week, CURRENT_PLAYER_ID, 'concept-time', chosen)
  const updatedHand = updated.allocation.hands.get(CURRENT_PLAYER_ID)!
  assert.equal(updated.dreams.get(CURRENT_PLAYER_ID)?.get('concept-time'), chosen)
  assert.equal(updatedHand.length, 6)
  assert.equal(updatedHand[2], replacement)
  assert.ok(!updatedHand.includes(chosen))
  assert.deepEqual(updatedHand.filter((_, index) => index !== 2), hand.filter((_, index) => index !== 2))
  assert.equal(updated.allocation.reserved.size, 19)
  assert.ok(updated.allocation.reserved.has(chosen))
  assert.ok(updated.allocation.reserved.has(replacement))
  assert.equal(updated.allocation.available.length, cards.length - 19)
  assert.equal(updated.allocation.seen.get(CURRENT_PLAYER_ID)?.size, 7)
  assert.ok(updated.allocation.seen.get(CURRENT_PLAYER_ID)?.has(replacement))
  assert.equal(getNextDreamConcept(updated, CURRENT_PLAYER_ID)?.id, 'concept-love')
  assert.equal(updated.roundOrder, week.roundOrder)
  assert.deepEqual(snapshot(week), before)
  for (const id of ['player-nancy', 'player-song'] as const) {
    assert.equal(updated.allocation.hands.get(id), week.allocation.hands.get(id))
    assert.equal(updated.allocation.seen.get(id), week.allocation.seen.get(id))
    assert.equal(updated.dreams.get(id)?.size, 0)
  }
})

test('stale/double commands and reusing a selected card reject without changing state', () => {
  const week = freshWeek()
  const chosen = week.allocation.hands.get(CURRENT_PLAYER_ID)![0]!
  const updated = chooseDream(week, CURRENT_PLAYER_ID, 'concept-time', chosen)
  const before = snapshot(updated)
  assert.throws(() => chooseDream(updated, CURRENT_PLAYER_ID, 'concept-time', chosen), /no longer/)
  assert.throws(() => chooseDream(updated, CURRENT_PLAYER_ID, 'concept-love', chosen), /not in your hand/)
  assert.deepEqual(snapshot(updated), before)
})

test('unknown player, out-of-order concept, and another player’s card are rejected atomically', () => {
  const week = freshWeek()
  const before = snapshot(week)
  const chosen = week.allocation.hands.get(CURRENT_PLAYER_ID)![0]!
  const friendCard = week.allocation.hands.get('player-nancy')![0]!
  assert.throws(() => chooseDream(week, 'player-missing', 'concept-time', chosen), /Unknown/)
  assert.throws(() => chooseDream(week, CURRENT_PLAYER_ID, 'concept-love', chosen), /no longer/)
  assert.throws(() => chooseDream(week, CURRENT_PLAYER_ID, 'concept-time', friendCard), /not in your hand/)
  assert.throws(() => chooseDream(week, CURRENT_PLAYER_ID, 'concept-time', 'card-missing'), /not in your hand/)
  assert.deepEqual(snapshot(week), before)
})

test('replacement exhaustion leaves the selected card in hand and no Dream recorded', () => {
  const week = freshWeek()
  const exhausted = { ...week, allocation: { ...week.allocation, available: [] } }
  const before = snapshot(exhausted)
  const chosen = exhausted.allocation.hands.get(CURRENT_PLAYER_ID)![0]!
  assert.throws(() => chooseDream(exhausted, CURRENT_PLAYER_ID, 'concept-time', chosen), /No new images/)
  assert.deepEqual(snapshot(exhausted), before)
})

test('invalid reserved replacement is rejected without leaking exposure or partial updates', () => {
  const week = freshWeek()
  const chosen = week.allocation.hands.get(CURRENT_PLAYER_ID)![0]!
  const corrupted = { ...week, allocation: { ...week.allocation, available: [chosen] } }
  const before = snapshot(corrupted)
  assert.throws(() => chooseDream(corrupted, CURRENT_PLAYER_ID, 'concept-time', chosen), /not available/)
  assert.deepEqual(snapshot(corrupted), before)
})

test('every selection including the sixth preserves unique six-card hands and prevents a seventh', () => {
  let week = freshWeek()
  for (const concept of concepts) {
    const chosen = week.allocation.hands.get(CURRENT_PLAYER_ID)![0]!
    week = chooseDream(week, CURRENT_PLAYER_ID, concept.id, chosen)
    const hands = [...week.allocation.hands.values()].flat()
    assert.equal(hands.length, 18)
    assert.equal(new Set(hands).size, 18)
    assert.ok(week.allocation.available.every((id) => !week.allocation.reserved.has(id)))
    const allDreams = [...week.dreams.values()].flatMap((dreams) => [...dreams.values()])
    assert.ok(allDreams.every((id) => !hands.includes(id)))
    assert.equal(new Set(allDreams).size, allDreams.length)
  }
  assert.equal(week.dreams.get(CURRENT_PLAYER_ID)?.size, 6)
  assert.equal(week.allocation.reserved.size, 24)
  assert.equal(week.allocation.available.length, cards.length - 24)
  assert.equal(week.allocation.seen.get(CURRENT_PLAYER_ID)?.size, 12)
  assert.equal(getNextDreamConcept(week, CURRENT_PLAYER_ID), null)
  assert.equal(getNextDreamConcept(week, 'player-nancy')?.id, 'concept-time')
  const before = snapshot(week)
  assert.throws(() => chooseDream(week, CURRENT_PLAYER_ID, 'concept-time', week.allocation.hands.get(CURRENT_PLAYER_ID)![0]!), /already/)
  assert.deepEqual(snapshot(week), before)
})
