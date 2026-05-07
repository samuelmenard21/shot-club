import { supabase } from './supabase'

// ===== CONSTANTS =====
export const AGE_DIVISIONS = [
  'U7', 'U8', 'U9', 'U10', 'U11', 'U12',
  'U13', 'U14', 'U15', 'U16', 'U17', 'U18',
]

export const TIERS = [
  'House',
  'Select',
  'A',
  'AA',
  'AAA',
]

// ===== PUBLIC (no auth required) =====

// Search seeded clubs with social proof (player_count) for the new search-from-home flow.
// Order: most active clubs first, then alphabetical. The index
// idx_clubs_player_count_name (added in migration 008) makes this fast.
export async function searchClubs(query, limit = 10) {
  if (!query || query.trim().length < 2) return []
  const trimmed = query.trim().toLowerCase()
  const { data, error } = await supabase
    .from('clubs')
    .select('id, name, slug, city, province, country, governing_body, gender_type, org_type, player_count')
    .ilike('search_text', `%${trimmed}%`)
    .eq('is_seeded', true)
    .eq('is_active', true)
    .order('player_count', { ascending: false })
    .order('name')
    .limit(limit)
  if (error) {
    console.warn('searchClubs error:', error)
    return []
  }
  return data || []
}

export async function getClubBySlug(slug) {
  if (!slug) return null
  const { data } = await supabase
    .from('clubs')
    .select('id, name, slug, city, province, country, governing_body, gender_type, org_type, player_count, created_at')
    .eq('slug', slug)
    .maybeSingle()
  return data
}

export async function getClubStats(clubId) {
  if (!clubId) return { playerCount: 0, teamCount: 0, totalShots: 0 }

  const [{ count: playerCount }, { count: teamCount }, { data: players }] = await Promise.all([
    supabase.from('players').select('*', { count: 'exact', head: true }).eq('club_id', clubId),
    supabase.from('teams').select('*', { count: 'exact', head: true }).eq('club_id', clubId),
    supabase.from('players').select('lifetime_shots').eq('club_id', clubId),
  ])

  const totalShots = (players || []).reduce((sum, p) => sum + (p.lifetime_shots || 0), 0)
  return { playerCount: playerCount || 0, teamCount: teamCount || 0, totalShots }
}

export async function getClubTeams(clubId) {
  if (!clubId) return []
  const { data } = await supabase
    .from('teams')
    .select('id, name, code')
    .eq('club_id', clubId)
    .order('name')
  return data || []
}

// NEW for the player flow: returns teams in a club, sorted by player count
// (busiest first) then by age_division/tier. Each team includes its current
// member count so the picker can show social proof.
export async function getTeamsInClub(clubId) {
  if (!clubId) return []
  // Pull the team rows + a count of attached players per team in one round-trip
  const { data: teams } = await supabase
    .from('teams')
    .select('id, name, age_division, tier, season, team_code, club_id')
    .eq('club_id', clubId)
    .eq('is_active', true)
    .order('age_division', { ascending: true })
    .order('tier', { ascending: true })
  if (!teams || teams.length === 0) return []

  // Get player counts in parallel. We could do this in SQL with a view, but
  // the direct count query is simple and the team count per club is small.
  const teamIds = teams.map((t) => t.id)
  const { data: counts } = await supabase
    .from('players')
    .select('team_id')
    .in('team_id', teamIds)

  const countMap = {}
  for (const row of counts || []) {
    countMap[row.team_id] = (countMap[row.team_id] || 0) + 1
  }

  // Attach counts and re-sort: busiest first, then alphabetical by display label
  return teams
    .map((t) => ({ ...t, player_count: countMap[t.id] || 0 }))
    .sort((a, b) => {
      if (b.player_count !== a.player_count) return b.player_count - a.player_count
      const aLabel = `${a.age_division} ${a.tier}`
      const bLabel = `${b.age_division} ${b.tier}`
      return aLabel.localeCompare(bLabel)
    })
}

