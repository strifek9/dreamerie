import { parseSession } from '../game/dailySession.ts'
import { landscapeCollection, landscapeDay, type LandscapeDream } from '../v2/landscapeCollection.ts'
import { paintedCollection, paintedForDay } from './paintedCollection.ts'
import { holidayForDate } from './holidayCalendar.ts'
import { holidayDreams } from './holidayDreams.ts'
import { legacyHolidayDreams } from './legacyHolidayDreams.ts'

// Holiday cards never enter or reorder the ordinary rotation.
export const currentDreams: readonly LandscapeDream[] = [...paintedCollection, ...holidayDreams]
// Legacy IDs are resolvable for saved attempts, not part of review or new-day rotation.
export const playableDreams: readonly LandscapeDream[] = [...currentDreams, ...landscapeCollection, ...legacyHolidayDreams]

export function dreamForDate(date: Date, savedAttempt: string | null = null): LandscapeDream {
  const holiday = holidayForDate(date)
  const scheduled = holidayDreams.find(dream => dream.holiday === holiday) ?? paintedForDay(landscapeDay(date))
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
