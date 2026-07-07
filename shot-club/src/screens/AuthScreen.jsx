import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { signUp, signIn, signInWithGooglePlayer, createPlayerWithGoogleAuth } from '../lib/auth'
import { useAuth } from '../hooks/useAuth'
import {
  getClubBySlug,
  findOrCreateTeamForPlayer,
  searchClubs,
  AGE_DIVISIONS,
  TIERS,
} from '../lib/clubs'
import { setSEO, CANONICAL_URL } from '../lib/seo'

const APP_URL = typeof window !== 'undefined' ? window.location.origin : ''

export default function AuthScreen() {
  const [mode, setMode] = useState('signup')
  const [step, setStep] = useState(1)
  const [signingUpFor, setSigningUpFor] = useState(null) // 'self' | 'player'
  const [path, setPath] = useState(null) // 'club' | 'join' | 'solo'
  const [teamName, setTeamName] = useState('')
  const [clubName, setClubName] = useState('')
  const [preClub, setPreClub] = useState(null) // when arriving from /join/<slug>

  // NEW: pre-keyed team picker state
  const [ageDivision, setAgeDivision] = useState('')
  const [tier, setTier] = useState('')

  const [displayName, setDisplayName] = useState('')
  const [position, setPosition] = useState(null)
  const [ageBracket, setAgeBracket] = useState(null)
  const [username, setUsername] = useState('')
  const [generatedUsername, setGeneratedUsername] = useState('')
  const [generatedTeamName, setGeneratedTeamName] = useState('')
  const [generatedClubName, setGeneratedClubName] = useState('')
  const [copiedWhat, setCopiedWhat] = useState('')
  const [shared, setShared] = useState(false)
  // Join-path club search
  const [joinClub, setJoinClub] = useState(null)
  const [joinClubQuery, setJoinClubQuery] = useState('')
  const [joinClubResults, setJoinClubResults] = useState([])
  const [joinSearching, setJoinSearching] = useState(false)
  const [showFreeText, setShowFreeText] = useState(false)
  const joinClubTimer = useRef(null)

  const [firstName, setFirstName] = useState('')
  const [lifetimeShotGoal, setLifetimeShotGoal] = useState(5000)
  const [stickhandlingHourGoal, setStickhandlingHourGoal] = useState(5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const { player, loading: authLoading, refresh } = useAuth()

  // OAuth return: redirect if already has a profile, else show setup
  const isOAuthReturn = searchParams.get('oauth') === '1'
  useEffect(() => {
    if (isOAuthReturn && !authLoading) {
      if (player) {
        // Player already exists, go to home
        nav('/home', { replace: true })
      } else {
        // Player doesn't exist yet, show profile form on any path
        setMode('create')
      }
    }
  }, [isOAuthReturn, authLoading, player])

  useEffect(() => {
    setSEO({
      title: mode === 'signin' ? 'Sign in' : 'Create your card',
      description: 'Sign up for Hockey Shot Challenge. Free. 30 seconds. No email needed.',
      noindex: true,
    })
  }, [mode])

  // Debounced search for join-path club picker
  useEffect(() => {
    if (joinClubTimer.current) clearTimeout(joinClubTimer.current)
    if (!joinClubQuery.trim() || joinClubQuery.trim().length < 2) {
      setJoinClubResults([])
      setJoinSearching(false)
      return
    }
    setJoinSearching(true)
    joinClubTimer.current = setTimeout(async () => {
      try {
        const results = await searchClubs(joinClubQuery, 6)
        setJoinClubResults(results || [])
      } catch (e) {
        setJoinClubResults([])
      } finally {
        setJoinSearching(false)
      }
    }, 200)
    return () => { if (joinClubTimer.current) clearTimeout(joinClubTimer.current) }
  }, [joinClubQuery])

  // Check for pre-selected club via URL (from /join/:slug redirect)
  useEffect(() => {
    const clubSlug = searchParams.get('club')
    if (!clubSlug) return
    ;(async () => {
      const c = await getClubBySlug(clubSlug)
      if (c) {
        setPreClub(c)
        setPath('club')
        setClubName(c.name)
      }
    })()
  }, [searchParams])

  const choosePath = (p) => {
    setPath(p)
    setError('')
  }

  // Derive age bracket from division so we don't need to ask separately
  function ageBracketFromDivision(div) {
    const n = parseInt((div || '').replace('U', ''), 10)
    if (!n) return null
    if (n <= 10) return '6-10'
    if (n <= 14) return '11-14'
    if (n <= 18) return '15-18'
    return '18+'
  }

  const continueFromStep1 = () => {
    if (!signingUpFor) setSigningUpFor('self')

    // Pre-keyed flow: validate the two-dropdown picker
    if (path === 'club' && preClub) {
      if (!ageDivision) {
        setError('Pick your age division.')
        return
      }
      if (!tier) {
        setError('Pick your tier.')
        return
      }
      setError('')
      setStep(2)
      return
    }

    // Join/solo path with a club selected — need age + tier
    if ((path === 'join' || path === 'solo') && joinClub) {
      if (!ageDivision) { setError('Pick your age division.'); return }
      if (!tier) { setError('Pick your tier.'); return }
      setError('')
      setStep(2)
      return
    }

    // Join path free-text fallback
    if (path === 'join' && !joinClub && !teamName.trim()) {
      setError('Search for your club or enter a team name.')
      return
    }

    setError('')
    setStep(2)
  }

  const saveAndGoogleAuth = async () => {
    if (!firstName.trim()) { setError('Add your first name so your coach knows who you are.'); return }
    if (!displayName.trim() || !position) { setError('Fill in your name and position.'); return }
    const activeClub = (path === 'club' && preClub) ? preClub : joinClub
    if (activeClub && (!ageDivision || !tier)) { setError('Pick your age division and tier.'); return }
    setError('')

    // Save everything to localStorage — picked up after OAuth redirect
    const pending = {
      path: path || 'solo',
      signingUpFor: signingUpFor || 'self',
      clubId: activeClub?.id || null,
      clubName: activeClub?.name || null,
      ageDivision: ageDivision || null,
      tier: tier || null,
      firstName: firstName.trim(),
      displayName: displayName.trim(),
      position,
      ageBracket: ageBracketFromDivision(ageDivision),
      lifetimeShotGoal: Math.max(100, Math.min(50000, lifetimeShotGoal || 5000)),
      stickhandlingHourGoal: Math.max(1, Math.min(100, stickhandlingHourGoal || 5)),
    }
    localStorage.setItem('pendingProfile', JSON.stringify(pending))
    await signInWithGooglePlayer()
  }

  const doSignIn = async () => {
    setLoading(true)
    setError('')
    try {
      await signIn({ username })
      await refresh()
      nav('/home')
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

  // Google OAuth return — auto-create profile from saved localStorage data
  if (isOAuthReturn && !authLoading && !player) {
    const pending = (() => {
      try { return JSON.parse(localStorage.getItem('pendingProfile') || '{}') } catch { return {} }
    })()

    const autoCreate = async () => {
      if (!pending.firstName || !pending.displayName || !pending.position) {
        setError('Something went wrong. Please start over.')
        return
      }
      setLoading(true)
      setError('')
      try {
        let teamIdToUse = null
        if (pending.clubId && pending.ageDivision && pending.tier) {
          const teamResult = await findOrCreateTeamForPlayer({
            clubId: pending.clubId,
            ageDivision: pending.ageDivision,
            tier: pending.tier,
          })
          teamIdToUse = teamResult.teamId
        }
        await createPlayerWithGoogleAuth({
          firstName: pending.firstName,
          displayName: pending.displayName,
          position: pending.position,
          ageBracket: pending.ageBracket,
          teamId: teamIdToUse,
          clubId: pending.clubId,
          clubName: pending.clubName,
          lifetimeShotGoal: pending.lifetimeShotGoal,
          stickhandlingHourGoal: pending.stickhandlingHourGoal,
        })
        localStorage.removeItem('pendingProfile')
        await refresh()
        nav('/home', { replace: true })
      } catch (e) {
        setError(e.message || 'Something went wrong.')
        setLoading(false)
      }
    }

    // If we have pending profile data, auto-create and redirect
    if (pending.firstName && pending.displayName && pending.position && !loading && !error) {
      autoCreate()
      return (
        <div className="auth-wrap">
          <div className="auth-card" style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontFamily: 'var(--font-display)', color: 'var(--text-mute)', letterSpacing: 2, fontSize: 12 }}>
              SETTING UP YOUR CARD…
            </div>
          </div>
          <style>{styles}</style>
        </div>
      )
    }

    // Fallback: no pending data (e.g. they hit Google sign-in without going through the form)
    // Show a minimal setup form
    const finishGoogleSetup = async () => {
      if (!firstName.trim()) { setError('Add your first name.'); return }
      if (!displayName.trim() || !position) { setError('Fill in your name and position.'); return }
      setLoading(true)
      setError('')
      try {
        await createPlayerWithGoogleAuth({
          firstName: firstName.trim(),
          displayName: displayName.trim(),
          position,
          ageBracket: ageBracketFromDivision(ageDivision) || null,
          clubId: joinClub?.id || null,
          clubName: joinClub?.name || null,
        })
        await refresh()
        nav('/home', { replace: true })
      } catch (e) {
        setError(e.message || 'Something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    return (
      <div className="auth-wrap fade-in">
        <div className="auth-card">
          <div className="brand"><BrandLogo /><div className="brand-name">Hockey Shot<br/>Challenge</div></div>
          <h2 className="auth-title">Almost there.</h2>
          <p className="auth-sub">One quick setup and you're in.</p>
          <label className="input-label">
            <span>First name (shown to your coach)</span>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your real first name" className="input-field" autoFocus />
          </label>
          <label className="input-label" style={{ marginTop: 12 }}>
            <span>Player name (on leaderboards)</span>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Same as your name, or a nickname" className="input-field" />
          </label>
          <div className="label-sm" style={{ marginTop: 14 }}>Position</div>
          <div className="chip-row chip-row--3">
            {['F', 'D', 'G'].map((p) => (
              <button key={p} className={`chip chip--big ${position === p ? 'chip--active' : ''}`} onClick={() => setPosition(p)}>
                <div className="chip-letter">{p}</div>
                <div className="chip-sub">{p === 'F' ? 'Forward' : p === 'D' ? 'Defense' : 'Goalie'}</div>
              </button>
            ))}
          </div>
          {error && <div className="error">{error}</div>}
          <button className="btn-primary" onClick={finishGoogleSetup} disabled={!firstName || !displayName || !position || loading}>
            {loading ? 'Setting up…' : 'Make my card →'}
          </button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  // Sign in mode
  if (mode === 'signin') {
    return (
      <div className="auth-wrap fade-in">
        <div className="auth-card">
          <div className="brand">
            <BrandLogo />
            <div className="brand-name">Hockey Shot<br/>Challenge</div>
          </div>
          <h2 className="auth-title">Welcome back.</h2>
          <p className="auth-sub">Sign in with Google, or use your username if you set up an older account.</p>

          <button className="google-btn" onClick={() => signInWithGooglePlayer()} style={{ marginBottom: 16 }}>
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="or-divider">or sign in with username</div>

          <label className="input-label" style={{ marginTop: 8 }}>
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
            {loading ? 'Signing in…' : 'Sign in with username'}
          </button>
          <button className="btn-text" onClick={() => { setMode('signup'); setError('') }}>
            New here? Create a card
          </button>
          <button className="btn-text" onClick={() => nav('/')}>
            ← Back to home
          </button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  // Signup mode
  return (
    <div className="auth-wrap fade-in">
      <div className="auth-card">
        {step === 1 && (
          <>
            <div className="brand">
              <BrandLogo />
              <div className="brand-name">Hockey Shot<br/>Challenge</div>
            </div>

            {preClub ? (
              <>
                <div className="club-banner">
                  <div className="club-banner-label">JOINING</div>
                  <div className="club-banner-name">{preClub.name}</div>
                  {preClub.city && <div className="club-banner-city">{preClub.city}</div>}
                </div>

                <div className="picker-label">PICK YOUR TEAM</div>

                <label className="input-label">
                  <span>Age division</span>
                  <select
                    value={ageDivision}
                    onChange={(e) => setAgeDivision(e.target.value)}
                    className="input-field"
                    autoFocus
                  >
                    <option value="">Pick one</option>
                    {AGE_DIVISIONS.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </label>

                <label className="input-label" style={{ marginTop: 12 }}>
                  <span>Tier</span>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Pick one</option>
                    {TIERS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>

                <div className="path-hint" style={{ marginTop: 10 }}>
                  Not sure? Ask your coach or pick the closest match.
                </div>

                {error && <div className="error" style={{ marginTop: 12 }}>{error}</div>}

                <button
                  className="btn-primary"
                  onClick={continueFromStep1}
                  disabled={!ageDivision || !tier}
                  style={{ marginTop: 16 }}
                >
                  Continue →
                </button>
                <button
                  className="btn-text"
                  onClick={() => {
                    setPreClub(null)
                    setPath(null)
                    setTeamName('')
                    setClubName('')
                    setAgeDivision('')
                    setTier('')
                  }}
                >
                  Sign up without the club
                </button>
              </>
            ) : (
              <>
                <h2 className="auth-title">Let's get you set up.</h2>
                <p className="auth-sub" style={{ marginBottom: 14 }}>Takes 2 minutes. You'll sign in with Google at the end.</p>

                <div className="for-row">
                  <div className="for-label">WHO ARE YOU SIGNING UP?</div>
                  <div className="for-options">
                    <button
                      className={`for-btn ${signingUpFor === 'self' ? 'for-btn--active' : ''}`}
                      onClick={() => { setSigningUpFor('self'); setError('') }}
                    >
                      Myself
                    </button>
                    <button
                      className={`for-btn ${signingUpFor === 'player' ? 'for-btn--active' : ''}`}
                      onClick={() => { setSigningUpFor('player'); setError('') }}
                    >
                      My kid
                    </button>
                  </div>
                  {signingUpFor === 'player' && (
                    <div className="for-parent-note">
                      Your Google account holds the profile. You can add more players later — one account for all your kids.
                    </div>
                  )}
                </div>

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
                      {!joinClub ? (
                        <>
                          <div className="path-hint" style={{ marginBottom: 10 }}>
                            Search for your club to find your team.
                          </div>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="text"
                              value={joinClubQuery}
                              onChange={(e) => setJoinClubQuery(e.target.value)}
                              placeholder="Burlington Eagles, Mississauga…"
                              autoCorrect="off"
                              autoCapitalize="none"
                              spellCheck="false"
                              className="input-field"
                              autoFocus
                            />
                            {joinClubQuery.trim().length >= 2 && (
                              <div className="join-club-dropdown">
                                {joinSearching && <div className="join-club-status">Searching…</div>}
                                {!joinSearching && joinClubResults.length === 0 && (
                                  <div className="join-club-status">No clubs found.</div>
                                )}
                                {joinClubResults.map((c) => (
                                  <button
                                    key={c.id}
                                    className="join-club-result"
                                    onClick={() => { setJoinClub(c); setJoinClubQuery(''); setJoinClubResults([]) }}
                                  >
                                    <span className="join-club-result-name">{c.name}</span>
                                    {c.city && <span className="join-club-result-meta">{c.city}</span>}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          {!showFreeText ? (
                            <button className="btn-text" style={{ marginTop: 6, fontSize: 11 }} onClick={() => setShowFreeText(true)}>
                              My club isn't listed
                            </button>
                          ) : (
                            <>
                              <label className="input-label" style={{ marginTop: 12 }}>
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
                                />
                              </label>
                              <div className="path-hint">Same name as your teammates = same leaderboard.</div>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="join-club-selected">
                            <div className="join-club-selected-name">{joinClub.name}</div>
                            {joinClub.city && <div className="join-club-selected-city">{joinClub.city}</div>}
                            <button className="join-club-change" onClick={() => { setJoinClub(null); setAgeDivision(''); setTier('') }}>Change</button>
                          </div>
                          <label className="input-label" style={{ marginTop: 12 }}>
                            <span>Age division</span>
                            <select value={ageDivision} onChange={(e) => setAgeDivision(e.target.value)} className="input-field">
                              <option value="">Pick one</option>
                              {AGE_DIVISIONS.map((a) => <option key={a} value={a}>{a}</option>)}
                            </select>
                          </label>
                          <label className="input-label" style={{ marginTop: 10 }}>
                            <span>Tier</span>
                            <select value={tier} onChange={(e) => setTier(e.target.value)} className="input-field">
                              <option value="">Pick one</option>
                              {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </label>
                          <div className="path-hint" style={{ marginTop: 6 }}>Not sure? Ask your coach.</div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="or-divider">or</div>

                <div
                  className={`path-card ${path === 'solo' ? 'path-card--active' : ''}`}
                  onClick={() => { if (path !== 'solo') choosePath('solo') }}
                >
                  <div className="path-head">
                    <div className="path-icon">🎯</div>
                    <div>
                      <div className="path-title">No team invite yet</div>
                      <div className="path-sub">Start on your own — you can join a team later</div>
                    </div>
                    <div className={`path-check ${path === 'solo' ? 'path-check--active' : ''}`}>
                      {path === 'solo' ? '✓' : ''}
                    </div>
                  </div>
                  {path === 'solo' && (
                    <div className="path-body" onClick={(e) => e.stopPropagation()}>
                      <div className="path-hint" style={{ marginBottom: 10 }}>
                        Find your club so your stats count on the association leaderboard.
                      </div>
                      {!joinClub ? (
                        <>
                          <div style={{ position: 'relative' }}>
                            <input
                              type="text"
                              value={joinClubQuery}
                              onChange={(e) => setJoinClubQuery(e.target.value)}
                              placeholder="Burlington Eagles, Mississauga…"
                              autoCorrect="off"
                              autoCapitalize="none"
                              spellCheck="false"
                              className="input-field"
                              autoFocus
                            />
                            {joinClubQuery.trim().length >= 2 && (
                              <div className="join-club-dropdown">
                                {joinSearching && <div className="join-club-status">Searching…</div>}
                                {!joinSearching && joinClubResults.length === 0 && (
                                  <div className="join-club-status">No clubs found.</div>
                                )}
                                {joinClubResults.map((c) => (
                                  <button
                                    key={c.id}
                                    className="join-club-result"
                                    onClick={() => { setJoinClub(c); setJoinClubQuery(''); setJoinClubResults([]) }}
                                  >
                                    <span className="join-club-result-name">{c.name}</span>
                                    {c.city && <span className="join-club-result-meta">{c.city}</span>}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          {!showFreeText ? (
                            <button className="btn-text" style={{ marginTop: 6, fontSize: 11 }} onClick={() => setShowFreeText(true)}>
                              My club isn't listed
                            </button>
                          ) : (
                            <div className="path-hint" style={{ marginTop: 8 }}>
                              No problem — your stats will be personal for now. You can link your club later.
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="join-club-selected">
                            <div className="join-club-selected-name">{joinClub.name}</div>
                            {joinClub.city && <div className="join-club-selected-city">{joinClub.city}</div>}
                            <button className="join-club-change" onClick={() => { setJoinClub(null); setAgeDivision(''); setTier('') }}>Change</button>
                          </div>
                          <label className="input-label" style={{ marginTop: 12 }}>
                            <span>Age division</span>
                            <select value={ageDivision} onChange={(e) => setAgeDivision(e.target.value)} className="input-field">
                              <option value="">Pick one</option>
                              {AGE_DIVISIONS.map((a) => <option key={a} value={a}>{a}</option>)}
                            </select>
                          </label>
                          <label className="input-label" style={{ marginTop: 10 }}>
                            <span>Tier</span>
                            <select value={tier} onChange={(e) => setTier(e.target.value)} className="input-field">
                              <option value="">Pick one</option>
                              {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </label>
                          <div className="path-hint" style={{ marginTop: 6 }}>Not sure? Ask your coach.</div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {error && <div className="error" style={{ marginTop: 12 }}>{error}</div>}

                <button className="btn-primary" onClick={continueFromStep1} disabled={!path} style={{ marginTop: 16 }}>
                  Continue →
                </button>

                <button className="btn-text" onClick={() => { setMode('signin'); setError('') }}>
                  Already playing? Sign in
                </button>
                <button className="btn-text" onClick={() => nav('/')}>
                  ← Back to home
                </button>
              </>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <div className="step-chip">Step 2 of 2</div>
            <h2 className="auth-title">{signingUpFor === 'player' ? 'About your player.' : 'Who are you?'}</h2>
            <p className="auth-sub">
              {signingUpFor === 'player'
                ? 'Their coach will see their real name. Their leaderboard name is up to them.'
                : 'Your coach will see your real name. Your leaderboard name is up to you.'}
            </p>

            <label className="input-label">
              <span>{signingUpFor === 'player' ? "Player's first name (shown to their coach)" : 'First name (shown to your coach)'}</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={signingUpFor === 'player' ? "Their real first name" : "Your real first name"}
                className="input-field"
                autoFocus
              />
            </label>

            <label className="input-label" style={{ marginTop: 12 }}>
              <span>{signingUpFor === 'player' ? "Player name (on leaderboards)" : 'Player name (on leaderboards)'}</span>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={signingUpFor === 'player' ? "What do they go by?" : "Same as your name, or a nickname"}
                className="input-field"
              />
            </label>

            <div className="label-sm">{signingUpFor === 'player' ? "Their position" : 'Position'}</div>
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

            <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="label-sm" style={{ marginBottom: 8 }}>What's your shot goal? 🎯</div>
              <div className="label-sm" style={{ fontSize: 12, color: 'var(--text-mute)', marginBottom: 12, fontWeight: 400 }}>
                This is your personal target. You can change it anytime.
              </div>
              <input
                type="number"
                value={lifetimeShotGoal}
                onChange={(e) => setLifetimeShotGoal(Math.max(100, parseInt(e.target.value) || 5000))}
                placeholder="5000"
                className="input-field"
                min="100"
                max="50000"
              />
              <div className="label-sm" style={{ fontSize: 11, color: 'var(--text-mute)', marginTop: 8 }}>
                Stickhandling goal (hours)
              </div>
              <input
                type="number"
                value={stickhandlingHourGoal}
                onChange={(e) => setStickhandlingHourGoal(Math.max(1, parseInt(e.target.value) || 5))}
                placeholder="5"
                className="input-field"
                min="1"
                max="100"
                style={{ marginTop: 6 }}
              />
            </div>

            {error && <div className="error">{error}</div>}

            <button
              className="google-btn"
              onClick={saveAndGoogleAuth}
              disabled={!firstName || !displayName || !position || loading}
              style={{ marginTop: 8 }}
            >
              <GoogleIcon />
              {loading ? 'One sec…' : signingUpFor === 'player' ? 'Save with Google →' : 'Continue with Google →'}
            </button>
            <div className="path-hint" style={{ textAlign: 'center', marginBottom: 4 }}>
              {signingUpFor === 'player' ? 'Your Google account. Their player profile.' : 'No password. Google keeps your account safe.'}
            </div>

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
              {generatedClubName && (
                <div className="club-joined">
                  On {generatedClubName}{generatedTeamName ? ` · ${generatedTeamName}` : ''}
                </div>
              )}
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

            <div className="save-tips">Text it to a parent so they have it too.</div>

            {generatedTeamName && !preClub && (
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

            {preClub && generatedTeamName && (
              <div className="invite-card">
                <div className="invite-top">
                  <div className="invite-label">YOUR TEAM</div>
                  <div className="invite-team-name">{generatedTeamName}</div>
                </div>
                <div className="invite-hint">
                  Tell your teammates the age & tier so they can join you.
                </div>
              </div>
            )}

            <button className="btn-primary" onClick={() => nav('/home')}>
              Got it — let's shoot 🏒
            </button>
          </>
        )}
      </div>
      <style>{styles}</style>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
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
  width: 100%; max-width: none;
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
  font-size: 12px; color: var(--text-mute);
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

.club-banner {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
  border-radius: var(--radius);
  padding: 14px;
  margin-bottom: 18px;
  text-align: center;
}
.club-banner-label {
  font-size: 12px; color: var(--text-mute);
  letter-spacing: 2px; text-transform: uppercase;
  font-weight: 500;
}
.club-banner-name {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  color: var(--ice);
  margin-top: 4px;
  letter-spacing: 0.5px;
  line-height: 1;
}
.club-banner-city {
  font-size: 12px; color: var(--text-mute);
  margin-top: 4px;
}

.picker-label {
  font-size: 13px; color: #8899b4;
  letter-spacing: 1px; text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 10px;
}

.input-label { display: block; margin-bottom: 4px; }
.input-label > span {
  display: block;
  font-size: 13px; color: #8899b4;
  letter-spacing: 0.5px; text-transform: uppercase;
  margin-bottom: 8px; font-weight: 600;
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
  font-family: inherit;
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
.input-field--code::placeholder { letter-spacing: 2px; }

.path-card {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 14px;
  cursor: pointer;
  transition: all 0.15s;
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
  letter-spacing: 0.4px; line-height: 1.1;
}
.path-sub {
  font-size: 12px; color: var(--text-mute);
  margin-top: 2px;
}
.path-check {
  margin-left: auto;
  width: 24px; height: 24px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  color: var(--text);
  font-size: 13px; font-weight: 700;
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
  font-size: 13px; color: #8899b4;
  line-height: 1.4; margin-top: 6px;
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
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
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
.club-joined {
  font-size: 13px;
  color: var(--ice);
  margin-top: 6px;
  letter-spacing: 0.3px;
}
.screenshot-hero {
  background: linear-gradient(135deg, rgba(41, 121, 255, 0.15), rgba(168, 212, 245, 0.08));
  border: 1px solid rgba(41, 121, 255, 0.4);
  border-radius: var(--radius);
  padding: 16px;
  text-align: center;
  margin-bottom: 14px;
}
.screenshot-icon { font-size: 36px; line-height: 1; margin-bottom: 6px; }
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
  font-size: 12px; color: var(--text-mute);
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
  font-size: 12px; color: var(--text-mute);
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
}

.for-row {
  margin-bottom: 18px;
}
.for-label {
  font-size: 13px; color: #8899b4;
  letter-spacing: 1.5px; text-transform: uppercase;
  font-weight: 600; margin-bottom: 8px;
}
.for-options {
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
}
.for-btn {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 12px 8px;
  color: var(--text-mute);
  font-size: 14px; font-weight: 600;
  text-align: center;
  transition: all 0.15s;
  font-family: inherit;
}
.for-btn--active {
  background: var(--surface-raised);
  border-color: var(--accent);
  color: white;
}
.for-parent-note {
  margin-top: 10px;
  font-size: 12px;
  color: var(--ice);
  line-height: 1.5;
  background: rgba(168,212,245,0.07);
  border: 0.5px solid rgba(168,212,245,0.2);
  border-radius: var(--radius);
  padding: 10px 12px;
}

.google-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  background: white;
  color: #3c4043;
  border: 1px solid #dadce0;
  border-radius: var(--radius);
  padding: 12px 14px;
  font-size: 14px; font-weight: 500;
  margin-bottom: 8px;
  transition: background 0.15s;
  font-family: inherit;
}
.google-btn:hover { background: #f8f9fa; }

.join-club-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  z-index: 30;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
  overflow: hidden;
}
.join-club-result {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 10px 14px;
  border-bottom: 0.5px solid var(--border-dim);
  text-align: left;
  transition: background 0.1s;
}
.join-club-result:last-child { border-bottom: none; }
.join-club-result:hover { background: var(--bg); }
.join-club-result-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  color: white;
}
.join-club-result-meta { font-size: 11px; color: var(--text-mute); margin-top: 1px; }
.join-club-status {
  padding: 12px 14px;
  font-size: 12px;
  color: var(--text-mute);
  text-align: center;
}
.join-club-selected {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
  border-radius: var(--radius);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.join-club-selected-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  color: white;
  flex: 1;
}
.join-club-selected-city { font-size: 11px; color: var(--text-mute); }
.join-club-change {
  background: transparent;
  color: var(--accent);
  font-size: 11px;
  font-weight: 600;
  padding: 0;
  flex-shrink: 0;
}

.label-sm {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 500;
  margin: 14px 0 6px;
}
`
