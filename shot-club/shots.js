import { supabase } from './supabase'

export async function logShots({ playerId, shotType, count = 1 }) {
  const { error } = await supabase.from('shot_logs').insert({
    player_id: playerId,
    shot_type: shotType,
    count,
  })
  if (error) throw error
}

// Computes Monday-of-this-week as a YYYY-MM-DD string in UTC
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

  const todayByType = { Wrist: 0, Snap: 0, Slap: 0, Backhand: 0, Saves: 0 }
  todayRows.forEach(r => { todayByType[r.shot_type] = (todayByType[r.shot_type] || 0) + r.count })

  return { todayTotal, weekTotal, todayByType }
}

// Lifetime breakdown for the player card
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

export async function getRandomTeammate(teamId, excludePlayerId) {
  if (!teamId) return null
  const { data } = await supabase
    .from('players')
    .select('id, display_name, lifetime_shots')
    .eq('team_id', teamId)
    .neq('id', excludePlayerId)
    .order('lifetime_shots', { ascending: false })
    .limit(5)
  if (!data || data.length === 0) return null
  return data[Math.floor(Math.random() * data.length)]
}

// Leaderboard: lifetime ranking on a team (or global if teamId is null)
export async function getLeaderboardLifetime({ teamId, limit = 50 }) {
  let query = supabase
    .from('players')
    .select('id, display_name, position, lifetime_shots, current_streak')
    .order('lifetime_shots', { ascending: false })
    .limit(limit)
  if (teamId) query = query.eq('team_id', teamId)
  const { data, error } = await query
  if (error) throw error
  return data || []
}

// Leaderboard: weekly ranking — sums shot_logs since this Monday
export async function getLeaderboardWeekly({ teamId, limit = 50 }) {
  const weekStart = getWeekStart()

  // Get player IDs to scope to (team if specified)
  let playerIds = null
  if (teamId) {
    const { data: tp } = await supabase
      .from('players')
      .select('id')
      .eq('team_id', teamId)
    playerIds = (tp || []).map(p => p.id)
    if (playerIds.length === 0) return []
  }

  // Sum shot_logs grouped by player
  let q = supabase
    .from('shot_logs')
    .select('player_id, count')
    .gte('log_date', weekStart)
  if (playerIds) q = q.in('player_id', playerIds)
  const { data: logs, error } = await q
  if (error) throw error

  const totals = {}
  ;(logs || []).forEach(r => { totals[r.player_id] = (totals[r.player_id] || 0) + r.count })

  // Now fetch player info for all player_ids that have shots this week
  const ids = Object.keys(totals)
  if (ids.length === 0) return []

  const { data: players } = await supabase
    .from('players')
    .select('id, display_name, position, lifetime_shots, current_streak')
    .in('id', ids)

  return (players || [])
    .map(p => ({ ...p, week_shots: totals[p.id] || 0 }))
    .sort((a, b) => b.week_shots - a.week_shots)
    .slice(0, limit)
}

// Get team roster count for showing "you're #X of Y"
export async function getTeamSize(teamId) {
  if (!teamId) return 0
  const { count } = await supabase
    .from('players')
    .select('*', { count: 'exact', head: true })
    .eq('team_id', teamId)
  return count || 0
}
