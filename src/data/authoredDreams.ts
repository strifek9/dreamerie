import { authoredExpansion } from './authoredExpansion.ts'

// Only visually reviewed, object-level edits belong in the playable catalogue.
export const authoredDreams = [{
  id: 'card-022',
  editedArtwork: '/artwork/differences/card-022-edited-v1.png',
  edits: [
    { id: 'moon', difficulty: 'Easy', label: 'The yellow moon turned blue.', box: { left: .673, top: .216, width: .158, height: .122 } },
    { id: 'fingers', difficulty: 'Medium', label: 'The large white glove has an extra finger.', box: { left: .308, top: .541, width: .319, height: .160 } },
    { id: 'bow', difficulty: 'Hard', label: 'The white glove’s blue bow turned red.', box: { left: .473, top: .784, width: .164, height: .105 } },
    { id: 'missing-glove', difficulty: 'Very hard', label: 'The tiny yellow glove on the far-left path disappeared.', box: { left: .124, top: .184, width: .039, height: .06 } },
    { id: 'buttons', difficulty: 'Dreamlike', label: 'The blue glove has four gold buttons instead of two.', box: { left: .274, top: .704, width: .062, height: .08 } },
  ],
}, ...authoredExpansion] as const
