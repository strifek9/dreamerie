import { useRef, useState } from 'react'
import type { GameAction, GameCommand } from '../../shared/game'
import type { RoomView } from '../../shared/rooms'
import { parseCommand } from '../../shared/gameParsing'
import { ApiError, readRoom, sendGameCommand } from './api'

export function useRoomCommands(room: RoomView, csrf: string, accept: (room: RoomView) => void) {
  const key = `dreamerie.pending-command:${room.id}:${room.selfId}`
  const [pending, setPending] = useState<GameCommand | undefined>(() => {
    try { const saved = sessionStorage.getItem(key); return saved ? parseCommand(JSON.parse(saved)) : undefined }
    catch { return undefined }
  })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const running = useRef(false)
  function remember(command: GameCommand | undefined) {
    setPending(command)
    try {
      if (command) sessionStorage.setItem(key, JSON.stringify(command))
      else sessionStorage.removeItem(key)
    } catch { /* A current-tab retry still uses the same in-memory command. */ }
  }
  async function submit(command: GameCommand) {
    if (running.current) return
    running.current = true
    setBusy(true)
    setError('')
    remember(command)
    try {
      accept(await sendGameCommand(room.id, command, csrf))
      remember(undefined)
    } catch (reason) {
      const definitive = reason instanceof ApiError && reason.status >= 400 && reason.status < 500 && reason.status !== 429
      if (definitive) {
        remember(undefined)
        // Refresh after a conflict, but never resubmit the action against a new day/slot.
        try { accept(await readRoom(room.id)) } catch { /* Keep the last accepted view. */ }
      }
      setError(reason instanceof ApiError ? reason.message : 'The connection broke before we could confirm your choice. Retry to check whether it was saved.')
    } finally {
      running.current = false
      setBusy(false)
    }
  }
  function act(action: GameAction) {
    if (pending || running.current) return
    void submit({ requestId: crypto.randomUUID(), expectedRevision: room.revision, weekId: room.game?.weekId ?? null,
      roundId: room.game?.roundId ?? null, action })
  }
  return { act, busy, blocked: busy || pending !== undefined, error, pending, retry: () => { if (pending) void submit(pending) } }
}
