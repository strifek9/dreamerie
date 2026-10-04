import { holidayDreams, type HolidayDream } from '../v3/holidayDreams.ts'

// Isolated proof IDs reuse the published holiday's verse and theme.
export function previewHolidayForDream(id: string): HolidayDream | undefined {
  if (!id.startsWith('v4-dream-')) return undefined
  const suffix = '-' + id.slice(9)
  return holidayDreams.find(card => card.id.endsWith(suffix))
}
