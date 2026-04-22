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

export async function signUp({ displayName, position, ageBracket, teamName, clubName }) {
  const username = makeUsername(displayName)
  const email = usernameToEmail(username)

  const { data: authData, error: authErr } = await supabase.auth.signUp({
    email,
    password: UNIVERSAL_PW,
  })
  if (authErr) throw authErr
  const userId = authData.user?.id
  if (!userId) throw new Error('Signup failed — no user id returned')

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

  // Normalize club name (if given)
  const normalizedClub = clubName?.trim() ? clubName.trim() : null

  // Create the player row
  const { error: playerErr } = await supabase.from('players').insert({
    id: userId,
    display_name: displayName,
    username,
    position,
    age_bracket: ageBracket,
    team_id: teamId,
    club_name: normalizedClub,
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
