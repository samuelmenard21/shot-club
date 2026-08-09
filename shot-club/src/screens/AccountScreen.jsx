import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNotifications } from '../hooks/useNotifications'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AccountScreen() {
  const { player, refresh } = useAuth()
  const { toast } = useNotifications()
  const nav = useNavigate()
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState('')
  const [saving, setSaving] = useState(false)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [usernameAvailable, setUsernameAvailable] = useState(null)
  const [usernameError, setUsernameError] = useState('')

  useEffect(() => {
    if (player) {
      setDisplayName(player.display_name || '')
      setUsername(player.username || '')
    }
  }, [player])

  const checkUsernameAvailability = async (uname) => {
    if (!uname || uname.length < 3) {
      setUsernameAvailable(null)
      setUsernameError('')
      return
    }

    setCheckingUsername(true)
    try {
      const { data, error } = await supabase
        .from('players')
        .select('id')
        .eq('username', uname.toLowerCase())
        .neq('id', player.id)
        .single()

      if (error && error.code === 'PGRST116') {
        // No results found = available
        setUsernameAvailable(true)
        setUsernameError('')
      } else if (data) {
        setUsernameAvailable(false)
        setUsernameError('Username already taken')
      } else {
        setUsernameAvailable(null)
      }
    } catch (e) {
      setUsernameAvailable(null)
      setUsernameError('')
    } finally {
      setCheckingUsername(false)
    }
  }

  const handleUsernameChange = (value) => {
    const cleaned = value.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 20)
    setUsername(cleaned)
    checkUsernameAvailability(cleaned)
  }

  const saveChanges = async () => {
    if (!displayName.trim()) {
      toast('Display name is required', 'warning')
      return
    }

    if (username && usernameAvailable === false) {
      toast('Username is already taken', 'error')
      return
    }

    setSaving(true)
    try {
      const { error } = await supabase
        .from('players')
        .update({
          display_name: displayName.trim(),
          username: username || null,
        })
        .eq('id', player.id)

      if (error) throw error

      await refresh()
      toast('✓ Account updated', 'success')
    } catch (e) {
      console.error('Failed to save account:', e)
      toast('Could not save changes. Try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (!player) return null

  const cardNumberDisplay = player.card_number ? `#${String(player.card_number).padStart(3, '0')}` : '—'

  return (
    <div className="account-screen fade-in">
      <header className="account-header">
        <button className="account-back" onClick={() => nav('/more')}>← Settings</button>
        <h1 className="account-title">Your Account</h1>
      </header>

      <div className="account-section">
        <div className="label-sm">Display Name</div>
        <input
          type="text"
          className="account-input"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your name"
          maxLength={30}
        />
        <div className="account-hint">This appears on your card and in team rankings.</div>
      </div>

      <div className="account-section">
        <div className="label-sm">Username</div>
        <div className="username-input-wrapper">
          <span className="username-prefix">@</span>
          <input
            type="text"
            className="account-input account-input--username"
            value={username}
            onChange={(e) => handleUsernameChange(e.target.value)}
            placeholder="optional-username"
            disabled={checkingUsername}
          />
          {checkingUsername && <span className="username-status">Checking…</span>}
          {!checkingUsername && usernameAvailable === true && <span className="username-status username-status--available">✓ Available</span>}
          {!checkingUsername && usernameAvailable === false && <span className="username-status username-status--taken">✗ Taken</span>}
        </div>
        <div className="account-hint">
          Optional. Alphanumeric, hyphens, underscores only. Leave blank if you prefer not to have one.
        </div>
      </div>

      <div className="account-section">
        <div className="label-sm">Account Info</div>
        <div className="account-info-row">
          <span className="account-info-label">Card Number</span>
          <span className="account-info-value">{cardNumberDisplay}</span>
        </div>
        <div className="account-info-row">
          <span className="account-info-label">Position</span>
          <span className="account-info-value">
            {player.position === 'F' ? 'Forward' : player.position === 'D' ? 'Defense' : player.position === 'G' ? 'Goalie' : '—'}
          </span>
        </div>
        <div className="account-info-row">
          <span className="account-info-label">Age Bracket</span>
          <span className="account-info-value">{player.age_bracket || '—'}</span>
        </div>
      </div>

      <button className="account-save-btn" onClick={saveChanges} disabled={saving || (username && usernameAvailable === false)}>
        {saving ? 'Saving…' : 'Save Changes'}
      </button>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.account-screen {
  padding: 14px;
  min-height: 100vh;
}

.account-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding: 4px 0;
}

.account-back {
  background: transparent;
  border: none;
  color: var(--ice);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 0;
  letter-spacing: 0.3px;
}

.account-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.account-section {
  margin-bottom: 24px;
}

.label-sm {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 8px;
}

.account-input {
  width: 100%;
  padding: 12px 14px;
  font-size: 14px;
  border: 0.5px solid var(--border-dim);
  border-radius: 10px;
  background: var(--surface);
  color: var(--text);
  font-family: inherit;
  margin-bottom: 8px;
}

.account-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(41, 121, 255, 0.1);
}

.account-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.username-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.username-prefix {
  position: absolute;
  left: 14px;
  color: var(--text-mute);
  font-weight: 600;
  font-size: 14px;
}

.account-input--username {
  padding-left: 28px;
  padding-right: 100px;
}

.username-status {
  position: absolute;
  right: 14px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-mute);
}

.username-status--available {
  color: var(--success);
}

.username-status--taken {
  color: var(--danger);
}

.account-hint {
  font-size: 12px;
  color: var(--text-mute);
  line-height: 1.4;
  margin-bottom: 4px;
}

.account-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: var(--surface);
  border-radius: 8px;
  margin-bottom: 8px;
}

.account-info-label {
  font-size: 12px;
  color: var(--text-mute);
  letter-spacing: 0.3px;
}

.account-info-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--ice);
}

.account-save-btn {
  width: 100%;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 14px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.15s;
  margin-top: 16px;
}

.account-save-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.account-save-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
`
