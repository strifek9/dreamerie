import { useEffect, useRef, useState } from 'react'
import type { Difference } from './dailyRecall'
import { changeSession, dailyStorageKey, parseSession, sessionSnapshot, updateStoredSession, type DailySession, type SessionAction } from './dailySession'

export function useDailySession(day: number, cardId: string, differences: readonly Difference[], playtest: boolean, options?: { namespace: string; aspectRatio: number }) {
  const key = options ? `${options.namespace}:${day}` : dailyStorageKey(day)
  const [initial] = useState(() => {
    try { return { session: playtest ? null : parseSession(localStorage.getItem(key), cardId), error: '' } }
    catch { return { session: null, error: 'Your saved dream could not be opened. Allow browser storage, or clear this site’s data to start again.' } }
  })
  const [session, setSession] = useState(initial.session)
  const sessionRef = useRef<DailySession | null>(initial.session)
  const [storageError, setStorageError] = useState(initial.error)
  const [now, setNow] = useState(Date.now)
  const [busy, setBusy] = useState(false)
  const busyRef = useRef(false)

  useEffect(() => {
    const refresh = () => {
      setNow(Date.now())
      if (playtest) return
      try {
        const saved = parseSession(localStorage.getItem(key), cardId)
        sessionRef.current = saved
        setSession(saved)
        setStorageError('')
      } catch { setStorageError('Your saved dream could not be opened. Allow browser storage, or clear this site’s data to start again.') }
    }
    const onStorage = (event: StorageEvent) => { if (event.key === key || event.key === null) refresh() }
    const timer = window.setInterval(() => setNow(Date.now()), 250)
    window.addEventListener('storage', onStorage)
    window.addEventListener('focus', refresh)
    window.addEventListener('pageshow', refresh)
    document.addEventListener('visibilitychange', refresh)
    return () => {
      clearInterval(timer)
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('focus', refresh)
      window.removeEventListener('pageshow', refresh)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [key, cardId, playtest])

  async function dispatch(action: SessionAction) {
    if (busyRef.current) return
    busyRef.current = true
    setBusy(true)
    try {
      const update = () => {
        const at = Date.now()
        const next = playtest ? changeSession(sessionRef.current, action, cardId, differences, at, options?.aspectRatio)
          : updateStoredSession(localStorage, key, action, cardId, differences, at, options?.aspectRatio)
        sessionRef.current = next
        setSession(next)
        setNow(at)
        setStorageError('')
      }
      // Serialize writes across tabs; re-read the saved attempt inside the lock.
      if (playtest) update()
      else if (navigator.locks) await navigator.locks.request(key, update)
      else throw new Error('Browser locking unavailable')
    } catch { setStorageError('We couldn’t save this dream. Please allow site storage and use a current browser, then try again.') }
    finally { busyRef.current = false; setBusy(false) }
  }

  return { ...sessionSnapshot(session, differences, now, options?.aspectRatio), dispatch, storageError, busy }
}
