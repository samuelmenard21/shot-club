# TikTok System Architecture

## Component Overview

```
┌─────────────────────────────────────────────────────────────┐
│         TikTok Autonomous Posting System                    │
│                                                              │
│  content-queue.md ──────────────────────────────────────┐  │
│  (Human-editable weekly plan)                           │  │
│                                                          │  │
│                                  ┌──────────────────────┘  │
│                                  │                         │
│  [6 AM Daily] ◄────────────────┤  tiktok-producer.mjs     │
│  Producer                       │                         │
│  Agent                          ├──────────────────────┐  │
│                                  │                      │  │
│  Reads queue                     │  Render cards  ────┐│  │
│  Fetches games                   │  via Playwright   ││  │
│  Renders variants                │  (capture-card.mjs)││  │
│  Uploads to TikTok              │                      ││  │
│  Writes publish queue            └─────┬──────────────┘│  │
│                                         │               │  │
│                                    ┌────▼───────┐      │  │
│                                    │   TikTok    │      │  │
│                                    │   Content   │◄─────┘  │
│                                    │   Posting   │         │
│                                    │   API       │         │
│                                    └────┬────────┘         │
│                                         │                  │
│  Output:                          tiktok-publish-          │
│  - dist/cards/*.png               queue.json               │
│  - logs/producer.log              (drafts ready)           │
│  - tiktok-publish-queue.json                               │
│                                                             │
│  ──────────────────────────────────────────────────────    │
│                                                             │
│  [Sunday 6 PM] ◄────────────────────────────────────────┐  │
│  Analyst                                                 │  │
│  Agent                   tiktok-analyst.mjs              │  │
│                                                          │  │
│  Fetches analytics ─────────────────► TikTok Analytics  │  │
│  Ranks formats by CTR                  API               │  │
│  Regenerates queue                                       │  │
│  Auto-commits to git     ┌──────────────────────────────┘  │
│                          │                                 │
│                          ▼                                 │
│                    Git commit + push                       │
│                    to origin/main                          │
│                    (next week's queue)                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Producer (Daily 6 AM)

```
┌──────────────────┐
│ content-queue.md │  ◄── Edited manually
└────────┬─────────┘
         │
         ▼
    Today's slot
    (format, game_id, variants, hook template, hashtags)
         │
         ├─────────────────────────────────────────┐
         │                                         │
         ▼                                         ▼
    ┌─────────────┐                       ┌──────────────┐
    │ Supabase    │                       │ Render queue │
    │ games table │                       │ (marketing   │
    │             │                       │  campaign)   │
    └────┬────────┘                       └──────────────┘
         │
         ▼
    Game data + player stats
         │
         ├──────────┬──────────┬──────────┐
         │          │          │          │
         ▼          ▼          ▼          ▼
    [Render 1] [Render 2] [Render 3]    ...
    style A    style B    style C
         │          │          │
         ├──────────┼──────────┤
         │          │          │
         ▼          ▼          ▼
    Card images (PNG)
         │
         ├──────────┬──────────┬──────────┐
         │          │          │          │
         ▼          ▼          ▼          ▼
    [Upload 1] [Upload 2] [Upload 3]    ...
    to TikTok  to TikTok  to TikTok
    drafts     drafts     drafts
         │          │          │
         ├──────────┼──────────┤
         │          │          │
         ▼          ▼          ▼
    Draft IDs + captions
         │
         ▼
    ┌────────────────────────┐
    │ tiktok-publish-queue.  │
    │ json                   │
    │ {                      │
    │   draftIds: [...]      │
    │   captions: [...]      │
    │   status: ready        │
    │   message: "Open app"  │
    │ }                      │
    └────────────────────────┘
         │
         ▼
    User action: Open TikTok app
    → Drafts tab
    → Add audio
    → Publish
```

### Analyst (Sunday 6 PM)

```
┌────────────────────────┐
│ TikTok Analytics API   │
│ (last 7 days)          │
└────────┬───────────────┘
         │
         ▼
    Posts with views, clicks, likes, shares
         │
         ▼
    Group by format
    (the-pull, sponsor-flex, style-roulette, parent-pov)
         │
         ├─────────────┬────────────┬──────────────┬─────────────┐
         │             │            │              │             │
         ▼             ▼            ▼              ▼             ▼
    Format 1    Format 2     Format 3         Format 4     Format N
    (4 posts)   (3 posts)    (2 posts)        (1 post)     (0 posts)
    CTR: 6.2%   CTR: 4.8%    CTR: 3.1%        CTR: 2.5%    CTR: N/A
         │             │            │              │             │
         └─────────────┴────────────┴──────────────┴─────────────┘
                                    │
                                    ▼
                          Sorted: 6.2% > 4.8% > 3.1% > 2.5%
                          (Top 3 = Format 1, 2, 3)
                          │
                          ▼
                    Distribution weights:
                    Format 1: 4 slots (Mon, Tue, Thu, Fri)
                    Format 2: 3 slots (Wed, Sat, Sun variation)
                    Format 3: 2 slots (mid-week)
                    Format 4+: 1 slot each (fill remaining)
                          │
                          ▼
                    Auto-select top games per format
                          │
                          ▼
                    ┌──────────────────────────┐
                    │ Regenerate content-queue │
                    │ for next week            │
                    │ (human-readable markdown)│
                    └──────────┬───────────────┘
                               │
                               ▼
                    ┌──────────────────────────┐
                    │ Git commit               │
                    │ "Analyst: rewrote queue  │
                    │ based on X performance"  │
                    └──────────┬───────────────┘
                               │
                               ▼
                    ┌──────────────────────────┐
                    │ Git push                 │
                    │ to origin/main           │
                    └──────────────────────────┘
