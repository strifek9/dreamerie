import { cards } from '../src/data/cards.ts'
import { getGuessingBoardView } from '../src/game/board.ts'
import { getRoundRevealView } from '../src/game/scoring.ts'
import { finishedSharedDay, nextSharedDream, unfinishedSharedDay } from '../src/game/sharedWeek.ts'
import type { CardId, Player, PlayerId } from '../src/game/types.ts'
import type { DayReview, GameView } from '../shared/game.ts'
import type { RoomPhase } from '../shared/rooms.ts'
import type { Store } from './store.ts'
import { readGame, readResults } from './gameState.ts'

function card(id: CardId | undefined) {
  const found = cards.find((card) => card.id === id)
  if (!found) throw new Error('Stored dream card is missing.')
  return found
}

export function gameView(db: Store, roomId: string, self: PlayerId, phase: RoomPhase, players: Player[]): GameView | undefined {
  const game = readGame(db, roomId)
  if (!game) return undefined
  const { week } = game
  const outcomes = readResults(db, roomId, self)
  const history = outcomes.map(({ result, missed, unanswered }): DayReview => {
    const concept = week.concepts.find((concept) => concept.id === result.conceptId)
    if (!concept) throw new Error('Stored concept is missing.')
    const ownCardId = week.dreams.get(self)?.get(concept.id)
    return { day: week.roundOrder.indexOf(concept.id) + 2, concept, missed,
      ...(ownCardId ? { ownDream: card(ownCardId), ownClue: week.clues.get(self)?.get(concept.id) } : {}),
      reveal: { ...getRoundRevealView(result, cards, players, week), missed,
        unanswered: unanswered.map((id) => {
          const player = players.find((player) => player.id === id)
          if (!player) throw new Error('Stored player is missing.')
          return { player, actual: card(week.dreams.get(id)?.get(concept.id)), clue: week.clues.get(id)?.get(concept.id) }
        }),
      },
    }
  })
  if (phase === 'closed' || phase === 'complete') return {
    weekId: week.id, day: Math.max(1, game.roundIndex + 2), roundId: null,
    preparation: { next: null, hand: [], saved: [] }, readiness: [], history,
    totalScore: outcomes.reduce((sum, outcome) => sum + outcome.result.points, 0),
    canGuess: false, waitingForNextDay: false, preparingPlayerIds: [], unfinishedPlayerIds: [],
  }
  const current = game.rounds.find((round) => round.guesserId === self)
  const board = current ? getGuessingBoardView(week, current, cards, players) : undefined
  return {
    weekId: week.id, day: Math.max(1, game.roundIndex + 2),
    roundId: game.roundIndex < 0 ? null : `round-${week.id}-${game.roundIndex + 1}`,
    preparation: {
      next: nextSharedDream(game, self),
      hand: [...(week.allocation.hands.get(self) ?? [])].map(card),
      saved: [...(week.dreams.get(self) ?? [])].map(([id, cardId]) => {
        const concept = week.concepts.find((concept) => concept.id === id)
        if (!concept) throw new Error('Stored concept is missing.')
        return { concept, card: card(cardId), clue: week.clues.get(self)?.get(id) ?? '' }
      }),
    },
    readiness: players.map((player) => ({ playerId: player.id, ready: phase === 'preparation'
      ? nextSharedDream(game, player.id) === null : finishedSharedDay(game, player.id) })),
    ...(board && (phase === 'guessing' || phase === 'revealed') ? { board: { ...board, locks: [...board.locks] } } : {}),
    ...(phase === 'revealed' && history.at(-1)?.day === game.roundIndex + 2 ? { reveal: history.at(-1)?.reveal } : {}),
    totalScore: outcomes.reduce((sum, outcome) => sum + outcome.result.points, 0), history,
    canGuess: phase === 'guessing' && !!current,
    waitingForNextDay: game.roundIndex >= 0 && !game.dayPlayerIds.includes(self),
    preparingPlayerIds: players.filter((player) => nextSharedDream(game, player.id) !== null).map((player) => player.id),
    unfinishedPlayerIds: phase === 'guessing' ? unfinishedSharedDay(game) : [],
  }
}
