# TikTok System Quick Start

Get the autonomous posting system running in 5 minutes.

---

## Step 1: Install Dependencies (1 minute)

```bash
cd /path/to/shot-club
npm install
```

This adds `playwright` for card rendering.

---

## Step 2: Configure Credentials (2 minutes)

Copy the example config:

```bash
cp .env.tiktok.example .env.tiktok
```

Edit `.env` and add:

```bash
# Minimum required
TIKTOK_ACCESS_TOKEN=your_token_here

# Recommended
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional (for auto token refresh)
TIKTOK_REFRESH_TOKEN=...
TIKTOK_CLIENT_ID=...
TIKTOK_CLIENT_SECRET=...
```

**Get TikTok token:**
1. Go https://developer.tiktok.com
2. Create/select an app (unaudited OK)
3. Generate access token (or OAuth flow)
4. Copy to `.env`

**Get Supabase credentials:**
1. Go https://supabase.com
2. Select project → Settings → API
3. Copy Project URL and anon key

---

## Step 3: Test Card Rendering (1 minute)

```bash
node scripts/capture-card.mjs \
  --style=vintage \
  --data='{"name":"Test Player","team":"Test Team","achievement":"Achievement"}' \
  --output=test-card.png
```

Should output: `test-card.png`

---

## Step 4: Test Producer (1 minute)

```bash
npm run tiktok:produce
```

What happens:
1. Reads `content-queue.md` for today's slot
2. Renders 3 card variants
3. Uploads to TikTok drafts (requires TIKTOK_ACCESS_TOKEN)
4. Creates `tiktok-publish-queue.json`

Check output:
- `dist/cards/*.png` — Rendered cards
- `logs/producer.log` — Execution log
- `tiktok-publish-queue.json` — Next steps (open TikTok app → add audio → publish)

---

## Step 5: Install Cron Jobs (optional, recommended)

```bash
npm run tiktok:setup
```

This schedules:
- **6:00 AM daily** — Producer runs (renders + uploads)
- **6:00 PM Sunday** — Analyst runs (fetches metrics, regenerates queue)

Verify:
```bash
crontab -l | grep tiktok
```

---

## That's it!

From here:

### Daily (6 AM automatic or manual)
```bash
npm run tiktok:produce
```
Uploads 3 card variants to TikTok drafts.

**User action:** Open TikTok app → Drafts → Add audio → Publish

### Weekly (Sunday 6 PM automatic)
```bash
npm run tiktok:analyze
```
Analyzes last 7 days, regenerates `content-queue.md` with top formats.

### Anytime: Edit the queue
```bash
# Edit for next week
nano content-queue.md
```

Changes take effect next morning at 6 AM.

---

## Troubleshooting

### Card rendering fails
```bash
# Debug with verbose output
RENDER_CARD_URL=https://boxscorecard.app node scripts/capture-card.mjs \
  --style=vintage \
  --data='{}' \
  --output=debug.png
```

### TikTok upload fails
1. Check token: `echo $TIKTOK_ACCESS_TOKEN`
2. Verify format: `cat logs/tiktok-uploader.log` (view last error)
3. Renew token if expired (set TIKTOK_REFRESH_TOKEN for auto-renewal)

### Producer doesn't find today's slot
1. Check day name in `content-queue.md` matches today
2. Verify markdown format: `### Monday, July 28 —`

### Cron not running
1. Check system: `crontab -l`
2. Test manually: `npm run tiktok:produce`
3. Check perms: `chmod +x scripts/start-tiktok-agents.sh`

---

## Example: Full Workflow

**Monday morning, 6 AM:**
- Cron runs producer
- Reads Monday slot from `content-queue.md`
- Renders 3 card variants (vintage, holo, prestige)
- Uploads to TikTok drafts
- Writes `tiktok-publish-queue.json` with draft IDs + instructions

