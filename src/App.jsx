import { Routes, Route, Link } from 'react-router-dom'
import SearchPage from './pages/SearchPage.jsx'
import PropertyPage from './pages/PropertyPage.jsx'
import './App.css'

// Root application component. Defines the top-level routes:
// "/"           -> search page (form + results + favourites)
// "/property/:id" -> single property detail page (gallery + tabs)
function App() {
  return (
    <div className="app">
      <header className="site-header">
        <Link to="/" className="site-title">Estate Agent</Link>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
