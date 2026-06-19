import { supabase } from './supabase'
import { getWeekStart } from './shots'

export async function getTeamChallenge(teamId) {
  if (!teamId) return null
  const weekStart = getWeekStart()
  const { data } = await supabase
    .from('team_challenges')
    .select('*')
    .eq('team_id', teamId)
    .eq('week_start', weekStart)
    .maybeSingle()
  return data
}

export async function setTeamChallenge(teamId, goalShots) {
  const weekStart = getWeekStart()
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('team_challenges')
    .upsert(
      { team_id: teamId, goal_shots: goalShots, week_start: weekStart, created_by: user?.id },
      { onConflict: 'team_id,week_start' }
    )
    .select()
    .maybeSingle()
  if (error) throw error
  return data
}

export async function getTeamWeeklyShots(teamId) {
  if (!teamId) return 0
  const weekStart = getWeekStart()

  const { data: playerRows } = await supabase
    .from('players')
    .select('id')
    .eq('team_id', teamId)
  if (!playerRows?.length) return 0

  const playerIds = playerRows.map((p) => p.id)
  const { data: logs } = await supabase
    .from('shot_logs')
    .select('count')
    .in('player_id', playerIds)
    .gte('log_date', weekStart)

  return (logs || []).reduce((sum, r) => sum + r.count, 0)
}
