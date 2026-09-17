import type { CardId, GuessingRound, PlayerId } from './types.ts'

export function getNextGuessTarget(round: GuessingRound): PlayerId | null {
  return round.targetPlayerIds.find((id) => !round.assignments.has(id)) ?? null
}

/** Lock one distinct board image for the current friend without revealing answers. */
export function assignDream(round: GuessingRound, playerId: PlayerId, cardId: CardId): GuessingRound {
  const next = getNextGuessTarget(round)
  if (!next) throw new Error('Both Dreams have already been remembered.')
  if (playerId === round.guesserId || playerId !== next) {
    throw new Error('This Dream is for the friend currently shown.')
  }
  if (!round.cardIds.includes(cardId)) throw new Error('Choose an image from this dream.')
  if ([...round.assignments.values()].includes(cardId)) throw new Error('That dream is already assigned.')
  const assignments = new Map(round.assignments)
  assignments.set(playerId, cardId)
  return { ...round, assignments }
}