// Player-callable RPC: get the team if it exists in (club, age, tier, season),
// otherwise create it. Returns { teamId, teamExisted }.
export async function findOrCreateTeamForPlayer({ clubId, ageDivision, tier, season = '2025-26' }) {
  if (!clubId) throw new Error('Missing clubId')
  if (!ageDivision) throw new Error('Missing ageDivision')
  if (!tier) throw new Error('Missing tier')
  const { data, error } = await supabase.rpc('find_or_create_team_for_player', {
    p_club_id: clubId,
    p_age_division: ageDivision,
    p_tier: tier,
    p_season: season,
  })
  if (error) throw error
  const row = Array.isArray(data) ? data[0] : data
  if (!row) throw new Error('No team result returned')
  return {
    teamId: row.team_id,
    teamExisted: row.team_existed,
  }
}

export async function getInviteByCode(code) {
  if (!code) return null
  const { data } = await supabase
    .from('invites')
    .select('*, club:clubs(id, name, slug, city), team:teams(id, name)')
    .eq('code', code)
    .maybeSingle()
  return data
}

export async function incrementInviteUse(inviteId) {
  if (!inviteId) return
  const { data: existing } = await supabase
    .from('invites')
    .select('uses_count')
    .eq('id', inviteId)
    .maybeSingle()
  if (existing) {
    await supabase
      .from('invites')
      .update({ uses_count: (existing.uses_count || 0) + 1 })
      .eq('id', inviteId)
  }
}

// ===== AUTHENTICATED =====

export async function createClub({ name, city }) {
  const { data: slugResult } = await supabase.rpc('generate_club_slug', { club_name: name })
  const slug = slugResult

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be signed in')

  const { data: club, error } = await supabase
    .from('clubs')
    .insert({ name: name.trim(), slug, city: city?.trim() || null, created_by: user.id })
    .select('*')
    .single()
  if (error) throw error
  return club
}

export async function submitPendingClub({ name, city, governingBody, contactEmail }) {
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('pending_clubs')
    .insert({
      name: name.trim(),
      city: city?.trim() || null,
      governing_body: governingBody?.trim() || null,
      contact_email: contactEmail?.trim() || null,
      submitted_by: user?.id || null,
    })
    .select('*')
    .single()
  if (error) {
    console.warn('submitPendingClub error:', error)
    throw error
  }
  return data
}

export async function createCoachProfile({ displayName, email, clubId, isDirector = false }) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be signed in')

  const { error } = await supabase.from('coaches').insert({
    id: user.id,
    display_name: displayName,
    email: email || user.email,
    club_id: clubId,
    is_director: isDirector,
  })
  if (error) throw error
}

export async function getMyCoachProfile() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase
    .from('coaches')
    .select('*, club:clubs(id, name, slug, city)')
    .eq('id', user.id)
    .maybeSingle()
  return data
}

export async function createInvite({ clubId, teamId, kind = 'player' }) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Must be signed in')

  const { data: codeResult } = await supabase.rpc('generate_invite_code')
  const code = codeResult

  const { data: invite, error } = await supabase
    .from('invites')
    .insert({
      code,
      club_id: clubId || null,
      team_id: teamId || null,
      created_by: user.id,
      kind,
    })
    .select('*')
    .single()
  if (error) throw error
  return invite
}

export async function getClubInvites(clubId) {
  if (!clubId) return []
  const { data } = await supabase
    .from('invites')
    .select('*, team:teams(name)')
    .eq('club_id', clubId)
    .order('created_at', { ascending: false })
  return data || []
}

export async function getClubPlayers(clubId) {
  if (!clubId) return []
  const { data } = await supabase
    .from('players')
    .select('id, display_name, position, lifetime_shots, current_streak, card_number, team:teams(id, name)')
    .eq('club_id', clubId)
    .order('lifetime_shots', { ascending: false })
  return data || []
}
