import { formatPrice } from './formatUtils.js'

describe('formatPrice', () => {
  test('formats a whole number as GBP currency', () => {
    expect(formatPrice(750000)).toBe('£750,000')
  })

  test('rounds off decimals (maximumFractionDigits: 0)', () => {
    expect(formatPrice(199999.99)).toBe('£200,000')
  })

  test('formats zero correctly', () => {
    expect(formatPrice(0)).toBe('£0')
  })
})