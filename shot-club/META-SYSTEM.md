# Pull My Card: Meta Autonomous System

Complete automation for Instagram Business Account, Facebook Page, and Mailchimp email nurture. Three interconnected systems handle social publishing, outreach drafting, and email list management.

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    META AUTONOMOUS SYSTEM                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SYSTEM 1: Meta Publisher Agent                               │
│  ├─ IG Feed Posts (Mon/Wed/Fri 9 AM)                          │
│  │  ├─ Carousel: 4 card styles                               │
│  │  ├─ Single: Sponsor feature                               │
│  │  └─ Blog link: Card image + caption                      │
│  │                                                            │
│  └─ Meta Reels Agent (Tue/Thu 2 PM)                          │
│     ├─ Fetch TikToks (views > 5,000)                         │
│     ├─ Download video                                        │
│     └─ Upload to IG Reels                                    │
│                                                                │
│  SYSTEM 2: Outreach Drafter Agent (Daily 8 AM)               │
│  ├─ Query Supabase clubs (hockey, active)                    │
│  ├─ Exclude recently contacted (30 days)                     │
│  ├─ Generate personalized messages                           │
│  └─ Save to outreach-queue.json (user sends manually)       │
│                                                                │
│  SYSTEM 3: Email Nurture (Mailchimp)                         │
│  ├─ Sync blog subscribers (daily 11 AM)                      │
│  ├─ 3 automated sequences (manual setup in Mailchimp)        │
│  │  ├─ New Blog Subscriber (4 emails)                       │
│  │  ├─ Sponsor Interest (4 emails)                          │
│  │  └─ Blog Visitor (4 emails)                              │
│  └─ Run setup-mailchimp-sequences.sh once                    │
│                                                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## System 1: Meta Publisher

### Components

**agents/meta-publisher.mjs** — Posts to IG Feed + Facebook Page

### IG Feed Posts (Mon/Wed/Fri 9 AM)

Reads `content-queue.md` for scheduled posts and publishes to Instagram Business Account.

**Post Types:**

1. **Style Showcase (Carousel)**
   - 4 card styles: classic, premium_gold, team_blue, holographic
   - Renders each via `/render/card` endpoint
   - Posts as carousel album
   - Caption: highlighting design versatility

2. **Sponsor Feature (Single Image)**
   - Single card with sponsor branding
   - Caption: emphasizing local business + fundraiser model
   - Includes link to `/fundraising`

3. **Blog Link (Single Image)**
   - Card image + blog post link
   - Caption: teasing blog post topic
   - Link: `/blog/[slug]`

### Facebook Page Posts (Mon/Wed/Fri 10 AM)

Same content as IG but simpler format (single image, longer caption).

**Endpoint:** `POST /v18.0/{page-id}/feed`

### IG Reels (Tue/Thu 2 PM)

**agents/meta-reels.mjs** — Reposts top TikToks

1. Fetch TikToks from last 3 days with views > 5,000
2. Download video
3. Upload to IG Reels via Graph API
4. Caption: TikTok caption + #ItsNotJustACard

---

## System 2: Outreach Drafter

### Component

**agents/outreach-drafter.mjs** — Generates personalized messages

### Workflow

1. **Query Clubs**: Fetch from Supabase `clubs` table
   - Filter: `governing_body = 'hockey'` + `is_active = true`
   - Exclude: contacted in last 30 days
   - Randomize and pick 10 clubs

2. **Generate Messages**: Personalized pitch
   ```
   Subject: [Club Name] — Premium Meat Pack Fundraiser for Your Team
   
   Hi [Coach Name],
   
   We work with youth hockey teams to run premium meat pack fundraisers...
   [Club name] would get:
   - $850-1200 from local butcher sponsorship
   - Trading cards for your whole team featuring butcher branding
   - Direct reach to families who care about local food sourcing
   
   Interested? Reply to this message or call [phone].
   ```

3. **Output**:
   - `outreach-queue.json` — ready-to-send drafts (user copies and sends manually)
   - `outreach-contacts.json` — append-only log (prevents duplicate outreach)

### Tables

