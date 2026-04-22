import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import AuthScreen from './screens/AuthScreen'
import HomeScreen from './screens/HomeScreen'
import CardScreen from './screens/CardScreen'
import RankScreen from './screens/RankScreen'
import MoreScreen from './screens/MoreScreen'

function LoadingScreen() {
  return (
    <div className="app-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: 'var(--font-display)', color: 'var(--text-mute)', letterSpacing: 2, fontSize: 12 }}>
        LOADING…
      </div>
    </div>
  )
}

function Protected({ children }) {
  const { player, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!player) return <Navigate to="/auth" replace />
  return children
}

function BottomNav() {
  const loc = useLocation()
  const nav = useNavigate()
  if (loc.pathname === '/auth') return null
  const items = [
    { path: '/', label: 'Home', icon: <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 2 L3 8 V17 H8 V12 H12 V17 H17 V8 Z" fill="currentColor" /></svg> },
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

function Shell() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/" element={<Protected><HomeScreen /></Protected>} />
        <Route path="/card" element={<Protected><CardScreen /></Protected>} />
        <Route path="/rank" element={<Protected><RankScreen /></Protected>} />
        {/* Legacy redirect */}
        <Route path="/teams" element={<Navigate to="/rank" replace />} />
        <Route path="/more" element={<Protected><MoreScreen /></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Shell />
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
`