```

## File Structure

```
/shot-club
├── content-queue.md                    (Human-editable weekly plan)
├── tiktok-publish-queue.json           (Daily producer output)
├── TIKTOK_SYSTEM.md                    (Full documentation)
├── TIKTOK_ARCHITECTURE.md              (This file)
├── .env.tiktok.example                 (Config template)
├── .gitignore                          (Updated with logs/, dist/cards/)
├── package.json                        (Updated with deps + scripts)
│
├── src/lib/tiktok/
│   └── uploader.ts                     (TikTok API client)
│
├── scripts/
│   ├── capture-card.mjs                (Playwright renderer)
│   └── start-tiktok-agents.sh          (Cron installer)
│
├── agents/
│   ├── tiktok-producer.mjs             (Daily 6 AM agent)
│   └── tiktok-analyst.mjs              (Sunday 6 PM agent)
│
├── dist/
│   └── cards/                          (Rendered card images, .gitignored)
│
└── logs/                               (Execution logs, .gitignored)
    ├── producer.log
    ├── analyst.log
    └── tiktok-uploader.log
```

## Component Responsibilities

### content-queue.md
- **Owned by**: Product/Marketing (human editable)
- **Read by**: Producer agent (daily)
- **Written by**: Analyst agent (weekly, Sunday)
- **Purpose**: Define what content to produce each day
- **Format**: Markdown with structured fields

### tiktok-producer.mjs
- **Runs**: Daily at 6:00 AM (via cron)
- **Reads**: content-queue.md, Supabase games table
- **Writes**: dist/cards/*.png, logs/producer.log, tiktok-publish-queue.json
- **Calls**: capture-card.mjs, TikTok API
- **Output**: Drafts in TikTok (awaiting audio + publish)

### tiktok-analyst.mjs
- **Runs**: Sundays at 6:00 PM (via cron)
- **Reads**: TikTok Analytics API
- **Writes**: content-queue.md (regenerated), logs/analyst.log, git commit
- **Purpose**: Optimize next week's content based on performance data

### capture-card.mjs
- **Called by**: Producer agent
- **Reads**: /render/card endpoint (boxscorecard.app)
- **Writes**: PNG images to dist/cards/
- **Technology**: Playwright + Chromium
- **Purpose**: Render card designs at scale, deterministically

### uploader.ts
- **Called by**: Producer agent
- **Reads**: TIKTOK_ACCESS_TOKEN env var
- **Writes**: logs/tiktok-uploader.log
- **Talks to**: TikTok Content Posting API v1
- **Purpose**: Upload images to TikTok drafts with retry logic

### start-tiktok-agents.sh
- **Purpose**: Install cron jobs
- **Creates**: logs/ directory
- **Updates**: .gitignore
- **Sets up**: Two cron entries (6 AM daily + Sunday 6 PM)

## Key Design Decisions

1. **Drafts only, no auto-publish**
   - Unaudited TikTok apps can only upload to drafts
   - User manually adds audio and publishes (keeps human in loop)
   - Maximizes audio quality + creativity

2. **Weekly rebalancing via CTR**
   - Top format 4×/week, 2nd 3×/week, etc.
   - Analyst auto-detects top-performing content
   - Humans can override by editing queue directly

3. **Meat pack sponsorship model**
   - Hook templates emphasize "premium," "local," "butcher"
   - Sponsor placeholder can be customized per format
   - Separate sponsor-flex format for strong brand messaging

4. **Game data from Supabase**
   - Single source of truth for game stats
   - Fallback to sample data if game not found (graceful degradation)
   - Enables cross-product consistency (shared database)

5. **Deterministic rendering**
   - Card styles via query params (no app state)
   - Playwright captures exact pixels (reproducible)
   - Enables A/B testing variant styles

6. **Structured logging**
   - All logs as JSON (machine parseable)
   - Timestamps + log levels for debugging
   - No console.log noise in production

7. **Git-native queue versioning**
   - content-queue.md tracked in git
   - Analyst auto-commits weekly updates
   - Easy to revert or audit content decisions

## Integration Points

### Supabase games Table
**Expected schema:**
```sql
games (
  id TEXT PRIMARY KEY,
  team TEXT,
  opponent TEXT,
  date DATE,
  players JSONB,
  ...
)
```

**Used by**: Producer (fetch by game_id)

### TikTok API Endpoints
- `POST /v1/post/publish/action/upload/` — Upload image/video
- `POST /v1/post/publish/action/publish/` — Publish draft (future)
- `GET /v1/post/list/paginate/` — Fetch analytics

**Used by**: Analyst (fetch analytics), Producer (upload drafts)

### boxscorecard.app /render/card
- `GET /render/card?style={style}&data={json}&scale=1.5&bg=transparent`
- Returns HTML page with rendered card

**Used by**: capture-card.mjs (screenshot endpoint)

## Monitoring & Alerts

### Logs to Watch
- `logs/producer.log` — Daily. Should show "3 drafts uploaded" or errors
- `logs/analyst.log` — Weekly. Should show "queue regenerated" and git commit
- `logs/tiktok-uploader.log` — Requests/responses for debugging

### Cron Execution
```bash
# View last run
tail -f ~/Library/Logs/DiagnosticMessages/system.log | grep "tiktok"

# Verify job registered
crontab -l | grep tiktok
```

### Manual Testing
```bash
# Test producer
npm run tiktok:produce

# Test analyzer
npm run tiktok:analyze

# Test card rendering
node scripts/capture-card.mjs --style=vintage --data='{}' --output=test.png
```

---

See **TIKTOK_SYSTEM.md** for setup, usage, and troubleshooting.
