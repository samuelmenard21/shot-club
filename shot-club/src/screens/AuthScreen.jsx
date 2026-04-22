import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp, signIn } from '../lib/auth'
import { useAuth } from '../hooks/useAuth'

const APP_URL = typeof window !== 'undefined' ? window.location.origin : ''

export default function AuthScreen() {
  const [mode, setMode] = useState('signup')
  const [step, setStep] = useState(1)
  const [path, setPath] = useState(null) // 'join' | 'solo'
  const [teamName, setTeamName] = useState('')
  const [clubName, setClubName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [position, setPosition] = useState(null)
  const [ageBracket, setAgeBracket] = useState(null)
  const [username, setUsername] = useState('')
  const [generatedUsername, setGeneratedUsername] = useState('')
  const [generatedTeamName, setGeneratedTeamName] = useState('')
  const [copiedWhat, setCopiedWhat] = useState('') // 'username' | 'team' | 'link' | ''
  const [shared, setShared] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { refresh } = useAuth()

  const choosePath = (p) => {
    setPath(p)
    setError('')
  }

  const continueFromStep1 = () => {
    if (path === 'join' && !teamName.trim()) {
      setError('Type a team name to join.')
      return
    }
    setError('')
    setStep(2)
  }

  const finishSignup = async () => {
    if (!displayName.trim() || !position || !ageBracket) {
      setError('Pick a name, position, and age.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const { username } = await signUp({
        displayName: displayName.trim(),
        position,
        ageBracket,
        teamName: path === 'join' ? teamName : null,
        clubName: clubName.trim() || null,
      })
      setGeneratedUsername(username)
      setGeneratedTeamName(path === 'join' ? teamName.trim().toUpperCase() : '')
      await refresh()
      setStep(3)
    } catch (e) {
      setError(e.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const doSignIn = async () => {
    setLoading(true)
    setError('')
    try {
      await signIn({ username })
      await refresh()
      navigate('/')
    } catch (e) {
      setError('Username not found. Check the spelling.')
    } finally {
      setLoading(false)
    }
  }

  const copyText = async (text, which) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedWhat(which)
      setTimeout(() => setCopiedWhat(''), 2000)
    } catch (e) {}
  }

  const shareTeam = async () => {
    const text = `Join my team on Hockey Shot Challenge! Team name: ${generatedTeamName}\n${APP_URL}`
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Join my team on Hockey Shot Challenge',
          text,
        })
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } else {
        await navigator.clipboard.writeText(text)
        setCopiedWhat('share')
        setTimeout(() => setCopiedWhat(''), 2000)
      }
    } catch (e) {}
  }

  // ---------- Sign in ----------
  if (mode === 'signin') {
    return (
      <div className="auth-wrap fade-in">
        <div className="auth-card">
          <div className="brand">
            <BrandLogo />
            <div className="brand-name">Hockey Shot<br/>Challenge</div>
          </div>
          <h2 className="auth-title">Welcome back.</h2>
          <p className="auth-sub">Enter your username to sign in.</p>

          <label className="input-label">
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.replace('@', ''))}
              placeholder="e.g. connor7511"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              className="input-field"
            />
          </label>

          {error && <div className="error">{error}</div>}

          <button className="btn-primary" onClick={doSignIn} disabled={!username || loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          <button className="btn-text" onClick={() => { setMode('signup'); setError('') }}>
            New here? Create a card
          </button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  // ---------- Signup ----------
  return (
    <div className="auth-wrap fade-in">
      <div className="auth-card">
        {step === 1 && (
          <>
            <div className="brand">
              <BrandLogo />
              <div className="brand-name">Hockey Shot<br/>Challenge</div>
            </div>
            <h2 className="auth-title">Track every shot.<br/>Climb the rankings.</h2>
            <p className="auth-sub">Let's get you set up in 30 seconds.</p>

            {/* Path 1: Join a team */}
            <div className={`path-card ${path === 'join' ? 'path-card--active' : ''}`} onClick={() => choosePath('join')}>
              <div className="path-head">
                <div className="path-icon">🏒</div>
                <div>
                  <div className="path-title">Join a team</div>
                  <div className="path-sub">Compete with your teammates</div>
                </div>
                <div className={`path-check ${path === 'join' ? 'path-check--active' : ''}`}>
                  {path === 'join' ? '✓' : ''}
                </div>
              </div>
              {path === 'join' && (
                <div className="path-body">
                  <label className="input-label">
                    <span>Team name</span>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value.toUpperCase())}
                      placeholder="e.g. NORTHSTARS"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      spellCheck="false"
                      className="input-field input-field--code"
                      autoFocus
                    />
                  </label>
                  <div className="path-hint">
                    Same name as your teammates = you're on the same team. Don't know it? Ask your coach or a teammate.
                  </div>

                  <label className="input-label" style={{ marginTop: 14 }}>
                    <span>Club name (optional)</span>
                    <input
                      type="text"
                      value={clubName}
                      onChange={(e) => setClubName(e.target.value)}
                      placeholder="e.g. Burlington Eagles"
                      className="input-field"
                    />
                  </label>
                  <div className="path-hint">
                    If your team is part of a bigger hockey club, add it here. Leave blank if you're not sure.
                  </div>
                </div>
              )}
            </div>

            <div className="or-divider">or</div>

            {/* Path 2: Start solo */}
            <div className={`path-card ${path === 'solo' ? 'path-card--active' : ''}`} onClick={() => choosePath('solo')}>
              <div className="path-head">
                <div className="path-icon">🎯</div>
                <div>
                  <div className="path-title">Start solo</div>
                  <div className="path-sub">Track on your own, add a team later</div>
                </div>
                <div className={`path-check ${path === 'solo' ? 'path-check--active' : ''}`}>
                  {path === 'solo' ? '✓' : ''}
                </div>
              </div>
            </div>

            {error && <div className="error" style={{ marginTop: 12 }}>{error}</div>}

            <button className="btn-primary" onClick={continueFromStep1} disabled={!path} style={{ marginTop: 16 }}>
              Continue →
            </button>

            <button className="btn-text" onClick={() => { setMode('signin'); setError('') }}>
              Already playing? Sign in
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="step-chip">Step 2 of 3</div>
            <h2 className="auth-title">Who are you?</h2>
            <p className="auth-sub">Just your first name is fine.</p>

            <label className="input-label">
              <span>Name</span>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your first name"
                className="input-field"
                autoFocus
              />
            </label>

            <div className="label-sm">Position</div>
            <div className="chip-row chip-row--3">
              {['F', 'D', 'G'].map((p) => (
                <button
                  key={p}
                  className={`chip chip--big ${position === p ? 'chip--active' : ''}`}
                  onClick={() => setPosition(p)}
                >
                  <div className="chip-letter">{p}</div>
                  <div className="chip-sub">{p === 'F' ? 'Forward' : p === 'D' ? 'Defense' : 'Goalie'}</div>
                </button>
              ))}
            </div>

            <div className="label-sm">Age</div>
            <div className="chip-row chip-row--4">
              {['6-10', '11-14', '15-18', '18+'].map((a) => (
                <button
                  key={a}
                  className={`chip ${ageBracket === a ? 'chip--active' : ''}`}
                  onClick={() => setAgeBracket(a)}
                >
                  {a}
                </button>
              ))}
            </div>

            {error && <div className="error">{error}</div>}

            <button
              className="btn-primary"
              onClick={finishSignup}
              disabled={!displayName || !position || !ageBracket || loading}
            >
              {loading ? 'Setting up…' : 'Make my card →'}
            </button>

            <button className="btn-text" onClick={() => setStep(1)}>
              ← Back
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <div className="celebration">
              <div className="celebration-ring">
                <div className="celebration-inner">🎉</div>
              </div>
              <div className="celebration-title">You're in, {displayName}!</div>
            </div>

            <div className="screenshot-hero">
              <div className="screenshot-icon">📸</div>
              <div className="screenshot-title">Screenshot this screen!</div>
              <div className="screenshot-sub">This is how you sign back in. If you lose it, you lose your shots.</div>
            </div>

            <div className="username-big">
              <div className="username-label">YOUR USERNAME</div>
              <div className="username-value-big">@{generatedUsername}</div>
              <button className={`copy-btn ${copiedWhat === 'username' ? 'copy-btn--done' : ''}`} onClick={() => copyText(generatedUsername, 'username')}>
                {copiedWhat === 'username' ? '✓ Copied' : 'Copy username'}
              </button>
            </div>

            <div className="save-tips">
              Text it to a parent so they have it too.
            </div>

            {generatedTeamName && (
              <div className="invite-card">
                <div className="invite-top">
                  <div className="invite-label">YOUR TEAM</div>
                  <div className="invite-team-name">{generatedTeamName}</div>
                </div>
                <div className="invite-hint">
                  Tell your teammates the team name so they can join you.
                </div>
                <button className="invite-btn" onClick={shareTeam}>
                  {shared || copiedWhat === 'share' ? '✓ Ready to send' : '↗ Invite teammates'}
                </button>
              </div>
            )}

            <button className="btn-primary" onClick={() => navigate('/')}>
              Got it — let's shoot 🏒
            </button>
          </>
        )}
      </div>
      <style>{styles}</style>
    </div>
  )
}

function BrandLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" style={{ display: 'block', flexShrink: 0 }}>
      <circle cx="20" cy="20" r="17" fill="#1a2847" stroke="#2979ff" strokeWidth="1" />
      <path d="M 12 22 L 17.5 27 L 28 15" stroke="#a8d4f5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const styles = `
.auth-wrap {
  min-height: 100dvh;
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.auth-card {
  width: 100%; max-width: 380px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius-lg);
  padding: 20px 18px;
}
.brand {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 20px;
}
.brand-name {
  font-family: var(--font-display);
  font-weight: 800; font-size: 17px;
  letter-spacing: 1px; text-transform: uppercase;
  line-height: 1.1;
}
.step-chip {
  display: inline-block;
  background: var(--bg);
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 10px; color: var(--text-mute);
  letter-spacing: 1px; text-transform: uppercase;
  font-weight: 500; margin-bottom: 12px;
}
.auth-title {
  font-family: var(--font-display);
  font-size: 22px; line-height: 1.1;
  margin-bottom: 4px; font-weight: 700;
  letter-spacing: 0.3px;
}
.auth-sub {
  font-size: 13px; color: var(--text-mute);
  margin: 0 0 18px;
}
.input-label { display: block; margin-bottom: 4px; }
.input-label > span {
  display: block;
  font-size: 10px; color: var(--text-mute);
  letter-spacing: 1.5px; text-transform: uppercase;
  margin-bottom: 6px; font-weight: 500;
}
.input-field {
  width: 100%;
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 12px 14px;
  color: var(--text);
  font-size: 16px;
  outline: none;
  transition: border-color 0.15s;
}
.input-field:focus { border-color: var(--accent); }
.input-field::placeholder {
  color: var(--text-mute);
  opacity: 0.5;
}
.input-field--code {
  letter-spacing: 2px;
  font-family: var(--font-display);
  font-weight: 700; color: var(--ice);
}
.input-field--code::placeholder {
  letter-spacing: 2px;
}