**Supabase `clubs` table** (used for queries):
- `id` — unique identifier
- `name` — club name
- `governing_body` — 'hockey', 'soccer', etc.
- `is_active` — boolean
- `contact_email` — coach email
- `contact_name` — coach name
- `city`, `province` — location

**Supabase `outreach_contacts` table** (created by migration):
- `id` — UUID
- `association_id` — foreign key to club
- `contact_date` — timestamp
- `status` — 'drafted', 'sent', 'replied', 'bounced'

### User Workflow

1. Run agent: `node agents/outreach-drafter.mjs`
2. Open `outreach-queue.json`
3. Copy email text
4. Send manually to coach (keeps human touch)
5. Mark sent: update queue `"sentDate": "2026-07-25"`
6. Commit changes (prevents recontacting)

---

## System 3: Email Nurture (Mailchimp)

### Components

**src/lib/mailchimp/client.ts** — Typed Mailchimp API client

- `syncContact()` — create or update contact
- `addTags()` — add tags for automation triggers
- `getContact()` — retrieve contact details
- `batchSyncContacts()` — sync multiple at once

**agents/mailchimp-sync.mjs** — Syncs blog subscribers daily

- Queries Supabase `blog_subscribers` table
- Sends CREATE/UPDATE to Mailchimp API
- Handles duplicates gracefully
- Logs sync results and errors

**scripts/setup-mailchimp-sequences.sh** — Setup instructions

- Guides through Mailchimp UI for creating 3 automation sequences
- Provides email templates (copy/paste ready)
- Explains tags and triggers

### Blog Subscribers Table

**Supabase `blog_subscribers` table** (created by migration):

```sql
CREATE TABLE blog_subscribers (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source TEXT, -- 'blog', 'pinterest', 'organic'
  interests JSONB, -- ['card_buyer', 'sponsor', 'coach']
  mailchimp_contact_id TEXT,
  mailchimp_synced_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  is_active BOOLEAN
)
```

### Email Sequences

**Sequence 1: New Blog Subscriber** (auto-trigger: contact added to list)

| Day | Subject | Purpose |
|-----|---------|---------|
| 0 | Welcome + free styles guide | Onboarding + lead magnet |
| 3 | How to share with family | Build habit |
| 7 | Premium styles unlock | Upsell to team plan |
| 14 | Case study: teams raising $X | Introduce sponsorship |

**Sequence 2: Sponsor Interest** (trigger: tag = 'sponsor_outreach')

Applied by outreach-drafter when syncing sponsor prospects.

| Day | Subject | Purpose |
|-----|---------|---------|
| 0 | Sponsor intro + case study | Awareness |
| 3 | 3 local shops success stories | Social proof |
| 7 | Launch guide + FAQ | Education |
| 14 | Call to action: schedule call | Conversion |

**Sequence 3: Blog Visitor** (trigger: tag = 'blog_visitor')

Applied to contacts from Pinterest/organic search.

| Day | Subject | Purpose |
|-----|---------|---------|
| 0 | Enjoy [blog]? Related posts | Engagement |
| 3 | Try making your first card | Convert to user |
| 7 | Families love sharing cards | Community building |
| 14 | Teams fundraising differently | Introduce sponsorship |

### Setup

1. **Create Supabase tables**:
   ```bash
   supabase migration up 20260725_blog_subscribers.sql
   ```

2. **Set environment variables** (see below)

3. **Run setup script** (one-time):
   ```bash
   bash scripts/setup-mailchimp-sequences.sh
   ```
   
   This guides you through:
   - Creating 3 automations in Mailchimp UI
   - Copy/pasting email templates
   - Setting up tags and triggers

4. **Start sync agent**:
   ```bash
   node agents/mailchimp-sync.mjs
   ```

---

## Environment Variables

### Required

```bash
# Supabase (for all agents)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Meta (for publisher + reels agents)
META_ACCESS_TOKEN=your-graph-api-token
META_PAGE_ID=your-facebook-page-id
META_IG_BUSINESS_ACCOUNT_ID=your-ig-business-account-id

# Mailchimp (for sync agent)
MAILCHIMP_API_KEY=your-api-key-us1  # Format: key-us1
MAILCHIMP_AUDIENCE_ID=your-audience-id

# TikTok (for reels agent; optional but recommended)
TIKTOK_ACCESS_TOKEN=your-tiktok-token

# API (for rendering cards)
API_BASE_URL=http://localhost:5173/api  # Or production URL
```

