import { addedToDate, startOfDay } from './dateUtils.js'

// Filters a list of properties against the given search criteria.
// Every criterion is optional/independent - if a field is left empty (null,
// '', or 'Any'), that criterion is simply skipped rather than excluding
// results. This is what allows the search to work correctly whether the
// user provides 1 criterion or all 5 at once.
export function filterProperties(properties, criteria) {
  if (!criteria) return properties

  return properties.filter((property) => {
    // --- Type ---
    if (criteria.type && criteria.type !== 'Any' && property.type !== criteria.type) {
      return false
    }

    // --- Price range ---
    if (criteria.minPrice != null && property.price < criteria.minPrice) {
      return false
    }
    if (criteria.maxPrice != null && property.price > criteria.maxPrice) {
      return false
    }

    // --- Bedroom range ---
    if (criteria.minBedrooms != null && property.bedrooms < criteria.minBedrooms) {
      return false
    }
    if (criteria.maxBedrooms != null && property.bedrooms > criteria.maxBedrooms) {
      return false
    }

    // --- Date added ---
    if (criteria.dateMode === 'after' && criteria.dateAfter) {
      const added = startOfDay(addedToDate(property.added))
      const after = startOfDay(criteria.dateAfter)
      if (added < after) return false
    }

    if (criteria.dateMode === 'between' && criteria.dateFrom && criteria.dateTo) {
      const added = startOfDay(addedToDate(property.added))
      const from = startOfDay(criteria.dateFrom)
      const to = startOfDay(criteria.dateTo)
      if (added < from || added > to) return false
    }

    // --- Postcode area ---
    // Case-insensitive, and matches on the start of the area so a user
    // typing "br" will match BR1, BR5, BR6, etc.
    if (criteria.postcodeArea && criteria.postcodeArea.trim() !== '') {
      const query = criteria.postcodeArea.trim().toLowerCase()
      if (!property.postcodeArea.toLowerCase().startsWith(query)) {
        return false
      }
    }

    return true
  })
}