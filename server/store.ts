import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { lobbySchema } from './migrations/001-lobbies.ts'
import { gameplaySchema } from './migrations/002-gameplay.ts'

export type Store = Database.Database

export function openStore(path: string): Store {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true })
  const db = new Database(path)
  try {
    db.pragma('foreign_keys = ON')
    db.pragma('journal_mode = WAL')
    const version = db.pragma('user_version', { simple: true })
    if (version === 0 || version === 1) db.transaction(() => {
      if (version === 0) db.exec(lobbySchema)
      db.exec(gameplaySchema)
    })()
    else if (version !== 2) throw new Error('Unsupported database version. Use a compatible Dreamerie service.')
    return db
  } catch (error) {
    db.close()
    throw error
  }
}
