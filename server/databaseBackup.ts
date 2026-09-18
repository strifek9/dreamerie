import Database from 'better-sqlite3'
import { closeSync, existsSync, mkdirSync, openSync, realpathSync } from 'node:fs'
import { basename, dirname, isAbsolute, relative, resolve, sep } from 'node:path'
import { decodeGame, readResults } from './gameState.ts'

/** Validate without migrations, timers or changes to the source database. */
export function verifyDatabase(path: string) {
  const db = new Database(path, { readonly: true, fileMustExist: true })
  try {
    if (db.pragma('user_version', { simple: true }) !== 3) throw new Error('Backup schema is not supported by this release.')
    if (db.pragma('integrity_check', { simple: true }) !== 'ok') throw new Error('Database integrity check failed.')
    const violations = db.pragma('foreign_key_check')
    if (!Array.isArray(violations) || violations.length) throw new Error('Database references are inconsistent.')
    for (const row of db.prepare<[], { state_json: string }>('SELECT state_json FROM room_games').all()) decodeGame(row.state_json)
    for (const row of db.prepare<[], { room_id: string; player_id: string }>('SELECT DISTINCT room_id, player_id FROM round_outcomes').all()) readResults(db, row.room_id, row.player_id)
    return { rooms: db.prepare<[], { count: number }>('SELECT count(*) AS count FROM rooms').get()!.count }
  } finally { db.close() }
}

function inside(root: string, path: string) {
  const child = relative(root, path)
  return child === '' || (child !== '..' && !child.startsWith(`..${sep}`) && !isAbsolute(child))
}

/** Online SQLite snapshot. Also restores safely into a NEW database, never over a live one. */
export async function copyDatabase(source: string, destination: string) {
  const output = resolve(destination)
  if (!output.endsWith('.sqlite')) throw new Error('Choose a new private destination ending in .sqlite.')
  if ([output, `${output}-wal`, `${output}-shm`, `${output}-journal`].some(existsSync)) throw new Error('Destination or its sidecar files already exist. Choose a new path.')
  verifyDatabase(source)
  mkdirSync(dirname(output), { recursive: true })
  const physicalOutput = resolve(realpathSync(dirname(output)), basename(output))
  for (const name of ['public', 'dist']) {
    const root = existsSync(name) ? realpathSync(name) : resolve(name)
    if (inside(root, physicalOutput)) throw new Error('Database snapshots must stay outside public/ and dist/.')
  }
  // Exclusive creation prevents overwriting a file created between the checks and backup.
  closeSync(openSync(output, 'wx', 0o600))
  const db = new Database(source, { readonly: true, fileMustExist: true })
  try {
    await db.backup(output)
    return verifyDatabase(output)
  } catch {
    // Keep failed output for inspection. Never call it a valid backup or overwrite it on retry.
    throw new Error('Snapshot failed. Do not use the destination; choose a new path when retrying.')
  } finally { db.close() }
}
