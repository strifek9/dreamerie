import type { Card, DreamWeek, GuessingRound, Player, RoundResult, RoundRevealView } from './types.ts'

/** Only complete one-to-one assignments may expose answers and earn points. */
export function scoreRound(week: DreamWeek, round: GuessingRound): RoundResult {
  if (round.assignments.size !== round.targetPlayerIds.length ||
      new Set(round.assignments.values()).size !== round.targetPlayerIds.length) {
    throw new Error('Remember a different image for each friend before revealing their Dreams.')
  }
  const guesses = round.targetPlayerIds.map((playerId) => {
    const chosenCardId = round.assignments.get(playerId)
    const actualCardId = week.dreams.get(playerId)?.get(round.conceptId)
    if (playerId === round.guesserId || !chosenCardId || !actualCardId ||
        !round.cardIds.includes(chosenCardId) || !round.cardIds.includes(actualCardId)) {
      throw new Error('This Dream cannot be revealed with incomplete or invalid choices.')
    }
    return { playerId, chosenCardId, actualCardId, correct: chosenCardId === actualCardId }
  })
  return { roundId: round.id, conceptId: round.conceptId,
    points: guesses.filter((guess) => guess.correct).length, guesses }
}

export function getTotalScore(results: readonly RoundResult[]): number {
  return results.reduce((total, result) => total + result.points, 0)
}

/** Call only with a stored revealed result; guessing views never receive this data. */
export function getRoundRevealView(result: RoundResult, cards: readonly Card[], players: readonly Player[]): RoundRevealView {
  return { points: result.points, guesses: result.guesses.map((guess) => {
    const player = players.find((entry) => entry.id === guess.playerId)
    const chosen = cards.find((entry) => entry.id === guess.chosenCardId)
    const actual = cards.find((entry) => entry.id === guess.actualCardId)
    if (!player || !chosen || !actual) throw new Error('Dream reveal metadata is missing.')
    return { player, chosen, actual, correct: guess.correct }
  }) }
}
