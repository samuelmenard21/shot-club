# TikTok Autonomous Posting System

Complete production system for autonomous daily TikTok content generation and weekly performance analysis for Pull My Card.

---

## Overview

The system consists of:

1. **content-queue.md** — Human-editable weekly content plan
2. **tiktok-producer.mjs** — Daily 6 AM agent that renders cards and uploads drafts
3. **tiktok-analyst.mjs** — Sunday 6 PM agent that analyzes performance and regenerates queue
4. **uploader.ts** — TikTok API client with OAuth, retry, and error handling
5. **capture-card.mjs** — Playwright script for rendering card images
6. **start-tiktok-agents.sh** — Cron installer

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

Adds `playwright` for card rendering and ensures `@supabase/supabase-js` is available.

### 2. Set Environment Variables

Add to `.env`:

```bash
# TikTok API (required for uploads)
TIKTOK_ACCESS_TOKEN=your_tiktok_access_token_here
TIKTOK_REFRESH_TOKEN=optional_refresh_token
TIKTOK_CLIENT_ID=optional_client_id
TIKTOK_CLIENT_SECRET=optional_client_secret

# Supabase (for game data)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Card rendering (points to boxscorecard.app)
RENDER_CARD_URL=https://boxscorecard.app
```

### 3. Set Up Cron Jobs

```bash
npm run tiktok:setup
```

Or manually:

```bash
chmod +x scripts/start-tiktok-agents.sh
./scripts/start-tiktok-agents.sh
```

This installs two cron jobs:
- **6:00 AM daily** — Producer renders cards and uploads to TikTok drafts
- **6:00 PM Sunday** — Analyst fetches analytics, ranks formats, regenerates queue

Verify:
```bash
crontab -l | grep tiktok
```

---

## How It Works

### Daily Producer Flow (6 AM)

1. **Read queue** — Parse `content-queue.md` for today's slot
2. **Fetch game** — Query Supabase `games` table by game_id
3. **Render variants** — Call `capture-card.mjs` 3× with different styles
4. **Generate captions** — Interpolate hook template with game/player data
5. **Upload drafts** — Send each image to TikTok as draft via API
6. **Write queue** — Save `tiktok-publish-queue.json` with draft IDs and instructions

**Output:**
- `dist/cards/*.png` — Rendered images
- `logs/producer.log` — Execution log
- `tiktok-publish-queue.json` — Publish instructions

**User action:** Open TikTok app → Drafts → Add audio → Publish

### Weekly Analyst Flow (Sunday 6 PM)

1. **Fetch analytics** — GET `/v1/post/list/paginate/` for last 7 days
2. **Group by format** — Categorize posts (the-pull, sponsor-flex, etc.)
3. **Calculate CTR** — (clicks / views) × 100 per format
4. **Rank formats** — Top format 4×/week, 2nd 3×/week, 3rd 2×/week, others 1×/week
5. **Regenerate queue** — Write new `content-queue.md` with weighted distribution
6. **Commit & push** — Auto-commit with message: "Analyst: rewrote queue based on {format} performance"

**Output:**
- `content-queue.md` — Next week's plan (overwritten)
- `logs/analyst.log` — Execution log
- Git commit + push to origin main

---

## File Formats

### content-queue.md

Human-editable markdown with one slot per day.

```markdown
### Monday, July 28 — The Pull

- **Format**: the-pull
- **Game ID**: game_202407_northstars_hawks
- **Render Variants**: ["vintage", "holo", "prestige"]
- **Hook Template**: "Fresh pack pull 🏒 {team} vs {opponent} — who gets the rare? {achievement}"
- **Hashtags**: #hockeycard #packing #rare #youth #hockey
- **Notes**: Start the week strong with a pack opening.
```

**Placeholders:**
- `{team}` — Home/primary team
- `{opponent}` — Visiting team
- `{player}` or `{name}` — Player name
- `{achievement}` — Game achievement (e.g., Hat Trick)
- `{stat_highlight}` — Best stat (e.g., "3 G")
- `{date}` — Game date
- `{sponsor}` — Premium Meat Pack (or custom)

### tiktok-publish-queue.json

Output from producer. Contains draft IDs, captions, and publish instructions.

