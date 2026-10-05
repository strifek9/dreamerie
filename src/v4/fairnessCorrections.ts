import type { LandscapeDream } from '../v2/landscapeCollection.ts'
import { v4PreviewDreams } from './previewDreams.ts'

import { fairnessCorrectionsExtra } from './fairnessCorrectionsExtra.ts'
import { fairnessCorrections001 } from './fairnessCorrections001.ts'
import { fairnessCorrections078 } from './fairnessCorrections078.ts'
import { fairnessCorrections155 } from './fairnessCorrections155.ts'
import { fairnessCorrections232 } from './fairnessCorrections232.ts'
import { fairnessCorrections309 } from './fairnessCorrections309.ts'

const original154 = v4PreviewDreams.find(card => card.id === 'v4-dream-154')!
const original012 = v4PreviewDreams.find(card => card.id === 'v4-dream-012')!
// Keep the floating offcut unchanged; only the new curl is composited.
export const fairnessCorrections: readonly LandscapeDream[] = [{
  ...original012,
  id: 'v4-fairness-dream-012-v1',
  edits: original012.edits.map(edit => edit.id === 'offcut-joins-river' ? {
    ...edit, id: 'river-edge-curl',
    label: 'A small blue curl projects from the cloth river’s edge.',
    box: { left: 883 / 1672, top: 550 / 941, width: 60 / 1672, height: 45 / 941 },
    edgeFade: 5,
  } : edit),
}, {
  ...original154,
  id: 'v4-fairness-dream-154-v1',
  edits: original154.edits.map(edit => edit.id === 'change-3' ? {
    ...edit, id: 'bag-crescent-embroidery',
    label: 'The hanging cloth bag has one ivory crescent embroidery.',
    source: '/artwork/v4/fairness/dream-154-bag-crescent-source-v1.png',
    box: { left: 1189 / 1672, top: 704 / 941, width: 52 / 1672, height: 57 / 941 },
    edgeFade: 4,
  } : edit),
}, ...fairnessCorrections001, ...fairnessCorrections078, ...fairnessCorrections155, ...fairnessCorrections232, ...fairnessCorrections309, ...fairnessCorrectionsExtra]
