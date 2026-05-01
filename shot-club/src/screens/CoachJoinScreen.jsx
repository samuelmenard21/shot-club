import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { signUpCoach, signInCoach } from '../lib/auth'
import { createCoachProfile, getMyCoachProfile } from '../lib/clubs'
import {
  getClubBySlugFull,
  findOrCreateTeam,
  requestJoinTeam,
  AGE_DIVISIONS,
  TIERS,
} from '../lib/teams'
import { setSEO, CANONICAL_URL } from '../lib/seo'

export default function CoachJoinScreen() {
  const nav = useNavigate()
  const [params] = useSearchParams()
  const clubSlug = params.get('club')

  const [club, setClub] = useState(null)
  const [clubLoading, setClubLoading] = useState(true)

  const [step, setStep] = useState(1) // 1 = account, 2 = team, 3 = result

  // Account
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Team
  const [ageDivision, setAgeDivision] = useState('')
  const [tier, setTier] = useState('')

  // Result
  const [resultState, setResultState] = useState(null) // 'created' | 'requested' | 'already_owner'
  const [resultData, setResultData] = useState(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setSEO({
      title: club ? `Coach signup — ${club.name}` : 'Coach signup',
      description: `Set up your team for ${club?.name || 'your club'} on Hockey Shot Challenge.`,
      url: `${CANONICAL_URL}/coach/join`,
      noindex: true,
    })
  }, [club])

  useEffect(() => {
    ;(async () => {
      if (!clubSlug) {
        setClubLoading(false)
        return
      }
      const c = await getClubBySlugFull(clubSlug)
      setClub(c)
      setClubLoading(false)
    })()
  }, [clubSlug])

  const handleAccountNext = () => {
    setError('')
    if (!displayName.trim()) return setError('Enter your name.')
    if (!email.trim() || !email.includes('@')) return setError('Enter a valid email.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    setStep(2)
  }

  const handleSignUp = async () => {
    setError('')
    if (!ageDivision) return setError('Pick the team age.')
    if (!tier) return setError('Pick the team tier.')
    setLoading(true)
    try {
      // 1. Create auth user
      await signUpCoach({ displayName, email, password })
      // 2. Create coach profile attached to this club
      await createCoachProfile({
        displayName: displayName.trim(),
        email: email.trim(),
        clubId: club.id,
        isDirector: false,
      })
      // 3. Get the just-created coach id (auth user id == coach id by design)
      const profile = await getMyCoachProfile()
      // 4. Find or create team
      const result = await findOrCreateTeam({
        clubId: club.id,
        coachId: profile.id,
        ageDivision,
        tier,
      })
      // 5. Branch on outcome
      if (!result.teamExisted) {
        setResultState('created')
        setResultData({ teamId: result.teamId })
      } else if (result.isOwner) {
        // Edge case: same coach signing up twice somehow
        setResultState('already_owner')
        setResultData({ teamId: result.teamId })
      } else {
        // Team exists with a different owner — request to join
        await requestJoinTeam({ teamId: result.teamId, coachId: profile.id })
        setResultState('requested')
        setResultData({ teamId: result.teamId, ownerName: result.ownerCoachName })
      }
      setStep(3)
    } catch (e) {
      if (e.message?.toLowerCase().includes('already registered') || e.message?.toLowerCase().includes('user already')) {
        setError('That email is already in use. Sign in instead — link below.')
      } else {
        setError(e.message || 'Something went wrong.')
      }
    } finally {
      setLoading(false)
    }
  }

  // ---------- Render branches ----------

  if (clubLoading) {
    return (
      <div className="cj-wrap cj-centered">
        <div style={{ color: 'var(--text-mute)', fontFamily: 'var(--font-display)', letterSpacing: 2, fontSize: 12 }}>
          LOADING…
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  if (!club) {
    return (
      <div className="cj-wrap cj-centered">
        <div className="cj-card">
          <h2 className="cj-card-title">Club not found</h2>
          <p className="cj-card-sub">
            We couldn't find that club. It may have been moved or renamed.
          </p>
          <button className="cj-btn" onClick={() => nav('/coach')}>
            Find your club →
          </button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  // STEP 3 — result
  if (step === 3) {
    return (
      <div className="cj-wrap cj-centered">
        <div className="cj-card">
          <div className="cj-result-mark">{resultState === 'requested' ? '⏳' : '✓'}</div>

          {resultState === 'created' && (
            <>
              <h2 className="cj-card-title">Team created.</h2>
              <p className="cj-card-sub">
                You're the owner of <strong>{ageDivision} {tier}</strong> at <strong>{club.name}</strong>.
                Time to invite your players.
              </p>
              <button className="cj-btn" onClick={() => nav('/coach/dashboard')}>
                Go to dashboard →
              </button>
            </>
          )}

          {resultState === 'requested' && (
            <>
              <h2 className="cj-card-title">Request sent.</h2>
              <p className="cj-card-sub">
                <strong>{ageDivision} {tier}</strong> at <strong>{club.name}</strong> is already managed by{' '}
                <strong>{resultData?.ownerName || 'another coach'}</strong>.
                We've asked them to add you to the team. You'll get access once they approve.
              </p>
              <button className="cj-btn" onClick={() => nav('/coach/dashboard')}>
                Go to dashboard →
              </button>
            </>
          )}

          {resultState === 'already_owner' && (
            <>
              <h2 className="cj-card-title">Welcome back.</h2>
              <p className="cj-card-sub">
                You already own this team. Go to your dashboard to manage it.
              </p>
              <button className="cj-btn" onClick={() => nav('/coach/dashboard')}>
                Go to dashboard →
              </button>
            </>
          )}
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  // STEP 1 / 2 form
  return (
    <div className="cj-wrap cj-centered">
      <div className="cj-card">
        <div className="cj-eyebrow">{club.governing_body} · {club.city}</div>
        <h1 className="cj-club-name">{club.name}</h1>
        <div className="cj-step">Coach setup · Step {step} of 2</div>

        {step === 1 && (
          <>
            <p className="cj-card-sub">Create your account first. We'll set up your team next.</p>

            <label className="cj-label">
              <span>Your name</span>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Coach first name"
                className="cj-input"
                autoFocus
              />
            </label>

            <label className="cj-label">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="coach@example.com"
                autoCapitalize="none"
                autoCorrect="off"
                className="cj-input"
              />
            </label>

            <label className="cj-label">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="cj-input"
              />
            </label>

            {error && <div className="cj-error">{error}</div>}

            <button className="cj-btn" onClick={handleAccountNext}>
              Continue →
            </button>

            <button className="cj-text-btn" onClick={() => nav('/coach')}>
              Already have an account? Sign in
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <p className="cj-card-sub">What team do you coach?</p>

            <label className="cj-label">
              <span>Age division</span>
              <select
                value={ageDivision}
                onChange={(e) => setAgeDivision(e.target.value)}
                className="cj-input cj-select"
                autoFocus
              >
                <option value="">Pick age…</option>
                {AGE_DIVISIONS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </label>

            <label className="cj-label">
              <span>Tier</span>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="cj-input cj-select"
              >
                <option value="">Pick tier…</option>
                {TIERS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <div className="cj-hint">
              If another coach has already set up this team, we'll connect you to them.
            </div>

            {error && <div className="cj-error">{error}</div>}

            <button className="cj-btn" onClick={handleSignUp} disabled={loading}>
              {loading ? 'Setting up…' : 'Create my team →'}
            </button>

            <button className="cj-text-btn" onClick={() => { setStep(1); setError('') }}>
              ← Back
            </button>
          </>
        )}
      </div>
      <style>{styles}</style>
    </div>
  )
}

const styles = `
.cj-wrap {
  min-height: 100dvh;
  background: var(--bg);
  width: 100%;
  color: var(--text);
  font-family: var(--font-body);
}
.cj-centered {
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.cj-card {
  width: 100%; max-width: 440px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius-lg);
  padding: 24px 22px;
}
.cj-eyebrow {
  font-family: var(--font-display);
  font-size: 11px; font-weight: 600;
  color: var(--ice);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.cj-club-name {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.3px;
  color: white;
  margin: 0 0 4px;
}
.cj-step {
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 18px;
}
.cj-card-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.2px;
  color: white;
  margin: 0 0 6px;
}
.cj-card-sub {
  font-size: 14px;
  color: var(--text-soft);
  margin: 0 0 18px;
  line-height: 1.5;
}
.cj-label {
  display: block;
  margin-bottom: 14px;
}
.cj-label > span {
  display: block;
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 6px;
}
.cj-input {
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
.cj-input:focus { border-color: var(--accent); }
.cj-select {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%23a8d4f5' d='M1 1l5 5 5-5'/></svg>");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}
.cj-hint {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: -4px;
  margin-bottom: 10px;
  line-height: 1.4;
}
.cj-btn {
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
.cj-btn:hover:not(:disabled) { background: var(--accent-soft); }
.cj-btn:active:not(:disabled) { transform: scale(0.98); }
.cj-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.cj-text-btn {
  width: 100%;
  color: var(--text-mute);
  font-size: 13px;
  padding: 10px;
  text-align: center;
}
.cj-text-btn:hover { color: var(--ice); }
.cj-error {
  background: rgba(255, 84, 84, 0.1);
  border: 0.5px solid rgba(255, 84, 84, 0.3);
  color: var(--danger);
  border-radius: var(--radius);
  padding: 10px 12px;
  font-size: 13px;
  margin-bottom: 10px;
}
.cj-result-mark {
  font-size: 48px;
  text-align: center;
  margin-bottom: 14px;
}
`
