import type { Card, DreamWeek, GuessingRound, Player, RoundResult, RoundRevealView } from './types.ts'
import { getDreamClue } from './clues.ts'

/** Correct guessers always keep their point; only the author's award is withheld. */
export function getRecognitionPoints(correctGuessers: number, otherPlayers: number): number {
  if (!Number.isInteger(otherPlayers) || otherPlayers < 1 || !Number.isInteger(correctGuessers) ||
      correctGuessers < 0 || correctGuessers > otherPlayers) throw new Error('Invalid recognition count.')
  return correctGuessers === otherPlayers ? 0 : correctGuessers
}

function evaluateGuesses(week: DreamWeek, round: GuessingRound): RoundResult['guesses'] {
  if (round.assignments.size !== round.targetPlayerIds.length ||
      new Set(round.assignments.values()).size !== round.targetPlayerIds.length) {
    throw new Error('Remember a different dream card for each friend before revealing their Dreams.')
  }
  return round.targetPlayerIds.map((playerId) => {
    const chosenCardId = round.assignments.get(playerId)
    const actualCardId = week.dreams.get(playerId)?.get(round.conceptId)
    if (playerId === round.guesserId || !chosenCardId || !actualCardId ||
        chosenCardId === round.ownDreamId || chosenCardId === week.dreams.get(round.guesserId)?.get(round.conceptId) ||
        !round.cardIds.includes(chosenCardId) || !round.cardIds.includes(actualCardId)) {
      throw new Error('This Dream cannot be revealed with incomplete or invalid choices.')
    }
    return { playerId, chosenCardId, actualCardId, correct: chosenCardId === actualCardId }
  })
}

/** Only complete one-to-one assignments may expose answers and earn points. */
export function scoreRound(week: DreamWeek, round: GuessingRound, simulatedRounds?: readonly GuessingRound[]): RoundResult {
  const guesses = evaluateGuesses(week, round)
  if (week.mode === 'personal' && !simulatedRounds) throw new Error('Each friend must finish their guesses before revealing.')
  const receivedGuesses: RoundResult['guesses'][number][] = []
  if (simulatedRounds) {
    if (simulatedRounds.length !== round.targetPlayerIds.length ||
        new Set(simulatedRounds.map((entry) => entry.guesserId)).size !== round.targetPlayerIds.length) {
      throw new Error('Each friend must finish their guesses before revealing.')
    }
    for (const friend of simulatedRounds) {
      if (!round.targetPlayerIds.includes(friend.guesserId) || friend.conceptId !== round.conceptId || friend.id !== round.id) {
        throw new Error('Friends must guess the same Dream day before revealing.')
      }
      const received = evaluateGuesses(week, friend).find((guess) => guess.playerId === round.guesserId)
      if (!received) throw new Error('A friend has not guessed your Dream.')
      receivedGuesses.push({ ...received, playerId: friend.guesserId })
    }
  }
  const recognitionPoints = week.mode === 'personal' && simulatedRounds
    ? getRecognitionPoints(receivedGuesses.filter((guess) => guess.correct).length, round.targetPlayerIds.length) : 0
  return { roundId: round.id, conceptId: round.conceptId,
    points: guesses.filter((guess) => guess.correct).length + recognitionPoints, recognitionPoints, guesses, receivedGuesses }
}

export function getTotalScore(results: readonly RoundResult[]): number {
  return results.reduce((total, result) => total + result.points, 0)
}

/** Call only with a stored revealed result; guessing views never receive this data. */
export function getRoundRevealView(result: RoundResult, cards: readonly Card[], players: readonly Player[], week?: DreamWeek): RoundRevealView {
  const describe = (guess: RoundResult['guesses'][number], includeClue: boolean): RoundRevealView['guesses'][number] => {
    const player = players.find((entry) => entry.id === guess.playerId)
    const chosen = cards.find((entry) => entry.id === guess.chosenCardId)
    const actual = cards.find((entry) => entry.id === guess.actualCardId)
    if (!player || !chosen || !actual) throw new Error('Dream reveal metadata is missing.')
    return { player, chosen, actual, correct: guess.correct,
      clue: includeClue && week?.mode === 'personal' ? getDreamClue(week, guess.playerId, result.conceptId) : undefined }
  }
  return { points: result.points, recognitionPoints: result.recognitionPoints,
    guesses: result.guesses.map((guess) => describe(guess, true)), receivedGuesses: result.receivedGuesses.map((guess) => describe(guess, false)) }
}
