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