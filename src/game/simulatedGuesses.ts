import { assignDream } from './assignments.ts'
import { createGuessingBoard } from './board.ts'
import { shuffle } from './random.ts'
import type { DreamWeek, GuessingRound, PlayerId } from './types.ts'

/** Local fixtures: choose distinct images without consulting the answer mapping. */
export function prepareSimulatedGuesses(
  week: DreamWeek,
  humanPlayerId: PlayerId,
  roundIndex: number,
  random: () => number = Math.random,
): { week: DreamWeek; simulatedRounds: readonly GuessingRound[] } {
  if (!week.dreams.has(humanPlayerId)) throw new Error('Unknown human player.')
  let nextWeek = week
  const simulatedRounds: GuessingRound[] = []
  for (const playerId of week.dreams.keys()) {
    if (playerId === humanPlayerId) continue
    const prepared = createGuessingBoard(nextWeek, playerId, roundIndex, random)
    let round = prepared.round
    const choices = shuffle(round.cardIds.filter((id) => id !== round.ownDreamId), random)
    for (const [index, targetId] of round.targetPlayerIds.entries()) {
      const cardId = choices[index]
      if (!cardId) throw new Error('Not enough dream cards for simulated guesses.')
      round = assignDream(round, targetId, cardId)
    }
    nextWeek = prepared.week
    simulatedRounds.push(round)
  }
  return { week: nextWeek, simulatedRounds }
}
