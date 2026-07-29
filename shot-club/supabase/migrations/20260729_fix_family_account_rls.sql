-- Fixes a systemic RLS bug from before the family-account model.
--
-- 20260626_family_accounts.sql added players.account_id (the Google auth
-- user that owns one or more player profiles) and correctly updated the
-- players table's OWN policies to check `auth.uid() = id OR auth.uid() =
-- account_id`. It did not touch every OTHER table keyed by player_id, which
-- still checks the old `auth.uid() = player_id` directly — true only when a
-- player's own id equals their auth uid (the "legacy", pre-family-account
-- backfill: account_id = id). For any player added under the family model
-- (a second or third child on one parent Google account, each with their own
-- freshly-generated players.id distinct from account_id), every write this
-- naive check gates has been silently rejected by RLS: shot_logs inserts,
-- sessions, rivals pairings, coach_messages updates, weekly_recaps reads —
-- and now player_challenges, which is how this was actually caught (a real
-- "new row violates row-level security policy for table player_challenges"
-- in production).
--
-- One helper function replaces the repeated auth.uid()=player_id check
-- everywhere, so this can't drift out of sync across tables again.

create or replace function public.owns_player(target_player_id uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.players
    where id = target_player_id
      and (id = auth.uid() or account_id = auth.uid())
  );
$$;

-- shot_logs
drop policy if exists "shot_logs_insert_own" on public.shot_logs;
create policy "shot_logs_insert_own" on public.shot_logs
  for insert to authenticated with check (public.owns_player(player_id));

drop policy if exists "shot_logs_delete_own" on public.shot_logs;
create policy "shot_logs_delete_own" on public.shot_logs
  for delete to authenticated using (public.owns_player(player_id));

-- sessions
drop policy if exists "sessions_write_own" on public.sessions;
create policy "sessions_write_own" on public.sessions
  for all to authenticated using (public.owns_player(player_id)) with check (public.owns_player(player_id));

-- rivals
drop policy if exists "rivals_write_own" on public.rivals;
create policy "rivals_write_own" on public.rivals
  for all to authenticated using (public.owns_player(player_id)) with check (public.owns_player(player_id));

-- coach_messages
drop policy if exists "coach_messages_read_own" on public.coach_messages;
create policy "coach_messages_read_own" on public.coach_messages
  for select to authenticated using (public.owns_player(player_id) or auth.uid() = from_coach_id);

drop policy if exists "coach_messages_update_recipient" on public.coach_messages;
create policy "coach_messages_update_recipient" on public.coach_messages
  for update to authenticated using (public.owns_player(player_id));

-- weekly_recaps
drop policy if exists "weekly_recaps_read_own" on public.weekly_recaps;
create policy "weekly_recaps_read_own" on public.weekly_recaps
  for select to authenticated using (public.owns_player(player_id));

-- player_challenges — the one actively blocking in production right now
drop policy if exists "player_challenges_write_own" on public.player_challenges;
create policy "player_challenges_write_own" on public.player_challenges
  for all to authenticated using (public.owns_player(player_id)) with check (public.owns_player(player_id));
