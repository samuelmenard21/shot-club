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

  // If a coach is already signed in, send them to the dashboard
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const profile = await getMyCoachProfile()
        if (cancelled) return
        if (profile) {
          nav('/coach/dashboard', { replace: true })
        }
      } catch (e) {
        // Not signed in or no coach profile — fine, stay on the page
      }
    })()
    return () => { cancelled = true }
  }, [nav])

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

  const handleAccountNext = () => {
    setError('')
    if (!displayName.trim()) return setError('Enter your name.')
    if (!email.trim() || !email.includes('@')) return setError('Enter a valid email.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    // If a club is already pre-keyed, skip step 2 and jump straight to team setup
    if (prekeyedClub && selectedClub) {
      setStep(3)
    } else {
      setStep(2)
    }
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

      // 2) Create the coach profile (the auth session is now active)
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
          <button className="c-text-btn" onClick={() => nav('/')}>← Back to home</button>
        </div>
        <style>{styles}</style>
      </div>
    )
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
  // Pre-keyed slugs jump directly to signup mode and skip step 2 entirely.
  // The signup flow with prekeyedClub: step 1 (account) → step 3 (team).
  // The signup flow without prekey: step 1 (account) → step 2 (find club) → step 3 (team).
  return (
    <div className="coach-wrap c-centered">
      <div className="c-card">
        <div className="c-card-brand">
          <BrandMark />
          <span>Coach setup · Step {step} of {prekeyedClub ? 2 : 3}</span>
        </div>

        {/* Step 1 — account */}
        {step === 1 && (
          <>
            {selectedClub && (
              <div className="c-clubchip">
                <div className="c-clubchip-eyebrow">{selectedClub.governing_body || 'ASSOCIATION'}{selectedClub.city ? ` · ${selectedClub.city}` : ''}</div>
                <div className="c-clubchip-name">{selectedClub.name}</div>
              </div>
            )}
            <h2 className="c-card-title">{selectedClub ? `Coach signup` : 'Create your account.'}</h2>
            <p className="c-card-sub">
              {selectedClub
                ? `Create your coach account for ${selectedClub.name}. We'll set up your team next.`
                : "We'll use your email to send your weekly recap."}
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
            </lab
