import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { signUp, signIn } from '../lib/auth'
import { useAuth } from '../hooks/useAuth'
import { getClubBySlug } from '../lib/clubs'
import { getTeamInviteByCode } from '../lib/teams'
import { setSEO, CANONICAL_URL } from '../lib/seo'

const APP_URL = typeof window !== 'undefined' ? window.location.origin : ''

export default function AuthScreen() {
  const [mode, setMode] = useState('signup')
  const [step, setStep] = useState(1)
  const [path, setPath] = useState(null)
  const [teamName, setTeamName] = useState('')
  const [clubName, setClubName] = useState('')
  const [preClub, setPreClub] = useState(null)
  const [preTeamInvite, setPreTeamInvite] = useState(null)
  const [preTeamInviteCode, setPreTeamInviteCode] = useState(null)
  const [displayName, setDisplayName] = useState('')
  const [position, setPosition] = useState(null)
  const [ageBracket, setAgeBracket] = useState(null)
  const [username, setUsername] = useState('')
  const [generatedUsername, setGeneratedUsername] = useState('')
  const [generatedTeamName, setGeneratedTeamName] = useState('')
  const [generatedClubName, setGeneratedClubName] = useState('')
  const [attachedTeamLabel, setAttachedTeamLabel] = useState('')
  const [copiedWhat, setCopiedWhat] = useState('')
  const [shared, setShared] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const { refresh } = useAuth()

  useEffect(() => {
    setSEO({
      title: mode === 'signin' ? 'Sign in' : 'Create your card',
      description: 'Sign up for Hockey Shot Challenge. Free. 30 seconds. No email needed.',
      noindex: true,
    })
  }, [mode])

  useEffect(() => {
    let stashed = null
    try {
      stashed = sessionStorage.getItem('pending_team_invite')
    } catch (e) {}
    if (!stashed) return
    ;(async () => {
      const inv = await getTeamInviteByCode(stashed)
      if (!inv) {
        try { sessionStorage.removeItem('pending_team_invite') } catch (e) {}
        return
      }
      setPreTeamInvite(inv)
      setPreTeamInviteCode(stashed)
      setPath('team-invite')
    })()
  }, [])

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

  const continueFromStep1 = () => {
    if (path === 'join' && !teamName.trim()) {
      setError('Type a team name to join.')
      return
    }
    if (path === 'club' && preClub && !teamName.trim()) {
      setError('Enter your team name within this club.')
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
      let teamToUse = null
      let clubToUse = null

      if (path === 'team-invite' && preTeamInviteCode) {
        teamToUse = null
        clubToUse = null
      } else if (path === 'club' && preClub) {
        teamToUse = teamName.trim() ? teamName.trim().toUpperCase() : null
        clubToUse = preClub.name
      } else if (path === 'join') {
        teamToUse = teamName.trim().toUpperCase()
        clubToUse = clubName.trim() || null
      }

      const result = await signUp({
        displayName: displayName.trim(),
        position,
        ageBracket,
        teamName: teamToUse,
        clubName: clubToUse,
        teamInviteCode: path === 'team-invite' ? preTeamInviteCode : null,
      })

      setGeneratedUsername(result.username)
      setGeneratedTeamName(teamToUse || '')
      setGeneratedClubName(clubToUse || '')

      if (result.attachedTeam) {
        const team = result.attachedTeam
        setAttachedTeamLabel(`${team.clubName}${team.teamName ? ' · ' + team.teamName : ''}`)
        setGeneratedClubName(team.clubName || '')
      }

      try { sessionStorage.removeItem('pending_team_invite') } catch (e) {}

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

  return (
    <div className="auth-wrap fade-in">
      <div className="auth-card">
        {step === 1 && (
          <>
            <div className="brand">
              <BrandLogo />
              <div className="brand-name">Hockey Shot<br/>Challenge</div>
            </div>

            {preTeamInvite && (
              <>
                <div className="club-banner">
                  <div className="club-banner-label">JOINING TEAM</div>
                  <div className="club-banner-name">{preTeamInvite.team?.club?.name}</div>
                  <div className="club-banner-team">
                    {preTeamInvite.team?.age_division} {preTeamInvite.team?.tier}
                  </div>
                  {preTeamInvite.team?.club?.city && (
                    <div className="club-banner-city">{preTeamInvite.team.club.city}</div>
                  )}
                </div>
                <p className="auth-sub" style={{ textAlign: 'center' }}>
                  Just need a few quick details and you're on the team.
                </p>

                <button className="btn-primary" onClick={() => setStep(2)} style={{ marginTop: 16 }}>
                  Continue →
                </button>
                <button className="btn-text" onClick={() => {
                  setPreTeamInvite(null)
                  setPreTeamInviteCode(null)
                  setPath(null)
                  try { sessionStorage.removeItem('pending_team_invite') } catch (e) {}
                }}>
                  Sign up without joining the team
                </button>
              </>
            )}

            {!preTeamInvite && preClub && (
              <>
