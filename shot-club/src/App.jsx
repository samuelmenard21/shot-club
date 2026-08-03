import { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { NotificationProvider } from './hooks/useNotifications'
import { ErrorBoundary } from './components/ErrorBoundary'
import Toast from './components/Toast'

// ── EAGER: public content screens that are PRERENDERED at build time.
// These MUST be statically imported — renderToString can't wait on React.lazy,
// so lazy-loading them would ship empty HTML and break AI-search rendering.
import LandingScreen from './screens/LandingScreen'
import ForClubsScreen from './screens/ForClubsScreen'
import PrivacyScreen from './screens/PrivacyScreen'
import PlayerLandingScreen from './screens/PlayerLandingScreen'
import CoachLandingScreen from './screens/CoachLandingScreen'
import BlogIndex from './screens/blog/BlogIndex'
import GettingStartedPost from './screens/blog/GettingStartedPost'
import SquadBattlesPost from './screens/blog/SquadBattlesPost'
import OffIceDrillsPost from './screens/blog/OffIceDrillsPost'
import PracticeRoutinePost from './screens/blog/PracticeRoutinePost'
import ParentsGuidePost from './screens/blog/ParentsGuidePost'
import RookieChallengePost from './screens/blog/RookieChallengePost'
import ProChallengePost from './screens/blog/ProChallengePost'
import EliteChallengePost from './screens/blog/EliteChallengePost'
import HallOfFamerChallengePost from './screens/blog/HallOfFamerChallengePost'
import ChallengeLandingScreen from './screens/ChallengeLandingScreen'
import AssociationPartnershipScreen from './screens/AssociationPartnershipScreen'
import ChallengeSelector from './screens/ChallengeSelector'
import ProvinceWideChallengeScreen from './screens/ProvinceWideChallengeScreen'

// ── LAZY: authenticated app + dynamic screens that are never prerendered.
// Code-split so search visitors landing on a content page don't download the
// whole app up front.
const ClubScreen = lazy(() => import('./screens/ClubScreen'))
const ClubsScreen = lazy(() => import('./screens/ClubsScreen'))
const ClubJoinScreen = lazy(() => import('./screens/ClubJoinScreen'))
const CardPublicScreen = lazy(() => import('./screens/CardPublicScreen'))
const RankingsScreen = lazy(() => import('./screens/RankingsScreen'))
const AuthScreen = lazy(() => import('./screens/AuthScreen'))
const CoachAuthScreen = lazy(() => import('./screens/CoachAuthScreen'))
const CoachDashboardScreen = lazy(() => import('./screens/CoachDashboardScreen'))
const CoachChallengeScreen = lazy(() => import('./screens/CoachChallengeScreen'))
const AssociationDashboardScreen = lazy(() => import('./screens/AssociationDashboardScreen'))
const HomeScreen = lazy(() => import('./screens/HomeScreen'))
const VideosScreen = lazy(() => import('./screens/VideosScreen'))
const CardScreen = lazy(() => import('./screens/CardScreen'))
const RankScreen = lazy(() => import('./screens/RankScreen'))
const MoreScreen = lazy(() => import('./screens/MoreScreen'))
const AddPlayerScreen = lazy(() => import('./screens/AddPlayerScreen'))
const CustomChallengeScreen = lazy(() => import('./screens/CustomChallengeScreen'))

// Shown while auth resolves (AuthProvider's initial refresh()) and as the
// Suspense fallback for every lazy route. Either can hang forever on a
// dropped connection or a stalled Supabase call — with nothing else on
// screen and no error thrown, that reads to a user as "the site is broken,"
// and the only fix they can find themselves is clearing site data (which
// merely forces the reload the app should have offered on its own). After a
// few seconds stuck here, offer that reload directly instead of leaving a
// dead spinner as the only thing on screen.
function LoadingScreen() {
  const [stuck, setStuck] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setStuck(true), 8000)
    return () => clearTimeout(t)
  }, [])
  return (
    <div style={{
      minHeight: '100dvh', width: '100%',
      display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: 20, textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)', color: 'var(--text-mute)',
        letterSpacing: 2, fontSize: 12,
      }}>
        LOADING…
      </div>
      {stuck && (
        <>
          <div style={{ color: 'var(--text-soft)', fontSize: 13, maxWidth: 280 }}>
            This is taking longer than it should.
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{ background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 8,
              padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
          >
            Reload
          </button>
        </>
      )}
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
      <Suspense fallback={<LoadingScreen />}>
      <Routes
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
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
        <Route path="/coach/dashboard" element={<Protected><CoachDashboardScreen /></Protected>} />
        <Route path="/coach/challenge" element={<Protected><CoachChallengeScreen /></Protected>} />
        <Route path="/association" element={<Protected><AssociationDashboardScreen /></Protected>} />

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
        <Route path="/blog/rookie-challenge" element={<RookieChallengePost />} />
        <Route path="/blog/pro-challenge" element={<ProChallengePost />} />
        <Route path="/blog/elite-challenge" element={<EliteChallengePost />} />
        <Route path="/blog/hall-of-famer-challenge" element={<HallOfFamerChallengePost />} />
        <Route path="/blog/getting-started" element={<GettingStartedPost />} />
        <Route path="/blog/how-squad-battles-work" element={<SquadBattlesPost />} />
        <Route path="/blog/off-ice-drills" element={<OffIceDrillsPost />} />
        <Route path="/blog/building-practice-routine" element={<PracticeRoutinePost />} />
        <Route path="/blog/parents-guide-youth-hockey" element={<ParentsGuidePost />} />
        <Route path="/challenges" element={<ChallengeSelector />} />
        <Route path="/challenges/custom" element={<Protected><CustomChallengeScreen /></Protected>} />
        {/* One template, four tiers — old /5000-shot-challenge and
            /10000-shot-challenge 301 to their -elite-/-hall-of-famer- successors
            (see public/_redirects), so those two routes are gone entirely. */}
        <Route path="/1000-shot-rookie-challenge" element={<ChallengeLandingScreen challengeId="1k" />} />
        <Route path="/2500-shot-pro-challenge" element={<ChallengeLandingScreen challengeId="2_5k" />} />
        <Route path="/5000-shot-elite-challenge" element={<ChallengeLandingScreen challengeId="5k" />} />
        <Route path="/10000-shot-hall-of-famer-challenge" element={<ChallengeLandingScreen challengeId="10k" />} />
        <Route path="/association-partnership" element={<AssociationPartnershipScreen />} />
        <Route path="/province-wide-challenge" element={<ProvinceWideChallengeScreen />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Suspense>
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <AuthProvider>
          <Toast />
          <ShellWrapper />
        </AuthProvider>
      </NotificationProvider>
    </ErrorBoundary>
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

/* .full-width lives in index.css — this <style> is only mounted on authed
   routes (BottomNav returns null elsewhere), so layout rules must not live
   here or they silently don't apply to public pages. */
`
