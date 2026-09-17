import type { CardId, GuessingRound, PlayerId } from './types.ts'

export function getNextGuessTarget(round: GuessingRound): PlayerId | null {
  return round.targetPlayerIds.find((id) => !round.assignments.has(id)) ?? null
}

/** Lock one distinct board image for the current friend without revealing answers. */
export function assignDream(round: GuessingRound, playerId: PlayerId, cardId: CardId): GuessingRound {
  const next = getNextGuessTarget(round)
  if (!next) throw new Error('All guesses have already been remembered.')
  if (playerId === round.guesserId || playerId !== next) {
    throw new Error('This Dream is for the friend currently shown.')
  }
  if (!round.cardIds.includes(cardId)) throw new Error('Choose a dream card from this dream.')
  if (cardId === round.ownDreamId) throw new Error('Your Dream is a reference. Choose another dream card for your friend.')
  if ([...round.assignments.values()].includes(cardId)) throw new Error('That dream is already assigned.')
  const assignments = new Map(round.assignments)
  assignments.set(playerId, cardId)
  return { ...round, assignments }
}

/** Release only this guess; other friends' choices and the board stay intact. */
export function unassignDream(round: GuessingRound, cardId: CardId): GuessingRound {
  const assigned = [...round.assignments].find(([, chosen]) => chosen === cardId)
  if (!assigned) return round
  const assignments = new Map(round.assignments)
  assignments.delete(assigned[0])
  return { ...round, assignments }
}
