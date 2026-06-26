import { supabase } from './supabase'
import { getWeekStart } from './shots'

// Get the active battle for a team this week (either side)
export async function getActiveBattle(teamId) {
  if (!teamId) return null
  const weekStart = getWeekStart()
  const { data } = await supabase
    .from('team_battles')
    .select(`
      id, week_start, status,
      team_a:teams!team_a_id(id, name, age_division, tier, club:clubs(id, name, slug)),
      team_b:teams!team_b_id(id, name, age_division, tier, club:clubs(id, name, slug))
    `)
    .eq('week_start', weekStart)
    .eq('status', 'active')
    .or(`team_a_id.eq.${teamId},team_b_id.eq.${teamId}`)
    .maybeSingle()
  if (!data) return null

  // Figure out which side we're on
  const isTeamA = data.team_a.id === teamId
  const myTeam = isTeamA ? data.team_a : data.team_b
  const rivalTeam = isTeamA ? data.team_b : data.team_a

  // Fetch weekly shots for both teams
  const { data: playerRows } = await supabase
    .from('players')
    .select('id, team_id')
    .in('team_id', [myTeam.id, rivalTeam.id])

  if (!playerRows?.length) return { ...data, myTeam, rivalTeam, myShots: 0, rivalShots: 0 }

  const playerIds = playerRows.map((p) => p.id)
  const { data: logs } = await supabase
    .from('shot_logs')
    .select('player_id, count')
    .in('player_id', playerIds)
    .gte('log_date', data.week_start)

  const byPlayer = {}
  for (const log of logs || []) {
    byPlayer[log.player_id] = (byPlayer[log.player_id] || 0) + log.count
  }

  const shotsForTeam = (tid) =>
    playerRows.filter((p) => p.team_id === tid).reduce((s, p) => s + (byPlayer[p.id] || 0), 0)

  return {
    id: data.id,
    weekStart: data.week_start,
    myTeam,
    rivalTeam,
    myShots: shotsForTeam(myTeam.id),
    rivalShots: shotsForTeam(rivalTeam.id),
  }
}

// Get teams from other clubs eligible to be challenged — no gender restriction, any team can battle any team
export async function getEligibleOpponents(myTeamId, myClubId) {
  const { data: rivalClubs } = await supabase
    .from('clubs')
    .select('id')
    .neq('id', myClubId)
    .eq('is_active', true)
  if (!rivalClubs?.length) return []

  const rivalClubIds = rivalClubs.map((c) => c.id)
  const { data: teams } = await supabase
    .from('teams')
    .select('id, name, age_division, tier, club:clubs(id, name, city)')
    .in('club_id', rivalClubIds)
    .eq('is_active', true)
    .neq('id', myTeamId)
    .order('age_division')

  return teams || []
}

// Coach challenges a rival team
export async function createBattle(myTeamId, rivalTeamId) {
  const weekStart = getWeekStart()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('team_battles')
    .insert({
      team_a_id: myTeamId,
      team_b_id: rivalTeamId,
      week_start: weekStart,
      initiated_by: user?.id,
      status: 'active',
    })
    .select()
    .single()
  if (error) throw error
  return data
}

// Get all battles for a club (for coach dashboard history)
export async function getClubBattles(clubId) {
  if (!clubId) return []
  const { data: teamRows } = await supabase
    .from('teams')
    .select('id')
    .eq('club_id', clubId)
  if (!teamRows?.length) return []

  const teamIds = teamRows.map((t) => t.id)
  const { data } = await supabase
    .from('team_battles')
    .select(`
      id, week_start, status,
      team_a:teams!team_a_id(id, name, age_division, tier, club:clubs(name)),
      team_b:teams!team_b_id(id, name, age_division, tier, club:clubs(name))
    `)
    .or(`team_a_id.in.(${teamIds.join(',')}),team_b_id.in.(${teamIds.join(',')})`)
    .order('week_start', { ascending: false })
    .limit(10)
  return data || []
}
