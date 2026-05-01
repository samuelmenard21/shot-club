import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUpCoach, signInCoach } from '../lib/auth'
import { createClub, createCoachProfile, getMyCoachProfile } from '../lib/clubs'
import { searchClubs, findOrCreateTeam, requestJoinTeam, submitPendingClub, AGE_DIVISIONS, TIERS } from '../lib/teams'
import { setSEO, CANONICAL_URL } from '../lib/seo'

export default function CoachAuthScreen() {
  const nav = useNavigate()
  const [mode, setMode] = useState('intro') // 'intro' | 'signup' | 'signin'
  const [step, setStep] = useState(1) // 1 = account, 2 = club search, 3 = team age/tier, 4 = result/custom

  // Account fields
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Club search
  const [clubQuery, setClubQuery] = useState('')
  const [clubResults, setClubResults] = useState([])
  const [searchingClubs, setSearchingClubs] = useState(false)
  const [selectedClub, setSelectedClub] = useState(null)

  // Custom club fallback
  const [showCustomClub, setShowCustomClub] = useState(false)
  const [customClubName, setCustomClubName] = useState('')
  const [customClubCity, setCustomClubCity] = useState('')

  // Team selection
  const [ageDivision, setAgeDivision] = useState('')
  const [tier, setTier] = useState('')

  // Result state
  const [resultState, setResultState] = useState(null) // 'created' | 'requested' | 'custom_submitted'
  const [resultData, setResultData] = useState(null)

  // Sign in
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setSEO({
      title: 'For coaches & clubs',
      description: 'Get your hockey team logging shots every day. Pre-loaded for 1,800+ associations across North America. Free to start.',
      url: `${CANONICAL_URL}/coach`,
    })
  }, [])

  // Debounced club search
  useEffect(() => {
    if (!clubQuery || clubQuery.trim().length < 2) {
      setClubResults([])
      return
    }
    setSearchingClubs(true)
    const t = setTimeout(async () => {
      try {
        const results = await searchClubs(clubQuery)
        setClubResults(results)
      } catch (e) {
        setClubResults([])
      }
      setSearchingClubs(false)
    }, 220)
    return () => clearTimeout(t)
  }, [clubQuery])

  const handleAccountNext = () => {
    setError('')
    if (!displayName.trim()) return setError('Enter your name.')
    if (!email.trim() || !email.includes('@')) return setError('Enter a valid email.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    setStep(2)
  }

  const handleClubSelect = (club) => {
    setSelectedClub(club)
    setError('')
    setStep(3)
  }

  // Sign up + connect to a SEEDED club (the main path)
  const handleTeamSubmit = async () => {
    setError('')
    if (!ageDivision) return setError('Pick the team age.')
    if (!tier) return setError('Pick the team tier.')
    setLoading(true)
    try {
      // 1. Create auth user
      await signUpCoach({ displayName, email, password })
      // 2. Coach profile attached to selected club
      await createCoachProfile({
        displayName: displayName.trim(),
        email: email.trim(),
        clubId: selectedClub.id,
        isDirector: false,
      })
      // 3. Get coach id
      const profile = await getMyCoachProfile()
      // 4. Find or create the team within this club
      const result = await findOrCreateTeam({
        clubId: selectedClub.id,
        coachId: profile.id,
        ageDivision,
        tier,
      })
      // 5. Branch on outcome
      if (!result.teamExisted) {
        setResultState('created')
        setResultData({ teamId: result.teamId })
      } else if (result.isOwner) {
        setResultState('already_owner')
        setResultData({ teamId: result.teamId })
      } else {
        await requestJoinTeam({ teamId: result.teamId, coachId: profile.id })
        setResultState('requested')
        setResultData({ teamId: result.teamId, ownerName: result.ownerCoachName })
      }
      setStep(4)
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

  // Custom club path (Tier 3 — submits to pending_clubs and creates a private custom club)
  const handleCustomClubSubmit = async () => {
    setError('')
    if (!customClubName.trim()) return setError('Enter your club name.')
    setLoading(true)
    try {
      await signUpCoach({ displayName, email, password })
      const club = await createClub({
        name: customClubName.trim(),
        city: customClubCity.trim() || null,
      })
      await createCoachProfile({
        displayName: displayName.trim(),
        email: email.trim(),
        clubId: club.id,
        isDirector: true,
      })
      // Also log a pending submission so Sam can review and merge later
      const profile = await getMyCoachProfile()
      try {
        await submitPendingClub({
          name: customClubName.trim(),
          city: customClubCity.trim(),
          submitterEmail: email.trim(),
          coachId: profile.id,
          notes: 'Submitted via coach signup (no match in directory)',
        })
      } catch (e) { /* non-blocking */ }
      setResultState('custom_submitted')
      setResultData({ clubId: club.id })
      setStep(4)
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
          <div className="c-eyebrow">FOR COACHES</div>
          <h1 className="c-title">Your team, logging shots every day.</h1>
          <p className="c-sub">
            Find your association, set up your team in 30 seconds, and start inviting players.
            Pre-loaded for 1,800+ minor hockey associations across North America.
          </p>

          <div className="c-how">
            <div className="c-how-item">
              <div className="c-how-num">1</div>
              <div>
                <div className="c-how-title">Find your association</div>
                <div className="c-how-text">Burlington Eagles, Markham Waxers, etc.</div>
              </div>
            </div>
            <div className="c-how-item">
              <div className="c-how-num">2</div>
              <div>
                <div className="c-how-title">Set up your team</div>
                <div className="c-how-text">Just pick age and tier — U12 AAA, U10 House, etc.</div>
              </div>
            </div>
            <div className="c-how-item">
              <div className="c-how-num">3</div>
              <div>
                <div className="c-how-title">Invite your players</div>
                <div className="c-how-text">Share a code or QR. They sign up in 30 seconds.</div>
              </div>
            </div>
          </div>

          <button className="c-cta" onClick={() => setMode('signup')}>
            Set up your team — free →
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

  // STEP 4 — Result
  if (mode === 'signup' && step === 4) {
    return (
      <div className="coach-wrap c-centered">
        <div className="c-card">
          <div className="c-result-mark">{resultState === 'requested' ? '⏳' : '✓'}</div>

          {resultState === 'created' && (
            <>
              <h2 className="c-card-title">Team created.</h2>
              <p className="c-card-sub">
                You're the owner of <strong>{ageDivision} {tier}</strong> at <strong>{selectedClub?.name}</strong>.
                Time to invite your players.
              </p>
              <button className="c-btn" onClick={() => nav('/coach/dashboard')}>Go to dashboard →</button>
            </>
          )}

          {resultState === 'requested' && (
            <>
              <h2 className="c-card-title">Request sent.</h2>
              <p className="c-card-sub">
                <strong>{ageDivision} {tier}</strong> at <strong>{selectedClub?.name}</strong> is already managed by{' '}
                <strong>{resultData?.ownerName || 'another coach'}</strong>.
                We've asked them to add you. You'll get access once they approve.
              </p>
              <button className="c-btn" onClick={() => nav('/coach/dashboard')}>Go to dashboard →</button>
            </>
          )}

          {resultState === 'already_owner' && (
            <>
              <h2 className="c-card-title">Welcome back.</h2>
              <p className="c-card-sub">You already manage this team.</p>
              <button className="c-btn" onClick={() => nav('/coach/dashboard')}>Go to dashboard →</button>
            </>
          )}

          {resultState === 'custom_submitted' && (
            <>
              <h2 className="c-card-title">You're in.</h2>
              <p className="c-card-sub">
                We've created <strong>{customClubName}</strong> for you. We've also flagged it for review so we can add it to the main directory.
              </p>
              <button className="c-btn" onClick={() => nav('/coach/dashboard')}>Go to dashboard →</button>
            </>
          )}
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  // SIGN UP — STEPS 1, 2, 3
  return (
    <div className="coach-wrap c-centered">
      <div className="c-card">
        <div className="c-card-brand">
          <BrandMark />
          <span>Coach setup · Step {step} of 3</span>
        </div>

        {step === 1 && (
          <>
            <h2 className="c-card-title">Create your account.</h2>
            <p className="c-card-sub">We'll find your association next.</p>

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

        {step === 2 && !showCustomClub && (
          <>
            <h2 className="c-card-title">Find your association.</h2>
            <p className="c-card-sub">Search by city or team name.</p>

            <input
              type="text"
              value={clubQuery}
              onChange={(e) => setClubQuery(e.target.value)}
              placeholder="e.g. Burlington Eagles"
              className="c-input"
              autoFocus
            />

            <div className="c-results">
              {searchingClubs && (
                <div className="c-result-empty">Searching…</div>
              )}
              {!searchingClubs && clubQuery.trim().length >= 2 && clubResults.length === 0 && (
                <div className="c-result-empty">No matches.</div>
              )}
              {!searchingClubs && clubResults.map((c) => (
                <button key={c.id} className="c-result" onClick={() => handleClubSelect(c)}>
                  <div className="c-result-name">{c.name}</div>
                  <div className="c-result-sub">
                    {c.city}{c.governing_body ? ` · ${c.governing_body}` : ''}
                    {c.gender_type === 'girls' ? ' · Girls' : ''}
                  </div>
                </button>
              ))}
            </div>

            <button className="c-text-btn" onClick={() => setShowCustomClub(true)}>
              My association isn't listed
            </button>

            <button className="c-text-btn" onClick={() => { setStep(1); setError('') }}>
              ← Back
            </button>
          </>
        )}

        {step === 2 && showCustomClub && (
          <>
            <h2 className="c-card-title">Tell us about your club.</h2>
            <p className="c-card-sub">We'll add it to the directory after a quick review.</p>

            <label className="c-label">
              <span>Club name</span>
              <input
                type="text"
                value={customClubName}
                onChange={(e) => setCustomClubName(e.target.value)}
                placeholder="My Hockey Club"
                className="c-input"
                autoFocus
              />
            </label>

            <label className="c-label">
              <span>City (optional)</span>
              <input
                type="text"
                value={customClubCity}
                onChange={(e) => setCustomClubCity(e.target.value)}
                placeholder="Burlington, ON"
                className="c-input"
              />
            </label>

            {error && <div className="c-error">{error}</div>}

            <button className="c-btn" onClick={handleCustomClubSubmit} disabled={loading}>
              {loading ? 'Creating…' : 'Create club →'}
            </button>

            <button className="c-text-btn" onClick={() => { setShowCustomClub(false); setError('') }}>
              ← Back to search
            </button>
          </>
        )}

        {step === 3 && selectedClub && (
          <>
            <div className="c-selected">
              <div className="c-selected-name">{selectedClub.name}</div>
              <div className="c-selected-sub">
                {selectedClub.city}{selectedClub.governing_body ? ` · ${selectedClub.governing_body}` : ''}
              </div>
              <button className="c-text-btn-inline" onClick={() => { setSelectedClub(null); setStep(2) }}>
                Change
              </button>
            </div>

            <h2 className="c-card-title">What team do you coach?</h2>

            <label className="c-label">
              <span>Age division</span>
              <select
                value={ageDivision}
                onChange={(e) => setAgeDivision(e.target.value)}
                className="c-input c-select"
                autoFocus
              >
                <option value="">Pick age…</option>
                {AGE_DIVISIONS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </label>

            <label className="c-label">
              <span>Tier</span>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="c-input c-select"
              >
                <option value="">Pick tier…</option>
                {TIERS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <div className="c-hint">
              If another coach has already set up this team, we'll connect you to them.
            </div>

            {error && <div className="c-error">{error}</div>}

            <button className="c-btn" onClick={handleTeamSubmit} disabled={loading}>
              {loading ? 'Setting up…' : 'Create my team →'}
            </button>

            <button className="c-text-btn" onClick={() => { setStep(2); setError('') }}>
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
.c-text-btn-inline {
  color: var(--ice);
  font-size: 12px;
  padding: 4px 8px;
  margin-top: 4px;
}

/* Form card */
.c-card {
  width: 100%; max-width: 440px;
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
.c-select {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='%23a8d4f5' d='M1 1l5 5 5-5'/></svg>");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}
.c-hint {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 4px;
  margin-bottom: 4px;
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

/* Results dropdown */
.c-results {
  margin: 10px 0 6px;
  max-height: 280px;
  overflow-y: auto;
  display: flex; flex-direction: column;
  gap: 4px;
}
.c-result {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 10px 12px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s;
  display: block; width: 100%;
}
.c-result:hover { border-color: var(--accent); }
.c-result-name {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.2px;
}
.c-result-sub {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 2px;
}
.c-result-empty {
  color: var(--text-mute);
  font-size: 13px;
  padding: 10px 0;
  text-align: center;
}

/* Selected club banner */
.c-selected {
  background: var(--accent-bg);
  border: 0.5px solid var(--accent);
  border-radius: var(--radius);
  padding: 12px 14px;
  margin-bottom: 18px;
}
.c-selected-name {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.2px;
}
.c-selected-sub {
  font-size: 11px;
  color: var(--ice);
  margin-top: 2px;
}

.c-result-mark {
  font-size: 48px;
  text-align: center;
  margin-bottom: 14px;
}
`
