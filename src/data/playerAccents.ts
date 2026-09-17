import type { Player, PlayerId } from '../game/types.ts'
import { players } from './players.ts'

// Presentation slots follow the stable roster order, never display names or scores.
export const playerAccents = ['indigo', 'rose', 'blue', 'amber', 'forest', 'plum'] as const
export type PlayerAccent = typeof playerAccents[number]

export function getPlayerAccent(playerId: PlayerId | undefined, roster: readonly Player[] = players): PlayerAccent | undefined {
  const slot = roster.findIndex((player) => player.id === playerId)
  return slot >= 0 && slot < playerAccents.length ? playerAccents[slot] : undefined
}
