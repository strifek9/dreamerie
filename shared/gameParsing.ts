import type { Card, DreamConcept, Player, RoundRevealView } from '../src/game/types.ts'
import type { DayReview, GameAction, GameCommand, GameView, PreparationView } from './game.ts'
import * as p from './parse.ts'

export function parseCard(value: unknown): Card {
  const card = p.object(value)
  return { id: p.cardId(card.id), artwork: p.text(card.artwork), description: p.text(card.description) }
}
function concept(value: unknown): DreamConcept {
  const item = p.object(value)
  return { id: p.conceptId(item.id), label: p.text(item.label) }
}
function player(value: unknown): Player {
  const item = p.object(value)
  return { id: p.playerId(item.id), name: p.text(item.name) }
}
function reveal(value: unknown): RoundRevealView {
  const item = p.object(value)
  const guesses = (value: unknown) => p.array(value, (value) => {
    const guess = p.object(value)
    return { player: player(guess.player), chosen: parseCard(guess.chosen), actual: parseCard(guess.actual), correct: p.boolean(guess.correct),
      ...(guess.clue === undefined ? {} : { clue: p.text(guess.clue) }) }
  }, 5)
  return { points: p.integer(item.points, 0, 9), recognitionPoints: p.integer(item.recognitionPoints, 0, 4), guesses: guesses(item.guesses), receivedGuesses: guesses(item.receivedGuesses),
    ...(item.missed === undefined ? {} : { missed: p.boolean(item.missed) }),
    ...(item.unanswered === undefined ? {} : { unanswered: p.array(item.unanswered, (value) => {
      const guess = p.object(value)
      return { player: player(guess.player), actual: parseCard(guess.actual), ...(guess.clue === undefined ? {} : { clue: p.text(guess.clue) }) }
    }, 5) }),
  }
}
function preparation(value: unknown): PreparationView {
  const item = p.object(value)
  return { next: item.next === null ? null : concept(item.next), hand: p.array(item.hand, parseCard, 6),
    saved: p.array(item.saved, (value) => {
      const pair = p.object(value)
      return { concept: concept(pair.concept), card: parseCard(pair.card), clue: p.text(pair.clue) }
    }, 6) }
}

export function parseGameView(value: unknown): GameView {
  const game = p.object(value)
  const view: GameView = {
    weekId: p.weekId(game.weekId), roundId: game.roundId === null ? null : p.roundId(game.roundId), day: p.integer(game.day, 1, 7),
    preparation: preparation(game.preparation), totalScore: p.integer(game.totalScore, 0, 54),
    canGuess: p.boolean(game.canGuess), waitingForNextDay: p.boolean(game.waitingForNextDay),
    preparingPlayerIds: p.array(game.preparingPlayerIds, p.playerId, 6), unfinishedPlayerIds: p.array(game.unfinishedPlayerIds, p.playerId, 6),
    readiness: p.array(game.readiness, (value) => { const status = p.object(value); return { playerId: p.playerId(status.playerId), ready: p.boolean(status.ready) } }, 6),
    history: p.array(game.history, (value): DayReview => {
      const day = p.object(value)
      return { day: p.integer(day.day, 2, 7), concept: concept(day.concept), missed: p.boolean(day.missed), reveal: reveal(day.reveal),
        ...(day.ownDream === undefined ? {} : { ownDream: parseCard(day.ownDream) }), ...(day.ownClue === undefined ? {} : { ownClue: p.text(day.ownClue) }) }
    }, 6),
  }
  if (game.board !== undefined) {
    const board = p.object(game.board)
    view.board = { concept: concept(board.concept), ownDream: parseCard(board.ownDream), cards: p.array(board.cards, parseCard, 6),
      friends: p.array(board.friends, player, 5), currentFriend: board.currentFriend === null ? null : player(board.currentFriend),
      locks: [...p.entries(board.locks, p.cardId, p.text)], ...(board.currentClue === undefined ? {} : { currentClue: p.text(board.currentClue) }) }
  }
  if (game.reveal !== undefined) view.reveal = reveal(game.reveal)
  return view
}

export function parseAction(value: unknown): GameAction {
  const action = p.object(value)
  switch (action.type) {
    case 'start': return { type: 'start' }
    case 'save': return { type: 'save', conceptId: p.conceptId(action.conceptId), cardId: p.cardId(action.cardId), clue: p.text(action.clue) }
    case 'lock': return { type: 'lock', playerId: p.playerId(action.playerId), cardId: p.cardId(action.cardId) }
    case 'unlock': return { type: 'unlock', cardId: p.cardId(action.cardId) }
    case 'open-day': case 'reveal': case 'advance': return { type: action.type,
      ...(action.confirmMissing === undefined ? {} : { confirmMissing: p.array(action.confirmMissing, p.playerId, 6) }) }
    default: throw new Error('Unknown room action.')
  }
}
export function parseCommand(value: unknown): GameCommand {
  const command = p.object(value)
  const requestId = p.text(command.requestId)
  if (!/^[0-9a-fA-F-]{36}$/.test(requestId)) throw new Error('Invalid request ID.')
  return { requestId, expectedRevision: p.integer(command.expectedRevision),
    weekId: command.weekId === null ? null : p.weekId(command.weekId), roundId: command.roundId === null ? null : p.roundId(command.roundId),
    action: parseAction(command.action) }
}
