import { addedToDate, startOfDay } from './dateUtils.js'

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