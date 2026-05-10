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

export async function signUp({ displayName, position, ageBracket, teamName, clubName, inviteCode, teamInviteCode }) {
  const username = makeUsername(displayName)
  const email = usernameToEmail(username)

  const { data: authData, error: authErr } = await supabase.auth.signUp({
    email,
    password: UNIVERSAL_PW,
  })
  if (authErr) throw authErr
  const userId = authData.user?.id
  if (!userId) throw new Error('Signup failed — no user id returned')

  // Legacy invite code (old club-level invites) — keep for backward compat
  let clubIdFromInvite = null
  let resolvedClubName = clubName?.trim() || null
  if (inviteCode) {
    const { data: invite } = await supabase
      .from('invites')
      .select('club_id, clubs(name)')
      .eq('code', inviteCode)
      .maybeSingle()
    if (invite) {
      clubIdFromInvite = invite.club_id
      if (invite.clubs?.name) resolvedClubName = invite.clubs.name
    }
  }

  // Resolve team via free-text name (legacy "join a team by typing its name" path)
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
    club_id: clubIdFromInvite,
    club_name: resolvedClubName,
  })
  if (playerErr) throw playerErr

  // NEW: if a team_invites code was provided (from /j/:code), attach player to that team
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

/**
 * Sign up a coach. After Supabase creates the auth user, this function
 * EXPLICITLY signs them in with the same credentials to guarantee an
 * active session before any subsequent profile-creation calls.
 *
 * Without this, Supabase's signUp can return before the session is fully
 * established, causing the next `auth.uid()`-gated INSERT to fail under RLS.
 */
export async function signUpCoach({ email, password, displayName }) {
  const cleanEmail = coachEmailToInternal(email)

  const { data: authData, error: authErr } = await supabase.auth.signUp({
    email: cleanEmail,
    password,
  })
  if (authErr) throw authErr
  const userId = authData.user?.id
  if (!userId) throw new Error('Coach signup failed — no user id returned')

  // Explicitly sign in with the credentials we just registered.
  // This guarantees an active session before any subsequent inserts.
  // If the session was already established by signUp, this is a no-op
  // (signInWithPassword on an existing session returns success).
  const { error: signInErr } = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  })
  if (signInErr) {
    // The auth user got created, but we can't sign in with the credentials.
    // Surface a clear error so the UI can guide them to the sign-in flow.
    throw new Error('Account created but sign-in failed. Try signing in instead.')
  }

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
