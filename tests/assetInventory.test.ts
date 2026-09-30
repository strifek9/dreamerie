import assert from 'node:assert/strict'
import test from 'node:test'
import { existsSync } from 'node:fs'
import { artworkFiles, requiredArtwork } from '../scripts/auditArtwork.ts'
import { currentDreams, playableDreams } from '../src/v3/dailyDream.ts'
import { dailyStorageKey } from '../src/game/dailySession.ts'
import { LANDSCAPE_SESSION_OPTIONS } from '../src/v2/landscapeCollection.ts'

test('cleanup preserves every current and historical saved-card asset without unused images', () => {
  assert.equal(currentDreams.length, 383)
  assert.equal(playableDreams.length, 558)
  for (const file of requiredArtwork) assert.ok(existsSync(new URL(`../public${file}`, import.meta.url)), file)
  const images = artworkFiles().filter(file => /\.(png|jpe?g|webp|svg)$/i.test(file))
  assert.deepEqual(images.filter(file => !requiredArtwork.has(file)), [])
})

test('permanent-mode cleanup preserves the exact published collection storage namespace', () => {
  assert.equal(dailyStorageKey(6), 'dreamerie:v2:daily-collection:v1:6')
  assert.equal(`${LANDSCAPE_SESSION_OPTIONS.namespace}:6`, dailyStorageKey(6))
  assert.notEqual(dailyStorageKey(6), 'dreamerie:daily:v1:6')
})
