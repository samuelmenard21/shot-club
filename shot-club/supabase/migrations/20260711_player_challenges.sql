-- Player challenges — each player can select/track a challenge
create table if not exists public.player_challenges (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null unique references public.players(id) on delete cascade,
  challenge_type text check (challenge_type in ('5k', '10k', 'custom')) not null,
  goal_shots integer not null check (goal_shots > 0),
  started_at timestamptz default now(),
  target_completion_date date,
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- Team challenges — coach sets a weekly/seasonal challenge for the team
create table if not exists public.team_challenges (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete cascade,
  name text not null,
  goal_shots integer not null check (goal_shots > 0),
  challenge_type text check (challenge_type in ('5k', '10k', 'custom')) not null,
  week_start date not null,
  week_end date,
  completed_at timestamptz,
  created_by uuid references public.players(id) on delete set null,
  created_at timestamptz default now(),
  unique(team_id, week_start)
);

-- Association challenges — org-wide challenge across multiple teams
create table if not exists public.association_challenges (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  name text not null,
  description text,
  goal_shots integer not null check (goal_shots > 0),
  challenge_type text check (challenge_type in ('5k', '10k', 'custom')) not null,
  start_date date not null,
  end_date date not null,
  created_by uuid references public.players(id) on delete set null,
  created_at timestamptz default now()
);

-- Challenge participants — track who joined which challenge
create table if not exists public.challenge_participants (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid not null references public.association_challenges(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  team_id uuid references public.teams(id) on delete set null,
  joined_at timestamptz default now(),
  completed_at timestamptz,
  unique(challenge_id, player_id)
);

-- Indexes
create index if not exists idx_player_challenges_player on public.player_challenges(player_id);
create index if not exists idx_team_challenges_team on public.team_challenges(team_id);
create index if not exists idx_team_challenges_week on public.team_challenges(week_start);
create index if not exists idx_association_challenges_club on public.association_challenges(club_id);
create index if not exists idx_challenge_participants_challenge on public.challenge_participants(challenge_id);
create index if not exists idx_challenge_participants_player on public.challenge_participants(player_id);

-- RLS
alter table public.player_challenges enable row level security;
alter table public.team_challenges enable row level security;
alter table public.association_challenges enable row level security;
alter table public.challenge_participants enable row level security;

-- Player challenges: readable by all, writable by owner
create policy "player_challenges_read_all" on public.player_challenges for select using (true);
create policy "player_challenges_write_own" on public.player_challenges
  for all to authenticated using (auth.uid() = player_id) with check (auth.uid() = player_id);

-- Team challenges: readable by all, writable by coach/director
create policy "team_challenges_read_all" on public.team_challenges for select using (true);
create policy "team_challenges_write_coach" on public.team_challenges
  for insert to authenticated with check (true);
create policy "team_challenges_update_coach" on public.team_challenges
  for update to authenticated using (true);

-- Association challenges: readable by all, writable by club director
create policy "association_challenges_read_all" on public.association_challenges for select using (true);
create policy "association_challenges_write_director" on public.association_challenges
  for all to authenticated with check (true);

-- Challenge participants: readable by all, writable by authenticated users
create policy "challenge_participants_read_all" on public.challenge_participants for select using (true);
create policy "challenge_participants_write_authed" on public.challenge_participants
  for insert to authenticated with check (true);
