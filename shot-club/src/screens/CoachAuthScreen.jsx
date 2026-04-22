import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUpCoach, signInCoach } from '../lib/auth'
import { createClub, createCoachProfile, getMyCoachProfile } from '../lib/clubs'
import { setSEO, CANONICAL_URL } from '../lib/seo'

export default function CoachAuthScreen() {
  const nav = useNavigate()
  const [mode, setMode] = useState('intro') // 'intro' | 'signup' | 'signin'
  const [step, setStep] = useState(1) // for signup: 1 = account, 2 = club

  // Account fields
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Club fields
  const [clubName, setClubName] = useState('')
  const [clubCity, setClubCity] = useState('')

  // Sign in
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setSEO({
      title: 'For coaches & clubs',
      description: 'Get your whole hockey club logging shots every day. Free branded club page, QR code invites, one-click team sign-up for kids.',
      url: `${CANONICAL_URL}/coach`,
    })
  }, [])

  const handleAccountNext = () => {
    setError('')
    if (!displayName.trim()) return setError('Enter your name.')
    if (!email.trim() || !email.includes('@')) return setError('Enter a valid email.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    setStep(2)
  }

  const handleSignUp = async () => {
    setError('')
    if (!clubName.trim()) return setError('Enter your club name.')
    setLoading(true)
    try {
      // 1. Create auth user
      await signUpCoach({ displayName, email, password })
      // 2. Create the club
      const club = await createClub({ name: clubName.trim(), city: clubCity.trim() || null })
      // 3. Create coach profile as director
      await createCoachProfile({
        displayName: displayName.trim(),
        email: email.trim(),
        clubId: club.id,
        isDirector: true,
      })
      // Success → dashboard
      nav('/coach/dashboard')
    } catch (e) {
      if (e.message?.toLowerCase().includes('already registered') || e.message?.toLowerCase().includes('user already')) {
        setError('That email is already in use. Try signing in.')
      } else {
        setError(e.message || 'Something went wrong.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async () => {
    setError('')
    if (!signInEmail.trim() || !signInPassword) {
      setError('Enter your email and password.')
      return
    }
    setLoading(true)
    try {
      await signInCoach({ email: signInEmail, password: signInPassword })
      // Check if coach profile exists
      const profile = await getMyCoachProfile()
      if (!profile) {
        setError("We couldn't find a coach profile for that account.")
        return
      }
      nav('/coach/dashboard')
    } catch (e) {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  // INTRO SCREEN
  if (mode === 'intro') {
    return (
      <div className="coach-wrap">
        <nav className="c-nav">
          <div className="c-brand" onClick={() => nav('/')}>
            <BrandMark />
            <span>Hockey Shot Challenge</span>
          </div>
          <button className="c-nav-link" onClick={() => setMode('signin')}>Sign in</button>
        </nav>

        <div className="c-hero">
          <div className="c-eyebrow">FOR COACHES & HOCKEY CLUBS</div>
          <h1 className="c-title">Your whole club, logging shots every day.</h1>
          <p className="c-sub">
            Set up your club in 5 minutes. Get a branded join page and a QR code. Every kid who scans is on your club's leaderboard instantly. Free to start.
          </p>

          <div className="c-how">
            <div className="c-how-item">
              <div className="c-how-num">1</div>
              <div>
                <div className="c-how-title">Create your club</div>
                <div className="c-how-text">Club name, city, done.</div>
              </div>
            </div>
            <div className="c-how-item">
              <div className="c-how-num">2</div>
              <div>
                <div className="c-how-title">Share your link or QR</div>
                <div className="c-how-text">hockeyshotchallenge.com/join/your-club</div>
              </div>
            </div>
            <div className="c-how-item">
              <div className="c-how-num">3</div>
              <div>
                <div className="c-how-title">Watch the board fill</div>
                <div className="c-how-text">See your players' stats in real time.</div>
              </div>
            </div>
          </div>

          <button className="c-cta" onClick={() => setMode('signup')}>
            Set up your club — free →
          </button>
          <button className="c-text-btn" onClick={() => setMode('signin')}>
            Already have a coach account? Sign in
          </button>
        </div>

        <style>{styles}</style>
      </div>
    )
  }

  // SIGN IN
  if (mode === 'signin') {
    return (
      <div className="coach-wrap c-centered">
        <div className="c-card">
          <div className="c-card-brand">
            <BrandMark />
            <span>Coach sign-in</span>
          </div>
          <h2 className="c-card-title">Welcome back.</h2>

          <label className="c-label">
            <span>Email</span>
            <input
              type="email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              placeholder="coach@example.com"
              autoCapitalize="none"
              autoCorrect="off"
              className="c-input"
            />
          </label>

          <label className="c-label">
            <span>Password</span>
            <input
              type="password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              placeholder="••••••••"
              className="c-input"
            />
          </label>

          {error && <div className="c-error">{error}</div>}

          <button className="c-btn" onClick={handleSignIn} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <button className="c-text-btn" onClick={() => { setMode('intro'); setError('') }}>
            ← Back
          </button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  // SIGN UP
  return (
    <div className="coach-wrap c-centered">
      <div className="c-card">
        <div className="c-card-brand">
          <BrandMark />
          <span>Coach setup · Step {step} of 2</span>
        </div>

        {step === 1 && (
          <>
            <h2 className="c-card-title">Create your account.</h2>
            <p className="c-card-sub">We'll use your email to send your weekly club recap.</p>

            <label className="c-label">
              <span>Your name</span>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Coach first name"
                className="c-input"
                autoFocus
              />
            </label>

            <label className="c-label">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="coach@example.com"
                autoCapitalize="none"
                autoCorrect="off"
                className="c-input"
              />
            </label>

            <label className="c-label">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="c-input"
              />
            </label>

            {error && <div className="c-error">{error}</div>}

            <button className="c-btn" onClick={handleAccountNext}>
              Continue →
            </button>

            <button className="c-text-btn" onClick={() => { setMode('intro'); setError('') }}>
              ← Back
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="c-card-title">Tell us about your club.</h2>
            <p className="c-card-sub">This creates your branded join page that players will sign up through.</p>

            <label className="c-label">
              <span>Club name</span>
              <input
                type="text"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                placeholder="Burlington Eagles Hockey"
                className="c-input"
                autoFocus
              />
            </label>
            <div className="c-hint">This will appear on your public join page.</div>

            <label className="c-label" style={{ marginTop: 14 }}>
              <span>City (optional)</span>
              <input
                type="text"
                value={clubCity}
                onChange={(e) => setClubCity(e.target.value)}
                placeholder="Burlington, ON"
                className="c-input"
              />
            </label>

            {error && <div className="c-error">{error}</div>}

            <button className="c-btn" onClick={handleSignUp} disabled={loading}>
              {loading ? 'Creating club…' : 'Create club →'}
            </button>

            <button className="c-text-btn" onClick={() => { setStep(1); setError('') }}>
              ← Back
            </button>
          </>
        )}
      </div>
      <style>{styles}</style>
    </div>
  )
}

function BrandMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 40 40" style={{ display: 'block', flexShrink: 0 }}>
      <circle cx="20" cy="20" r="17" fill="#1a2847" stroke="#2979ff" strokeWidth="1" />
      <path d="M 12 22 L 17.5 27 L 28 15" stroke="#a8d4f5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const styles = `
.coach-wrap {
  min-height: 100dvh;
  background: var(--bg);
  width: 100%; max-width: none;
  color: var(--text);
  font-family: var(--font-body);
}
.c-centered {
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.c-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px clamp(16px, 5vw, 40px);
  max-width: 1100px; margin: 0 auto;
}
.c-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display);
  font-weight: 800; font-size: 15px;
  letter-spacing: 0.5px;
  cursor: pointer;
}
.c-nav-link {
  color: var(--ice);
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 500;
}

.c-hero {
  max-width: 660px;
  margin: 0 auto;
  padding: 40px clamp(16px, 5vw, 40px) 60px;
}
.c-eyebrow {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  background: var(--accent-bg);
  padding: 6px 12px;
  border-radius: 999px;
  display: inline-block;
  margin-bottom: 18px;
}
.c-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.5px;
  color: white;
  margin-bottom: 18px;
}
.c-sub {
  font-size: clamp(15px, 2vw, 17px);
  color: var(--text-soft);
  line-height: 1.5;
  margin-bottom: 32px;
}

.c-how {
  display: flex; flex-direction: column; gap: 12px;
  margin-bottom: 32px;
}
.c-how-item {
  display: flex; gap: 14px; align-items: center;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 12px;
  padding: 14px 16px;
}
.c-how-num {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 800;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.c-how-title {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.3px;
  line-height: 1.1;
}
.c-how-text {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 3px;
}

.c-cta {
  width: 100%;
  background: var(--accent);
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}
.c-cta:hover { background: var(--accent-soft); }
.c-text-btn {
  width: 100%;
  color: var(--text-mute);
  font-size: 13px;
  padding: 10px;
  text-align: center;
}
.c-text-btn:hover { color: var(--ice); }

/* Form card */
.c-card {
  width: 100%; max-width: 420px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius-lg);
  padding: 22px 20px;
}
.c-card-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display);
  font-weight: 700; font-size: 12px;
  letter-spacing: 1px;
  color: var(--text-mute);
  margin-bottom: 18px;
  text-transform: uppercase;
}
.c-card-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.3px;
  color: white;
  margin-bottom: 6px;
}
.c-card-sub {
  font-size: 13px;
  color: var(--text-mute);
  margin: 0 0 18px;
  line-height: 1.4;
}
.c-label {
  display: block;
  margin-bottom: 14px;
}
.c-label > span {
  display: block;
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 6px;
}
.c-input {
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
.c-input:focus { border-color: var(--accent); }
.c-hint {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 4px;
  line-height: 1.4;
}
.c-btn {
  width: 100%;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.4px;
  font-family: var(--font-display);
  margin: 14px 0 6px;
  transition: transform 0.1s, background 0.15s;
}
.c-btn:hover:not(:disabled) { background: var(--accent-soft); }
.c-btn:active:not(:disabled) { transform: scale(0.98); }
.c-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.c-error {
  background: rgba(255, 84, 84, 0.1);
  border: 0.5px solid rgba(255, 84, 84, 0.3);
  color: var(--danger);
  border-radius: var(--radius);
  padding: 10px 12px;
  font-size: 13px;
  margin-bottom: 10px;
}
`
