import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext.jsx'
import './Header.css'

// Header: site-wide top bar. Shows a live favourites count badge next to
// the site title so the favourites list stays visible/prominent even when
// the user is on a property detail page, not just the search page.
function Header() {
  const { favourites } = useFavourites()

  return (
    <header className="site-header">
      <Link to="/" className="site-title">Estate Agent</Link>
      <Link to="/" className="favourites-badge" aria-label={`${favourites.length} favourites`}>
        ★ Favourites <span className="favourites-badge-count">{favourites.length}</span>
      </Link>
    </header>
  )
}

export default Header