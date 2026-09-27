import { useEffect, useState } from 'react'
import { readPlayStats, type PlayStats } from '../game/playStats'
import { landscapeDay, LANDSCAPE_SESSION_OPTIONS } from '../v2/landscapeCollection'

export function usePlayStats(playtest: boolean, completed: boolean, knownCardIds: ReadonlySet<string>) {
  const [stats, setStats] = useState<PlayStats | null>(null)
  useEffect(() => {
    if (playtest) { setStats(null); return }
    const refresh = () => {
      try {
        const date = new Date()
        setStats(readPlayStats(localStorage, LANDSCAPE_SESSION_OPTIONS.namespace, knownCardIds, landscapeDay(date), date.getTime()))
      } catch {
        // Optional history must never block guessing or overwrite damaged data.
        setStats(null)
      }
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key.startsWith(`${LANDSCAPE_SESSION_OPTIONS.namespace}:`)) refresh()
    }
    refresh()
    const timer = window.setInterval(refresh, 30_000)
    window.addEventListener('storage', onStorage)
    window.addEventListener('focus', refresh)
    window.addEventListener('pageshow', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      window.clearInterval(timer)
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('focus', refresh)
      window.removeEventListener('pageshow', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [playtest, completed, knownCardIds])
  return playtest ? null : stats
}
