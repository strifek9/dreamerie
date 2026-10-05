import type { LandscapeDream } from '../v2/landscapeCollection.ts'
import { paintedCollection } from '../v3/paintedCollection.ts'
import { holidayDreams } from '../v3/holidayDreams.ts'
import type { HolidayDream } from '../v3/legacyHolidayDreams.ts'
import { v4PreviewDreams } from './previewDreams.ts'
import { fairnessCorrections } from './fairnessCorrections.ts'

// Versioned IDs keep every published V3 save bound to its old art and hit geometry.
export function originalV4Id(id: string): string {
  return 'v4-dream-' + id.replace(/^(painted-dream-|revisit-dream-|holiday-painted-)/, '')
}
export function correctionFor(id: string): LandscapeDream | undefined {
  const suffix = id.replace(/^v4-dream-/, '')
  return fairnessCorrections.find(card => card.id === `v4-fairness-dream-${suffix}-v1`)
}
export function v4ReplacementId(id: string): string {
  const original = originalV4Id(id)
  return correctionFor(original)?.id ?? original
}
// Original published V4 objects and deliveries remain available to saved rounds.
export const v4DeliveryDreams: readonly LandscapeDream[] = [...v4PreviewDreams, ...fairnessCorrections]
export function v4VerseId(id: string): string {
  return id.replace(/^v4-fairness-/, '').replace(/-v1$/, '').replace(/^(painted-|revisit-|v4-)/, '')
}
function revise<T extends LandscapeDream>(baseline: T): T {
  const proof = v4DeliveryDreams.find(card => card.id === v4ReplacementId(baseline.id))
  if (!proof) throw new Error(`Missing approved V4 card: ${baseline.id}`)
  return { ...baseline, ...proof }
}
export const publishedV4Dreams: readonly LandscapeDream[] = [...paintedCollection, ...holidayDreams].map(baseline => ({ ...baseline, ...v4PreviewDreams.find(card => card.id === originalV4Id(baseline.id))! }))
export const v4OrdinaryDreams: readonly LandscapeDream[] = paintedCollection.map(revise)
export const v4HolidayDreams: readonly HolidayDream[] = holidayDreams.map(revise)
export function v4ForDay(day: number): LandscapeDream {
  if (!Number.isSafeInteger(day)) throw new Error('Invalid dream day')
  return v4OrdinaryDreams[((day - 1) % v4OrdinaryDreams.length + v4OrdinaryDreams.length) % v4OrdinaryDreams.length]
}
export function v4HolidayDetails(id: string): HolidayDream | undefined {
  return v4HolidayDreams.find(card => card.id === id) ?? holidayDreams.map(baseline => {
    const proof = v4PreviewDreams.find(card => card.id === originalV4Id(baseline.id))!
    return { ...baseline, ...proof }
  }).find(card => card.id === id)
}
