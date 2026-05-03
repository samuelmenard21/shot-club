import { supabase } from './supabase'

// ===== PUBLIC (no auth required) =====

export async function searchClubs(query, limit = 10) {
  if (!query || query.trim().length < 2) return []
  const trimmed = query.trim().toLowerCase()
  const { data, error } = await supabase
    .from('clubs')
    .select('id, name, slug, city, province, country, governing_body, gender_type, org_type')
    .ilike('search_text', `%${trimmed}%`)
    .eq('is_seeded', true)
    .eq('is_active', true)
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
    .select('id, name, slug, city, province, country, governing_body, gender_type, org_type, created_at')
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
