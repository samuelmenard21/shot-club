import { useEffect, useMemo, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNotifications } from '../hooks/useNotifications'
import { logShots, getStats, getStickhandlingCount } from '../lib/shots'
import { getRank } from '../lib/ranks'
import { claimAchievements, isStreakInRecovery } from '../lib/progress'
import { attachPlayerToTeam } from '../lib/teams'
import { getSkillVideos } from '../lib/videos'
import {
  getTeamChallenge, getTeamWeeklyShots, getMyBattle, getPlayerChallenge, getPlayerChallengeProgress,
  applyPendingChallenge, setPlayerChallenge as savePlayerChallenge, // aliased — this file's own state setter is named setPlayerChallenge
} from '../lib/challenges'
import { CHALLENGE_LIST, weeklyPace } from '../lib/challengeSpecs'
import { checkMilestone, getMilestoneMessage, getGoalCompletionMessage } from '../lib/milestones'
import DailyGoalRing from '../components/DailyGoalRing'
import StreakRiskBanner from '../components/StreakRiskBanner'
import StreakRecoveryBanner from '../components/StreakRecoveryBanner'
import BattleCard from '../components/BattleCard'
import NumberPad from '../components/NumberPad'
import TrackerGrid from '../components/TrackerGrid'
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
  const nav = useNavigate()
  const { player, refresh } = useAuth()
  const { toast } = useNotifications()
  const [stats, setStats] = useState({ todayTotal: 0, weekTotal: 0, todayByType: {} })
  const [stickCount, setStickCount] = useState(0)
  const [entryType, setEntryType] = useState(null)
  const [undoStack, setUndoStack] = useState([])
  const [toastMsg, setToast] = useState('')
  const [unlockedCodes, setUnlockedCodes] = useState([])
  const [goalRefreshKey, setGoalRefreshKey] = useState(0)
  const [videos, setVideos] = useState([])
  const [teamChallenge, setTeamChallenge] = useState(null)
  const [teamWeekShots, setTeamWeekShots] = useState(0)
  const [playerChallenge, setPlayerChallenge] = useState(null)
  const [playerChallengeProgress, setPlayerChallengeProgress] = useState(null)
  // Distinct from playerChallenge===null: that's ALSO the pre-fetch state, and
  // without this the "pick a challenge" gate below would flash open on every
  // load (challenge or not) for the instant before the fetch resolves.
  const [challengeChecked, setChallengeChecked] = useState(false)
  const prevChallengeProgressRef = useRef(null)

  const shotTypes = player?.position === 'G' ? SHOT_TYPES_GOALIE : SHOT_TYPES_SHOOTER

  useEffect(() => {
    if (!player) return

    refreshStats()

    // Load the challenge first — this is the critical path.
    applyPendingChallenge(player.id)
      .then(() => getPlayerChallenge(player.id))
      .then((ch) => {
        setPlayerChallenge(ch)
        if (ch) return getPlayerChallengeProgress(player.id)
      })
      .then((progress) => setPlayerChallengeProgress(progress))
      .catch(() => {})
      .finally(() => setChallengeChecked(true))

    // Defer non-critical UI: videos and teams load after challenge is ready
    setTimeout(() => {
      getSkillVideos().then(setVideos).catch(() => {})
      if (player.team_id) {
        Promise.all([
          getTeamChallenge(player.team_id),
          getTeamWeeklyShots(player.team_id),
        ])
          .then(([ch, wk]) => {
            setTeamChallenge(ch)
            setTeamWeekShots(wk)
          })
          .catch(() => {})
      }
    }, 100)
  }, [player])

  const refreshStats = async () => {
    if (!player) return
    const s = await getStats(player.id)
    setStats(s)
    getStickhandlingCount(player.id).then(setStickCount).catch(() => {})
  }

  useEffect(() => {
    if (!player) return
    const t = setInterval(() => { refresh() }, 15000)
    return () => clearInterval(t)
  }, [player, refresh])

  // Detect challenge milestones
  useEffect(() => {
    if (!playerChallengeProgress) return

    const prev = prevChallengeProgressRef.current
    if (prev && prev.current_shots !== playerChallengeProgress.current_shots) {
      const milestone = checkMilestone(
        playerChallengeProgress.current_shots,
        prev.current_shots,
        playerChallengeProgress.goal_shots
      )

      if (milestone) {
        if (milestone === playerChallengeProgress.goal_shots) {
          toast(getGoalCompletionMessage(milestone), 'success', 4000)
        } else {
          toast(getMilestoneMessage(milestone), 'success', 3000)
        }
      }
    }

    prevChallengeProgressRef.current = playerChallengeProgress
  }, [playerChallengeProgress, toast])

  const rank = useMemo(() => getRank(player?.lifetime_shots || 0), [player?.lifetime_shots])

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

      // The most important moment: a brand-new player's very first log. Reward it
      // so they feel the payoff and come back. Fires last so it wins the toast.
      if (!player.lifetime_shots) {
        if (navigator.vibrate) navigator.vibrate([15, 40, 15])
        showToast("🎉 You're on the board! Keep it going.")
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
    toast(msg, 'info', 2000)
  }

  if (!player) return null

  // Onboarding is picking a challenge — nothing else. A player with no
  // challenge yet used to see the FULL dashboard (rank card, an unrelated
  // "Today's Challenge: 50 wrist shots" daily-goal widget, shot-logging
  // tiles) with the actual prompt buried as one card among several. Until
  // challengeChecked flips (the fetch above resolves), render nothing rather
  // than flash this gate open for players who already have a challenge.
  if (challengeChecked && !playerChallenge) {
    return (
      <ChallengePickerGate
        playerId={player.id}
        onPicked={(ch) => {
          setPlayerChallenge(ch)
          // TrackerGrid needs both playerChallenge AND playerChallengeProgress
          // to render — the effect that normally loads progress only re-runs
          // on [player], which hasn't changed, so fetch it directly here.
          getPlayerChallengeProgress(player.id).then(setPlayerChallengeProgress).catch(() => {})
        }}
      />
    )
  }
  if (!challengeChecked) return null

  const lastLog = undoStack[undoStack.length - 1]
  const hasRecentLog = !!lastLog

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

      {/* MOBILE: Merged challenge card */}
      {(() => {
        if (!playerChallenge || !playerChallengeProgress) {
          return (
            <div className="challenge-hero-mobile">
              <div>
                <div className="chm-label">Pick Your Challenge</div>
                <div className="chm-sub">Track shots. Climb rankings.</div>
              </div>
              <button
                onClick={() => nav('/challenges')}
                className="chm-btn"
              >
                Choose →
              </button>
            </div>
          )
        }

        const { current_shots, goal_shots, challenge_type, progress_pct, shots_remaining } = playerChallengeProgress
        const challengeLabels = { '1k': 'ROOKIE', '2_5k': 'PRO', '5k': 'ELITE', '10k': 'HALL OF FAMER', 'custom': 'CUSTOM' }

        const stickDots = stickCount > 0 && stickCount % 10 === 0 ? 10 : stickCount % 10

        return (
          <div className="challenge-hero-mobile">
            <div className="chm-content">
              <div className="chm-label">{challengeLabels[challenge_type]}</div>
              <div className="chm-progress">
                <span className="chm-shots">{current_shots.toLocaleString()}</span>
                <span className="chm-goal">/ {goal_shots.toLocaleString()}</span>
              </div>
              <div className="chm-bar">
                <div className="chm-bar-fill" style={{ width: `${Math.min(100, progress_pct)}%` }} />
              </div>
              {/* Stickhandling doesn't count toward the challenge above, so
                  it lives here as its own line rather than being folded
                  into these numbers — but this is the only spot on the page
                  visible without scrolling, so it's the one place a player
                  can see today's stickhandling status at a glance instead
                  of only finding it buried in the tracker below. */}
              {player.position !== 'G' && (
                <div className="chm-stick">
                  🏒 Stickhandling <strong>{stickDots}/10</strong>
                </div>
              )}
            </div>
            <button onClick={() => nav('/challenges')} className="chm-swap">
              ⊕
            </button>
          </div>
        )
      })()}


      {/* INTERACTIVE TRACKER GRID — the mobile hero card above already gives
          the at-a-glance summary, and TrackerGrid below has its own full
          progress display (bar, "X of Y shots", "X left to finish"), so a
          third card repeating the exact same numbers used to sit right
          here — removed rather than kept in sync in three places. */}
      {playerChallenge && playerChallengeProgress && (
        <div style={{ marginTop: 20 }}>
          <TrackerGrid
            player={player}
            playerChallenge={playerChallenge}
            playerChallengeProgress={playerChallengeProgress}
            onShotLogged={() => {
              refreshStats()
              setGoalRefreshKey(k => k + 1)
            }}
            onClubConnected={refresh}
          />
        </div>
      )}


      {/* Goalies only — TrackerGrid above covers Wrist/Snap/Slap/Backhand
          for shooters, so this tap-to-log grid would just duplicate it.
          Saves has no home in TrackerGrid, so goalies still need this. */}
      {player.position === 'G' && (
        <>
          {player.lifetime_shots === 0 && (
            <div className="first-time-nudge">
              <div className="ftn-title">Log your first saves 🧤</div>
              <div className="ftn-body">Tap below to get on the board. Every rep counts toward your rank.</div>
            </div>
          )}

          <div style={{ margin: '0 14px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              TAP TO LOG SAVES
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
        </>
      )}


      {hasRecentLog && (
        <button className="undo-btn" onClick={handleUndo}>
          <span className="undo-icon">↩</span>
          <span className="undo-text">
            <span className="undo-label">Undo last entry</span>
            <span className="undo-detail">+{lastLog.count} {lastLog.type}</span>
          </span>
        </button>
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

// The ONLY thing a player with no challenge sees — no rank card, no daily
// widgets, no shot tiles competing for attention. Picking a challenge is the
// single onboarding step; everything else waits for it.
// Pulls a human-readable string out of whatever actually got thrown. Plain
// `.message` went blank on a real production failure (a Supabase/PostgREST
// error, or a request an extension/network layer killed before it ever
// reached the server, can both surface as an object with no populated
// `message`) — this checks every field those error shapes actually use
// before falling back to a raw dump, so a blank error banner can't happen
// twice.
function describeError(e) {
  if (!e) return 'Unknown error (nothing was thrown).'
  const parts = [
    e.message, e.error_description, e.error, e.hint, e.details,
    e.code && `code ${e.code}`, e.status && `HTTP ${e.status}`, e.statusText, e.name,
  ].filter(Boolean)
  if (parts.length) return parts.join(' — ')
  try {
    const json = JSON.stringify(e)
    if (json && json !== '{}') return json
  } catch { /* circular or non-serializable — fall through */ }
  return String(e) || 'Unknown error with no readable detail.'
}

function ChallengePickerGate({ playerId, onPicked }) {
  const [savingId, setSavingId] = useState(null)
  const [error, setError] = useState('')

  const pick = async (spec) => {
    if (savingId) return
    setSavingId(spec.id)
    setError('')
    try {
      const ch = await savePlayerChallenge(playerId, spec.id, spec.total)
      onPicked(ch)
    } catch (e) {
      console.error('Failed to set challenge:', e)
      setError(describeError(e))
      setSavingId(null)
    }
  }

  return (
    <div className="cpg">
      <div className="cpg-kicker">START HERE</div>
      <h1 className="cpg-title">Pick Your Challenge</h1>
      <p className="cpg-sub">Everything else — logging shots, your rank, your streak — starts once you've picked a goal.</p>
      {error && <div className="cpg-error">{error}</div>}
      <div className="cpg-grid">
        {CHALLENGE_LIST.map((s) => {
          // s.badge is tuned for light cream cards elsewhere — '10k' badge is
          // near-black and unreadable on this dark card background.
          const accent = s.id === '10k' ? '#d4af6a' : s.badge
          const dailyPace = Math.round(weeklyPace(s) / 5)
          return (
            <button
              key={s.id}
              className="cpg-card"
              style={{ borderColor: accent, opacity: savingId && savingId !== s.id ? 0.5 : 1 }}
              disabled={!!savingId}
              onClick={() => pick(s)}
            >
              <div className="cpg-card-label" style={{ color: accent }}>{s.label}</div>
              <div className="cpg-card-shots">{s.total.toLocaleString()}</div>
              <div style={{ fontSize: 11, color: 'var(--text-mute)', marginTop: 2 }}>{dailyPace} shots/day</div>
              <div className="cpg-card-arrow" style={{ color: accent }}>
                {savingId === s.id ? '…' : '→'}
              </div>
            </button>
          )
        })}
      </div>
      <style>{gateStyles}</style>
    </div>
  )
}

const gateStyles = `
.cpg { min-height: 100dvh; padding: 28px 16px; max-width: 560px; margin: 0 auto; text-align: center;
  display: flex; flex-direction: column; justify-content: center; }
.cpg-kicker { font-size: 11px; font-weight: 800; letter-spacing: 2px; color: var(--accent); margin-bottom: 8px; }
.cpg-title { font-family: var(--font-display); font-size: clamp(22px, 6vw, 30px); font-weight: 800; color: white; margin-bottom: 6px; }
.cpg-sub { font-size: 13px; color: var(--text-soft); margin-bottom: 18px; line-height: 1.4; }
.cpg-error { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #fca5a5; border-radius: 8px; padding: 9px 12px; font-size: 12.5px; margin-bottom: 14px; }
/* Fixed 2-up (3-up once there's room) so all 5 cards read as one compact
   board instead of a long single-column scroll on a phone. */
.cpg-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
@media (min-width: 420px) { .cpg-grid { grid-template-columns: repeat(3, 1fr); } }
.cpg-card { border: 2px solid; border-radius: 12px; padding: 12px 10px; background: rgba(255,255,255,0.02);
  cursor: pointer; text-align: left; transition: transform 0.15s; display: flex; flex-direction: column; gap: 2px; }
.cpg-card:not(:disabled):hover { transform: translateY(-2px); }
.cpg-card:disabled { cursor: default; }
.cpg-card--custom { border-style: dashed; }
.cpg-card-label { font-weight: 800; font-size: 12.5px; }
.cpg-card-shots { font-family: var(--font-display); font-size: 19px; font-weight: 900; color: white; }
.cpg-card-arrow { font-weight: 800; font-size: 13px; margin-top: 2px; }
`

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

/* Mobile: Merged challenge hero */
.challenge-hero-mobile {
  background: linear-gradient(135deg, rgba(61, 214, 140, 0.15) 0%, rgba(41, 121, 255, 0.1) 100%);
  border: 1.5px solid rgba(61, 214, 140, 0.3);
  border-radius: 12px;
  padding: 14px 16px;
  margin: 12px 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  animation: fade-in 0.3s ease-out;
}

.chm-content {
  flex: 1;
  min-width: 0;
}

.chm-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.chm-sub {
  font-size: 13px;
  color: var(--text-soft);
}

.chm-progress {
  font-size: 16px;
  font-weight: 800;
  color: white;
  font-family: var(--font-display);
  margin: 6px 0;
  letter-spacing: -0.4px;
}

.chm-shots {
  color: var(--ice);
}

.chm-goal {
  color: var(--text-soft);
  font-size: 14px;
}

.chm-bar {
  height: 6px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
}

.chm-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #3dd68c 0%, #2dbd72 100%);
  border-radius: 3px;
  transition: width 0.5s ease;
  min-width: 2px;
}

.chm-stick {
  font-size: 11.5px;
  color: var(--text-soft);
  margin-top: 8px;
}
.chm-stick strong {
  color: var(--ice);
}

.chm-btn {
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
}

.chm-btn:active {
  transform: scale(0.98);
}

.chm-swap {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--ice);
  width: 34px;
  height: 34px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s;
}

.chm-swap:active {
  background: rgba(41, 121, 255, 0.1);
  transform: scale(0.95);
}
`
