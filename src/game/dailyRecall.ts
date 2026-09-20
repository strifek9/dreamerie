import { authoredDreams } from '../data/authoredDreams.ts'

export interface Point {
  readonly x: number
  readonly y: number
}

export type DifferenceDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Very hard' | 'Dreamlike'
export interface DifferenceBox { readonly left: number; readonly top: number; readonly width: number; readonly height: number }

export interface Difference extends Point {
  readonly id: string
  readonly radius: number
  readonly difficulty: DifferenceDifficulty
  readonly label: string
  readonly box: DifferenceBox
}

export interface ConfirmedGuess {
  readonly point: Point
  readonly correct: boolean
  readonly differenceId?: string
}

export interface RecallState {
  readonly pending: Point | null
  readonly confirmed: readonly ConfirmedGuess[]
  readonly foundDifferenceIds: readonly string[]
}

export interface RecallResult {
  readonly accuracy: number
  readonly elapsedSeconds: number
  readonly reason: 'guesses' | 'complete' | 'time'
}

export const GAME_CONFIG = {
  recallSeconds: 120,
  maxGuesses: 5,
  differenceCount: 5,
  maxZoom: 4,
} as const

export function getNextAuthoredDream(cardId: string) {
  const index = authoredDreams.findIndex((dream) => dream.id === cardId)
  if (index < 0) throw new Error(`Missing difference profile for ${cardId}.`)
  return authoredDreams[(index + 1) % authoredDreams.length]
}

export function getAnswerReveals(differences: readonly Difference[], foundIds: readonly string[], side: 'original' | 'changed') {
  return differences.map((difference, index) => ({
    difference,
    number: index + 1,
    found: foundIds.includes(difference.id),
  })).filter((answer) => side === 'original' ? answer.found : !answer.found)
}

export function createDifferences(cardId: string): readonly Difference[] {
  const profile = authoredDreams.find((dream) => dream.id === cardId)
  if (!profile) throw new Error(`Missing difference profile for ${cardId}.`)
  return profile.edits.map((edit) => ({
    ...edit,
    id: `${cardId}-${edit.id}`,
    x: edit.box.left + edit.box.width / 2,
    y: edit.box.top + edit.box.height / 2,
    radius: Math.max(edit.box.width, edit.box.height * 1.25) / 2,
  }))
}

export function createRecallState(): RecallState {
  return { pending: null, confirmed: [], foundDifferenceIds: [] }
}

export function getRemainingGuesses(state: RecallState): number {
  return Math.max(0, GAME_CONFIG.maxGuesses - state.confirmed.length)
}

export function findDifference(
  point: Point,
  foundDifferenceIds: readonly string[],
  differences: readonly Difference[],
): Difference | undefined {
  // A tiny detail can sit inside a larger object's bounds. It always owns its
  // hit area, even after being found, so a duplicate cannot score its parent.
  const target = [...differences].sort((a, b) => a.box.width * a.box.height - b.box.width * b.box.height).find((difference) => {
    const { left, top, width, height } = difference.box
    return point.x >= left && point.x <= left + width && point.y >= top && point.y <= top + height
  })
  return target && !foundDifferenceIds.includes(target.id) ? target : undefined
}

export function confirmGuess(
  state: RecallState,
  point: Point,
  elapsedSeconds: number,
  differences: readonly Difference[],
): { state: RecallState; result: RecallResult | null } {
  if (state.confirmed.length >= GAME_CONFIG.maxGuesses) return { state, result: null }

  const difference = findDifference(point, state.foundDifferenceIds, differences)
  const nextState: RecallState = {
    pending: null,
    confirmed: [...state.confirmed, {
      point,
      correct: Boolean(difference),
      differenceId: difference?.id,
    }],
    foundDifferenceIds: difference
      ? [...state.foundDifferenceIds, difference.id]
      : state.foundDifferenceIds,
  }

  const foundAll = nextState.foundDifferenceIds.length === differences.length
  const usedAllGuesses = nextState.confirmed.length === GAME_CONFIG.maxGuesses
  return {
    state: nextState,
    result: foundAll || usedAllGuesses
      ? {
          accuracy: nextState.foundDifferenceIds.length,
          elapsedSeconds,
          reason: foundAll ? 'complete' : 'guesses',
        }
      : null,
  }
}

export function compareResults(left: RecallResult, right: RecallResult): number {
  if (left.accuracy !== right.accuracy) return right.accuracy - left.accuracy
  return left.elapsedSeconds - right.elapsedSeconds
}

export function formatClock(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds))
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

// Share the public entry point, never a review override or private URL fragment.
export function createPlayUrl(currentUrl: string): string {
  const url = new URL(currentUrl)
  if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error('Expected a web address')
  url.search = ''
  url.hash = ''
  url.username = ''
  url.password = ''
  return url.href
}

export function createShareText(
  dreamNumber: number,
  result: RecallResult,
  differences: readonly Difference[],
  foundDifferenceIds: readonly string[],
  playUrl: string,
): string {
  const tiles = differences
    .map((difference) => foundDifferenceIds.includes(difference.id) ? '🟪' : '⬛')
    .join('')
  return [
    `Dreamerie #${dreamNumber}`,
    `${result.accuracy}/5 · ${formatClock(result.elapsedSeconds)}`,
    tiles,
    'Find the five differences before the dream fades.',
    createPlayUrl(playUrl),
  ].join('\n')
}
