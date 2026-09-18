import type { RoomRequest, RoomView, SessionView } from '../../shared/rooms'
import type { GameCommand } from '../../shared/game'
import { parseGameView, parseDreamMode } from '../../shared/gameParsing'
import type { DreamMode } from '../game/types'

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) { super(message); this.status = status }
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isRoom(value: unknown): value is RoomView {
  if (!record(value) || (value.mode !== 'classic' && value.mode !== 'personal')) return false
  if (record(value) && value.expiresAt !== undefined && (typeof value.expiresAt !== 'number' || !Number.isSafeInteger(value.expiresAt))) return false
  if (record(value) && value.schedule !== undefined && (!record(value.schedule)
    || typeof value.schedule.deadline !== 'number' || !Number.isSafeInteger(value.schedule.deadline) || value.schedule.deadline <= 0
    || value.schedule.timeZone !== 'America/Chicago')) return false
  if (record(value) && value.game !== undefined) {
    try { parseGameView(value.game) } catch { return false }
  }
  return record(value) && typeof value.id === 'string' && typeof value.inviteCode === 'string'
    && typeof value.selfId === 'string' && typeof value.hostId === 'string'
    && typeof value.revision === 'number' && Number.isInteger(value.revision)
    && typeof value.phase === 'string' && ['lobby', 'preparation', 'guessing', 'revealed', 'complete', 'closed', 'expired'].includes(value.phase)
    && Array.isArray(value.members) && value.members.length >= 1 && value.members.length <= 6
    && value.members.every((member: unknown) => record(member) && typeof member.playerId === 'string'
      && typeof member.displayName === 'string' && typeof member.accentSlot === 'number'
      && Number.isInteger(member.accentSlot) && member.accentSlot >= 0 && member.accentSlot < 6)
}

function isSession(value: unknown): value is SessionView {
  return record(value) && typeof value.csrfToken === 'string' && typeof value.expiresAt === 'number'
    && Array.isArray(value.rooms) && value.rooms.every(isRoom)
}

async function request<T>(path: string, accepts: (value: unknown) => value is T, body?: unknown, csrf?: string): Promise<T> {
  const response = await fetch(path, {
    method: body === undefined ? 'GET' : 'POST', credentials: 'same-origin', cache: 'no-store',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json', ...(csrf ? { 'X-Dreamerie-CSRF': csrf } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(10_000),
  })
  const value: unknown = await response.json().catch(() => undefined)
  if (!response.ok) throw new ApiError(response.status, record(value) && typeof value.message === 'string'
    ? value.message : 'The room service could not be reached. Please try again.')
  if (!accepts(value)) throw new Error('The room response could not be read. Please try again.')
  return value
}

// Share bootstrap across Strict Mode remounts; never create two competing credentials.
let bootstrap: Promise<SessionView> | undefined
export function openSession() {
  bootstrap ??= request('/api/session', isSession).catch((error: unknown) => {
    if (error instanceof ApiError && error.status === 401) return request('/api/session', isSession, {})
    throw error
  }).finally(() => { bootstrap = undefined })
  return bootstrap
}

export const readRoom = (id: string) => request(`/api/rooms/${encodeURIComponent(id)}`, isRoom)
export const readInvitation = (code: string) => request(`/api/invitations/${encodeURIComponent(code)}`, (value: unknown): value is { mode: DreamMode } =>
  record(value) && (value.mode === 'classic' || value.mode === 'personal'))
export const saveRoom = (action: 'create' | 'join', body: RoomRequest, csrf: string) =>
  request(action === 'create' ? '/api/rooms' : '/api/rooms/join', isRoom, body, csrf)
export const sendGameCommand = (roomId: string, body: GameCommand, csrf: string) =>
  request(`/api/rooms/${encodeURIComponent(roomId)}/commands`, isRoom, body, csrf)

export interface PendingEntry { action: 'create' | 'join'; body: RoomRequest }
const pendingKey = 'dreamerie.pending-room-entry'
export function readPending(): PendingEntry | undefined {
  try {
    const value: unknown = JSON.parse(sessionStorage.getItem(pendingKey) ?? 'null')
    if (record(value) && (value.action === 'create' || value.action === 'join') && record(value.body)
      && typeof value.body.requestId === 'string' && typeof value.body.displayName === 'string'
      && (value.body.inviteCode === undefined || typeof value.body.inviteCode === 'string')) {
      return { action: value.action, body: { requestId: value.body.requestId, displayName: value.body.displayName, inviteCode: value.body.inviteCode,
        ...(value.body.mode === undefined ? {} : { mode: parseDreamMode(value.body.mode) }) } }
    }
  } catch { /* Restricted storage does not prevent this tab from joining. */ }
  return undefined
}
export function storePending(value: PendingEntry | undefined) {
  try {
    if (value) sessionStorage.setItem(pendingKey, JSON.stringify(value))
    else sessionStorage.removeItem(pendingKey)
  } catch { /* The in-memory request still keeps immediate retries safe. */ }
}
