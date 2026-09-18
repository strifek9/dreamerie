import { recordExposure } from './allocation.ts'
import { chooseDream } from './selection.ts'
import { shuffle } from './random.ts'
import { rankedRecognition } from './recognition.ts'
import type { CardId, ConceptId, DreamConcept, DreamWeek, GuessingRound, PlayerId, RoundResult } from './types.ts'

/** Online-only day membership is frozen when its boards open. */
export interface SharedWeek {
  week: DreamWeek
  roundIndex: number
  rounds: GuessingRound[]
  dayPlayerIds: PlayerId[]
}
export interface SharedOutcome {
  result: RoundResult
  missed: boolean
  unanswered: PlayerId[]
}

export function nextSharedDream(game: SharedWeek, player: PlayerId): DreamConcept | null {
  const dreams = game.week.dreams.get(player)
  if (!dreams) throw new Error('This player does not belong to the Dream Week.')
  const opened = game.week.roundOrder.slice(0, game.roundIndex + 1)
  const id = game.week.setupOrder.find((id) => !opened.includes(id) && !dreams.has(id))
  return game.week.concepts.find((concept) => concept.id === id) ?? null
}

export function saveSharedDream(game: SharedWeek, player: PlayerId, conceptId: ConceptId, cardId: CardId, clue?: string): SharedWeek {
  const next = nextSharedDream(game, player)
  if (!next || next.id !== conceptId) throw new Error('That Dream is no longer open for preparation. Check the current Dream and try again.')
  // Reuse atomic selection/replacement while excluding days already opened.
  const eligible = game.week.setupOrder.filter((id) => !game.week.roundOrder.slice(0, game.roundIndex + 1).includes(id))
  const chosen = chooseDream({ ...game.week, setupOrder: eligible }, player, conceptId, cardId, clue)
  return { ...game, week: { ...chosen, setupOrder: game.week.setupOrder } }
}

export function addSharedPlayer(game: SharedWeek, player: PlayerId): SharedWeek {
  if (game.week.dreams.has(player) || game.week.dreams.size >= 6) throw new Error('This Dream Week cannot add that player.')
  if (game.roundIndex >= 5) throw new Error('The last day has already opened. Join a new Dream Week instead.')
  const { allocation } = game.week
  if (allocation.available.length < 6) throw new Error('Not enough unique dream cards remain to join this week.')
  const hand = allocation.available.slice(0, 6)
  return { ...game, week: { ...game.week,
    allocation: { ...allocation, available: allocation.available.slice(6), reserved: new Set([...allocation.reserved, ...hand]),
      hands: new Map([...allocation.hands, [player, hand]]), seen: new Map([...allocation.seen, [player, new Set(hand)]]) },
    dreams: new Map(game.week.dreams).set(player, new Map<ConceptId, CardId>()), clues: new Map(game.week.clues).set(player, new Map<ConceptId, string>()),
  } }
}

/** Open everyone's immutable boards together. Missing Dreams are anonymous decoys. */
export function openSharedDay(game: SharedWeek, random: () => number = Math.random): SharedWeek {
  const roundIndex = game.roundIndex + 1
  const conceptId = game.week.roundOrder[roundIndex]
  if (!conceptId) throw new Error('Every day in this Dream Week has already opened.')
  let week = game.week
  const dayPlayerIds = [...week.dreams.keys()]
  const prepared = dayPlayerIds.filter((player) => week.dreams.get(player)?.has(conceptId))
  const rounds = prepared.map((guesserId): GuessingRound => {
    const ownDreamId = week.dreams.get(guesserId)?.get(conceptId)
    if (!ownDreamId) throw new Error('Your Dream is missing.')
    const targetPlayerIds = prepared.filter((player) => player !== guesserId)
    const actual = targetPlayerIds.map((player) => {
      const card = week.dreams.get(player)?.get(conceptId)
      if (!card) throw new Error('A friend’s Dream is missing.')
      return card
    })
    const seen = week.allocation.seen.get(guesserId)
    const eligible = week.allocation.available.filter((card) => !week.allocation.reserved.has(card) && !seen?.has(card))
    const needed = 5 - actual.length
    if (eligible.length < needed) throw new Error('Not enough unseen dream cards remain. This day has not opened.')
    const decoys = needed ? shuffle(eligible, random).slice(0, needed) : []
    const cardIds = [ownDreamId, ...shuffle([...actual, ...decoys], random)]
    week = { ...week, allocation: recordExposure(week.allocation, guesserId, cardIds) }
    return { id: `round-${week.id}-${roundIndex + 1}`, conceptId, guesserId, targetPlayerIds, ownDreamId, cardIds, assignments: new Map() }
  })
  return { week, roundIndex, rounds, dayPlayerIds }
}

export function finishedSharedDay(game: SharedWeek, player: PlayerId): boolean {
  const round = game.rounds.find((round) => round.guesserId === player)
  return !!round && round.assignments.size === round.targetPlayerIds.length
}

export function unfinishedSharedDay(game: SharedWeek): PlayerId[] {
  return game.dayPlayerIds.filter((player) => !finishedSharedDay(game, player))
}

/** Missing/unfinished players receive zero, including recognition. Their partial guesses earn nobody points. */
export function scoreSharedDay(game: SharedWeek): SharedOutcome[] {
  const conceptId = game.week.roundOrder[game.roundIndex]
  if (!conceptId) throw new Error('No guessing day is open.')
  const finished = game.rounds.filter((round) => finishedSharedDay(game, round.guesserId))
  const recognition = rankedRecognition(new Map(finished.map((author) => [author.guesserId,
    finished.filter((guesser) => guesser.guesserId !== author.guesserId
      && guesser.assignments.get(author.guesserId) === author.ownDreamId).length,
  ])))
  return game.dayPlayerIds.map((guesserId): SharedOutcome => {
    const round = game.rounds.find((round) => round.guesserId === guesserId)
    const missed = !finishedSharedDay(game, guesserId)
    const guesses = round ? [...round.assignments].map(([playerId, chosenCardId]) => {
      const actualCardId = game.week.dreams.get(playerId)?.get(conceptId)
      if (!actualCardId || !round.targetPlayerIds.includes(playerId) || !round.cardIds.includes(chosenCardId) || chosenCardId === round.ownDreamId) {
        throw new Error('This day contains an invalid guess.')
      }
      return { playerId, chosenCardId, actualCardId, correct: chosenCardId === actualCardId }
    }) : []
    const ownCard = game.week.dreams.get(guesserId)?.get(conceptId)
    const receivedGuesses = ownCard ? finished.filter((friend) => friend.guesserId !== guesserId).map((friend) => {
      const chosenCardId = friend.assignments.get(guesserId)
      if (!chosenCardId) throw new Error('A finished player is missing a guess.')
      return { playerId: friend.guesserId, chosenCardId, actualCardId: ownCard, correct: chosenCardId === ownCard }
    }) : []
    const correctReceived = receivedGuesses.filter((guess) => guess.correct).length
    const recognitionPoints = game.week.mode === 'classic' ? recognition.get(guesserId) ?? 0
      : missed || correctReceived === receivedGuesses.length ? 0 : correctReceived
    return { missed, unanswered: round?.targetPlayerIds.filter((player) => !round.assignments.has(player)) ?? game.rounds.map((round) => round.guesserId),
      result: { guesserId, roundId: `round-${game.week.id}-${game.roundIndex + 1}`, conceptId,
        guesses, receivedGuesses, recognitionPoints, points: missed ? 0 : recognitionPoints + (game.week.mode === 'personal' ? guesses.filter((guess) => guess.correct).length : 0) } }
  })
}
