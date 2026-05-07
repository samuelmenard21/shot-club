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
// signUp({ displayName, position, ageBracket, ...attachment options })
//
// Resolution priority for team and club:
//   1) teamInviteCode  → attach_player_to_team RPC fills team_id + club_id
//   2) teamId          → use directly (kid picked or created via team picker)
//   3) clubId          → club only, no team yet
//   4) inviteCode      → legacy club-level invite (older invites table)
//   5) clubName        → legacy free-text path (coach signup, old AuthScreen)
//   6) teamName (free-text) → legacy "join a team by name" path (coach flow)
//
export async function signUp({
  displayName,
  position,
  ageBracket,
  teamName,
  clubName,
  clubId,
  teamId,           // NEW: pre-resolved team id (from new player flow)
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
  let resolvedTeamId = teamId || null

  // Path 2: clubId (search-by-club path or pre-resolved from team pick)
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

  // If a teamId was provided but no clubId, look up the team's club_id from the team row
  if (resolvedTeamId && !resolvedClubId) {
    const { data: team } = await supabase
      .from('teams')
      .select('id, club_id, club:clubs(name)')
      .eq('id', resolvedTeamId)
      .maybeSingle()
    if (team) {
      resolvedClubId = team.club_id
      if (team.club?.name) resolvedClubName = team.club.name
    }
  }

  // Path 4: legacy invite code (older invites table — keep for backward compat)
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

  // Path 6: free-text team name (legacy coach flow). Only runs if no teamId
  // already chosen via the new flow.
  if (teamName && !resolvedTeamId) {
    const normalized = teamName.trim().toUpperCase()
    const { data: existingTeam } = await supabase
      .from('teams')
      .select('id')
      .eq('code', normalized)
      .maybeSingle()
    if (existingTeam) {
      resolvedTeamId = existingTeam.id
    } else {
      const { data: newTeam, error: teamErr } = await supabase
        .from('teams')
        .insert({ name: normalized, code: normalized })
        .select('id')
        .single()
      if (teamErr) throw teamErr
      resolvedTeamId = newTeam.id
    }
  }

  // Create the player row
  const { error: playerErr } = await supabase.from('players').insert({
    id: userId,
    display_name: displayName,
    username,
    position,
    age_bracket: ageBracket,
    team_id: resolvedTeamId,
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
