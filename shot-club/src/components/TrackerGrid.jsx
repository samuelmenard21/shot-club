import { useState, useMemo } from 'react'
import { logShots } from '../lib/shots'

// Interactive grid tracker: daily cells + milestone strip
export default function TrackerGrid({ player, playerChallenge, playerChallengeProgress, onShotLogged }) {
  const [selectedDay, setSelectedDay] = useState(null)
  const [entryAmount, setEntryAmount] = useState('')
  const [shotTypeBreakdown, setShotTypeBreakdown] = useState({
    Wrist: 0,
    Snap: 0,
    Slap: 0,
    Backhand: 0,
  })

  if (!player || !playerChallenge || !playerChallengeProgress) {
    return <div style={{ color: 'var(--text-soft)', padding: 20 }}>Loading challenge...</div>
  }

  const { goal_shots: totalGoal } = playerChallenge
  const { shots_completed: currentShots } = playerChallengeProgress
  const shotsToday = 0 // TODO: fetch from daily log
  const daysInChallenge = Math.ceil(totalGoal / 100) // Rough estimate
  const currentDay = Math.ceil(currentShots / 50) || 1

  // Calculate milestones
  const milestoneInterval = totalGoal / 4
  const milestones = [
    { at: milestoneInterval, emoji: '🥉', label: Math.round(milestoneInterval).toLocaleString() },
    { at: milestoneInterval * 2, emoji: '🥈', label: Math.round(milestoneInterval * 2).toLocaleString() },
    { at: milestoneInterval * 3, emoji: '🥇', label: Math.round(milestoneInterval * 3).toLocaleString() },
    { at: totalGoal, emoji: '🏆', label: totalGoal.toLocaleString() },
  ]

  // Generate daily cells (max 60 visible at once, scrollable)
  const dailyGoal = Math.ceil(totalGoal / daysInChallenge)
  const days = Array.from({ length: daysInChallenge }, (_, i) => {
    const dayNum = i + 1
    const targetShots = dayNum * dailyGoal
    const isComplete = currentShots >= targetShots
    return { dayNum, targetShots, isComplete }
  })

  const handleDayClick = (day) => {
    setSelectedDay(day)
    setEntryAmount('')
  }

  const handleLogShots = async () => {
    if (!entryAmount || !selectedDay || !player) return
    try {
      await logShots(player.id, parseInt(entryAmount), 'daily')
      onShotLogged?.()
      setSelectedDay(null)
      setEntryAmount('')
    } catch (err) {
      console.error('Failed to log shots:', err)
    }
  }

  const progress = (currentShots / totalGoal) * 100

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      {/* PROGRESS BAR */}
      <div style={{ marginBottom: 30 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>
            {currentShots.toLocaleString()} / {totalGoal.toLocaleString()} shots
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ice)' }}>
            {Math.round(progress)}%
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', height: 10, borderRadius: 8, overflow: 'hidden' }}>
          <div
            style={{
              background: 'linear-gradient(90deg, var(--ice), var(--accent))',
              height: '100%',
              width: `${progress}%`,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* DAILY GRID (scrollable) */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-mute)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
          Daily Progress
        </h3>
        <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(14, days.length)}, 1fr)`, gap: 8, minWidth: 'fit-content' }}>
            {days.map((day) => (
              <button
                key={day.dayNum}
                onClick={() => handleDayClick(day)}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  border: '2px solid',
                  borderColor: day.isComplete ? 'var(--ice)' : 'rgba(255,255,255,0.1)',
                  background: day.isComplete
                    ? 'rgba(41, 121, 255, 0.2)'
                    : day.dayNum === currentDay
                      ? 'rgba(255,255,255,0.05)'
                      : 'transparent',
                  color: day.isComplete ? 'var(--ice)' : 'var(--text-soft)',
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--ice)'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = day.isComplete ? 'var(--ice)' : 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <div style={{ fontSize: 10 }}>Day</div>
                <div>{day.dayNum}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MILESTONE STRIP */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-mute)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
          Milestones
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {milestones.map((m, i) => {
            const isMet = currentShots >= m.at
            return (
              <div
                key={i}
                style={{
                  border: '2px solid',
                  borderColor: isMet ? 'var(--ice)' : 'rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  padding: 16,
                  textAlign: 'center',
                  background: isMet ? 'rgba(41, 121, 255, 0.1)' : 'rgba(255,255,255,0.02)',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{m.emoji}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: isMet ? 'var(--ice)' : 'var(--text-soft)' }}>
                  {m.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* SHOT-TYPE BREAKDOWN */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-mute)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
          Shot Types (Today)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {Object.entries(shotTypeBreakdown).map(([type, count]) => {
            const emojis = { Wrist: '🎯', Snap: '⚡', Slap: '💥', Backhand: '🔄' }
            return (
              <div
                key={type}
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: 12,
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 6 }}>{emojis[type]}</div>
                <div style={{ fontSize: 12, color: 'var(--text-soft)', marginBottom: 4 }}>{type}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ice)' }}>{count}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* QUICK-LOG MODAL */}
      {selectedDay && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'flex-end', zIndex: 50 }}>
          <div
            style={{
              background: 'var(--bg)',
              width: '100%',
              maxWidth: 480,
              borderRadius: '16px 16px 0 0',
              padding: 24,
              borderTop: '3px solid var(--ice)',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
              Log shots for Day {selectedDay.dayNum}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 10,
                marginBottom: 20,
              }}
            >
              {[10, 25, 50, 100].map((n) => (
                <button
                  key={n}
                  onClick={() => setEntryAmount(String(parseInt(entryAmount || '0') + n))}
                  style={{
                    background: 'rgba(41, 121, 255, 0.1)',
                    border: '1px solid rgba(41, 121, 255, 0.3)',
                    color: 'var(--ice)',
                    borderRadius: 8,
                    padding: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: 14,
                  }}
                >
                  +{n}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={entryAmount}
              onChange={(e) => setEntryAmount(e.target.value)}
              placeholder="Enter shots"
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.02)',
                color: 'white',
                marginBottom: 16,
                fontSize: 16,
              }}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setSelectedDay(null)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent',
                  color: 'var(--text-soft)',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogShots}
                disabled={!entryAmount}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  background: entryAmount ? 'var(--ice)' : 'rgba(255,255,255,0.1)',
                  color: entryAmount ? 'white' : 'var(--text-mute)',
                  cursor: entryAmount ? 'pointer' : 'not-allowed',
                  fontWeight: 700,
                }}
              >
                Log {entryAmount} Shots
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
