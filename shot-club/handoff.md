# Hockey Shot Challenge — Session 4 Handoff

> **For the next Claude (or human dev) picking this up.** Read this entire document before writing any code. It contains everything you need: project context, what's done, what's broken, file inventory, decisions already made, and the prioritized next-thread sequence.
>
> **Last updated:** end of Session 4
> **Author:** Claude (Session 4), specced with Sam Menard

---

## Table of Contents

1. [Project Context](#1-project-context)
2. [What Shipped in Session 4](#2-what-shipped-in-session-4)
3. [Critical Issues (Read Before Coding)](#3-critical-issues-read-before-coding)
4. [Decisions Already Locked In](#4-decisions-already-locked-in)
5. [Prioritized Plan for Next Thread](#5-prioritized-plan-for-next-thread)
6. [File Inventory](#6-file-inventory)
7. [Database Schema (Live Production State)](#7-database-schema-live-production-state)
8. [Verification Queries (Run at Start of Next Thread)](#8-verification-queries-run-at-start-of-next-thread)
9. [Sam's Working Style](#9-sams-working-style)
10. [Migration 002 — Full SQL Reference](#10-migration-002--full-sql-reference)

---

## 1. Project Context

**Hockey Shot Challenge** is a free off-ice training web app for youth hockey players (ages 6–18). Players log their at-home shots and stickhandling reps, follow daily routines, and compete on team / club / association leaderboards.

**Stack:**
- React + Vite (frontend)
- Supabase (Postgres database + auth + RLS)
- Netlify (hosting + Forms for contact)

**Repo:** `samuelmenard21/shot-club` on GitHub
**Live URL:** `https://hockeyshotchallenge.com`
**Repo path for app:** `https://github.com/samuelmenard21/shot-club/tree/main/shot-club`

**Sam's other active project (separate repo):** GoPowerSwitch — BC solar/battery installer matching service. Not relevant to this work but worth knowing for context if Sam mentions it.

**Target users (three audiences):**
- **Associations / leagues** (e.g., OMHA, OWHA): pre-seeded club pages exist for ~3,000 clubs already in the `clubs` table
- **Coaches**: sign up, get an invite link for their team, share with parents
- **Players + parents**: tap invite link → join team → log shots and drills

---

## 2. What Shipped in Session 4

### ✅ Phase 2 — Stickhandling drills (database + UI complete)

**Database:**
- `drill_logs` table: `(id, player_id, drill_type, count, duration_minutes, session_id, log_date, logged_at)` with CHECK constraint enforcing "count OR duration_minutes must be non-null"
- `drill_type` values: `'Stickhandling'`, `'Edge Work'` (only Stickhandling is used in UI right now)
- RLS on `drill_logs` mirrors `shot_logs` pattern (read-all, insert-own, delete-own)
- `players.lifetime_drill_reps` and `players.lifetime_drill_minutes` columns added
- `on_drill_log_insert` trigger: updates lifetime totals + extends `last_shot_date`/`current_streak` so drill logs count for streaks (streak is unified — any activity counts)
- `weekly_team_goals` extended with `challenge_type` (`'shots'|'stickhandling'|'combined'`, default `'shots'`) and `stickhandling_target` columns
- Views modified ADDITIVELY (existing columns preserved):
  - `current_week_player_progress` — added `stickhandling_reps_this_week`, `stickhandling_minutes_this_week`
  - `current_week_team_progress` — added `stickhandling_reps_total`, `stickhandling_minutes_total`, `pct_of_stickhandling_goal`

**Frontend:**
- New file `src/lib/drills.js` with `logDrill()` (supports negative values for undo) and `getDrillStats()`
- `src/screens/HomeScreen.jsx` rewritten: two stickhandling tiles (Reps / Minutes) below the shots grid, share the same NumberPad component, full undo support, optimistic updates with rollback
- Stats row (Today / This week / Lifetime) is **shots-only by design** — drills shown only on the drill tiles themselves to avoid muddying the headline numbers

### ✅ Marketing pages — Contact section live

- New file `src/components/ContactSection.jsx` — reusable, posts to Netlify Forms via fetch, JS-built mailto for spam protection, honeypot field
- Hidden `<form name="contact">` added to `index.html` so Netlify detects it at build time
- ContactSection embedded above footer on: `LandingScreen`, `ForClubsScreen`, `ClubScreen`
- Netlify Forms detected the `contact` form, notifications routed to `samuelmenard@gmail.com`
- Sam was considering Netlify Pro ($20/mo) at end of session — note: free tier already includes form notifications and 100 submissions/month, so Pro is optional

### ✅ LandingScreen complete redesign

- Hero is now a **3-audience picker** (no separate generic hero): Associations → Coaches → Players ordering
- "What you track" — two cards: Shots + Stickhandling drills with concrete examples
- "Inside the app" — phone mockup shows stickhandling tiles
- "Routines" section — Summer (5d/wk) and In-season (3d/wk) routine cards with day-by-day breakdown
- "Compete" section — two leaderboard mockups: "Your team this week" + "Club vs. club" (Burlington Eagles vs. Oakville Hornets)
- Second-pass audience picker before FAQ
- FAQ updated for stickhandling + goalies
- Final CTA: "Stop telling your kid to shoot more. Show them their numbers."
- Top-nav logo clickable → home
- Footer brand logo clickable → home
- Grade 6 reading level throughout

### ✅ ClubScreen.jsx — softened to "library" language

Dropped "every day" / "daily skill drop" claims in favor of "growing skill library" framing.

**Not done:** `ForClubsScreen.jsx` still has the old "every day" language. On the backlog.

### ✅ Data cleanup — OWHL → OWHA complete

All club slugs containing `owhl` were renamed to `owha` using `replace(slug, 'owhl', 'owha')`. Verified zero rows remain with `owhl` in slug. Name field had no "OWHL" occurrences so no fix needed there.

OWHA = Ontario Women's Hockey Association (the actual real-world org name). Previous data had it wrong.

### ✅ Outreach drafted

Email drafted for Oakville Hornets hockey director using parent-to-parent angle, with link to `/clubs/oakville-hornets-owha`. **Not sent as of end of Session 4** — Sam was identifying the recipient.

---

## 3. Critical Issues (Read Before Coding)

The onboarding audit at the end of Session 4 surfaced major design holes. **None of these were fixed in this thread.** All deferred to next thread per Sam's explicit decision.

### 🔴 Association director onboarding is a dead end

- Homepage "FOR LEAGUES & ASSOCIATIONS" card goes to `/for-clubs`
- `/for-clubs` is a long marketing page with **no search and no club directory**
- An association director who lands there has no way to find their own club page
- ~3,000 pre-seeded club pages exist and are technically unreachable from the homepage
- **Fix planned (next thread):** Add a club search box on the homepage hero

### 🔴 Coach signup forces club creation — can't claim pre-seeded clubs

- `CoachAuthScreen.jsx` step 2 asks for "Club name" as **free text only**
- No search of existing clubs
- Every coach signup creates a NEW `clubs` row, even if their club is already pre-seeded
- **Result:** Burlington Eagles pre-seeded SEO page (`burlington-eagles-omha`) and Burlington Eagles real-coach club will be two separate rows, never connected
- **Fix planned (next thread):** Coach signup gets 4 options — Search for my club / Claim a pre-seeded club / Create new / "Just my team, no club"

### 🔴 `searchClubs()` function does NOT exist in `clubs.js`

- Flagged in Session 3 handoff, still missing
- This is a blocker for both fixes above
- **Fix planned (next thread, FIRST):** Write `searchClubs(query, limit)` in `clubs.js` using `.ilike()` against the `clubs` table

### 🟡 Player team-pick is free-text, causing leaderboard splits

- `AuthScreen.jsx` "Join a team" path asks player to type team name
- Two parents typing slightly different names ("U11 EAGLES" vs "U11 A EAGLES") end up on separate leaderboards
- **Fix planned (next thread):** Top-N existing teams shown + free-text fallback

### 🟡 Skill Video Library NEVER built

- Original Session 3 handoff specced a `skill_videos` table with 8 starter videos (iTrain Hockey + How To Hockey channels)
- No code was written
- Stickhandling drills are logged but kids have **zero educational content** on what drills to do
- **Fix planned (next thread or later):** Build the skill video library + add stickhandling videos
- Sam needs to reach out to iTrain Hockey + How To Hockey channels for embed permission

### 🟡 Marketing copy partial

- `LandingScreen.jsx` redesigned with grade 6 copy ✅
- `ClubScreen.jsx` softened from "every day" to "library" ✅
- `ForClubsScreen.jsx` still says "every day" — needs same sweep
- `index.html` JSON-LD FAQPage block still has "every day" claims

### 🟡 Coach dashboard not updated for stickhandling

- DB views now return stickhandling columns
- `CoachDashboardScreen.jsx` UI has not been touched to surface them
- Coaches see shots-only data even though DB tracks both
- **Fix planned:** After Phase C of next thread

### 🟡 Weekly goal-setting UI doesn't support stickhandling

- DB supports `challenge_type` + `stickhandling_target` columns
- No UI exists to set these
- **Fix planned:** With coach dashboard work

---

## 4. Decisions Already Locked In

These came out of the Session 4 onboarding audit. **Do not re-litigate — Sam already decided.**

1. **All coaches at a club are equal.** No director/admin role. If `coaches.is_director` column exists, ignore it. If `players.is_club_director` exists (it does), treat it as legacy.

2. **Honor system for claiming pre-seeded clubs.** Anyone can claim. No email-domain checks, no approvals. First coach to claim attaches their `coaches.club_id` to that pre-seeded club's id. Subsequent coaches can also attach to the same club.

3. **Player team-pick UX:** Show top N existing teams in the player's club as picker chips. If their team isn't listed, they can type a new one. Don't dump all 50 teams in a big club — top N then fallback.

4. **"Just my team — no club" fallback:** Coaches who don't have an association can attach to a seeded `independent` pseudo-club. Need to seed this row before the new coach signup flow goes live.

5. **Streak is unified.** Logging shots OR drills both extend `current_streak` and `last_shot_date`. (Column name stays — semantically it now means "last active date.")

6. **Stats row on home is shots-only.** Stickhandling totals show only on the drill tiles. Don't combine them into headline numbers.

7. **Association/Club terms are interchangeable** in user-facing copy for now. Real associations layer (OMHA/OWHA rollup pages) is a future thread.

---

## 5. Prioritized Plan for Next Thread

### Phase A — Foundation (must do first)

1. **Run verification queries** (Section 8) and paste results before writing code
2. **Verify `coaches` table schema** — especially: is `is_director` column there? Is there a `coaches.user_id`? RLS policies?
3. **Add `searchClubs(query, limit)` to `clubs.js`** — fuzzy match on `name` and `city`, ordered by relevance, limited. Use `.ilike()`. Verify whether a `search_text` indexed column exists; if not, just search `name` and `city` directly.
4. **Add `getClubByName(name)`** — exact match for duplicate detection
5. **Add `claimClub(clubId)`** — attaches current coach to existing pre-seeded club
6. **Seed `independent` pseudo-club:**
   ```sql
   insert into public.clubs (slug, name, city, is_active)
   values ('independent', 'Independent Teams', null, true)
   on conflict (slug) do nothing;
   ```

### Phase B — Homepage club search (small, fast win)

7. Add club search input to `LandingScreen.jsx` hero, between "WHO ARE YOU?" label and the 3 audience cards
8. Real-time autocomplete from `searchClubs()` (debounced ~200ms)
9. Tap a suggestion → navigate to `/clubs/{slug}`
10. Empty state: "Don't see your club? It might not be on the list yet. [Bring it on board →]" linking to `/coach`

### Phase C — Coach signup rewrite (the big one)

11. Rewrite `CoachAuthScreen.jsx` step 2 with 4 options:
    - 🔍 **Find my club** (search → show pre-seeded clubs → claim)
    - ➕ **Create a new club** (free text, current behavior)
    - 🏒 **Just my team — no club** (attaches to `independent` pseudo-club)
    - ← Back button
12. On claim: call `claimClub(clubId)` instead of `createClub(...)`
13. If claim fails (e.g., RLS blocks), show friendly error
14. After successful claim/create: redirect to dashboard as currently

### Phase D — Player improvements (separate thread or after Phase C)

15. Player team-pick UI: top-N existing teams as chips + type-to-create fallback
16. Verify player can see teammates after sign-up (test this works today)
17. Possibly: show club crest on team pick screen to confirm they're in the right place

### Phase E — Skill videos (separate thread)

18. Build `skill_videos` table per original Session 3 spec (saved in conversation log)
19. Seed 8 shot videos
20. Source 3–5 stickhandling videos (Sam to identify channels)
21. Build video library UI on player home screen
22. Sam: reach out to iTrain Hockey + How To Hockey for embed permission

### Phase F — Cleanup

23. `ForClubsScreen.jsx` — sweep "every day" → "growing library"
24. `index.html` JSON-LD FAQPage block — same sweep
25. `CoachDashboardScreen.jsx` — surface stickhandling view columns
26. Weekly goal UI — support `challenge_type` + `stickhandling_target`

---

## 6. File Inventory

**Raw URL pattern:** `https://raw.githubusercontent.com/samuelmenard21/shot-club/refs/heads/main/shot-club/<PATH>`

### Files I (Session 4 Claude) read and/or wrote

| Path | Session 4 Status | Notes |
|---|---|---|
| `index.html` | Modified | Added hidden Netlify Forms registration |
| `src/App.jsx` | Read | Route table source of truth |
| `src/lib/clubs.js` | Read | **MISSING `searchClubs()` — Phase A target** |
| `src/lib/shots.js` | Read | Solid, no changes needed |
| `src/lib/drills.js` | **NEW** | Stickhandling logging |
| `src/components/ContactSection.jsx` | **NEW** | Contact form |
| `src/screens/HomeScreen.jsx` | Rewrote | Stickhandling tiles added |
| `src/screens/LandingScreen.jsx` | Rewrote | New 3-audience homepage |
| `src/screens/ForClubsScreen.jsx` | Modified | Added ContactSection (copy sweep still needed) |
| `src/screens/ClubScreen.jsx` | Rewrote | ContactSection + library copy |
| `src/screens/AuthScreen.jsx` | Read | **Phase D target** |
| `src/screens/CoachAuthScreen.jsx` | Read | **Phase C target — full rewrite** |
| `src/screens/ClubJoinScreen.jsx` | Read | Working well, no changes |
| `supabase/migrations/001_initial_schema.sql` | Read | **OUT OF DATE — DO NOT TRUST** |

### Files referenced/imported but I haven't personally read

| Path | Why it exists | Action |
|---|---|---|
| `src/main.jsx` | Vite entry point | Read if touching mounting / providers |
| `src/index.css` | Global styles, CSS vars | Read for design tokens (`--bg`, `--accent`, etc.) |
| `src/hooks/useAuth.js` | Auth state hook | Read before touching auth flows |
| `src/lib/auth.js` | `signUp`, `signIn`, `signUpCoach`, `signInCoach` | Read before touching auth |
| `src/lib/seo.js` | `setSEO`, `addStructuredData`, `CANONICAL_URL` | Read before touching SEO |
| `src/lib/supabase.js` | Supabase client | Standard, read if curious |
| `src/lib/coachSam.js` | `pickLineStable` for greetings | Read if touching Coach Sam character |
| `src/lib/ranks.js` | `getRank()` for player ranks | Read if touching rank logic |
| `src/screens/CoachDashboardScreen.jsx` | `/coach/dashboard` route | **Read before Phase F (#25)** |
| `scripts/generate-club-sitemap.js` | Build-time sitemap from Supabase | Read if changing club discoverability |

### Repo-root config files

- `README.md`, `netlify.toml`, `package.json`, `package-lock.json`, `vite.config.js`

### Files that may or may not exist (verify)

- `src/lib/leaderboard.js` (likely)
- `src/screens/LeaderboardScreen.jsx` (likely)
- `src/screens/PlayerCardScreen.jsx` (likely — referenced in marketing copy)
- Various `src/components/*.jsx` files
- `supabase/functions/` directory
- `public/og-image.png` (referenced in index.html — if missing, OG previews break)

**How to discover what actually exists:** browse the repo file tree on GitHub or ask Sam to paste `ls -R src/`.

---

## 7. Database Schema (Live Production State)

**`001_initial_schema.sql` does NOT reflect production.** Production has been evolved via direct SQL edits without matching migration files. Always query the live schema before writing SQL.

### Verified column lists

**`sessions`**
```
id, player_id, started_at, ended_at, total_shots, bucket_size,
duration_minutes, shot_type, is_flagged, flag_reason
```

**`shot_logs`**
```
id, player_id, shot_type, count, session_id, log_date, logged_at
```

**`drill_logs`** (NEW in Session 4)
```
id, player_id, drill_type, count, duration_minutes, session_id, log_date, logged_at
```

**`players`** (partial — verify rest)
```
id, display_name, username, position, age_bracket, team_id, club_id,
is_coach, is_club_director, lifetime_shots, current_streak, last_shot_date,
lifetime_drill_reps (NEW), lifetime_drill_minutes (NEW)
```

**`weekly_team_goals`**
```
id, team_id, week_starting, shot_target, session_target, set_by_default,
created_at, updated_at,
challenge_type (NEW, default 'shots'),
stickhandling_target (NEW, nullable)
```

**`clubs`**
```
slug, name, city, is_active, ... (verify rest with query)
```

### Key conventions

- **Week boundary:** `date_trunc('week', now() at time zone 'utc')::date` — Monday UTC. Use this EXACT expression in any new views to stay consistent.
- **Shot types capitalized:** `'Wrist','Snap','Slap','Backhand','Saves'`
- **Drill types capitalized:** `'Stickhandling','Edge Work'`
- **Views aggregate from `sessions`** (NOT `shot_logs`), filtered by `is_flagged = false`. This was a Session 4 discovery — the handoff doc had it wrong.

### Tables known to exist (full list, not all schemas verified)

```
achievement_defs, clubs, coach_messages, coaches, current_week_player_progress (view),
current_week_team_progress (view), daily_progress, drill_logs (NEW), invites, players,
rivals, sessions, shot_logs, team_coaches, team_invites, teams, weekly_recaps,
weekly_team_goals
```

---

## 8. Verification Queries (Run at Start of Next Thread)

Paste these into Supabase SQL Editor and share results before writing any code.

```sql
-- 1. Confirm OWHL cleanup is still clean
select count(*) from public.clubs where slug ilike '%owhl%';
-- Expected: 0

-- 2. Coaches table schema (needed for Phase A)
select column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema = 'public' and table_name = 'coaches'
order by ordinal_position;

-- 3. Clubs table schema (especially: does `search_text` column exist?)
select column_name, data_type
from information_schema.columns
where table_schema = 'public' and table_name = 'clubs'
order by ordinal_position;

-- 4. Teams table schema
select column_name, data_type
from information_schema.columns
where table_schema = 'public' and table_name = 'teams'
order by ordinal_position;

-- 5. Confirm stickhandling tables and triggers survived
select count(*) from public.drill_logs;

select column_name from information_schema.columns
where table_schema = 'public' and table_name = 'weekly_team_goals'
  and column_name in ('challenge_type','stickhandling_target');
-- Expected: 2 rows

-- 6. Sanity check the views still have the new stickhandling columns
select column_name from information_schema.columns
where table_schema = 'public' and table_name = 'current_week_player_progress'
  and column_name ilike '%stickhandling%';

select column_name from information_schema.columns
where table_schema = 'public' and table_name = 'current_week_team_progress'
  and column_name ilike '%stickhandling%';

-- 7. List all tables for situational awareness
select table_name from information_schema.tables
where table_schema = 'public' order by table_name;

-- 8. List all views
select viewname from pg_views where schemaname = 'public' order by viewname;
```

---

## 9. Sam's Working Style

- **Full file replacements only** — never partial edits or "insert this line here." Sam isn't confident dropping one new line into a file.
- **Paste raw GitHub URLs** for file fetching. Pattern: `https://raw.githubusercontent.com/samuelmenard21/shot-club/refs/heads/main/shot-club/<PATH>`
- **SQL pasted inline in chat** for direct copying into Supabase SQL Editor. Don't use `create_file` for SQL — keep it inline so Sam can paste.
- **Keep things as simple as possible.** Sam prefers fewer abstractions over clever ones.
- **Grade 6 reading level** for all user-facing copy.
- **Structured multiple-choice questions** at decision points (use `ask_user_input_v0` tool) rather than open-ended chat.
- **Sam's context:** hockey parent in Burlington, ON. Two kids in minor hockey. Builds web apps as a side project. Casual, practical communication style.
- **Don't pretend things are done if they aren't.** Session 4 had to undo earlier Claudes' work that claimed things shipped but didn't. Be honest about what's actually in the codebase.

### Important: things to NOT assume

1. `001_initial_schema.sql` is wrong. Don't trust it.
2. `searchClubs()` does not exist in `clubs.js` even though prior Claudes referenced it.
3. Migration `002_stickhandling.sql` is **not in the repo** — only ran live. Contents documented in Section 10 below.
4. `players.is_club_director` exists but is legacy. Sam decided all coaches are equal.
5. `public/og-image.png` may not exist — verify before claiming OG previews work.
6. There is no `search_text` column on `clubs` (or if there is, it wasn't verified). Don't assume.

---

## 10. Migration 002 — Full SQL Reference

This migration ran successfully in production at the start of Session 4 but is **NOT in the repo as a file.** If you need to reference or re-run it, here's the full SQL:

```sql
-- ============================================================================
-- Shot Club · Phase 2 — Stickhandling drills (final, schema-aware)
-- ============================================================================

-- 1. drill_logs table
create table if not exists public.drill_logs (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  drill_type text not null check (drill_type in ('Stickhandling','Edge Work')),
  count integer check (count is null or count > 0),
  duration_minutes numeric(5,2) check (duration_minutes is null or duration_minutes > 0),
  session_id uuid,
  log_date date not null default (now() at time zone 'utc')::date,
  logged_at timestamptz not null default now(),
  constraint drill_logs_count_or_minutes
    check (count is not null or duration_minutes is not null)
);

create index if not exists idx_drill_logs_player_date on public.drill_logs(player_id, log_date);
create index if not exists idx_drill_logs_date on public.drill_logs(log_date);

-- 2. Lifetime drill totals on players
alter table public.players
  add column if not exists lifetime_drill_reps integer default 0,
  add column if not exists lifetime_drill_minutes numeric(8,2) default 0;

-- 3. Trigger: lifetime totals + unified streak
create or replace function public.on_drill_log_insert()
returns trigger language plpgsql as $$
declare
  prev_date date;
begin
  update public.players
     set lifetime_drill_reps    = coalesce(lifetime_drill_reps, 0)    + coalesce(new.count, 0),
         lifetime_drill_minutes = coalesce(lifetime_drill_minutes, 0) + coalesce(new.duration_minutes, 0)
   where id = new.player_id;

  select last_shot_date into prev_date
    from public.players where id = new.player_id;

  if prev_date is null or prev_date < (new.log_date - interval '1 day') then
    update public.players
       set current_streak = 1, last_shot_date = new.log_date
     where id = new.player_id;
  elsif prev_date = (new.log_date - interval '1 day') then
    update public.players
       set current_streak = coalesce(current_streak, 0) + 1, last_shot_date = new.log_date
     where id = new.player_id;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_on_drill_log_insert on public.drill_logs;
create trigger trg_on_drill_log_insert
  after insert on public.drill_logs
  for each row execute function public.on_drill_log_insert();

-- 4. RLS on drill_logs
alter table public.drill_logs enable row level security;

drop policy if exists "drill_logs_read_all"    on public.drill_logs;
drop policy if exists "drill_logs_insert_own"  on public.drill_logs;
drop policy if exists "drill_logs_delete_own"  on public.drill_logs;

create policy "drill_logs_read_all"   on public.drill_logs for select using (true);
create policy "drill_logs_insert_own" on public.drill_logs for insert
  to authenticated with check (auth.uid() = player_id);
create policy "drill_logs_delete_own" on public.drill_logs for delete
  to authenticated using (auth.uid() = player_id);

-- 5. Extend weekly_team_goals
alter table public.weekly_team_goals
  add column if not exists challenge_type text
    not null default 'shots'
    check (challenge_type in ('shots','stickhandling','combined')),
  add column if not exists stickhandling_target integer
    check (stickhandling_target is null or stickhandling_target > 0);

-- 6. current_week_player_progress — preserve existing 8 columns, append 2
create or replace view public.current_week_player_progress as
with current_monday as (
  select date_trunc('week'::text, (now() at time zone 'utc'::text))::date as monday
)
select
  p.id as player_id,
  p.username,
  p.display_name,
  p.team_id,
  p.club_id,
  coalesce(sum(case when s.is_flagged = false then coalesce(s.total_shots, 0) else 0 end), 0::bigint)
    as shots_this_week,
  coalesce(count(s.id) filter (where s.is_flagged = false), 0::bigint)
    as sessions_this_week,
