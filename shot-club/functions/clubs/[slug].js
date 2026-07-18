// Cloudflare Pages Function for /clubs/:slug
//
// The app is a client-rendered SPA, so without this every club URL would be
// served the static index.html — whose <link rel="canonical"> points at the
// homepage. Googlebot reads that raw-HTML canonical and files every club page
// under "Alternative page with proper canonical tag" (i.e. refuses to index
// them). This function rewrites the per-page SEO tags in the raw HTML response
// so each club page is self-canonical before any JS runs. The React app still
// hydrates normally and overwrites these tags client-side with live club data.

const SITE = 'https://hockeyshotchallenge.com'

// Turn "santa-clara-blackhawks-caha" into "Santa Clara Blackhawks (CAHA)".
// The trailing token is the association code — uppercase it in parens.
function titleFromSlug(slug) {
  const tokens = slug.split('-').filter(Boolean)
  if (tokens.length === 0) return 'Hockey Club'

  const last = tokens[tokens.length - 1]
  const looksLikeCode = /^[a-z0-9]{2,5}$/.test(last) && tokens.length > 1

  const nameTokens = looksLikeCode ? tokens.slice(0, -1) : tokens
  const name = nameTokens
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .join(' ')

  return looksLikeCode ? `${name} (${last.toUpperCase()})` : name
}

class AttrRewriter {
  constructor(attr, value) {
    this.attr = attr
    this.value = value
  }
  element(el) {
    el.setAttribute(this.attr, this.value)
  }
}

class TextRewriter {
  constructor(value) {
    this.value = value
  }
  element(el) {
    el.setInnerContent(this.value)
  }
}

export async function onRequest(context) {
  const { request, params, env } = context
  const slug = params.slug

  // Fetch the built static index.html for this route.
  const response = await env.ASSETS.fetch(new Request(new URL('/', request.url), request))

  // Only rewrite successful HTML responses.
  const contentType = response.headers.get('content-type') || ''
  if (!response.ok || !contentType.includes('text/html')) {
    return response
  }

  const clubName = titleFromSlug(slug)
  const canonical = `${SITE}/clubs/${slug}`
  const title = `${clubName} — Hockey Shot Challenge`
  const description = `${clubName} players track off-ice shots and stickhandling on Hockey Shot Challenge — free team leaderboards, ranks, and skill videos.`

  return new HTMLRewriter()
    .on('link[rel="canonical"]', new AttrRewriter('href', canonical))
    .on('meta[property="og:url"]', new AttrRewriter('content', canonical))
    .on('meta[name="twitter:url"]', new AttrRewriter('content', canonical))
    .on('meta[property="og:title"]', new AttrRewriter('content', title))
    .on('meta[name="twitter:title"]', new AttrRewriter('content', title))
    .on('meta[name="description"]', new AttrRewriter('content', description))
    .on('meta[property="og:description"]', new AttrRewriter('content', description))
    .on('meta[name="twitter:description"]', new AttrRewriter('content', description))
    .on('title', new TextRewriter(title))
    .transform(response)
}
