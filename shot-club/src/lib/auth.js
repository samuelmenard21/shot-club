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
  // Coaches use real emails; we sign them into Supabase auth with their real email.
  return email.trim().toLowerCase()
}

export async function signUp({ displayName, position, ageBracket, teamName, clubName, inviteCode }) {
  const username = makeUsername(displayName)
  const email = usernameToEmail(username)

  const { data: authData, error: authErr } = await supabase.auth.signUp({
    email,
    password: UNIVERSAL_PW,
  })
  if (authErr) throw authErr
  const userId = authData.user?.id
  if (!userId) throw new Error('Signup failed — no user id returned')

  // If an invite code was provided, resolve the club + (optional) team override from it
  let clubIdFromInvite = null
  let resolvedClubName = clubName?.trim() || null
  if (inviteCode) {
    const { data: invite, error: inviteErr } = await supabase
      .from('invites')
      .select('club_id, clubs(name)')
      .eq('code', inviteCode)
      .maybeSingle()
    if (inviteErr) throw inviteErr
    if (invite) {
      clubIdFromInvite = invite.club_id
      if (invite.clubs?.name) resolvedClubName = invite.clubs.name
    }
  }

  // Resolve team (create if new name)
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

  return { username, userId }
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

// ---------------------------------------------------------------------------
// COACH AUTH
// Coaches use real email + their own password (separate from the player flow).
// On signup, we also create a row in the `coaches` table linked to a club.
// ---------------------------------------------------------------------------

export async function signUpCoach({ email, password, fullName, clubName }) {
  const cleanEmail = coachEmailToInternal(email)

  const { data: authData, error: authErr } = await supabase.auth.signUp({
    email: cleanEmail,
    password,
  })
  if (authErr) throw authErr
  const userId = authData.user?.id
  if (!userId) throw new Error('Coach signup failed — no user id returned')

  // Create the club first (if a name was provided)
  let clubId = null
  if (clubName?.trim()) {
    const { data: club, error: clubErr } = await supabase
      .from('clubs')
      .insert({
        name: clubName.trim(),
        owner_id: userId,
      })
      .select('id')
      .single()
    if (clubErr) throw clubErr
    clubId = club.id
  }

  // Create the coach profile
  const { error: coachErr } = await supabase.from('coaches').insert({
    id: userId,
    email: cleanEmail,
    full_name: fullName,
    club_id: clubId,
  })
  if (coachErr) throw coachErr

  return { userId, clubId }
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
