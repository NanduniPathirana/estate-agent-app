# Estate Agent Web Application

A client-side property search application built with React and Vite, inspired by rightmove.co.uk.
Built for 5COSC026W Advanced Client-side Web Development coursework.

## Features
- Search properties by type, price range, bedroom range, date added, and postcode area
- Enhanced search form built with React Widgets
- Property results with image, short description, and price
- Individual property pages with image gallery, floor plan, and Google Map (via tabs)
- Favourites list: add/remove via button or drag-and-drop, with duplicate prevention
- Responsive design (large screen and small/tablet layouts)
- Client-side security: Content-Security-Policy, JSX auto-escaping
- Jest test suite covering core logic

## Tech Stack
- React (Vite)
- React Router (HashRouter, for GitHub Pages compatibility)
- React Widgets (enhanced form controls)
- React Tabs (property detail tabs)
- Jest + React Testing Library

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

## Running Tests

\`\`\`bash
npm test
\`\`\`

## Building for Production

\`\`\`bash
npm run build
\`\`\`

## Deployment
Deployed to GitHub Pages: (link added after deployment step)

## Data
Property data is stored locally in `src/data/properties.json` (7 properties, no backend/server used,
as required by the coursework spec). Images are placeholder photos generated for demonstration purposes.