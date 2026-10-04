import assert from 'node:assert/strict'
import test from 'node:test'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { artworkFiles, requiredArtwork } from '../scripts/auditArtwork.ts'
import { currentDreams, playableDreams } from '../src/v3/dailyDream.ts'
import { dailyStorageKey } from '../src/game/dailySession.ts'
import { LANDSCAPE_SESSION_OPTIONS } from '../src/v2/landscapeCollection.ts'

test('cleanup preserves every current and historical saved-card asset without unused images', () => {
  assert.equal(currentDreams.length, 383)
  assert.equal(playableDreams.length, 941)
  for (const file of requiredArtwork) assert.ok(existsSync(new URL(`../public${file}`, import.meta.url)), file)
  const images = artworkFiles().filter(file => /\.(png|jpe?g|webp|svg)$/i.test(file))
  assert.deepEqual(images.filter(file => !requiredArtwork.has(file)), [])
})

test('permanent-mode cleanup preserves the exact published collection storage namespace', () => {
  assert.equal(dailyStorageKey(6), 'dreamerie:v2:daily-collection:v1:6')
  assert.equal(`${LANDSCAPE_SESSION_OPTIONS.namespace}:6`, dailyStorageKey(6))
  assert.notEqual(dailyStorageKey(6), 'dreamerie:daily:v1:6')
})


test('previously published V4 review sources remain available and byte-identical', () => {
  let archivedSources = 0
  for (const file of readdirSync(new URL('../docs/artwork/', import.meta.url))) {
    if (!/^V4_(?:PREVIEW|CARD_\d+)_PROVENANCE\.json$/.test(file)) continue
    const provenance = JSON.parse(readFileSync(new URL(`../docs/artwork/${file}`, import.meta.url), 'utf8'))
    for (const source of provenance.retiredGeneratedSources ?? []) {
      archivedSources++
      assert.ok(requiredArtwork.has(source.path), source.path)
      const bytes = readFileSync(new URL(`../public${source.path}`, import.meta.url))
      assert.equal(createHash('sha256').update(bytes).digest('hex').toUpperCase(), source.sha256.toUpperCase())
    }
  }
  assert.ok(archivedSources > 0)
})
