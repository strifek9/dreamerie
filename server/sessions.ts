import { createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto'
import type { Store } from './store.ts'

export const SESSION_SECONDS = 30 * 24 * 60 * 60
export const COOKIE_NAME = 'dreamerie_session'
export interface Session { id: string; expires_at: number }

export function credentialHash(credential: string) {
  return createHash('sha256').update(credential).digest('hex')
}

export function findSession(db: Store, credential: string | undefined, now: number): Session | undefined {
  if (!credential || !/^[a-f0-9]{64}$/.test(credential)) return undefined
  return db.prepare<[string, number], Session>('SELECT id, expires_at FROM sessions WHERE credential_hash = ? AND expires_at > ?')
    .get(credentialHash(credential), now)
}

export function createSession(db: Store, now: number) {
  const credential = randomBytes(32).toString('hex')
  const session: Session = { id: randomUUID(), expires_at: now + SESSION_SECONDS * 1000 }
  db.prepare('INSERT INTO sessions (id, credential_hash, expires_at) VALUES (?, ?, ?)')
    .run(session.id, credentialHash(credential), session.expires_at)
  return { session, credential }
}

export function csrfToken(credential: string) {
  return createHmac('sha256', credential).update('dreamerie:csrf').digest('hex')
}

export function validCsrf(credential: string, supplied: unknown) {
  return typeof supplied === 'string' && /^[a-f0-9]{64}$/.test(supplied)
    && timingSafeEqual(Buffer.from(csrfToken(credential), 'hex'), Buffer.from(supplied, 'hex'))
}
