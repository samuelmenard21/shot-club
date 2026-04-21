import { supabase } from './supabase'

export async function logShots({ playerId, shotType, count = 1 }) {
  const { error } = await supabase.from('shot_logs').insert({
    player_id: playerId,
    shot_type: shotType,
    count,
  })
  if (error) throw error
}

// Today / week / lifetime + shot-type breakdown for today
export async function getStats(playerId) {
  const today = new Date().toISOString().slice(0, 10)

  // Monday of this week (UTC)
  const now = new Date()
  const day = now.getUTCDay() // 0 Sun .. 6 Sat
  const daysFromMonday = (day + 6) % 7
  const monday = new Date(now)
  monday.setUTCDate(now.getUTCDate() - daysFromMonday)
  const weekStart = monday.toISOString().slice(0, 10)

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

// Pick a random teammate (for Coach Sam personalization)
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
