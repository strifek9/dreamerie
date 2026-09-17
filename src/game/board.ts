import { recordExposure } from './allocation.ts'
import { getNextGuessTarget } from './assignments.ts'
import { shuffle } from './random.ts'
import { getPreparedFirstRound } from './simulation.ts'
import type { Card, ConceptId, DreamWeek, GuessingBoardView, GuessingRound, Player, PlayerId } from './types.ts'

/** Convenience entry for the first hidden-order concept. */
export function createFirstGuessingBoard(
  week: DreamWeek,
  guesserId: PlayerId,
  random: () => number = Math.random,
): { week: DreamWeek; round: GuessingRound } {
  return createGuessingBoard(week, guesserId, 0, random)
}

/** Build and expose one board atomically, only after everyone's preparation. */
export function createGuessingBoard(
  week: DreamWeek,
  guesserId: PlayerId,
  roundIndex: number,
  random: () => number = Math.random,
): { week: DreamWeek; round: GuessingRound } {
  const prepared = getPreparedFirstRound(week, guesserId)
  if (!prepared) throw new Error('Everyone must remember their Dreams before guessing begins.')
  const conceptId = week.roundOrder[roundIndex]
  if (!Number.isInteger(roundIndex) || !conceptId || !week.concepts.some((concept) => concept.id === conceptId)) {
    throw new Error('That Dream day is outside this week.')
  }
  if (prepared.targetPlayerIds.length !== 2) {
    throw new Error('This local prototype needs two friends for its board.')
  }
  const { allocation } = week
  const seen = allocation.seen.get(guesserId)
  if (!seen) throw new Error('The guessing player has no image history.')
  const known = new Set(allocation.cardIds)
  const ownDreams = new Set(week.dreams.get(guesserId)?.values())
  const ownDreamId = week.dreams.get(guesserId)?.get(conceptId)
  if (!ownDreamId || !known.has(ownDreamId) || !allocation.reserved.has(ownDreamId)) {
    throw new Error('Your remembered Dream is missing or has an invalid allocation.')
  }
  const actual = prepared.targetPlayerIds.map((id) => {
    const cardId = week.dreams.get(id)?.get(conceptId)
    if (!cardId || !known.has(cardId) || !allocation.reserved.has(cardId) || ownDreams.has(cardId)) {
      throw new Error('A friend’s Dream is missing or has an invalid allocation.')
    }
    return cardId
  })
  if (new Set(actual).size !== actual.length) throw new Error('Friends must have distinct Dreams.')

  const eligible = [...new Set(allocation.available)].filter((id) =>
    known.has(id) && !allocation.reserved.has(id) && !seen.has(id),
  )
  if (eligible.length < 3) throw new Error('Not enough unseen images to open this dream. Three are needed.')
  const decoys = shuffle(eligible, random).slice(0, 3)
  const cardIds = [ownDreamId, ...shuffle([...actual, ...decoys], random)]
  const round: GuessingRound = { ...prepared, conceptId, id: `round-${week.id}-${roundIndex + 1}`, ownDreamId, cardIds, assignments: new Map() }
  // Decoys remain unallocated; Charlie's exposure excludes them from later boards.
  return { week: { ...week, allocation: recordExposure(allocation, guesserId, cardIds) }, round }
}

export function getGuessingBoardView(
  week: DreamWeek,
  round: GuessingRound,
  cards: readonly Card[],
  players: readonly Player[],
): GuessingBoardView {
  const concept = week.concepts.find((entry) => entry.id === round.conceptId)
  if (!concept) throw new Error('The Dream concept is missing.')
  const friends = round.targetPlayerIds.map((id) => {
    const player = players.find((entry) => entry.id === id)
    if (!player) throw new Error('A friend is missing.')
    return player
  })
  const next = getNextGuessTarget(round)
  return {
    concept,
    ownDream: getOwnDreamCard(week, round.guesserId, round.conceptId, cards),
    cards: round.cardIds.map((id) => {
      const card = cards.find((entry) => entry.id === id)
      if (!card) throw new Error(`Missing artwork metadata for ${id}.`)
      return card
    }),
    friends,
    currentFriend: friends.find((friend) => friend.id === next) ?? null,
    locks: new Map(friends.flatMap((friend) => {
      const cardId = round.assignments.get(friend.id)
      return cardId ? [[cardId, friend.name] as const] : []
    })),
  }
}

export function getOwnDreamCard(week: DreamWeek, playerId: PlayerId, conceptId: ConceptId, cards: readonly Card[]): Card {
  const id = week.dreams.get(playerId)?.get(conceptId)
  const card = cards.find((entry) => entry.id === id)
  if (!card) throw new Error('Your remembered Dream is missing.')
  return card
}
