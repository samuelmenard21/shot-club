import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { logShots, getStats, getTodayRival } from '../lib/shots'
import { pickLineStable } from '../lib/coachSam'
import { getRank } from '../lib/ranks'
import { claimAchievements } from '../lib/progress'
import DailyGoalRing from '../components/DailyGoalRing'
import StreakRiskBanner from '../components/StreakRiskBanner'
import AchievementUnlockModal from './AchievementUnlockModal'

const SHOT_TYPES_SHOOTER = ['Wrist', 'Snap', 'Slap', 'Backhand']
const SHOT_TYPES_GOALIE = ['Saves']

export default function HomeScreen() {
  const { player, refresh } = useAuth()
  const [stats, setStats] = useState({ todayTotal: 0, weekTotal: 0, todayByType: {} })
  const [rival, setRival] = useState(null)
  const [entryType, setEntryType] = useState(null)
  const [undoStack, setUndoStack] = useState([])
  const [toast, setToast] = useState('')
  const [unlockedCodes, setUnlockedCodes] = useState([])
  const [goalRefreshKey, setGoalRefreshKey] = useState(0)

  const shotTypes = player?.position === 'G' ? SHOT_TYPES_GOALIE : SHOT_TYPES_SHOOTER

  useEffect(() => {
    if (!player) return
    refreshStats()
    getTodayRival(player.team_id, player.id).then(setRival)
  }, [player])

  const refreshStats = async () => {
    if (!player) return
    const s = await getStats(player.id)
    setStats(s)
  }

  useEffect(() => {
    if (!player) return
    const t = setInterval(() => { refresh() }, 4000)
    return () => clearInterval(t)
  }, [player, refresh])

  const rank = useMemo(() => getRank(player?.lifetime_shots || 0), [player?.lifetime_shots])

  const samLine = useMemo(() => {
    if (!player) return ''
    const today = new Date().toISOString().slice(0, 10)
    const trigger = player.current_streak > 0 ? 'daily_greeting' : 'daily_greeting_no_streak'
    return pickLineStable(trigger, `${player.id}-${today}`, {
      name: player.display_name,
      streak: player.current_streak || 1,
    })
  }, [player])

  const handleSave = async (type, count) => {
    if (!count || count <= 0) return
    setEntryType(null)
    setStats((s) => ({
      ...s,
      todayTotal: s.todayTotal + count,
      weekTotal: s.weekTotal + count,
      todayByType: { ...s.todayByType, [type]: (s.todayByType[type] || 0) + count },
    }))
    setUndoStack((u) => [...u.slice(-9), { type, count, ts: Date.now() }])
    if (navigator.vibrate) navigator.vibrate(20)

    try {
      await logShots({ playerId: player.id, shotType: type, count })
      setTimeout(refreshStats, 400)
      setGoalRefreshKey((k) => k + 1)

      // Claim any newly-earned achievements (idempotent server-side)
      const newCodes = await claimAchievements(player.id)
      if (newCodes.length > 0) setUnlockedCodes(newCodes)
    } catch (e) {
      setStats((s) => ({
        ...s,
        todayTotal: Math.max(0, s.todayTotal - count),
        weekTotal: Math.max(0, s.weekTotal - count),
        todayByType: { ...s.todayByType, [type]: Math.max(0, (s.todayByType[type] || 0) - count) },
      }))
      setUndoStack((u) => u.slice(0, -1))
      showToast('Save failed, try again')
    }
  }

  const handleUndo = async () => {
    const last = undoStack[undoStack.length - 1]
    if (!last) return
    setStats((s) => ({
      ...s,
      todayTotal: Math.max(0, s.todayTotal - last.count),
      weekTotal: Math.max(0, s.weekTotal - last.count),
      todayByType: { ...s.todayByType, [last.type]: Math.max(0, (s.todayByType[last.type] || 0) - last.count) },
    }))
    setUndoStack((u) => u.slice(0, -1))
    try {
      await logShots({ playerId: player.id, shotType: last.type, count: -last.count })
      setTimeout(refreshStats, 400)
      setGoalRefreshKey((k) => k + 1)
    } catch (e) {
      showToast('Undo failed')
    }
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }

  if (!player) return null

  const lastLog = undoStack[undoStack.length - 1]
  const hasRecentLog = !!lastLog

  // Chasing strip logic
  let chasingText = null
  let chasingSub = null
  let chasingTag = null
  let chasingTagClass = 'neutral'
  if (rival) {
    const rivalToday = rival.today_shots || 0
    const gap = stats.todayTotal - rivalToday
    if (rivalToday === 0) {
      chasingText = `${rival.display_name} hasn't shot today`
      chasingSub = 'Set the pace'
      chasingTag = '—'
    } else if (gap > 0) {
      chasingText = `${rival.display_name} · ${rivalToday} today`
      chasingSub = 'Leading by'
      chasingTag = `+${gap}`
      chasingTagClass = 'lead'
    } else if (gap < 0) {
      chasingText = `${rival.display_name} · ${rivalToday} today`
      chasingSub = 'Catch them'
      chasingTag = `${gap}`
      chasingTagClass = 'chase'
    } else {
      chasingText = `${rival.display_name} · ${rivalToday} today`
      chasingSub = 'Tied'
      chasingTag = '='
    }
  }

  return (
    <div className="home fade-in">
      <header className="topbar">
        <div className="me">
          <div className="avatar">{player.display_name[0]?.toUpperCase()}</div>
          <div>
            <div className="me-name">{player.display_name}</div>
            <div className="me-sub">{rank.fullName} · {player.lifetime_shots.toLocaleString()} shots</div>
          </div>
        </div>
        {player.current_streak > 0 && (
          <div className="streak">
            <FlameIcon />
            <span className="tnum">{player.current_streak}</span>
          </div>
        )}
      </header>

      <StreakRiskBanner player={player} />

      <DailyGoalRing
        playerId={player.id}
        dailyGoal={player.daily_goal || 50}
        refreshKey={goalRefreshKey}
      />

      {samLine && (
        <div className="sam">
          <div className="sam-bubble">🏒</div>
          <div className="sam-text">{samLine}</div>
        </div>
      )}

      <div className="tap-hint">Tap a shot type to log it</div>

      <div className="shots-grid">
        {shotTypes.map((t) => {
          const todayCount = stats.todayByType[t] || 0
          return (
            <button key={t} className="shot-card" onClick={() => setEntryType(t)}>
              <div className="shot-name">{t}</div>
              <div className="shot-value tnum">{todayCount}</div>
              <div className="shot-hint">today</div>
            </button>
          )
        })}
      </div>

      {hasRecentLog && (
        <button className="undo-btn" onClick={handleUndo}>
          <span className="undo-icon">↩</span>
          <span className="undo-text">
            <span className="undo-label">Undo last entry</span>
            <span className="undo-detail">+{lastLog.count} {lastLog.type}</span>
          </span>
        </button>
      )}

      <div className="stats-row">
        <div className="stat">
          <div className="label-sm">Today</div>
          <div className="stat-value tnum">{stats.todayTotal}</div>
        </div>
        <div className="stat">
          <div className="label-sm">This week</div>
          <div className="stat-value tnum">{stats.weekTotal}</div>
        </div>
        <div className="stat">
          <div className="label-sm">Lifetime</div>
          <div className="stat-value tnum" style={{ color: 'var(--ice)' }}>{player.lifetime_shots.toLocaleString()}</div>
        </div>
      </div>

      {rival && (
        <div className={`chase chase--${chasingTagClass}`}>
          <div>
            <div className="label-sm">Chasing today</div>
            <div className="chase-name">{chasingText}</div>
            {chasingSub && <div className="chase-sub">{chasingSub}</div>}
          </div>
          <div className={`chase-tag chase-tag--${chasingTagClass} tnum`}>{chasingTag}</div>
        </div>
      )}

      {!rival && (
        <div className="solo">
          <div className="label-sm">Solo mode</div>
          <div className="solo-text">No teammates yet. Share your team name to start competing.</div>
        </div>
      )}

      {entryType && (
        <NumberPad
          type={entryType}
          onClose={() => setEntryType(null)}
          onSave={(count) => handleSave(entryType, count)}
        />
      )}

      {toast && <div className="toast">{toast}</div>}

      {unlockedCodes.length > 0 && (
        <AchievementUnlockModal
          codes={unlockedCodes}
          onDismiss={() => setUnlockedCodes([])}
        />
      )}

      <style>{styles}</style>
    </div>
  )
}

