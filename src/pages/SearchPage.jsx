import { useState, useMemo } from 'react'
import SearchForm from '../components/SearchForm.jsx'
import ResultsList from '../components/ResultsList.jsx'
import FavouritesSidebar from '../components/FavouritesSidebar.jsx'
import propertiesData from '../data/properties.json'
import { filterProperties } from '../utils/searchUtils.js'
import { useFavourites } from '../context/FavouritesContext.jsx'
import './SearchPage.css'

// SearchPage: main landing page containing the property search form,
// the search results, and the favourites sidebar.
// Search filtering logic and results display are added in the next step -
// for now, submitted criteria are just stored so we can see the form works.
function SearchPage() {
  const [criteria, setCriteria] = useState(null)
  const { removeFavourite } = useFavourites()

  const results = useMemo(
    () => filterProperties(propertiesData.properties, criteria),
    [criteria]
  )

  // FavouritesSidebar's onDragStart) - dragging a result card here should
  // do nothing, since it's already on this side of the page.
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const source = e.dataTransfer.getData('application/x-source')
    const droppedId = e.dataTransfer.getData('text/plain')
    if (source === 'favourites' && droppedId) {
      removeFavourite(droppedId)
    }
  }

  return (
    <div className="search-page">
      <h1>Find Your Next Home</h1>

      <SearchForm onSearch={setCriteria} />

      <div className="search-page-layout">
        <div className="search-page-main" onDragOver={handleDragOver} onDrop={handleDrop}>
          <ResultsList properties={results} />
        </div>
        <FavouritesSidebar />
      </div>
    </div>
  )
}

export default SearchPage