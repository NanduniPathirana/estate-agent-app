import { useState } from 'react'
import { DropdownList, NumberPicker, DatePicker, Combobox } from 'react-widgets'
import { PROPERTY_TYPES, POSTCODE_AREAS } from '../data/constants.js'
import './SearchForm.css'

// Default/empty search criteria. All fields are optional - the search
// should work correctly whether the user fills in 1 field or all of them.
const emptyCriteria = {
  type: 'Any',
  minPrice: null,
  maxPrice: null,
  minBedrooms: null,
  maxBedrooms: null,
  dateMode: 'any', // 'any' | 'after' | 'between'
  dateAfter: null,
  dateFrom: null,
  dateTo: null,
  postcodeArea: '',
}

// SearchForm: collects the user's search criteria and hands it up to the
// parent (SearchPage) via onSearch, only when the user submits the form.
// Keeping the criteria as local state until submit avoids re-filtering the
// whole property list on every keystroke.
function SearchForm({ onSearch }) {
  const [criteria, setCriteria] = useState(emptyCriteria)

  const updateField = (field, value) => {
    setCriteria((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(criteria)
  }

  const handleReset = () => {
    setCriteria(emptyCriteria)
    onSearch(emptyCriteria)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <h2>Search Properties</h2>

      <div className="search-form-grid">
        {/* Property type */}
        <label className="form-field">
          <span>Property Type</span>
          <DropdownList
            data={PROPERTY_TYPES}
            value={criteria.type}
            onChange={(value) => updateField('type', value)}
          />
        </label>

        {/* Postcode area */}
        <label className="form-field">
          <span>Postcode Area</span>
          <Combobox
            data={POSTCODE_AREAS}
            value={criteria.postcodeArea}
            onChange={(value) => updateField('postcodeArea', value || '')}
            placeholder="e.g. BR1"
            hideCaret={false}
          />
        </label>

        {/* Price range */}
        <label className="form-field">
          <span>Min Price (£)</span>
          <NumberPicker
            value={criteria.minPrice}
            onChange={(value) => updateField('minPrice', value)}
            min={0}
            step={5000}
            placeholder="No minimum"
          />
        </label>

        <label className="form-field">
          <span>Max Price (£)</span>
          <NumberPicker
            value={criteria.maxPrice}
            onChange={(value) => updateField('maxPrice', value)}
            min={0}
            step={5000}
            placeholder="No maximum"
          />
        </label>

        {/* Bedroom range */}
        <label className="form-field">
          <span>Min Bedrooms</span>
          <NumberPicker
            value={criteria.minBedrooms}
            onChange={(value) => updateField('minBedrooms', value)}
            min={0}
            max={10}
            placeholder="Any"
          />
        </label>

        <label className="form-field">
          <span>Max Bedrooms</span>
          <NumberPicker
            value={criteria.maxBedrooms}
            onChange={(value) => updateField('maxBedrooms', value)}
            min={0}
            max={10}
            placeholder="Any"
          />
        </label>

        {/* Date added mode */}
        <label className="form-field">
          <span>Date Added</span>
          <DropdownList
            data={[
              { label: 'Any time', value: 'any' },
              { label: 'After a date', value: 'after' },
              { label: 'Between two dates', value: 'between' },
            ]}
            dataKey="value"
            textField="label"
            value={criteria.dateMode}
            onChange={(item) => updateField('dateMode', item.value)}
          />
        </label>

        {/* Conditional date pickers depending on dateMode */}
        {criteria.dateMode === 'after' && (
          <label className="form-field">
            <span>Added after</span>
            <DatePicker
              value={criteria.dateAfter}
              onChange={(value) => updateField('dateAfter', value)}
              placeholder="Choose a date"
            />
          </label>
        )}

        {criteria.dateMode === 'between' && (
          <>
            <label className="form-field">
              <span>From</span>
              <DatePicker
                value={criteria.dateFrom}
                onChange={(value) => updateField('dateFrom', value)}
                placeholder="Start date"
              />
            </label>
            <label className="form-field">
              <span>To</span>
              <DatePicker
                value={criteria.dateTo}
                onChange={(value) => updateField('dateTo', value)}
                placeholder="End date"
              />
            </label>
          </>
        )}
      </div>

      <div className="search-form-actions">
        <button type="submit" className="btn btn-primary">Search</button>
        <button type="button" className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  )
}

export default SearchForm