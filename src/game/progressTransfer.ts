import { parseSession, DAILY_SESSION_NAMESPACE, type DailySession } from './dailySession.ts'

export type ProgressEntry = { day: number; session: DailySession }
export type ProgressFile = { format: 'dreamerie-progress'; version: 1; exportedAt: string; entries: ProgressEntry[] }
type Reader = Pick<Storage, 'length' | 'key' | 'getItem'>
type Writer = Reader & Pick<Storage, 'setItem' | 'removeItem'>
const prefix = `${DAILY_SESSION_NAMESPACE}:`
const record = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value)
function entry(value: unknown, known: ReadonlySet<string>, today: number, now: number): ProgressEntry {
  if (!record(value) || !Number.isSafeInteger(value.day) || Number(value.day) < 1 || Number(value.day) > today || !record(value.session)) throw new Error('Invalid or future puzzle day.')
  if (typeof value.session.cardId !== 'string' || !known.has(value.session.cardId)) throw new Error('This file contains an unsupported dream.')
  const session = parseSession(JSON.stringify(value.session), value.session.cardId)
  if (!session || session.startedAt > now) throw new Error('Invalid or future round start.')
  return { day: Number(value.day), session }
}
export function readProgress(raw: string, known: ReadonlySet<string>, today: number, now: number): ProgressFile {
  if (raw.length > 2_000_000) throw new Error('Progress file is too large.')
  const value: unknown = JSON.parse(raw)
  if (!record(value) || value.format !== 'dreamerie-progress' || value.version !== 1 || !Array.isArray(value.entries) || value.entries.length > 5000) throw new Error('Choose a Dreamerie progress export.')
  const entries = value.entries.map(value => entry(value, known, today, now))
  if (new Set(entries.map(e => e.day)).size !== entries.length) throw new Error('Duplicate puzzle days in file.')
  return { format: 'dreamerie-progress', version: 1, exportedAt: typeof value.exportedAt === 'string' ? value.exportedAt : '', entries }
}
export function exportProgress(storage: Reader, known: ReadonlySet<string>, today: number, now: number): ProgressFile {
  const entries: ProgressEntry[] = []
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i)
    if (!key?.startsWith(prefix)) continue
    const suffix = key.slice(prefix.length)
    if (!/^[1-9]\d*$/.test(suffix)) throw new Error('A saved puzzle day could not be read. No data was changed.')
    const raw = storage.getItem(key)
    if (raw !== null) entries.push(entry({ day: Number(suffix), session: JSON.parse(raw) }, known, today, now))
  }
  return { format: 'dreamerie-progress', version: 1, exportedAt: new Date(now).toISOString(), entries: entries.sort((a, b) => a.day - b.day) }
}
export function reviewProgress(file: ProgressFile, storage: Reader) {
  const missing: ProgressEntry[] = [], conflicts: number[] = [], identical: number[] = []
  for (const entry of file.entries) {
    const raw = storage.getItem(prefix + entry.day)
    if (raw === null) missing.push(entry)
    else {
      try {
        if (JSON.stringify(parseSession(raw, entry.session.cardId)) === JSON.stringify(entry.session)) identical.push(entry.day)
        else conflicts.push(entry.day)
      } catch { conflicts.push(entry.day) }
    }
  }
  return { missing, conflicts, identical }
}
// The caller holds each affected daily Web Lock. Recheck before writing; never
// replace a record created after preview. Roll back only our new records if a write fails.
export function importMissingProgress(file: ProgressFile, storage: Writer) {
  const review = reviewProgress(file, storage), written: { key: string; raw: string }[] = []
  try {
    for (const entry of review.missing) {
      const key = prefix + entry.day, raw = JSON.stringify(entry.session)
      storage.setItem(key, raw)
      written.push({ key, raw })
    }
  } catch {
    for (const { key, raw } of written) if (storage.getItem(key) === raw) storage.removeItem(key)
    throw new Error('Progress could not be saved. Your existing saved days were kept. Retry with site storage allowed.')
  }
  return { imported: written.length, kept: review.conflicts.length + review.identical.length }
}
