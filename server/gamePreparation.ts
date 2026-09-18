import { randomInt, randomUUID } from 'node:crypto'
import { cards } from '../src/data/cards.ts'
import { createDreamWeek } from '../src/game/week.ts'
import type { DreamConcept, DreamMode, Player } from '../src/game/types.ts'
import { concepts } from '../src/data/concepts.ts'
import type { StoredGame } from './gameState.ts'

export const roomConcepts: readonly DreamConcept[] = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth']
  .map((ordinal, index) => ({ id: `concept-dream-${index + 1}`, label: `${ordinal} Dream` }))

// Randomness stays on the service. No simulated player choices or browser seed.
export const roomRandom = () => randomInt(0, 2 ** 32) / 2 ** 32

export function newRoomGame(players: readonly Player[], mode: DreamMode = 'classic'): StoredGame {
  return { week: createDreamWeek(`week-${randomUUID()}`, mode === 'personal' ? roomConcepts : concepts, cards, players, roomRandom, mode), roundIndex: -1, rounds: [], dayPlayerIds: [] }
}
