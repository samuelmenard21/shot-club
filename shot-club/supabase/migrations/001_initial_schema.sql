-- ============================================================================
-- Shot Club · Phase 1 schema
-- Run this entire file in the Supabase SQL Editor.
-- ============================================================================

-- Clubs (e.g. Burlington Eagles) — future-proof for multi-team organizations
create table if not exists public.clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,            -- short, memorable code for joining
  director_id uuid references auth.users(id) on delete set null,
  created_at timestamptz default now()
);

-- Teams (e.g. Northstars U13) — belong optionally to a club
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  club_id uuid references public.clubs(id) on delete set null,
  name text not null,
  code text not null unique,            -- memorable word code for joining
  created_at timestamptz default now()
);

-- Players — one row per user
create table if not exists public.players (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  username text not null unique,        -- used for sign-in (e.g. connorm4821)
  position text check (position in ('F','D','G')) not null,
  age_bracket text check (age_bracket in ('6-10','11-14','15-18','18+')) not null,
  team_id uuid references public.teams(id) on delete set null,
  club_id uuid references public.clubs(id) on delete set null,
  is_coach boolean default false,
  is_club_director boolean default false,
  lifetime_shots integer default 0,     -- denormalized for leaderboard speed
  current_streak integer default 0,
  last_shot_date date,
  created_at timestamptz default now()
);

-- Shot logs — each row represents a batch of shots of a single type
create table if not exists public.shot_logs (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  shot_type text check (shot_type in ('Wrist','Snap','Slap','Backhand','Saves')) not null,
  count integer not null check (count > 0),
  session_id uuid,                      -- groups logs into sessions (nullable for now)
  log_date date not null default current_date,
  logged_at timestamptz default now()
);

create index if not exists idx_shot_logs_player_date on public.shot_logs(player_id, log_date);
create index if not exists idx_shot_logs_date on public.shot_logs(log_date);
create index if not exists idx_players_team on public.players(team_id);
create index if not exists idx_players_club on public.players(club_id);

-- Sessions — groups shot_logs (populated in Phase 2)
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  total_shots integer default 0,
  bucket_size integer                   -- how many pucks they started with
);

-- Rivals (Phase 2) — ghost-shot pairings
create table if not exists public.rivals (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  rival_player_id uuid not null references public.players(id) on delete cascade,
  head_to_head_record jsonb default '{"wins":0,"losses":0}'::jsonb,
  created_at timestamptz default now(),
  unique(player_id, rival_player_id)
);

-- Coach Sam messages (Phase 4) — inbox
create table if not exists public.coach_messages (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  from_coach_id uuid references public.players(id) on delete set null,
  body text not null,
  trigger_type text,                    -- 'sam_auto', 'coach_nudge', 'rank_up', etc.
  read_at timestamptz,
  created_at timestamptz default now()
);

-- Weekly recap snapshots (Phase 4)
create table if not exists public.weekly_recaps (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null references public.players(id) on delete cascade,
  week_start date not null,
  week_end date not null,
  snapshot jsonb not null,              -- full recap state
  created_at timestamptz default now(),
  unique(player_id, week_start)
);


-- ============================================================================
-- Row Level Security
-- ============================================================================

alter table public.clubs enable row level security;
alter table public.teams enable row level security;
alter table public.players enable row level security;
alter table public.shot_logs enable row level security;
alter table public.sessions enable row level security;
alter table public.rivals enable row level security;
alter table public.coach_messages enable row level security;
alter table public.weekly_recaps enable row level security;

-- Clubs + teams: publicly readable (needed for join-by-code and leaderboards)
create policy "clubs_read_all" on public.clubs for select using (true);
create policy "teams_read_all" on public.teams for select using (true);

-- Teams and clubs can be created by any authenticated user (coach/director signup)
create policy "clubs_insert_authed" on public.clubs for insert to authenticated with check (true);
create policy "teams_insert_authed" on public.teams for insert to authenticated with check (true);

-- Players: publicly readable for leaderboards
create policy "players_read_all" on public.players for select using (true);

-- A user can only write their own player row
create policy "players_insert_own" on public.players
  for insert to authenticated with check (auth.uid() = id);
create policy "players_update_own" on public.players
  for update to authenticated using (auth.uid() = id);

-- Shot logs: publicly readable, only the owner can write
create policy "shot_logs_read_all" on public.shot_logs for select using (true);
create policy "shot_logs_insert_own" on public.shot_logs
  for insert to authenticated with check (auth.uid() = player_id);
create policy "shot_logs_delete_own" on public.shot_logs
  for delete to authenticated using (auth.uid() = player_id);

-- Sessions: same pattern
create policy "sessions_read_all" on public.sessions for select using (true);
create policy "sessions_write_own" on public.sessions
  for all to authenticated using (auth.uid() = player_id) with check (auth.uid() = player_id);

-- Rivals: read public, write your own pairings
create policy "rivals_read_all" on public.rivals for select using (true);
create policy "rivals_write_own" on public.rivals
  for all to authenticated using (auth.uid() = player_id) with check (auth.uid() = player_id);

-- Coach messages: readable by the recipient, writable by any authed user (coach->kid)
create policy "coach_messages_read_own" on public.coach_messages
  for select to authenticated using (auth.uid() = player_id or auth.uid() = from_coach_id);
create policy "coach_messages_insert_authed" on public.coach_messages
  for insert to authenticated with check (true);
create policy "coach_messages_update_recipient" on public.coach_messages
  for update to authenticated using (auth.uid() = player_id);

-- Weekly recaps: readable by owner (public share link handled with signed URL separately)
create policy "weekly_recaps_read_own" on public.weekly_recaps
  for select to authenticated using (auth.uid() = player_id);


-- ============================================================================
-- Trigger: keep player.lifetime_shots and streak in sync
-- ============================================================================

create or replace function public.on_shot_log_insert()
returns trigger language plpgsql as $$
declare
  prev_date date;
begin
  -- Update lifetime shot count
  update public.players
    set lifetime_shots = lifetime_shots + new.count
  where id = new.player_id;

  -- Streak logic
  select last_shot_date into prev_date
  from public.players where id = new.player_id;

  if prev_date is null or prev_date < (new.log_date - interval '1 day') then
    update public.players set current_streak = 1, last_shot_date = new.log_date
      where id = new.player_id;
  elsif prev_date = (new.log_date - interval '1 day') then
    update public.players set current_streak = current_streak + 1, last_shot_date = new.log_date
      where id = new.player_id;
  elsif prev_date = new.log_date then
    -- same day, no streak change, but make sure last_shot_date is set
    update public.players set last_shot_date = new.log_date
      where id = new.player_id and last_shot_date is null;
  end if;

  return new;
end;
$$;

drop trigger if exists trg_on_shot_log_insert on public.shot_logs;
create trigger trg_on_shot_log_insert
  after insert on public.shot_logs
  for each row execute function public.on_shot_log_insert();


-- ============================================================================
-- Seed: nothing. Teams and clubs are created dynamically via signup/invite flow.
-- ============================================================================
