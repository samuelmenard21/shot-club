import { useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { logShots, getStats, getRandomTeammate } from '../lib/shots'
import { pickLineStable } from '../lib/coachSam'
import { getRank } from '../lib/ranks'

const SHOT_TYPES_SHOOTER = ['Wrist', 'Snap', 'Slap', 'Backhand']
const SHOT_TYPES_GOALIE = ['Saves']
const LONG_PRESS_MS = 350

export default function HomeScreen() {
  const { player, refresh } = useAuth()
  const [stats, setStats] = useState({ todayTotal: 0, weekTotal: 0, todayByType: {} })
  const [teammate, setTeammate] = useState(null)
  const [pendingQueue, setPendingQueue] = useState([])
  const [floatNumbers, setFloatNumbers] = useState([])
  const [pulsing, setPulsing] = useState({})
  const [lastTapped, setLastTapped] = useState(null)
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [undoStack, setUndoStack] = useState([])
  const flushTimer = useRef(null)
  const longPressTimer = useRef(null)
  const longPressFired = useRef(false)

  const shotTypes = player?.position === 'G' ? SHOT_TYPES_GOALIE : SHOT_TYPES_SHOOTER

  useEffect(() => {
    if (!player) return
    ;(async () => {
      const s = await getStats(player.id)
      setStats(s)
      const tm = await getRandomTeammate(player.team_id, player.id)
      setTeammate(tm)
    })()
  }, [player])

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

  useEffect(() => {
    if (!player) return
    flushTimer.current = setInterval(async () => {
      setPendingQueue((queue) => {
        if (queue.length === 0) return queue
        const batch = {}
        queue.forEach((q) => { batch[q.type] = (batch[q.type] || 0) + q.count })
        Object.entries(batch).forEach(async ([type, count]) => {
          if (count === 0) return
          try {
            await logShots({ playerId: player.id, shotType: type, count })
          } catch (e) {
            console.error('Log failed', e)
          }
        })
        return []
      })
      const s = await getStats(player.id)
      setStats(s)
    }, 1500)
    return () => clearInterval(flushTimer.current)
  }, [player])

  useEffect(() => {
    if (!player) return
    const t = setInterval(() => { refresh() }, 4000)
    return () => clearInterval(t)
  }, [player, refresh])

  const logShot = (type, count = 1) => {
    if (!player) return
    setStats((s) => ({
      ...s,
      todayTotal: Math.max(0, s.todayTotal + count),
      weekTotal: Math.max(0, s.weekTotal + count),
      todayByType: { ...s.todayByType, [type]: Math.max(0, (s.todayByType[type] || 0) + count) },
    }))
    setPendingQueue((q) => [...q, { type, count }])
    if (count > 0) setUndoStack((u) => [...u.slice(-9), { type, count, ts: Date.now() }])
    setLastTapped(type)

    setPulsing((p) => ({ ...p, [type]: true }))
    setTimeout(() => setPulsing((p) => ({ ...p, [type]: false })), 250)

    const id = Math.random()
    setFloatNumbers((fn) => [...fn, { id, type, value: count }])
    setTimeout(() => setFloatNumbers((fn) => fn.filter((f) => f.id !== id)), 800)

    if (navigator.vibrate) navigator.vibrate(Math.abs(count) >= 5 ? 25 : 10)
  }

  const handlePressStart = (type) => {
    longPressFired.current = false
    longPressTimer.current = setTimeout(() => {
      longPressFired.current = true
      logShot(type, 5)
    }, LONG_PRESS_MS)
  }

  const handlePressEnd = (type) => {
    clearTimeout(longPressTimer.current)
    if (!longPressFired.current) logShot(type, 1)
  }

  const handlePressCancel = () => {
    clearTimeout(longPressTimer.current)
    longPressFired.current = false
  }

  const handleUndo = () => {
    const last = undoStack[undoStack.length - 1]
    if (!last) return
    logShot(last.type, -last.count)
    setUndoStack((u) => u.slice(0, -1))
  }

  if (!player) return null

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

      {samLine && (
        <div className="sam">
          <div className="sam-bubble">🏒</div>
          <div className="sam-text">{samLine}</div>
        </div>
      )}

      <div className="shots-grid">
        {shotTypes.map((t) => {
          const todayCount = stats.todayByType[t] || 0
          const active = lastTapped === t
          return (
            <button
              key={t}
              className={`shot-card ${active ? 'shot-card--active' : ''} ${pulsing[t] ? 'pulse' : ''}`}
              onTouchStart={(e) => { e.preventDefault(); handlePressStart(t) }}
              onTouchEnd={(e) => { e.preventDefault(); handlePressEnd(t) }}
              onTouchCancel={handlePressCancel}
              onMouseDown={() => handlePressStart(t)}
              onMouseUp={() => handlePressEnd(t)}
              onMouseLeave={handlePressCancel}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="shot-name">{t}</div>
              <div className="shot-value tnum">{todayCount}</div>
              <div className="shot-hint">tap +1 · hold +5</div>
              {floatNumbers.filter((f) => f.type === t).map((f) => (
                <div key={f.id} className={`shot-float float-up ${f.value < 0 ? 'shot-float--neg' : ''}`}>
                  {f.value > 0 ? `+${f.value}` : f.value}
                </div>
              ))}
            </button>
          )
        })}
      </div>

      <div className="action-row">
        <button className="action-btn" onClick={() => setShowQuickAdd(true)}>
          Quick add a session
        </button>
        <button className="action-btn action-btn--icon" onClick={handleUndo} disabled={undoStack.length === 0}>
          ↩ Undo
        </button>
      </div>

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

      {!rank.isMax && (
        <div className="rank-strip">
          <div>
            <div className="label-sm">Next up</div>
            <div className="rank-strip-name">{rank.nextRankName} · {rank.shotsToNextRank.toLocaleString()} shots</div>
          </div>
          <div className="rank-bar">
            <div className="rank-bar-fill" style={{ width: `${Math.round(rank.progress * 100)}%` }} />
          </div>
        </div>
      )}

      {teammate && (
        <div className="teammate-strip">
          <div>
            <div className="label-sm">Teammate pace</div>
            <div className="teammate-name">{teammate.display_name} · <span className="tnum">{teammate.lifetime_shots.toLocaleString()}</span></div>
          </div>
          <div className={`teammate-tag ${player.lifetime_shots > teammate.lifetime_shots ? 'teammate-tag--lead' : 'teammate-tag--chase'}`}>
            {player.lifetime_shots > teammate.lifetime_shots
              ? `+${(player.lifetime_shots - teammate.lifetime_shots).toLocaleString()}`
              : `-${(teammate.lifetime_shots - player.lifetime_shots).toLocaleString()}`}
          </div>
        </div>
      )}

      {showQuickAdd && (
        <QuickAddSheet
          shotTypes={shotTypes}
          onClose={() => setShowQuickAdd(false)}
          onSubmit={(amounts) => {
            Object.entries(amounts).forEach(([type, count]) => {
              if (count > 0) logShot(type, count)
            })
            setShowQuickAdd(false)
          }}
        />
      )}

      <style>{styles}</style>
    </div>
  )
}