function NumberPad({ type, onSave, onClose }) {
  const [value, setValue] = useState('')

  const add = (digit) => {
    if (value.length >= 4) return
    setValue((v) => (v === '0' ? String(digit) : v + String(digit)))
  }

  const backspace = () => setValue((v) => v.slice(0, -1))
  const clear = () => setValue('')

  const num = parseInt(value, 10) || 0
  const save = () => { if (num > 0) onSave(num) }

  const quickAmounts = [10, 25, 50, 100]

  return (
    <div className="pad-overlay" onClick={onClose}>
      <div className="pad-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="pad-header">
          <div>
            <div className="label-sm">How many</div>
            <div className="pad-title">{type} shots</div>
          </div>
          <button className="pad-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="pad-display">
          <div className="pad-value tnum">{value || '0'}</div>
        </div>

        <div className="pad-quick">
          {quickAmounts.map((n) => (
            <button key={n} className="pad-quick-btn" onClick={() => setValue(String(n))}>
              {n}
            </button>
          ))}
        </div>

        <div className="pad-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
            <button key={d} className="pad-btn" onClick={() => add(d)}>{d}</button>
          ))}
          <button className="pad-btn pad-btn--sm" onClick={clear}>Clear</button>
          <button className="pad-btn" onClick={() => add(0)}>0</button>
          <button className="pad-btn pad-btn--sm" onClick={backspace}>⌫</button>
        </div>

        <button className="pad-save" onClick={save} disabled={num === 0}>
          Log {num > 0 ? num : ''} {type} shot{num === 1 ? '' : 's'}
        </button>
      </div>
    </div>
  )
}