**You (Monday morning, 7 AM):**
- Receive notification (optional: add to producer for Slack/email)
- Open TikTok app
- Go to Drafts
- Select first draft
- Add audio (trending sound, voiceover, etc.)
- Adjust captions
- Publish
- Repeat for other 2 drafts (or schedule with TikTok's scheduler)

**Sunday, 6 PM:**
- Cron runs analyst
- Fetches last 7 days of TikTok analytics
- Groups posts by format (the-pull, sponsor-flex, etc.)
- Calculates CTR per format
- Regenerates `content-queue.md` with top formats weighted
- Auto-commits to git: "Analyst: rewrote queue based on X performance"
- Pushes to origin/main

**Next week:**
- content-queue.md reflects data-driven decisions
- Producer uses optimized schedule
- Cycle repeats

---

## Key Files

| File | Purpose | Edit? |
|------|---------|-------|
| `content-queue.md` | Weekly content plan | ✅ Yes (humans) |
| `agents/tiktok-producer.mjs` | Daily 6 AM agent | 🔧 No (auto) |
| `agents/tiktok-analyst.mjs` | Sunday 6 PM agent | 🔧 No (auto) |
| `scripts/capture-card.mjs` | Card renderer | 🔧 No (internal) |
| `src/lib/tiktok/uploader.ts` | TikTok API client | 🔧 No (internal) |
| `.env` | Credentials | ✅ Yes (you) |
| `logs/producer.log` | Daily run log | 👁️ View |
| `logs/analyst.log` | Weekly run log | 👁️ View |
| `tiktok-publish-queue.json` | Drafts + publish steps | 👁️ View |

---

## Next: Customize

### Edit Hook Templates
```bash
nano content-queue.md

# Change hook template to customize caption
- **Hook Template**: "Your custom hook with {placeholder} vars"
```

**Supported placeholders:**
- `{team}` — Home team
- `{opponent}` — Visiting team
- `{player}` or `{name}` — Player name
- `{achievement}` — Game achievement
- `{stat_highlight}` — Best stat
- `{date}` — Game date
- `{sponsor}` — Sponsor name

### Adjust Format Weights
The analyst agent uses this distribution:
- **Top format:** 4×/week (Mon, Tue, Thu, Fri)
- **2nd format:** 3×/week
- **3rd format:** 2×/week
- **Others:** 1×/week

To change, edit `agents/tiktok-analyst.mjs` → `distribution` array.

### Add New Format
1. Add to `content-queue.md` format definitions
2. Add hook template and hashtags to a queue entry
3. Producer auto-detects and uses it

---

## Monitoring

### Daily
```bash
tail -f logs/producer.log
```

Should see:
```json
{"timestamp":"...","level":"info","msg":"Upload successful","data":{"draftId":"..."}}
```

### Weekly
```bash
tail -f logs/analyst.log
```

Should see:
```json
{"timestamp":"...","level":"info","msg":"Analyst complete"}
```

### Git
```bash
git log --oneline | head

# Should see analyst commits:
# 1a2b3c4 Analyst: rewrote queue based on the-pull performance
```

---

## FAQ

**Q: Can I manually upload instead of cron?**
A: Yes! Run anytime: `npm run tiktok:produce`

**Q: What if I want to skip a day?**
A: Remove that day from `content-queue.md`. Producer won't find an entry.

**Q: Can I change content after upload?**
A: Drafts are in TikTok app. You can edit captions before publish.

**Q: How do I test without publishing?**
A: Run producer, check `tiktok-publish-queue.json` and `dist/cards/` for output. Don't open TikTok app.

**Q: Can I schedule posts instead of publishing live?**
A: Use TikTok's built-in scheduler in app (select draft → "Schedule").

**Q: What if game data is wrong?**
A: Producer uses Supabase `games` table. Update game data there.

**Q: Can I use different card styles?**
A: Yes! Edit `content-queue.md` → `Render Variants`: ["vintage", "holo", "prestige", "chrome", "neon"]

**Q: How do I add hashtags?**
A: Edit `content-queue.md` → `Hashtags` field. Include `#` in each tag.

---

## Support

- **Full docs:** See `TIKTOK_SYSTEM.md`
- **Architecture:** See `TIKTOK_ARCHITECTURE.md`
- **Logs:** Check `logs/` directory for debug info
- **API errors:** See `logs/tiktok-uploader.log`

Start with `npm run tiktok:produce` to test the full flow!
