import { randomBytes, randomUUID } from 'node:crypto'
import type { RoomRequest } from '../shared/rooms.ts'
import { RoomError } from './errors.ts'
import { credentialHash } from './sessions.ts'
import type { Store } from './store.ts'
import { roomView, type StoredRoom } from './views.ts'
import { addSharedPlayer } from '../src/game/sharedWeek.ts'
import { encodeGame, readGame } from './gameState.ts'
import type { PlayerId } from '../src/game/types.ts'

function normalizeName(value: string) {
  const name = value.normalize('NFC').trim().replace(/\s+/gu, ' ')
  if (!name || name.length > 24 || /[\p{Cc}\p{Cf}]/u.test(name)) {
    throw new RoomError(400, 'INVALID_NAME', 'Choose a display name of 1–24 characters, without control characters.')
  }
  return { name, key: name.normalize('NFKC').toLocaleLowerCase('en-US') }
}

// Only successful commands get receipts. A lost response can safely retry the same ID.
export function enterRoom(db: Store, sessionId: string, action: 'create' | 'join', request: RoomRequest, now: number) {
  const { name, key } = normalizeName(request.displayName)
  const code = request.inviteCode?.trim().toUpperCase()
  const fingerprint = credentialHash(JSON.stringify([action, name, code ?? null]))
  return db.transaction(() => {
    const receipt = db.prepare<[string, string], { fingerprint: string; room_id: string }>(
      'SELECT fingerprint, room_id FROM command_receipts WHERE session_id = ? AND request_id = ?',
    ).get(sessionId, request.requestId)
    if (receipt) {
      if (receipt.fingerprint !== fingerprint) throw new RoomError(409, 'REQUEST_REUSED', 'That request was already used for a different choice. Please try again.')
      return roomView(db, receipt.room_id, sessionId, now)
    }

    let roomId: string
    let seat = 0
    const playerId: PlayerId = `player-${randomUUID()}`
    if (action === 'join') {
      const room = db.prepare<[string], StoredRoom>('SELECT id, invite_code, host_id, phase, revision, expires_at FROM rooms WHERE invite_code = ?').get(code ?? '')
      if (!room) throw new RoomError(404, 'ROOM_NOT_FOUND', 'No room matches that invitation code. Check it and try again.')
      roomId = room.id
      const existing = db.prepare('SELECT 1 FROM memberships WHERE room_id = ? AND session_id = ?').get(roomId, sessionId)
      if (!existing) {
        if (room.phase === 'expired' || (room.expires_at !== null && now >= room.expires_at)) throw new RoomError(410, 'ROOM_EXPIRED', 'That room has expired. Ask for a new invitation.')
        if (room.phase === 'closed') throw new RoomError(410, 'ROOM_CLOSED', 'That room is closed. Ask for a new invitation.')
        const game = readGame(db, roomId)
        if (room.phase !== 'lobby' && (!game || room.phase === 'complete' || game.roundIndex >= 5)) {
          throw new RoomError(409, 'ROOM_STARTED', 'That Dream Week has no unopened days to join. Ask for a new invitation.')
        }
        seat = db.prepare<[string], { count: number }>('SELECT count(*) AS count FROM memberships WHERE room_id = ?').get(roomId)!.count
        if (seat >= 6) throw new RoomError(409, 'ROOM_FULL', 'All six places in that room are taken.')
        if (db.prepare('SELECT 1 FROM memberships WHERE room_id = ? AND name_key = ?').get(roomId, key)) {
          throw new RoomError(409, 'NAME_TAKEN', 'Someone in this room already uses that name. Add an initial or choose another.')
        }
        if (game) db.prepare('UPDATE room_games SET state_json = ? WHERE room_id = ?').run(encodeGame(addSharedPlayer(game, playerId)), roomId)
        db.prepare('UPDATE rooms SET revision = revision + 1 WHERE id = ?').run(roomId)
      } else {
        // This browser already owns a seat. Names never transfer or rename it.
        db.prepare('INSERT INTO command_receipts VALUES (?, ?, ?, ?)').run(sessionId, request.requestId, fingerprint, roomId)
        return roomView(db, roomId, sessionId, now)
      }
    } else {
      roomId = `room-${randomUUID()}`
      let inviteCode: string
      do { inviteCode = randomBytes(5).toString('hex').toUpperCase() }
      while (db.prepare('SELECT 1 FROM rooms WHERE invite_code = ?').get(inviteCode))
      db.prepare('INSERT INTO rooms (id, invite_code, host_id, created_at) VALUES (?, ?, ?, ?)').run(roomId, inviteCode, playerId, now)
    }
    db.prepare('INSERT INTO memberships (player_id, room_id, session_id, display_name, name_key, accent_slot) VALUES (?, ?, ?, ?, ?, ?)')
      .run(playerId, roomId, sessionId, name, key, seat)
    db.prepare('INSERT INTO command_receipts VALUES (?, ?, ?, ?)').run(sessionId, request.requestId, fingerprint, roomId)
    return roomView(db, roomId, sessionId, now)
  }).immediate()
}
