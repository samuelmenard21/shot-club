import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { createPlayerWithGoogleAuth } from '../lib/auth'
import { useAuth } from '../hooks/useAuth'
import { setSEO } from '../lib/seo'
import { applyPendingChallenge, stashPendingChallenge } from '../lib/challenges'

export default function AuthScreen() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const { player, loading: authLoading, refresh } = useAuth()

  const isOAuthReturn = searchParams.get('oauth') === '1'

  useEffect(() => {
    stashPendingChallenge(searchParams.get('challenge'))
  }, [searchParams])

  useEffect(() => {
    if (isOAuthReturn && !authLoading) {
      if (player) {
        applyPendingChallenge(player.id).finally(() => nav('/home', { replace: true }))
      }
    }
  }, [isOAuthReturn, authLoading, player])

  useEffect(() => {
    setSEO({
      title: 'Sign in',
      description: 'Track your hockey shots. Free. 30 seconds. No email needed.',
      noindex: true,
    })
  }, [])

  // Google OAuth return - auto-create minimal profile
  if (isOAuthReturn && !authLoading && !player) {
    const autoCreate = async () => {
      setLoading(true)
      try {
        const { playerId } = await createPlayerWithGoogleAuth({
          firstName: 'Player',
          displayName: 'Player',
          position: 'F',
        })
        await applyPendingChallenge(playerId)
        localStorage.removeItem('pendingProfile')
        await refresh()
        nav('/home', { replace: true })
      } catch (e) {
        setError(e.message || 'Something went wrong.')
        setLoading(false)
      }
    }

    if (!loading && !error) {
      autoCreate()
    }

    return (
      <div className="auth-wrap">
        <div className="auth-card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontFamily: 'var(--font-display)', color: 'var(--text-mute)', letterSpacing: 2, fontSize: 12 }}>
            SETTING UP YOUR PROFILE…
          </div>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  // Single login screen for everyone
  return (
    <div className="auth-wrap fade-in">
      <div style={{ maxWidth: 420, margin: '0 auto', width: '100%' }}>
        <div className="auth-card">
          <div className="brand">
            <BrandLogo />
            <div className="brand-name">Hockey Shot<br/>Challenge</div>
          </div>

          <h2 className="auth-title">Track every shot.</h2>
          <p className="auth-sub" style={{ marginBottom: 24 }}>Pick a challenge and log your shots. Takes 30 seconds.</p>

          <button className="google-btn" onClick={() => createPlayerWithGoogleAuth()} style={{ marginBottom: 24 }}>
            <GoogleIcon />
            Sign in with Google
          </button>

          <button className="btn-text" onClick={() => nav('/')}>
            ← Back to home
          </button>
        </div>
        <style>{styles}</style>
      </div>
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  width: 100%;
}
.auth-card {
  width: 100%;
  max-width: 380px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius-lg);
  padding: 24px 16px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.brand-name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 17px;
  letter-spacing: 1px;
  text-transform: uppercase;
  line-height: 1.1;
}
.auth-title {
  font-family: var(--font-display);
  font-size: 22px;
  line-height: 1.1;
  margin-bottom: 4px;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.auth-sub {
  font-size: 13px;
  color: var(--text-mute);
  margin: 0 0 18px;
}
.google-btn {
  width: 100%;
  background: white;
  border: 0.5px solid #e0e0e0;
  border-radius: var(--radius);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  font-size: 14px;
  color: #1f2937;
  cursor: pointer;
  transition: all 0.2s;
}
.google-btn:hover {
  background: #f8f8f8;
  border-color: #d0d0d0;
}
.google-btn:active {
  transform: scale(0.98);
}
.auth-card-divider {
  height: 0.5px;
  background: var(--border-dim);
}
.auth-banner-btn {
  background: var(--accent);
  border: none;
  border-radius: var(--radius);
  padding: 12px 16px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
}
.auth-banner-btn:hover {
  opacity: 0.9;
}
.auth-banner-btn:active {
  transform: scale(0.98);
}
.auth-banner-btn--green {
  background: #34a853;
}
.auth-banner-btn--blue {
  background: #2979ff;
}
.btn-text {
  background: none;
  border: none;
  color: var(--text-soft);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 8px;
  transition: color 0.2s;
  margin-top: 8px;
}
.btn-text:hover {
  color: var(--text);
}
.fade-in {
  animation: fadeIn 0.3s ease-in;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
`
