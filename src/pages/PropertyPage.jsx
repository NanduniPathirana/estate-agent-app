import { useParams, Link } from 'react-router-dom'
import propertiesData from '../data/properties.json'
import PropertyGallery from '../components/PropertyGallery.jsx'
import PropertyTabs from '../components/PropertyTabs.jsx'
import { formatPrice } from '../utils/formatUtils.js'
import './PropertyPage.css'

// PropertyPage: individual property detail page, shown when a user clicks
// a property from the search results. Uses the property's id from the URL.
function PropertyPage() {
  const { id } = useParams()
  const property = propertiesData.properties.find((p) => p.id === id)

  if (!property) {
    return (
      <div className="property-page">
        <p>Sorry, we couldn't find that property.</p>
        <Link to="/">&larr; Back to search</Link>
      </div>
    )
  }

  return (
    <div className="property-page">
      <Link to="/" className="back-link">&larr; Back to search results</Link>

      <PropertyGallery
        images={property.images}
        altText={`${property.type} at ${property.location}`}
      />

      <div className="property-summary">
        <p className="property-summary-price">{formatPrice(property.price)}</p>
        <h1 className="property-summary-location">{property.location}</h1>
        <p className="property-summary-meta">
          {property.type} · {property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''} ·{' '}
          {property.tenure} · {property.postcodeArea}
        </p>
      </div>

      <PropertyTabs
        description={property.description}
        floorplan={property.floorplan}
        mapQuery={property.mapQuery}
      />

    </div>
  )
}


export default PropertyPage
