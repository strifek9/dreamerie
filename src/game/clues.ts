import type { ConceptId, DreamWeek, PlayerId } from './types.ts'

export const MAX_CLUE_LENGTH = 80

/** Match the input's native maxlength; trim and collapse pasted whitespace. */
export function normalizeClue(value: string): string {
  const clue = value.trim().replace(/\s+/gu, ' ')
  if (!clue) throw new Error('Write a dream clue: a word or a short sentence.')
  if (clue.length > MAX_CLUE_LENGTH) throw new Error(`Keep your Dream within ${MAX_CLUE_LENGTH} characters.`)
  return clue
}

export function getDreamClue(week: DreamWeek, playerId: PlayerId, conceptId: ConceptId): string {
  const clue = week.mode === 'personal'
    ? week.clues.get(playerId)?.get(conceptId)
    : week.concepts.find((concept) => concept.id === conceptId)?.label
  if (!clue) throw new Error('This Dream is missing its dream clue.')
  return clue
}
