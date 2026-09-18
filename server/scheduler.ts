import type { RoomPhase } from '../shared/rooms.ts'
import { readGame } from './gameState.ts'
import { saveGame, transitionDay } from './gameTransitions.ts'
import { chicagoMidnight, fullDayDeadline, ROOM_TIME_ZONE, SCHEDULE_POLICY } from './roomClock.ts'
import type { Store } from './store.ts'
import { expireRoom, retainRoomUntil } from './roomLifecycle.ts'

export function setDeadline(db: Store, roomId: string, deadline: number | null) {
  if (deadline === null) db.prepare('DELETE FROM room_schedules WHERE room_id = ?').run(roomId)
  else db.prepare(`INSERT INTO room_schedules VALUES (?, ?, ?, ?)
    ON CONFLICT(room_id) DO UPDATE SET deadline = excluded.deadline`).run(roomId, deadline, ROOM_TIME_ZONE, SCHEDULE_POLICY)
}

/** Upgrade active, formerly manual rooms once, without inventing past missed days. */
export function initializeSchedules(db: Store, now: number) {
  db.transaction(() => {
    const unscheduled = db.prepare<[number], { id: string }>(`SELECT r.id FROM rooms r JOIN room_games g ON g.room_id = r.id
      LEFT JOIN room_schedules s ON s.room_id = r.id WHERE s.room_id IS NULL
      AND r.phase IN ('preparation', 'guessing', 'revealed') AND (r.expires_at IS NULL OR r.expires_at > ?)`).all(now)
    for (const room of unscheduled) {
      setDeadline(db, room.id, fullDayDeadline(now))
      db.prepare('UPDATE rooms SET revision = revision + 1 WHERE id = ?').run(room.id)
    }
  }).immediate()
}

/** Re-read under the write lock; retries and stale timer jobs cannot advance twice. */
export function advanceDueRoom(db: Store, roomId: string, now: number, expectedDeadline?: number): number {
  if (expireRoom(db, roomId, now)) return 0
  return db.transaction(() => {
    const room = db.prepare<[string], { deadline: number; phase: RoomPhase; expires_at: number | null }>(
      'SELECT s.deadline, r.phase, r.expires_at FROM room_schedules s JOIN rooms r ON r.id = s.room_id WHERE r.id = ?').get(roomId)
    if (!room || room.deadline > now || (expectedDeadline !== undefined && room.deadline !== expectedDeadline)) return 0
    if (room.phase === 'complete' || room.phase === 'closed' || room.phase === 'expired' || (room.expires_at !== null && room.expires_at <= now)) {
      setDeadline(db, roomId, null)
      return 0
    }
    let game = readGame(db, roomId)
    if (!game) throw new Error('Scheduled game is missing.')
    let phase: RoomPhase = room.phase
    let deadline = room.deadline, transitions = 0
    while (deadline <= now) {
      if (phase === 'preparation') ({ game, phase } = transitionDay(db, roomId, game, phase, 'open-day'))
      else {
        if (phase === 'guessing') ({ game, phase } = transitionDay(db, roomId, game, phase, 'reveal'))
        ;({ game, phase } = transitionDay(db, roomId, game, phase, 'advance'))
      }
      saveGame(db, roomId, game, phase)
      transitions++
      if (phase === 'complete') { setDeadline(db, roomId, null); retainRoomUntil(db, roomId, deadline); break }
      // Anchor catch-up to the old deadline, not the recovery time.
      deadline = chicagoMidnight(deadline, 1)
      setDeadline(db, roomId, deadline)
    }
    return transitions
  }).immediate()
}

export function runDueRooms(db: Store, now: number, onError: (roomId: string) => void) {
  const due = db.prepare<[number], { room_id: string; deadline: number }>('SELECT room_id, deadline FROM room_schedules WHERE deadline <= ? ORDER BY deadline').all(now)
  for (const room of due) {
    try { advanceDueRoom(db, room.room_id, now, room.deadline) }
    catch { onError(room.room_id) } // One broken room must not block other rooms; retry next tick.
  }
}
