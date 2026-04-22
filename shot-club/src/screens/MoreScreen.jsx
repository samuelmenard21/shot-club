import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { signOut } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

const APP_URL = typeof window !== 'undefined' ? window.location.origin : ''

export default function MoreScreen() {
  const { player, refresh } = useAuth()
  const nav = useNavigate()
  const [copiedWhat, setCopiedWhat] = useState('')
  const [shared, setShared] = useState(false)

  if (!player) return null

  const copyText = async (text, which) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedWhat(which)
      setTimeout(() => setCopiedWhat(''), 2000)
    } catch (e) {}
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
        await copyText(text, 'share')
      }
    } catch (e) {}
  }

  const doSignOut = async () => {
    if (!window.confirm('Sign out? Make sure you saved your username first.')) return
    await signOut()
    await refresh()
    nav('/auth')
  }

  const cardNumberDisplay = player.card_number ? `#${String(player.card_number).padStart(3, '0')}` : '—'

  return (
    <div className="more-screen fade-in">
      <header className="more-header">
        <h1 className="more-title">Settings</h1>
      </header>

      {/* Invite teammates - prominent card, only shown if on a team */}
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
            {shared || copiedWhat === 'share' ? '✓ Shared' : '↗ Invite teammates'}
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

      {/* Username recovery */}
      <div className="section">
        <div className="label-sm" style={{ marginBottom: 8 }}>Your sign-in</div>
        <div className="info-card">
          <div className="info-row">
            <div>
              <div className="info-label">Username</div>
              <div className="info-value tnum">@{player.username}</div>
            </div>
            <button className={`copy-chip ${copiedWhat === 'username' ? 'copy-chip--done' : ''}`} onClick={() => copyText(player.username, 'username')}>
              {copiedWhat === 'username' ? '✓' : 'Copy'}
            </button>
          </div>
          <div className="info-hint">
            Screenshot this or save it somewhere safe. It's how you sign in on other devices.
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
            <div className="kv-value">1.0</div>
          </div>
        </div>
      </div>

      {/* Sign out */}
      <button className="signout-btn" onClick={doSignOut}>Sign out</button>

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

/* Invite teammates card */
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

/* Solo card */
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

.kv-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 0;
  border-bottom: 0.5px solid var(--border-dim);
}
.kv-row:last-child { border-bottom: none; }
.kv-label {
  font-size: 13px; color: var(--text-mute);
}
.kv-value {
  font-size: 13px; color: var(--text);
  font-weight: 500;
  text-align: right;
}

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
.signout-btn:active {
  background: rgba(255, 84, 84, 0.08);
}
`