```json
{
  "date": "2024-07-28",
  "format": "the-pull",
  "gameId": "game_202407_northstars_hawks",
  "variants": ["vintage", "holo", "prestige"],
  "draftIds": ["draft_abc123", "draft_def456", "draft_ghi789"],
  "captions": [
    "Fresh pack pull vs Hawks — vintage variant",
    "Fresh pack pull vs Hawks — holo variant",
    "Fresh pack pull vs Hawks — prestige variant"
  ],
  "status": "ready-for-publish",
  "message": "3 drafts uploaded successfully. Open TikTok app, add audio, and publish."
}
```

---

## API Details

### TikTok API Client (src/lib/tiktok/uploader.ts)

**Export:** `createUploader(token: string): TikTokUploader`

**Methods:**

#### `uploadDraft(video: Buffer, caption: string, hashtags: string[]): Promise<UploadResult>`

Uploads image/video to TikTok drafts (unaudited apps can only upload to drafts).

- Retries up to 3 times on transient errors (5xx, 429, 408)
- Logs all requests/responses to `logs/tiktok-uploader.log`
- Throws `TikTokError` with details: `{ code, message, retryable }`

**Error Codes:**
- `INVALID_TOKEN` — Token missing or expired
- `INVALID_RESPONSE` — No upload_id in response
- `PUBLISH_FAILED` — Could not publish draft

#### `publishDraft(uploadId: string, caption: string, hashtags: string[]): Promise<{videoId, publishedAt}>`

Publishes a draft to live (used by manual publisher if implemented).

---

## Formats

All 4 formats are included in the queue rotation, weighted by CTR:

### the-pull
Pack opening. High excitement, discovery.
- Sponsor mention: optional
- Stats: game context

### sponsor-flex
Player achievement + meat pack branding. Premium, local partnership.
- Sponsor mention: prominent
- Stats: game MVP

### style-roulette
Same card, 3 design treatments (visual, playful).
- Sponsor mention: none
- Stats: shown on each variant

### parent-pov
Emotional angle: "Your kid's achievement, forever."
- Sponsor mention: none
- Stats: achievement + team context

---

## Manual Testing

### Test Producer

```bash
npm run tiktok:produce
```

This:
1. Reads `content-queue.md` for today
2. Renders 3 card variants
3. Attempts to upload to TikTok (requires TIKTOK_ACCESS_TOKEN)
4. Writes `tiktok-publish-queue.json`

Check `logs/producer.log` for details.

### Test Analyst

```bash
npm run tiktok:analyze
```

This:
1. Fetches TikTok analytics for last 7 days
2. Ranks formats by CTR
3. Regenerates `content-queue.md`
4. Commits and pushes to git

Check `logs/analyst.log` for details.

### Test Card Rendering

```bash
node scripts/capture-card.mjs \
  --style=vintage \
  --data='{"name":"Olivia Menard","team":"Sabres","achievement":"Hat Trick"}' \
  --output=test-card.png
```

Outputs: `test-card.png` (screenshot of rendered card)

---

## Logs

All logs are written to `logs/` directory:

- **logs/producer.log** — Daily producer run (6 AM)
- **logs/analyst.log** — Weekly analyst run (Sunday 6 PM)
- **logs/tiktok-uploader.log** — TikTok API requests/responses

Each line is a JSON object:
```json
{
  "timestamp": "2024-07-28T06:15:00.123Z",
  "level": "info",
  "msg": "Upload successful",
  "data": { "draftId": "abc123", "uploadedAt": "..." }
}
```

View logs:
```bash
tail -f logs/producer.log
tail -f logs/analyst.log
tail -f logs/tiktok-uploader.log
```

---

## Sponsorship Model

The system is built for **meat pack fundraising**, not auto shops.

Sponsor tags appear in:
- Hook templates: "Powered by {sponsor}" → "Powered by Premium Meat Pack"
- sponsor-flex format: Prominent mention
- Hashtags: #meatpack #local #beef #premium

Customize the sponsor placeholder in:
- `content-queue.md` (hook templates)
- `agents/tiktok-producer.mjs` (templateData)

---

## Game Data from Supabase

The system queries the `games` table by `game_id`.

