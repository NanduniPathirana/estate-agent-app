import propertiesData from './properties.json'

// Property types available in the search form's "type" dropdown.
export const PROPERTY_TYPES = ['Any', 'House', 'Flat']

// Postcode areas are derived from the actual dataset so the dropdown always
// reflects what's genuinely searchable, rather than a hardcoded list that
// could drift out of sync with properties.json.
export const POSTCODE_AREAS = Array.from(
  new Set(propertiesData.properties.map((p) => p.postcodeArea))
).sort()