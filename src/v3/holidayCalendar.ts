export type HolidayId = 'new-years' | 'mlk' | 'valentines' | 'presidents' | 'st-patricks'
  | 'easter' | 'mothers' | 'memorial' | 'juneteenth' | 'fathers' | 'independence'
  | 'labor' | 'october-observance' | 'halloween' | 'veterans' | 'thanksgiving' | 'christmas' | 'new-years-eve'

/** Gregorian (Western) Easter. Integer algorithm published by the U.S. Naval Observatory.
 * https://aa.usno.navy.mil/faq/easter — no network request at runtime.
 */
export function easterSunday(year: number): { month: number; day: number } {
  if (!Number.isInteger(year) || year < 1583 || year > 9999) throw new Error('Unsupported Easter year')
  const divide = (a: number, b: number) => Math.trunc(a / b)
  const c = divide(year, 100), n = year % 19, k = divide(c - 17, 25)
  let i = (c - divide(c, 4) - divide(c - k, 3) + 19 * n + 15) % 30
  i -= divide(i, 28) * (1 - divide(i, 28) * divide(29, i + 1) * divide(21 - n, 11))
  const j = (year + divide(year, 4) + i + 2 - c + divide(c, 4)) % 7
  const l = i - j, month = 3 + divide(l + 40, 44)
  return { month: month - 1, day: l + 28 - 31 * divide(month, 4) }
}

/** Player-local calendar dates, not UTC midnight or a network service. */
export function holidayForDate(date: Date): HolidayId | null {
  if (!Number.isFinite(date.getTime())) throw new Error('Invalid dream date')
  const month = date.getMonth()
  const day = date.getDate()
  const weekday = date.getDay()
  const week = Math.floor((day - 1) / 7) + 1
  if (month === 0 && day === 1) return 'new-years'
  if (month === 0 && weekday === 1 && week === 3) return 'mlk'
  if (month === 1 && day === 14) return 'valentines'
  if (month === 1 && weekday === 1 && week === 3) return 'presidents'
  if (month === 2 && day === 17) return 'st-patricks'
  if (month === 2 || month === 3) {
    const easter = easterSunday(date.getFullYear())
    if (month === easter.month && day === easter.day) return 'easter'
  }
  if (month === 4 && weekday === 0 && week === 2) return 'mothers'
  if (month === 4 && weekday === 1 && day >= 25) return 'memorial'
  if (month === 5 && day === 19) return 'juneteenth'
  if (month === 5 && weekday === 0 && week === 3) return 'fathers'
  // Both get a day when June 19 is also Father's Day; Juneteenth keeps June 19.
  if (month === 5 && day === 20 && weekday === 1) return 'fathers'
  if (month === 6 && day === 4) return 'independence'
  if (month === 8 && weekday === 1 && week === 1) return 'labor'
  if (month === 9 && weekday === 1 && week === 2) return 'october-observance'
  if (month === 9 && day === 31) return 'halloween'
  if (month === 10 && day === 11) return 'veterans'
  // U.S. Thanksgiving: the fourth Thursday, always November 22–28.
  if (month === 10 && date.getDay() === 4 && day >= 22 && day <= 28) return 'thanksgiving'
  if (month === 11 && day === 25) return 'christmas'
  if (month === 11 && day === 31) return 'new-years-eve'
  return null
}
