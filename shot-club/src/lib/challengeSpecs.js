// Single source of truth for the shot challenges.
//
// Both the printable trackers (scripts/gen-trackers.mjs) and the in-app grid
// (components/TrackerGrid.jsx) read from here, so the digital sheet is always
// the same shape as the paper one: same box count, same shots-per-box, same
// medals in the same positions. If these ever drift, the "scan the sheet and
// it comes alive" promise breaks.
//
// Keep this file free of browser/node-specific APIs — the build script imports it.

// Colors below are the literal hex values of the new "Organic" design-system
// tokens (cream/terracotta/sage), pinned here because this file is imported
// by both the Node build script (gen-trackers.mjs, no CSS custom properties)
// and the browser component — one literal source both can read identically.
// tint = light card/header background; badge = solid tier-level pill;
// badgeFg = text on the badge; accentText = kicker/label text on the tint.
export const CHALLENGE_SPECS = {
  '1k': {
    id: '1k',
    total: 1000,
    step: 50,        // shots per box
    cols: 5,         // grid columns -> 20 boxes (4 rows)
    tint: '#f0fae1', badge: '#728157', badgeFg: '#f5ead8', accentText: '#56633f',
    label: 'Rookie',
    shortLabel: 'Rookie · 1,000 shots',
    weeks: 3,
    blurb: 'Finish in 3 weeks at 50 shots a day and get hooked',
    landingPath: '/1000-shot-rookie-challenge',
  },
  '2_5k': {
    id: '2_5k',
    total: 2500,
    step: 50,
    cols: 10,        // 50 boxes (5 rows)
    tint: '#fff2eb', badge: '#b2622d', badgeFg: '#f5ead8', accentText: '#8c491a',
    label: 'Pro',
    shortLabel: 'Pro · 2,500 shots',
    weeks: 4,
    blurb: 'Step up after Rookie, or a quick 4-week sprint',
    landingPath: '/2500-shot-pro-challenge',
  },
  '5k': {
    id: '5k',
    total: 5000,
    step: 100,
    cols: 10,        // 50 boxes (5 rows)
    tint: '#ffe1d0', badge: '#643312', badgeFg: '#f5ead8', accentText: '#643312',
    label: 'Elite',
    shortLabel: 'Elite · 5,000 shots',
    weeks: 7,
    blurb: 'A solid summer of work at 100 shots a day',
    landingPath: '/5000-shot-elite-challenge',
  },
  '10k': {
    id: '10k',
    total: 10000,
    step: 200,
    cols: 10,        // 50 boxes (5 rows)
    tint: '#eee7db', badge: '#2e2b25', badgeFg: '#ffc6a5', accentText: '#474238',
    label: 'Hall of Famer',
    shortLabel: 'Hall of Famer · 10,000 shots',
    weeks: 7,
    blurb: 'The classic summer challenge at 200 shots a day',
    landingPath: '/10000-shot-hall-of-famer-challenge',
  },
}

export const CHALLENGE_ORDER = ['1k', '2_5k', '5k', '10k']

export const CHALLENGE_LIST = CHALLENGE_ORDER.map((id) => CHALLENGE_SPECS[id])

// Medals land on the box that completes each quarter of the challenge, so the
// paper sheet and the app highlight the exact same squares.
//
// The box index is snapped to a whole box and the shot count is derived FROM
// that box — never the other way round. A raw quarter can fall between boxes
// (2,500 / 50 = 50 boxes, so 25% is box 12.5), and a medal on a half-box
// simply never renders.
export function milestonesFor(spec) {
  const boxes = spec.total / spec.step
  const medals = [
    { emoji: '🥉', name: 'Bronze', pct: 0.25 },
    { emoji: '🥈', name: 'Silver', pct: 0.5 },
    { emoji: '🥇', name: 'Gold', pct: 0.75 },
    { emoji: '🏆', name: 'Challenge complete', pct: 1 },
  ]
  return medals.map(({ emoji, name, pct }) => {
    const box = Math.round(boxes * pct)
    return { emoji, name, box, at: box * spec.step }
  })
}

export function boxCount(spec) {
  return spec.total / spec.step
}

export function getSpec(id) {
  return CHALLENGE_SPECS[id] || null
}

// Maps a challenge id to its printable. Kept here so links can't go stale.
//
// autoPrint adds ?print=1, which makes the sheet open the print dialog straight
// away. Use it for in-app "get the printable" buttons. Plain links (and search
// traffic, since these pages are in the sitemap) get a readable page with a
// visible Print button instead.
export function printableHref(id, { autoPrint = false } = {}) {
  return `/${id}-tracker.html${autoPrint ? '?print=1' : ''}`
}

// Weekly pace we advertise, derived rather than hand-typed.
export function weeklyPace(spec) {
  return Math.round(spec.total / spec.weeks)
}
