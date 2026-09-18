import { useEffect, useRef, useState } from 'react'
import type { RoomView, SessionView } from '../../shared/rooms'
import { ApiError, openSession, readPending, readRoom, saveRoom, storePending, type PendingEntry } from './api'

export function useRoomConnection() {
  const [session, setSession] = useState<SessionView>()
  const [room, setRoom] = useState<RoomView>()
  const [connecting, setConnecting] = useState(true)
  const [error, setError] = useState('')
  const [connection, setConnection] = useState('')
  const [busy, setBusy] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [pending, setPending] = useState(readPending)
  const commandRunning = useRef(false)

  function enter(view: RoomView) {
    const url = new URL(window.location.href)
    url.searchParams.delete('invite')
    url.searchParams.set('room', view.id)
    window.history.replaceState(null, '', url)
    setRoom(view)
    setError('')
  }

  function accept(view: RoomView) {
    setRoom((previous) => previous?.id === view.id && previous.revision > view.revision ? previous : view)
  }

  useEffect(() => {
    let active = true
    setConnecting(true)
    setError('')
    void openSession().then(async (current) => {
      if (!active) return
      setSession(current)
      const query = new URLSearchParams(window.location.search)
      const invite = query.get('invite')?.toUpperCase()
      const saved = current.rooms.find((entry) => entry.id === query.get('room') || entry.inviteCode === invite)
      if (saved) enter(saved)
      else if (query.has('room')) {
        const view = await readRoom(query.get('room')!)
        if (active) enter(view)
      }
    }).catch((reason: unknown) => {
      if (active) setError(reason instanceof Error ? reason.message : 'The room could not be reached.')
    }).finally(() => { if (active) setConnecting(false) })
    return () => { active = false }
  }, [attempt])

  const roomId = room?.id
  useEffect(() => {
    if (!roomId) return
    let active = true
    let running = false
    let failures = 0
    let timer: ReturnType<typeof setTimeout> | undefined
    async function refresh() {
      clearTimeout(timer)
      if (!active || running || document.hidden) return
      running = true
      try {
        const view = await readRoom(roomId!)
        if (!active) return
        setRoom((previous) => previous?.id === view.id && previous.revision > view.revision ? previous : view)
        failures = 0
        setConnection('')
      } catch (reason) {
        if (!active) return
        failures++
        if (reason instanceof ApiError && [401, 403].includes(reason.status)) {
          setConnection(reason.message)
          active = false
        } else setConnection('Connection lost. Your place is saved. Reconnecting…')
      } finally {
        running = false
        if (active && !document.hidden) timer = setTimeout(() => { void refresh() }, Math.min(3000 * 2 ** failures, 30_000))
      }
    }
    const resume = () => { void refresh() }
    void refresh()
    document.addEventListener('visibilitychange', resume)
    window.addEventListener('online', resume)
    window.addEventListener('focus', resume)
    return () => {
      active = false
      clearTimeout(timer)
      document.removeEventListener('visibilitychange', resume)
      window.removeEventListener('online', resume)
      window.removeEventListener('focus', resume)
    }
  }, [roomId])

  async function submit(command: PendingEntry) {
    if (!session || commandRunning.current) return
    commandRunning.current = true
    setBusy(true)
    setError('')
    setPending(command)
    storePending(command)
    try {
      const view = await saveRoom(command.action, command.body, session.csrfToken)
      storePending(undefined)
      setPending(undefined)
      setSession((previous) => previous ? { ...previous, rooms: [view, ...previous.rooms.filter((entry) => entry.id !== view.id)] } : previous)
      enter(view)
    } catch (reason) {
      // A limiter can reject a retry even though the original request was accepted.
      const definitive = reason instanceof ApiError && reason.status >= 400 && reason.status < 500 && reason.status !== 429
      if (definitive) { storePending(undefined); setPending(undefined) }
      setError(reason instanceof ApiError && (definitive || reason.status === 429) ? reason.message : 'We could not confirm your place. Retry the same request to check it safely.')
    } finally {
      commandRunning.current = false
      setBusy(false)
    }
  }

  return { session, room, connecting, error, connection, busy, pending, enter, accept, submit, retryConnection: () => setAttempt((value) => value + 1) }
}
