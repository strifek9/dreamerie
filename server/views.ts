import type { RoomPhase, RoomView } from '../shared/rooms.ts'
import { RoomError } from './errors.ts'
import type { Store } from './store.ts'
import { gameView } from './gameViews.ts'
import { playerId } from '../shared/parse.ts'
import { advanceDueRoom } from './scheduler.ts'
import { expireRoom } from './roomLifecycle.ts'

export interface StoredRoom {
  id: string
  invite_code: string
  host_id: string
  phase: RoomPhase
  revision: number
  expires_at: number | null
}

export function roomView(db: Store, roomId: string, sessionId: string, now: number): RoomView {
  const self = db.prepare<[string, string], { player_id: string }>('SELECT player_id FROM memberships WHERE room_id = ? AND session_id = ?').get(roomId, sessionId)
  if (!self) throw new RoomError(403, 'ROOM_FORBIDDEN', 'This browser does not have a place in that room. Open its invitation to join.')
  advanceDueRoom(db, roomId, now)
  expireRoom(db, roomId, now)
  const room = db.prepare<[string], StoredRoom>('SELECT id, invite_code, host_id, phase, revision, expires_at FROM rooms WHERE id = ?').get(roomId)
  if (!room) throw new RoomError(404, 'ROOM_NOT_FOUND', 'That room could not be found.')
  const view: RoomView = {
    id: room.id, inviteCode: room.invite_code, hostId: room.host_id, selfId: self.player_id,
    phase: room.expires_at !== null && now >= room.expires_at ? 'expired' : room.phase,
    revision: room.revision,
    ...(room.expires_at === null ? {} : { expiresAt: room.expires_at }),
    members: db.prepare<[string], RoomView['members'][number]>(
      'SELECT player_id AS playerId, display_name AS displayName, accent_slot AS accentSlot FROM memberships WHERE room_id = ? ORDER BY accent_slot',
    ).all(roomId),
  }
  const game = view.phase === 'expired' ? undefined : gameView(db, roomId, playerId(self.player_id), view.phase, view.members.map((member) => ({ id: playerId(member.playerId), name: member.displayName })))
  const schedule = db.prepare<[string], { deadline: number; timeZone: 'America/Chicago' }>('SELECT deadline, time_zone AS timeZone FROM room_schedules WHERE room_id = ?').get(roomId)
  return { ...view, ...(game ? { game } : {}), ...(schedule ? { schedule } : {}) }
}

export function sessionRooms(db: Store, sessionId: string, now: number) {
  return db.prepare<[string], { room_id: string }>('SELECT room_id FROM memberships WHERE session_id = ? ORDER BY rowid DESC')
    .all(sessionId).map(({ room_id }) => roomView(db, room_id, sessionId, now)).filter((room) => room.phase !== 'expired')
}
