import { readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const folder = resolve(root, 'public/artwork/v2/collection')
const manifest = JSON.parse(readFileSync(resolve(root, 'docs/artwork/V2_COLLECTION_MANIFEST.json'), 'utf8'))
const audit = JSON.parse(readFileSync(resolve(root, 'docs/artwork/V2_PLAYABLE_AUDIT.json'), 'utf8'))
assert.equal(manifest.requestedPairs, 120)
assert.equal(manifest.cards.length, 120, 'Expected 120 source pairs')
const hashes = new Set()
let bytes = 0
for (const [index, card] of manifest.cards.entries()) {
  assert.equal(card.id, `dream-${String(index + 1).padStart(3, '0')}`)
  assert.equal(card.enabled, true, `${card.id}: expected reviewed playable card`)
  const reviewed = audit.cards.find(c => c.id === card.id)
  assert.equal(reviewed?.status, 'composite-reviewed', `${card.id}: missing visual review`)
  assert.equal(reviewed.differences.length, 5)
  const changes = card.intendedChanges?.split(';').filter(x => x.trim()) ?? card.differences
  assert.equal(changes.length, 5, `${card.id}: must define five intended changes`)
  assert.ok(card.editPrompt && card.review, `${card.id}: missing provenance/review`)
  for (const kind of ['original', 'altered']) {
    assert.match(card[kind], /^\/artwork\/v2\/collection\/dream-\d{3}-(original|altered-source)\.png$/)
    const png = readFileSync(resolve(root, 'public', '.' + card[kind]))
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', `${card.id}: invalid PNG`)
    const width = card[`${kind}Width`] ?? card.width
    const height = card[`${kind}Height`] ?? card.height
    assert.equal(png.readUInt32BE(16), width, `${card.id}: wrong ${kind} width`)
    assert.equal(png.readUInt32BE(20), height, `${card.id}: wrong ${kind} height`)
    assert.ok(width >= 1600 && height >= 900, `${card.id}: inadequate native resolution`)
    const hash = createHash('sha256').update(png).digest('hex')
    assert.ok(!hashes.has(hash), `${card.id}: duplicate image bytes`)
    hashes.add(hash)
    bytes += png.length
  }
}
assert.equal(readdirSync(folder).filter(name => name.endsWith('.png')).length, 240)
console.log(`Validated 120 reviewed pairs / 240 unique native source PNGs / ${(bytes / 1024 / 1024).toFixed(1)} MiB. Five mapped answers each; run npm test for gameplay invariants.`)
