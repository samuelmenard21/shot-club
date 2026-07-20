// Server entry for static prerendering (build-time only, runs under Node).
// Renders the same App under a StaticRouter so each public route produces real
// HTML content. The client still boots normally via main.jsx (createRoot), which
// replaces this markup on load — so crawlers get content, users get the SPA.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}
