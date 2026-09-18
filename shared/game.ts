import type { Card, CardId, ConceptId, DreamConcept, GuessingBoardView, PlayerId, RoundId, RoundRevealView, WeekId } from '../src/game/types.ts'

export type GameAction =
  | { type: 'start' }
  | { type: 'save'; conceptId: ConceptId; cardId: CardId; clue: string }
  | { type: 'open-day'; confirmMissing?: PlayerId[] }
  | { type: 'lock'; playerId: PlayerId; cardId: CardId }
  | { type: 'unlock'; cardId: CardId }
  | { type: 'reveal'; confirmMissing?: PlayerId[] }
  | { type: 'advance'; confirmMissing?: PlayerId[] }

export interface GameCommand {
  requestId: string
  expectedRevision: number
  weekId: WeekId | null
  roundId: RoundId | null
  action: GameAction
}

export interface PreparationView {
  next: DreamConcept | null
  hand: Card[]
  saved: { concept: DreamConcept; card: Card; clue: string }[]
}

export interface DayReview {
  day: number
  concept: DreamConcept
  ownDream?: Card
  ownClue?: string
  missed: boolean
  reveal: RoundRevealView
}

// Only the recipient's view. Wire locks use entries, never JSON.stringify(Map).
export interface GameView {
  weekId: WeekId
  day: number
  roundId: RoundId | null
  preparation: PreparationView
  readiness: { playerId: PlayerId; ready: boolean }[]
  board?: Omit<GuessingBoardView, 'locks'> & { locks: [CardId, string][] }
  reveal?: RoundRevealView
  totalScore: number
  history: DayReview[]
  canGuess: boolean
  waitingForNextDay: boolean
  preparingPlayerIds: PlayerId[]
  unfinishedPlayerIds: PlayerId[]
}
