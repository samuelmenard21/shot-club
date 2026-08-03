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
// Titles are kept to ~50-60 chars. `crumb` is the breadcrumb label; `article:true`
// marks blog posts (get Article schema). `section` groups breadcrumb parents.
const PAGES = [
  { route: '/', crumb: 'Home', title: 'Hockey Shot Challenge — Track Every Shot, Climb Ranks',
    description: 'Off-ice hockey practice tracking for kids ages 6-18. Log your shots, climb team and global leaderboards, earn ranks, and get better every day.' },
  { route: '/for-clubs', crumb: 'For Clubs', title: 'Free Shot Challenge Platform for Hockey Clubs & Leagues',
    description: 'Run your club or association shot challenge on Hockey Shot Challenge. Free branded leaderboards, real-time tracking, zero setup hassle.' },
  { route: '/player', crumb: 'For Players', title: 'For Hockey Players — Track Shots, Climb Leaderboards',
    description: 'Free for players ages 6-18. Track your shots and stickhandling, build streaks, earn ranks, and compete with teammates.' },
  { route: '/coach', crumb: 'For Coaches', title: 'For Coaches — See Who Is Putting In the Work Off-Ice',
    description: 'Set up your team in 2 minutes. See who logged shots this week, shot counts by type, and 1v1 battle results. Free for coaches.' },
  { route: '/challenges', crumb: 'Challenges', title: 'Choose Your Hockey Shot Challenge — 1K to 10K',
    description: 'Pick your hockey challenge: 1,000 shot Rookie, 2,500 shot Pro, 5,000 shot Elite, 10,000 shot Hall of Famer, or a custom goal. Free tracking with live leaderboards.' },
  { route: '/1000-shot-rookie-challenge', crumb: '1,000 Shot Rookie Challenge', article: true,
    title: '1,000 Shot Rookie Challenge — Free Printable & Online Tracker',
    description: 'Free 1,000 shot Rookie Challenge tracker for young hockey players. Print the sheet or track it live. The perfect first off-ice challenge.',
    faq: [
      { q: 'How long does the 1,000 shot challenge take?', a: 'Most players finish in about 2 weeks at roughly 500 shots a week (~90 a day). It’s designed to be finishable fast.' },
      { q: 'What age is the 1,000 shot challenge for?', a: "Built for U7-U11, or any first-timer taking their first real run at off-ice training." },
      { q: 'Can we run this for free?', a: 'Yes. Hockey Shot Challenge is free for players, teams, and associations — printable tracker and online app both free.' },
    ] },
  { route: '/2500-shot-pro-challenge', crumb: '2,500 Shot Pro Challenge', article: true,
    title: '2,500 Shot Pro Challenge — Free Printable & Online Tracker',
    description: 'Free 2,500 shot Pro Challenge tracker. A 4-week step up from the Rookie challenge. Print the sheet or track it live with leaderboards.',
    faq: [
      { q: 'How long does the 2,500 shot challenge take?', a: 'Most players finish over 4 weeks at about 625 shots a week (~90 a day).' },
      { q: 'What age is the 2,500 shot challenge for?', a: 'A good fit for U9-U13, or any player ready to build on the Rookie habit.' },
      { q: 'Can we run this for free?', a: 'Yes. Hockey Shot Challenge is free for players, teams, and associations — printable tracker and online app both free.' },
    ] },
  { route: '/5000-shot-elite-challenge', crumb: '5,000 Shot Elite Challenge', article: true,
    title: '5,000 Shot Elite Challenge — Free Printable & Online Tracker',
    description: 'Free 5,000 shot Elite Challenge tracker. Log your shots, track progress, compete with teammates. Perfect for a summer of hockey training.',
    faq: [
      { q: 'How long does the 5,000 shot challenge take?', a: 'Most players finish over an 8-week summer at about 625 shots a week (~90 a day).' },
      { q: 'What age is the 5,000 shot challenge for?', a: "Popular with U11-U15. Younger players often start with the 1,000 or 2,500 Shot Challenge first." },
      { q: 'Can we run this for free?', a: 'Yes. Hockey Shot Challenge is free for players, teams, and associations — printable tracker and online app both free.' },
    ] },
  { route: '/10000-shot-hall-of-famer-challenge', crumb: '10,000 Shot Hall of Famer Challenge', article: true,
    title: '10,000 Shot Hall of Famer Challenge — Free Printable & Online',
    description: 'Free printable 10,000 shot Hall of Famer Challenge tracker + online app. Log your shots, track progress, compete with teammates. The classic summer challenge.',
    faq: [
      { q: 'How long does the 10,000 shot challenge take?', a: 'Most players finish over an 8-week summer at about 1,250 shots a week (~180 a day). Shoot more days and you finish sooner.' },
      { q: 'Is 10,000 shots realistic for a kid?', a: 'For dedicated U13 and up, yes — 1,250 a week is very doable off-ice. Younger players usually start with the 5,000 Shot Elite Challenge.' },
      { q: 'What age is the 10,000 shot challenge for?', a: "It's popular with U13-U18 players. For U9-U11, the 5,000 Shot Elite Challenge is a better first target. Clean mechanics matter more than volume." },
      { q: 'Can we run this for free?', a: 'Yes. Hockey Shot Challenge is free for players, teams, and associations — printable tracker and online app both free.' },
    ] },
  { route: '/association-partnership', crumb: 'Associations', title: 'Free Shot Challenge Tracking for Hockey Associations',
    description: "Run your association's 10,000 shot challenge on Hockey Shot Challenge. Free branded leaderboards, zero setup hassle. We handle the tech." },
  { route: '/province-wide-challenge', crumb: 'Province-Wide', title: 'Province-Wide Hockey Challenge Platform for Leagues',
    description: 'Run your province-wide 5K or 10K challenge digitally. Live leaderboards, real-time tracking. Free platform for OMHA, OWHA, and regional hockey organizations.' },
  { route: '/blog', crumb: 'Blog', title: 'Hockey Training Blog — Off-Ice Drills & Player Tips',
    description: 'Hockey training tips, off-ice drills, practice routines, and player development guides for youth hockey players and parents.' },
  { route: '/blog/7-off-ice-drills', crumb: '7 Off-Ice Drills', section: 'Blog', article: true,
    title: '7 Off-Ice Drills That Actually Improve Shot Accuracy (Tested by Coaches)',
    description: '7 proven off-ice hockey drills coaches recommend. Step-by-step instructions. Build accuracy and muscle memory at home.' },
  { route: '/blog/5-week-progression', crumb: '5-Week Progression', section: 'Blog', article: true,
    title: 'The 5-Week Hockey Progression: What Players Learn Each Week',
    description: 'Track your first 1,250 shots week-by-week. What happens week 1 vs week 5. How muscle memory builds.' },
  { route: '/blog/hockey-iq-vs-skill', crumb: 'Hockey IQ vs Skill', section: 'Blog', article: true,
    title: 'Hockey IQ vs Skill: 6 Ways Off-Ice Training Builds Both',
    description: 'Off-ice training does more than build strength. Here are 6 ways it builds hockey IQ and decision-making.' },
  { route: '/blog/burnout-prevention', crumb: 'Burnout Prevention', section: 'Blog', article: true,
    title: 'Hockey Burnout Prevention: 4 Signs Your Kid Is Overtraining',
    description: '4 signs of overtraining: injury frequency, loss of enthusiasm, plateaued progress, reduced game performance. How to fix it.' },
  { route: '/blog/80-20-finishers', crumb: 'The 80/20 Rule', section: 'Blog', article: true,
    title: 'The Hockey 80/20: Why 20% of Players Finish Their Challenge',
    description: 'What separates the 20% who finish from the 80% who quit. Spoiler: it\'s not talent.' },
  { route: '/blog/getting-started', crumb: 'Getting Started', section: 'Blog', article: true,
    title: 'Getting Started with Hockey Shot Challenge — Setup',
    description: 'How to set up your account, log your first shots, and start climbing the leaderboard on Hockey Shot Challenge.' },
  { route: '/blog/how-squad-battles-work', crumb: 'Squad Battles', section: 'Blog', article: true,
    title: 'How Squad Battles Work — Weekly 1v1 Hockey Battles',
    description: 'Every Monday players are matched against a rival. Whoever logs the most shots by Sunday wins. Here is how squad battles keep kids motivated.' },
  { route: '/blog/off-ice-drills', crumb: 'Off-Ice Drills', section: 'Blog', article: true,
    title: 'Top 5 Off-Ice Hockey Drills to Practice at Home',
    description: 'The best off-ice hockey drills: wrist shot accuracy, stickhandling, agility, footwork. No ice required.' },
  { route: '/blog/building-practice-routine', crumb: 'Practice Routine', section: 'Blog', article: true,
    title: 'Build a Consistent Hockey Practice Routine (No Burnout)',
    description: 'Age-based hockey practice schedules, the consistency formula, and burnout prevention for youth hockey players.' },
  { route: '/blog/parents-guide-youth-hockey', crumb: "Parent's Guide", section: 'Blog', article: true,
    title: "Parent's Guide to Youth Hockey Training & Development",
    description: 'What hockey coaches evaluate: shot accuracy, stickhandling, hockey IQ, work ethic, skating. Parent tips for player development.' },
  { route: '/blog/rookie-challenge', crumb: 'Rookie Challenge', section: 'Blog', article: true,
    title: 'The Rookie Challenge (1,000 Shots): Building Unstoppable Hockey Habits',
    description: 'Learn how 1,000 shots in 5-6 weeks builds real practice habits. What kids actually learn from the Rookie Challenge and when transformation happens.' },
  { route: '/blog/pro-challenge', crumb: 'Pro Challenge', section: 'Blog', article: true,
    title: 'The Pro Challenge (2,500 Shots): From Practice to Real Training',
    description: 'What happens when a player commits to 2,500 shots. How training transforms from casual to intentional, and what coaches notice.' },
  { route: '/blog/elite-challenge', crumb: 'Elite Challenge', section: 'Blog', article: true,
    title: 'The Elite Challenge (5,000 Shots): What It Actually Takes to Be Elite',
    description: 'At 5,000 shots, most quit. The ones who push through build something rare: mental toughness and mastery. Here\'s what happens.' },
  { route: '/blog/hall-of-famer-challenge', crumb: 'Hall of Famer Challenge', section: 'Blog', article: true,
    title: 'The Hall of Famer Challenge (10,000 Shots): Why Elite Athletes Never Stop Training',
    description: 'At 10,000 shots, mastery begins. Players become mentors. Habits become identity. Here\'s what happens when someone actually commits to elite-level training.' },
  { route: '/privacy', crumb: 'Privacy', title: 'Privacy Policy — Hockey Shot Challenge',
    description: 'Privacy policy and data handling practices for Hockey Shot Challenge.' },
]

