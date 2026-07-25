# Meta System Quick Start

Get the complete Meta automation system running in 15 minutes.

## 1. Environment Setup (5 min)

### Copy env template
```bash
cp .env.meta.example .env.local
```

### Fill in your Meta credentials

**Get Graph API Token:**
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Apps → Your App → Tools → Access Token Debugger
3. Copy the token
4. Paste into `MAILCHIMP_API_KEY`

**Get Page ID & IG Account ID:**
1. Open your Facebook Page
2. URL: `facebook.com/[page-name]/` → page ID is in URL or settings
3. Meta Business Suite → Instagram Account → Settings → Account Details
4. Copy IDs into `.env.local`

**Get Mailchimp API Key & Audience ID:**
1. Go to [mailchimp.com](https://mailchimp.com)
2. Account → Extras → API Keys → Generate Key (format: `key-us1`)
3. Audience → [Your List] → Settings → Audience ID
4. Paste into `.env.local`

### Load env vars
```bash
# For this session
source .env.local

# For all future sessions, add to ~/.zshrc or ~/.bash_profile:
export $(cat .env.local | xargs)
```

## 2. Database Setup (3 min)

### Create blog_subscribers table
```bash
supabase migration up supabase/migrations/20260725_blog_subscribers.sql
```

Or paste the SQL into Supabase editor manually.

### Verify tables exist
```bash
# In Supabase dashboard:
# - blog_subscribers table
# - outreach_contacts table
```

## 3. Test Agents (5 min)

### Test Mailchimp Sync
```bash
# Add test subscriber
curl -X POST https://your-project.supabase.co/rest/v1/blog_subscribers \
  -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","source":"blog","is_active":true}'

# Run sync agent
node agents/mailchimp-sync.mjs

# Check logs
tail -f logs/mailchimp-sync-*.log

# Verify in Mailchimp: Audience → All Contacts → search "test@example.com"
```

### Test Outreach Drafter
```bash
# Run drafter
node agents/outreach-drafter.mjs

# Check output
cat outreach-queue.json
cat outreach-contacts.json

# Logs
tail -f logs/outreach-drafter-*.log
```

### Test Meta Publisher
```bash
# Edit content-queue.md
# Change a Mon/Wed/Fri post status to "pending"

# Run publisher
node agents/meta-publisher.mjs

# Check logs
tail -f logs/meta-publisher-*.log

# Verify post in IG/FB (check Creator Studio)
```

## 4. Set Up Email Sequences (2 min)

### Run setup script
```bash
bash scripts/setup-mailchimp-sequences.sh
```

This prints step-by-step instructions for creating 3 automation sequences in Mailchimp UI.

Follow along:
1. Log into Mailchimp
2. Create Automation → "Automation"
3. Trigger: "Contact added to list"
4. Copy/paste email templates from script output
5. Repeat for 2nd and 3rd sequences

## 5. Schedule Agents (Optional)

### Add to crontab
```bash
crontab -e
```

Paste:
```
0 9 * * 1,3,5 cd /path/to/shot-club && node agents/meta-publisher.mjs
0 14 * * 2,4 cd /path/to/shot-club && node agents/meta-reels.mjs
0 8 * * * cd /path/to/shot-club && node agents/outreach-drafter.mjs
0 11 * * * cd /path/to/shot-club && node agents/mailchimp-sync.mjs
```

### Or use Cloudflare Cron

If deployed to Cloudflare Pages:

```bash
# Set environment variables in Pages > Settings > Environment Variables
# Then create worker that calls agents
# (Instructions in Cloudflare docs)
```

## Usage

### Post to Instagram & Facebook

1. Edit `content-queue.md`
2. Add post for Mon/Wed/Fri with:
   - Type: carousel, single, blog link
   - Caption: your text
   - Status: pending
3. Agent runs at 9 AM
4. Post appears in IG Feed + FB Page

### Send Outreach Emails

1. Run `node agents/outreach-drafter.mjs`
2. Open `outreach-queue.json`
3. Copy email text
4. Send to coach (keeps human touch)
5. Update queue: `"sentDate": "2026-07-25"`
6. Commit changes

### Mailchimp Automations

Automatic (no action needed):
- Subscriber added to audience
- Sync agent sends to Mailchimp daily
- Mailchimp automations trigger Day 0, 3, 7, 14 emails

---

## Troubleshooting

### "Mailchimp API error: 401 Unauthorized"
- Check `MAILCHIMP_API_KEY` format: `key-us1`
- Verify key is not expired (create new one)
- Check audience ID is correct

### "Meta API error: (401) Unauthorized"
- Verify `META_ACCESS_TOKEN` is long-lived token
- Check permissions: instagram_basic, instagram_content_publish
- Token may be expired (regenerate from FB app)

### "No clubs found for outreach"
- Verify `clubs` table exists in Supabase
- Check: `is_active = true` and `governing_body = 'hockey'`
- Add test club manually if needed

### Agents not running on schedule
- Verify crontab: `crontab -l`
- Check logs: `tail -f logs/*`
- Try manual run: `node agents/meta-publisher.mjs`

---

## Next Steps

1. **Customize content** — Edit `content-queue.md` with your posts
2. **Brand emails** — Add your logo to Mailchimp email templates
3. **Monitor performance** — Check Mailchimp dashboard for open rates
4. **Scale outreach** — Run drafter daily, send emails manually
5. **Track ROI** — Add UTM params to links in captions

---

## Files Created

- **agents/meta-publisher.mjs** — IG + FB posts
- **agents/meta-reels.mjs** — IG Reels from TikToks
- **agents/outreach-drafter.mjs** — Club emails
- **agents/mailchimp-sync.mjs** — Email list sync
- **src/lib/mailchimp/client.ts** — Mailchimp API client
- **src/lib/logger.js** — Logging utility
- **scripts/setup-mailchimp-sequences.sh** — Email sequence setup
- **supabase/migrations/20260725_blog_subscribers.sql** — DB tables
- **content-queue.md** — Social media schedule
- **outreach-queue.json** — Outreach drafts
- **outreach-contacts.json** — Contact tracking log
- **META-SYSTEM.md** — Full documentation
- **.env.meta.example** — Environment template

---

## Support

Issues? Check:
1. Logs: `ls logs/`
2. Full docs: `META-SYSTEM.md`
3. Env vars: `.env.meta.example`
