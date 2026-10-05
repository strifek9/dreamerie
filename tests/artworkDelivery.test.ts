import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { currentDreams, playableDreams, v3CurrentDreams, v4DeliveryDreams } from '../src/v3/dailyDream.ts'
import { artworkSources, changedArtwork, originalArtwork } from '../src/v3/artworkDelivery.ts'

interface Asset {
  source: string; delivery: string; sourceWidth: number; sourceHeight: number
  crop: number[]; sourceBytes: number; deliveryBytes: number
  sourceSha256: string; deliverySha256: string; rgbaSha256: string
}
const audit: { assets: Asset[]; cards: { id: string; sourceBytes: number; deliveryBytes: number }[];
  sourceBytes: number; deliveryBytes: number } = JSON.parse(readFileSync(new URL('../docs/artwork/V4_DELIVERY_LOSSLESS_V1.json', import.meta.url), 'utf8'))
const historicalAudit: { assets: Asset[] } = JSON.parse(readFileSync(new URL('../docs/artwork/DELIVERY_LOSSLESS_V1.json', import.meta.url), 'utf8'))
const assets = new Map(audit.assets.map(asset => [asset.delivery, asset]))
const bytes = (path: string) => readFileSync(new URL(`../public${path}`, import.meta.url))
const hash = (value: Buffer) => createHash('sha256').update(value).digest('hex')

test('all 383 current cards preload only their full original and five lossless clue crops', () => {
  assert.equal(audit.cards.length, v4DeliveryDreams.length)
  assert.equal(assets.size, v4DeliveryDreams.length * 6)
  for (const dream of currentDreams) {
    const urls = artworkSources(dream)
    assert.equal(urls.length, 6, dream.id)
    assert.equal(urls[0], originalArtwork(dream))
    const original = assets.get(urls[0])!
    assert.equal(original.source, dream.original)
    assert.deepEqual(original.crop, [0, 0, original.sourceWidth, original.sourceHeight])
    for (const edit of dream.edits) {
      const placement = changedArtwork(dream, edit)
      const asset = assets.get(placement.src)!
      assert.ok(asset, `${dream.id}/${edit.id}`)
      assert.equal(asset.source, edit.source ?? dream.altered, 'correction sources must not be lost')
      const [left, top, width, height] = asset.crop
      assert.equal(placement.x, left / asset.sourceWidth * 1672)
      assert.equal(placement.y, top / asset.sourceHeight * 941)
      assert.equal(placement.width, width / asset.sourceWidth * 1672)
      assert.equal(placement.height, height / asset.sourceHeight * 941)
      const box = edit.box, epsilon = 1e-6
      assert.ok(placement.x <= box.left * 1672 + epsilon && placement.y <= box.top * 941 + epsilon)
      assert.ok(placement.x + placement.width >= (box.left + box.width) * 1672 - epsilon)
      assert.ok(placement.y + placement.height >= (box.top + box.height) * 941 - epsilon)
      assert.ok(left >= 0 && top >= 0 && left + width <= asset.sourceWidth && top + height <= asset.sourceHeight)
      assert.ok(left === 0 || box.left * asset.sourceWidth - left >= 32 - epsilon)
      assert.ok(top === 0 || box.top * asset.sourceHeight - top >= 32 - epsilon)
    }
    urls.forEach(url => assert.match(url, /^\/artwork\/v4\/delivery-lossless-v1\/[a-z0-9-]+\.webp$/))
    const total = audit.cards.find(card => card.id === dream.id)!
    assert.equal(total.deliveryBytes, urls.reduce((sum, url) => sum + assets.get(url)!.deliveryBytes, 0))
    assert.ok(total.deliveryBytes < total.sourceBytes, dream.id)
  }
  assert.ok(audit.deliveryBytes < audit.sourceBytes * .6, 'at least 40% fewer total artwork bytes')
})

test('delivery checksums match the pixel-verified audit and every file is native-resolution lossless WebP', () => {
  const checkedSources = new Set<string>()
  for (const asset of [...historicalAudit.assets, ...audit.assets]) {
    if (!checkedSources.has(asset.source)) {
      const master = bytes(asset.source)
      assert.equal(hash(master), asset.sourceSha256, asset.source)
      assert.equal(master.length, asset.sourceBytes)
      checkedSources.add(asset.source)
    }
    const webp = bytes(asset.delivery)
    assert.equal(hash(webp), asset.deliverySha256, asset.delivery)
    assert.equal(webp.length, asset.deliveryBytes)
    assert.equal(webp.toString('ascii', 0, 4), 'RIFF')
    assert.equal(webp.toString('ascii', 8, 12), 'WEBP')
    let lossless = false
    for (let offset = 12; offset + 8 <= webp.length;) {
      const size = webp.readUInt32LE(offset + 4)
      if (webp.toString('ascii', offset, offset + 4) === 'VP8L') {
        assert.equal(webp[offset + 8], 0x2f)
        const dimensions = webp.readUInt32LE(offset + 9)
        assert.equal((dimensions & 0x3fff) + 1, asset.crop[2])
        assert.equal(((dimensions >>> 14) & 0x3fff) + 1, asset.crop[3])
        lossless = true
      }
      offset += 8 + size + (size % 2)
    }
    assert.ok(lossless, asset.delivery)
    assert.match(asset.rgbaSha256, /^[a-f0-9]{64}$/)
  }
})

test('legacy saved cards keep original sources and delivery selection never mutates puzzle data', () => {
  const snapshot = JSON.stringify(playableDreams)
  const currentIds = new Set([...v4DeliveryDreams, ...v3CurrentDreams].map(card => card.id))
  for (const dream of playableDreams) {
    artworkSources(dream)
    if (currentIds.has(dream.id)) continue
    assert.equal(originalArtwork(dream), dream.original)
    dream.edits.forEach(edit => assert.deepEqual(changedArtwork(dream, edit), {
      src: edit.source ?? dream.altered, x: 0, y: 0, width: 1672, height: 941,
    }))
  }
  assert.equal(JSON.stringify(playableDreams), snapshot)
})
