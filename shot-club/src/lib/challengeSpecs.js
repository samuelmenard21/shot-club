// Single source of truth for the shot challenges.
//
// Both the printable trackers (scripts/gen-trackers.mjs) and the in-app grid
// (components/TrackerGrid.jsx) read from here, so the digital sheet is always
// the same shape as the paper one: same box count, same shots-per-box, same
// medals in the same positions. If these ever drift, the "scan the sheet and
// it comes alive" promise breaks.
//
// Keep this file free of browser/node-specific APIs — the build script imports it.

export const CHALLENGE_SPECS = {
  '1k': {
    id: '1k',
    total: 1000,
    step: 50,        // shots per box
    cols: 5,         // grid columns -> 20 boxes (4 rows)
    accent: '#27ae60',
    label: 'Rookie',
    shortLabel: '1K Rookie',
    weeks: 2,
    blurb: 'Finish in a couple weeks and get hooked',
  },
  '2_5k': {
    id: '2_5k',
    total: 2500,
    step: 50,
    cols: 10,        // 50 boxes (5 rows)
    accent: '#8b5cf6',
    label: 'Intermediate',
    shortLabel: '2.5K Intermediate',
    weeks: 4,
    blurb: 'Step up after the 1K, or a quick 4-week sprint',
  },
  '5k': {
    id: '5k',
    total: 5000,
    step: 50,
    cols: 10,        // 100 boxes (10 rows)
    accent: '#ff7a29',
    label: 'Advanced',
    shortLabel: '5K Advanced',
    weeks: 8,
    blurb: 'A full summer of work',
  },
  '10k': {
    id: '10k',
    total: 10000,
    step: 100,
    cols: 10,        // 100 boxes (10 rows)
    accent: '#2979ff',
    label: 'Hall of Famer',
    shortLabel: '10K Hall of Famer',
    weeks: 8,
    blurb: 'The classic summer challenge',
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
export function printableHref(id) {
  return `/${id}-tracker.html`
}

// Weekly pace we advertise, derived rather than hand-typed.
export function weeklyPace(spec) {
  return Math.round(spec.total / spec.weeks)
}
