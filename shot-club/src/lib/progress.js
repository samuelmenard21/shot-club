import { supabase } from './supabase'

// ---------------------------------------------------------------------------
// Today's progress + daily goal
// ---------------------------------------------------------------------------

export async function getTodayProgress(playerId, dailyGoal) {
  const today = todayLocalISO()
  const { data } = await supabase
    .from('daily_progress')
    .select('shots_total, goal_met')
    .eq('player_id', playerId)
    .eq('day', today)
    .maybeSingle()

  const shotsToday = data?.shots_total ?? 0
  const goal = Math.max(1, dailyGoal || 50)
  return {
    shotsToday,
    goalMet: shotsToday >= goal,
    pctOfGoal: Math.min(100, Math.round((shotsToday / goal) * 100)),
  }
}

export async function setDailyGoal(playerId, newGoal) {
  const safe = Math.max(10, Math.min(500, Math.round(newGoal)))
  const { error } = await supabase
    .from('players')
    .update({ daily_goal: safe })
    .eq('id', playerId)
  if (error) throw error
  return safe
}

// ---------------------------------------------------------------------------
// 7-day chart data
// ---------------------------------------------------------------------------

export async function getLast7Days(playerId) {
  const days = lastNDays(7)
  const { data } = await supabase
    .from('daily_progress')
    .select('day, shots_total, goal_met')
    .eq('player_id', playerId)
    .in('day', days)

  const byDay = {}
  for (const row of data || []) byDay[row.day] = row

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today = todayLocalISO()

  return days.map((d) => {
    const row = byDay[d]
    const dateObj = new Date(d + 'T12:00:00')
    return {
      day: dayLabels[dateObj.getDay()],
      date: d,
      shots: row?.shots_total ?? 0,
      goalMet: row?.goal_met ?? false,
      isToday: d === today,
    }
  })
}

// ---------------------------------------------------------------------------
// Streak freeze
// ---------------------------------------------------------------------------

export function isStreakAtRisk(player) {
  if (!player) return false
  if ((player.current_streak ?? 0) === 0) return false
  if (player.last_shot_date === todayLocalISO()) return false
  // After 5pm local = at risk
  return new Date().getHours() >= 17
}

export function freezesAvailable(player) {
  if (!player) return 0
  const last = player.last_freeze_used_at
  if (!last) return player.streak_freezes_remaining ?? 2
  const lastDate = new Date(last + 'T12:00:00')
  const now = new Date()
  if (
    lastDate.getMonth() !== now.getMonth() ||
    lastDate.getFullYear() !== now.getFullYear()
  ) {
    return 2
  }
  return player.streak_freezes_remaining ?? 0
}

export async function useStreakFreeze(playerId) {
  const { data, error } = await supabase.rpc('use_streak_freeze', {
    p_player_id: playerId,
  })
  if (error) throw error
  return data === true
}

// ---------------------------------------------------------------------------
// Achievements
// ---------------------------------------------------------------------------

export async function getAchievements(playerId) {
  const [defsRes, unlockedRes] = await Promise.all([
    supabase.from('achievement_defs').select('*').order('sort_order'),
    supabase
      .from('player_achievements')
      .select('code, unlocked_at')
      .eq('player_id', playerId),
  ])

  const unlockedMap = {}
  for (const row of unlockedRes.data || []) unlockedMap[row.code] = row.unlocked_at

  return (defsRes.data || []).map((def) => ({
    ...def,
    unlocked: !!unlockedMap[def.code],
    unlocked_at: unlockedMap[def.code] || null,
  }))
}

export async function claimAchievements(playerId) {
  const { data, error } = await supabase.rpc('claim_achievements_for_player', {
    p_player_id: playerId,
  })
  if (error) {
    console.error('claimAchievements error', error)
    return []
  }
  return data || []
}

// ---------------------------------------------------------------------------
// Date helpers (local time, matches the trigger's America/Toronto)
// ---------------------------------------------------------------------------

function todayLocalISO() {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function lastNDays(n) {
  const out = []
  const today = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    out.push(`${yyyy}-${mm}-${dd}`)
  }
  return out
}
