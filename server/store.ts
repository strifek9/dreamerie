import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { lobbySchema } from './migrations/001-lobbies.ts'

export type Store = Database.Database

export function openStore(path: string): Store {
  if (path !== ':memory:') mkdirSync(dirname(path), { recursive: true })
  const db = new Database(path)
  try {
    db.pragma('foreign_keys = ON')
    db.pragma('journal_mode = WAL')
    const version = db.pragma('user_version', { simple: true })
    if (version === 0) db.transaction(() => db.exec(lobbySchema))()
    else if (version !== 1) throw new Error('Unsupported database version. Use a compatible Dreamerie service.')
    return db
  } catch (error) {
    db.close()
    throw error
  }
}
