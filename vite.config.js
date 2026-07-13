import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves project sites from a subpath
  // (https://username.github.io/estate-agent-app/), so the production
  // build needs that subpath prefixed on every asset URL. Locally, though,
  // the dev server runs at the plain root (http://localhost:5173/), so
  // the base is only set to the subpath when actually building - not
  // during `npm run dev` - otherwise local image/asset URLs would 404.
  base: command === 'build' ? '/estate-agent-app/' : '/',
}))
