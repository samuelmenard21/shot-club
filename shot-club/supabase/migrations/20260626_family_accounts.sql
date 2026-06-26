-- Family accounts + first name migration
-- Run this in Supabase SQL editor before enabling Google OAuth for players.

-- 1. Real first name for coaches/squad views
ALTER TABLE players ADD COLUMN IF NOT EXISTS first_name TEXT;

-- 2. account_id: links one or many player profiles to a single Google auth user
ALTER TABLE players ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES auth.users(id);

-- 3. Existing players: their auth user IS their account
UPDATE players SET account_id = id WHERE account_id IS NULL;

-- 4. RLS: allow access via account_id (Google players) OR id (legacy username players)
-- Drop and recreate the player self-access policy
DROP POLICY IF EXISTS "Players can view their own profile" ON players;
DROP POLICY IF EXISTS "Players can update their own profile" ON players;

CREATE POLICY "Players can view their own profile" ON players
  FOR SELECT USING (
    auth.uid() = id OR auth.uid() = account_id
  );

CREATE POLICY "Players can update their own profile" ON players
  FOR UPDATE USING (
    auth.uid() = id OR auth.uid() = account_id
  );

-- 5. Index for fast account_id lookups
CREATE INDEX IF NOT EXISTS players_account_id_idx ON players(account_id);
