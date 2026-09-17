import { getOwnDreamCard } from './board.ts'
import { getRoundRevealView } from './scoring.ts'
import type { Card, DreamWeek, Player, PlayerId, RoundResult, WeekRecapEntry } from './types.ts'

/** Current-week recap, available only after all six results have been revealed. */
export function getWeekRecap(
  week: DreamWeek, results: readonly RoundResult[], humanPlayerId: PlayerId,
  cards: readonly Card[], players: readonly Player[],
): readonly WeekRecapEntry[] {
  if (results.length !== week.roundOrder.length || new Set(results.map((result) => result.conceptId)).size !== week.roundOrder.length) {
    throw new Error('Reveal all six Dreams before looking back on the week.')
  }
  return week.roundOrder.map((conceptId) => {
    const result = results.find((entry) => entry.conceptId === conceptId)
    const concept = week.concepts.find((entry) => entry.id === conceptId)
    if (!result || !concept) throw new Error('A Dream is missing from the week’s results.')
    return { concept, ownDream: getOwnDreamCard(week, humanPlayerId, conceptId, cards),
      reveal: getRoundRevealView(result, cards, players) }
  })
}