// Build date, used for schema dateModified.
const TODAY = new Date().toISOString().slice(0, 10)
const PUBLISHER = {
  '@type': 'Organization',
  name: 'Hockey Shot Challenge',
  url: SITE,
  logo: { '@type': 'ImageObject', url: `${SITE}/apple-touch-icon.png` },
}

// Named human author for E-A-T. LinkedIn as sameAs establishes identity.
const AUTHOR = {
  '@type': 'Person',
  name: 'Sam Menard',
  url: 'https://www.linkedin.com/in/sammenard/',
  sameAs: ['https://www.linkedin.com/in/sammenard/'],
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

// Breadcrumb trail: Home › [Section] › This page.
function breadcrumbSchema(page) {
  const items = [{ name: 'Home', url: canonicalFor('/') }]
  if (page.section === 'Blog') items.push({ name: 'Blog', url: canonicalFor('/blog') })
  if (page.route !== '/') items.push({ name: page.crumb, url: canonicalFor(page.route) })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name, item: it.url,
    })),
  }
}

// Cloudflare Pages serves a prerendered directory route with a TRAILING SLASH:
// a request for /challenges 308-redirects to /challenges/. So every canonical,
// schema @id and sitemap entry must use the trailing-slash form. Emitting the
// bare form told Google "the canonical URL is this one" about a URL that
// immediately redirects, which is a well-known cause of
// "Discovered - currently not indexed" / "Page with redirect" in Search Console.
function canonicalFor(route) {
  if (route === '/') return `${SITE}/`
  return `${SITE}${route}/`
}