function FlameIcon() {
  return (
    <svg width="11" height="13" viewBox="0 0 12 14" style={{ display: 'block' }}>
      <path d="M6 0 C 6 4, 10 4, 10 8 C 10 11, 8 13, 6 13 C 4 13, 2 11, 2 8 C 2 6, 4 6, 4 4 C 4 2, 6 2, 6 0 Z" fill="#ff7a29" />
    </svg>
  )
}

const styles = `
.home { padding: 12px 14px 20px; }
.topbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 6px 4px 14px;
}
.me { display: flex; align-items: center; gap: 10px; }
.avatar {
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 15px; font-weight: 700; color: white;
}
.me-name {
  font-family: var(--font-display);
  font-size: 15px; font-weight: 700;
  letter-spacing: 0.4px; line-height: 1.1;
}
.me-sub { font-size: 11px; color: var(--text-mute); margin-top: 2px; }
.streak {
  display: flex; align-items: center; gap: 5px;
  background: var(--surface);
  padding: 6px 11px; border-radius: 999px;
  font-size: 13px; color: var(--warn-soft); font-weight: 600;
}

.sam {
  background: var(--surface);
  border-left: 2px solid var(--ice);
  border-radius: var(--radius);
  padding: 11px 14px;
  margin-bottom: 14px;
  display: flex; gap: 10px; align-items: center;
}
.sam-bubble {
  width: 26px; height: 26px; border-radius: 50%;
  background: var(--accent-bg);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 13px;
}
.sam-text { font-size: 14px; line-height: 1.4; }

.tap-hint {
  text-align: center;
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 10px;
}

.shots-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}
.shot-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 18px;
  padding: 18px 16px 14px;
  color: var(--text);
  text-align: left;
  min-height: 120px;
  transition: transform 0.1s, background 0.15s, border-color 0.15s;
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}
.shot-card:active {
  transform: scale(0.97);
  background: var(--surface-raised);
  border-color: var(--accent);
}
.shot-name {
  font-family: var(--font-display);
  font-size: 15px; font-weight: 700;
  letter-spacing: 0.6px; text-transform: uppercase;
  opacity: 0.9;
}
.shot-value {
  font-family: var(--font-display);
  font-size: 42px; font-weight: 800;
  margin-top: 6px; line-height: 1;
  color: var(--ice);
}
.shot-hint {
  font-size: 10px; color: var(--text-mute);
  letter-spacing: 1px; margin-top: 6px;
  text-transform: uppercase; opacity: 0.7;
}

.undo-btn {
  width: 100%;
  background: rgba(255, 122, 41, 0.12);
  border: 0.5px solid rgba(255, 122, 41, 0.4);
  color: var(--warn-soft);
  border-radius: var(--radius);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  font-family: inherit;
  transition: all 0.15s;
  animation: fade-in 0.25s ease-out;
}
.undo-btn:active {
  background: rgba(255, 122, 41, 0.18);
  transform: scale(0.99);
}
.undo-icon {
  font-size: 18px;
  line-height: 1;
  flex-shrink: 0;
}
.undo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
}
.undo-label {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.undo-detail {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 1px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}
.stat {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 10px 8px;
  text-align: center;
}
.stat-value {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  line-height: 1; margin-top: 4px;
}

.chase {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 12px 14px;
  display: flex; justify-content: space-between; align-items: center;
  border-left: 2px solid var(--border);
}
.chase--lead { border-left-color: var(--success); }
.chase--chase { border-left-color: var(--warn); }
.chase--neutral { border-left-color: var(--ice); }
.chase-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700; margin-top: 2px;
  letter-spacing: 0.3px;
}
.chase-sub {
  font-size: 11px; color: var(--text-mute); margin-top: 2px;
}
.chase-tag {
  font-family: var(--font-display);
  font-size: 20px; font-weight: 800;
  padding: 6px 14px;
  border-radius: 999px;
  letter-spacing: 0.5px;
}
.chase-tag--lead {
  background: rgba(61, 214, 140, 0.15);
  color: var(--success);
}
.chase-tag--chase {
  background: rgba(255, 122, 41, 0.15);
  color: var(--warn-soft);
}
.chase-tag--neutral {
  background: var(--bg);
  color: var(--text-mute);
}

.solo {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 12px 14px;
  border-left: 2px solid var(--border);
}
.solo-text {
  font-size: 13px;
  color: var(--text-soft);
  margin-top: 4px;
  line-height: 1.4;
}

.pad-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  animation: fade-in 0.15s ease-out;
}
.pad-sheet {
  width: 100%;
  max-width: 430px;
  background: var(--surface);
  border-top: 0.5px solid var(--border);
  border-radius: 24px 24px 0 0;
  padding: 18px 16px calc(20px + var(--safe-bottom));
  animation: slide-up 0.25s ease-out;
}
.pad-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 10px;
}
.pad-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.5px;
  margin-top: 2px;
  text-transform: uppercase;
}
.pad-close {
  background: var(--bg);
  width: 32px; height: 32px;
  border-radius: 50%;
  color: var(--text-mute);
  font-size: 14px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

.pad-display {
  background: var(--bg);
  border-radius: var(--radius);
  padding: 22px 16px;
  text-align: center;
  margin-bottom: 10px;
}
.pad-value {
  font-family: var(--font-display);
  font-size: clamp(48px, 14vw, 64px);
  font-weight: 800;
  color: var(--ice);
  line-height: 1;
  letter-spacing: 1px;
}

.pad-quick {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 12px;
}
.pad-quick-btn {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  color: var(--ice);
  padding: 10px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
  transition: all 0.1s;
}
.pad-quick-btn:active {
  background: var(--accent);
  color: white;
  transform: scale(0.96);
}

.pad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-bottom: 12px;
}
.pad-btn {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  color: var(--text);
  padding: 18px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  min-height: 56px;
  transition: all 0.08s;
}
.pad-btn:active {
  background: var(--accent);
  color: white;
  transform: scale(0.96);
}
.pad-btn--sm {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-mute);
  letter-spacing: 0.3px;
}
.pad-btn--sm:active {
  background: var(--surface);
  color: var(--text);
  transform: scale(0.96);
}

.pad-save {
  width: 100%;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 16px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  min-height: 52px;
}
.pad-save:disabled {
  opacity: 0.35;
}

.toast {
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 10px 16px;
  color: var(--text);
  font-size: 13px;
  z-index: 200;
  animation: fade-in 0.2s ease-out;
}
`
