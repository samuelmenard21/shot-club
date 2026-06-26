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

const SQUAD_NAMES = [
  'The Snipers', 'Ice Breakers', 'The Wall', 'Iron Five',
  'Puck Hunters', 'Frozen Few', 'The Grinders', 'Top Shelf',
  'The Enforcers', 'Night Train', 'Sudden Death', 'Power Play',
  'Bardown Boys', 'Overtime Kings', 'The Backcheck', 'Slot Monsters',
]

export function defaultSquadName(teamId, weekStart, squadIndex) {
  return SQUAD_NAMES[stableIndex(teamId + weekStart + String(squadIndex), SQUAD_NAMES.length)]
}

export const SQUAD_SIZE = 4

export function formSquads(players, weekStart) {
  const shuffled = [...players].sort((a, b) => {
    const ha = stableIndex(a.id + weekStart, 100000)
    const hb = stableIndex(b.id + weekStart, 100000)
    return ha - hb
  })
  const squads = []
  for (let i = 0; i < shuffled.length; i += SQUAD_SIZE) {
    squads.push(shuffled.slice(i, i + SQUAD_SIZE))
  }
  return squads
}

export async function getMySquadBattle(playerId, teamId, clubId) {
  if (!playerId || !teamId || !clubId) return null
  const weekStart = getWeekStart()
  const today = todayLocal()

  // Get all players on my team + rival team in parallel with squad name lookups
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

  const mySquads = formSquads(myPlayers, weekStart)
  const rivalSquads = formSquads(rivalPlayers, weekStart)

  const mySquadIndex = mySquads.findIndex((s) => s.some((p) => p.id === playerId))
  if (mySquadIndex === -1) return null

  const mySquadPlayers = mySquads[mySquadIndex]
  const rivalSquadIndex = mySquadIndex % rivalSquads.length
  const rivalSquadPlayers = rivalSquads[rivalSquadIndex]

  // Fetch shots + squad names in parallel
  const allIds = [...mySquadPlayers.map((p) => p.id), ...rivalSquadPlayers.map((p) => p.id)]

  const [{ data: shotLogs }, { data: myNames }, { data: rivalNames }] = await Promise.all([
    supabase.from('shot_logs').select('player_id, count, log_date').in('player_id', allIds).gte('log_date', weekStart),
    supabase.from('squad_names').select('squad_index, name').eq('team_id', teamId).eq('week_start', weekStart),
    supabase.from('squad_names').select('squad_index, name').eq('team_id', rivalTeam.id).eq('week_start', weekStart),
  ])

  const weekShots = {}
  const todayShots = {}
  for (const log of shotLogs || []) {
    weekShots[log.player_id] = (weekShots[log.player_id] || 0) + log.count
    if (log.log_date === today) todayShots[log.player_id] = (todayShots[log.player_id] || 0) + log.count
  }

  const savedMyNames = Object.fromEntries((myNames || []).map((r) => [r.squad_index, r.name]))
  const savedRivalNames = Object.fromEntries((rivalNames || []).map((r) => [r.squad_index, r.name]))

  const buildMembers = (players, isMine) =>
    players.map((p, i) => ({
      id: p.id,
      display_name: p.display_name,
      isMe: isMine && p.id === playerId,
      isLeader: i === 0,
      weekShots: weekShots[p.id] || 0,
      todayShots: todayShots[p.id] || 0,
      loggedToday: (todayShots[p.id] || 0) > 0,
    }))

  const myMembers = buildMembers(mySquadPlayers, true)
  const rivalMembers = buildMembers(rivalSquadPlayers, false)

  const sumWeek = (members) => members.reduce((s, m) => s + m.weekShots, 0)
  const sumToday = (members) => members.reduce((s, m) => s + m.todayShots, 0)

  return {
    weekStart,
    squadIndex: mySquadIndex,
    isLeader: mySquadPlayers[0]?.id === playerId,
    daysLeft: daysUntilSunday(),
    mySquad: {
      name: savedMyNames[mySquadIndex] || defaultSquadName(teamId, weekStart, mySquadIndex),
      members: myMembers,
      totalWeekShots: sumWeek(myMembers),
      totalTodayShots: sumToday(myMembers),
      fullSquadDay: myMembers.every((m) => m.loggedToday),
      loggedTodayCount: myMembers.filter((m) => m.loggedToday).length,
    },
    rivalSquad: {
      name: savedRivalNames[rivalSquadIndex] || defaultSquadName(rivalTeam.id, weekStart, rivalSquadIndex),
      teamName: `${rivalTeam.age_division} ${rivalTeam.tier}`,
      members: rivalMembers,
      totalWeekShots: sumWeek(rivalMembers),
      totalTodayShots: sumToday(rivalMembers),
      fullSquadDay: rivalMembers.every((m) => m.loggedToday),
    },
  }
}

export async function setSquadName(teamId, weekStart, squadIndex, name) {
  const { error } = await supabase
    .from('squad_names')
    .upsert(
      { team_id: teamId, week_start: weekStart, squad_index: squadIndex, name: name.trim() },
      { onConflict: 'team_id,week_start,squad_index' }
    )
  if (error) throw error
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