function QuickAddSheet({ shotTypes, onClose, onSubmit }) {
  const [amounts, setAmounts] = useState(Object.fromEntries(shotTypes.map((t) => [t, ''])))

  const updateAmount = (type, val) => {
    const clean = val.replace(/[^0-9]/g, '').slice(0, 4)
    setAmounts((a) => ({ ...a, [type]: clean }))
  }

  const total = Object.values(amounts).reduce((s, v) => s + (parseInt(v, 10) || 0), 0)

  const submit = () => {
    const numeric = {}
    Object.entries(amounts).forEach(([t, v]) => { numeric[t] = parseInt(v, 10) || 0 })
    onSubmit(numeric)
  }

  return (
    <div className="qa-overlay" onClick={onClose}>
      <div className="qa-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="qa-header">
          <div>
            <div className="qa-title">Quick add</div>
            <div className="qa-sub">Type how many of each, save once</div>
          </div>
          <button className="qa-close" onClick={onClose}>✕</button>
        </div>

        <div className="qa-rows">
          {shotTypes.map((t) => (
            <div key={t} className="qa-row">
              <div className="qa-row-name">{t}</div>
              <input
                type="text"
                inputMode="numeric"
                value={amounts[t]}
                onChange={(e) => updateAmount(t, e.target.value)}
                placeholder="0"
                className="qa-input"
              />
            </div>
          ))}
        </div>

        <div className="qa-total">
          <span className="label-sm">Total</span>
          <span className="qa-total-num tnum">{total}</span>
        </div>

        <button className="qa-submit" onClick={submit} disabled={total === 0}>
          Log {total} shot{total === 1 ? '' : 's'}
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
  margin-bottom: 16px;
  display: flex; gap: 10px; align-items: center;
}
.sam-bubble {
  width: 26px; height: 26px; border-radius: 50%;
  background: var(--accent-bg);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 13px;
}
.sam-text { font-size: 14px; line-height: 1.4; }

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
  position: relative;
  overflow: hidden;
  text-align: left;
  min-height: 130px;
  transition: transform 0.1s, background 0.15s;
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}
.shot-card:active {
  transform: scale(0.97);
  background: var(--surface-raised);
}
.shot-card--active {
  background: var(--accent);
  border-color: var(--accent-soft);
  color: white;
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
.shot-card--active .shot-value { color: white; }
.shot-hint {
  font-size: 10px; color: var(--text-mute);
  letter-spacing: 0.5px; margin-top: 8px; opacity: 0.7;
}
.shot-card--active .shot-hint { color: rgba(255,255,255,0.85); opacity: 1; }
.shot-float {
  position: absolute; bottom: 14px; right: 16px;
  font-family: var(--font-display);
  font-size: 18px; font-weight: 800;
  color: var(--success); pointer-events: none;
}
.shot-float--neg { color: var(--warn-soft); }

.action-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 6px;
  margin-bottom: 16px;
}
.action-btn {
  background: transparent;
  color: var(--text-mute);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 10px;
  font-size: 12px; font-weight: 500; letter-spacing: 0.3px;
  font-family: inherit;
  transition: all 0.1s;
}
.action-btn:active:not(:disabled) {
  background: var(--surface);
  color: var(--ice);
}
.action-btn--icon { padding: 10px 16px; }

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

