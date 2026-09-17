import { getNextDreamConcept } from './selection.ts'
import type { DreamWeek, PlayerId, PreparedRound } from './types.ts'

/** Keep the first round private and unavailable until every player has prepared. */
export function getPreparedFirstRound(week: DreamWeek, guesserId: PlayerId): PreparedRound | null {
  if (!week.dreams.has(guesserId)) throw new Error('Unknown guessing player.')
  const playerIds = [...week.dreams.keys()]
  if (playerIds.some((id) => getNextDreamConcept(week, id) !== null)) return null
  const conceptId = week.roundOrder[0]
  if (!conceptId || !week.concepts.some((concept) => concept.id === conceptId)) {
    throw new Error('The first Dream round is missing.')
  }
  return { conceptId, guesserId, targetPlayerIds: playerIds.filter((id) => id !== guesserId) }
}
