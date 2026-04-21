# Shot Club

Off-ice hockey shot tracker for kids. Phase 1 build — auth, home screen with the bucket model, Coach Sam greetings, optimistic shot logging, Supabase persistence.

---

## What's in this build

- **Frictionless signup**: name + position + age + optional team code. No email, no password, no parental form. A username is generated for them.
- **Username-only signin** for returning kids.
- **Bucket-based shot logging**: kid counts their pucks, starts a bucket, taps shot types as they rip them. Four shot types (Wrist / Snap / Slap / Backhand), or Saves for goalies.
- **Optimistic UI**: every tap registers instantly and animates. Writes batch to Supabase every 1.5 seconds.
- **Coach Sam greeting**: one stable line per day per kid, pulled from the voice bible.
- **Live stats**: today / this week / lifetime, updated as you shoot.
- **Rank system**: 7 ranks × 3 micro-tiers (I, II, III), computed from lifetime shots.
- **Streak tracking**: handled by a Postgres trigger that updates `current_streak` on every log.
- **Teammate pace**: shows a random teammate's lifetime count with a live gap.
- **Bottom nav** with placeholders for Card / Team / More (Phase 2+).

---

## Setting up Supabase (10 minutes)

### 1. Create a project

1. Go to [supabase.com](https://supabase.com) and sign in (free tier is fine).
2. Click **New project**. Name it `shot-club`. Choose a region close to your users. Save the database password somewhere — you won't need it day-to-day but it's useful if you go to production.
3. Wait 2–3 minutes for provisioning.

### 2. Run the schema migration

1. In your project dashboard, go to the **SQL Editor** (left sidebar, looks like `< >`).
2. Click **New query**.
3. Open the file `supabase/migrations/001_initial_schema.sql` from this repo.
4. Copy its entire contents, paste into the SQL editor, and click **Run**.
5. You should see `Success. No rows returned.` — the schema, RLS policies, and streak trigger are now live.

### 3. Disable email confirmation

Kids' "emails" (`connorm4821@hsc.app`) aren't real. You need to turn off the confirmation requirement.

1. Go to **Authentication → Sign In / Providers → Email** (formerly under Settings → Auth).
2. Turn **Confirm email** OFF.
3. Save.

### 4. Grab your credentials

1. Go to **Project Settings → Data API** (or **API**, depending on dashboard version).
2. Copy the **Project URL** — this is `VITE_SUPABASE_URL`.
3. Copy the **anon public** key — this is `VITE_SUPABASE_ANON_KEY`.

### 5. Configure the app

```bash
cp .env.example .env
```

Open `.env` and paste the two values.

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Try the full flow:
1. Enter a team code like `NORTHSTARS` (or skip it).
2. Step 2: name, position, age bracket.
3. Step 3: note the generated username (you'll need it to sign back in).
4. Tap "Log my first bucket", count your pucks, start a bucket, tap shot types.

To test returning users: open an incognito window, go to the signin screen, type the username, and you're back in.

---

## Deploying to Netlify

Netlify works great for this. If you want alternatives I cover those at the bottom.

### Option A — Git-connected (recommended)

1. Push this repo to GitHub (create a new empty repo first):
   ```bash
   git init
   git add .
   git commit -m "Phase 1 — Shot Club"
   git remote add origin https://github.com/YOUR_USERNAME/shot-club.git
   git branch -M main
   git push -u origin main
   ```

2. Go to [app.netlify.com](https://app.netlify.com) and click **Add new site → Import from Git**.
3. Connect your GitHub, select the `shot-club` repo.
4. Netlify will auto-detect the Vite config. Build command: `npm run build`. Publish directory: `dist`. (Already defined in `netlify.toml`.)
5. Before deploying, click **Add environment variables** and add:
   - `VITE_SUPABASE_URL` — your project URL
   - `VITE_SUPABASE_ANON_KEY` — your anon key
6. Click **Deploy**. First build takes ~1 min.
7. Netlify gives you a URL like `random-name-12345.netlify.app`. You can rename it in **Site configuration → Change site name**.

Every future `git push` to `main` auto-deploys.

### Option B — Drag and drop (faster for a one-off test)

```bash
npm run build
```

Then drag the `dist` folder onto [app.netlify.com/drop](https://app.netlify.com/drop). Done in 30 seconds. But you'll need to redeploy manually each time, and env vars need to be set *before* the build on your local machine, so git-connected is better for real use.

### Custom domain (optional)

In Netlify, **Domain management → Add a domain**. They'll walk you through DNS. Works with any domain you own.

---

## Alternatives to Netlify

Honestly, stick with Netlify for now. But if you ever want to switch:

| Host | Why you might switch |
|------|---|
| **Vercel** | Slightly faster builds, better dashboard. Same price (free). Setup is nearly identical. |
| **Cloudflare Pages** | Generous free tier, fastest global CDN. If you ever go big, Cloudflare's free bandwidth is unbeatable. |
| **Supabase hosting** | Supabase now offers static hosting. Keeps everything in one platform. Newer, less battle-tested. |

All three work with the same `npm run build` + `dist` folder setup. Just copy your env vars into their dashboards.

---

## Project structure

```
shot-club/
├── index.html                  — HTML entry, Barlow fonts, theme color
├── netlify.toml                — deploy config
├── package.json
├── vite.config.js
├── .env.example                — copy to .env and fill in
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql    — run this in Supabase SQL editor
└── src/
    ├── main.jsx                — React root
    ├── App.jsx                 — routes + bottom nav
    ├── index.css               — global styles, CSS variables, animations
    ├── lib/
    │   ├── supabase.js         — Supabase client singleton
    │   ├── auth.js             — signup / signin / current player
    │   ├── shots.js            — logShots, getStats, getRandomTeammate
    │   ├── ranks.js            — 7 ranks × 3 tiers, computed from lifetime_shots
    │   └── coachSam.js         — voice bible (Phase 1 subset)
    ├── hooks/
    │   └── useAuth.jsx         — player context + session management
    └── screens/
        ├── AuthScreen.jsx      — 3-step onboarding + signin
        └── HomeScreen.jsx      — bucket + shot logging + stats
```

---

## Testing the schema (quick sanity check)

After running the migration, you can verify from the SQL editor:

```sql
select table_name from information_schema.tables
where table_schema = 'public'
order by table_name;
```

You should see: `clubs`, `coach_messages`, `players`, `rivals`, `sessions`, `shot_logs`, `teams`, `weekly_recaps`.

After logging your first shots, check:

```sql
select display_name, lifetime_shots, current_streak, last_shot_date
from players;

select shot_type, count, log_date
from shot_logs
order by logged_at desc limit 10;
```

---

## Notes on what's intentionally not built yet

- **Sessions**: the `sessions` table is created but not populated. In Phase 2 we'll group shot_logs by 5-min inactivity gaps.
- **Offline queue**: current optimistic UI works but doesn't persist across page reloads if Supabase is unreachable. Real offline support uses IndexedDB, coming in Phase 2.
- **Leaderboards, player card, coach dashboard, club hierarchy, drills, rivals, weekly recap**: all Phase 2-4 as we planned.
- **Coach mode**: the `is_coach` / `is_club_director` columns exist but the coach dashboard UI is Phase 3.

---

## Things to watch in production

- **Email confirmation must be off** or no one can sign up.
- **RLS policies** on the migration are permissive-read (for leaderboards), own-write. Review before anything sensitive ships.
- **Rate limits**: Supabase free tier allows 50k monthly active users and 500MB of data. Plenty for launch.
- **The universal password** in `src/lib/auth.js` is `shotclub-pw-v1`. It's hardcoded because kids never see it. Not a secret — anyone reading the code can sign in as any user *if they know the username*. That's the trade-off for "no real auth for kids." For the Phase 1 audience (kids and their coach), this is fine. Before going wider, consider moving to device-bound magic links.

---

## What to build next (Phase 2)

In priority order, from the design work we did together:

1. **Player card screen** — the shareable brag object with rank badge, card number, stats breakdown.
2. **Team leaderboard** — the social loop. Weekly + all-time views, team + global scope.
3. **Ghost shot race mode** — pick a rival, live gap, head-to-head record.
4. **Session model** — group shot logs into sessions for better stats ("your best session: 184 in 22 min").
5. **Coach invite flow** — text template, QR poster download, share link.

Each is a self-contained chunk. I can write them in sequence when you're ready.
