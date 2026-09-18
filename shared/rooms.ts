import type { GameView } from './game.ts'
import type { DreamMode } from '../src/game/types.ts'

// Public API only. Never add stored game state or session credentials here.
export type RoomPhase = 'lobby' | 'preparation' | 'guessing' | 'revealed' | 'complete' | 'closed' | 'expired'

export interface RoomMember {
  playerId: string
  displayName: string
  accentSlot: number
}

export interface RoomView {
  mode: DreamMode
  id: string
  inviteCode: string
  phase: RoomPhase
  revision: number
  selfId: string
  hostId: string
  members: RoomMember[]
  game?: GameView
  schedule?: { deadline: number; timeZone: 'America/Chicago' }
  expiresAt?: number
}

export interface SessionView {
  csrfToken: string
  expiresAt: number
  rooms: RoomView[]
}

export interface RoomRequest {
  mode?: DreamMode
  requestId: string
  displayName: string
  inviteCode?: string
}