/* Path cards */
.path-card {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 14px;
  cursor: pointer;
  transition: all 0.15s;
  margin-bottom: 0;
}
.path-card--active {
  background: var(--surface-raised);
  border-color: var(--accent);
}
.path-head {
  display: flex; align-items: center; gap: 12px;
}
.path-icon {
  width: 36px; height: 36px;
  font-size: 20px;
  background: var(--accent-bg);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.path-title {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 800;
  letter-spacing: 0.4px;
  line-height: 1.1;
}
.path-sub {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 2px;
}
.path-check {
  margin-left: auto;
  width: 24px; height: 24px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  color: var(--text);
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}
.path-check--active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}
.path-body {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 0.5px solid var(--border-dim);
}
.path-hint {
  font-size: 11px;
  color: var(--text-mute);
  line-height: 1.4;
  margin-top: 6px;
}

.or-divider {
  text-align: center;
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin: 12px 0;
  font-weight: 500;
}

.chip-row { display: grid; gap: 6px; margin-bottom: 16px; }
.chip-row--3 { grid-template-columns: repeat(3, 1fr); }
.chip-row--4 { grid-template-columns: repeat(2, 1fr); }
.chip {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 10px 8px;
  color: var(--ice);
  font-size: 13px; text-align: center;
  transition: all 0.15s;
}
.chip--big { padding: 14px 6px; }
.chip--active {
  background: var(--accent);
  border-color: var(--accent-soft);
  color: white;
}
.chip-letter {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  letter-spacing: 1px; line-height: 1;
}
.chip-sub { font-size: 10px; margin-top: 3px; opacity: 0.75; }

