import { GAME_CONFIG } from './dailyRecall.ts'
import { parseSession } from './dailySession.ts'

export interface PlayStats {
  current: number
  best: number
  played: number
  completedToday: boolean
}

export function summarizePlayDays(completedDays: readonly number[], today: number): PlayStats {
  const days = [...new Set(completedDays.filter(day => Number.isSafeInteger(day) && day >= 1 && day <= today))].sort((a, b) => a - b)
  let run = 0, best = 0, previous = -Infinity
  for (const day of days) {
    run = day === previous + 1 ? run + 1 : 1
    best = Math.max(best, run)
    previous = day
  }
  // Yesterday's streak stays alive while today's puzzle is still available.
  return { current: previous >= today - 1 ? run : 0, best, played: days.length, completedToday: previous === today }
}

// Saved attempts are the only source of truth: no counter writes, migration or
// cross-tab races. Clearing site data clears both attempts and their statistics.
export function readPlayStats(
  storage: Pick<Storage, 'length' | 'key' | 'getItem'>,
  namespace: string,
  knownCardIds: ReadonlySet<string>,
  today: number,
  now: number,
): PlayStats {
  const prefix = `${namespace}:`
  const days: number[] = []
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i)
    if (!key?.startsWith(prefix)) continue
    const suffix = key.slice(prefix.length)
    if (!/^[1-9]\d*$/.test(suffix)) continue
    const day = Number(suffix)
    if (!Number.isSafeInteger(day) || day > today) continue
    const raw = storage.getItem(key)
    if (raw === null) continue
    const header: unknown = JSON.parse(raw)
    if (!header || typeof header !== 'object' || !('cardId' in header) || typeof header.cardId !== 'string') throw new Error('Invalid play history')
    if (!knownCardIds.has(header.cardId)) continue
    const session = parseSession(raw, header.cardId)
    if (!session || session.startedAt > now) continue
    const finished = session.guesses.length === GAME_CONFIG.maxGuesses
      ? session.startedAt + session.guesses.at(-1)!.elapsedSeconds * 1000 <= now
      : session.startedAt + GAME_CONFIG.recallSeconds * 1000 <= now
    if (finished) days.push(day)
  }
  return summarizePlayDays(days, today)
}

export function streakShareLine(stats: PlayStats | null): string {
  return stats?.completedToday && stats.current >= 2 ? `✦ ${stats.current}-day streak` : ''
}
