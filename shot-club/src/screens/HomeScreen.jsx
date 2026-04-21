import { useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { logShots, getStats, getRandomTeammate } from '../lib/shots'
import { pickLineStable } from '../lib/coachSam'
import { getRank } from '../lib/ranks'

const SHOT_TYPES = {
  shooter: ['Wrist', 'Snap', 'Slap', 'Backhand'],
  goalie: ['Saves'], // Phase 1 keeps it simple; goalie-specific types expand in Phase 2
}

export default function HomeScreen() {
  const { player, refresh } = useAuth()
  const [bucketSize, setBucketSize] = useState(null)
  const [bucketUsed, setBucketUsed] = useState(0)
  const [selectedType, setSelectedType] = useState('Wrist')
  const [showBucketInput, setShowBucketInput] = useState(false)
  const [bucketInput, setBucketInput] = useState('50')
  const [stats, setStats] = useState({ todayTotal: 0, weekTotal: 0, todayByType: {} })
  const [teammate, setTeammate] = useState(null)
  const [pendingQueue, setPendingQueue] = useState([])
  const [floatNumbers, setFloatNumbers] = useState([])
  const [pulsing, setPulsing] = useState({})
  const queueRef = useRef(null)

  const shotTypes = player?.position === 'G' ? SHOT_TYPES.goalie : SHOT_TYPES.shooter

  useEffect(() => {
    if (!player) return
    setSelectedType(player.position === 'G' ? 'Saves' : 'Wrist')
    ;(async () => {
      const s = await getStats(player.id)
      setStats(s)
      const tm = await getRandomTeammate(player.team_id, player.id)
      setTeammate(tm)
    })()
  }, [player])

  const rank = useMemo(() => getRank(player?.lifetime_shots || 0), [player?.lifetime_shots])

  // Coach Sam greeting - stable across the session day
  const samLine = useMemo(() => {
    if (!player) return ''
    const today = new Date().toISOString().slice(0, 10)
    const trigger = player.current_streak > 0 ? 'daily_greeting' : 'daily_greeting_no_streak'
    return pickLineStable(trigger, `${player.id}-${today}`, {
      name: player.display_name,
      streak: player.current_streak || 1,
    })
  }, [player])

  // Flush the pending queue every 500ms — optimistic UI, batched writes
  useEffect(() => {
    if (!player) return
    queueRef.current = setInterval(async () => {
      setPendingQueue((queue) => {
        if (queue.length === 0) return queue
        const batch = {}
        queue.forEach((q) => { batch[q.type] = (batch[q.type] || 0) + q.count })
        Object.entries(batch).forEach(async ([type, count]) => {
          try {
            await logShots({ playerId: player.id, shotType: type, count })
          } catch (e) {
            console.error('Log failed, will retry next tick', e)
          }
        })
        return []
      })
      // Refresh stats + player (lifetime shots) occasionally
      const s = await getStats(player.id)
      setStats(s)
    }, 1500)
    return () => clearInterval(queueRef.current)
  }, [player])

  // Periodic full refresh to get the trigger-updated lifetime_shots
  useEffect(() => {
    if (!player) return
    const t = setInterval(() => { refresh() }, 4000)
    return () => clearInterval(t)
  }, [player, refresh])

  const logOne = (count = 1) => {
    if (!selectedType || !player) return
    if (bucketSize && bucketUsed + count > bucketSize) {
      count = Math.max(0, bucketSize - bucketUsed)
      if (count === 0) return
    }

    // Optimistic: update stats and bucket immediately
    setStats((s) => ({
      ...s,
      todayTotal: s.todayTotal + count,
      weekTotal: s.weekTotal + count,
      todayByType: { ...s.todayByType, [selectedType]: (s.todayByType[selectedType] || 0) + count },
    }))
    setBucketUsed((u) => u + count)
    setPendingQueue((q) => [...q, { type: selectedType, count }])

    // Pulse + float up
    setPulsing((p) => ({ ...p, [selectedType]: true }))
    setTimeout(() => setPulsing((p) => ({ ...p, [selectedType]: false })), 300)

    const id = Math.random()
    setFloatNumbers((fn) => [...fn, { id, type: selectedType, value: count }])
    setTimeout(() => setFloatNumbers((fn) => fn.filter((f) => f.id !== id)), 900)
  }

  const startBucket = () => {
    const n = parseInt(bucketInput, 10)
    if (!n || n < 1) return
    setBucketSize(n)
    setBucketUsed(0)
    setShowBucketInput(false)
  }

  const clearBucket = () => {
    setBucketSize(null)
    setBucketUsed(0)
  }

  const bucketRemaining = bucketSize ? Math.max(0, bucketSize - bucketUsed) : null
  const bucketFillPct = bucketSize ? (bucketRemaining / bucketSize) : 1

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
          <div>
            <div className="label-sm" style={{ color: 'var(--ice)' }}>Coach Sam</div>
            <div className="sam-text">{samLine}</div>
          </div>
        </div>
      )}

      {/* Bucket */}
      {!showBucketInput && bucketSize === null && (
        <button className="bucket-start" onClick={() => setShowBucketInput(true)}>
          <span className="bucket-emoji">🪣</span>
          <span>Start a bucket</span>
          <span className="bucket-start-hint">count your pucks</span>
        </button>
      )}

      {showBucketInput && (
        <div className="bucket-input-wrap">
          <div className="label-sm" style={{ textAlign: 'center', marginBottom: 8 }}>How many pucks?</div>
          <div className="bucket-input-row">
            {[30, 50, 80, 120].map((n) => (
              <button
                key={n}
                className={`bucket-preset ${bucketInput === String(n) ? 'bucket-preset--active' : ''}`}
                onClick={() => setBucketInput(String(n))}
              >
                {n}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={bucketInput}
            onChange={(e) => setBucketInput(e.target.value.replace(/[^0-9]/g, ''))}
            inputMode="numeric"
            className="bucket-input"
            placeholder="Or type it in"
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button className="btn-secondary" onClick={() => setShowBucketInput(false)}>Cancel</button>
            <button className="btn-primary-sm" onClick={startBucket}>Start shooting →</button>
          </div>
        </div>
      )}

      {bucketSize !== null && (
        <div className="bucket">
          <div className="bucket-label">Bucket remaining</div>
          <div className="bucket-visual">
            <svg viewBox="0 0 200 140" style={{ width: '100%', display: 'block' }}>
              <defs>
                <clipPath id="bucketMask"><path d="M 30 30 L 170 30 L 155 130 L 45 130 Z" /></clipPath>
              </defs>
              <path d="M 30 30 L 170 30 L 155 130 L 45 130 Z" fill="#141b2d" stroke="#1f2942" strokeWidth="1" />
              <g clipPath="url(#bucketMask)">
                <rect x="0" y={30 + (100 * (1 - bucketFillPct))} width="200" height="120" fill="#2979ff" opacity="0.85" />
              </g>
              <path d="M 30 30 L 170 30 L 155 130 L 45 130 Z" fill="none" stroke="#2c3e5e" strokeWidth="1.5" />
              <ellipse cx="100" cy="30" rx="70" ry="6" fill="none" stroke="#2c3e5e" strokeWidth="1.5" />
            </svg>
            <div className="bucket-count">
              <div className="bucket-number tnum">{bucketRemaining}</div>
              <div className="bucket-of">of {bucketSize} left</div>
            </div>
          </div>
          <button className="bucket-reset" onClick={clearBucket}>Clear bucket</button>
        </div>
      )}

      <div className="shot-hint">
        {bucketSize ? 'Tap a shot type as you rip them' : 'Tap a shot type to log'}
      </div>

      {/* Shot type grid */}
      <div className="shots-grid">
        {shotTypes.map((t) => {
          const todayCount = stats.todayByType[t] || 0
          const active = selectedType === t
          return (
            <div
              key={t}
              className={`shot-card ${active ? 'shot-card--active' : ''} ${pulsing[t] ? 'pulse' : ''}`}
              onClick={() => setSelectedType(t)}
            >
              <div className="shot-card-head">
                <div className="shot-card-name">{t}</div>
                <div className="shot-card-add">+1</div>
              </div>
              <div className="shot-card-value tnum">{todayCount}</div>
              {floatNumbers.filter((f) => f.type === t).map((f) => (
                <div key={f.id} className="shot-float float-up">+{f.value}</div>
              ))}
            </div>
          )
        })}
      </div>

      {/* Log controls */}
      <div className="log-controls">
        <button className="log-btn" onClick={() => logOne(1)}>Tap +1</button>
        <button className="log-btn log-btn--alt" onClick={() => logOne(5)}>+5</button>
        <button className="log-btn log-btn--alt" onClick={() => logOne(10)}>+10</button>
      </div>

      {/* Stats row */}
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

      {/* Rank progress */}
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

      {/* Teammate / leaderboard hint */}
      {teammate && (
        <div className="teammate-strip">
          <div>
            <div className="label-sm">Teammate pace</div>
            <div className="teammate-name">
              {teammate.display_name} · <span className="tnum">{teammate.lifetime_shots.toLocaleString()}</span>
            </div>
          </div>
          <div className={`teammate-tag ${player.lifetime_shots > teammate.lifetime_shots ? 'teammate-tag--lead' : 'teammate-tag--chase'}`}>
            {player.lifetime_shots > teammate.lifetime_shots
              ? `+${(player.lifetime_shots - teammate.lifetime_shots).toLocaleString()}`
              : `-${(teammate.lifetime_shots - player.lifetime_shots).toLocaleString()}`}
          </div>
        </div>
      )}

      <style>{styles}</style>
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
.home {
  padding: 12px 14px 20px;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.4px;
  line-height: 1.1;
}
.me-sub { font-size: 11px; color: var(--text-mute); margin-top: 2px; }
.streak {
  display: flex; align-items: center; gap: 5px;
  background: var(--surface);
  padding: 6px 11px;
  border-radius: 999px;
  font-size: 13px;
  color: var(--warn-soft);
  font-weight: 600;
}
.sam {
  background: var(--surface);
  border-left: 2px solid var(--ice);
  border-radius: var(--radius);
  padding: 11px 14px;
  margin-bottom: 14px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.sam-bubble {
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--accent-bg);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
}
.sam-text { font-size: 14px; line-height: 1.45; margin-top: 2px; }

.bucket-start {
  width: 100%;
  background: var(--surface);
  border: 0.5px dashed var(--border);
  border-radius: var(--radius-lg);
  padding: 16px;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 14px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.bucket-emoji { font-size: 22px; }
.bucket-start-hint { font-family: var(--font-body); font-size: 11px; color: var(--text-mute); font-weight: 400; margin-left: 6px; }

.bucket-input-wrap {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 14px;
  margin-bottom: 14px;
}
.bucket-input-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 10px;
}
.bucket-preset {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 10px;
  color: var(--ice);
  font-weight: 600;
  font-family: var(--font-display);
  font-size: 16px;
}
.bucket-preset--active {
  background: var(--accent);
  border-color: var(--accent-soft);
  color: white;
}
.bucket-input {
  width: 100%;
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 10px 14px;
  color: var(--text);
  font-size: 16px;
  outline: none;
  text-align: center;
  font-family: var(--font-display);
  font-weight: 700;
}
.bucket-input:focus { border-color: var(--accent); }

.bucket {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 12px 14px 10px;
  margin-bottom: 14px;
  text-align: center;
}
.bucket-label {
  font-size: 10px; color: var(--text-mute);
  letter-spacing: 2px; text-transform: uppercase;
  margin-bottom: 6px;
}
.bucket-visual { position: relative; width: 180px; margin: 0 auto; }
.bucket-count {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding-top: 18px;
  pointer-events: none;
}
.bucket-number {
  font-family: var(--font-display);
  font-size: 42px;
  font-weight: 800;
  color: white;
  line-height: 1;
}
.bucket-of {
  font-size: 10px;
  color: var(--text-soft);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-top: 2px;
}
.bucket-reset {
  font-size: 11px;
  color: var(--text-mute);
  padding: 4px 8px;
  margin-top: 2px;
}

.shot-hint {
  text-align: center;
  font-size: 11px;
  color: var(--text-mute);
  margin-bottom: 10px;
  letter-spacing: 0.3px;
}
.shots-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}
.shot-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 14px;
  padding: 14px 12px;
  color: var(--text);
  position: relative;
  overflow: hidden;
  transition: transform 0.12s;
}
.shot-card:active { transform: scale(0.98); }
.shot-card--active {
  background: var(--accent);
  border-color: var(--accent-soft);
  color: white;
}
.shot-card-head {
  display: flex; justify-content: space-between; align-items: baseline;
}
.shot-card-name {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.shot-card-add {
  font-size: 10px;
  opacity: 0.7;
}
.shot-card-value {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 800;
  margin-top: 4px;
  color: inherit;
}
.shot-card--active .shot-card-value { color: white; }
.shot-card:not(.shot-card--active) .shot-card-value { color: var(--ice); }
.shot-float {
  position: absolute;
  bottom: 8px;
  left: 50%;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 800;
  color: var(--success);
  pointer-events: none;
}

.log-controls {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 6px;
  margin-bottom: 14px;
}
.log-btn {
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 13px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: transform 0.1s;
}
.log-btn:active { transform: scale(0.97); }
.log-btn--alt {
  background: var(--surface);
  color: var(--ice);
  border: 0.5px solid var(--border-dim);
  font-size: 14px;
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
  font-size: 20px;
  font-weight: 800;
  line-height: 1;
  margin-top: 4px;
}

.rank-strip {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 10px 14px;
  margin-bottom: 10px;
}
.rank-strip-name {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  margin-top: 2px;
}
.rank-bar {
  height: 4px; background: var(--bg);
  border-radius: 999px; overflow: hidden;
  margin-top: 6px;
}
.rank-bar-fill {
  height: 100%; background: var(--ice); border-radius: 999px;
  transition: width 0.3s;
}

.teammate-strip {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 10px 14px;
  display: flex; justify-content: space-between; align-items: center;
}
.teammate-name {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  margin-top: 2px;
}
.teammate-tag {
  padding: 4px 10px;
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
}
.teammate-tag--lead {
  background: rgba(61, 214, 140, 0.15);
  color: var(--success);
}
.teammate-tag--chase {
  background: rgba(255, 122, 41, 0.15);
  color: var(--warn-soft);
}
.btn-primary-sm {
  flex: 1;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 10px;
  font-weight: 600;
}
.btn-secondary {
  background: var(--bg);
  color: var(--text-mute);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 10px 14px;
  font-weight: 500;
}
`
