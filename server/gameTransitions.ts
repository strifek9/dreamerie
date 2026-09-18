import type { RoomPhase } from '../shared/rooms.ts'
import { openSharedDay, scoreSharedDay, type SharedWeek } from '../src/game/sharedWeek.ts'
import { encodeGame } from './gameState.ts'
import { roomRandom } from './gamePreparation.ts'
import type { Store } from './store.ts'

/** Host and timer use the same rules inside the caller's transaction. */
export function transitionDay(db: Store, roomId: string, game: SharedWeek, phase: RoomPhase, action: 'open-day' | 'reveal' | 'advance') {
  if (!db.inTransaction) throw new Error('Day transitions require a transaction.')
  if (action === 'open-day') {
    if (phase !== 'preparation') throw new Error('The first guessing day has already opened.')
    return { game: openSharedDay(game, roomRandom), phase: 'guessing' as const }
  }
  if (action === 'reveal') {
    if (phase !== 'guessing') throw new Error('This day has already been revealed.')
    for (const outcome of scoreSharedDay(game)) {
      db.prepare('INSERT INTO round_outcomes (room_id, round_id, player_id, day_index, result_json) VALUES (?, ?, ?, ?, ?)')
        .run(roomId, outcome.result.roundId, outcome.result.guesserId, game.roundIndex, JSON.stringify(outcome))
    }
    return { game, phase: 'revealed' as const }
  }
  if (phase !== 'revealed') throw new Error('Reveal this day’s results before opening the next day.')
  return game.roundIndex === 5 ? { game, phase: 'complete' as const }
    : { game: openSharedDay(game, roomRandom), phase: 'guessing' as const }
}

export function saveGame(db: Store, roomId: string, game: SharedWeek, phase: RoomPhase) {
  if (!db.inTransaction) throw new Error('Game persistence requires a transaction.')
  db.prepare('INSERT INTO room_games (room_id, state_json) VALUES (?, ?) ON CONFLICT(room_id) DO UPDATE SET state_json = excluded.state_json').run(roomId, encodeGame(game))
  db.prepare('UPDATE rooms SET phase = ?, revision = revision + 1 WHERE id = ?').run(phase, roomId)
}
