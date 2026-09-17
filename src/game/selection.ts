import { HAND_SIZE, recordExposure } from './allocation.ts'
import { normalizeClue } from './clues.ts'
import type { CardId, ConceptId, DreamConcept, DreamWeek, PlayerId } from './types.ts'

export function getNextDreamConcept(week: DreamWeek, playerId: PlayerId): DreamConcept | null {
  const dreams = week.dreams.get(playerId)
  if (!dreams) throw new Error('Unknown dreaming player.')
  const nextId = week.setupOrder.find((id) => !dreams.has(id))
  if (!nextId) return null
  const concept = week.concepts.find((entry) => entry.id === nextId)
  if (!concept) throw new Error('Missing Dream concept metadata.')
  return concept
}

/** Commit one choice and its replacement as a single immutable transition. */
export function chooseDream(
  week: DreamWeek,
  playerId: PlayerId,
  conceptId: ConceptId,
  cardId: CardId,
  clue?: string,
): DreamWeek {
  const words = week.mode === 'personal' ? normalizeClue(clue ?? '') : undefined
  const next = getNextDreamConcept(week, playerId)
  if (!next) throw new Error('All six Dreams have already been chosen.')
  if (next.id !== conceptId) throw new Error('That Dream is no longer awaiting a choice.')
  const hand = week.allocation.hands.get(playerId)
  if (!hand || hand.length !== HAND_SIZE) throw new Error('A Dream needs a six-card hand.')
  const slot = hand.indexOf(cardId)
  if (slot < 0) throw new Error('That dream card is not in your hand.')
  const replacement = week.allocation.available[0]
  if (!replacement) throw new Error('No new dream cards remain. Your choice has not been saved.')
  if (week.allocation.reserved.has(replacement) || !week.allocation.cardIds.includes(replacement)) {
    throw new Error('The replacement dream card is not available. Your choice has not been saved.')
  }

  const newHand = [...hand]
  newHand[slot] = replacement
  const hands = new Map(week.allocation.hands)
  hands.set(playerId, newHand)
  const allocation = recordExposure({
    ...week.allocation,
    hands,
    available: week.allocation.available.slice(1),
    reserved: new Set([...week.allocation.reserved, replacement]),
  }, playerId, [replacement])
  const dreams = new Map(week.dreams)
  const playerDreams = new Map(dreams.get(playerId))
  playerDreams.set(conceptId, cardId)
  dreams.set(playerId, playerDreams)
  const clues = new Map(week.clues)
  if (words) {
    const playerClues = new Map(clues.get(playerId))
    playerClues.set(conceptId, words)
    clues.set(playerId, playerClues)
  }
  return { ...week, allocation, dreams, clues }
}
