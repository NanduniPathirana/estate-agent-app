
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FavouritesProvider } from '../context/FavouritesContext.jsx'
import ResultsList from './ResultsList.jsx'

const sampleProperties = [
  {
    id: 'prop1',
    type: 'House',
    bedrooms: 3,
    price: 500000,
    postcodeArea: 'BR5',
    location: 'Test Road, Test Town BR5',
    shortDescription: 'A lovely test house.',
    images: ['images/prop1/img1.jpg'],
  },
]

// Helper to render with the providers ResultsList's children (PropertyCard)
// depend on: routing (for Link) and favourites context (for the button).
function renderWithProviders(ui) {
  return render(
    <MemoryRouter>
      <FavouritesProvider>{ui}</FavouritesProvider>
    </MemoryRouter>
  )
}

describe('ResultsList', () => {
  test('shows a friendly message when there are no matching properties', () => {
    renderWithProviders(<ResultsList properties={[]} />)
    expect(
      screen.getByText(/no properties match your search criteria/i)
    ).toBeInTheDocument()
  })

  test('renders a result card for each matching property', () => {
    renderWithProviders(<ResultsList properties={sampleProperties} />)
    expect(screen.getByText('Test Road, Test Town BR5')).toBeInTheDocument()
    expect(screen.getByText('A lovely test house.')).toBeInTheDocument()
  })

  test('shows the correct singular/plural result count', () => {
    renderWithProviders(<ResultsList properties={sampleProperties} />)
    expect(screen.getByText('1 property found')).toBeInTheDocument()
  })
})