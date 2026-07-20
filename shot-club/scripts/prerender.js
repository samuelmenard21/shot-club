// Build-time static prerender.
//
// The app is a client-rendered Vite SPA, so without this every page ships an
// empty <body> — AI search crawlers and non-JS bots see no content. This script
// renders each PUBLIC route to real HTML via React's server renderer (Node, no
// headless browser) and writes it to dist/<route>/index.html. The client still
// boots via main.jsx and replaces the markup, so users get the full SPA.
//
// Authenticated/app routes (/home, /card, /coach/dashboard, /clubs/*, …) are
// intentionally NOT prerendered — they're user-specific and behind auth.

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const DIST = 'dist'
const SITE = 'https://hockeyshotchallenge.com'

// Public routes to prerender, with their per-page <head> metadata.
const PAGES = [
  { route: '/', title: 'Hockey Shot Challenge — Track every shot. Climb the rankings.',
    description: 'Off-ice hockey practice tracking for kids ages 6-18. Log your shots, climb team and global leaderboards, earn ranks, and get better every day.' },
  { route: '/for-clubs', title: 'Free 10K Shot Challenge Platform for Hockey Clubs & Associations',
    description: 'Run your club or association shot challenge on Hockey Shot Challenge. Free branded leaderboards, real-time tracking, zero setup hassle.' },
  { route: '/player', title: 'For Hockey Players — Track Shots, Climb Leaderboards',
    description: 'Free for players ages 6-18. Track your shots and stickhandling, build streaks, earn ranks, and compete with teammates.' },
  { route: '/coach', title: 'For Coaches — See Who Is Putting In the Work Off-Ice',
    description: 'Set up your team in 2 minutes. See who logged shots this week, shot counts by type, and 1v1 battle results. Free for coaches.' },
  { route: '/challenges', title: 'Choose Your Hockey Challenge — 5K, 10K, or Custom',
    description: 'Pick your hockey challenge: 5000 shot challenge, 10000 shot challenge, or create a custom goal. Free tracking with live leaderboards.' },
  { route: '/5000-shot-challenge', title: '5,000 Shot Challenge Tracker — Free Online Log Sheet',
    description: 'Free 5000 shot challenge tracker. Log your shots, track progress, compete with teammates. Perfect for a summer of hockey training.' },
  { route: '/10000-shot-challenge', title: '10,000 Shot Challenge Tracker — Free Printable & Online Tracker',
    description: 'Free printable 10000 shot challenge tracker + online app. Log your shots, track progress, compete with teammates. Perfect for summer hockey training.' },
  { route: '/association-partnership', title: 'Free 10K Challenge Tracking for Hockey Associations — Partner With Us',
    description: "Run your association's 10,000 shot challenge on Hockey Shot Challenge. Free branded leaderboards, zero setup hassle. We handle the tech." },
  { route: '/province-wide-challenge', title: 'Province-Wide Hockey Challenge Platform — For Leagues & Associations',
    description: 'Run your province-wide 5K or 10K challenge digitally. Live leaderboards, real-time tracking. Free platform for OMHA, OWHA, and regional hockey organizations.' },
  { route: '/blog', title: 'Hockey Training Blog — Off-Ice Drills, Practice Routines, Player Development',
    description: 'Hockey training tips, off-ice drills, practice routines, and player development guides for youth hockey players and parents.' },
  { route: '/blog/getting-started', title: 'Getting Started with Hockey Shot Challenge',
    description: 'How to set up your account, log your first shots, and start climbing the leaderboard on Hockey Shot Challenge.' },
  { route: '/blog/how-squad-battles-work', title: 'How Squad Battles Work — Weekly 1v1 Hockey Challenges',
    description: 'Every Monday players are matched against a rival. Whoever logs the most shots by Sunday wins. Here is how squad battles keep kids motivated.' },
  { route: '/blog/off-ice-drills', title: 'Top 5 Off-Ice Hockey Drills Your Kid Can Practice at Home',
    description: 'The best off-ice hockey drills: wrist shot accuracy, stickhandling, agility, footwork. No ice required.' },
  { route: '/blog/building-practice-routine', title: 'How to Build a Consistent Hockey Practice Routine (Without Burnout)',
    description: 'Age-based hockey practice schedules, the consistency formula, and burnout prevention for youth hockey players.' },
  { route: '/blog/parents-guide-youth-hockey', title: "Parent's Guide to Youth Hockey Training: What Coaches Actually Look For",
    description: 'What hockey coaches evaluate: shot accuracy, stickhandling, hockey IQ, work ethic, skating. Parent tips for player development.' },
  { route: '/privacy', title: 'Privacy Policy — Hockey Shot Challenge',
    description: 'Privacy policy and data handling practices for Hockey Shot Challenge.' },
]

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function applyHead(html, { route, title, description }) {
  const url = `${SITE}${route}`
  const t = escapeAttr(title)
  const d = escapeAttr(description)
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${d}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${d}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${d}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta name="twitter:url" content=")[^"]*/, `$1${url}`)
}

async function main() {
  console.log('🖥️  Prerendering public routes…')

  const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8')
  const serverEntry = pathToFileURL(path.resolve('dist-server/entry-server.js')).href
  const { render } = await import(serverEntry)

  let ok = 0
  for (const page of PAGES) {
    try {
      const appHtml = render(page.route)
      if (!appHtml || appHtml.length < 200) {
        throw new Error(`rendered body suspiciously short (${appHtml?.length || 0} chars)`)
      }
      let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
      html = applyHead(html, page)

      const outPath = page.route === '/'
        ? path.join(DIST, 'index.html')
        : path.join(DIST, page.route, 'index.html')
      fs.mkdirSync(path.dirname(outPath), { recursive: true })
      fs.writeFileSync(outPath, html)
      console.log(`✅ ${page.route}  (${appHtml.length.toLocaleString()} chars)`)
      ok++
    } catch (err) {
      console.error(`❌ ${page.route}: ${err.message}`)
      throw err // fail the build so we notice — empty pages are the whole problem
    }
  }
  console.log(`🖥️  Prerendered ${ok}/${PAGES.length} routes`)
}

main().catch((err) => {
  console.error('❌ Prerender failed:', err)
  process.exit(1)
})
