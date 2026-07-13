// Converts a property's { month: "October", day: 12, year: 2022 } object
// into a native JS Date, so it can be compared against dates chosen in the
// search form's DatePicker widgets.
export function addedToDate(added) {
  // Date constructor accepts a month name directly, e.g. new Date("October 12, 2022")
  return new Date(`${added.month} ${added.day}, ${added.year}`)
}

// Strips the time portion so date comparisons only consider the calendar day,
// avoiding off-by-one issues caused by timezones/time-of-day.
export function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

// Converts a Date into the "yyyy-mm-dd" string format required by native
// <input type="date"> elements. Built manually (not toISOString) because
// toISOString converts to UTC first, which can shift the date by a day
// depending on the user's timezone.
export function dateToInputValue(date) {
  if (!date) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Converts a native date input's "yyyy-mm-dd" string back into a local Date
// object. Built manually (not `new Date(str)`) for the same timezone-safety
// reason as above - `new Date("yyyy-mm-dd")` parses as UTC midnight, which
// can display as the previous day in timezones behind UTC.
export function inputValueToDate(value) {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}