### Where to find them

**Meta Graph API Token:**
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create app → type: Business
3. Add Instagram Product
4. Generate long-lived token (User Token)
5. Permissions: `instagram_basic,instagram_content_publish`

**Mailchimp API Key:**
1. Go to [mailchimp.com](https://mailchimp.com)
2. Account → Extras → API Keys
3. Generate new key (format: `key-us1`)

**Audience ID (Mailchimp):**
1. Go to Audience → [your audience name]
2. Settings → Audience name and defaults
3. Audience ID is shown at top

---

## Running the Agents

### Manual Runs

```bash
# Publish IG/FB posts for today
node agents/meta-publisher.mjs

# Repost top TikToks to IG Reels
node agents/meta-reels.mjs

# Generate outreach drafts for 10 hockey clubs
node agents/outreach-drafter.mjs

# Sync blog subscribers to Mailchimp
node agents/mailchimp-sync.mjs
```

### Scheduled Runs (Cron)

Add to your crontab or CI/CD pipeline:

```bash
# IG Feed Posts (Mon/Wed/Fri 9 AM)
0 9 * * 1,3,5 cd /path/to/shot-club && node agents/meta-publisher.mjs

# IG Reels (Tue/Thu 2 PM)
0 14 * * 2,4 cd /path/to/shot-club && node agents/meta-reels.mjs

# Outreach Drafts (Daily 8 AM)
0 8 * * * cd /path/to/shot-club && node agents/outreach-drafter.mjs

# Mailchimp Sync (Daily 11 AM)
0 11 * * * cd /path/to/shot-club && node agents/mailchimp-sync.mjs
```

### Logs

All agents log to `logs/`:

```bash
# Watch IG publisher logs
tail -f logs/meta-publisher-2026-07-25.log

# Watch outreach drafter
tail -f logs/outreach-drafter-2026-07-25.log

# Watch Mailchimp sync
tail -f logs/mailchimp-sync-2026-07-25.log
```

---

## Workflow: End-to-End

### 1. Social Media Publication

**Mon 9 AM: Meta Publisher runs**
- Reads `content-queue.md` for Mon posts
- Renders 4 card styles via `/render/card`
- Posts carousel to IG Feed
- Posts single image + link to FB Page

**Mon 10 AM: Facebook Page post appears**
- Facebook Page followers see the post

**Tue 2 PM: Meta Reels runs**
- Fetches TikToks with > 5,000 views
- Downloads and uploads to IG Reels
- Adds caption + #ItsNotJustACard

### 2. Outreach

**Daily 8 AM: Outreach Drafter runs**
- Fetches 10 random hockey clubs (not contacted in 30 days)
- Generates personalized pitches
- Saves to `outreach-queue.json`

**User action: Manual send**
- User reads `outreach-queue.json`
- Copies email, sends to coach
- Updates queue: `"sentDate": "2026-07-25"`
- Commits changes (blocks recontacting)

### 3. Email Nurture

**Blog subscriber signs up**
- Email added to Supabase `blog_subscribers` table
- Tags applied: `['blog_subscriber']` or `['sponsor_outreach']`

**Daily 11 AM: Mailchimp Sync runs**
- Queries unsynced subscribers
- Sends to Mailchimp API
- Updates `mailchimp_synced_at` timestamp

**Mailchimp automation triggers**
- Day 0: Welcome email
- Day 3: Follow-up
- Day 7: Upsell
- Day 14: Deep dive

---

## Content Queue Format

**File:** `content-queue.md`

```markdown
## IG Feed Posts (Mon/Wed/Fri 9 AM)

### Mon 2026-07-28 — Style Showcase
- **Type:** Carousel (4 card styles)
- **Styles:** Classic, Premium Gold, Team Blue, Holographic
- **Caption:** "[Your caption here]"
- **Status:** pending

### Wed 2026-07-30 — Sponsor Feature
- **Type:** Single card image
- **Sponsor:** [Butcher name]
- **Caption:** "[Your caption here]"
- **Status:** pending
```

Edit this file to update scheduled posts. Agents read it daily.

---

## Troubleshooting

### Mailchimp Sync Fails

**Error: "Member Exists"**
- Expected if email already in Mailchimp
- Agent catches and updates instead
- Check `mailchimp_synced_at` timestamp in Supabase

**Error: "Authentication failed"**
- Verify `MAILCHIMP_API_KEY` format: `key-us1`
- Verify `MAILCHIMP_AUDIENCE_ID` is correct
- Check API key is not expired

### Meta Publisher Fails

**Error: "Media processing failed"**
- IG requires time to process images
- Agent waits by default
- If timeout, manually publish via IG app

**Error: "Invalid caption"**
- Some unicode/emoji not supported
- Keep captions to 2,200 chars max
- Use basic emoji only (avoid skin tones)

### TikTok Reels Fetch Empty

**No videos with > 5,000 views:**
- Normal if account is new
- Agent gracefully skips that day
- Check TikTok analytics directly

**Error: "Rate limit exceeded"**
- TikTok API has strict limits (60 requests/hour)
- Agent retries automatically
- Check after 60 minutes

### Outreach Drafts Not Generated

**Error: "Supabase error: relation 'clubs' does not exist"**
- Verify `clubs` table exists in Supabase
- Check table name (case-sensitive)

**Error: "No clubs found"**
- Verify there are active hockey clubs in DB
- Check filters: `is_active = true` and `governing_body = 'hockey'`

---

## Testing

### Test Mailchimp Sync

```bash
# Add test subscriber to Supabase
INSERT INTO blog_subscribers (email, name, source, is_active)
VALUES ('test@example.com', 'Test User', 'blog', true);

# Run sync agent
node agents/mailchimp-sync.mjs

# Check logs
tail -f logs/mailchimp-sync-*.log

# Verify in Mailchimp UI
```

### Test Meta Publisher

```bash
# Edit content-queue.md to schedule post for today
# Update status to 'pending'

# Run publisher (dry-run first)
node agents/meta-publisher.mjs

# Check logs for errors
tail -f logs/meta-publisher-*.log

# Verify post appears in IG/FB
```

### Test Outreach Drafter

```bash
# Run drafter
node agents/outreach-drafter.mjs

# Check output files
cat outreach-queue.json
cat outreach-contacts.json

# Verify clubs were fetched from Supabase
```

---

## FAQ

**Q: Can I schedule posts in advance?**
A: Yes, edit `content-queue.md` with future dates. Agents read it daily and publish when date matches.

**Q: What if I don't want to send an outreach email?**
A: Don't update `outreach-queue.json`. Next day, the same club will be re-drafted. After 30 days, it drops out of exclusion list.

**Q: Can I modify the email templates?**
A: Yes, edit `scripts/setup-mailchimp-sequences.sh` templates. Then recreate automations in Mailchimp.

**Q: How do I add new automation sequences?**
A: Follow the setup script guide. Add new tags in outreach-drafter to trigger different sequences.

**Q: Can I use this for other sports (soccer, lacrosse)?**
A: Yes! Just update queries to filter by different `governing_body` values in Supabase.

---

## Support

- **Logs**: Check `logs/` directory for agent debug info
- **Errors**: Most are caught and logged; check agent logs first
- **Questions**: Email samuelmenard@gmail.com

---

## Summary

| Component | Runs | Purpose |
|-----------|------|---------|
| meta-publisher.mjs | Mon/Wed/Fri 9 AM | IG Feed + FB posts |
| meta-reels.mjs | Tue/Thu 2 PM | IG Reels (TikTok reposts) |
| outreach-drafter.mjs | Daily 8 AM | Personalized club emails |
| mailchimp-sync.mjs | Daily 11 AM | Blog subscriber sync |
| setup-mailchimp-sequences.sh | Once | Email automation setup |

All agents are production-ready, error-resilient, and fully logged.
