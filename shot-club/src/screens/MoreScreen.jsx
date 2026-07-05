import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { signOut, deleteAccount, getPlayersForAccount } from '../lib/auth'
import { setDailyGoal } from '../lib/progress'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const APP_URL = typeof window !== 'undefined' ? window.location.origin : ''
const GOAL_OPTIONS = [25, 50, 100, 200]

export default function MoreScreen() {
  const { player, refresh } = useAuth()
  const nav = useNavigate()
  const [shared, setShared] = useState(false)
  const [goal, setGoal] = useState(player?.daily_goal || 50)
  const [savingGoal, setSavingGoal] = useState(false)
  const [lifetimeShotGoal, setLifetimeShotGoal] = useState(player?.lifetime_shot_goal || 5000)
  const [stickhandlingHourGoal, setStickhandlingHourGoal] = useState(player?.stickhandling_hour_goal || 5)
  const [savingLifetimeGoal, setSavingLifetimeGoal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)
  const [accountPlayers, setAccountPlayers] = useState([])
  const [switching, setSwitching] = useState(null)

  useEffect(() => {
    getPlayersForAccount().then(setAccountPlayers).catch(() => {})
  }, [])

  if (!player) return null

  const switchPlayer = async (p) => {
    if (p.id === player.id || switching) return
    setSwitching(p.id)
    localStorage.setItem('activePlayerId', p.id)
    await refresh()
    setSwitching(null)
  }

  const shareTeam = async () => {
    const teamName = player.team?.name
    if (!teamName) return
    const text = `Join my team on Hockey Shot Challenge! Team name: ${teamName}\n${APP_URL}`
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Join my team on Hockey Shot Challenge',
          text,
        })
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } else {
        // Fallback to copy on web
        await navigator.clipboard.writeText(text)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch (e) {
      console.error('Share failed:', e)
      // Final fallback: copy just the team name
      try {
        await navigator.clipboard.writeText(teamName)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch (err) {
        console.error('Copy failed:', err)
      }
    }
  }

  const updateGoal = async (newGoal) => {
    setGoal(newGoal)
    setSavingGoal(true)
    try {
      await setDailyGoal(player.id, newGoal)
      await refresh()
    } catch (e) {
      // revert
      setGoal(player.daily_goal || 50)
    } finally {
      setSavingGoal(false)
    }
  }

  const updateLifetimeGoals = async () => {
    setSavingLifetimeGoal(true)
    try {
      const { error } = await supabase
        .from('players')
        .update({
          lifetime_shot_goal: Math.max(100, Math.min(50000, Math.round(lifetimeShotGoal))),
          stickhandling_hour_goal: Math.max(1, Math.min(500, Math.round(stickhandlingHourGoal * 10) / 10)),
        })
        .eq('id', player.id)
      if (error) throw error
      await refresh()
    } catch (e) {
      console.error('Failed to save goals:', e)
      setLifetimeShotGoal(player.lifetime_shot_goal || 5000)
      setStickhandlingHourGoal(player.stickhandling_hour_goal || 5)
    } finally {
      setSavingLifetimeGoal(false)
    }
  }

  const doSignOut = async () => {
    await signOut()
    await refresh()
    nav('/start')
  }

  const doDeleteAccount = async () => {
    setDeleting(true)
    try {
      await deleteAccount(player.id)
      nav('/start', { replace: true })
    } catch (e) {
      setDeleting(false)
      setShowDeleteConfirm(false)
      window.alert('Something went wrong. Try again.')
    }
  }

  const cardNumberDisplay = player.card_number ? `#${String(player.card_number).padStart(3, '0')}` : '—'

  return (
    <div className="more-screen fade-in">
      <header className="more-header">
        <h1 className="more-title">Settings</h1>
      </header>

      {/* Invite teammates */}
      {player.team?.name && (
        <div className="invite-card">
          <div className="invite-top">
            <div className="label-sm">Your team</div>
            <div className="invite-team-name">{player.team.name}</div>
            {player.club_name && (
              <div className="invite-club-name">{player.club_name}</div>
            )}
          </div>
          <div className="invite-hint">
            Share your team name with friends so they can join and compete with you.
          </div>
          <button className="invite-btn" onClick={shareTeam}>
            {shared ? '✓ Shared' : '↗ Invite teammates'}
          </button>
        </div>
      )}

      {!player.team?.name && (
        <div className="solo-card">
          <div className="label-sm">Solo mode</div>
          <div className="solo-card-title">You're flying solo</div>
          <div className="solo-card-hint">
            Start or join a team to compete on the rankings with teammates. Sign out and sign back in to change this.
          </div>
        </div>
      )}

      {/* Drills shortcut - NEW */}
      <button className="drills-link" onClick={() => nav('/drills')}>
        <div className="drills-link-icon">🎯</div>
        <div className="drills-link-text">
          <div className="drills-link-title">Drills library</div>
          <div className="drills-link-sub">Pro tutorials by shot type</div>
        </div>
        <div className="drills-link-arrow">→</div>
      </button>

      {/* Daily goal setting - NEW */}
      <div className="section">
        <div className="label-sm" style={{ marginBottom: 8 }}>Daily goal</div>
        <div className="info-card">
          <div className="goal-current-row">
            <div>
              <div className="info-label">Today's target</div>
              <div className="info-value tnum">{goal} shots</div>
            </div>
            {savingGoal && <div style={{ color: 'var(--text-mute)', fontSize: 11 }}>saving…</div>}
          </div>
          <div className="goal-options">
            {GOAL_OPTIONS.map((opt) => (
              <button
                key={opt}
                className={`goal-chip ${goal === opt ? 'goal-chip--active' : ''}`}
                onClick={() => updateGoal(opt)}
                disabled={savingGoal}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="info-hint">
            How many shots you're aiming for each day. The ring on Home fills as you log.
          </div>
        </div>
      </div>

      {/* My Goals */}
      <div className="section">
        <div className="label-sm" style={{ marginBottom: 8 }}>My goals</div>
        <div className="info-card">
          <div style={{ marginBottom: 16 }}>
            <div className="info-label">Lifetime shots</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
              <input
                type="number"
                value={lifetimeShotGoal}
                onChange={(e) => setLifetimeShotGoal(Math.max(100, parseInt(e.target.value) || 100))}
                disabled={savingLifetimeGoal}
                style={{
                  flex: 1,
                  background: 'var(--bg)',
                  border: '0.5px solid var(--border-dim)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                }}
              />
              <div className="info-value tnum" style={{ fontSize: 12, color: 'var(--text-mute)' }}>goal</div>
            </div>
          </div>
          <div>
            <div className="info-label">Stickhandling hours</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
              <input
                type="number"
                step="0.5"
                value={stickhandlingHourGoal}
                onChange={(e) => setStickhandlingHourGoal(Math.max(1, parseFloat(e.target.value) || 1))}
                disabled={savingLifetimeGoal}
                style={{
                  flex: 1,
                  background: 'var(--bg)',
                  border: '0.5px solid var(--border-dim)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                }}
              />
              <div className="info-value tnum" style={{ fontSize: 12, color: 'var(--text-mute)' }}>hrs</div>
            </div>
          </div>
          <button
            onClick={updateLifetimeGoals}
            disabled={savingLifetimeGoal}
            style={{
              width: '100%',
              marginTop: 14,
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: 10,
              fontSize: 13,
              fontWeight: 600,
              cursor: savingLifetimeGoal ? 'not-allowed' : 'pointer',
              opacity: savingLifetimeGoal ? 0.6 : 1,
            }}
          >
            {savingLifetimeGoal ? 'Saving…' : 'Save goals'}
          </button>
          <div className="info-hint">
            Set your personal goals. Progress shows on the home screen.
          </div>
        </div>
      </div>

      {/* Player info */}
      <div className="section">
        <div className="label-sm" style={{ marginBottom: 8 }}>You</div>
        <div className="info-card">
          <div className="kv-row">
            <div className="kv-label">Name</div>
            <div className="kv-value">{player.display_name}</div>
          </div>
          <div className="kv-row">
            <div className="kv-label">Card number</div>
            <div className="kv-value tnum">{cardNumberDisplay}</div>
          </div>
          <div className="kv-row">
            <div className="kv-label">Position</div>
            <div className="kv-value">{player.position === 'F' ? 'Forward' : player.position === 'D' ? 'Defense' : 'Goalie'}</div>
          </div>
          <div className="kv-row">
            <div className="kv-label">Age</div>
            <div className="kv-value">{player.age_bracket}</div>
          </div>
          {player.team?.name && (
            <div className="kv-row">
              <div className="kv-label">Team</div>
              <div className="kv-value">{player.team.name}</div>
            </div>
          )}
          {player.club_name && (
            <div className="kv-row">
              <div className="kv-label">Club</div>
              <div className="kv-value">{player.club_name}</div>
            </div>
          )}
        </div>
      </div>

      {/* About */}
      <div className="section">
        <div className="label-sm" style={{ marginBottom: 8 }}>About</div>
        <div className="info-card">
          <div className="kv-row">
            <div className="kv-label">App</div>
            <div className="kv-value">Hockey Shot Challenge</div>
          </div>
          <div className="kv-row">
            <div className="kv-label">Version</div>
            <div className="kv-value">1.5</div>
          </div>
        </div>
      </div>

      {accountPlayers.length > 0 && (
        <div className="section">
          <div className="label-sm" style={{ marginBottom: 8 }}>Players on this account</div>
          <div className="players-list">
            {accountPlayers.map((p) => (
              <button
                key={p.id}
                className={`player-row ${p.id === player.id ? 'player-row--active' : ''}`}
                onClick={() => switchPlayer(p)}
                disabled={switching !== null}
              >
                <div className="player-row-avatar">{p.display_name[0]?.toUpperCase()}</div>
                <div className="player-row-info">
                  <div className="player-row-name">{p.display_name}</div>
                  <div className="player-row-sub">
                    {p.position === 'F' ? 'Forward' : p.position === 'D' ? 'Defense' : p.position === 'G' ? 'Goalie' : '—'}
                    {p.team?.name ? ` · ${p.team.name}` : ''}
                  </div>
                </div>
                {p.id === player.id
                  ? <div className="player-row-badge">Active</div>
                  : switching === p.id
                    ? <div className="player-row-switching">Switching…</div>
                    : <div className="player-row-switch">Switch →</div>
                }
              </button>
            ))}
          </div>
          <button className="add-player-btn" onClick={() => nav('/add-player')}>+ Add another player</button>
        </div>
      )}

      <button className="signout-btn" onClick={() => setShowSignOutConfirm(true)}>Sign out</button>

      <button className="privacy-link-btn" onClick={() => nav('/privacy')}>Privacy policy</button>
      <button className="delete-btn" onClick={() => setShowDeleteConfirm(true)}>Delete account</button>

      {showSignOutConfirm && (
        <div className="delete-overlay" onClick={() => setShowSignOutConfirm(false)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-icon">👋</div>
            <h2 className="delete-modal-title">Sign out?</h2>
            <p className="delete-modal-body">
              {player.username
                ? <>Your username is <strong style={{ color: 'white' }}>@{player.username}</strong> — save it so you can sign back in.</>
                : 'You can sign back in with Google any time.'}
            </p>
            <button className="signout-confirm-btn" onClick={doSignOut}>
              Sign out
            </button>
            <button className="delete-cancel-btn" onClick={() => setShowSignOutConfirm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="delete-overlay">
          <div className="delete-modal">
            <div className="delete-modal-icon">⚠️</div>
            <h2 className="delete-modal-title">Delete your account?</h2>
            <p className="delete-modal-body">
              This permanently deletes your shots, streak, rank, and card. There's no undo.
            </p>
            <button className="delete-confirm-btn" onClick={doDeleteAccount} disabled={deleting}>
              {deleting ? 'Deleting…' : 'Yes, delete everything'}
            </button>
            <button className="delete-cancel-btn" onClick={() => setShowDeleteConfirm(false)} disabled={deleting}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.more-screen { padding: 14px 14px 30px; }
.more-header { padding: 4px 4px 14px; }
.more-title {
  font-family: var(--font-display);
  font-size: 24px; font-weight: 700;
  letter-spacing: 0.5px;
}

.invite-card {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
  border-radius: var(--radius);
  padding: 16px 14px;
  margin-bottom: 16px;
}
.invite-top { text-align: center; margin-bottom: 10px; }
.invite-team-name {
  font-family: var(--font-display);
  font-size: 26px; font-weight: 800;
  color: var(--ice);
  letter-spacing: 1px;
  margin-top: 4px;
  line-height: 1;
}
.invite-club-name {
  font-size: 11px; color: var(--text-mute);
  margin-top: 6px; letter-spacing: 0.5px;
}
.invite-hint {
  font-size: 13px;
  color: var(--text-soft);
  text-align: center;
  margin-bottom: 12px;
  line-height: 1.4;
}
.invite-btn {
  width: 100%;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 13px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.4px;
  transition: all 0.15s;
}
.invite-btn:active { transform: scale(0.98); }

.solo-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 14px;
  margin-bottom: 16px;
}
.solo-card-title {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 700;
  margin-top: 4px; letter-spacing: 0.3px;
}
.solo-card-hint {
  font-size: 12px; color: var(--text-mute);
  margin-top: 4px; line-height: 1.4;
}

/* Drills shortcut */
.drills-link {
  width: 100%;
  display: flex; align-items: center; gap: 14px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 14px;
  margin-bottom: 16px;
  text-align: left;
  font-family: inherit;
  color: inherit;
  transition: transform 0.1s;
}
.drills-link:active {
  transform: scale(0.99);
  background: var(--surface-raised);
}
.drills-link-icon {
  font-size: 28px;
  flex-shrink: 0;
}
.drills-link-text { flex: 1; }
.drills-link-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: var(--ice);
}
.drills-link-sub {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 2px;
}
.drills-link-arrow {
  font-size: 18px;
  color: var(--text-mute);
}

.section { margin-bottom: 16px; }

.info-card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 12px 14px;
}

.info-row {
  display: flex; justify-content: space-between; align-items: center;
  gap: 10px;
}
.info-label {
  font-size: 10px; color: var(--text-mute);
  letter-spacing: 1.5px; text-transform: uppercase;
  font-weight: 500;
}
.info-value {
  font-family: var(--font-display);
  font-size: 18px; font-weight: 700;
  color: var(--ice);
  margin-top: 2px;
  letter-spacing: 0.5px;
}
.info-hint {
  font-size: 11px; color: var(--text-mute);
  margin-top: 10px; line-height: 1.4;
}
.copy-chip {
  background: var(--bg);
  color: var(--ice);
  font-size: 11px; font-weight: 600;
  padding: 6px 14px;
  border-radius: 999px;
  border: 0.5px solid var(--border-dim);
  flex-shrink: 0;
}
.copy-chip--done {
  background: rgba(61, 214, 140, 0.15);
  border-color: rgba(61, 214, 140, 0.4);
  color: var(--success);
}

/* Daily goal selection */
.goal-current-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 12px;
}
.goal-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  margin-bottom: 4px;
}
.goal-chip {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  color: var(--text);
  padding: 10px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
  transition: all 0.1s;
}
.goal-chip:active { transform: scale(0.96); }
.goal-chip--active {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}
.goal-chip:disabled { opacity: 0.5; }

.kv-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 0;
  border-bottom: 0.5px solid var(--border-dim);
}
.kv-row:last-child { border-bottom: none; }
.kv-label { font-size: 13px; color: var(--text-mute); }
.kv-value {
  font-size: 13px; color: var(--text);
  font-weight: 500;
  text-align: right;
}

.players-list {
  display: flex; flex-direction: column; gap: 6px;
  margin-bottom: 10px;
}
.player-row {
  width: 100%;
  display: flex; align-items: center; gap: 12px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 12px;
  padding: 12px 14px;
  text-align: left;
  transition: all 0.1s;
}
.player-row--active {
  border-color: var(--accent);
  background: rgba(41, 121, 255, 0.07);
}
.player-row:active:not(:disabled) { transform: scale(0.99); }
.player-row:disabled { opacity: 0.6; }
.player-row-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.player-row-info { flex: 1; min-width: 0; }
.player-row-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  color: white; letter-spacing: 0.2px;
}
.player-row-sub {
  font-size: 11px; color: var(--text-mute);
  margin-top: 2px;
}
.player-row-badge {
  font-size: 10px; font-weight: 700;
  color: var(--ice);
  background: rgba(41, 121, 255, 0.15);
  padding: 3px 8px; border-radius: 999px;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}
.player-row-switch {
  font-size: 12px; color: var(--text-mute);
  flex-shrink: 0;
}
.player-row-switching {
  font-size: 11px; color: var(--text-mute);
  flex-shrink: 0;
}

.add-player-btn {
  width: 100%;
  background: var(--surface);
  border: 0.5px solid var(--accent);
  color: var(--ice);
  padding: 13px;
  border-radius: var(--radius);
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.3px;
  margin-top: 8px;
  transition: all 0.15s;
}
.add-player-btn:active { background: rgba(41, 121, 255, 0.1); }

.signout-btn {
  width: 100%;
  background: transparent;
  border: 0.5px solid rgba(255, 84, 84, 0.3);
  color: var(--danger);
  padding: 12px;
  border-radius: var(--radius);
  font-size: 13px; font-weight: 500;
  margin-top: 8px;
}
.signout-btn:active { background: rgba(255, 84, 84, 0.08); }

.privacy-link-btn {
  width: 100%;
  background: transparent;
  color: var(--text-mute);
  padding: 10px;
  font-size: 12px;
  margin-top: 4px;
}
.privacy-link-btn:hover { color: var(--text-soft); }

.delete-btn {
  width: 100%;
  background: transparent;
  color: var(--text-mute);
  padding: 12px;
  font-size: 12px;
  margin-top: 4px;
}
.delete-btn:active { color: var(--danger); }

.delete-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex; align-items: flex-end; justify-content: center;
  z-index: 100;
  padding: 16px;
}
.delete-modal {
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 20px;
  padding: 24px 20px 20px;
  width: 100%; max-width: 380px;
  text-align: center;
}
.delete-modal-icon { font-size: 32px; margin-bottom: 12px; }
.delete-modal-title {
  font-family: var(--font-display);
  font-size: 20px; font-weight: 800;
  color: white; margin-bottom: 10px;
}
.delete-modal-body {
  font-size: 14px; color: var(--text-soft);
  line-height: 1.5; margin-bottom: 20px;
}
.signout-confirm-btn {
  width: 100%;
  background: var(--surface-raised, #1a2035);
  border: 0.5px solid rgba(255,84,84,0.3);
  color: var(--danger);
  border-radius: var(--radius);
  padding: 14px;
  font-size: 14px; font-weight: 600;
  margin-bottom: 10px;
}
.signout-confirm-btn:active { background: rgba(255,84,84,0.08); }

.delete-confirm-btn {
  width: 100%;
  background: var(--danger);
  color: white;
  border-radius: var(--radius);
  padding: 14px;
  font-size: 14px; font-weight: 600;
  margin-bottom: 10px;
}
.delete-confirm-btn:disabled { opacity: 0.6; }
.delete-cancel-btn {
  width: 100%;
  color: var(--text-mute);
  font-size: 13px;
  padding: 10px;
}
.delete-cancel-btn:disabled { opacity: 0.5; }
`
