import { addedToDate, startOfDay, dateToInputValue, inputValueToDate } from './dateUtils.js'

describe('addedToDate', () => {
  test('converts an { month, day, year } object into a valid Date', () => {
    const date = addedToDate({ month: 'October', day: 12, year: 2022 })
    expect(date.getFullYear()).toBe(2022)
    expect(date.getMonth()).toBe(9) // October is month index 9
    expect(date.getDate()).toBe(12)
  })
})

describe('startOfDay', () => {
  test('zeroes out the time portion of a date', () => {
    const date = new Date('2024-05-10T18:45:00')
    const result = startOfDay(date)
    expect(result.getHours()).toBe(0)
    expect(result.getMinutes()).toBe(0)
    expect(result.getSeconds()).toBe(0)
    // day itself should be unaffected
    expect(result.getDate()).toBe(10)
  })  
})

describe('dateToInputValue', () => {
  test('formats a Date as yyyy-mm-dd for native date inputs', () => {
    const date = new Date(2024, 2, 5) // 5 March 2024 (month is 0-indexed)
    expect(dateToInputValue(date)).toBe('2024-03-05')
  })

  test('returns an empty string for null', () => {
    expect(dateToInputValue(null)).toBe('')
  })
})

describe('inputValueToDate', () => {
  test('parses a yyyy-mm-dd string into a local Date, avoiding timezone shift', () => {
    const date = inputValueToDate('2024-03-05')
    expect(date.getFullYear()).toBe(2024)
    expect(date.getMonth()).toBe(2) // March is index 2
    expect(date.getDate()).toBe(5)
  })

  test('returns null for an empty string', () => {
    expect(inputValueToDate('')).toBeNull()
  })

  test('round-trips correctly with dateToInputValue', () => {
    const original = new Date(2023, 10, 20) // 20 November 2023
    const roundTripped = inputValueToDate(dateToInputValue(original))
    expect(roundTripped.getFullYear()).toBe(original.getFullYear())
    expect(roundTripped.getMonth()).toBe(original.getMonth())
    expect(roundTripped.getDate()).toBe(original.getDate())
  })
})