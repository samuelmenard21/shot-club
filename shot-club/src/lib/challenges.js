import { supabase } from './supabase'
import { getWeekStart } from './shots'

export function stableIndex(seed, length) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (Math.imul(31, hash) + seed.charCodeAt(i)) >>> 0
  }
  return hash % length
}

function todayLocal() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function daysUntilSunday() {
  const day = new Date().getDay() // 0 = Sun
  return day === 0 ? 0 : 7 - day
}

// Returns a deterministic 1v1 matchup for the week.
// Pairs each player on my team against one player on a rival team by stable index.
export async function getMyBattle(playerId, teamId, clubId) {
  if (!playerId || !teamId || !clubId) return null
  const weekStart = getWeekStart()
  const today = todayLocal()

  const { data: myPlayers } = await supabase
    .from('players')
    .select('id, display_name')
    .eq('team_id', teamId)
    .order('id')

  if (!myPlayers || myPlayers.length < 2) return null

  const { data: teams } = await supabase
    .from('teams')
    .select('id, name, age_division, tier')
    .eq('club_id', clubId)
    .eq('is_active', true)
    .order('id')

  if (!teams || teams.length < 2) return null

  const others = teams.filter((t) => t.id !== teamId)
  const rivalTeam = others[stableIndex(teamId + weekStart, others.length)]

  const { data: rivalPlayers } = await supabase
    .from('players')
    .select('id, display_name')
    .eq('team_id', rivalTeam.id)
    .order('id')

  if (!rivalPlayers?.length) return null

  // Deterministic shuffle for both rosters, then pair by index
  const sort = (players) =>
    [...players].sort((a, b) => stableIndex(a.id + weekStart, 100000) - stableIndex(b.id + weekStart, 100000))

  const mySorted = sort(myPlayers)
  const rivalSorted = sort(rivalPlayers)

  const myIndex = mySorted.findIndex((p) => p.id === playerId)
  if (myIndex === -1) return null

  const rivalPlayer = rivalSorted[myIndex % rivalSorted.length]

  const [{ data: shotLogs }] = await Promise.all([
    supabase
      .from('shot_logs')
      .select('player_id, count, log_date')
      .in('player_id', [playerId, rivalPlayer.id])
      .gte('log_date', weekStart),
  ])

  const weekShots = {}
  const todayShots = {}
  for (const log of shotLogs || []) {
    weekShots[log.player_id] = (weekShots[log.player_id] || 0) + log.count
    if (log.log_date === today) todayShots[log.player_id] = (todayShots[log.player_id] || 0) + log.count
  }

  return {
    weekStart,
    daysLeft: daysUntilSunday(),
    myShots: weekShots[playerId] || 0,
    myTodayShots: todayShots[playerId] || 0,
    loggedToday: (todayShots[playerId] || 0) > 0,
    rivalName: rivalPlayer.display_name,
    rivalTeamName: `${rivalTeam.age_division} ${rivalTeam.tier}`,
    rivalShots: weekShots[rivalPlayer.id] || 0,
    rivalLoggedToday: (todayShots[rivalPlayer.id] || 0) > 0,
  }
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

// ============ PLAYER CHALLENGES ============

export async function getPlayerChallenge(playerId) {
  if (!playerId) return null
  const { data } = await supabase
    .from('player_challenges')
    .select('*')
    .eq('player_id', playerId)
    .maybeSingle()
  return data
}

export async function setPlayerChallenge(playerId, challengeType, goalShots, targetDate = null) {
  if (!playerId || !challengeType || !goalShots) return null
  const { data, error } = await supabase
    .from('player_challenges')
    .upsert(
      {
        player_id: playerId,
        challenge_type: challengeType,
        goal_shots: goalShots,
        target_completion_date: targetDate,
        started_at: new Date().toISOString(),
      },
      { onConflict: 'player_id' }
    )
    .select()
    .maybeSingle()
  if (error) throw error
  return data
}

export async function getPlayerChallengeProgress(playerId) {
  if (!playerId) return null
  const challenge = await getPlayerChallenge(playerId)
  if (!challenge) return null

  const { data: player } = await supabase
    .from('players')
    .select('lifetime_shots')
    .eq('id', playerId)
    .single()

  return {
    ...challenge,
    current_shots: player?.lifetime_shots || 0,
    progress_pct: Math.round(((player?.lifetime_shots || 0) / challenge.goal_shots) * 100),
    shots_remaining: Math.max(0, challenge.goal_shots - (player?.lifetime_shots || 0)),
  }
}

// ============ TEAM CHALLENGES ============

export async function getTeamChallengeProgress(teamId, weekStart = null) {
  if (!teamId) return null
  const ws = weekStart || getWeekStart()
  const { data } = await supabase
    .from('team_challenges')
    .select('*')
    .eq('team_id', teamId)
    .eq('week_start', ws)
    .maybeSingle()

  if (!data) return null

  const weekShots = await getTeamWeeklyShots(teamId)
  return {
    ...data,
    current_shots: weekShots,
    progress_pct: Math.round((weekShots / data.goal_shots) * 100),
    shots_remaining: Math.max(0, data.goal_shots - weekShots),
  }
}

export async function createTeamChallenge(teamId, name, goalShots, challengeType, weekStart = null, weekEnd = null) {
  if (!teamId || !name || !goalShots) return null
  const ws = weekStart || getWeekStart()
  const we = weekEnd || new Date(new Date(ws).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('team_challenges')
    .insert({
      team_id: teamId,
      name,
      goal_shots: goalShots,
      challenge_type: challengeType,
      week_start: ws,
      week_end: we,
      created_by: user?.id,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

// ============ ASSOCIATION CHALLENGES ============

export async function getAssociationChallenges(clubId) {
  if (!clubId) return []
  const { data } = await supabase
    .from('association_challenges')
    .select('*')
    .eq('club_id', clubId)
    .order('start_date', { ascending: false })
  return data || []
}

export async function createAssociationChallenge(clubId, name, goalShots, challengeType, startDate, endDate, description = null) {
  if (!clubId || !name || !goalShots || !startDate || !endDate) return null
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('association_challenges')
    .insert({
      club_id: clubId,
      name,
      description,
      goal_shots: goalShots,
      challenge_type: challengeType,
      start_date: startDate,
      end_date: endDate,
      created_by: user?.id,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function joinAssociationChallenge(challengeId, playerId, teamId = null) {
  if (!challengeId || !playerId) return null
  const { data, error } = await supabase
    .from('challenge_participants')
    .insert({
      challenge_id: challengeId,
      player_id: playerId,
      team_id: teamId,
    })
    .select()
    .single()

  if (error && error.code !== 'PGRST116') throw error // Ignore duplicate error
  return data
}
