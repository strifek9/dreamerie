import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { playableDreams } from '../src/v3/dailyDream.ts'
import { artworkDelivery } from '../src/v3/artworkDelivery.generated.ts'
import { v4PreviewDreams } from '../src/v4/previewDreams.ts'

// Audit only; deletion is deliberately not part of this tool. Historical saved
// rounds need their PNG masters even when they are no longer in the daily deck.
export const requiredArtwork = new Set<string>()
function collect(value: unknown): void {
  if (typeof value === 'string' && value.startsWith('/artwork/')) requiredArtwork.add(value)
  else if (Array.isArray(value)) value.forEach(collect)
  else if (value && typeof value === 'object') Object.values(value).forEach(collect)
}
collect(playableDreams)
collect(artworkDelivery)
collect(v4PreviewDreams)
// Preserve generated sources from previously published V4 review pairs.
for (const file of readdirSync(new URL('../docs/artwork/', import.meta.url))) {
  if (/^V4_(?:PREVIEW|CARD_[a-z0-9-]+)_PROVENANCE\.json$/.test(file)) {
    const provenance = JSON.parse(readFileSync(new URL('../docs/artwork/' + file, import.meta.url), 'utf8'))
    collect(provenance.retiredGeneratedSources)
  }
}

export function artworkFiles(directory = '/artwork'): string[] {
  return readdirSync(new URL(`../public${directory}/`, import.meta.url), { withFileTypes: true })
    .flatMap(entry => entry.isDirectory() ? artworkFiles(`${directory}/${entry.name}`) : [`${directory}/${entry.name}`])
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const unused = artworkFiles().filter(file => /\.(png|jpe?g|webp|svg)$/i.test(file) && !requiredArtwork.has(file))
  console.log(JSON.stringify({ required: requiredArtwork.size, unused: unused.map(file => ({
    file, bytes: statSync(new URL(`../public${file}`, import.meta.url)).size,
  })) }, null, 2))
}
