import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { logShots, getStats, getTodayRival, getPersonalBest } from '../lib/shots'
import { pickLineStable } from '../lib/coachSam'
import { getRank } from '../lib/ranks'
import { claimAchievements, isStreakInRecovery } from '../lib/progress'
import { attachPlayerToTeam } from '../lib/teams'
import { getSkillVideos } from '../lib/videos'
import { getTeamChallenge, getTeamWeeklyShots, getMyBattle } from '../lib/challenges'
import DailyGoalRing from '../components/DailyGoalRing'
import StreakRiskBanner from '../components/StreakRiskBanner'
import StreakRecoveryBanner from '../components/StreakRecoveryBanner'
import BattleCard from '../components/BattleCard'
import NumberPad from '../components/NumberPad'
import AchievementUnlockModal from './AchievementUnlockModal'

const SHOT_TYPES_SHOOTER = ['Wrist', 'Snap', 'Slap', 'Backhand']
const SHOT_TYPES_GOALIE = ['Saves']
const STICK_TYPES = ['Toe Drag', 'Figure 8', 'Lateral', 'One-Hand']

const SHOT_EMOJIS = {
  'Wrist': '🎯',
  'Snap': '⚡',
  'Slap': '💥',
  'Backhand': '🔄',
  'Saves': '🧤',
  'Toe Drag': '👟',
  'Figure 8': '8️⃣',
  'Lateral': '↔️',
  'One-Hand': '✋',
}

