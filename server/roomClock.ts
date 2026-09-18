export const ROOM_TIME_ZONE = 'America/Chicago'
export const SCHEDULE_POLICY = 1

const calendar = new Intl.DateTimeFormat('en-US-u-ca-gregory-nu-latn', {
  timeZone: ROOM_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
})

function localParts(instant: number) {
  const parts = calendar.formatToParts(instant)
  const part = (name: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === name)?.value)
  return { year: part('year'), month: part('month'), day: part('day'), hour: part('hour'), minute: part('minute'), second: part('second') }
}

/** Calendar arithmetic, never an elapsed 24-hour approximation of local midnight. */
export function chicagoMidnight(instant: number, daysAhead: 1 | 2): number {
  if (!Number.isFinite(instant)) throw new Error('Invalid room clock.')
  const local = localParts(instant)
  const target = Date.UTC(local.year, local.month - 1, local.day + daysAhead)
  let candidate = target
  for (let attempt = 0; attempt < 4; attempt++) {
    const value = localParts(candidate)
    const represented = Date.UTC(value.year, value.month - 1, value.day, value.hour, value.minute, value.second)
    if (represented === target) return candidate
    candidate += target - represented
  }
  throw new Error('Could not resolve the room midnight.')
}

// The remainder of today plus all of tomorrow; automatically opened days use +1.
export const fullDayDeadline = (now: number) => chicagoMidnight(now, 2)
