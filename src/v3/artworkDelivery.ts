import type { LandscapeDream, LandscapeEdit } from '../v2/landscapeCollection.ts'
import { artworkDelivery } from './artworkDelivery.generated.ts'

interface ImagePlacement {
  readonly src: string
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}
interface Delivery {
  readonly original: string
  readonly edits: Readonly<Record<string, ImagePlacement>>
}
const deliveries: Readonly<Record<string, Delivery>> = artworkDelivery

// Only the current, pixel-verified catalogue has delivery copies. Legacy saved
// rounds and the sample keep their original sources, IDs, geometry and timing.
export function originalArtwork(dream: LandscapeDream): string {
  return deliveries[dream.id]?.original ?? dream.original
}

export function changedArtwork(dream: LandscapeDream, edit: LandscapeEdit): ImagePlacement {
  return deliveries[dream.id]?.edits[edit.id] ?? {
    src: edit.source ?? dream.altered, x: 0, y: 0, width: 1672, height: 941,
  }
}

export function artworkSources(dream: LandscapeDream): string[] {
  return [...new Set([originalArtwork(dream), ...dream.edits.map(edit => changedArtwork(dream, edit).src)])]
}
