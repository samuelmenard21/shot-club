import fs from 'fs';
import path from 'path';

const DIST_DIR = 'dist';

// Read the main index.html that Vite created
const baseHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

const pageMetadata = [
  {
    route: '/challenges',
    file: 'challenges.html',
    title: 'Choose Your Hockey Challenge — 5K, 10K, or Custom',
    description: 'Pick your hockey challenge: 5000 shot challenge, 10000 shot challenge, or create a custom goal. Free tracking with live leaderboards.',
    image: '/og-image.png',
  },
  {
    route: '/10000-shot-challenge',
    file: '10000-shot-challenge.html',
    title: '10,000 Shot Challenge Tracker — Free Printable Log Sheet & Online Tracker',
    description: 'Free printable 10000 shot challenge tracker + online app. Log your shots, track progress, compete with teammates. Perfect for summer hockey training.',
    image: '/og-image.png',
  },
  {
    route: '/association-partnership',
    file: 'association-partnership.html',
    title: 'Free 10K Challenge Tracking for Hockey Associations — Partner With Us',
    description: "Run your association's 10,000 shot challenge on Hockey Shot Challenge. Free branded leaderboards, zero setup hassle. We handle the tech.",
    image: '/og-image.png',
  },
  {
    route: '/province-wide-challenge',
    file: 'province-wide-challenge.html',
    title: 'Province-Wide Hockey Challenge Platform — For Leagues & Associations',
    description: 'Run your province-wide 5K or 10K challenge digitally. Live leaderboards, real-time tracking, 300+ associations. Free platform for OMHA, OWHA, and regional hockey organizations.',
    image: '/og-image.png',
  },
  {
    route: '/blog',
    file: 'blog.html',
    title: 'Hockey Training Blog — Off-Ice Drills, Practice Routines, Player Development',
    description: 'Read our blog for hockey training tips, off-ice drills, practice routines, and player development guides for youth hockey.',
    image: '/og-image.png',
  },
  {
    route: '/blog/off-ice-drills',
    file: 'blog-off-ice-drills.html',
    title: 'Top 5 Off-Ice Hockey Drills Your Kid Can Practice at Home',
    description: 'Learn the best off-ice hockey drills: wrist shot accuracy, stickhandling, agility, footwork. No ice required.',
    image: '/og-image.png',
  },
  {
    route: '/blog/building-practice-routine',
    file: 'blog-building-practice-routine.html',
    title: 'How to Build a Consistent Hockey Practice Routine (Without Burnout)',
    description: 'Age-based hockey practice schedules, consistency formula, and burnout prevention for youth hockey players.',
    image: '/og-image.png',
  },
  {
    route: '/blog/parents-guide-youth-hockey',
    file: 'blog-parents-guide.html',
    title: "Parent's Guide to Youth Hockey Training: What Coaches Actually Look For",
    description: 'Learn what hockey coaches evaluate: shot accuracy, stickhandling, hockey IQ, work ethic, skating. Parent tips for player development.',
    image: '/og-image.png',
  },
  {
    route: '/privacy',
    file: 'privacy.html',
    title: 'Privacy Policy — Hockey Shot Challenge',
    description: 'Privacy policy and data handling practices for Hockey Shot Challenge.',
    image: '/og-image.png',
  },
  {
    route: '/player',
    file: 'player.html',
    title: 'For Hockey Players — Hockey Shot Challenge',
    description: 'Hockey Shot Challenge is free for players ages 6-18. Track your shots, climb leaderboards, compete with teammates.',
    image: '/og-image.png',
  },
];

function updateMetaTags(html, metadata) {
  let updated = html;

  // Replace title
  updated = updated.replace(
    /<title>.*?<\/title>/,
    `<title>${metadata.title}</title>`
  );

  // Replace description meta tag
  updated = updated.replace(
    /(<meta name="description" content=")([^"]*)/,
    `$1${metadata.description}`
  );

  // Replace og:title
  updated = updated.replace(
    /(<meta property="og:title" content=")([^"]*)/,
    `$1${metadata.title}`
  );

  // Replace og:description
  updated = updated.replace(
    /(<meta property="og:description" content=")([^"]*)/,
    `$1${metadata.description}`
  );

  // Replace canonical URL
  updated = updated.replace(
    /(<link rel="canonical" href="https:\/\/hockeyshotchallenge\.com)([^"]*)/,
    `$1${metadata.route}`
  );

  // Replace og:url
  updated = updated.replace(
    /(<meta property="og:url" content="https:\/\/hockeyshotchallenge\.com)([^"]*)/,
    `$1${metadata.route}`
  );

  // Replace twitter:url
  updated = updated.replace(
    /(<meta name="twitter:url" content="https:\/\/hockeyshotchallenge\.com)([^"]*)/,
    `$1${metadata.route}`
  );

  // Replace twitter:title
  updated = updated.replace(
    /(<meta name="twitter:title" content=")([^"]*)/,
    `$1${metadata.title}`
  );

  // Replace twitter:description
  updated = updated.replace(
    /(<meta name="twitter:description" content=")([^"]*)/,
    `$1${metadata.description}`
  );

  return updated;
}

console.log('📄 Generating static HTML pages for SEO...\n');

for (const page of pageMetadata) {
  try {
    const html = updateMetaTags(baseHtml, page);
    const filepath = path.join(DIST_DIR, page.file);
    fs.writeFileSync(filepath, html);
    console.log(`✅ ${page.route} → ${page.file}`);
  } catch (err) {
    console.error(`❌ Error generating ${page.file}:`, err.message);
  }
}

// Also create directory structure with index.html files for routes like /blog/, /challenges/, etc.
const directoryRoutes = [
  { dir: 'challenges', file: 'index.html', metadata: pageMetadata.find(p => p.route === '/challenges') },
  { dir: 'blog', file: 'index.html', metadata: pageMetadata.find(p => p.route === '/blog') },
  { dir: 'blog/off-ice-drills', file: 'index.html', metadata: pageMetadata.find(p => p.route === '/blog/off-ice-drills') },
  { dir: 'blog/building-practice-routine', file: 'index.html', metadata: pageMetadata.find(p => p.route === '/blog/building-practice-routine') },
  { dir: 'blog/parents-guide-youth-hockey', file: 'index.html', metadata: pageMetadata.find(p => p.route === '/blog/parents-guide-youth-hockey') },
];

for (const route of directoryRoutes) {
  try {
    const dirPath = path.join(DIST_DIR, route.dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const html = updateMetaTags(baseHtml, route.metadata);
    fs.writeFileSync(path.join(dirPath, route.file), html);
    console.log(`✅ ${route.dir}/ → ${route.dir}/index.html`);
  } catch (err) {
    console.error(`❌ Error generating ${route.dir}/index.html:`, err.message);
  }
}

console.log('\n✨ Static page generation complete!');