export default function HomeScreen() {
  const { player, refresh } = useAuth()
  const [stats, setStats] = useState({ todayTotal: 0, weekTotal: 0, todayByType: {} })
  const [rival, setRival] = useState(null)
  const [entryType, setEntryType] = useState(null)
  const [undoStack, setUndoStack] = useState([])
  const [toast, setToast] = useState('')
  const [unlockedCodes, setUnlockedCodes] = useState([])
  const [goalRefreshKey, setGoalRefreshKey] = useState(0)
  const [videos, setVideos] = useState([])
  const [personalBest, setPersonalBest] = useState(0)
  const [newPB, setNewPB] = useState(false)
  const [teamChallenge, setTeamChallenge] = useState(null)
  const [teamWeekShots, setTeamWeekShots] = useState(0)
  const [squadBattle, setSquadBattle] = useState(null)

  const shotTypes = player?.position === 'G' ? SHOT_TYPES_GOALIE : SHOT_TYPES_SHOOTER

  useEffect(() => {
    if (!player) return
    refreshStats()
    getTodayRival(player.team_id, player.id).then(setRival).catch(() => {})
    getSkillVideos().then(setVideos).catch(() => {})
    getPersonalBest(player.id).then(setPersonalBest).catch(() => {})
    if (player.team_id) {
      Promise.all([
        getTeamChallenge(player.team_id),
        getTeamWeeklyShots(player.team_id),
        getMyBattle(player.id, player.team_id, player.club_id),
      ])
        .then(([ch, wk, battle]) => {
          setTeamChallenge(ch)
          setTeamWeekShots(wk)
          setSquadBattle(battle)
        })
        .catch((err) => {
          console.error('Battle/challenge load error:', err)
        })
    }
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

      const newTotal = stats.todayTotal + count
      const dailyGoal = player.daily_goal || 50
      const lifetimeShots = player.lifetime_shots + count

      // Celebration messages for daily milestones
      if (newTotal === dailyGoal) {
        showToast('🔥 Daily goal reached!')
      } else if (newTotal === 100) {
        showToast('💪 100 shots today!')
      } else if (newTotal === 50) {
        showToast('⭐ 50 shots!')
      }

      // Celebration messages for lifetime milestones
      const milestones = [250, 500, 1000, 2500, 5000]
      for (const milestone of milestones) {
        if (lifetimeShots === milestone) {
          const badges = { 250: '🥈', 500: '🥇', 1000: '💎', 2500: '👑', 5000: '🏆' }
          showToast(`${badges[milestone]} ${milestone.toLocaleString()} TOTAL SHOTS!`)
          break
        }
      }

      // Check for new personal best (shot types only, not stickhandling)
      const shotTypes = ['Wrist', 'Snap', 'Slap', 'Backhand', 'Saves']
      if (shotTypes.includes(type)) {
        if (newTotal > personalBest && personalBest > 0) {
          setPersonalBest(newTotal)
          setNewPB(true)
          setTimeout(() => setNewPB(false), 4000)
        }
      }

      // Claim any newly-earned achievements (idempotent server-side)
      const newCodes = await claimAchievements(player.id)
      if (newCodes.length > 0) setUnlockedCodes(newCodes)
    } catch (e) {
      console.error('Shot log error:', e)
      setStats((s) => ({
        ...s,
        todayTotal: Math.max(0, s.todayTotal - count),
        weekTotal: Math.max(0, s.weekTotal - count),
        todayByType: { ...s.todayByType, [type]: Math.max(0, (s.todayByType[type] || 0) - count) },
      }))
      setUndoStack((u) => u.slice(0, -1))
      showToast('Save failed: ' + (e.message || 'Unknown error'))
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
    const rivalWeek = rival.week_shots || 0
    const gapToday = stats.todayTotal - rivalToday
    const gapWeek = stats.weekTotal - rivalWeek
    const weekLabel = rivalWeek > 0 ? `${rivalWeek.toLocaleString()} this week` : 'no shots this week'
    if (rivalToday === 0) {
      chasingText = `${rival.display_name} — ${weekLabel}`
      chasingSub = 'Your rival this week'
      chasingTag = '—'
    } else if (gapToday > 0) {
      chasingText = `${rival.display_name} · ${rivalToday} today`
      chasingSub = gapWeek >= 0 ? `+${gapWeek} on them this week` : `${gapWeek} this week`
      chasingTag = `+${gapToday}`
      chasingTagClass = 'lead'
    } else if (gapToday < 0) {
      chasingText = `${rival.display_name} · ${rivalToday} today`
      chasingSub = `${Math.abs(gapToday)} shots to catch up today`
      chasingTag = `${gapToday}`
      chasingTagClass = 'chase'
    } else {
      chasingText = `${rival.display_name} · ${rivalToday} today`
      chasingSub = 'Tied today'
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
            <div className="me-sub">{rank.fullName}</div>
          </div>
        </div>
        {player.current_streak > 0 && (
          <div className="streak">
            <FlameIcon />
            <span className="tnum">{player.current_streak}</span>
          </div>
        )}
      </header>

      {/* COMPACT PROGRESS + DAILY CHALLENGE */}
      {player.lifetime_shot_goal && (() => {
        const dailyGoal = player.daily_goal || 50
        const dailyMet = stats.todayTotal >= dailyGoal

        // Milestone tiers
        const tiers = [
          { name: '🥉 Bronze', threshold: 0, nextThreshold: 250 },
          { name: '🥈 Silver', threshold: 250, nextThreshold: 500 },
          { name: '🥇 Gold', threshold: 500, nextThreshold: 1000 },
          { name: '💎 Platinum', threshold: 1000, nextThreshold: 2500 },
          { name: '👑 LEGEND', threshold: 2500, nextThreshold: 5000 },
        ]

        // Include today's logged shots in the calculation
        const currentLifetimeShots = player.lifetime_shots + stats.todayTotal
        const currentTier = tiers.find(t => currentLifetimeShots >= t.threshold && currentLifetimeShots < t.nextThreshold) || tiers[tiers.length - 1]
        const shotsToNext = currentTier.nextThreshold - currentLifetimeShots
        const progressToNext = Math.round(((currentLifetimeShots - currentTier.threshold) / (currentTier.nextThreshold - currentTier.threshold)) * 100)

        // Calculate daily pace for target date
        let dailyPaceText = ''
        if (player.lifetime_shot_goal_date) {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const targetDate = new Date(player.lifetime_shot_goal_date)
          targetDate.setHours(0, 0, 0, 0)
          const daysRemaining = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24))
          const shotsRemaining = Math.max(0, player.lifetime_shot_goal - currentLifetimeShots)

          if (daysRemaining > 0) {
            const dailyPaceNeeded = Math.ceil(shotsRemaining / daysRemaining)
            const shortDate = new Date(player.lifetime_shot_goal_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            if (shotsRemaining > 0) {
              dailyPaceText = `You need ${dailyPaceNeeded} shots/day to hit ${player.lifetime_shot_goal.toLocaleString()} by ${shortDate}`
            } else {
              dailyPaceText = `🎉 Goal reached!`
            }
          } else if (daysRemaining === 0) {
            dailyPaceText = `Goal target is today! Need ${shotsRemaining.toLocaleString()} more shots`
          } else {
            dailyPaceText = `Target date passed — keep grinding!`
          }
        }

        const messages = [
          '🚀 You\'re crushing it!',
          '💪 Keep pushing!',
          '🔥 Unstoppable!',
          '⚡ On fire!',
          '✨ You\'re amazing!',
        ]
        const message = messages[Math.floor(currentLifetimeShots / 100) % messages.length]

        return (
          <div style={{ padding: '16px 14px 8px', marginBottom: 8 }}>
            {/* Badge + progress to next */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{currentTier.name}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)' }}>{shotsToNext.toLocaleString()} to {currentTier.nextThreshold}</div>
              </div>
              <div style={{
                width: '100%',
                height: 8,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 4,
                overflow: 'hidden',
                marginBottom: 8,
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent) 0%, #2563eb 100%)',
                  width: `${Math.min(100, progressToNext)}%`,
                  transition: 'width 0.5s ease',
                }} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ice)', fontFamily: 'var(--font-display)' }}>
                {message}
              </div>
            </div>

            {/* Daily challenge - prominent */}
            <div style={{
              padding: 12,
              background: dailyMet ? 'rgba(61, 214, 140, 0.15)' : 'rgba(41, 121, 255, 0.15)',
              border: `1.5px solid ${dailyMet ? 'rgba(61, 214, 140, 0.4)' : 'rgba(41, 121, 255, 0.4)'}`,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: dailyPaceText ? 12 : 0,
            }}>
              <input type="checkbox" checked={dailyMet} disabled style={{ width: 18, height: 18, cursor: 'not-allowed', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: dailyMet ? '#3dd68c' : 'white', marginBottom: 2 }}>
                  Today's Challenge
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>
                  {dailyMet ? '✓ Goal met!' : `${dailyGoal} wrist shots`}
                </div>
              </div>
            </div>

            {/* Daily pace toward goal */}
            {dailyPaceText && (
              <div style={{
                padding: 12,
                background: 'rgba(156, 163, 175, 0.1)',
                border: '1.5px solid rgba(156, 163, 175, 0.3)',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--ice)',
                textAlign: 'center',
              }}>
                {dailyPaceText}
              </div>
            )}
          </div>
        )
      })()}

      {/* 10K CHALLENGE TRACKER - PROMINENT */}
      {(() => {
        const currentLifetimeShots = player.lifetime_shots + stats.todayTotal
        const tenKGoal = 10000
        const progress = Math.round((currentLifetimeShots / tenKGoal) * 100)
        const remaining = Math.max(0, tenKGoal - currentLifetimeShots)

        return (
          <div style={{ margin: '16px 14px', padding: '16px', background: 'linear-gradient(135deg, rgba(61, 214, 140, 0.15) 0%, rgba(41, 121, 255, 0.1) 100%)', border: '1.5px solid rgba(61, 214, 140, 0.3)', borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>🏒 10K CHALLENGE</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'white' }}>{currentLifetimeShots.toLocaleString()}<span style={{ fontSize: 14, color: 'var(--text-soft)' }}> / 10,000</span></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)' }}>{progress}%</div>
                <div style={{ fontSize: 11, color: 'var(--text-soft)', marginTop: 2 }}>{remaining.toLocaleString()} shots left</div>
              </div>
            </div>

            <div style={{
              width: '100%',
              height: 12,
              background: 'rgba(0,0,0,0.2)',
              borderRadius: 6,
              overflow: 'hidden',
              marginBottom: 12,
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #3dd68c 0%, #2dbd72 100%)',
                width: `${Math.min(100, progress)}%`,
                transition: 'width 0.5s ease',
              }} />
            </div>

            <div style={{ fontSize: 13, color: 'var(--ice)', fontWeight: 600 }}>
              {currentLifetimeShots >= tenKGoal
                ? '🎉 You hit 10,000! Keep going for 20K!'
                : `${Math.ceil(remaining / 7)} shots/week to finish by summer end`
              }
            </div>
          </div>
        )
      })()}

      {player.lifetime_shots === 0 && (
        <div className="first-time-nudge">
          <div className="ftn-title">Log your first shots 🏒</div>
          <div className="ftn-body">Tap any shot type below to get on the board. Every rep counts toward your rank.</div>
        </div>
      )}

      <div style={{ margin: '0 14px 12px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          TAP A SHOT TYPE TO LOG IT
        </div>
      </div>

      <div className="shots-grid">
        {shotTypes.map((t) => {
          const todayCount = stats.todayByType[t] || 0
          return (
            <button key={t} className="shot-card" onClick={() => setEntryType(t)}>
              <div className="shot-name">{SHOT_EMOJIS[t]} {t}</div>
              <div className="shot-value tnum">{todayCount}</div>
              <div className="shot-hint">today</div>
            </button>
          )
        })}
      </div>

      {/* STICKHANDLING MINUTES */}
      <div style={{ margin: '8px 14px' }}>
        <button
          onClick={() => setEntryType('Stickhandling')}
          style={{
            width: '100%',
            padding: '12px 14px',
            background: 'var(--surface)',
            border: '0.5px solid var(--border-dim)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ fontSize: 20 }}>🏑</div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>Stickhandling</div>
            <div style={{ fontSize: 11, color: 'var(--text-mute)', marginTop: 2 }}>{(stats.todayByType['Stickhandling'] || 0).toLocaleString()} mins today</div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>→</div>
        </button>
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

      {newPB && (
        <div className="pb-banner">
          <span>🏆 New personal best — {stats.todayTotal} shots today!</span>
          <button className="pb-share" onClick={async () => {
            const text = `New personal best — ${stats.todayTotal} shots today! 🏒 #HockeyShotChallenge hockeyshotchallenge.com`
            if (navigator.share) { try { await navigator.share({ text }) } catch (_) {} }
            else { await navigator.clipboard.writeText(text) }
          }}>Share</button>
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

function JoinTeamPanel({ playerId, onJoined }) {
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e?.preventDefault?.()
    const trimmed = code.trim()
    if (!trimmed || busy) return
    setBusy(true)
    setError('')
    try {
      const result = await attachPlayerToTeam({ playerId, inviteCode: trimmed })
      if (!result.attached) {
        setError("That code didn't work. Double-check with your coach.")
        setBusy(false)
        return
      }
      // Success — refresh player so home re-renders with team_id set.
      // Panel unmounts automatically when team_id flips.
      await onJoined?.()
    } catch (err) {
      console.warn('Join team failed:', err)
      setError('Something went wrong. Try again in a sec.')
      setBusy(false)
    }
  }

  return (
    <div className="join-panel">
      <div className="label-sm">Got a coach code?</div>
      <div className="join-text">
        Your coach can give you a 6-letter code to join your team.
      </div>
      <form className="join-form" onSubmit={submit}>
        <input
          className="join-input"
          type="text"
          inputMode="text"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          placeholder="e.g. huv72k"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError('') }}
          maxLength={12}
          disabled={busy}
        />
        <button
          type="submit"
          className="join-btn"
          disabled={busy || !code.trim()}
        >
          {busy ? '...' : 'Join'}
        </button>
      </form>
      {error && <div className="join-error">{error}</div>}
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
.first-time-nudge {
  background: linear-gradient(135deg, rgba(41,121,255,0.12) 0%, rgba(41,121,255,0.06) 100%);
  border: 0.5px solid rgba(41,121,255,0.35);
  border-radius: var(--radius);
  padding: 14px 16px;
  margin-bottom: 14px;
  text-align: center;
}
.ftn-title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 800;
  color: white;
  margin-bottom: 5px;
  letter-spacing: 0.3px;
}
.ftn-body {
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.45;
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

/* Stickhandling drills */
.stick-section { margin-bottom: 14px; }
.stick-header {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 8px;
}
.stick-hint { font-size: 10px; color: var(--text-mute); letter-spacing: 0.5px; }
.stick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.stick-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 14px;
  padding: 12px 8px;
  text-align: center;
  transition: transform 0.1s, border-color 0.15s;
  -webkit-user-select: none; user-select: none;
}
.stick-card:active {
  transform: scale(0.96);
  border-color: var(--ice);
}
.stick-name {
  font-family: var(--font-display);
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.4px;
  color: var(--text-soft);
  margin-bottom: 6px;
  text-transform: uppercase;
}
.stick-value {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  color: var(--ice); line-height: 1;
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

.pb-banner {
  background: linear-gradient(135deg, rgba(41,121,255,0.2), rgba(168,212,245,0.1));
  border: 0.5px solid var(--ice);
  border-radius: var(--radius);
  padding: 12px 16px;
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  color: var(--ice);
  letter-spacing: 0.3px;
  margin-bottom: 10px;
  animation: fade-in 0.3s ease-out;
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
}
.pb-share {
  font-size: 12px; font-weight: 700;
  color: var(--ice); border: 1px solid var(--ice);
  border-radius: 6px; padding: 4px 10px;
  background: transparent; cursor: pointer; white-space: nowrap; flex-shrink: 0;
}
.pb-share:active { opacity: 0.7; }

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


.team-ch-bar {
  margin: 0 20px 12px;
  background: var(--surface);
  border: 1px solid var(--border-dim);
  border-radius: 12px;
  padding: 12px 14px;
}
.team-ch-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}
.team-ch-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--text-mute);
}
.team-ch-fraction {
  font-size: 12px;
  font-weight: 700;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}
.team-ch-track {
  height: 8px;
  background: var(--border-dim);
  border-radius: 99px;
  overflow: hidden;
}
.team-ch-fill {
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #06b6d4);
  border-radius: 99px;
  transition: width 0.5s ease;
  min-width: 4px;
}
.team-ch-done {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--ice);
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

.join-panel {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 14px;
  border-left: 2px solid var(--ice);
  margin-bottom: 12px;
}
.join-text {
  font-size: 13px;
  color: var(--text-soft);
  margin-top: 4px;
  margin-bottom: 10px;
  line-height: 1.4;
}
.join-form {
  display: flex;
  gap: 8px;
}
.join-input {
  flex: 1;
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: 10px;
  padding: 12px 14px;
  color: var(--text);
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.5px;
  min-height: 44px;
  -webkit-appearance: none;
}
.join-input:focus {
  outline: none;
  border-color: var(--ice);
}
.join-input::placeholder {
  color: var(--text-mute);
  font-weight: 500;
  letter-spacing: 0.3px;
}
.join-btn {
  background: var(--accent);
  color: white;
  border-radius: 10px;
  padding: 0 18px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  min-height: 44px;
  transition: transform 0.1s;
}
.join-btn:active:not(:disabled) {
  transform: scale(0.97);
}
.join-btn:disabled {
  opacity: 0.4;
}
.join-error {
  font-size: 12px;
  color: var(--warn-soft);
  margin-top: 8px;
  line-height: 1.4;
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

/* Drill of the Day */
.drill-section { margin-bottom: 14px; }
.drill-card {
  display: flex; gap: 12px; align-items: center;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 14px;
  overflow: hidden;
  text-decoration: none;
  color: var(--text);
  transition: border-color 0.15s;
}
.drill-card:active { border-color: var(--accent); }
.drill-thumb-wrap {
  position: relative;
  flex-shrink: 0;
  width: 120px; height: 80px;
  background: var(--bg);
}
.drill-thumb {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
}
.drill-play {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,0.4);
  color: white; font-size: 20px;
}
.drill-info {
  flex: 1; min-width: 0;
  padding: 12px 12px 12px 0;
  display: flex; flex-direction: column; gap: 3px;
}
.drill-badge { font-size: 10px; color: var(--text-mute); }
.drill-title {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  color: white; letter-spacing: 0.2px;
  line-height: 1.25;
}
.drill-cta {
  font-size: 12px; font-weight: 600;
  color: var(--ice); margin-top: 2px;
}

.videos-section { margin-bottom: 14px; }
.videos-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}
.videos-scroll::-webkit-scrollbar { display: none; }
.video-card {
  flex-shrink: 0;
  width: 156px;
  text-decoration: none;
  color: var(--text);
  display: block;
}
.video-thumb-wrap {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 6px;
  aspect-ratio: 16 / 9;
  background: var(--surface);
}
.video-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.video-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  color: white;
  font-size: 22px;
}
.video-title {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  color: white;
  line-height: 1.25;
  letter-spacing: 0.2px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 3px;
}
.video-badge {
  font-size: 10px;
  color: var(--text-mute);
}
`
