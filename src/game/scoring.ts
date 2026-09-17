import type { Card, DreamWeek, GuessingRound, Player, RoundResult, RoundRevealView } from './types.ts'
import { getDreamClue } from './clues.ts'

/** Correct guessers always keep their point; only the author's award is withheld. */
export function getRecognitionPoints(correctGuessers: number, otherPlayers: number): number {
  if (!Number.isInteger(otherPlayers) || otherPlayers < 1 || !Number.isInteger(correctGuessers) ||
      correctGuessers < 0 || correctGuessers > otherPlayers) throw new Error('Invalid recognition count.')
  return correctGuessers === otherPlayers ? 0 : correctGuessers
}

function evaluateGuesses(week: DreamWeek, round: GuessingRound): RoundResult['guesses'] {
  const expectedTargets = [...week.dreams.keys()].filter((id) => id !== round.guesserId)
  const roundIndex = week.roundOrder.indexOf(round.conceptId)
  if (!week.dreams.has(round.guesserId) || expectedTargets.length < 1 || expectedTargets.length > 5 ||
      roundIndex < 0 || round.id !== `round-${week.id}-${roundIndex + 1}` ||
      round.targetPlayerIds.length !== expectedTargets.length ||
      new Set(round.targetPlayerIds).size !== expectedTargets.length ||
      expectedTargets.some((id) => !round.targetPlayerIds.includes(id))) {
    throw new Error('This Dream round does not match the week and its players.')
  }
  if (round.assignments.size !== round.targetPlayerIds.length ||
      new Set(round.assignments.values()).size !== round.targetPlayerIds.length) {
    throw new Error('Remember a different dream card for each friend before revealing their Dreams.')
  }
  if (round.cardIds.length !== 6 || new Set(round.cardIds).size !== 6 ||
      round.cardIds.some((id) => !week.allocation.cardIds.includes(id)) ||
      round.ownDreamId !== week.dreams.get(round.guesserId)?.get(round.conceptId) ||
      round.cardIds[0] !== round.ownDreamId) {
    throw new Error('This Dream cannot be revealed with incomplete or invalid choices.')
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
export function scoreRound(week: DreamWeek, round: GuessingRound, otherRounds?: readonly GuessingRound[]): RoundResult {
  const guesses = evaluateGuesses(week, round)
  if (week.mode === 'personal' && !otherRounds) throw new Error('Each friend must finish their guesses before revealing.')
  const receivedGuesses: RoundResult['guesses'][number][] = []
  if (otherRounds) {
    if (otherRounds.length !== round.targetPlayerIds.length ||
        new Set(otherRounds.map((entry) => entry.guesserId)).size !== round.targetPlayerIds.length) {
      throw new Error('Each friend must finish their guesses before revealing.')
    }
    for (const friend of otherRounds) {
      if (!round.targetPlayerIds.includes(friend.guesserId) || friend.conceptId !== round.conceptId || friend.id !== round.id) {
        throw new Error('Friends must guess the same Dream day before revealing.')
      }
      const received = evaluateGuesses(week, friend).find((guess) => guess.playerId === round.guesserId)
      if (!received) throw new Error('A friend has not guessed your Dream.')
      receivedGuesses.push({ ...received, playerId: friend.guesserId })
    }
  }
  const recognitionPoints = week.mode === 'personal' && otherRounds
    ? getRecognitionPoints(receivedGuesses.filter((guess) => guess.correct).length, round.targetPlayerIds.length) : 0
  return { guesserId: round.guesserId, roundId: round.id, conceptId: round.conceptId,
    points: guesses.filter((guess) => guess.correct).length + recognitionPoints, recognitionPoints, guesses, receivedGuesses }
}

export function getTotalScore(results: readonly RoundResult[]): number {
  if (new Set(results.map((result) => result.roundId)).size !== results.length ||
      new Set(results.map((result) => result.guesserId)).size > 1) {
    throw new Error('Count each revealed round once for the same player.')
  }
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
