import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { currentDreams, playableDreams } from '../src/v3/dailyDream.ts'
import { v4PreviewDreams } from '../src/v4/previewDreams.ts'

test('unreleased V4 proof is isolated from the published deck and has five bounded clues', () => {
  assert.ok(v4PreviewDreams.length > 0)
  assert.equal(currentDreams.length, 383)
  assert.equal(playableDreams.length, 558)
  for (const dream of v4PreviewDreams) {
    assert.ok(!currentDreams.some(card => card.id === dream.id))
    assert.ok(!playableDreams.some(card => card.id === dream.id))
    assert.equal(dream.edits.length, 5)
    assert.equal(new Set(dream.edits.map(edit => edit.id)).size, 5)
    for (const edit of dream.edits) {
      const { left, top, width, height } = edit.box
      assert.ok(left >= 0 && top >= 0 && width > 0 && height > 0)
      assert.ok(left + width <= 1 && top + height <= 1)
      assert.ok((edit.source ?? dream.altered).startsWith('/artwork/v4/collection/'))
    }
    for (let i = 0; i < dream.edits.length; i++) for (let j = i + 1; j < dream.edits.length; j++) {
      const a = dream.edits[i].box, b = dream.edits[j].box
      assert.ok(a.left + a.width <= b.left || b.left + b.width <= a.left ||
        a.top + a.height <= b.top || b.top + b.height <= a.top, `${dream.edits[i].id} overlaps ${dream.edits[j].id}`)
    }
  }
})

test('V4 proof retains its native-resolution, versioned generated source files', () => {
  const paths = readdirSync(new URL('../docs/artwork/', import.meta.url))
    .filter(path => /^V4_(?:PREVIEW|CARD_\d+)_PROVENANCE\.json$/.test(path))
  assert.equal(paths.length, v4PreviewDreams.length)
  for (const path of paths) {
    const provenance = JSON.parse(readFileSync(new URL(`../docs/artwork/${path}`, import.meta.url), 'utf8'))
    const dream = v4PreviewDreams.find(card => card.id === provenance.cardId)
    assert.ok(dream, `${path} has no matching V4 preview card`)
    const assets = [provenance.original, provenance.alteredSource, ...provenance.refinedSources]
    assert.deepEqual(assets.map(asset => asset.path).sort(),
      [...new Set([dream.original, dream.altered, ...dream.edits.map(edit => edit.source ?? dream.altered)])].sort())
    for (const asset of assets) {
      const bytes = readFileSync(new URL(`../public${asset.path}`, import.meta.url))
      assert.equal(createHash('sha256').update(bytes).digest('hex').toUpperCase(), asset.sha256)
      assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
      // Built-in image edits may retain the source framing while varying the
      // raster width by one or two pixels; V3 masters use the same allowance.
      assert.ok(bytes.readUInt32BE(16) >= 1670 && bytes.readUInt32BE(16) <= 1672)
      assert.equal(bytes.readUInt32BE(20), 941)
    }
  }
})
