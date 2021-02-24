import requiredArgs from '../_lib/requiredArgs/index'
import getDay from '../getDay'
import addDays from '../addDays'
import toDate from '../toDate'
import isValid from '../isValid/index'

const baseMap = [7, 6, 5, 4, 3, 2, 1]

/**
 * @name nextDay
 * @category Weekday Helpers
 * @summary When is the next day of Week?
 *
 * @description
 * When is the next day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @param {Date | number} date - the date to check
 * @param {number} day - day of week
 * @returns {Date} the date is the next day of week
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * When is the next Monday after Mar, 20, 2020?
 * const result = nextDay(new Date(2020, 2, 20), 1)
 * => new Date(2020, 2, 23)
 *
 * @example
 * When is the next Tuesday after Mar, 21, 2020?
 * const result = nextDay(new Date(2020, 2, 21), 2)
 * => new Date(2020, 2, 24)
 **/

export default function nextDay(date: Date | number, day: number): Date {
  requiredArgs(2, arguments)
  // Throw an exception `Invalid Day` if the day is out or range
  if (!baseMap.includes(day + 1)) {
    throw new RangeError('Invalid Day')
  }

  if (!isValid(date)) {
    throw new RangeError('Invalid Date')
  }

  const map = genMap(day)
  return addDays(toDate(date), map[getDay(toDate(date))])
}

function genMap(daysToMove: number): number[] {
  if (daysToMove === 0) {
    return baseMap
  } else {
    const mapStart = baseMap.slice(-daysToMove)
    const mapEnd = baseMap.slice(0, baseMap.length - daysToMove)
    return mapStart.concat(mapEnd)
  }
}