Expected schema:
```sql
CREATE TABLE games (
  id TEXT PRIMARY KEY,
  team TEXT,
  opponent TEXT,
  date DATE,
  players JSONB,
  -- other fields as needed
);
```

If a game_id is not found, the system falls back to sample data.

---

## Troubleshooting

### Producer fails with "No queue entry found"

- Check that `content-queue.md` exists and has a section for today's day of the week
- Verify the markdown format matches (### Monday, etc.)
- Check `logs/producer.log`

### Cards fail to render

- Ensure Playwright is installed: `npm install`
- Check `RENDER_CARD_URL` env var (default: https://boxscorecard.app)
- Try manual test: `node scripts/capture-card.mjs --style=vintage --data='{}' --output=test.png`

### TikTok upload fails

- Verify `TIKTOK_ACCESS_TOKEN` is set in `.env`
- Check `logs/tiktok-uploader.log` for API error details
- If token is expired, set `TIKTOK_REFRESH_TOKEN` and `TIKTOK_CLIENT_ID/SECRET` for auto-refresh

### Cron jobs not running

- Verify cron is installed: `crontab -l`
- Check system logs: `log stream --predicate 'eventMessage contains[cd] "tiktok"'` (macOS)
- Ensure full path in cron: check `scripts/start-tiktok-agents.sh`
- Test manually: `node agents/tiktok-producer.mjs`

### Git push fails

- Check git is configured: `git config --global user.email`
- Verify SSH key or GitHub token is set up
- Check `logs/analyst.log` for git error details

---

## Advanced

### Custom Card Data

The producer builds card data from game records:

```typescript
// In tiktok-producer.mjs, buildCardData()
{
  cls: "",
  team: string,
  div: "Youth",
  num: string,
  pos: string,
  posLong: string,
  posShort: string,
  name: string,
  first: string,
  lastUpper: string,
  tag: string,
  headline: string,
  serial: string,
  achv: string,
  miniStat: string,
  date: string,
  hero: 0,
  photo: "",
  filled: "0",
  photo2: "",
  filled2: "0",
  stats: [{ n: string, l: string }]
}
```

Customize in `buildCardData()` function.

### Extend Formats

Add new formats by:
1. Add to `content-queue.md` format definitions
2. Add hook template and hashtags
3. Producer will auto-detect format from slot

Example: Add `"sponsor-charity"` format with custom hook.

### Analytics Customization

Modify `agents/tiktok-analyst.mjs` `analyzeByFormat()` to:
- Change CTR calculation
- Use different ranking metric (views, likes, shares)
- Adjust distribution weights (currently 4-3-2-1 for top 4 formats)

---

## Production Readiness

- [x] Error handling: retries, timeouts, descriptive errors
- [x] Logging: all operations logged to JSON files
- [x] Type safety: TypeScript for uploader, type hints in agents
- [x] Retry logic: 3 attempts with exponential backoff for network failures
- [x] Token management: OAuth refresh support
- [x] Git integration: auto-commit analyst results
- [x] Cron setup: easy installer script
- [x] Fallback data: sample games if Supabase unavailable
- [x] No hardcoded secrets: all env vars
- [x] No console.log spam: structured JSON logging

---

## Next Steps

1. **Set up TikTok API credentials**
   - Go to https://developer.tiktok.com
   - Create unaudited app (client ID + secret)
   - Generate access token via OAuth or test credentials
   - Add to `.env`

2. **Populate games table**
   - Sync game data from your team management system
   - Use game_YYYYMM_team1_team2 naming convention
   - Include player stats and achievements

3. **Customize queue**
   - Edit `content-queue.md` for next week
   - Adjust hook templates and hashtags
   - Add/remove games as needed

4. **Run manual test**
   - `npm run tiktok:produce`
   - Check `tiktok-publish-queue.json`
   - Verify cards in `dist/cards/`

5. **Install cron jobs**
   - `npm run tiktok:setup`
   - Verify: `crontab -l`

6. **Monitor**
   - Watch `logs/producer.log` daily
   - Check `logs/analyst.log` weekly
   - Verify git commits from analyst agent

---

## Support

For issues or questions:
1. Check logs in `logs/` directory
2. Run manual test to isolate problem
3. Review error messages in structured logs
4. Check environment variables: `env | grep TIKTOK`
