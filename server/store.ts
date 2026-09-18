import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { lobbySchema } from './migrations/001-lobbies.ts'
import { gameplaySchema } from './migrations/002-gameplay.ts'
import { scheduleSchema } from './migrations/003-schedules.ts'
import { roomModeSchema } from './migrations/004-room-modes.ts'

export type Store = Database.Database

export function openStore(path: string): Store {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true })
  const db = new Database(path)
  try {
    db.pragma('foreign_keys = ON')
    db.pragma('journal_mode = WAL')
    const version = db.pragma('user_version', { simple: true })
    if (version === 0 || version === 1 || version === 2) db.transaction(() => {
      if (version === 0) db.exec(lobbySchema)
      if (version === 0 || version === 1) db.exec(gameplaySchema)
      db.exec(scheduleSchema)
    })()
    else if (version !== 3 && version !== 4) throw new Error('Unsupported database version. Use a compatible Dreamerie service.')
    if (version !== 4) db.transaction(() => { db.exec(roomModeSchema) })()
    return db
  } catch (error) {
    db.close()
    throw error
  }
}
