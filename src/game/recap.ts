import { getOwnDreamCard } from './board.ts'
import { getDreamClue } from './clues.ts'
import { getRoundRevealView } from './scoring.ts'
import type { Card, DreamWeek, Player, PlayerId, RoundResult, WeekRecapEntry } from './types.ts'

/** Current-week recap, available only after all six results have been revealed. */
export function getWeekRecap(
  week: DreamWeek, results: readonly RoundResult[], guesserId: PlayerId,
  cards: readonly Card[], players: readonly Player[],
): readonly WeekRecapEntry[] {
  if (results.length !== week.roundOrder.length || new Set(results.map((result) => result.conceptId)).size !== week.roundOrder.length) {
    throw new Error('Reveal all six Dreams before looking back on the week.')
  }
  if (!week.dreams.has(guesserId) || results.some((result) => result.guesserId !== guesserId)) {
    throw new Error('These results belong to a different player.')
  }
  return week.roundOrder.map((conceptId, index) => {
    const result = results.find((entry) => entry.conceptId === conceptId)
    const concept = week.concepts.find((entry) => entry.id === conceptId)
    if (!result || !concept) throw new Error('A Dream is missing from the week’s results.')
    if (result.roundId !== `round-${week.id}-${index + 1}`) throw new Error('These results belong to a different Dream Week.')
    return { concept, ownDream: getOwnDreamCard(week, guesserId, conceptId, cards),
      ownClue: week.mode === 'personal' ? getDreamClue(week, guesserId, conceptId) : undefined,
      reveal: getRoundRevealView(result, cards, players, week) }
  })
}
