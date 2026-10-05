import type { LandscapeDream, LandscapeEdit } from '../v2/landscapeCollection.ts'
import { v4PreviewDreams } from './previewDreams.ts'

function localized(card: string, clue: string, replacement: Partial<LandscapeEdit>): LandscapeDream {
  const original = v4PreviewDreams.find(dream => dream.id === `v4-dream-${card}`)!
  return {
    ...original,
    id: `v4-fairness-dream-${card}-v1`,
    edits: original.edits.map(edit => edit.id === clue ? { ...edit, ...replacement } : edit),
  }
}

// Each correction retains the original master and the other four clues.
// The published V4 objects remain unchanged for historical saved rounds.
export const fairnessCorrections078: readonly LandscapeDream[] = [
  localized('108', 'change-1', {
    id: 'scarf-crescent', label: 'A small golden crescent is embroidered on the long scarf tail.',
    source: '/artwork/v4/fairness/dream-108-scarf-crescent-source-v1.png',
    box: { left: 695 / 1672, top: 699 / 941, width: 34 / 1672, height: 32 / 941 }, edgeFade: 3,
  }),
  // Open one section of the original handle; do not move it to the other side.
  localized('112', 'mug-handle', {
    id: 'mug-handle-gap', label: 'The mug handle has a gap in its outer curve.',
    box: { left: 1354 / 1672, top: 695 / 941, width: 23 / 1672, height: 40 / 941 }, edgeFade: 2,
  }),
  // Exclude the changed lower fin and body silhouette entirely.
  localized('126', 'fish-fin', {
    id: 'upper-fin-fold', label: 'Only the large fish’s upper fin folds downward.',
    box: { left: 430 / 1672, top: 112 / 941, width: 114 / 1672, height: 65 / 941 }, edgeFade: 3,
  }),
  // The long lace on the floor remains exact; only the boot-top bow appears.
  localized('129', 'lace', {
    id: 'boot-top-bow', label: 'Bow loops appear at the left boot’s lace attachment.',
    box: { left: 290 / 1672, top: 697 / 941, width: 100 / 1672, height: 54 / 941 }, edgeFade: 2,
  }),
  // Keep the flag on its original side of the original pole.
  localized('143', 'change-1', {
    id: 'ring-flag', label: 'The small triangular flag becomes a golden ring.',
    source: '/artwork/v4/fairness/dream-143-ring-flag-source-v1.png',
    box: { left: 1180 / 1672, top: 0 / 941, width: 79 / 1672, height: 70 / 941 }, edgeFade: 2,
  }),
  localized('150', 'change-5', {
    id: 'pitcher-triangle-handle', label: 'The pitcher’s right handle has a triangular outline.',
    source: '/artwork/v4/fairness/dream-150-triangle-handle-source-v1.png',
    box: { left: 1544 / 1672, top: 280 / 941, width: 38 / 1672, height: 47 / 941 }, edgeFade: 3,
  }),
  // Keep the rope and original stem; only the attached bulb changes shape.
  localized('152', 'change-2', {
    id: 'diamond-clapper', label: 'The bell’s round clapper bulb becomes a diamond.',
    source: '/artwork/v4/fairness/dream-152-diamond-clapper-source-v1.png',
    box: { left: 614 / 1672, top: 540 / 941, width: 49 / 1672, height: 49 / 941 }, edgeFade: 2,
  }),
]
