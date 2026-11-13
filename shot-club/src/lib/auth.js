import { supabase, getUserSafe } from './supabase'

function makeUsername(displayName) {
  const clean = displayName.toLowerCase().replace(/[^a-z]/g, '').slice(0, 8) || 'player'
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `${clean}${rand}`
}

function coachEmailToInternal(email) {
  return email.trim().toLowerCase()
}

// ============================================================
// PLAYER AUTH
// ============================================================
// Players sign in through a parent's Google account only (family accounts). The old username sign-in, which gave
// every player the same password, was removed on 2026-11-13: it let anyone sign in as any username player.

export async function signOut() {
  await supabase.auth.signOut()
}

export async function deleteAccount(playerId) {
  if (!playerId) throw new Error('No player ID')
  // Delete all player data — RLS ensures you can only delete your own rows
  await Promise.all([
    supabase.from('shot_logs').delete().eq('player_id', playerId),
    supabase.from('drill_logs').delete().eq('player_id', playerId),
    supabase.from('achievements').delete().eq('player_id', playerId),
  ])
  await supabase.from('players').delete().eq('id', playerId)
  // Sign out — orphaned auth user is cleaned up server-side on next login attempt
  await supabase.auth.signOut()
  if (typeof localStorage !== 'undefined') localStorage.removeItem('activePlayerId')
}

export async function getCurrentPlayer() {
  const user = await getUserSafe()
  if (!user) return null

  // Family account: check account_id first (Google OAuth players)
  const activePlayerId = typeof localStorage !== 'undefined' ? localStorage.getItem('activePlayerId') : null
  try {
    const { data: accountPlayers, error } = await supabase
      .from('players')
      .select('*, team:teams(id, name, code, age_division, tier, club:clubs(name))')
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
    .select('*, team:teams(id, name, code, age_division, tier, club:clubs(name))')
    .eq('id', user.id)
    .maybeSingle()
  return data
}

// Create a player profile for a Google-OAuth user (family account support)
export async function createPlayerWithGoogleAuth({
  firstName,
  displayName,
  position,
  ageBracket,
  teamId,
  clubId,
  clubName,
  lifetimeShotGoal = 5000,
  stickhandlingHourGoal = 5,
}) {
  const user = await getUserSafe()
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
    lifetime_shot_goal: lifetimeShotGoal,
    stickhandling_hour_goal: stickhandlingHourGoal,
  })
  if (error) throw error

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('activePlayerId', playerId)
  }
  return { username, playerId }
}

// Return all player profiles linked to the current Google account
export async function getPlayersForAccount() {
  const user = await getUserSafe()
  if (!user) return []
  const { data } = await supabase
    .from('players')
    .select('*, team:teams(id, name, code, age_division, tier, club:clubs(name))')
    .eq('account_id', user.id)
    .order('created_at')
  return data || []
}

// Change a player's team
export async function changePlayerTeam(playerId, teamId) {
  const { error } = await supabase
    .from('players')
    .update({ team_id: teamId })
    .eq('id', playerId)
  if (error) throw error
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
    options: { redirectTo: window.location.origin + '/coach/start' },
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
  const user = await getUserSafe()
  if (!user) return null

  const { data } = await supabase
    .from('coaches')
    .select('*, club:clubs(id, name, slug)')
    .eq('id', user.id)
    .maybeSingle()

  return data
}
