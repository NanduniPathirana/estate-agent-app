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
  const { favourites, addFavourite, removeFavourite, clearFavourites } = useFavourites()

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

  // Marks the drag as originating from the favourites list, so that
  // whichever element it gets dropped on elsewhere in the page knows to
  // remove it rather than add it again.
  const handleItemDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id)
    e.dataTransfer.setData('application/x-source', 'favourites')
  }

  return (
    <aside
      className="favourites-sidebar"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      aria-label="Favourite properties"
    >
      
      <div className="favourites-header">
        <h2>Favourites {favouriteProperties.length > 0 && `(${favouriteProperties.length})`}</h2>
        {favouriteProperties.length > 0 && (
          <button
            type="button"
            className="favourites-clear-btn"
            onClick={clearFavourites}
          >
            Clear all
          </button>
        )}
      </div>

      {favouriteProperties.length === 0 ? (
        <p className="favourites-empty">
          Drag a property here, or use the "Add to favourites" button on a listing.
        </p>
      ) : (
        <ul className="favourites-list">
          {favouriteProperties.map((property) => (
            <li key={property.id} className="favourites-item" draggable
              onDragStart={(e) => handleItemDragStart(e, property.id)}>
              
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

              <button
                type="button"
                className="favourites-remove-btn"
                onClick={() => removeFavourite(property.id)}
                aria-label={`Remove ${property.location} from favourites`}
                title="Remove from favourites"
              >
                &times;
              </button>


            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

export default FavouritesSidebar