.btn-primary {
  width: 100%;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 14px;
  font-size: 14px; font-weight: 600;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
  transition: transform 0.1s;
}
.btn-primary:active:not(:disabled) { transform: scale(0.98); }
.btn-text {
  width: 100%;
  color: var(--text-mute);
  font-size: 12px;
  padding: 10px;
  text-align: center;
}
.btn-text:hover { color: var(--ice); }
.error {
  background: rgba(255, 84, 84, 0.1);
  border: 0.5px solid rgba(255, 84, 84, 0.3);
  color: var(--danger);
  border-radius: var(--radius);
  padding: 10px 12px;
  font-size: 13px;
  margin-bottom: 12px;
}

/* Step 3 */
.celebration { text-align: center; margin: 4px 0 18px; }
.celebration-ring {
  width: 64px; height: 64px;
  border-radius: 50%;
  background: var(--accent-bg);
  border: 2px solid var(--accent);
  margin: 0 auto 10px;
  display: flex; align-items: center; justify-content: center;
}
.celebration-inner { font-size: 28px; }
.celebration-title {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 700;
  letter-spacing: 0.4px;
}

.screenshot-hero {
  background: linear-gradient(135deg, rgba(41, 121, 255, 0.15), rgba(168, 212, 245, 0.08));
  border: 1px solid rgba(41, 121, 255, 0.4);
  border-radius: var(--radius);
  padding: 16px;
  text-align: center;
  margin-bottom: 14px;
}
.screenshot-icon {
  font-size: 36px;
  line-height: 1;
  margin-bottom: 6px;
}
.screenshot-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.4px;
  color: white;
  margin-bottom: 4px;
}
.screenshot-sub {
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.4;
}

.username-big {
  background: var(--bg);
  border: 0.5px dashed var(--border);
  border-radius: var(--radius);
  padding: 16px 14px;
  text-align: center;
  margin-bottom: 10px;
}
.username-label {
  font-size: 10px; color: var(--text-mute);
  letter-spacing: 2px; font-weight: 500;
}
.username-value-big {
  font-family: var(--font-display);
  font-size: 28px; font-weight: 800;
  color: var(--ice);
  letter-spacing: 1px;
  margin: 6px 0 12px;
}
.copy-btn {
  width: 100%;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 10px;
  color: var(--ice);
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.3px;
  font-family: inherit;
  transition: all 0.15s;
}
.copy-btn--done {
  background: rgba(61, 214, 140, 0.15);
  border-color: rgba(61, 214, 140, 0.4);
  color: var(--success);
}

.save-tips {
  text-align: center;
  font-size: 11px;
  color: var(--text-mute);
  margin-bottom: 16px;
  letter-spacing: 0.3px;
  line-height: 1.4;
}

.invite-card {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
  border-radius: var(--radius);
  padding: 14px;
  margin-bottom: 14px;
}
.invite-top { text-align: center; margin-bottom: 8px; }
.invite-label {
  font-size: 10px; color: var(--text-mute);
  letter-spacing: 2px; font-weight: 500;
}
.invite-team-name {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  color: var(--ice);
  letter-spacing: 1px;
  margin-top: 2px;
}
.invite-hint {
  font-size: 12px;
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
  padding: 12px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.4px;
  transition: all 0.15s;
}
`
