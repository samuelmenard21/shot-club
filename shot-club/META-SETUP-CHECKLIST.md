# Meta System Setup Checklist

Follow this checklist to get the complete Meta autonomous system running.

## Phase 1: Environment & Credentials (15 min)

- [ ] Copy env template: `cp .env.meta.example .env.local`
- [ ] Get Meta Graph API Token
  - [ ] Go to https://developers.facebook.com
  - [ ] Apps → Your App → Tools → Access Token Debugger
  - [ ] Copy token with permissions: `instagram_basic,instagram_content_publish`
  - [ ] Paste into `META_ACCESS_TOKEN` in `.env.local`
- [ ] Get Facebook Page ID
  - [ ] Open your Facebook Page
  - [ ] Copy page ID from URL or Settings
  - [ ] Paste into `META_PAGE_ID` in `.env.local`
- [ ] Get Instagram Business Account ID
  - [ ] Meta Business Suite → Instagram Account → Settings
  - [ ] Copy Account ID
  - [ ] Paste into `META_IG_BUSINESS_ACCOUNT_ID` in `.env.local`
- [ ] Get Mailchimp credentials
  - [ ] Go to https://mailchimp.com
  - [ ] Account → Extras → API Keys → Generate new key
  - [ ] Paste into `MAILCHIMP_API_KEY` (format: `key-us1`)
  - [ ] Audience → [Your List] → Settings → Audience name and defaults
  - [ ] Copy Audience ID into `MAILCHIMP_AUDIENCE_ID`
- [ ] Verify Supabase credentials
  - [ ] Copy `SUPABASE_URL` and `SUPABASE_ANON_KEY` to `.env.local`
  - [ ] Same values as existing `.env` (no change needed)
- [ ] Optional: Get TikTok API Token
  - [ ] Go to https://developer.tiktok.com
  - [ ] Apps → [Your App] → API Key/Secret
  - [ ] Paste into `TIKTOK_ACCESS_TOKEN` (optional, agent works without it)
- [ ] Load environment variables for this session
  ```bash
  source .env.local
  ```

## Phase 2: Database Setup (5 min)

- [ ] Apply Supabase migration
  ```bash
  supabase migration up supabase/migrations/20260725_blog_subscribers.sql
  ```
  Or manually run SQL in Supabase dashboard
- [ ] Verify tables created
  - [ ] Open Supabase dashboard
  - [ ] Check `blog_subscribers` table exists
  - [ ] Check `outreach_contacts` table exists
  - [ ] Check indexes created
- [ ] Verify RLS policies (if using)
  - [ ] Enable RLS on `blog_subscribers`
  - [ ] Add policy: authenticated users can insert own records
  - [ ] (Or disable RLS if using anon key only)

## Phase 3: Agent Testing (20 min)

### Test Mailchimp Sync Agent

- [ ] Add test subscriber to Supabase
  ```bash
  curl -X POST https://your-project.supabase.co/rest/v1/blog_subscribers \
    -H "apikey: $SUPABASE_ANON_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "email":"test@example.com",
      "name":"Test User",
      "source":"blog",
      "is_active":true
    }'
  ```
- [ ] Run mailchimp sync agent
  ```bash
  node agents/mailchimp-sync.mjs
  ```
- [ ] Check logs for success
  ```bash
  tail -f logs/mailchimp-sync-*.log
  ```
- [ ] Verify in Mailchimp
  - [ ] Log into Mailchimp
  - [ ] Audience → All Contacts
  - [ ] Search for "test@example.com"
  - [ ] Confirm contact was synced
- [ ] Clean up test subscriber (optional)

### Test Outreach Drafter Agent

- [ ] Verify clubs table has data
  ```bash
  # In Supabase, check clubs table has active hockey clubs
  ```
- [ ] Run outreach drafter
  ```bash
  node agents/outreach-drafter.mjs
  ```
- [ ] Check logs
  ```bash
  tail -f logs/outreach-drafter-*.log
  ```
- [ ] Verify output files
  - [ ] Open `outreach-queue.json`
  - [ ] Check 10 drafts were generated
  - [ ] Verify personalized messages
  - [ ] Open `outreach-contacts.json`
  - [ ] Check contact log was created
