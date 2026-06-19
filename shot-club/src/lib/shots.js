import { supabase } from './supabase'

export async function logShots({ playerId, shotType, count = 1 }) {
  const { error } = await supabase.from('shot_logs').insert({
    player_id: playerId,
    shot_type: shotType,
    count,
  })
  if (error) throw error
}

export function getWeekStart() {
  const now = new Date()
  const day = now.getUTCDay()
  const daysFromMonday = (day + 6) % 7
  const monday = new Date(now)
  monday.setUTCDate(now.getUTCDate() - daysFromMonday)
  return monday.toISOString().slice(0, 10)
}

export async function getStats(playerId) {
  const today = new Date().toISOString().slice(0, 10)
  const weekStart = getWeekStart()

  const { data: rows, error } = await supabase
    .from('shot_logs')
    .select('shot_type, count, log_date')
    .eq('player_id', playerId)
    .gte('log_date', weekStart)
  if (error) throw error

  const todayRows = (rows || []).filter(r => r.log_date === today)
  const todayTotal = todayRows.reduce((s, r) => s + r.count, 0)
  const weekTotal = (rows || []).reduce((s, r) => s + r.count, 0)

  const todayByType = { Wrist: 0, Snap: 0, Slap: 0, Backhand: 0, Saves: 0, 'Toe Drag': 0, 'Figure 8': 0, Lateral: 0, 'One-Hand': 0 }
  todayRows.forEach(r => { todayByType[r.shot_type] = (todayByType[r.shot_type] || 0) + r.count })

  return { todayTotal, weekTotal, todayByType }
}

export async function getLifetimeBreakdown(playerId) {
  const { data, error } = await supabase
    .from('shot_logs')
    .select('shot_type, count')
    .eq('player_id', playerId)
  if (error) throw error
  const totals = { Wrist: 0, Snap: 0, Slap: 0, Backhand: 0, Saves: 0 }
  ;(data || []).forEach(r => { totals[r.shot_type] = (totals[r.shot_type] || 0) + r.count })
  return totals
}

// Deterministic index from a string seed — same output every time for the same input
function stableIndex(seed, length) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (Math.imul(31, hash) + seed.charCodeAt(i)) >>> 0
  }
  return hash % length
}

export async function getTodayRival(teamId, excludePlayerId) {
  if (!teamId) return null
  const today = new Date().toISOString().slice(0, 10)
  const weekStart = getWeekStart()

  const { data: teammates } = await supabase
    .from('players')
    .select('id, display_name, lifetime_shots')
    .eq('team_id', teamId)
    .neq('id', excludePlayerId)
    .order('id') // stable sort so index maps to the same player on every device
  if (!teammates || teammates.length === 0) return null

  // Pick a weekly rival deterministically — same opponent all week, reshuffles Sunday
  const seed = excludePlayerId + weekStart
  const rival = teammates[stableIndex(seed, teammates.length)]

  // Fetch rival's shots today and this week for chasing text
  const [{ data: todayLogs }, { data: weekLogs }] = await Promise.all([
    supabase.from('shot_logs').select('count').eq('player_id', rival.id).eq('log_date', today),
    supabase.from('shot_logs').select('count').eq('player_id', rival.id).gte('log_date', weekStart),
  ])

  const today_shots = (todayLogs || []).reduce((s, r) => s + r.count, 0)
  const week_shots = (weekLogs || []).reduce((s, r) => s + r.count, 0)

  return { ...rival, today_shots, week_shots }
}

// Scope can be { teamId } or { clubName } or {} for global
export async function getLeaderboardLifetime({ teamId, clubName, limit = 50 }) {
  let query = supabase
    .from('players')
    .select('id, username, display_name, position, lifetime_shots, current_streak, card_number, club_name, team:teams(id, name)')
    .order('lifetime_shots', { ascending: false })
    .limit(limit)
  if (teamId) query = query.eq('team_id', teamId)
  if (clubName) query = query.eq('club_name', clubName)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function getLeaderboardWeekly({ teamId, clubName, limit = 50 }) {
  const weekStart = getWeekStart()

  let playerIds = null
  if (teamId || clubName) {
    let scope = supabase.from('players').select('id')
    if (teamId) scope = scope.eq('team_id', teamId)
    if (clubName) scope = scope.eq('club_name', clubName)
    const { data: sp } = await scope
    playerIds = (sp || []).map(p => p.id)
    if (playerIds.length === 0) return []
  }

  let q = supabase
    .from('shot_logs')
    .select('player_id, count')
    .gte('log_date', weekStart)
  if (playerIds) q = q.in('player_id', playerIds)
  const { data: logs, error } = await q
  if (error) throw error

  const totals = {}
  ;(logs || []).forEach(r => { totals[r.player_id] = (totals[r.player_id] || 0) + r.count })

  const ids = Object.keys(totals)
  if (ids.length === 0) return []

  const { data: players } = await supabase
    .from('players')
    .select('id, username, display_name, position, lifetime_shots, current_streak, card_number, team:teams(id, name)')
    .in('id', ids)

  return (players || [])
    .map(p => ({ ...p, week_shots: totals[p.id] || 0 }))
    .sort((a, b) => b.week_shots - a.week_shots)
    .slice(0, limit)
}

export async function getPersonalBest(playerId) {
  const { data } = await supabase
    .from('daily_progress')
    .select('shots_total')
    .eq('player_id', playerId)
    .order('shots_total', { ascending: false })
    .limit(1)
    .maybeSingle()
  return data?.shots_total ?? 0
}

export async function getTeamSize(teamId) {
  if (!teamId) return 0
  const { count } = await supabase
    .from('players')
    .select('*', { count: 'exact', head: true })
    .eq('team_id', teamId)
  return count || 0
}

export async function getClubSize(clubName) {
  if (!clubName) return 0
  const { count } = await supabase
    .from('players')
    .select('*', { count: 'exact', head: true })
    .eq('club_name', clubName)
  return count || 0
}
