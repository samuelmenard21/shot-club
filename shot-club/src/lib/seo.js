// Dynamic SEO meta tag management for the SPA

const CANONICAL_URL = 'https://hockeyshotchallenge.com'
const DEFAULT_TITLE = 'Hockey Shot Challenge — Track every shot. Climb the rankings.'
const DEFAULT_DESCRIPTION = 'Off-ice hockey practice tracking for kids ages 6-18. Log your shots, climb team and global leaderboards, earn ranks, and get better every day.'
const DEFAULT_IMAGE = `${CANONICAL_URL}/og-image.png`

function setMeta(attr, key, content) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setLink(rel, href) {
  let link = document.querySelector(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

export function setSEO({
  title,
  description,
  image,
  url,
  type = 'website',
  noindex = false,
} = {}) {
  const fullTitle = title ? `${title} · Hockey Shot Challenge` : DEFAULT_TITLE
  const fullDesc = description || DEFAULT_DESCRIPTION
  const fullImage = image || DEFAULT_IMAGE
  const fullUrl = url || `${CANONICAL_URL}${typeof window !== 'undefined' ? window.location.pathname : ''}`

  document.title = fullTitle

  setMeta('name', 'description', fullDesc)
  setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

  // Open Graph
  setMeta('property', 'og:title', fullTitle)
  setMeta('property', 'og:description', fullDesc)
  setMeta('property', 'og:image', fullImage)
  setMeta('property', 'og:url', fullUrl)
  setMeta('property', 'og:type', type)
  setMeta('property', 'og:site_name', 'Hockey Shot Challenge')

  // Twitter
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', fullTitle)
  setMeta('name', 'twitter:description', fullDesc)
  setMeta('name', 'twitter:image', fullImage)

  // Canonical
  setLink('canonical', fullUrl)
}

export function addStructuredData(data) {
  // Remove any existing JSON-LD added by us
  const existing = document.querySelector('script[data-seo-jsonld]')
  if (existing) existing.remove()

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-seo-jsonld', 'true')
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

export { CANONICAL_URL, DEFAULT_TITLE, DEFAULT_DESCRIPTION }
