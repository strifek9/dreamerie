import type { Store } from './store.ts'
import type { RoomPhase } from '../shared/rooms.ts'

export const RECAP_RETENTION_MS = 7 * 24 * 60 * 60 * 1000
export const LOBBY_LIFETIME_MS = 24 * 60 * 60 * 1000

/** End time, not later polling/recovery time, determines the retention boundary. */
export function retainRoomUntil(db: Store, roomId: string, endedAt: number) {
  if (!db.inTransaction) throw new Error('Room retention requires a transaction.')
  db.prepare('UPDATE rooms SET expires_at = ? WHERE id = ?').run(endedAt + RECAP_RETENTION_MS, roomId)
}

export function initializeLifecycle(db: Store, now: number) {
  db.prepare("UPDATE rooms SET expires_at = created_at + ?, revision = revision + 1 WHERE phase = 'lobby' AND expires_at IS NULL")
    .run(LOBBY_LIFETIME_MS)
  // Older completed/closed rooms have no recorded end time. Give them one fresh window.
  db.prepare("UPDATE rooms SET expires_at = ?, revision = revision + 1 WHERE phase IN ('complete', 'closed') AND expires_at IS NULL")
    .run(now + RECAP_RETENTION_MS)
}

export function expireRoom(db: Store, roomId: string, now: number) {
  return db.transaction(() => {
    const room = db.prepare<[string], { phase: RoomPhase; expires_at: number | null }>('SELECT phase, expires_at FROM rooms WHERE id = ?').get(roomId)
    if (!room || (room.phase !== 'expired' && (room.expires_at === null || room.expires_at > now))) return false
    // Keep the identity/invite/receipt record so old links explain expiry and retries cannot recreate a room.
    const results = db.prepare('DELETE FROM round_outcomes WHERE room_id = ?').run(roomId)
    const game = db.prepare('DELETE FROM room_games WHERE room_id = ?').run(roomId)
    const schedule = db.prepare('DELETE FROM room_schedules WHERE room_id = ?').run(roomId)
    if (room.phase !== 'expired' || results.changes || game.changes || schedule.changes) {
      db.prepare("UPDATE rooms SET phase = 'expired', revision = revision + 1 WHERE id = ?").run(roomId)
    }
    return true
  }).immediate()
}

export function expireDueRooms(db: Store, now: number) {
  const due = db.prepare<[number], { id: string }>("SELECT id FROM rooms WHERE expires_at <= ? AND phase <> 'expired'").all(now)
  for (const room of due) expireRoom(db, room.id, now)
}
