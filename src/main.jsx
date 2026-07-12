import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// HashRouter is used instead of BrowserRouter because the app is deployed
// as a static site on GitHub Pages, which does not support server-side
// rewrites needed for client-side routing with clean URLs.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
