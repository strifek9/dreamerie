import type { LandscapeDream } from '../v2/landscapeCollection.ts'
import { v4PreviewDreams } from './previewDreams.ts'

const original237 = v4PreviewDreams.find(card => card.id === 'v4-dream-237')!
const original270 = v4PreviewDreams.find(card => card.id === 'v4-dream-270')!

// Preserve published pairs. Each revised patch affects one perceived location.
export const fairnessCorrections232: readonly LandscapeDream[] = [{
  ...original237,
  id: 'v4-fairness-dream-237-v1',
  edits: original237.edits.map(edit => {
    if (edit.id === 'bell-clapper') return {
      ...edit,
      id: 'velvet-over-clapper-ball',
      label: 'The velvet folds over the brass clapper ball.',
      box: { left: 735 / 1672, top: 350 / 941, width: 90 / 1672, height: 120 / 941 },
      edgeFade: 5,
    }
    if (edit.id === 'card-note') return {
      ...edit,
      id: 'additional-note-behind-card',
      label: "An additional paper note peeks behind the card's left edge.",
      box: { left: 1025 / 1672, top: 235 / 941, width: 70 / 1672, height: 70 / 941 },
      edgeFade: 5,
    }
    if (edit.id === 'bowl-note') return {
      ...edit,
      id: 'additional-note-at-right-bowl-rim',
      label: "An additional paper note hooks over the bowl's right rim.",
      box: { left: 1540 / 1672, top: 244 / 941, width: 110 / 1672, height: 118 / 941 },
      edgeFade: 5,
    }
    return edit
  }),
}, {
  ...original270,
  id: 'v4-fairness-dream-270-v1',
  // Restore the lower lightning bolt by excluding it from the revised patch.
  edits: original270.edits.map(edit => edit.id === 'shy-lightning' ? {
    ...edit,
    id: 'cloud-upper-lightning-curl',
    label: 'A small golden lightning curl appears above the cloud.',
    box: { left: 718 / 1672, top: 385 / 941, width: 95 / 1672, height: 120 / 941 },
    edgeFade: 5,
  } : edit),
}]
