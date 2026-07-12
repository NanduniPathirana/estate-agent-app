import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/formatUtils.js'
import { useFavourites } from '../context/FavouritesContext.jsx'
import './PropertyCard.css'

// PropertyCard: a single result in the search results list.
// Shows a picture, short description, price, and links through to the
// full property page. Favourite button is added in a later step.
function PropertyCard({ property }) {

    const { addFavourite, isFavourite } = useFavourites()
    const favourited = isFavourite(property.id)

    // Makes the card draggable: stores the property id so the favourites
    // sidebar's drop handler knows which property was dropped on it.
    const handleDragStart = (e) => {
        e.dataTransfer.setData('text/plain', property.id)
    }

    const handleFavouriteClick = (e) => {
        e.preventDefault() // don't follow the link when clicking the button
        addFavourite(property.id)
    }


    return (
    <article className="property-card" draggable onDragStart={handleDragStart}>
      <Link to={`/property/${property.id}`} className="property-card-image-link">
        <img
          src={`${import.meta.env.BASE_URL}${property.images[0]}`}
          alt={`${property.type} at ${property.location}`}
          className="property-card-image"
        />
      </Link>

      <div className="property-card-body">
        <div className="property-card-top-row">
          <p className="property-card-price">{formatPrice(property.price)}</p>
          <button
            type="button"
            className={`favourite-btn ${favourited ? 'favourited' : ''}`}
            onClick={handleFavouriteClick}
            disabled={favourited}
            aria-label={favourited ? 'Already in favourites' : 'Add to favourites'}
            title={favourited ? 'Already in favourites' : 'Add to favourites'}
          >
            {favourited ? '★ Favourited' : '☆ Add to favourites'}
          </button>
        </div>

        <h3 className="property-card-title">
          <Link to={`/property/${property.id}`}>{property.location}</Link>
        </h3>

        <p className="property-card-meta">
          {property.type} · {property.bedrooms} bed · {property.postcodeArea}
        </p>

        <p className="property-card-description">{property.shortDescription}</p>
        <Link to={`/property/${property.id}`} className="property-card-link">
          View property &rarr;
        </Link>

      </div>
      
    </article>
  )
}

export default PropertyCard