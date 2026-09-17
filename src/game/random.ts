/** Fisher–Yates shuffle with injectable randomness and no input mutation. */
export function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const shuffled = [...items]
  for (let index = shuffled.length - 1; index > 0; index--) {
    const value = random()
    if (!Number.isFinite(value) || value < 0 || value >= 1) {
      throw new Error('Randomness must return a number from 0 up to, but not including, 1.')
    }
    const other = Math.floor(value * (index + 1))
    const first = shuffled[index]
    const second = shuffled[other]
    if (first === undefined || second === undefined) throw new Error('Invalid shuffle index.')
    shuffled[index] = second
    shuffled[other] = first
  }
  return shuffled
}
