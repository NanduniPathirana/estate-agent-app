import { createContext, useContext, useState } from 'react'

const FavouritesContext = createContext(null)

// FavouritesProvider: holds the list of favourited property IDs in memory
// and exposes functions to add/remove/clear them. Wrapping the app in this
// provider lets both the results list and the favourites sidebar share the
// same favourites state without prop-drilling.
export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]) // array of property id strings

  // Guards against duplicates: only adds the id if it isn't already present.
  const addFavourite = (id) => {
    setFavourites((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((favId) => favId !== id))
  }

  const clearFavourites = () => setFavourites([])

  const isFavourite = (id) => favourites.includes(id)

  const value = { favourites, addFavourite, removeFavourite, clearFavourites, isFavourite }

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
}

// Convenience hook so components just call useFavourites() instead of
// importing useContext + FavouritesContext everywhere.
export function useFavourites() {
  const context = useContext(FavouritesContext)
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider')
  }
  return context
}