- [ ] (Optional) Test with real email
  - [ ] Copy email from queue
  - [ ] Send to a coach
  - [ ] Update `"sentDate"` in queue
  - [ ] Commit changes (blocks recontacting)

### Test Meta Publisher Agent

- [ ] Edit `content-queue.md`
  - [ ] Find today's day (Mon/Wed/Fri) section
  - [ ] Change a post `status` from pending to active
  - [ ] Verify caption and type are set
- [ ] Run meta publisher
  ```bash
  node agents/meta-publisher.mjs
  ```
- [ ] Check logs
  ```bash
  tail -f logs/meta-publisher-*.log
  ```
- [ ] Verify in Instagram & Facebook
  - [ ] Log into Instagram Business Account
  - [ ] Check Feed for new post
  - [ ] Check Facebook Page for new post
  - [ ] Verify captions and images
- [ ] (Optional) Revert post if needed
  - [ ] Edit `content-queue.md` status back to pending

### Test Meta Reels Agent

- [ ] Verify TikTok account has recent videos
  - [ ] Check TikTok analytics
  - [ ] Ensure some videos have > 5,000 views
- [ ] (Optional) Run meta reels agent
  ```bash
  node agents/meta-reels.mjs
  ```
- [ ] Check logs
  ```bash
  tail -f logs/meta-reels-*.log
  ```
- [ ] Verify in Instagram Reels
  - [ ] Log into Instagram Business Account
  - [ ] Check Reels tab for new repost

## Phase 4: Email Automation Setup (10 min)

- [ ] Run setup script
  ```bash
  bash scripts/setup-mailchimp-sequences.sh
  ```
- [ ] Follow on-screen instructions to create 3 automations:
  - [ ] **Sequence 1: New Blog Subscriber** (4 emails)
    - [ ] Log into Mailchimp
    - [ ] Create Automation → "Automation"
    - [ ] Trigger: "Contact added to list"
    - [ ] Email 1 (Day 0): Welcome + free guide
    - [ ] Email 2 (Day 3): Share with family
    - [ ] Email 3 (Day 7): Premium styles
    - [ ] Email 4 (Day 14): Case study
  - [ ] **Sequence 2: Sponsor Interest** (4 emails)
    - [ ] Trigger: "Tag added" → tag = "sponsor_outreach"
    - [ ] Email 1 (Day 0): Sponsor intro
    - [ ] Email 2 (Day 3): Success stories
    - [ ] Email 3 (Day 7): Launch guide
    - [ ] Email 4 (Day 14): Call to action
  - [ ] **Sequence 3: Blog Visitor** (4 emails)
    - [ ] Trigger: "Tag added" → tag = "blog_visitor"
    - [ ] Email 1 (Day 0): Related posts
    - [ ] Email 2 (Day 3): Try making a card
    - [ ] Email 3 (Day 7): Community stories
    - [ ] Email 4 (Day 14): Fundraising info
- [ ] Copy email templates from script output
- [ ] Customize with your branding/logo
- [ ] Test automation with test subscriber
  - [ ] Add test email to Mailchimp audience
  - [ ] Wait for Day 0 email
  - [ ] Verify email arrives and looks correct

## Phase 5: Schedule Setup (10 min)

### Option A: Local Cron (if running on your machine)

- [ ] Open crontab editor
  ```bash
  crontab -e
  ```
- [ ] Add these lines
  ```
  0 9 * * 1,3,5 cd /Users/sammenard/shot-club/shot-club && node agents/meta-publisher.mjs
  0 14 * * 2,4 cd /Users/sammenard/shot-club/shot-club && node agents/meta-reels.mjs
  0 8 * * * cd /Users/sammenard/shot-club/shot-club && node agents/outreach-drafter.mjs
  0 11 * * * cd /Users/sammenard/shot-club/shot-club && node agents/mailchimp-sync.mjs
  ```
- [ ] Verify crontab
  ```bash
  crontab -l
  ```
- [ ] Wait for first scheduled run
- [ ] Check logs afterward
  ```bash
  ls -la logs/
  ```

