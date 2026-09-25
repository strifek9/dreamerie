import { findDifference, type Difference, type DifferenceBox, type RecallState } from '../game/dailyRecall.ts'

// Both crops use the exact same native-pixel window, including near image edges.
export function answerCrop(box: DifferenceBox) {
  const width = 1672, height = 941
  const size = Math.min(height, Math.max(160, box.width * width * 1.7, box.height * height * 1.7))
  return {
    x: Math.max(0, Math.min(width - size, (box.left + box.width / 2) * width - size / 2)),
    y: Math.max(0, Math.min(height - size, (box.top + box.height / 2) * height - size / 2)),
    width: size,
    height: size,
  }
}

export function guessFeedback(state: RecallState, differences: readonly Difference[], aspectRatio: number) {
  if (state.pending) return 'Circle placed. Remember uses 1 guess.'
  const last = state.confirmed.at(-1)
  if (!last) return 'Tap a difference in either image.'
  if (last.correct) return 'Found. A fragment remembered.'
  const target = findDifference(last.point, [], differences, aspectRatio)
  return target && state.foundDifferenceIds.includes(target.id)
    ? 'Already found—guess used.'
    : 'Not a difference—guess used.'
}

export function resultVerse(accuracy: number) {
  if (accuracy === 5) return 'Nothing escaped you.'
  if (accuracy === 0) return 'The dream slipped away.'
  if (accuracy >= 3) return 'Much of the dream stayed.'
  return 'A few fragments stayed.'
}
