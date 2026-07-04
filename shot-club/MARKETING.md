# Marketing Plan: First 500 Users

## Where the first 500 users are

### 1. Facebook Groups (80% of initial effort)
Minor hockey in Canada lives in Facebook Groups — "GTHL Parents," "Ontario Minor Hockey," regional association groups, "Hockey Moms/Dads" groups (some have 50k+ members). Parents in these groups literally ask "how do I get my kid shooting more this summer?" every week. This is where free products for hockey kids spread.

**Action:** Post as a parent/founder, not a brand.

### 2. Coaches directly (highest leverage per user)
One coach = 15–17 players at once. DM or email coaches you know, and post in coaching groups ("Hockey Coaches" FB groups, r/hockeycoaches). Pitch: "free way to see who's actually shooting at home this summer."

**Target:** Ten coaches = ~150 players. Fastest path to 500.

### 3. Instagram Reels / TikTok (brand-building, slower)
Hockey training content does huge numbers (#hockeytraining, driveway shooting clips). Compound effect over weeks. Worth starting now but don't rely on it for the first 500.

**Skip for now:** X/Twitter, LinkedIn, paid ads.

---

## 30-Day Launch Plan

### Week 1 — Friends & Family Seed (Target: 50 users)
- Message every hockey parent and coach you know personally
- Ask them to set up their kid this week
- Use feedback to identify confusing UX

### Week 2–3 — Coach Outreach (Target: +200)
- Email/DM 30 coaches in your area associations
- Offer to set their team up personally
- One paragraph, one link: hockeyshotchallenge.com/coach

### Week 2–4 — Facebook Group Posting (Target: +200)
- Post 2–3 groups per week, founder-voice
- Rotate regions: GTA first, then Ontario-wide, then Alberta/BC
- Solicit feedback to keep posts from feeling like ads

### Week 3+ — One Reel per Week
- Kid shooting in driveway → phone logging → leaderboard climbing
- 15 seconds, no talking needed
- Tag #hockeytraining #drivewaydrills

### Built-in Viral Loop
The BattleCard "You 247 vs Tyler 189" is inherently shareable. Lean on the Share button — kids and parents will screenshot 1v1 results. This is your organic growth engine.

---

## Asset Drafts

### Facebook Group Post (Founder Voice)

> My kid plays [U11] and like every hockey parent I've heard "he should be shooting 100 pucks a day" a thousand times. Getting him to actually do it was the hard part.
>
> So I built a free web app where kids log their shots and stickhandling, and every Monday they get matched 1v1 against a kid from another team — most shots by Sunday wins. There's a scoreboard, streaks, and ranks. Suddenly he's asking ME to go outside.
>
> It's completely free, no app to download, works in the browser: hockeyshotchallenge.com
>
> Would love feedback from other hockey parents — what would make your kid actually use this?

**Why this works:** Ends with a question. Keeps it from reading as an ad. Higher engagement.

### Coach Email/DM

Subject: Free tool to see which players are shooting at home

> Hi [name] — I built a free tool that shows you which of your players are shooting pucks at home this summer. Kids log shots in 5 seconds, you get a dashboard of who's putting in work before you ever get to the rink. Every Monday each kid gets a 1v1 battle vs a player from another team, which keeps them logging.
>
> Free for the whole team, no app to install. Happy to set your roster up for you in 10 minutes:
> hockeyshotchallenge.com/coach

### Instagram Reel / TikTok Script (15 seconds)

1. Clip: kid shooting in driveway (2s)
2. Phone screen: tap Wrist → 50 → Save (3s)
3. Screen: BattleCard "You 247 vs Tyler 189" (3s)
4. Text overlay: "He's asked to shoot every day this week" (4s)
5. End card: "Free · hockeyshotchallenge.com" (3s)

**Hashtags:** #hockeytraining #youthsports #drivewaydrills #hockeykids #officetraining

### Primary Visual Asset
Use the leaderboard card OG image (`public/og-image.png`) for all FB posts. The 247 vs 189 matchup is instantly recognizable and shareable.

---

## Tracking & Measurement

Add ref params to all outbound links before launch:
- `hockeyshotchallenge.com?ref=fb` — Facebook Groups
- `hockeyshotchallenge.com/coach?ref=coach` — Coach outreach
- `hockeyshotchallenge.com?ref=ig` — Instagram Reels

Store the `ref` param at sign-up time (add to `pending_profile` localStorage in AuthScreen) so you can report which channel converts best. Track this before doubling down.

---

## Success Metrics — First 500

| Milestone | Timeline | How |
|-----------|----------|-----|
| 50 users (seed) | End of Week 1 | Personal network |
| 100 users | Mid Week 2 | Early coach signups + FB buzz |
| 250 users | End of Week 3 | 3–5 coach teams + 8–10 FB group posts |
| 500 users | End of Week 4 | Compound: coaches recruiting coaches, parent shares |

If you hit 100 by end of Week 2, you're on pace. If it's slower, double down on coaches (highest ROI). If faster, lean into FB groups harder.

---

## Notes

- **All copy is founder voice, not corporate.** People buy from people, especially in niche communities like hockey.
- **Facebook Groups are the hack.** Don't underestimate this. Most VC-backed products miss this because it feels old. It's where hockey parents actually are.
- **Coaches are your distribution shortcut.** One well-placed coach recommendation = dozens of sign-ups.
- **Reels/TikTok compounds but is slow initially.** Start it Week 3, don't expect results for 6–8 weeks. By then you should already have 500+.