### Option B: Cloudflare Pages Cron (if deployed)

- [ ] Set environment variables in Cloudflare Pages
  - [ ] Go to Pages > [Your Site] > Settings > Environment Variables
  - [ ] Add all variables from `.env.local`
  - [ ] Production environment
- [ ] Create scheduled functions (if using Cloudflare Workers)
  - [ ] See Cloudflare docs for details
  - [ ] Point to agent files
- [ ] Verify workers are deployed

### Option C: External Cron Service

- [ ] Use service like EasyCron or cron-job.org
- [ ] Point to your deployed API/endpoint
- [ ] Set schedules per agent

## Phase 6: Content Planning (Ongoing)

- [ ] Plan your social media content
  - [ ] Identify card styles to feature
  - [ ] Plan sponsor partnerships
  - [ ] Plan blog posts to link
- [ ] Update `content-queue.md` with posts
  - [ ] Mon/Wed/Fri posts (IG Feed + FB Page)
  - [ ] Tue/Thu reels (auto from TikTok)
  - [ ] Commit changes
- [ ] Monitor performance
  - [ ] Check Instagram Insights
  - [ ] Check Facebook Analytics
  - [ ] Check Mailchimp open rates
  - [ ] Adjust content based on metrics

## Phase 7: Ongoing Operations

### Daily

- [ ] Check outreach-queue.json
  - [ ] New drafts generated
  - [ ] Send emails to coaches
  - [ ] Update sentDate and commit
- [ ] Monitor logs
  ```bash
  tail -f logs/*-$(date +%Y-%m-%d).log
  ```

### Weekly

- [ ] Update content-queue.md
  - [ ] Add next week's posts
  - [ ] Review performance from last week
- [ ] Check Mailchimp metrics
  - [ ] Open rates
  - [ ] Click rates
  - [ ] Subscriber growth

### Monthly

- [ ] Review Meta Business Suite analytics
- [ ] Assess ROI on outreach campaigns
- [ ] Plan next month's content themes
- [ ] Check if any API tokens need renewal

## Monitoring & Maintenance

### Logs to Check

- [ ] Daily: `logs/mailchimp-sync-*.log`
- [ ] Mon/Wed/Fri: `logs/meta-publisher-*.log`
- [ ] Tue/Thu: `logs/meta-reels-*.log`
- [ ] Daily: `logs/outreach-drafter-*.log`

### Common Issues

- [ ] Agents not running?
  - [ ] Check crontab: `crontab -l`
  - [ ] Check logs for errors
  - [ ] Verify environment variables: `printenv | grep META`
  - [ ] Test manual run: `node agents/meta-publisher.mjs`

- [ ] Mailchimp API errors?
  - [ ] Verify API key format: `key-us1`
  - [ ] Check audience ID is correct
  - [ ] Regenerate key if expired

- [ ] Meta API errors?
  - [ ] Check token is long-lived (60+ days)
  - [ ] Verify permissions in Facebook app
  - [ ] Regenerate token from developer dashboard

### Backup & Recovery

- [ ] Commit logs periodically
  ```bash
  git add logs/
  git commit -m "Agent logs for $(date +%Y-%m-%d)"
  ```
- [ ] Keep outreach-queue.json backed up (git tracks it)
- [ ] Export Mailchimp contacts regularly

## Success Checklist

Once complete, you should have:

- [ ] 4 agents running on schedule
- [ ] IG Feed posts publishing Mon/Wed/Fri
- [ ] IG Reels posting Tue/Thu
- [ ] Outreach drafts generated daily
- [ ] Blog subscribers syncing to Mailchimp
- [ ] Email automations running
- [ ] Logs being created daily
- [ ] All systems monitored and error-free

## Support Resources

- **Full docs**: `META-SYSTEM.md`
- **Quick start**: `META-QUICKSTART.md`
- **Env template**: `.env.meta.example`
- **Setup script**: `scripts/setup-mailchimp-sequences.sh`
- **Logs**: `logs/` directory
- **Questions**: Email samuelmenard@gmail.com

---

**Estimated total time: 60-90 minutes to full deployment**

Once running, the system operates autonomously with minimal intervention.
