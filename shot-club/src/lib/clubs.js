import { supabase } from './supabase'
import { getWeekStart } from './shots'

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

export async function searchClubs(query, limit = 10) {
  if (!query || query.trim().length < 2) return []
  const trimmed = query.trim().toLowerCase()
  const { data, error } = await supabase
    .from('clubs')
    .select('id, name, slug, city, province, country, governing_body, gender_type, org_type, player_count')
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

// Returns teams in a club along with player counts (for the AuthScreen team picker)
export async function getTeamsInClub(clubId) {
  if (!clubId) return []
  const { data } = await supabase
    .from('teams')
    .select('id, name, age_division, tier, season, team_code, club_id')
    .eq('club_id', clubId)
    .eq('is_active', true)
    .order('age_division')

  if (!data) return []

  // Add player counts in parallel
  const withCounts = await Promise.all(
    data.map(async (t) => {
      const { count } = await supabase
        .from('players')
        .select('*', { count: 'exact', head: true })
        .eq('team_id', t.id)
      return { ...t, player_count: count || 0 }
    })
  )
  return withCounts
}

// Wraps the find_or_create_team_for_player RPC for the search-from-home flow
export async function findOrCreateTeamForPlayer({ clubId, ageDivision, tier, season = '2025-26' }) {
  const { data, error } = await supabase.rpc('find_or_create_team_for_player', {
    p_club_id: clubId,
    p_age_division: ageDivision,
    p_tier: tier,
    p_season: season,
  })
  if (error) throw error
  const row = Array.isArray(data) ? data[0] : data
  if (!row) throw new Error('No team result')
  return {
    teamId: row.team_id,
    teamName: row.team_name,
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

export async function getClubWeeklyRecap(clubId) {
  if (!clubId) return null

  // Week boundaries
  const now = new Date()
  const dayOfWeek = now.getUTCDay()
  const daysFromMonday = (dayOfWeek + 6) % 7

  const thisMonday = new Date(now)
  thisMonday.setUTCDate(now.getUTCDate() - daysFromMonday)
  const thisWeekStart = thisMonday.toISOString().slice(0, 10)

  const lastMonday = new Date(thisMonday)
  lastMonday.setUTCDate(thisMonday.getUTCDate() - 7)
  const lastWeekStart = lastMonday.toISOString().slice(0, 10)

  const lastSunday = new Date(thisMonday)
  lastSunday.setUTCDate(thisMonday.getUTCDate() - 1)
  const lastWeekEnd = lastSunday.toISOString().slice(0, 10)

  // All players in club
  const { data: playerRows } = await supabase
    .from('players')
    .select('id, display_name')
    .eq('club_id', clubId)
  if (!playerRows?.length) return null

  const playerIds = playerRows.map((p) => p.id)
  const playerMap = Object.fromEntries(playerRows.map((p) => [p.id, p.display_name]))

  // This week + last week logs in one query
  const { data: logs } = await supabase
    .from('shot_logs')
    .select('player_id, count, log_date')
    .in('player_id', playerIds)
    .gte('log_date', lastWeekStart)

  const thisWeekByPlayer = {}
  let lastWeekTotal = 0

  for (const log of logs || []) {
    if (log.log_date >= thisWeekStart) {
      thisWeekByPlayer[log.player_id] = (thisWeekByPlayer[log.player_id] || 0) + log.count
    } else if (log.log_date <= lastWeekEnd) {
      lastWeekTotal += log.count
    }
  }

  const thisWeekTotal = Object.values(thisWeekByPlayer).reduce((s, n) => s + n, 0)
  const activePlayers = Object.keys(thisWeekByPlayer).length

  const topPlayerId = Object.entries(thisWeekByPlayer).sort((a, b) => b[1] - a[1])[0]?.[0]
  const topPlayer = topPlayerId
    ? { name: playerMap[topPlayerId], shots: thisWeekByPlayer[topPlayerId] }
    : null

  const vsLastWeek = lastWeekTotal === 0 ? null : Math.round(((thisWeekTotal - lastWeekTotal) / lastWeekTotal) * 100)

  return { thisWeekTotal, lastWeekTotal, vsLastWeek, activePlayers, topPlayer, totalPlayers: playerRows.length }
}

export async function getClubTeamRankings(clubId) {
  if (!clubId) return []
  const weekStart = getWeekStart()

  // Get all teams in club
  const { data: teamRows } = await supabase
    .from('teams')
    .select('id, name, age_division, tier')
    .eq('club_id', clubId)
    .eq('is_active', true)
  if (!teamRows?.length) return []

  // Get all players in club grouped by team
  const { data: playerRows } = await supabase
    .from('players')
    .select('id, team_id')
    .eq('club_id', clubId)
    .not('team_id', 'is', null)
  if (!playerRows?.length) return teamRows.map((t) => ({ ...t, week_shots: 0, player_count: 0 }))

  const playerIds = playerRows.map((p) => p.id)

  const { data: logs } = await supabase
    .from('shot_logs')
    .select('player_id, count')
    .in('player_id', playerIds)
    .gte('log_date', weekStart)

  const shotsByPlayer = {}
  for (const log of logs || []) {
    shotsByPlayer[log.player_id] = (shotsByPlayer[log.player_id] || 0) + log.count
  }

  const playersByTeam = {}
  for (const p of playerRows) {
    if (!playersByTeam[p.team_id]) playersByTeam[p.team_id] = []
    playersByTeam[p.team_id].push(p.id)
  }

  return teamRows
    .map((t) => {
      const members = playersByTeam[t.id] || []
      const week_shots = members.reduce((sum, pid) => sum + (shotsByPlayer[pid] || 0), 0)
      return { ...t, week_shots, player_count: members.length }
    })
    .sort((a, b) => b.week_shots - a.week_shots)
}

export async function getTeamOfTheWeek() {
  const weekStart = getWeekStart()

  // Get all players with team info
  const { data: playerRows } = await supabase
    .from('players')
    .select('id, team_id, team:teams(id, name, age_division, tier, club:clubs(id, name, city, slug))')
    .not('team_id', 'is', null)
  if (!playerRows?.length) return null

  const playerIds = playerRows.map((p) => p.id)
  const { data: logs } = await supabase
    .from('shot_logs')
    .select('player_id, count')
    .in('player_id', playerIds)
    .gte('log_date', weekStart)

  if (!logs?.length) return null

  const shotsByPlayer = {}
  for (const log of logs) {
    shotsByPlayer[log.player_id] = (shotsByPlayer[log.player_id] || 0) + log.count
  }

  const byTeam = {}
  for (const p of playerRows) {
    if (!p.team) continue
    if (!byTeam[p.team_id]) {
      byTeam[p.team_id] = { team: p.team, shots: 0, players: 0 }
    }
    byTeam[p.team_id].shots += shotsByPlayer[p.id] || 0
    if (shotsByPlayer[p.id]) byTeam[p.team_id].players += 1
  }

  const sorted = Object.values(byTeam).filter((t) => t.shots > 0).sort((a, b) => b.shots - a.shots)
  return sorted[0] || null
}

export async function getAssociationRankings() {
  const { data, error } = await supabase
    .from('players')
    .select('club_id, lifetime_shots, club:clubs(id, name, city, slug, province)')
    .not('club_id', 'is', null)
    .gt('lifetime_shots', 0)
  if (error) return []

  const byClub = {}
  for (const p of data || []) {
    if (!p.club) continue
    const id = p.club_id
    if (!byClub[id]) {
      byClub[id] = {
        club_id: id,
        name: p.club.name,
        city: p.club.city,
        slug: p.club.slug,
        province: p.club.province,
        total_shots: 0,
        player_count: 0,
      }
    }
    byClub[id].total_shots += p.lifetime_shots || 0
    byClub[id].player_count += 1
  }

  return Object.values(byClub).sort((a, b) => b.total_shots - a.total_shots)
}

export async function getClubDrillStats(clubId) {
  if (!clubId) return []
  // Get all players in this club
  const { data: playerRows } = await supabase
    .from('players')
    .select('id, display_name, team:teams(name)')
    .eq('club_id', clubId)
  if (!playerRows?.length) return []

  const playerIds = playerRows.map((p) => p.id)
  const weekStart = (() => {
    const now = new Date()
    const day = now.getUTCDay()
    const d = new Date(now)
    d.setUTCDate(now.getUTCDate() - ((day + 6) % 7))
    return d.toISOString().slice(0, 10)
  })()

  const drillTypes = ['Toe Drag', 'Figure 8', 'Lateral', 'One-Hand']
  const { data: logs } = await supabase
    .from('shot_logs')
    .select('player_id, shot_type, count')
    .in('player_id', playerIds)
    .in('shot_type', drillTypes)
    .gte('log_date', weekStart)

  const byPlayer = {}
  for (const log of logs || []) {
    if (!byPlayer[log.player_id]) byPlayer[log.player_id] = { total: 0 }
    byPlayer[log.player_id].total += log.count
    byPlayer[log.player_id][log.shot_type] = (byPlayer[log.player_id][log.shot_type] || 0) + log.count
  }

  return playerRows
    .map((p) => ({ ...p, drills: byPlayer[p.id] || { total: 0 } }))
    .filter((p) => p.drills.total > 0)
    .sort((a, b) => b.drills.total - a.drills.total)
}
