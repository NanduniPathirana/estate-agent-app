import { Link } from 'react-router-dom'
import { formatPrice } from '../utils/formatUtils.js'
import './PropertyCard.css'

// PropertyCard: a single result in the search results list.
// Shows a picture, short description, price, and links through to the
// full property page. Favourite button is added in a later step.
function PropertyCard({ property }) {
  return (
    <article className="property-card">
      <Link to={`/property/${property.id}`} className="property-card-image-link">
        <img
          src={`${import.meta.env.BASE_URL}${property.images[0]}`}
          alt={`${property.type} at ${property.location}`}
          className="property-card-image"
        />
      </Link>

      <div className="property-card-body">
        <p className="property-card-price">{formatPrice(property.price)}</p>
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