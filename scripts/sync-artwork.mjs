import { readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'

// Synchronize reviewed local assets only. This script never calls an image API.
const project = new URL('../', import.meta.url)
const manifest = JSON.parse(await readFile(new URL('docs/artwork/prompts.json', project), 'utf8'))
if (manifest.cards.length !== 120) throw new Error('The Dreamerie deck requires 120 illustrations.')
const hashes = new Set()
const ids = new Set()
const cards = []
for (const entry of manifest.cards) {
  if (!/^card-\d{3}$/.test(entry.id) || ids.has(entry.id)) throw new Error(`Invalid or duplicate ID: ${entry.id}`)
  ids.add(entry.id)
  const artwork = `/artwork/dreams/${entry.id}.jpg`
  const asset = await readFile(new URL(`public${artwork}`, project))
  const provenance = JSON.parse((await readFile(new URL(`public${artwork.replace('.jpg', '.provenance.json')}`, project), 'utf8')).replace(/^\uFEFF/, ''))
  const hash = createHash('sha256').update(asset).digest('hex')
  if (hashes.has(hash) || hash !== provenance.sha256) throw new Error(`Duplicate or changed artwork: ${entry.id}`)
  hashes.add(hash)
  if (!entry.description?.trim()) throw new Error(`Missing visual description: ${entry.id}`)
  cards.push({ id: entry.id, artwork, description: entry.description })
}
await writeFile(new URL('src/data/cards.ts', project), `// Generated from reviewed artwork by scripts/sync-artwork.mjs.\nimport type { Card } from '../game/types.ts'\n\nexport const cards: readonly Card[] = ${JSON.stringify(cards, null, 2)}\n`)
console.log(`Synchronized ${cards.length} distinct local illustrations.`)
