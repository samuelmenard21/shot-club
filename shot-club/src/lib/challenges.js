import { supabase } from './supabase'
import { getWeekStart } from './shots'

function stableIndex(seed, length) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (Math.imul(31, hash) + seed.charCodeAt(i)) >>> 0
  }
  return hash % length
}

// Returns { myTeam, rivalTeam, myShots, rivalShots } for the week.
// Deterministic — same matchup all week, reshuffles every Monday.
export async function getWeeklyTeamMatchup(clubId, myTeamId) {
  if (!clubId || !myTeamId) return null
  const weekStart = getWeekStart()

  const { data: teams } = await supabase
    .from('teams')
    .select('id, name, age_division, tier')
    .eq('club_id', clubId)
    .eq('is_active', true)
    .order('id')

  if (!teams || teams.length < 2) return null

  const myTeam = teams.find((t) => t.id === myTeamId)
  if (!myTeam) return null

  const others = teams.filter((t) => t.id !== myTeamId)
  const rivalTeam = others[stableIndex(myTeamId + weekStart, others.length)]

  // Fetch weekly shots for both teams
  const bothIds = [myTeamId, rivalTeam.id]
  const { data: playerRows } = await supabase
    .from('players')
    .select('id, team_id')
    .in('team_id', bothIds)

  if (!playerRows?.length) return { myTeam, rivalTeam, myShots: 0, rivalShots: 0 }

  const playerIds = playerRows.map((p) => p.id)
  const { data: logs } = await supabase
    .from('shot_logs')
    .select('player_id, count')
    .in('player_id', playerIds)
    .gte('log_date', weekStart)

  const byPlayer = {}
  for (const log of logs || []) {
    byPlayer[log.player_id] = (byPlayer[log.player_id] || 0) + log.count
  }

  const shotsForTeam = (teamId) =>
    playerRows.filter((p) => p.team_id === teamId).reduce((s, p) => s + (byPlayer[p.id] || 0), 0)

  return {
    myTeam,
    rivalTeam,
    myShots: shotsForTeam(myTeamId),
    rivalShots: shotsForTeam(rivalTeam.id),
    weekStart,
  }
}

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
