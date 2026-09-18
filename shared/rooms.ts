import type { GameView } from './game.ts'

// Public API only. Never add stored game state or session credentials here.
export type RoomPhase = 'lobby' | 'preparation' | 'guessing' | 'revealed' | 'complete' | 'closed' | 'expired'

export interface RoomMember {
  playerId: string
  displayName: string
  accentSlot: number
}

export interface RoomView {
  id: string
  inviteCode: string
  phase: RoomPhase
  revision: number
  selfId: string
  hostId: string
  members: RoomMember[]
  game?: GameView
}

export interface SessionView {
  csrfToken: string
  expiresAt: number
  rooms: RoomView[]
}

export interface RoomRequest {
  requestId: string
  displayName: string
  inviteCode?: string
}
