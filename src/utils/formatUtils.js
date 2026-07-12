// Formats a number as GBP currency, e.g. 750000 -> "£750,000"
const currencyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  maximumFractionDigits: 0,
})

export function formatPrice(price) {
  return currencyFormatter.format(price)
}