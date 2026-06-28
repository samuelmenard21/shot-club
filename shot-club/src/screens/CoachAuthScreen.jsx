import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { signInCoach, signInWithGoogle } from '../lib/auth'
import { supabase } from '../lib/supabase'
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

  // Populated from Google session after OAuth
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')

  // Club search
  const [clubQuery, setClubQuery] = useState('')
  const [clubResults, setClubResults] = useState([])
  const [searchingClubs, setSearchingClubs] = useState(false)
  const [selectedClub, setSelectedClub] = useState(null)
  const searchTimerRef = useRef(null)

  // Pre-keyed club via /coach/join?club=<slug>
  const [prekeyedClub, setPrekeyedClub] = useState(false)
  const [slugChecked, setSlugChecked] = useState(false)

  // Custom-club fallback (when association isn't listed)
  const [showCustomClub, setShowCustomClub] = useState(false)
  const [customClubName, setCustomClubName] = useState('')
  const [customClubCity, setCustomClubCity] = useState('')

  // Team selection
  const [ageDivision, setAgeDivision] = useState('')
  const [tier, setTier] = useState('')

  // Google OAuth
  const [isGoogleUser, setIsGoogleUser] = useState(false)

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

  // If a coach is already signed in send them to dashboard.
  // If they just came back from Google OAuth (session exists but no profile), start setup at step 2.
  useEffect(() => {
    if (!slugChecked) return
    let cancelled = false
    ;(async () => {
      try {
        const profile = await getMyCoachProfile()
        if (cancelled) return
        if (profile) { nav('/coach/dashboard', { replace: true }); return }

        const { data: { session } } = await supabase.auth.getSession()
        if (cancelled || !session?.user) return

        const u = session.user
        const isGoogle =
          u.app_metadata?.provider === 'google' ||
          (u.identities || []).some((i) => i.provider === 'google')
        if (!isGoogle) return

        setDisplayName(u.user_metadata?.full_name || u.user_metadata?.name || '')
        setEmail(u.email || '')
        setIsGoogleUser(true)
        setMode('signup')
        setStep(prekeyedClub ? 3 : 2)
      } catch (e) {
        // not signed in — fine
      }
    })()
    return () => { cancelled = true }
  }, [slugChecked, nav, prekeyedClub])

  // Pre-key from /coach/join?club=<slug>
  useEffect(() => {
    const slug = searchParams.get('club')
    if (!slug) {
      setSlugChecked(true)
      return
    }
    let cancelled = false
    ;(async () => {
      try {
        const club = await getClubBySlug(slug)
        if (cancelled) return
        if (club) {
          setSelectedClub(club)
          setPrekeyedClub(true)
          setMode('signup')
        } else {
          setMode('badslug')
        }
      } catch (e) {
        if (!cancelled) setMode('badslug')
      } finally {
        if (!cancelled) setSlugChecked(true)
      }
    })()
    return () => { cancelled = true }
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
      // Create the coach profile (Google session is already active)
      await createCoachProfile({
        displayName: displayName.trim(),
        email: email.trim(),
        clubId: selectedClub.id,
        isDirector: false,
      })

      // 3) Read back the coach profile (with retry — sometimes session lags briefly)
      let me = await getMyCoachProfile()
      if (!me) {
        await new Promise((r) => setTimeout(r, 400))
        me = await getMyCoachProfile()
      }
      if (!me) {
        throw new Error("We created your account but couldn't load your profile. Try signing in.")
      }

      // 4) Find or create the team for this club + age + tier
      await findOrCreateTeam({
        clubId: selectedClub.id,
        coachId: me.id,
        ageDivision,
        tier,
      })

      // 5) Done — go to the dashboard
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

  // ===== BAD SLUG =====
  if (mode === 'badslug') {
    return (
      <div className="coach-wrap c-centered">
        <div className="c-card">
          <div className="c-card-brand">
            <BrandMark />
            <span>Hockey Shot Challenge</span>
          </div>
          <h2 className="c-card-title">Hmm — we can't find that club.</h2>
          <p className="c-card-sub">
            The link you followed points to a club we don't recognize. You can search for your association on the next screen.
          </p>
          <button
            className="c-btn"
            onClick={() => {
              setMode('signup')
              setStep(2)
            }}
          >
            Search for my club →
          </button>
          <button className="c-text-btn" onClick={() => nav('/coach')}>← Back</button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  // ===== INTRO =====
  if (mode === 'intro') {
    return (
      <div className="coach-wrap c-centered">
        <div className="c-card">
          <div className="c-card-brand">
            <BrandMark />
            <span>Hockey Shot Challenge</span>
          </div>
          <h2 className="c-card-title">Set up your team.</h2>
          <p className="c-card-sub">Free for coaches and players. Takes 2 minutes.</p>
          <button className="c-google-btn c-google-btn--hero" onClick={signInWithGoogle}>
            <GoogleIcon />
            Continue with Google — free
          </button>
          <button className="c-text-btn" onClick={() => setMode('signin')}>Already have an account? Sign in</button>
          <button className="c-text-btn" onClick={() => nav('/coach')}>← Back</button>
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
          <div className="c-divider"><span>or</span></div>
          <button className="c-google-btn" onClick={signInWithGoogle}>
            <GoogleIcon />
            Continue with Google
          </button>
          <button className="c-text-btn" onClick={() => { setMode('intro'); setError('') }}>← Back</button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  // ===== SIGN UP =====
  // Pre-keyed slugs jump directly to signup mode and skip step 2 entirely.
  // The signup flow with prekeyedClub: step 1 (account) → step 3 (team).
  // The signup flow without prekey: step 1 (account) → step 2 (find club) → step 3 (team).
  return (
    <div className="coach-wrap c-centered">
      <div className="c-card">
        <div className="c-card-brand">
          <BrandMark />
          <span>Coach setup · Step {isGoogleUser ? (step - 1) : (prekeyedClub && step === 3 ? 2 : step)} of {isGoogleUser || prekeyedClub ? 2 : 3}</span>
        </div>

        {/* Step 1 — Google sign-in only */}
        {step === 1 && !isGoogleUser && (
          <>
            {selectedClub && (
              <div className="c-clubchip">
                <div className="c-clubchip-eyebrow">{selectedClub.governing_body || 'ASSOCIATION'}{selectedClub.city ? ` · ${selectedClub.city}` : ''}</div>
                <div className="c-clubchip-name">{selectedClub.name}</div>
              </div>
            )}
            <h2 className="c-card-title">Coach signup</h2>
            <p className="c-card-sub">
              {selectedClub
                ? `Create your coach account for ${selectedClub.name}. We'll set up your team next.`
                : 'Sign in with Google to get started. Free.'}
            </p>

            {error && <div className="c-error">{error}</div>}

            <button className="c-google-btn c-google-btn--hero" onClick={signInWithGoogle}>
              <GoogleIcon />
              Continue with Google — free
            </button>
            <button className="c-text-btn" onClick={() => setMode('signin')}>Already have an account? Sign in</button>
            <button className="c-text-btn" onClick={() => { setMode('intro'); setError('') }}>← Back</button>
          </>
        )}

        {/* Step 2 — find association (only when NOT pre-keyed) */}
        {step === 2 && !prekeyedClub && !showCustomClub && !selectedClub && (
          <>
            {isGoogleUser && (
              <div className="c-google-chip">
                <GoogleIcon size={14} />
                <span>{displayName || email}</span>
              </div>
            )}
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
            <button
              className="c-text-btn"
              onClick={async () => {
                setError('')
                setLoading(true)
                try {
                  const club = await getClubBySlug('independent')
                  if (!club) throw new Error('Could not load independent teams. Try again.')
                  setSelectedClub(club)
                  setStep(3)
                } catch (e) {
                  setError(e?.message || 'Something went wrong. Try again.')
                } finally {
                  setLoading(false)
                }
              }}
              disabled={loading}
            >
              {loading ? 'Loading…' : "I don't have an association — just my team"}
            </button>
            <button className="c-text-btn" onClick={() => setStep(1)}>← Back</button>
          </>
        )}

        {/* Step 2 — confirm just-selected club (only when NOT pre-keyed; pre-keyed skips this) */}
        {step === 2 && !prekeyedClub && selectedClub && !showCustomClub && (
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
        {step === 2 && !prekeyedClub && showCustomClub && (
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
            {selectedClub && selectedClub.slug !== 'independent' && (
              <div className="c-clubchip">
                <div className="c-clubchip-eyebrow">{selectedClub.governing_body || 'ASSOCIATION'}{selectedClub.city ? ` · ${selectedClub.city}` : ''}</div>
                <div className="c-clubchip-name">{selectedClub.name}</div>
                {!prekeyedClub && (
                  <button className="c-text-btn c-text-btn--inline" onClick={() => { setStep(2); setSelectedClub(null) }}>Change</button>
                )}
              </div>
            )}
            {selectedClub && selectedClub.slug === 'independent' && (
              <div className="c-clubchip">
                <div className="c-clubchip-eyebrow">NO ASSOCIATION</div>
                <div className="c-clubchip-name">Just my team</div>
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

function GoogleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
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
.c-google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: white;
  color: #3c4043;
  border: 1px solid #dadce0;
  border-radius: var(--radius);
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  font-family: var(--font-body);
  cursor: pointer;
  transition: background 0.15s, box-shadow 0.15s;
  margin-bottom: 6px;
}
.c-google-btn:hover { background: #f8f9fa; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
.c-google-btn--hero { padding: 16px 20px; font-size: 16px; margin-bottom: 8px; }
.c-divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  color: var(--text-mute);
  font-size: 12px;
}
.c-divider::before, .c-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-dim);
}
.c-google-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface-raised);
  border: 0.5px solid var(--border-dim);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  color: var(--text-mute);
  margin-bottom: 14px;
  width: fit-content;
}
`
