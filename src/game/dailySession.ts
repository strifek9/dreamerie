import { confirmGuess, createRecallState, GAME_CONFIG, type Difference, type Point, type RecallResult } from './dailyRecall.ts'

export type DreamSide = 'original' | 'changed'
export type DailySession = {
  version: 1
  cardId: string
  startedAt: number
  guesses: { point: Point; elapsedSeconds: number }[]
  pending: { point: Point; side: DreamSide } | null
}
export type SessionAction = { type: 'start' } | { type: 'mark'; point: Point; side: DreamSide } | { type: 'confirm'; expectedCount: number; point: Point; side: DreamSide }
export const dailyStorageKey = (day: number) => `dreamerie:daily:v1:${day}`

function isPoint(value: unknown): value is Point {
  if (!value || typeof value !== 'object') return false
  const point = value as Record<string, unknown>
  return typeof point.x === 'number' && Number.isFinite(point.x) && point.x >= 0 && point.x <= 1
    && typeof point.y === 'number' && Number.isFinite(point.y) && point.y >= 0 && point.y <= 1
}

// Reject damaged records instead of silently giving another attempt.
export function parseSession(raw: string | null, cardId: string): DailySession | null {
  if (raw === null) return null
  const value: unknown = JSON.parse(raw)
  if (!value || typeof value !== 'object') throw new Error('Invalid saved dream')
  const record = value as Record<string, unknown>
  if (record.version !== 1 || record.cardId !== cardId || typeof record.startedAt !== 'number'
    || !Number.isFinite(record.startedAt) || record.startedAt <= 0 || !Array.isArray(record.guesses)
    || record.guesses.length > GAME_CONFIG.maxGuesses) throw new Error('Invalid saved dream')
  let lastElapsed = 0
  const guesses = record.guesses.map((guess: unknown) => {
    if (!guess || typeof guess !== 'object') throw new Error('Invalid saved guess')
    const item = guess as Record<string, unknown>
    if (!isPoint(item.point) || typeof item.elapsedSeconds !== 'number' || !Number.isInteger(item.elapsedSeconds)
      || item.elapsedSeconds < lastElapsed || item.elapsedSeconds >= GAME_CONFIG.recallSeconds) throw new Error('Invalid saved guess')
    lastElapsed = item.elapsedSeconds
    return { point: item.point, elapsedSeconds: item.elapsedSeconds }
  })
  let pending: DailySession['pending'] = null
  if (record.pending !== null) {
    if (!record.pending || typeof record.pending !== 'object') throw new Error('Invalid saved marker')
    const item = record.pending as Record<string, unknown>
    if (!isPoint(item.point) || (item.side !== 'original' && item.side !== 'changed')) throw new Error('Invalid saved marker')
    pending = { point: item.point, side: item.side }
  }
  return { version: 1, cardId, startedAt: record.startedAt, guesses, pending }
}

export function sessionSnapshot(session: DailySession | null, differences: readonly Difference[], now: number) {
  let recall = createRecallState()
  let result: RecallResult | null = null
  if (!session) return { phase: 'rules' as const, recall, result, recallLeft: GAME_CONFIG.recallSeconds, pendingSide: 'changed' as DreamSide }
  for (const guess of session.guesses) {
    const outcome = confirmGuess(recall, guess.point, guess.elapsedSeconds, differences)
    recall = outcome.state
    result = outcome.result
  }
  const elapsed = Math.max(0, (now - session.startedAt) / 1000)
  if (!result && elapsed >= GAME_CONFIG.recallSeconds) result = { accuracy: recall.foundDifferenceIds.length, elapsedSeconds: GAME_CONFIG.recallSeconds, reason: 'time' }
  if (!result) recall = { ...recall, pending: session.pending?.point ?? null }
  return { phase: result ? 'result' as const : 'play' as const, recall, result,
    recallLeft: Math.max(0, Math.ceil(GAME_CONFIG.recallSeconds - elapsed)), pendingSide: session.pending?.side ?? 'changed' }
}

export function changeSession(session: DailySession | null, action: SessionAction, cardId: string, differences: readonly Difference[], now: number): DailySession | null {
  if (action.type === 'start') return session ?? { version: 1, cardId, startedAt: now, guesses: [], pending: null }
  if (!session || sessionSnapshot(session, differences, now).result) return session
  if (action.type === 'mark') return isPoint(action.point) ? { ...session, pending: { point: action.point, side: action.side } } : session
  // A stale tab/double confirmation must never consume the next guess.
  if (!session.pending || action.expectedCount !== session.guesses.length || action.side !== session.pending.side
    || action.point.x !== session.pending.point.x || action.point.y !== session.pending.point.y) return session
  const elapsedSeconds = Math.max(session.guesses.at(-1)?.elapsedSeconds ?? 0, Math.floor(Math.max(0, now - session.startedAt) / 1000))
  return { ...session, pending: null, guesses: [...session.guesses, { point: session.pending.point, elapsedSeconds }] }
}

export function updateStoredSession(storage: Pick<Storage, 'getItem' | 'setItem'>, key: string, action: SessionAction, cardId: string, differences: readonly Difference[], now: number) {
  const current = parseSession(storage.getItem(key), cardId)
  const next = changeSession(current, action, cardId, differences, now)
  if (next && next !== current) storage.setItem(key, JSON.stringify(next))
  return next
}
