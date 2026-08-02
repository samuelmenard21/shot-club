// Cloudflare Pages Function for /clubs/:slug/:challenge-tracker
//
// A club-branded printable sheet, generated at request time from the same
// static tracker HTML gen-trackers.mjs already builds — no per-club files,
// so this scales to all ~3,000 clubs (and any added later) with zero build
// step. Same edge-templating trick as functions/clubs/[slug].js: fetch the
// built asset, rewrite it with HTMLRewriter before it leaves the edge.
//
// The QR code is regenerated (not just relinked) so a scan carries the club
// slug straight into signup (?club=<slug>), which AuthScreen already uses to
// pre-fill and group the player under that club/association.
import qrcode from 'qrcode-generator'

const SITE = 'https://hockeyshotchallenge.com'

const CHALLENGE_META = {
  '1k': { label: 'Rookie', total: 1000 },
  '2_5k': { label: 'Pro', total: 2500 },
  '5k': { label: 'Elite', total: 5000 },
  '10k': { label: 'Hall of Famer', total: 10000 },
}

// Same heuristic as functions/clubs/[slug].js — keep the two in sync, this is
// the only place a club's display name comes from for either page.
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

function qrSvg(url) {
  const qr = qrcode(0, 'M')
  qr.addData(url)
  qr.make()
  return qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true })
}

class TextRewriter {
  constructor(value) { this.value = value }
  element(el) { el.setInnerContent(this.value) }
}

class HtmlRewriterEl {
  constructor(value) { this.value = value }
  element(el) { el.setInnerContent(this.value, { html: true }) }
}

class HeadAppender {
  constructor(html) { this.html = html }
  element(el) { el.append(this.html, { html: true }) }
}

export async function onRequest(context) {
  const { request, params, env } = context
  const { slug, challenge } = params
  const meta = CHALLENGE_META[challenge]
  if (!meta) return new Response('Not found', { status: 404 })

  const response = await env.ASSETS.fetch(new URL(`/${challenge}-tracker.html`, request.url))
  const contentType = response.headers.get('content-type') || ''
  if (!response.ok || !contentType.includes('text/html')) return response

  const clubName = titleFromSlug(slug)
  const totalStr = meta.total.toLocaleString()
  const canonical = `${SITE}/clubs/${slug}/${challenge}-tracker`
  const title = `${clubName} — ${totalStr} Shot Challenge Printable Tracker`
  const description = `Free printable ${totalStr}-shot (${meta.label}) tracker for ${clubName} players. Print it, color a box every practice, or scan the QR to track online as part of ${clubName}.`
  const trackerUrl = `hockeyshotchallenge.com/start?challenge=${challenge}&club=${slug}&src=clubprint`
  const qr = qrSvg(`https://${trackerUrl}`)

  return new HTMLRewriter()
    .on('head', new HeadAppender(
      `<meta name="description" content="${description.replace(/"/g, '&quot;')}">` +
      `<link rel="canonical" href="${canonical}">`
    ))
    .on('title', new TextRewriter(`${title}`))
    .on('.banner-sub', new TextRewriter(
      `Color a box every practice. Printed for ${clubName} — scan below to join their team online.`
    ))
    .on('.qrtxt h3', new TextRewriter(`Scan, sign in with Google, and join ${clubName} online`))
    .on('.qrtxt .path', new TextRewriter(trackerUrl))
    .on('.qrbox', new HtmlRewriterEl(qr))
    .on('.footbar', new TextRewriter(
      `HockeyShotChallenge.com — free printable tracker for ${clubName}. Print it, stick it on the fridge, or track it live online.`
    ))
    .transform(response)
}
