import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'

// Public screens
import LandingScreen from './screens/LandingScreen'
import ClubJoinScreen from './screens/ClubJoinScreen'
import CardPublicScreen from './screens/CardPublicScreen'
import AuthScreen from './screens/AuthScreen'
import PlayerJoinTeamScreen from './screens/PlayerJoinTeamScreen'

// Coach
import CoachAuthScreen from './screens/CoachAuthScreen'
import CoachDashboardScreen from './screens/CoachDashboardScreen'

// Player (authenticated)
import HomeScreen from './screens/HomeScreen'
import CardScreen from './screens/CardScreen'
import RankScreen from './screens/RankScreen'
import MoreScreen from './screens/MoreScreen'

function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100dvh', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)', color: 'var(--text-mute)',
        letterSpacing: 2, fontSize: 12,
      }}>
        LOADING…
      </div>
    </div>
  )
}

// Protects a route: redirects to /start if not signed in as a player
function Protected({ children }) {
  const { player, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!player) return <Navigate to="/start" replace />
  return children
}

// Root redirect — if signed in, go straight to /home. Otherwise show landing.
function RootRoute() {
  const { player, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (player) return <Navigate to="/home" replace />
  return <LandingScreen />
}

function BottomNav() {
  const loc = useLocation()
  const nav = useNavigate()
  const { player } = useAuth()

  // Only show nav on authenticated player screens
  const authedPaths = ['/home', '/card', '/rank', '/more']
  if (!authedPaths.includes(loc.pathname) || !player) return null

  const items = [
    { path: '/home', label: 'Home', icon: <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 2 L3 8 V17 H8 V12 H12 V17 H17 V8 Z" fill="currentColor" /></svg> },
    { path: '/card', label: 'Card', icon: <svg width="20" height="20" viewBox="0 0 20 20"><rect x="3" y="4" width="14" height="12" rx="2" fill="currentColor" /></svg> },
    { path: '/rank', label: 'Rank', icon: <svg width="20" height="20" viewBox="0 0 20 20"><rect x="3" y="10" width="3" height="7" fill="currentColor" /><rect x="8.5" y="6" width="3" height="11" fill="currentColor" /><rect x="14" y="3" width="3" height="14" fill="currentColor" /></svg> },
    { path: '/more', label: 'More', icon: <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="5" cy="10" r="1.5" fill="currentColor" /><circle cx="10" cy="10" r="1.5" fill="currentColor" /><circle cx="15" cy="10" r="1.5" fill="currentColor" /></svg> },
  ]
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map((it) => (
        <button
          key={it.path}
          className={`nav-btn ${loc.pathname === it.path ? 'nav-btn--active' : ''}`}
          onClick={() => nav(it.path)}
          aria-label={it.label}
          aria-current={loc.pathname === it.path ? 'page' : undefined}
        >
          {it.icon}
          <span>{it.label}</span>
        </button>
      ))}
      <style>{navStyles}</style>
    </nav>
  )
}

// Wrapper that decides whether to apply the app-shell styling
// app-shell = mobile phone frame, only for authenticated player screens
function ShellWrapper() {
  const loc = useLocation()
  const useAppShell = ['/home', '/card', '/rank', '/more'].includes(loc.pathname)

  return (
    <div className={useAppShell ? 'app-shell' : 'full-width'}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<RootRoute />} />
        <Route path="/start" element={<AuthScreen />} />
        <Route path="/join/:slug" element={<ClubJoinScreen />} />
        <Route path="/card/:username" element={<CardPublicScreen />} />
        <Route path="/j/:code" element={<PlayerJoinTeamScreen />} />

        {/* Legacy auth redirect */}
        <Route path="/auth" element={<Navigate to="/start" replace />} />

        {/* Coach */}
        <Route path="/coach" element={<CoachAuthScreen />} />
        <Route path="/coach/join" element={<CoachAuthScreen />} />
        <Route path="/coach/dashboard" element={<CoachDashboardScreen />} />

        {/* Authenticated player */}
        <Route path="/home" element={<Protected><HomeScreen /></Protected>} />
        <Route path="/card" element={<Protected><CardScreen /></Protected>} />
        <Route path="/rank" element={<Protected><RankScreen /></Protected>} />
        <Route path="/teams" element={<Navigate to="/rank" replace />} />
        <Route path="/more" element={<Protected><MoreScreen /></Protected>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ShellWrapper />
    </AuthProvider>
  )
}

const navStyles = `
.bottom-nav {
  position: fixed;
  left: 50%; transform: translateX(-50%);
  bottom: 0;
  width: 100%;
  max-width: 430px;
  background: rgba(10, 14, 26, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 0.5px solid var(--border-dim);
  display: flex;
  justify-content: space-around;
  padding: 8px 0 calc(8px + var(--safe-bottom));
  z-index: 10;
}
@media (min-width: 500px) {
  .bottom-nav {
    border-radius: 0 0 24px 24px;
    bottom: 20px;
  }
}
.nav-btn {
  display: flex; flex-direction: column; align-items: center;
  gap: 3px;
  color: var(--text-mute);
  padding: 6px 16px;
  min-width: 60px;
  min-height: 44px;
  transition: color 0.1s;
}
.nav-btn span {
  font-size: 10px;
  letter-spacing: 0.5px;
  font-weight: 500;
}
.nav-btn--active { color: var(--ice); }
.nav-btn:active { transform: scale(0.95); }

.full-width {
  width: 100%;
  min-height: 100dvh;
}
`
