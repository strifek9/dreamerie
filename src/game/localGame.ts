import { createGuessingBoard } from './board.ts'
import { assignDream, getNextGuessTarget, unassignDream } from './assignments.ts'
import { chooseDream } from './selection.ts'
import { getPreparedFirstRound } from './simulation.ts'
import { scoreRound } from './scoring.ts'
import { prepareSimulatedGuesses } from './simulatedGuesses.ts'
import type { CardId, ConceptId, DreamWeek, GuessingRound, PlayerId, PreparedRound, RoundId, RoundResult } from './types.ts'

interface LocalGameBase {
  readonly week: DreamWeek
  readonly humanPlayerId: PlayerId
  readonly error: string | null
  readonly remembered: string | null
  readonly results: readonly RoundResult[]
}

export type LocalGame = LocalGameBase & (
  | { readonly phase: 'preparation'; readonly firstRound: PreparedRound | null }
  | { readonly phase: 'guessing' | 'ready-for-reveal' | 'revealed' | 'complete'; readonly round: GuessingRound; readonly simulatedRounds: readonly GuessingRound[] }
)

export type LocalGameAction =
  | { type: 'choose'; conceptId: ConceptId; cardId: CardId; clue?: string }
  | { type: 'begin-guessing'; sourceWeek: DreamWeek; sourceRoundId?: RoundId; week: DreamWeek; round: GuessingRound; simulatedRounds: readonly GuessingRound[] }
  | { type: 'error'; message: string }
  | { type: 'assign'; roundId: RoundId; playerId: PlayerId; cardId: CardId }
  | { type: 'unassign'; roundId: RoundId; cardId: CardId }
  | { type: 'reveal'; roundId: RoundId }
  | { type: 'finish-week'; roundId: RoundId }
  | { type: 'restart'; sourceWeek: DreamWeek; week: DreamWeek }

export function createLocalGame(week: DreamWeek, humanPlayerId: PlayerId): LocalGame {
  return { phase: 'preparation', week, humanPlayerId, firstRound: getPreparedFirstRound(week, humanPlayerId),
    error: null, remembered: null, results: [] }
}

export function getLocalDay(state: LocalGame): number {
  return state.phase === 'preparation' ? 1 : state.week.roundOrder.indexOf(state.round.conceptId) + 2
}

/** Called by the entry event, keeping randomness out of rendering and the reducer. */
export function prepareGuessingAction(
  state: LocalGame,
  random: () => number = Math.random,
): LocalGameAction {
  if ((state.phase !== 'preparation' || !state.firstRound) && state.phase !== 'revealed') {
    throw new Error('Remember all six Dreams, then finish each day’s guesses and reveal before advancing.')
  }
  const roundIndex = state.phase === 'preparation' ? 0 : state.week.roundOrder.indexOf(state.round.conceptId) + 1
  const human = createGuessingBoard(state.week, state.humanPlayerId, roundIndex, random)
  const simulated = prepareSimulatedGuesses(human.week, state.humanPlayerId, roundIndex, random)
  return {
    type: 'begin-guessing',
    sourceWeek: state.week,
    sourceRoundId: state.phase === 'revealed' ? state.round.id : undefined,
    round: human.round,
    ...simulated,
  }
}

export function localGameReducer(state: LocalGame, action: LocalGameAction): LocalGame {
  if (action.type === 'error') return { ...state, error: action.message }
  if (action.type === 'restart') {
    if (state.phase !== 'complete' || action.sourceWeek !== state.week || action.week.id === state.week.id) return state
    return createLocalGame(action.week, state.humanPlayerId)
  }
  if (action.type === 'begin-guessing') {
    if (action.sourceWeek !== state.week) return state
    if (state.phase === 'preparation') {
      if (!state.firstRound || action.sourceRoundId || action.round.conceptId !== state.week.roundOrder[0]) return state
    } else if (state.phase !== 'revealed' || action.sourceRoundId !== state.round.id ||
        action.round.conceptId !== state.week.roundOrder[getLocalDay(state) - 1]) return state
    return {
      phase: 'guessing',
      week: action.week,
      round: action.round,
      simulatedRounds: action.simulatedRounds,
      humanPlayerId: state.humanPlayerId,
      error: null,
      remembered: null,
      results: state.results,
    }
  }
  try {
    if (state.phase === 'preparation') {
      if (action.type !== 'choose') return state
      const week = chooseDream(state.week, state.humanPlayerId, action.conceptId, action.cardId, action.clue)
      const remembered = state.week.concepts.find((concept) => concept.id === action.conceptId)?.label ?? null
      return { ...state, week, remembered, error: null, firstRound: getPreparedFirstRound(week, state.humanPlayerId) }
    }
    if (action.type === 'choose' || action.roundId !== state.round.id) return state
    if (action.type === 'unassign' && (state.phase === 'guessing' || state.phase === 'ready-for-reveal')) {
      const round = unassignDream(state.round, action.cardId)
      return round === state.round ? state : { ...state, round, phase: 'guessing', error: null }
    }
    if (action.type === 'assign' && state.phase === 'guessing') {
      const round = assignDream(state.round, action.playerId, action.cardId)
      return { ...state, round, phase: getNextGuessTarget(round) ? 'guessing' : 'ready-for-reveal', error: null }
    }
    if (action.type === 'reveal' && state.phase === 'ready-for-reveal') {
      if (state.results.some((result) => result.roundId === state.round.id)) return state
      return { ...state, phase: 'revealed', results: [...state.results, scoreRound(state.week, state.round, state.simulatedRounds)], error: null }
    }
    if (action.type === 'finish-week' && state.phase === 'revealed' &&
        getLocalDay(state) === state.week.roundOrder.length + 1 && state.results.length === state.week.roundOrder.length) {
      return { ...state, phase: 'complete', error: null }
    }
    return state
  } catch (error) {
    return { ...state, error: error instanceof Error ? error.message : 'This Dream could not be remembered.' }
  }
}
