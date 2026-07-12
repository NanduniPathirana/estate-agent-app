import PropertyCard from './PropertyCard.jsx'
import './ResultsList.css'

// ResultsList: renders the list of properties matching the current search.
// Shows a friendly message when there are no matches, rather than an empty
// blank area, so the user understands why nothing appeared.
function ResultsList({ properties }) {
  if (properties.length === 0) {
    return (
      <div className="results-empty">
        <p>No properties match your search criteria. Try widening your search.</p>
      </div>
    )
  }

  return (
    <div className="results-list">
      <h2 className="results-count">
        {properties.length} propert{properties.length === 1 ? 'y' : 'ies'} found
      </h2>
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}

export default ResultsList