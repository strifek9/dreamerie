import assert from 'node:assert/strict'
import test from 'node:test'
import { exportProgress, readProgress, reviewProgress, importMissingProgress } from '../src/game/progressTransfer.ts'
import { DAILY_SESSION_NAMESPACE, parseSession, sessionSnapshot } from '../src/game/dailySession.ts'
const key = (day: number) => `${DAILY_SESSION_NAMESPACE}:${day}`
const known = new Set(['fixture']), now = 200_000
const session = { version: 1, cardId: 'fixture', startedAt: 100_000, guesses: [{ point: { x: .5, y: .5 }, elapsedSeconds: 10 }], pending: { point: { x: .2, y: .4 }, side: 'changed' } }
class Store {
  values = new Map<string, string>()
  failOn = ''
  get length() { return this.values.size }
  key(index: number) { return [...this.values.keys()][index] ?? null }
  getItem(key: string) { return this.values.get(key) ?? null }
  setItem(key: string, value: string) { if (key === this.failOn) throw Error('quota'); this.values.set(key, value) }
  removeItem(key: string) { this.values.delete(key) }
}
function file() { const source = new Store(); source.setItem(key(1), JSON.stringify(session)); source.setItem('private-token', 'never export'); return exportProgress(source, known, 3, now) }
test('export/import includes only exact game records and preserves active start, guesses, pending and expiry', () => {
  const exported = file(), target = new Store()
  assert.equal(exported.entries.length, 1); assert.ok(!JSON.stringify(exported).includes('never export'))
  const read = readProgress(JSON.stringify(exported), known, 3, now)
  assert.deepEqual(importMissingProgress(read, target), { imported: 1, kept: 0 })
  assert.deepEqual(parseSession(target.getItem(key(1)), 'fixture'), session)
  assert.equal(sessionSnapshot(parseSession(target.getItem(key(1)), 'fixture'), [{ id: 'other', x: .8, y: .8, radius: .04, difficulty: 'Easy', label: 'Other', box: { left: .8, top: .8, width: .1, height: .1 } }], 221_000).result?.elapsedSeconds, 120)
  assert.deepEqual(importMissingProgress(read, target), { imported: 0, kept: 1 })
})
test('preview and import keep conflicting/malformed existing days and recheck races after preview', () => {
  const target = new Store(), exported = file()
  assert.equal(reviewProgress(exported, target).missing.length, 1)
  target.setItem(key(1), 'existing damaged record')
  assert.deepEqual(reviewProgress(exported, target).conflicts, [1])
  assert.deepEqual(importMissingProgress(exported, target), { imported: 0, kept: 1 })
  assert.equal(target.getItem(key(1)), 'existing damaged record')
})
test('reject malformed, foreign, duplicate, future, unsupported, oversized and invalid guess records before writes', () => {
  const valid = file()
  for (const changed of [
    { ...valid, format: 'other' }, { ...valid, entries: [valid.entries[0], valid.entries[0]] },
    { ...valid, entries: [{ day: 4, session }] }, { ...valid, entries: [{ day: 1, session: { ...session, startedAt: now + 1 } }] },
    { ...valid, entries: [{ day: 1, session: { ...session, cardId: '__proto__' } }] },
    { ...valid, entries: [{ day: 1, session: { ...session, guesses: [...Array(6)].map(() => session.guesses[0]) } }] },
  ]) assert.throws(() => readProgress(JSON.stringify(changed), known, 3, now))
  assert.throws(() => readProgress('{bad', known, 3, now)); assert.throws(() => readProgress('x'.repeat(2_000_001), known, 3, now))
})
test('quota failure rolls back new records while existing unrelated/history records remain intact', () => {
  const target = new Store(); target.setItem('unrelated', 'keep'); target.setItem(key(3), 'keep existing')
  const exported = file(); exported.entries.push({ ...exported.entries[0], day: 2 }); target.failOn = key(2)
  assert.throws(() => importMissingProgress(exported, target), /could not be saved/)
  assert.equal(target.getItem(key(1)), null); assert.equal(target.getItem(key(3)), 'keep existing'); assert.equal(target.getItem('unrelated'), 'keep')
})

test('export/import drops adversarial nested fields while preserving exact official point data and source records', () => {
  const source = new Store()
  const injected = JSON.parse(JSON.stringify(session))
  injected.guesses[0].point.extra = { token: 'SYNTHETIC_PRIVATE_VALUE', nested: { x: 99 } }
  injected.pending.point.extra = ['SYNTHETIC_PRIVATE_VALUE']
  injected.pending.point.__proto__ = { hidden: 'SYNTHETIC_PRIVATE_VALUE' }
  injected.guesses[0].extra = 'SYNTHETIC_PRIVATE_VALUE'
  injected.pending.extra = 'SYNTHETIC_PRIVATE_VALUE'
  injected.extra = 'SYNTHETIC_PRIVATE_VALUE'
  const raw = JSON.stringify(injected)
  source.setItem(key(1), raw)
  const exported = exportProgress(source, known, 3, now)
  assert.ok(!JSON.stringify(exported).includes('SYNTHETIC_PRIVATE_VALUE'))
  assert.deepEqual(exported.entries[0].session, session)
  assert.equal(source.getItem(key(1)), raw)
  assert.deepEqual(reviewProgress(exported, source).identical, [1])
  const untrusted = { ...exported, entries: [{ day: 1, session: JSON.parse(raw) }] }
  const read = readProgress(JSON.stringify(untrusted), known, 3, now)
  const target = new Store()
  importMissingProgress(read, target)
  assert.equal(target.getItem(key(1)), JSON.stringify(session))
  assert.equal(source.getItem(key(1)), raw)
})
