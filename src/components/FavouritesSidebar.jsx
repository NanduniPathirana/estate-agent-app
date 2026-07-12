import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext.jsx'
import propertiesData from '../data/properties.json'
import { formatPrice } from '../utils/formatUtils.js'
import './FavouritesSidebar.css'

// FavouritesSidebar: shown on the search page. Displays the current
// favourite properties, and acts as a drop target so a property card can
// be dragged here to add it to favourites. Remove/clear functionality is
// added in the next step.
function FavouritesSidebar() {
  const { favourites, addFavourite } = useFavourites()

  const favouriteProperties = propertiesData.properties.filter((p) =>
    favourites.includes(p.id)
  )

  // Required on dragover to signal this element accepts drops.
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedId = e.dataTransfer.getData('text/plain')
    if (droppedId) addFavourite(droppedId)
  }

  return (
    <aside
      className="favourites-sidebar"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      aria-label="Favourite properties"
    >
      <h2>Favourites</h2>

      {favouriteProperties.length === 0 ? (
        <p className="favourites-empty">
          Drag a property here, or use the "Add to favourites" button on a listing.
        </p>
      ) : (
        <ul className="favourites-list">
          {favouriteProperties.map((property) => (
            <li key={property.id} className="favourites-item">
              <Link to={`/property/${property.id}`} className="favourites-item-link">
                <img
                  src={`${import.meta.env.BASE_URL}${property.images[0]}`}
                  alt=""
                  className="favourites-item-image"
                />
                <span className="favourites-item-text">
                  <span className="favourites-item-location">{property.location}</span>
                  <span className="favourites-item-price">{formatPrice(property.price)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

export default FavouritesSidebar