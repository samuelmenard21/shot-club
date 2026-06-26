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

export async function signUp({
  displayName,
  firstName,      // optional: real first name shown to coaches
  position,
  ageBracket,
  teamName,       // legacy free-text path: resolves/creates team by uppercase code
  teamId,         // preferred: pre-resolved team_id from find_or_create_team_for_player RPC
  clubId,         // optional: pre-resolved club_id
  clubName,
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

  // Resolve team: PREFERRED path is a pre-resolved teamId (from the picker via
  // find_or_create_team_for_player RPC). Legacy path is free-text teamName which
  // gets uppercased and matched on the `code` column, creating a new row if missing.
  let resolvedTeamId = teamId || null
  if (!resolvedTeamId && teamName) {
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
  const playerRow = {
    id: userId,
    display_name: displayName,
    username,
    position,
    age_bracket: ageBracket,
    team_id: resolvedTeamId,
    club_id: clubId || clubIdFromInvite || null,
    club_name: resolvedClubName,
  }
  if (firstName?.trim()) playerRow.first_name = firstName.trim()

  let { error: playerErr } = await supabase.from('players').insert(playerRow)
  if (playerErr?.message?.includes('first_name')) {
    // first_name column not yet migrated — retry without it
    delete playerRow.first_name
    ;({ error: playerErr } = await supabase.from('players').insert(playerRow))
  }
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

  // Family account: check account_id first (Google OAuth players)
  const activePlayerId = typeof localStorage !== 'undefined' ? localStorage.getItem('activePlayerId') : null
  try {
    const { data: accountPlayers, error } = await supabase
      .from('players')
      .select('*, team:teams(id, name, code)')
      .eq('account_id', user.id)
      .order('created_at')
    if (!error && accountPlayers?.length > 0) {
      if (activePlayerId) {
        const active = accountPlayers.find((p) => p.id === activePlayerId)
        if (active) return active
      }
      return accountPlayers[0]
    }
  } catch (_) {
    // account_id column not yet migrated — fall through to legacy lookup
  }

  // Legacy: id = auth user id (username / fake-email players)
  const { data } = await supabase
    .from('players')
    .select('*, team:teams(id, name, code)')
    .eq('id', user.id)
    .maybeSingle()
  return data
}

// Create a player profile for a Google-OAuth user (family account support)
export async function createPlayerWithGoogleAuth({ firstName, displayName, position, ageBracket, teamId, clubId, clubName }) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be signed in with Google')

  const username = makeUsername(firstName || displayName)
  const playerId = crypto.randomUUID()

  const { error } = await supabase.from('players').insert({
    id: playerId,
    display_name: displayName,
    first_name: firstName?.trim() || null,
    username,
    position,
    age_bracket: ageBracket,
    team_id: teamId || null,
    club_id: clubId || null,
    club_name: clubName || null,
    account_id: user.id,
  })
  if (error) throw error

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('activePlayerId', playerId)
  }
  return { username, playerId }
}

// Return all player profiles linked to the current Google account
export async function getPlayersForAccount() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  const { data } = await supabase
    .from('players')
    .select('*, team:teams(id, name, code)')
    .eq('account_id', user.id)
    .order('created_at')
  return data || []
}

// Sign in with Google — player flow (redirects back to /start?oauth=1)
export async function signInWithGooglePlayer() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/start?oauth=1' },
  })
  if (error) throw error
}

// ============================================================
// COACH AUTH
// ============================================================

/**
 * Sign up a coach. After Supabase creates the auth user, this function
 * EXPLICITLY signs them in with the same credentials to guarantee an
 * active session before any subsequent profile-creation calls.
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

  const { error: signInErr } = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  })
  if (signInErr) {
    throw new Error('Account created but sign-in failed. Try signing in instead.')
  }

  return { userId, displayName }
}

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + '/coach' },
  })
  if (error) throw error
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
