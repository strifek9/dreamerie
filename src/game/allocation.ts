import type { Card, CardId, Player, PlayerId, WeekAllocation, WeekId } from './types.ts'

export const HAND_SIZE = 6

/** Allocate the entire initial deal atomically; never mutate caller-owned data. */
export function dealInitialHands(
  weekId: WeekId,
  cards: readonly Card[],
  players: readonly Player[],
  random: () => number = Math.random,
): WeekAllocation {
  const ids = cards.map((card) => card.id)
  if (new Set(ids).size !== ids.length) {
    throw new Error('The card collection contains duplicate IDs.')
  }
  if (new Set(players.map((player) => player.id)).size !== players.length) {
    throw new Error('The player collection contains duplicate IDs.')
  }
  const required = players.length * HAND_SIZE
  if (ids.length < required) {
    throw new Error(`Not enough unique cards: need ${required}, have ${ids.length}.`)
  }

  const shuffled = [...ids]
  for (let index = shuffled.length - 1; index > 0; index--) {
    const value = random()
    if (!Number.isFinite(value) || value < 0 || value >= 1) {
      throw new Error('Randomness must return a number from 0 up to, but not including, 1.')
    }
    const other = Math.floor(value * (index + 1))
    const first = shuffled[index]
    const second = shuffled[other]
    if (first === undefined || second === undefined) throw new Error('Invalid shuffle index.')
    shuffled[index] = second
    shuffled[other] = first
  }

  const hands = new Map<PlayerId, readonly CardId[]>()
  const seen = new Map<PlayerId, ReadonlySet<CardId>>()
  players.forEach((player, index) => {
    const hand = shuffled.slice(index * HAND_SIZE, (index + 1) * HAND_SIZE)
    hands.set(player.id, hand)
    // The initial hand is exposed to its owner, including simulated owners.
    seen.set(player.id, new Set(hand))
  })

  return {
    weekId,
    cardIds: ids,
    available: shuffled.slice(required),
    reserved: new Set(shuffled.slice(0, required)),
    hands,
    seen,
  }
}

/** Record displayed cards without allocating them or exposing them to other players. */
export function recordExposure(
  state: WeekAllocation,
  playerId: PlayerId,
  displayed: readonly CardId[],
): WeekAllocation {
  const previous = state.seen.get(playerId)
  if (!previous) throw new Error('Cannot record exposure for an unknown player.')
  const known = new Set(state.cardIds)
  if (displayed.some((id) => !known.has(id))) {
    throw new Error('Cannot record exposure for an unknown card.')
  }
  const seen = new Map(state.seen)
  seen.set(playerId, new Set([...previous, ...displayed]))
  return { ...state, seen }
}
