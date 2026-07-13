import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { FavouritesProvider } from '../context/FavouritesContext.jsx'
import PropertyCard from './PropertyCard.jsx'

const property = {
  id: 'prop1',
  type: 'Flat',
  bedrooms: 2,
  price: 399995,
  postcodeArea: 'BR6',
  location: 'Crofton Road, Orpington BR6',
  shortDescription: 'Two double bedroom garden flat.',
  images: ['images/prop2/img1.jpg'],
}

function renderCard() {
  return render(
    <MemoryRouter>
      <FavouritesProvider>
        <PropertyCard property={property} />
      </FavouritesProvider>
    </MemoryRouter>
  )
}

describe('PropertyCard', () => {
  test('displays the property price, location and description', () => {
    renderCard()
    expect(screen.getByText('£399,995')).toBeInTheDocument()
    expect(screen.getByText('Crofton Road, Orpington BR6')).toBeInTheDocument()
    expect(screen.getByText('Two double bedroom garden flat.')).toBeInTheDocument()
  })

  test('clicking "Add to favourites" marks the property as favourited and disables the button', async () => {
    const user = userEvent.setup()
    renderCard()

    const button = screen.getByRole('button', { name: /add to favourites/i })
    await user.click(button)

    expect(screen.getByRole('button', { name: /already in favourites/i })).toBeDisabled()
    expect(screen.getByText('★ Favourited')).toBeInTheDocument()
  })
})