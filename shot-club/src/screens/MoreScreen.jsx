import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { signOut } from '../lib/auth'

export default function MoreScreen() {
  const { player, setPlayer } = useAuth()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const [showSignoutConfirm, setShowSignoutConfirm] = useState(false)

  if (!player) return null

  const copyUsername = async () => {
    try {
      await navigator.clipboard.writeText(player.username)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {}
  }

  const doSignOut = async () => {
    await signOut()
    setPlayer(null)
    navigate('/auth')
  }

  return (
    <div className="more fade-in">
      <header className="more-header">
        <h1 className="more-title">Settings</h1>
      </header>

      <div className="section-label">Your account</div>

      <div className="card">
        <div className="card-row">
          <div className="card-label">Name</div>
          <div className="card-value">{player.display_name}</div>
        </div>
        <div className="card-row">
          <div className="card-label">Position</div>
          <div className="card-value">
            {player.position === 'F' ? 'Forward' : player.position === 'D' ? 'Defense' : 'Goalie'}
          </div>
        </div>
        <div className="card-row">
          <div className="card-label">Age</div>
          <div className="card-value">{player.age_bracket}</div>
        </div>
        {player.team && (
          <div className="card-row">
            <div className="card-label">Team</div>
            <div className="card-value">{player.team.name}</div>
          </div>
        )}
      </div>

      <div className="section-label" style={{ marginTop: 20 }}>Sign-in info</div>

      <div className="username-card">
        <div className="username-label">Your username</div>
        <div className="username-display">@{player.username}</div>
        <button className={`copy-btn ${copied ? 'copy-btn--done' : ''}`} onClick={copyUsername}>
          {copied ? '✓ Copied' : 'Copy username'}
        </button>
        <div className="username-help">
          Use this to sign back in if you switch phones or browsers.
        </div>
      </div>

      <div className="section-label" style={{ marginTop: 20 }}>Account</div>

      <div className="card">
        {!showSignoutConfirm ? (
          <button className="card-row card-action" onClick={() => setShowSignoutConfirm(true)}>
            <div className="card-label" style={{ color: 'var(--warn-soft)' }}>Sign out</div>
            <div style={{ color: 'var(--text-mute)', fontSize: 18 }}>›</div>
          </button>
        ) : (
          <div style={{ padding: '14px' }}>
            <div style={{ fontSize: 13, marginBottom: 8 }}>
              Make sure you saved your username — you'll need it to sign back in.
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="btn-cancel" onClick={() => setShowSignoutConfirm(false)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={doSignOut}>
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="version">Shot Club · Phase 1</div>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.more { padding: 14px 14px 30px; }
.more-header { padding: 6px 4px 14px; }
.more-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.section-label {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 4px 8px;
}
.card {
  background: var(--surface);
  border-radius: var(--radius);
  overflow: hidden;
}
.card-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-bottom: 0.5px solid var(--border-dim);
  width: 100%;
  background: transparent;
  text-align: left;
}
.card-row:last-child { border-bottom: none; }
.card-action { cursor: pointer; }
.card-label {
  font-size: 13px;
  color: var(--text-mute);
}
.card-value {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.username-card {
  background: var(--surface);
  border: 0.5px dashed var(--border);
  border-radius: var(--radius);
  padding: 16px 14px;
  text-align: center;
}
.username-label {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 500;
}
.username-display {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 800;
  color: var(--ice);
  letter-spacing: 1px;
  margin: 8px 0 12px;
}
.copy-btn {
  width: 100%;
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 10px;
  color: var(--ice);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.3px;
  font-family: inherit;
}
.copy-btn--done {
  background: rgba(61, 214, 140, 0.15);
  border-color: rgba(61, 214, 140, 0.4);
  color: var(--success);
}
.username-help {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 10px;
  line-height: 1.4;
}

.btn-cancel {
  flex: 1;
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 10px;
  color: var(--text-mute);
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
}
.btn-danger {
  flex: 1;
  background: var(--danger);
  border-radius: var(--radius);
  padding: 10px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
}

.version {
  text-align: center;
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1px;
  margin-top: 24px;
}
`
