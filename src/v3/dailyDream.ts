import { parseSession } from '../game/dailySession.ts'
import { landscapeCollection, landscapeDay, type LandscapeDream } from '../v2/landscapeCollection.ts'
import { paintedCollection, supersededPaintedCollection } from './paintedCollection.ts'
import { holidayForDate } from './holidayCalendar.ts'
import { holidayDreams, supersededHolidayDreams } from './holidayDreams.ts'
import { legacyHolidayDreams } from './legacyHolidayDreams.ts'
import { v4OrdinaryDreams, v4HolidayDreams, v4ForDay, v4DeliveryDreams, publishedV4Dreams } from '../v4/releasedCollection.ts'

// Holiday cards never enter or reorder the ordinary rotation.
export const v3CurrentDreams: readonly LandscapeDream[] = [...paintedCollection, ...holidayDreams]
export const currentDreams: readonly LandscapeDream[] = [...v4OrdinaryDreams, ...v4HolidayDreams]
// Legacy IDs are resolvable for saved attempts, not part of review or new-day rotation.
export const v3PlayableDreams: readonly LandscapeDream[] = [...v3CurrentDreams, ...landscapeCollection, ...legacyHolidayDreams, ...supersededPaintedCollection, ...supersededHolidayDreams]
export { v4DeliveryDreams }
export const publishedDreams: readonly LandscapeDream[] = [...publishedV4Dreams, ...v3PlayableDreams]
export const playableDreams: readonly LandscapeDream[] = [...currentDreams, ...publishedDreams.filter(card => !currentDreams.some(current => current.id === card.id))]

export function dreamForDate(date: Date, savedAttempt: string | null = null): LandscapeDream {
  const holiday = holidayForDate(date)
  const scheduled = v4HolidayDreams.find(dream => dream.holiday === holiday) ?? v4ForDay(landscapeDay(date))
  if (savedAttempt === null) return scheduled

  // If a holiday release arrives after somebody started today's ordinary card,
  // finish that exact attempt. Never replace progress or grant another round.
  const value: unknown = JSON.parse(savedAttempt)
  const id = value && typeof value === 'object' && 'cardId' in value ? value.cardId : null
  const savedDream = playableDreams.find(dream => dream.id === id)
  if (!savedDream) throw new Error('Unknown saved dream')
  parseSession(savedAttempt, savedDream.id)
  return savedDream
}
