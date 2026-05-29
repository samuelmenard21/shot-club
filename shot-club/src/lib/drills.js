import { supabase } from './supabase'
import { getWeekStart } from './shots'

/**
 * Insert a drill log. Pass either count (reps) OR durationMinutes — not both.
 * Negative values delete the most recent matching log (used by Undo).
 */
export async function logDrill({ playerId, drillType = 'Stickhandling', count = null, durationMinutes = null }) {
  if (count === null && durationMinutes === null) {
    throw new Error('logDrill requires either count or durationMinutes')
  }

  // Undo path: negative count/minutes means "remove the most recent log of this shape"
  if ((count !== null && count < 0) || (durationMinutes !== null && durationMinutes < 0)) {
    return undoLastDrill({ playerId, drillType, count, durationMinutes })
  }

  const { error } = await supabase.from('drill_logs').insert({
    player_id: playerId,
    drill_type: drillType,
    count,
    duration_minutes: durationMinutes,
  })
  if (error) throw error
}

/**
 * Delete the most recent drill_log row matching the player + type + measurement.
 * Used by the Home screen Undo button.
 */
async function undoLastDrill({ playerId, drillType, count, durationMinutes }) {
  const isReps = count !== null
  const targetCol = isReps ? 'count' : 'duration_minutes'

  // Find the most recent row that has a value in the matching column
  let q = supabase
    .from('drill_logs')
    .select('id')
    .eq('player_id', playerId)
    .eq('drill_type', drillType)
    .not(targetCol, 'is', null)
    .order('logged_at', { ascending: false })
    .limit(1)

  const { data: rows, error: selErr } = await q
  if (selErr) throw selErr
  if (!rows || rows.length === 0) return

  const { error: delErr } = await supabase
    .from('drill_logs')
    .delete()
    .eq('id', rows[0].id)
  if (delErr) throw delErr
}

/**
 * Stats for the Stickhandling tiles on the Home screen.
 * Returns today's reps + minutes and this week's reps + minutes for the player.
 */
export async function getDrillStats(playerId) {
  const today = new Date().toISOString().slice(0, 10)
  const weekStart = getWeekStart()

  const { data: rows, error } = await supabase
    .from('drill_logs')
    .select('count, duration_minutes, log_date')
    .eq('player_id', playerId)
    .eq('drill_type', 'Stickhandling')
    .gte('log_date', weekStart)
  if (error) throw error

  const todayRows = (rows || []).filter(r => r.log_date === today)
  const sum = (arr, key) => arr.reduce((s, r) => s + (Number(r[key]) || 0), 0)

  return {
    todayReps:     sum(todayRows, 'count'),
    todayMinutes:  sum(todayRows, 'duration_minutes'),
    weekReps:      sum(rows || [], 'count'),
    weekMinutes:   sum(rows || [], 'duration_minutes'),
  }
}
