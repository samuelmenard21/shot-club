import { supabase } from './supabase'

const DOMAIN = 'hsc.app'
const UNIVERSAL_PW = 'shotclub-' + 'pw-' + 'v1'

function makeUsername(displayName) {
  const clean = displayName.toLowerCase().replace(/[^a-z]/g, '').slice(0, 8) || 'player'
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `${clean}${rand}`
}

function usernameToEmail(username) {
  return `${username.toLowerCase()}@${DOMAIN}`
}

function coachEmailToInternal(email) {
  return email.trim().toLowerCase()
}

// ============================================================
// PLAYER AUTH
// ============================================================
//
// signUp({ displayName, position, ageBracket, teamName?, clubName?, clubId?, inviteCode?, teamInviteCode? })
//
// Resolution priority for club:
//   1) teamInviteCode  → attach_player_to_team RPC fills club_id + club_name
//   2) clubId          → look up the club row, use both id + name (NEW: search-by-club path)
//   3) inviteCode      → legacy club-level invite (older invites table)
//   4) clubName        → legacy free-text path (coach signup, old AuthScreen)
//
export async function signUp({
  displayName,
  position,
  ageBracket,
  teamName,
  clubName,
  clubId,           // NEW: pre-resolved club id from search-by-club flow
  inviteCode,
  teamInviteCode,
}) {
  const username = makeUsername(displayName)
  const email = usernameToEmail(username)

  const { data: authData, error: authErr } = await supabase.auth.signUp({
    email,
    password: UNIVERSAL_PW,
  })
  if (authErr) throw authErr
  const userId = authData.user?.id
  if (!userId) throw new Error('Signup failed — no user id returned')

  // Resolve initial club_id and club_name. Order matters.
  let resolvedClubId = null
  let resolvedClubName = clubName?.trim() || null

  // Path 2: clubId (NEW search-by-club path)
  // We trust the id but always re-fetch the name from DB so the player row
  // gets the canonical club name (not whatever the client cached).
  if (clubId) {
    const { data: club } = await supabase
      .from('clubs')
      .select('id, name')
      .eq('id', clubId)
      .maybeSingle()
    if (club) {
      resolvedClubId = club.id
      resolvedClubName = club.name
    }
  }

  // Path 3: legacy invite code (older invites table — keep for backward compat)
  if (inviteCode && !resolvedClubId) {
    const { data: invite } = await supabase
      .from('invites')
      .select('club_id, clubs(name)')
      .eq('code', inviteCode)
      .maybeSingle()
    if (invite) {
      resolvedClubId = invite.club_id
      if (invite.clubs?.name) resolvedClubName = invite.clubs.name
    }
  }

  // Resolve team via free-text name (legacy "join a team by typing its name" path)
  // This stays untouched for backward compat. The new flow doesn't pass teamName.
  let teamId = null
  if (teamName) {
    const normalized = teamName.trim().toUpperCase()
    const { data: existingTeam } = await supabase
      .from('teams')
      .select('id')
      .eq('code', normalized)
      .maybeSingle()
    if (existingTeam) {
      teamId = existingTeam.id
    } else {
      const { data: newTeam, error: teamErr } = await supabase
        .from('teams')
        .insert({ name: normalized, code: normalized })
        .select('id')
        .single()
      if (teamErr) throw teamErr
      teamId = newTeam.id
    }
  }

  // Create the player row
  const { error: playerErr } = await supabase.from('players').insert({
    id: userId,
    display_name: displayName,
    username,
    position,
    age_bracket: ageBracket,
    team_id: teamId,
    club_id: resolvedClubId,
    club_name: resolvedClubName,
  })
  if (playerErr) throw playerErr

  // Path 1: team_invites code (from /j/:code)
  // Runs AFTER the player insert so the RPC has a real player to attach.
  // The RPC will overwrite team_id and club_id on the player row.
  let attachedTeam = null
  if (teamInviteCode) {
    try {
      const { data, error } = await supabase.rpc('attach_player_to_team', {
        p_player_id: userId,
        p_invite_code: teamInviteCode,
      })
      if (!error && data) {
        const row = Array.isArray(data) ? data[0] : data
        if (row?.attached) {
          attachedTeam = {
            teamId: row.team_id,
            teamName: row.team_name,
            clubId: row.club_id,
            clubName: row.club_name,
          }
        }
      }
    } catch (e) {
      // Non-blocking: signup succeeded, just couldn't attach. The kid can join later.
      console.warn('Team invite attach failed:', e)
    }
  }

  return { username, userId, attachedTeam }
}

export async function signIn({ username }) {
  const email = usernameToEmail(username.trim())
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: UNIVERSAL_PW,
  })
  if (error) throw error
}

export async function signOut() {
  await supabase.auth.signOut()
}

export async function getCurrentPlayer() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('players')
    .select('*, team:teams(id, name, code)')
    .eq('id', user.id)
    .maybeSingle()

  return data
}

// ============================================================
// COACH AUTH
// FIXED: was inserting `full_name` into a `display_name` column.
// Also no longer auto-creates a club — that's handled by createCoachProfile in clubs.js.
// ============================================================

export async function signUpCoach({ email, password, displayName }) {
  const cleanEmail = coachEmailToInternal(email)

  const { data: authData, error: authErr } = await supabase.auth.signUp({
    email: cleanEmail,
    password,
  })
  if (authErr) throw authErr
  const userId = authData.user?.id
  if (!userId) throw new Error('Coach signup failed — no user id returned')

  // The coach row + club attachment is handled by createCoachProfile in clubs.js
  // after this function returns. Keeping this function single-purpose: just create the auth user.

  return { userId, displayName }
}

export async function signInCoach({ email, password }) {
  const cleanEmail = coachEmailToInternal(email)
  const { error } = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  })
  if (error) throw error
}

export async function getCurrentCoach() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('coaches')
    .select('*, club:clubs(id, name, slug)')
    .eq('id', user.id)
    .maybeSingle()

  return data
}
