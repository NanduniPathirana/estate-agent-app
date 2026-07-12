import { Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage.jsx'
import PropertyPage from './pages/PropertyPage.jsx'
import Header from './components/Header.jsx'
import { FavouritesProvider } from './context/FavouritesContext.jsx'
import './App.css'

// Root application component. Defines the top-level routes:
// "/"           -> search page (form + results + favourites)
// "/property/:id" -> single property detail page (gallery + tabs)
function App() {
  return (
    <FavouritesProvider>
      <div className="app">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/property/:id" element={<PropertyPage />} />
          </Routes>
        </main>
      </div>
    </FavouritesProvider>
  )
}

export default App
