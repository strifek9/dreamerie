import type { LandscapeDream } from '../v2/landscapeCollection.ts'
import { v4PreviewDreams } from './previewDreams.ts'

// Fairness revisions select one local change from existing edited sources.
// Published V4 objects stay intact for historical saved rounds.
function localize(number: string, index: number, id: string, label: string, rect: readonly [number, number, number, number], maskPath?: string): LandscapeDream {
  const baseline = v4PreviewDreams.find(card => card.id === `v4-dream-${number}`)
  if (!baseline) throw new Error(`Missing V4 fairness baseline ${number}`)
  const [x, y, width, height] = rect
  return {
    ...baseline,
    id: `v4-fairness-dream-${number}-v1`,
    edits: baseline.edits.map((edit, editIndex) => editIndex === index ? {
      ...edit, id, label,
      box: { left: x / 1672, top: y / 941, width: width / 1672, height: height / 941 },
      edgeFade: 3,
      ...(maskPath ? { maskPath } : {}),
    } : edit),
  }
}

export const fairnessCorrections001: readonly LandscapeDream[] = [
  localize('003', 3, 'near-carriage-dark-window', "The near carriage's leftmost window goes dark.", [793, 466, 34, 48]),
  localize('009', 3, 'far-black-key-extension', 'The farther black bridge key extends to the right.', [284, 657, 275, 62],
    'M 295 657 L 548 683 L 557 707 L 540 718 L 308 695 L 285 679 Z'),
  localize('024', 2, 'spool-left-thread-loop', 'The red thread loop on the left of the spool is missing.', [313, 592, 58, 91]),
  localize('042', 3, 'postcard-upper-stamp', 'The upper stamp on the lowest flying postcard is missing.', [604, 575, 31, 35]),
  localize('048', 3, 'key-shaft-ribbon-knot', 'A small red ribbon knot wraps the key shaft.', [1255, 818, 72, 56]),
]
