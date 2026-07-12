import { useState } from 'react'
import SearchForm from '../components/SearchForm.jsx'

// SearchPage: main landing page containing the property search form,
// the search results, and the favourites sidebar.
// Search filtering logic and results display are added in the next step -
// for now, submitted criteria are just stored so we can see the form works.
function SearchPage() {
  const [criteria, setCriteria] = useState(null)

  return (
    <div className="search-page">
      <h1>Find Your Next Home</h1>

      <SearchForm onSearch={setCriteria} />

      {criteria && (
        <p className="search-debug">
          Search submitted — results display coming in the next step.
        </p>
      )}
    </div>
  )
}

export default SearchPage