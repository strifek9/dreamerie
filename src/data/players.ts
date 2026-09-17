import type { Player, PlayerId } from '../game/types.ts'

export const CURRENT_PLAYER_ID: PlayerId = 'player-charlie'

export const players: readonly Player[] = [
  { id: CURRENT_PLAYER_ID, name: 'Charlie' },
  { id: 'player-nancy', name: 'Nancy' },
  { id: 'player-song', name: 'Song' },
]
