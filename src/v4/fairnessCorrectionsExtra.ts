import type { LandscapeDream } from '../v2/landscapeCollection.ts'
import { v4PreviewDreams } from './previewDreams.ts'

function replacement(number: string, index: number, id: string, label: string, source: string, rect: readonly [number, number, number, number]): LandscapeDream {
  const baseline = v4PreviewDreams.find(card => card.id === `v4-dream-${number}`)
  if (!baseline) throw new Error(`Missing fairness baseline ${number}`)
  const [x, y, width, height] = rect
  return {
    ...baseline, id: `v4-fairness-dream-${number}-v1`,
    edits: baseline.edits.map((edit, editIndex) => editIndex === index ? {
      ...edit, id, label, source,
      box: { left: x / 1672, top: y / 941, width: width / 1672, height: height / 941 },
      edgeFade: 3,
    } : edit),
  }
}

// Isolated source additions; never overwrite published pairs or originals.
export const fairnessCorrectionsExtra: readonly LandscapeDream[] = [
  replacement('107', 0, 'chest-lid-full-moon', 'The chest lid carries a full moon instead of a crescent.',
    '/artwork/v4/fairness/dream-107-full-moon-source-v1.png', [1472, 746, 53, 40]),
  replacement('116', 3, 'bowl-front-crescent', 'A teal crescent decorates the wooden bowl front.',
    '/artwork/v4/fairness/dream-116-bowl-crescent-source-v1.png', [745, 695, 32, 32]),
]
