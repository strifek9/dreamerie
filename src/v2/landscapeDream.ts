import type { Difference } from '../game/dailyRecall.ts'

export const landscapeDream = {
  id: 'sea-in-a-teacup-v2', title: 'A Sea in a Teacup',
  original: '/artwork/v2/sea-in-a-teacup-original.png',
  altered: '/artwork/v2/sea-in-a-teacup-edited-source.png',
  aspectRatio: 1672 / 941,
} as const

const edits = [
  { id: 'moon', difficulty: 'Easy', label: 'The full moon becomes a crescent.', box: { left: .185, top: .015, width: .132, height: .22 } },
  { id: 'sail', difficulty: 'Medium', label: 'The boat’s red sails turn gold.', box: { left: .524, top: .19, width: .13, height: .21 } },
  { id: 'flower', difficulty: 'Hard', label: 'The smallest bell flower disappears.', box: { left: .865, top: .168, width: .062, height: .104 } },
  { id: 'lantern', difficulty: 'Very hard', label: 'The lantern loses its lower crossbar.', box: { left: .866, top: .582, width: .085, height: .04 } },
  { id: 'spoon', difficulty: 'Dreamlike', label: 'The spoon’s engraved star becomes a crescent.', box: { left: .614, top: .913, width: .037, height: .044 } },
] as const

export const landscapeDifferences: readonly Difference[] = edits.map(edit => ({
  ...edit, x: edit.box.left + edit.box.width / 2, y: edit.box.top + edit.box.height / 2,
  radius: Math.max(edit.box.width, edit.box.height / landscapeDream.aspectRatio) / 2,
}))

export const V2_SESSION_OPTIONS = { namespace: 'dreamerie:v2:landscape-playtest', aspectRatio: landscapeDream.aspectRatio }
