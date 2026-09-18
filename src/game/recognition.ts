import type { PlayerId } from './types.ts'

/** Competition ranks: two first places consume first and second (3, 3, 1). */
export function rankedRecognition(counts: ReadonlyMap<PlayerId, number>): Map<PlayerId, number> {
  const awards = new Map<PlayerId, number>()
  for (const [player, correct] of counts) {
    const ahead = [...counts.values()].filter((count) => count > correct).length
    awards.set(player, correct > 0 ? Math.max(0, 3 - ahead) : 0)
  }
  return awards
}
