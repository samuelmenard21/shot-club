import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { signUpCoach, signInCoach } from '../lib/auth'
import {
  searchClubs,
  getClubBySlug,
  createCoachProfile,
  getMyCoachProfile,
  submitPendingClub,
  AGE_DIVISIONS,
  TIERS,
} from '../lib/clubs'
import { findOrCreateTeam } from '../lib/teams'
import { setSEO, CANONICAL_URL } from '../lib/seo'

export default function CoachAuthScreen() {
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState('intro')
  const [step, setStep] = useState(1)

  // Account fields
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Club search
  const [clubQuery, setClubQuery] = useState('')
  const [clubResults, setClubResults] = useState([])
  const [searchingClubs, setSearchingClubs] = useState(false)
  const [selectedClub, setSelectedClub] = useState(null)
  const searchTimerRef = useRef(null)

  // Custom-club fallback (when association isn't listed)
  const [showCustomClub, setShowCustomClub] = useState(false)
  const [customClubName, setCustomClubName] = useState('')
  const [customClubCity, setCustomClubCity] = useState('')

  // Team selection
  const [ageDivision, setAgeDivision] = useState('')
  const [tier, setTier] = useState('')

  // Sign-in
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setSEO({
      title: 'For coaches & clubs',
      description: "Find your association, set up your team, invite your players. Free.",
      url: `${CANONICAL_URL}/coach`,
    })
  }, [])

  // Pre-key from /coach/join?club=<slug>
  useEffect(() => {
    const slug = searchParams.get('club')
    if (!slug) return
    ;(async () => {
      const club = await getClubBySlug(slug)
      if (club) {
        setSelectedClub(club)
        setMode('signup')
      }
    })()
  }, [searchParams])

  // Debounced club search
  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current)
    if (!clubQuery.trim() || clubQuery.trim().length < 2) {
      setClubResults([])
      setSearchingClubs(false)
      return
    }
    setSearchingClubs(true)
    searchTimerRef.current = setTimeout(async () => {
      try {
        const results = await searchClubs(clubQuery)
        setClubResults(results || [])
      } catch (e) {
        console.warn('search error', e)
        setClubResults([])
      } finally {
        setSearchingClubs(false)
      }
    }, 250)
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current)
    }
  }, [clubQuery])

  // ----- Step transitions -----

  const handleAccountNext = () => {
    setError('')
    if (!displayName.trim()) return setError('Enter your name.')
    if (!email.trim() || !email.includes('@')) return setError('Enter a valid email.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    setStep(2)
  }

  const handleClubNext = () => {
    setError('')
    if (!selectedClub) return setError('Pick your association from the list, or submit yours.')
    setStep(3)
  }

  // ----- Final submission -----

  const handleCreateTeam = async () => {
    setError('')
    if (!ageDivision) return setError('Pick your age division.')
    if (!tier) return setError('Pick your tier.')
    if (!selectedClub) return setError('Pick your association.')

    setLoading(true)
    try {
      // 1) Create the auth user
      await signUpCoach({ displayName: displayName.trim(), email: email.trim(), password })

      // 2) Create the coach profile and capture the returned row
      const me = await createCoachProfile({
        displayName: displayName.trim(),
        email: email.trim(),
        clubId: selectedClub.id,
        isDirector: false,
      })
      if (!me) {
        throw new Error("We created your account but couldn't set up your profile. Try signing in.")
      }

      // 3) Find or create the team for this club + age + tier
      const result = await findOrCreateTeam({
        clubId: selectedClub.id,
        coachId: me.id,
        ageDivision,
        tier,
      })

      // 4) Done — go to the dashboard
      nav('/coach/dashboard')
    } catch (e) {
      const msg = (e?.message || '').toLowerCase()
      if (msg.includes('already registered') || msg.includes('user already')) {
        setError('That email is already in use. Try signing in instead.')
      } else if (msg.includes('rate limit') || msg.includes('too many')) {
        setError("You're making too many attempts. Wait a minute and try again.")
      } else {
        setError(e?.message || 'Something went wrong. Try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitCustomClub = async () => {
    setError('')
    if (!customClubName.trim()) return setError('Enter your association name.')
    setLoading(true)
    try {
      await submitPendingClub({
        name: customClubName.trim(),
        city: customClubCity.trim() || null,
        contactEmail: email.trim() || null,
      })
      setError('')
      setShowCustomClub(false)
      setMode('submitted')
    } catch (e) {
      setError(e?.message || 'Could not submit your association. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async () => {
    setError('')
    if (!signInEmail.trim() || !signInPassword) return setError('Enter your email and password.')
    setLoading(true)
    try {
      await signInCoach({ email: signInEmail.trim(), password: signInPassword })
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

  // ===== INTRO =====
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
          <div className="c-eyebrow">FOR COACHES & CLUBS</div>
          <h1 className="c-title">Set up your team in 90 seconds.</h1>
          <p className="c-sub">
            Find your association. Pick your age and tier. Get a link to invite your players. Free.
          </p>

          <div className="c-how">
            <div className="c-how-item">
              <div className="c-how-num">1</div>
              <div>
                <div className="c-how-title">Find your association</div>
                <div className="c-how-text">Burlington Eagles, Mississauga Reps, etc.</div>
              </div>
            </div>
            <div className="c-how-item">
              <div className="c-how-num">2</div>
              <div>
                <div className="c-how-title">Pick your team</div>
                <div className="c-how-text">U12 AAA, U15 A, etc.</div>
              </div>
            </div>
            <div className="c-how-item">
              <div className="c-how-num">3</div>
              <div>
                <div className="c-how-title">Send the invite link</div>
                <div className="c-how-text">Players sign up in 30 seconds.</div>
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

  // ===== SUBMITTED CUSTOM CLUB =====
  if (mode === 'submitted') {
    return (
      <div className="coach-wrap c-centered">
        <div className="c-card">
          <div className="c-card-brand">
            <BrandMark />
            <span>Thanks!</span>
          </div>
          <h2 className="c-card-title">We got it.</h2>
          <p className="c-card-sub">
            We'll get your association added soon. We'll email you when it's ready.
          </p>
          <button className="c-btn" onClick={() => nav('/')}>Done</button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  // ===== SIGN IN =====
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
          <button className="c-text-btn" onClick={() => { setMode('intro'); setError('') }}>← Back</button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  // ===== SIGN UP =====
  return (
    <div className="coach-wrap c-centered">
      <div className="c-card">
        <div className="c-card-brand">
          <BrandMark />
          <span>Coach setup · Step {step} of 3</span>
        </div>

        {/* Step 1 — account */}
        {step === 1 && (
          <>
            {selectedClub && (
              <div className="c-clubchip">
                <div className="c-clubchip-eyebrow">{selectedClub.governing_body || 'ASSOCIATION'} · {selectedClub.city || ''}</div>
                <div className="c-clubchip-name">{selectedClub.name}</div>
              </div>
            )}
            <h2 className="c-card-title">{selectedClub ? selectedClub.name : 'Create your account.'}</h2>
            <p className="c-card-sub">
              {selectedClub ? "Create your account first. We'll set up your team next." : "We'll use your email to send your weekly recap."}
            </p>

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

            <button className="c-btn" onClick={handleAccountNext}>Continue →</button>
            <button className="c-text-btn" onClick={() => setMode('signin')}>Already have an account? Sign in</button>
            <button className="c-text-btn" onClick={() => { setMode('intro'); setError('') }}>← Back</button>
          </>
        )}

        {/* Step 2 — find association */}
        {step === 2 && !showCustomClub && !selectedClub && (
          <>
            <h2 className="c-card-title">Find your association.</h2>
            <p className="c-card-sub">Search by city or team name.</p>

            <input
              type="text"
              value={clubQuery}
              onChange={(e) => setClubQuery(e.target.value)}
              placeholder="burlington"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck="false"
              className="c-input"
              autoFocus
            />

            <div className="c-results">
              {searchingClubs && clubResults.length === 0 && (
                <div className="c-result-empty">Searching…</div>
              )}
              {!searchingClubs && clubQuery.length >= 2 && clubResults.length === 0 && (
                <div className="c-result-empty">No matches. Try a different search.</div>
              )}
              {clubResults.map((c) => (
                <button
                  key={c.id}
                  className="c-result"
                  onClick={() => setSelectedClub(c)}
                >
                  <div className="c-result-name">{c.name}</div>
                  <div className="c-result-meta">
                    {c.city || ''}{c.governing_body ? ` · ${c.governing_body}` : ''}{c.gender_type === 'girls' ? ' · Girls' : ''}
                  </div>
                </button>
              ))}
            </div>

            {error && <div className="c-error">{error}</div>}

            <button className="c-text-btn" onClick={() => setShowCustomClub(true)}>
              My association isn't listed
            </button>
            <button className="c-text-btn" onClick={() => setStep(1)}>← Back</button>
          </>
        )}

        {/* Step 2 — confirm pre-keyed or just-selected club */}
        {step === 2 && selectedClub && !showCustomClub && (
          <>
            <h2 className="c-card-title">Confirm your association.</h2>
            <div className="c-clubcard">
              <div className="c-clubcard-name">{selectedClub.name}</div>
              <div className="c-clubcard-meta">
                {selectedClub.city || ''}{selectedClub.governing_body ? ` · ${selectedClub.governing_body}` : ''}
              </div>
              <button className="c-text-btn c-text-btn--inline" onClick={() => setSelectedClub(null)}>Change</button>
            </div>

            {error && <div className="c-error">{error}</div>}

            <button className="c-btn" onClick={handleClubNext}>Continue →</button>
            <button className="c-text-btn" onClick={() => setStep(1)}>← Back</button>
          </>
        )}

        {/* Step 2 — custom-club submission fallback */}
        {step === 2 && showCustomClub && (
          <>
            <h2 className="c-card-title">Tell us about your association.</h2>
            <p className="c-card-sub">We'll get it added and email you when it's ready.</p>

            <label className="c-label">
              <span>Association name</span>
              <input
                type="text"
                value={customClubName}
                onChange={(e) => setCustomClubName(e.target.value)}
                placeholder="e.g. Smithtown Hockey Association"
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
                placeholder="Smithtown, ON"
                className="c-input"
              />
            </label>

            {error && <div className="c-error">{error}</div>}

            <button className="c-btn" onClick={handleSubmitCustomClub} disabled={loading}>
              {loading ? 'Submitting…' : 'Submit'}
            </button>
            <button className="c-text-btn" onClick={() => setShowCustomClub(false)}>← Back to search</button>
          </>
        )}

        {/* Step 3 — team age + tier */}
        {step === 3 && (
          <>
            {selectedClub && (
              <div className="c-clubchip">
                <div className="c-clubchip-eyebrow">{selectedClub.governing_body || 'ASSOCIATION'} · {selectedClub.city || ''}</div>
                <div className="c-clubchip-name">{selectedClub.name}</div>
                <button className="c-text-btn c-text-btn--inline" onClick={() => { setStep(2); setSelectedClub(null) }}>Change</button>
              </div>
            )}
            <h2 className="c-card-title">What team do you coach?</h2>

            <label className="c-label">
              <span>Age division</span>
              <select
                value={ageDivision}
                onChange={(e) => setAgeDivision(e.target.value)}
                className="c-input"
              >
                <option value="">Pick one</option>
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
                className="c-input"
              >
                <option value="">Pick one</option>
                {TIERS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>

            <p className="c-card-sub" style={{ marginBottom: 0 }}>
              If another coach has already set up this team, we'll connect you to them.
            </p>

            {error && <div className="c-error">{error}</div>}

            <button className="c-btn" onClick={handleCreateTeam} disabled={loading}>
              {loading ? 'Setting up…' : 'Create my team →'}
            </button>
            <button className="c-text-btn" onClick={() => setStep(2)}>← Back</button>
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
.c-text-btn--inline {
  width: auto;
  padding: 4px 0;
  display: inline-block;
  text-align: left;
  font-size: 12px;
  color: var(--accent);
}
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
.c-clubchip {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 14px;
}
.c-clubchip-eyebrow {
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
}
.c-clubchip-name {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.3px;
  margin-top: 2px;
  line-height: 1.1;
}
.c-clubcard {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 14px;
}
.c-clubcard-name {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  color: white;
}
.c-clubcard-meta {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 4px;
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
  font-family: inherit;
}
.c-input:focus { border-color: var(--accent); }
.c-results {
  display: flex; flex-direction: column;
  gap: 6px;
  margin: 12px 0 6px;
  max-height: 320px;
  overflow-y: auto;
}
.c-result {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 12px 14px;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s;
}
.c-result:hover { border-color: var(--accent); }
.c-result-name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 15px;
  color: white;
  letter-spacing: 0.3px;
  line-height: 1.1;
}
.c-result-meta {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 3px;
}
.c-result-empty {
  text-align: center;
  font-size: 13px;
  color: var(--text-mute);
  padding: 14px 8px;
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
