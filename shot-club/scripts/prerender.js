import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:5173';

// Routes to prerender
const ROUTES = [
  { path: '/', filename: 'index.html' },
  { path: '/challenges', filename: 'challenges/index.html' },
  { path: '/10000-shot-challenge', filename: '10000-shot-challenge/index.html' },
  { path: '/association-partnership', filename: 'association-partnership/index.html' },
  { path: '/province-wide-challenge', filename: 'province-wide-challenge/index.html' },
  { path: '/blog', filename: 'blog/index.html' },
  { path: '/blog/getting-started', filename: 'blog/getting-started/index.html' },
  { path: '/blog/how-squad-battles-work', filename: 'blog/how-squad-battles-work/index.html' },
  { path: '/blog/off-ice-drills', filename: 'blog/off-ice-drills/index.html' },
  { path: '/blog/building-practice-routine', filename: 'blog/building-practice-routine/index.html' },
  { path: '/blog/parents-guide-youth-hockey', filename: 'blog/parents-guide-youth-hockey/index.html' },
  { path: '/privacy', filename: 'privacy/index.html' },
  { path: '/player', filename: 'player/index.html' },
];

async function prerender() {
  let browser;
  try {
    console.log('🚀 Starting prerender...');
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    for (const route of ROUTES) {
      console.log(`📄 Rendering ${route.path}...`);
      const page = await browser.newPage();

      try {
        await page.goto(`${BASE_URL}${route.path}`, {
          waitUntil: 'networkidle2',
          timeout: 30000,
        });

        // Wait a bit for any hydration to complete
        await page.waitForTimeout(500);

        const html = await page.content();

        // Create directory if it doesn't exist
        const fullPath = path.join('dist', route.filename);
        const dir = path.dirname(fullPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        // Write the rendered HTML
        fs.writeFileSync(fullPath, html);
        console.log(`   ✅ Saved to ${route.filename}`);
      } catch (e) {
        console.error(`   ❌ Error rendering ${route.path}:`, e.message);
      } finally {
        await page.close();
      }
    }

    console.log('✨ Prerender complete!');
  } catch (err) {
    console.error('Fatal error:', err);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
}

prerender();
