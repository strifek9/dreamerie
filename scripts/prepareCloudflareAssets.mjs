import { writeFileSync, mkdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { playableDreams, currentDreams } from '../src/v3/dailyDream.ts'
import { artworkSources } from '../src/v3/artworkDelivery.ts'
const root = resolve(import.meta.dirname, '..'), dir = resolve(root, '.validation/cloudflare-art')
mkdirSync(dir, { recursive: true })
const sources = [...new Set(playableDreams.flatMap(artworkSources))].sort()
const files = sources.map(source => ({ source, bytes: statSync(resolve(root, 'public' + source)).size }))
writeFileSync(resolve(root, '.validation/cloudflare-sources.json'), JSON.stringify({ cards: playableDreams.length, current: currentDreams.length, files }))
console.log(`Required artwork inventory: ${playableDreams.length} saved-card IDs, ${currentDreams.length} current cards, ${files.length} unique files`)
// Native PNG fallback assets get pixel-exact WebP delivery copies offline; the
// source tree/master files remain untouched. The Python step writes the final mapping.
