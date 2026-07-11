import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'

// Public screens
import LandingScreen from './screens/LandingScreen'
import ForClubsScreen from './screens/ForClubsScreen'
import ClubScreen from './screens/ClubScreen'
import ClubsScreen from './screens/ClubsScreen'
import ClubJoinScreen from './screens/ClubJoinScreen'
import CardPublicScreen from './screens/CardPublicScreen'
import RankingsScreen from './screens/RankingsScreen'
import AuthScreen from './screens/AuthScreen'

// Coach
import CoachAuthScreen from './screens/CoachAuthScreen'
import CoachDashboardScreen from './screens/CoachDashboardScreen'

// Player (authenticated)
import HomeScreen from './screens/HomeScreen'
import VideosScreen from './screens/VideosScreen'
import CardScreen from './screens/CardScreen'
import RankScreen from './screens/RankScreen'
import MoreScreen from './screens/MoreScreen'
import AddPlayerScreen from './screens/AddPlayerScreen'

// Public static
import PrivacyScreen from './screens/PrivacyScreen'
import PlayerLandingScreen from './screens/PlayerLandingScreen'
import CoachLandingScreen from './screens/CoachLandingScreen'
import BlogIndex from './screens/blog/BlogIndex'
import GettingStartedPost from './screens/blog/GettingStartedPost'
import SquadBattlesPost from './screens/blog/SquadBattlesPost'
import OffIceDrillsPost from './screens/blog/OffIceDrillsPost'
import PracticeRoutinePost from './screens/blog/PracticeRoutinePost'
import ParentsGuidePost from './screens/blog/ParentsGuidePost'
import TenKChallengeScreen from './screens/TenKChallengeScreen'
import AssociationPartnershipScreen from './screens/AssociationPartnershipScreen'
import ChallengeSelector from './screens/ChallengeSelector'
import ProvinceWideChallengeScreen from './screens/ProvinceWideChallengeScreen'

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

function Protected({ children }) {
  const { player, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!player) return <Navigate to="/start" replace />
  return children
}

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

  const authedPaths = ['/home', '/videos', '/card', '/rank', '/more']
  if (!authedPaths.includes(loc.pathname) || !player) return null

  const items = [
    { path: '/home', label: 'Dashboard', icon: <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 2 L3 8 V17 H8 V12 H12 V17 H17 V8 Z" fill="currentColor" /></svg> },
    { path: '/videos', label: 'Videos', icon: <svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="4" width="16" height="12" rx="2" fill="currentColor" /><path d="M8 9 L14 12 L8 15 Z" fill="var(--bg)" /></svg> },
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

function ShellWrapper() {
  const loc = useLocation()
  const useAppShell = ['/home', '/videos', '/card', '/rank', '/more'].includes(loc.pathname)

  return (
    <div className={useAppShell ? 'app-shell' : 'full-width'}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<RootRoute />} />
        <Route path="/for-clubs" element={<ForClubsScreen />} />
<Route path="/clubs" element={<ClubsScreen />} />
        <Route path="/clubs/:slug" element={<ClubScreen />} />
        <Route path="/start" element={<AuthScreen />} />
        <Route path="/join/:slug" element={<ClubJoinScreen />} />
        <Route path="/card/:username" element={<CardPublicScreen />} />
        <Route path="/rankings" element={<RankingsScreen />} />

        {/* Legacy auth redirect */}
        <Route path="/auth" element={<Navigate to="/start" replace />} />

        {/* Coach */}
        <Route path="/coach" element={<CoachLandingScreen />} />
        <Route path="/coach/start" element={<CoachAuthScreen />} />
        <Route path="/coach/dashboard" element={<CoachDashboardScreen />} />

        {/* Authenticated player */}
        <Route path="/home" element={<Protected><HomeScreen /></Protected>} />
        <Route path="/videos" element={<Protected><VideosScreen /></Protected>} />
        <Route path="/card" element={<Protected><CardScreen /></Protected>} />
        <Route path="/rank" element={<Protected><RankScreen /></Protected>} />
        <Route path="/teams" element={<Navigate to="/rank" replace />} />
        <Route path="/more" element={<Protected><MoreScreen /></Protected>} />
        <Route path="/add-player" element={<Protected><AddPlayerScreen /></Protected>} />

        {/* Static */}
        <Route path="/privacy" element={<PrivacyScreen />} />
        <Route path="/player" element={<PlayerLandingScreen />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/getting-started" element={<GettingStartedPost />} />
        <Route path="/blog/how-squad-battles-work" element={<SquadBattlesPost />} />
        <Route path="/blog/off-ice-drills" element={<OffIceDrillsPost />} />
        <Route path="/blog/building-practice-routine" element={<PracticeRoutinePost />} />
        <Route path="/blog/parents-guide-youth-hockey" element={<ParentsGuidePost />} />
        <Route path="/challenges" element={<ChallengeSelector />} />
        <Route path="/10000-shot-challenge" element={<TenKChallengeScreen />} />
        <Route path="/association-partnership" element={<AssociationPartnershipScreen />} />
        <Route path="/province-wide-challenge" element={<ProvinceWideChallengeScreen />} />

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
  gap: 4px;
  color: var(--text-soft);
  padding: 8px 16px;
  min-width: 60px;
  min-height: 50px;
  transition: all 0.1s;
  border-radius: 12px;
}
.nav-btn span {
  font-size: 11px;
  letter-spacing: 0.5px;
  font-weight: 600;
}
.nav-btn--active {
  color: var(--ice);
  background: rgba(41, 121, 255, 0.1);
}
.nav-btn:active { transform: scale(0.95); }

.full-width {
  width: 100%;
  min-height: 100dvh;
}
`