.rank-strip {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 10px 14px;
  margin-bottom: 10px;
}
.rank-strip-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700; margin-top: 2px;
}
.rank-bar {
  height: 4px; background: var(--bg);
  border-radius: 999px; overflow: hidden;
  margin-top: 6px;
}
.rank-bar-fill {
  height: 100%; background: var(--ice);
  border-radius: 999px; transition: width 0.3s;
}

.teammate-strip {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 10px 14px;
  display: flex; justify-content: space-between; align-items: center;
}
.teammate-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700; margin-top: 2px;
}
.teammate-tag {
  padding: 4px 10px;
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
}
.teammate-tag--lead { background: rgba(61, 214, 140, 0.15); color: var(--success); }
.teammate-tag--chase { background: rgba(255, 122, 41, 0.15); color: var(--warn-soft); }

.qa-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 100;
  display: flex; align-items: flex-end; justify-content: center;
}
.qa-sheet {
  width: 100%; max-width: 430px;
  background: var(--surface);
  border-top: 0.5px solid var(--border);
  border-radius: 24px 24px 0 0;
  padding: 18px 16px max(20px, env(safe-area-inset-bottom, 20px));
  animation: slide-up 0.25s ease-out;
}
@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.qa-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 14px;
}
.qa-title {
  font-family: var(--font-display);
  font-size: 20px; font-weight: 700; letter-spacing: 0.4px;
}
.qa-sub { font-size: 12px; color: var(--text-mute); margin-top: 2px; }
.qa-close {
  background: var(--bg);
  width: 32px; height: 32px;
  border-radius: 50%;
  color: var(--text-mute);
  font-size: 14px;
  display: flex; align-items: center; justify-content: center;
}
.qa-rows { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
.qa-row {
  display: flex; align-items: center;
  background: var(--bg);
  border-radius: var(--radius);
  padding: 12px 14px;
}
.qa-row-name {
  flex: 1;
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.5px; text-transform: uppercase;
}
.qa-input {
  width: 80px;
  background: transparent;
  border: 0.5px solid var(--border-dim);
  border-radius: 8px;
  padding: 8px 10px;
  text-align: center;
  font-family: var(--font-display);
  font-size: 18px; font-weight: 700;
  color: var(--ice);
  outline: none;
}
.qa-input:focus { border-color: var(--accent); }
.qa-total {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 14px;
  background: var(--bg);
  border-radius: var(--radius);
  margin-bottom: 12px;
}
.qa-total-num {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  color: var(--ice);
}
.qa-submit {
  width: 100%;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 14px;
  font-family: var(--font-display);
  font-size: 16px; font-weight: 700; letter-spacing: 0.5px;
}
.qa-submit:disabled { opacity: 0.4; }
`