function buildSchema(page) {
  const url = canonicalFor(page.route)
  const schemas = []
  // Home already ships WebApplication + FAQPage schema in index.html; don't dupe.
  if (page.route !== '/') schemas.push(breadcrumbSchema(page))
  if (page.article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.title,
      description: page.description,
      author: AUTHOR,
      publisher: PUBLISHER,
      dateModified: TODAY,
      mainEntityOfPage: url,
      inLanguage: 'en',
    })
  }
  // Only emit FAQPage where the FAQ is actually visible on the page.
  if (page.faq && page.faq.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  return schemas
}

function schemaTags(page) {
  return buildSchema(page)
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n    ')
}

// The homepage's WebApplication + FAQPage schema lives in index.html (our
// template). Those describe the app/homepage, so strip them from every OTHER
// page — a blog post shouldn't carry FAQPage schema for FAQs it doesn't show.
function stripHomeSchema(html) {
  return html.replace(
    /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
    (block) => (/"WebApplication"|"FAQPage"/.test(block) ? '' : block)
  )
}

function applyHead(html, page) {
  const { route, title, description } = page
  const url = canonicalFor(route)
  const t = escapeAttr(title)
  const d = escapeAttr(description)
  let out = route === '/' ? html : stripHomeSchema(html)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${d}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${d}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${t}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${d}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta name="twitter:url" content=")[^"]*/, `$1${url}`)

  const tags = schemaTags(page)
  if (tags) out = out.replace('</head>', `    ${tags}\n  </head>`)
  return out
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
