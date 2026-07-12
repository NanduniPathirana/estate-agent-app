import { useState, useMemo } from 'react'
import SearchForm from '../components/SearchForm.jsx'
import ResultsList from '../components/ResultsList.jsx'
import propertiesData from '../data/properties.json'
import { filterProperties } from '../utils/searchUtils.js'

// SearchPage: main landing page containing the property search form,
// the search results, and the favourites sidebar.
// Search filtering logic and results display are added in the next step -
// for now, submitted criteria are just stored so we can see the form works.
function SearchPage() {
  const [criteria, setCriteria] = useState(null)

  const results = useMemo(
    () => filterProperties(propertiesData.properties, criteria),
    [criteria]
  )

  return (
    <div className="search-page">
      <h1>Find Your Next Home</h1>

      <SearchForm onSearch={setCriteria} />

      <ResultsList properties={results} />
    </div>
  )
}

export default SearchPage