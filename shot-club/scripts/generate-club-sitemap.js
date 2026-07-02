// scripts/generate-club-sitemap.js
//
// Build-time sitemap generator.
// Pulls all clubs from Supabase and writes three sitemap files:
//   - public/sitemap-clubs.xml     (all per-club landing pages)
//   - public/sitemap-static.xml    (homepage + key pages)
//   - public/sitemap.xml           (sitemap index pointing to the others)
//
// Required env vars:
//   SUPABASE_URL       — same value as VITE_SUPABASE_URL
//   SUPABASE_ANON_KEY  — same value as VITE_SUPABASE_ANON_KEY
//
// Runs in Netlify's build environment before `vite build`.

import { createClient } from '@supabase/supabase-js'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE_URL = 'https://hockeyshotchallenge.com'

// Static pages of the site — these always exist and should always be in the sitemap
const STATIC_PAGES = [
  { loc: '/',          priority: '1.0', changefreq: 'weekly'  },
  { loc: '/for-clubs', priority: '0.9', changefreq: 'monthly' },
  { loc: '/player',    priority: '0.8', changefreq: 'monthly' },
  { loc: '/coach',     priority: '0.7', changefreq: 'monthly' },
  { loc: '/start',     priority: '0.6', changefreq: 'monthly' },
]

const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)
const PUBLIC_DIR = join(__dirname, '..', 'public')

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildUrlEntry({ loc, lastmod, changefreq, priority }) {
  const parts = [
    `  <url>`,
    `    <loc>${escapeXml(loc)}</loc>`,
  ]
  if (lastmod)    parts.push(`    <lastmod>${escapeXml(lastmod)}</lastmod>`)
  if (changefreq) parts.push(`    <changefreq>${escapeXml(changefreq)}</changefreq>`)
  if (priority)   parts.push(`    <priority>${escapeXml(priority)}</priority>`)
  parts.push(`  </url>`)
  return parts.join('\n')
}

async function fetchAllClubs(supabase) {
  // Supabase's default row cap is 1000. We paginate to get all 3,002+ clubs.
  const PAGE_SIZE = 1000
  let allClubs = []
  let from = 0

  while (true) {
    const { data, error } = await supabase
      .from('clubs')
      .select('slug, created_at')
      .order('created_at', { ascending: true })
      .range(from, from + PAGE_SIZE - 1)

    if (error) {
      console.error('❌ Supabase query failed:', error.message)
      throw error
    }

    if (!data || data.length === 0) break
    allClubs = allClubs.concat(data)
    if (data.length < PAGE_SIZE) break
    from += PAGE_SIZE
  }

  return allClubs
}

async function main() {
  console.log('📋 Generating club sitemap…')

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY env vars')
    console.error('   Set them in Netlify → Site config → Environment variables')
    console.error('   Use the same values as VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY')
    process.exit(1)
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  })

  // Fetch all clubs
  const clubs = await fetchAllClubs(supabase)
  console.log(`✅ Fetched ${clubs.length} clubs from Supabase`)

  if (clubs.length === 0) {
    console.warn('⚠️  No clubs found. Sitemap will only contain static pages.')
  }

  // === Build sitemap-clubs.xml ===
  const clubUrls = clubs
    .filter((c) => c.slug && typeof c.slug === 'string') // safety
    .map((c) => buildUrlEntry({
      loc: `${SITE_URL}/clubs/${c.slug}`,
      lastmod: c.created_at ? c.created_at.slice(0, 10) : undefined,
      changefreq: 'monthly',
      priority: '0.5',
    }))
    .join('\n')

  const clubsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${clubUrls}
</urlset>
`

  // === Build static sitemap (homepage + key pages) ===
  const today = new Date().toISOString().slice(0, 10)
  const staticUrls = STATIC_PAGES
    .map((p) => buildUrlEntry({
      loc: `${SITE_URL}${p.loc}`,
      lastmod: today,
      changefreq: p.changefreq,
      priority: p.priority,
    }))
    .join('\n')

  const staticSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
</urlset>
`

  // === Build sitemap index (points to both above) ===
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-static.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-clubs.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`

  // === Write the files ===
  mkdirSync(PUBLIC_DIR, { recursive: true })

  writeFileSync(join(PUBLIC_DIR, 'sitemap-clubs.xml'),  clubsSitemap)
  writeFileSync(join(PUBLIC_DIR, 'sitemap-static.xml'), staticSitemap)
  writeFileSync(join(PUBLIC_DIR, 'sitemap.xml'),        sitemapIndex)

  console.log(`✅ Wrote sitemap-clubs.xml  (${clubs.length} club URLs)`)
  console.log(`✅ Wrote sitemap-static.xml (${STATIC_PAGES.length} static URLs)`)
  console.log(`✅ Wrote sitemap.xml        (index pointing to both)`)
  console.log('📋 Sitemap generation complete')
}

main().catch((err) => {
  console.error('❌ Sitemap generation failed:', err)
  process.exit(1)
})
