import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FavouritesProvider, useFavourites } from './FavouritesContext.jsx'

// Small harness component that exposes the context's state/actions through
// the DOM so tests can interact with it the same way a real component would.
function Harness() {
  const { favourites, addFavourite, removeFavourite, clearFavourites, isFavourite } =
    useFavourites()

  return (
    <div>
      <p data-testid="count">{favourites.length}</p>
      <p data-testid="is-prop1-fav">{isFavourite('prop1') ? 'yes' : 'no'}</p>
      <button onClick={() => addFavourite('prop1')}>Add prop1</button>
      <button onClick={() => addFavourite('prop2')}>Add prop2</button>
      <button onClick={() => removeFavourite('prop1')}>Remove prop1</button>
      <button onClick={clearFavourites}>Clear all</button>
    </div>
  )
}

function renderWithProvider() {
  return render(
    <FavouritesProvider>
      <Harness />
    </FavouritesProvider>
  )
}

describe('FavouritesContext', () => {
  test('starts with an empty favourites list', () => {
    renderWithProvider()
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  test('addFavourite adds a property id', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByText('Add prop1'))

    expect(screen.getByTestId('count')).toHaveTextContent('1')
    expect(screen.getByTestId('is-prop1-fav')).toHaveTextContent('yes')
  })

  test('addFavourite does not add duplicates', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByText('Add prop1'))
    await user.click(screen.getByText('Add prop1'))
    await user.click(screen.getByText('Add prop1'))

    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  test('removeFavourite removes a specific property', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByText('Add prop1'))
    await user.click(screen.getByText('Add prop2'))
    expect(screen.getByTestId('count')).toHaveTextContent('2')

    await user.click(screen.getByText('Remove prop1'))
    expect(screen.getByTestId('count')).toHaveTextContent('1')
    expect(screen.getByTestId('is-prop1-fav')).toHaveTextContent('no')
  })

  test('clearFavourites empties the whole list', async () => {
    const user = userEvent.setup()
    renderWithProvider()

    await user.click(screen.getByText('Add prop1'))
    await user.click(screen.getByText('Add prop2'))
    await user.click(screen.getByText('Clear all'))

    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })
})