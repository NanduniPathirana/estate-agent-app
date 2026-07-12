import { useParams } from 'react-router-dom'

// PropertyPage: individual property detail page, shown when a user clicks
// a property from the search results. Uses the property's id from the URL.
function PropertyPage() {
  const { id } = useParams()

  return (
    <div className="property-page">
      <h1>Property Details</h1>
      <p>Showing details for property id: {id}</p>
      <p>Gallery and tabs (description / floor plan / map) coming in later steps.</p>
    </div>
  )
}

export default PropertyPage
