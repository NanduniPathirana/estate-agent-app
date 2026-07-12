import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './PropertyTabs.css'

// PropertyTabs: organizes the property's long description, floor plan
// image, and an embedded Google Map into three tabs, so the detail page
// stays compact rather than showing everything stacked at once.
function PropertyTabs({ description, floorplan, mapQuery }) {
  const base = import.meta.env.BASE_URL
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`

  return (
    <Tabs className="property-tabs">
      <TabList>
        <Tab>Description</Tab>
        <Tab>Floor Plan</Tab>
        <Tab>Map</Tab>
      </TabList>

      <TabPanel>
        <p className="tab-description">{description}</p>
      </TabPanel>

      <TabPanel>
        <img
          src={`${base}${floorplan}`}
          alt="Property floor plan"
          className="tab-floorplan-image"
        />
      </TabPanel>

      <TabPanel>
        <iframe
          title="Property location map"
          src={mapSrc}
          className="tab-map-iframe"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </TabPanel>
    </Tabs>
  )
}

export default PropertyTabs