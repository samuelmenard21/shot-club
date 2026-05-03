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
      const result = await findOrCreateTeam({
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
          <label className="
