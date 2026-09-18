import type { GameCommand } from '../shared/game.ts'
import type { RoomPhase } from '../shared/rooms.ts'
import { playerId } from '../shared/parse.ts'
import { assignDream, unassignDream } from '../src/game/assignments.ts'
import { nextSharedDream, saveSharedDream, unfinishedSharedDay } from '../src/game/sharedWeek.ts'
import { RoomError } from './errors.ts'
import { newRoomGame } from './gamePreparation.ts'
import { readGame } from './gameState.ts'
import { credentialHash } from './sessions.ts'
import type { Store } from './store.ts'
import { roomView } from './views.ts'
import { saveGame, transitionDay } from './gameTransitions.ts'
import { setDeadline } from './scheduler.ts'
import { fullDayDeadline } from './roomClock.ts'
import { retainRoomUntil } from './roomLifecycle.ts'

function confirmMissing(required: string[], supplied?: string[]) {
  if (required.length && (!supplied || supplied.length !== required.length || new Set(supplied).size !== required.length || required.some((id) => !supplied.includes(id)))) {
    throw new RoomError(409, 'CONFIRM_MISSING', 'Some players have not finished. Review the names and confirm before continuing.')
  }
}

export function commandRoom(db: Store, roomId: string, sessionId: string, command: GameCommand, now: number) {
  // Authorize and resolve due work separately so rejecting a late command cannot roll it back.
  roomView(db, roomId, sessionId, now)
  const fingerprint = credentialHash(JSON.stringify([roomId, command]))
  return db.transaction(() => {
    const view = roomView(db, roomId, sessionId, now)
    const receipt = db.prepare<[string, string], { fingerprint: string }>('SELECT fingerprint FROM command_receipts WHERE session_id = ? AND request_id = ?')
      .get(sessionId, command.requestId)
    if (receipt) {
      if (receipt.fingerprint !== fingerprint) throw new RoomError(409, 'REQUEST_REUSED', 'That request was already used for another action.')
      return view
    }
    if (view.phase === 'closed' || view.phase === 'expired' || view.phase === 'complete') throw new RoomError(409, 'ROOM_FINISHED', 'This Dream Week no longer accepts changes.')
    if (view.revision !== command.expectedRevision) throw new RoomError(409, 'STALE_ROOM', 'The room changed. Your view has refreshed; review your choice and try again.')
    if (command.weekId !== (view.game?.weekId ?? null) || command.roundId !== (view.game?.roundId ?? null)) {
      throw new RoomError(409, 'STALE_DAY', 'That choice belongs to an earlier day. Review the current Dream.')
    }
    const { action } = command
    if (['start', 'open-day', 'reveal', 'advance', 'close'].includes(action.type) && view.selfId !== view.hostId) {
      throw new RoomError(403, 'HOST_ONLY', 'Only the room’s host can progress the Dream Week.')
    }
    if (action.type === 'close') {
      if (action.confirmed !== true) throw new RoomError(400, 'CONFIRM_CLOSE', 'Confirm before closing this room.')
      // Closing never calls the reveal/scoring path. Only existing outcomes remain visible.
      db.prepare("UPDATE rooms SET phase = 'closed', revision = revision + 1 WHERE id = ?").run(roomId)
      setDeadline(db, roomId, null)
      retainRoomUntil(db, roomId, now)
      db.prepare('INSERT INTO command_receipts VALUES (?, ?, ?, ?)').run(sessionId, command.requestId, fingerprint, roomId)
      return roomView(db, roomId, sessionId, now)
    }
    let game = readGame(db, roomId)
    let phase: RoomPhase = view.phase
    try {
      if (action.type === 'start') {
        if (phase !== 'lobby' || game) throw new Error('This Dream Week has already started.')
        if (action.mode !== undefined && action.mode !== view.mode) throw new Error('This room’s mode was chosen when it was created. Create another room to change modes.')
        game = newRoomGame(view.members.map((member) => ({ id: playerId(member.playerId), name: member.displayName })), view.mode)
        phase = 'preparation'
        db.prepare('UPDATE rooms SET expires_at = NULL WHERE id = ?').run(roomId)
      } else {
        if (!game) throw new Error('The host must start this Dream Week first.')
        const self = playerId(view.selfId)
        switch (action.type) {
          case 'save':
            game = saveSharedDream(game, self, action.conceptId, action.cardId, action.clue)
            break
          case 'open-day':
            if (phase !== 'preparation') throw new Error('The first guessing day has already opened.')
            confirmMissing(view.game?.preparingPlayerIds ?? [], action.confirmMissing)
            ;({ game, phase } = transitionDay(db, roomId, game, phase, 'open-day'))
            break
          case 'lock': case 'unlock': {
            if (phase !== 'guessing') throw new Error('These guesses can no longer be changed.')
            const round = game.rounds.find((round) => round.guesserId === self)
            if (!round) throw new Error('You do not have a Dream in this day. Prepare your later Dreams instead.')
            if (action.type === 'unlock' && ![...round.assignments.values()].includes(action.cardId)) throw new Error('That card is not one of your locked guesses.')
            const updated = action.type === 'lock' ? assignDream(round, action.playerId, action.cardId) : unassignDream(round, action.cardId)
            game = { ...game, rounds: game.rounds.map((entry) => entry.guesserId === self ? updated : entry) }
            break
          }
          case 'reveal':
            if (phase !== 'guessing') throw new Error('This day has already been revealed.')
            confirmMissing(unfinishedSharedDay(game), action.confirmMissing)
            ;({ game, phase } = transitionDay(db, roomId, game, phase, 'reveal'))
            break
          case 'advance':
            if (phase !== 'revealed') throw new Error('Reveal this day’s results before opening the next day.')
            if (game.roundIndex !== 5) {
              confirmMissing([...game.week.dreams.keys()].filter((id) => nextSharedDream(game!, id)), action.confirmMissing)
            }
            ;({ game, phase } = transitionDay(db, roomId, game, phase, 'advance'))
            break
        }
      }
    } catch (error) {
      if (error instanceof RoomError) throw error
      // Domain failures roll the whole transaction back, including any result rows.
      if (error instanceof Error && !('code' in error)) throw new RoomError(400, 'INVALID_ACTION', error.message)
      throw error
    }
    saveGame(db, roomId, game, phase)
    if (phase === 'complete') { setDeadline(db, roomId, null); retainRoomUntil(db, roomId, now) }
    else if (action.type === 'start' || action.type === 'open-day' || action.type === 'advance') setDeadline(db, roomId, fullDayDeadline(now))
    db.prepare('INSERT INTO command_receipts VALUES (?, ?, ?, ?)').run(sessionId, command.requestId, fingerprint, roomId)
    return roomView(db, roomId, sessionId, now)
  }).immediate()
}
