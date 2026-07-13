import { filterProperties } from './searchUtils.js'

// A small fixture set covering the variety needed to exercise every
// criterion independently and in combination.
const properties = [
  {
    id: 'a', type: 'House', bedrooms: 3, price: 500000, postcodeArea: 'BR5',
    added: { month: 'January', day: 1, year: 2022 },
  },
  {
    id: 'b', type: 'Flat', bedrooms: 1, price: 200000, postcodeArea: 'SW1',
    added: { month: 'June', day: 15, year: 2023 },
  },
  {
    id: 'c', type: 'House', bedrooms: 5, price: 1000000, postcodeArea: 'BR1',
    added: { month: 'December', day: 25, year: 2024 },
  },
]

describe('filterProperties', () => {
  test('returns all properties when criteria is null (default/initial state)', () => {
    expect(filterProperties(properties, null)).toHaveLength(3)
  })

  test('filters by type only', () => {
    const result = filterProperties(properties, { type: 'Flat' })
    expect(result.map((p) => p.id)).toEqual(['b'])
  })

  test('"Any" type does not filter anything out', () => {
    const result = filterProperties(properties, { type: 'Any' })
    expect(result).toHaveLength(3)
  })

  test('filters by min and max price together', () => {
    const result = filterProperties(properties, { minPrice: 300000, maxPrice: 900000 })
    expect(result.map((p) => p.id)).toEqual(['a'])
  })

  test('filters by min and max bedrooms together', () => {
    const result = filterProperties(properties, { minBedrooms: 2, maxBedrooms: 4 })
    expect(result.map((p) => p.id)).toEqual(['a'])
  })

  test('filters by postcode area, case-insensitive prefix match', () => {
    const result = filterProperties(properties, { postcodeArea: 'br' })
    expect(result.map((p) => p.id).sort()).toEqual(['a', 'c'])
  })

  test('filters by date added "after" a given date', () => {
    const result = filterProperties(properties, {
      dateMode: 'after',
      dateAfter: new Date('2023-01-01'),
    })
    expect(result.map((p) => p.id).sort()).toEqual(['b', 'c'])
  })

  test('filters by date added "between" two dates', () => {
    const result = filterProperties(properties, {
      dateMode: 'between',
      dateFrom: new Date('2022-06-01'),
      dateTo: new Date('2023-12-31'),
    })
    expect(result.map((p) => p.id)).toEqual(['b'])
  })

  test('combines multiple criteria at once (type + bedrooms + price)', () => {
    const result = filterProperties(properties, {
      type: 'House',
      minBedrooms: 4,
      maxPrice: 1200000,
    })
    expect(result.map((p) => p.id)).toEqual(['c'])
  })

  test('returns an empty array when nothing matches', () => {
    const result = filterProperties(properties, { type: 'Flat', minBedrooms: 4 })
    expect(result).toHaveLength(0)
  })
})