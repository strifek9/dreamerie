import { chooseDream, getNextDreamConcept } from './selection.ts'
import { simulatedClues } from '../data/simulatedClues.ts'
import type { DreamWeek, PlayerId, PreparedRound } from './types.ts'

/** Random valid choices are local fixtures, not a model of friends' interpretations. */
export function prepareSimulatedDreams(
  week: DreamWeek,
  humanPlayerId: PlayerId,
  random: () => number = Math.random,
): DreamWeek {
  if (!week.dreams.has(humanPlayerId)) throw new Error('Unknown human player.')
  const friends = [...week.dreams.keys()].filter((id) => id !== humanPlayerId)
  const replacementsNeeded = friends.reduce((count, id) => {
    const dreams = week.dreams.get(id)
    return count + week.setupOrder.filter((conceptId) => !dreams?.has(conceptId)).length
  }, 0)
  if (week.allocation.available.length < replacementsNeeded) {
    throw new Error('Not enough new dream cards to prepare the simulated Dreams.')
  }

  let prepared = week
  for (const [friendIndex, friendId] of friends.entries()) {
    let concept = getNextDreamConcept(prepared, friendId)
    while (concept) {
      const hand = prepared.allocation.hands.get(friendId)
      if (!hand) throw new Error('A simulated player has no hand.')
      const value = random()
      if (!Number.isFinite(value) || value < 0 || value >= 1) {
        throw new Error('Randomness must return a number from 0 up to, but not including, 1.')
      }
      const chosen = hand[Math.floor(value * hand.length)]
      if (!chosen) throw new Error('A simulated player has no available dream card.')
      const clue = simulatedClues[(friendIndex * week.setupOrder.length + week.setupOrder.indexOf(concept.id)) % simulatedClues.length]
      prepared = chooseDream(prepared, friendId, concept.id, chosen, clue)
      concept = getNextDreamConcept(prepared, friendId)
    }
  }
  return prepared
}

/** Keep the first round private and unavailable until everyone has prepared. */
export function getPreparedFirstRound(week: DreamWeek, humanPlayerId: PlayerId): PreparedRound | null {
  if (!week.dreams.has(humanPlayerId)) throw new Error('Unknown human player.')
  const playerIds = [...week.dreams.keys()]
  if (playerIds.some((id) => getNextDreamConcept(week, id) !== null)) return null
  const conceptId = week.roundOrder[0]
  if (!conceptId || !week.concepts.some((concept) => concept.id === conceptId)) {
    throw new Error('The first Dream round is missing.')
  }
  return {
    conceptId,
    guesserId: humanPlayerId,
    targetPlayerIds: playerIds.filter((id) => id !== humanPlayerId),
  }
}
