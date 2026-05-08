import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { signUp, signIn } from '../lib/auth'
import { useAuth } from '../hooks/useAuth'
import {
  getClubBySlug,
  searchClubs,
  getTeamsInClub,
  findOrCreateTeamForPlayer,
  AGE_DIVISIONS,
  TIERS,
} from '../lib/clubs'
import { getTeamInviteByCode } from '../lib/teams'
import { setSEO } from '../lib/seo'

const APP_URL = typeof window !== 'undefined' ? window.location.origin : ''
const SEARCH_DEBOUNCE_MS = 220

export default function AuthScreen() {
  const [mode, setMode] = useState('signup')
  const [step, setStep] = useState(1)

  // Step-1 state
  const [pendingInvite, setPendingInvite] = useState(null)
  const [preClub, setPreClub] = useState(null)
  const [teamName, setTeamName] = useState('')                // preClub flow only
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [pickedClub, setPickedClub] = useState(null)

  // Step-1.5 (team picker) state — used after a club is picked from search
  const [teamsLoading, setTeamsLoading] = useState(false)
  const [teamsList, setTeamsList] = useState([])
  const [pickedTeam, setPickedTeam] = useState(null)
  const [showCreateTeam, setShowCreateTeam] = useState(false)
  const [newTeamAge, setNewTeamAge] = useState('')
  const [newTeamTier, setNewTeamTier] = useState('')

  // Step-2 state
  const [displayName, setDisplayName] = useState('')
  const [position, setPosition] = useState(null)
  const [ageBracket, setAgeBracket] = useState(null)

  // Step-3 / sign-in
  const [username, setUsername] = useState('')
  const [generatedUsername, setGeneratedUsername] = useState('')
  const [generatedTeamName, setGeneratedTeamName] = useState('')
  const [generatedClubName, setGeneratedClubName] = useState('')
  const [copiedWhat, setCopiedWhat] = useState('')
  const [shared, setShared] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const { refresh } = useAuth()
  const debounceRef = useRef(null)

  useEffect(() => {
    setSEO({
      title: mode === 'signin' ? 'Sign in' : 'Create your card',
      description: 'Sign up for Hockey Shot Challenge. Free. 30 seconds. No email needed.',
      noindex: true,
    })
  }, [mode])

  // /j/<code> redirect — read sessionStorage
  useEffect(() => {
    let pendingCode = null
    try {
      pendingCode = sessionStorage.getItem('pending_team_invite')
    } catch (e) {}
    if (!pendingCode) return
    ;(async () => {
      try {
        const inv = await getTeamInviteByCode(pendingCode)
        if (!inv) return
        if (inv.expires_at && new Date(inv.expires_at) < new Date()) return
        if (inv.max_uses && inv.uses_count >= inv.max_uses) return
        setPendingInvite(inv)
      } catch (e) {}
    })()
  }, [])

  // /start?club=<slug> deep link
  useEffect(() => {
    const clubSlug = searchParams.get('club')
    if (!clubSlug) return
    ;(async () => {
      const c = await getClubBySlug(clubSlug)
      if (c) setPreClub(c)
    })()
  }, [searchParams])

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([])
      setSearchLoading(false)
      setHasSearched(false)
      return
    }
    setSearchLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchClubs(searchQuery, 8)
        setSearchResults(results)
        setHasSearched(true)
      } catch (e) {
        setSearchResults([])
      } finally {
        setSearchLoading(false)
      }
    }, SEARCH_DEBOUNCE_MS)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [searchQuery])

  // Load teams when entering the team picker (step 1.5)
  useEffect(() => {
    if (step !== 1 || !pickedClub || pickedClub.isIndependent) return
    if (teamsList.length > 0) return // already loaded
    ;(async () => {
      setTeamsLoading(true)
      try {
        const teams = await getTeamsInClub(pickedClub.id)
        setTeamsList(teams)
      } catch (e) {
        setTeamsList([])
      } finally {
        setTeamsLoading(false)
      }
    })()
  }, [step, pickedClub])

  // ---- Step transitions ----

  const continueFromInviteIntro = () => {
    setError('')
    setStep(2)
  }

  const continueFromPreClub = () => {
    if (!teamName.trim()) {
      setError('Enter your team name within this club.')
      return
    }
    setError('')
    setStep(2)
  }

  const continueFromClubPick = () => {
    if (!pickedClub) {
      setError("Pick your club, or tap \"My club isn't listed\".")
      return
    }
    setError('')
    // The team picker becomes visible because pickedClub is now set.
  }

  const pickIndependent = () => {
    setPickedClub({ id: null, slug: 'independent', name: 'Independent', isIndependent: true })
    setError('')
    setStep(2) // Independent skips the team picker
  }

  const pickExistingTeam = (team) => {
    setPickedTeam(team)
    setShowCreateTeam(false)
    setError('')
  }

  const continueFromTeamPick = () => {
    if (!pickedTeam) {
      setError('Pick a team or create one.')
      return
    }
    setError('')
    setStep(2)
  }

  const skipTeam = () => {
    setPickedTeam(null)
    setError('')
    setStep(2)
  }

  const openCreateTeam = () => {
    setShowCreateTeam(true)
    setPickedTeam(null)
    setError('')
  }

  const cancelCreateTeam = () => {
    setShowCreateTeam(false)
    setNewTeamAge('')
    setNewTeamTier('')
    setError('')
  }

  const backToClubPick = () => {
    setPickedClub(null)
    setPickedTeam(null)
    setShowCreateTeam(false)
    setNewTeamAge('')
    setNewTeamTier('')
    setTeamsList([])
    setError('')
  }

  // ---- Submit ----

  const finishSignup = async () => {
    if (!displayName.trim() || !position || !ageBracket) {
      setError('Pick a name, position, and age.')
      return
    }
    setLoading(true)
    setError('')
    try {
      let teamToUse = null
      let clubNameToUse = null
      let clubIdToUse = null
      let teamIdToUse = null
      let teamInviteCode = null

      if (pendingInvite) {
        teamInviteCode = pendingInvite.code
        clubNameToUse = pendingInvite.team?.club?.name || null
      } else if (preClub) {
        teamToUse = teamName.trim().toUpperCase()
        clubIdToUse = preClub.id
        clubNameToUse = preClub.name
      } else if (pickedClub?.isIndependent) {
        const indep = await getClubBySlug('independent')
        clubIdToUse = indep?.id || null
        clubNameToUse = 'Independent'
      } else if (pickedClub) {
        clubIdToUse = pickedClub.id
        clubNameToUse = pickedClub.name

        if (showCreateTeam && newTeamAge && newTeamTier) {
          const result = await findOrCreateTeamForPlayer({
            clubId: pickedClub.id,
            ageDivision: newTeamAge,
            tier: newTeamTier,
          })
          teamIdToUse = result.teamId
        } else if (pickedTeam) {
          teamIdToUse = pickedTeam.id
        }
      }

      const { username, attachedTeam } = await signUp({
        displayName: displayName.trim(),
        position,
        ageBracket,
        teamName: teamToUse,
        clubName: clubNameToUse,
        clubId: clubIdToUse,
        teamId: teamIdToUse,
        teamInviteCode,
      })

      if (pendingInvite) {
        try { sessionStorage.removeItem('pending_team_invite') } catch (e) {}
      }

      setGeneratedUsername(username)

      if (attachedTeam) {
        const team = pendingInvite?.team
        const teamLabel = team
          ? `${team.age_division || ''} ${team.tier || ''}`.trim()
          : (attachedTeam.teamName || '')
        setGeneratedTeamName(teamLabel)
        setGeneratedClubName(attachedTeam.clubName || pendingInvite?.team?.club?.name || '')
      } else if (pendingInvite) {
        const team = pendingInvite.team
        const teamLabel = team
          ? `${team.age_division || ''} ${team.tier || ''}`.trim()
          : ''
        setGeneratedTeamName(teamLabel)
        setGeneratedClubName(pendingInvite.team?.club?.name || '')
      } else if (preClub) {
        setGeneratedTeamName(teamToUse || '')
        setGeneratedClubName(preClub.name)
      } else if (pickedClub) {
        let teamLabel = ''
        if (showCreateTeam && newTeamAge && newTeamTier) {
          teamLabel = `${newTeamAge} ${newTeamTier}`
        } else if (pickedTeam) {
          teamLabel = `${pickedTeam.age_division || ''} ${pickedTeam.tier || ''}`.trim()
        }
        setGeneratedTeamName(teamLabel)
        setGeneratedClubName(pickedClub.isIndependent ? '' : pickedClub.name)
      }

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

  // ============================================================
  // Sign-in mode
  // ============================================================
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
          <button className="btn-text" onClick={() => nav('/')}>
            ← Back to home
          </button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  // ============================================================
  // Signup mode
  // ============================================================

  const showTeamPicker = step === 1 && pickedClub && !pickedClub.isIndependent && !pendingInvite && !preClub

  return (
    <div className="auth-wrap fade-in">
      <div className="auth-card">

        {step === 1 && (
          <>
            <div className="brand">
              <BrandLogo />
              <div className="brand-name">Hockey Shot<br/>Challenge</div>
            </div>

            {pendingInvite ? (
              /* MODE 1: Invite link from a coach */
              <>
                <div className="club-banner">
                  <div className="club-banner-label">YOU'RE INVITED</div>
                  <div className="club-banner-name">{pendingInvite.team?.club?.name || 'Your team'}</div>
                  <div className="club-banner-city">
                    {[pendingInvite.team?.age_division, pendingInvite.team?.tier].filter(Boolean).join(' ')}
                    {pendingInvite.team?.club?.city ? ` · ${pendingInvite.team.club.city}` : ''}
                  </div>
                </div>
                <p className="auth-sub" style={{ textAlign: 'center', marginBottom: 16 }}>
                  Let's set up your card so you can start tracking shots.
                </p>
                <button className="btn-primary" onClick={continueFromInviteIntro}>
                  Continue →
                </button>
                <button className="btn-text" onClick={() => setMode('signin')}>
                  Already playing? Sign in
                </button>
              </>
            ) : preClub ? (
              /* MODE 2: Club deep link */
              <>
                <div className="club-banner">
                  <div className="club-banner-label">JOINING</div>
                  <div className="club-banner-name">{preClub.name}</div>
                  {preClub.city && <div className="club-banner-city">{preClub.city}</div>}
                </div>
                <label className="input-label">
                  <span>What's your team within this club?</span>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value.toUpperCase())}
                    placeholder="e.g. U14 A, BANTAM-A1"
                    autoCapitalize="characters"
                    autoCorrect="off"
                    spellCheck="false"
                    className="input-field input-field--code"
                    autoFocus
                  />
                </label>
                <div className="path-hint">
                  Ask your coach or a teammate if you're not sure.
                </div>
                {error && <div className="error" style={{ marginTop: 12 }}>{error}</div>}
                <button className="btn-primary" onClick={continueFromPreClub} disabled={!teamName.trim()} style={{ marginTop: 16 }}>
                  Continue →
                </button>
                <button className="btn-text" onClick={() => setPreClub(null)}>
                  Sign up without the club
                </button>
              </>
            ) : showTeamPicker ? (
              /* MODE 3.5: Team picker — after picking a club from search */
              <TeamPicker
                club={pickedClub}
                teamsList={teamsList}
                teamsLoading={teamsLoading}
                pickedTeam={pickedTeam}
                showCreateTeam={showCreateTeam}
                newTeamAge={newTeamAge}
                newTeamTier={newTeamTier}
                error={error}
                onPickTeam={pickExistingTeam}
                onOpenCreate={openCreateTeam}
                onCancelCreate={cancelCreateTeam}
                setNewTeamAge={setNewTeamAge}
                setNewTeamTier={setNewTeamTier}
                onContinueExisting={continueFromTeamPick}
                onSkip={skipTeam}
                onCreateAndContinue={() => {
                  if (!newTeamAge || !newTeamTier) {
                    setError('Pick an age and a tier.')
                    return
                  }
                  setError('')
                  setStep(2)
                }}
                onBack={backToClubPick}
              />
            ) : (
              /* MODE 3: Search-from-home */
              <>
                <h2 className="auth-title">Track every shot.<br/>Climb the rankings.</h2>
                <p className="auth-sub">Find your club to get started.</p>

                <div className="search-wrap">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setPickedClub(null)
                      setError('')
                    }}
                    placeholder="Search for your hockey club…"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    className="input-field search-field"
                    autoFocus
                  />
                  <SearchIcon />
                </div>

                {searchQuery.trim().length >= 2 && (
                  <div className="results">
                    {searchLoading && <div className="results-empty">Searching…</div>}
                    {!searchLoading && hasSearched && searchResults.length === 0 && (
                      <div className="results-empty">No clubs found for "{searchQuery.trim()}".</div>
                    )}
                    {!searchLoading && searchResults.map((club) => {
                      const isPicked = pickedClub?.id === club.id
                      return (
                        <button
                          key={club.id}
                          className={`result-card ${isPicked ? 'result-card--picked' : ''}`}
                          onClick={() => { setPickedClub(club); setError('') }}
                        >
                          <div className="result-main">
                            <div className="result-name">{club.name}</div>
                            <div className="result-sub">
                              {club.city ? club.city : ''}
                              {club.governing_body ? ` · ${club.governing_body}` : ''}
                            </div>
                          </div>
                          {club.player_count > 0 && (
                            <div className="result-count">
                              <span className="result-count-num">{club.player_count}</span>
                              <span className="result-count-label">{club.player_count === 1 ? 'player' : 'players'}</span>
                            </div>
                          )}
                          {isPicked && <div className="result-check">✓</div>}
                        </button>
                      )
                    })}
                  </div>
                )}

                <button className="independent-btn" onClick={pickIndependent}>
                  <div className="independent-icon">🎯</div>
                  <div>
                    <div className="independent-title">My club isn't listed</div>
                    <div className="independent-sub">Sign up as Independent — you can join a team later.</div>
                  </div>
                </button>

                {error && <div className="error" style={{ marginTop: 12 }}>{error}</div>}

                <button
                  className="btn-primary"
                  onClick={continueFromClubPick}
                  disabled={!pickedClub || pickedClub?.isIndependent}
                  style={{ marginTop: 12 }}
                >
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

            {generatedTeamName && !preClub && !pendingInvite && (
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

function TeamPicker({
  club,
  teamsList,
  teamsLoading,
  pickedTeam,
  showCreateTeam,
  newTeamAge,
  newTeamTier,
  error,
  onPickTeam,
  onOpenCreate,
  onCancelCreate,
  setNewTeamAge,
  setNewTeamTier,
  onContinueExisting,
  onSkip,
  onCreateAndContinue,
  onBack,
}) {
  return (
    <>
      <div className="club-banner">
        <div className="club-banner-label">YOUR CLUB</div>
        <div className="club-banner-name">{club.name}</div>
        {club.city && <div className="club-banner-city">{club.city}</div>}
      </div>
      <h3 className="picker-title">Pick your team</h3>
      <p className="auth-sub" style={{ marginBottom: 12 }}>
        So your stats line up on the team leaderboard.
      </p>

      {showCreateTeam ? (
        <>
          <div className="create-team-form">
            <div className="label-sm">Age</div>
            <div className="dropdown-grid">
              {AGE_DIVISIONS.map((a) => (
                <button
                  key={a}
                  className={`mini-chip ${newTeamAge === a ? 'mini-chip--active' : ''}`}
                  onClick={() => setNewTeamAge(a)}
                >
                  {a}
                </button>
              ))}
            </div>

            <div className="label-sm">Tier</div>
            <div className="chip-row chip-row--5">
              {TIERS.map((t) => (
                <button
                  key={t}
                  className={`chip ${newTeamTier === t ? 'chip--active' : ''}`}
                  onClick={() => setNewTeamTier(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {error && <div className="error">{error}</div>}

          <button
            className="btn-primary"
            onClick={onCreateAndContinue}
            disabled={!newTeamAge || !newTeamTier}
          >
            Create team →
          </button>
          <button className="btn-text" onClick={onCancelCreate}>
            ← Pick from list instead
          </button>
        </>
      ) : (
        <>
          {teamsLoading && (
            <div className="results-empty">Loading teams…</div>
          )}
          {!teamsLoading && teamsList.length === 0 && (
            <div className="empty-teams-hint">
              No teams yet at {club.name}. Create yours below — your teammates can join after.
            </div>
          )}
          {!teamsLoading && teamsList.length > 0 && (
            <div className="results">
              {teamsList.map((team) => {
                const isPicked = pickedTeam?.id === team.id
                const label = `${team.age_division || ''} ${team.tier || ''}`.trim() || team.name
                return (
                  <button
                    key={team.id}
                    className={`result-card ${isPicked ? 'result-card--picked' : ''}`}
                    onClick={() => onPickTeam(team)}
                  >
                    <div className="result-main">
                      <div className="result-name">{label}</div>
                      <div className="result-sub">
                        {team.season ? `${team.season}` : ''}
                      </div>
                    </div>
                    {team.player_count > 0 && (
                      <div className="result-count">
                        <span className="result-count-num">{team.player_count}</span>
                        <span className="result-count-label">{team.player_count === 1 ? 'player' : 'players'}</span>
                      </div>
                    )}
                    {isPicked && <div className="result-check">✓</div>}
                  </button>
                )
              })}
            </div>
          )}

          <button className="independent-btn" onClick={onOpenCreate}>
            <div className="independent-icon">➕</div>
            <div>
              <div className="independent-title">Create a new team</div>
              <div className="independent-sub">Pick your age + tier — first kid creates it.</div>
            </div>
          </button>

          {error && <div className="error" style={{ marginTop: 12 }}>{error}</div>}

          <button
            className="btn-primary"
            onClick={onContinueExisting}
            disabled={!pickedTeam}
            style={{ marginTop: 12 }}
          >
            Continue →
          </button>

          <button className="btn-text" onClick={onSkip}>
            I'll join my team later
          </button>
          <button className="btn-text" onClick={onBack}>
            ← Pick a different club
          </button>
        </>
      )}
    </>
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

function SearchIcon() {
  return (
    <svg className="search-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 12 L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
.picker-title {
  font-family: var(--font-display);
  font-size: 20px; line-height: 1.1;
  margin: 0 0 4px; font-weight: 700;
  letter-spacing: 0.3px;
  color: white;
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
  font-size: 10px; color: var(--text-mute);
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
.input-field--code::placeholder { letter-spacing: 2px; }

.search-wrap {
  position: relative;
  margin-bottom: 12px;
}
.search-field { padding-right: 40px; }
.search-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-mute);
  pointer-events: none;
}

.results {
  display: flex; flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
  max-height: 320px;
  overflow-y: auto;
}
.results-empty {
  text-align: center;
  font-size: 13px;
  color: var(--text-mute);
  padding: 14px 0;
}
.empty-teams-hint {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 12px 14px;
  font-size: 12px;
  color: var(--text-soft);
  line-height: 1.4;
  margin-bottom: 12px;
  text-align: center;
}
.result-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 12px 14px;
  text-align: left;
  transition: all 0.15s;
  font-family: inherit;
  width: 100%;
}
.result-card:hover, .result-card:active {
  border-color: var(--accent);
  background: var(--surface-raised);
}
.result-card--picked {
  background: var(--surface-raised);
  border-color: var(--accent);
}
.result-main { flex: 1; min-width: 0; }
.result-name {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 800;
  color: var(--ice);
  letter-spacing: 0.3px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.result-sub {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.result-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--accent-bg);
  padding: 4px 10px;
  border-radius: 10px;
  flex-shrink: 0;
}
.result-count-num {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 800;
  color: var(--ice);
  line-height: 1;
}
.result-count-label {
  font-size: 9px;
  color: var(--text-mute);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 2px;
}
.result-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.independent-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  background: var(--bg);
  border: 0.5px dashed var(--border);
  border-radius: var(--radius);
  padding: 12px 14px;
  text-align: left;
  margin-top: 4px;
  transition: all 0.15s;
  font-family: inherit;
}
.independent-btn:hover, .independent-btn:active {
  border-color: var(--accent);
  background: var(--surface-raised);
}
.independent-icon {
  width: 36px; height: 36px;
  font-size: 18px;
  background: var(--accent-bg);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.independent-title {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 800;
  letter-spacing: 0.3px;
  color: var(--ice);
}
.independent-sub {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 2px;
  line-height: 1.3;
}

.path-hint {
  font-size: 11px; color: var(--text-mute);
  line-height: 1.4; margin-top: 6px;
}

.create-team-form { margin-bottom: 12px; }
.dropdown-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  margin-bottom: 14px;
}
.mini-chip {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: 8px;
  padding: 8px 4px;
  color: var(--ice);
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-display);
  letter-spacing: 0.4px;
  transition: all 0.15s;
  text-align: center;
}
.mini-chip:hover, .mini-chip:active { border-color: var(--accent); }
.mini-chip--active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}

.chip-row { display: grid; gap: 6px; margin-bottom: 16px; }
.chip-row--3 { grid-template-columns: repeat(3, 1fr); }
.chip-row--4 { grid-template-columns: repeat(2, 1fr); }
.chip-row--5 { grid-template-columns: repeat(5, 1fr); }
.chip {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 10px 6px;
  color: var(--ice);
  font-size: 12px; text-align: center;
  transition: all 0.15s;
  font-weight: 600;
  letter-spacing: 0.3px;
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
.btn-primary:disabled { opacity: 0.5; }
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
}
`
