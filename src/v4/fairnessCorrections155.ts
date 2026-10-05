import type { LandscapeDream, LandscapeEdit } from '../v2/landscapeCollection.ts'
import { v4PreviewDreams } from './previewDreams.ts'

// Existing published masters remain immutable. These versioned cards composite
// only one local perceived change for each corrected answer.
const box = (x: number, y: number, w: number, h: number) => ({
  left: x / 1672, top: y / 941, width: w / 1672, height: h / 941,
})
function revise(number: string, replacements: Record<string, Partial<LandscapeEdit>>): LandscapeDream {
  const baseline = v4PreviewDreams.find(card => card.id === `v4-dream-${number}`)!
  return {
    ...baseline,
    id: `v4-fairness-dream-${number}-v1`,
    edits: baseline.edits.map(edit => replacements[edit.id]
      ? { ...edit, maskPath: undefined, ...replacements[edit.id] }
      : edit),
  }
}

export const fairnessCorrections155: readonly LandscapeDream[] = [
  revise('155', {
    // Exclude the long connecting yarn path, which extended beyond its target.
    'yarn-to-case': {
      id: 'yarn-wraps-case-handle',
      label: 'Red yarn wraps around the suitcase handle.',
      box: box(286, 580, 43, 34),
      maskPath: 'M289 584 L301 582 L314 589 L323 594 L328 608 L318 611 L310 605 L297 603 L289 596 Z',
      edgeFade: 2,
    },
    // Restrict to the upper ivory knit; restore original button/cord below it.
    'cuff-knit': {
      id: 'upper-cuff-cable-knit',
      label: 'The upper ivory cuff has a different raised cable pattern.',
      box: box(498, 442, 139, 84),
      edgeFade: 8,
    },
  }),
  revise('177', {
    // Keep the published front unchanged; remove only the original top handle.
    'case-handle': {
      id: 'case-top-handle-absent',
      label: 'The suitcase no longer has its small top handle.',
      box: box(1087, 501, 35, 27),
      edgeFade: 3,
    },
  }),
  revise('209', {
    // Keep the original reflected brass plate and omit only its protruding knob.
    'reflected-knob': {
      id: 'reflected-knob-absent',
      label: 'The reflected door is missing its projecting round knob.',
      box: box(1065, 273, 14, 18),
      edgeFade: 2,
    },
  }),
  revise('215', {
    'cup-handle': {
      id: 'cup-right-handle-absent',
      label: 'The bedside cup is missing its small right handle.',
      box: box(930, 471, 16, 23),
      edgeFade: 1,
    },
    'blanket-moons': {
      id: 'blanket-single-crescent',
      label: 'One lower-right blanket star becomes a crescent moon.',
      box: box(879, 639, 28, 31),
      edgeFade: 3,
    },
  }),
  revise('222', {
    'turned-mug': {
      id: 'mug-right-handle-absent',
      label: 'The room mug is missing its right handle.',
      box: box(1092, 379, 24, 33),
      edgeFade: 2,
    },
  }),
]
