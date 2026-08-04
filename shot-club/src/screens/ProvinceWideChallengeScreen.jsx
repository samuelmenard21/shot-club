import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'
import { searchClubs } from '../lib/clubs'
import { useAuth } from '../hooks/useAuth'

export default function ProvinceWideChallengeScreen() {
  const nav = useNavigate()
  const { player } = useAuth()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    setSEO({
      title: 'Find Your Hockey Association — Hockey Shot Challenge',
      description: 'Find your hockey association and start tracking shots. Free printable trackers and live digital leaderboards for coaches, players, and parents.',
      url: `${CANONICAL_URL}/province-wide-challenge`,
    })
    addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Find Your Hockey Association',
      description: 'Search for your hockey association to access free shot tracking tools.',
      url: `${CANONICAL_URL}/province-wide-challenge`,
    })
  }, [])

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    if (!query.trim() || query.trim().length < 2) { setResults([]); return }
    setSearching(true)
    timer.current = setTimeout(() => {
      searchClubs(query, 15).then(r => setResults(r || [])).catch(() => setResults([])).finally(() => setSearching(false))
    }, 200)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [query])

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      {/* NAV */}
      <nav className="land-nav">
        <button className="land-brand" onClick={() => nav('/')}>
          🏒
          <span>Hockey Shot Challenge</span>
        </button>
        <div className="land-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="#faq" className="land-nav-link" style={{ color: 'var(--text-soft)', fontSize: '14px', textDecoration: 'none' }}>FAQ</a>
          <button className="land-nav-link" onClick={() => nav('/challenges')} style={{ color: 'var(--text-soft)', fontSize: '14px', background: 'transparent', cursor: 'pointer', border: 'none' }}>Challenges</button>
          <button className="land-nav-link" onClick={() => nav('/province-wide-challenge')} style={{ color: 'var(--text-soft)', fontSize: '14px', background: 'transparent', cursor: 'pointer', border: 'none' }}>For Leagues</button>
          <button className="land-nav-cta" onClick={() => nav(player ? '/home' : '/start?mode=signin')}>
            {player ? 'My Dashboard →' : 'Get Started →'}
          </button>
        </div>
      </nav>

      {/* SEARCH HERO */}
      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: 16 }}>
          Find Your Association
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-soft)', marginBottom: 32, lineHeight: 1.6 }}>
          Search for your hockey club or association to access free printable trackers and live leaderboards.
        </p>

        {/* SEARCH INPUT */}
        <div style={{ position: 'relative', marginBottom: 32 }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your club (e.g., Burlington Eagles, Mississauga…)"
            autoFocus
            style={{
              width: '100%',
              padding: '16px 20px',
              fontSize: 16,
              background: 'var(--surface)',
              border: '0.5px solid var(--border-dim)',
              borderRadius: 12,
              color: 'white',
              fontFamily: 'inherit',
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-dim)'}
          />
          {searching && (
            <div style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-mute)' }}>
              Searching…
            </div>
          )}
        </div>

        {/* SEARCH RESULTS */}
        {query.trim().length >= 2 && (
          <div style={{ background: 'var(--surface)', border: '0.5px solid var(--border-dim)', borderRadius: 12, overflow: 'hidden', maxHeight: '400px', overflowY: 'auto' }}>
            {results.length === 0 && !searching && (
              <div style={{ padding: '20px', color: 'var(--text-mute)', fontSize: 14 }}>
                No clubs found. Try a different search.
              </div>
            )}
            {results.map((club) => (
              <button
                key={club.id}
                onClick={() => nav(`/clubs/${club.slug}`)}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '0.5px solid var(--border-dim)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{club.name}</div>
                {club.city && <div style={{ fontSize: 13, color: 'var(--text-mute)' }}>{club.city}</div>}
              </button>
            ))}
          </div>
        )}

        {query.trim().length === 0 && (
          <div style={{ color: 'var(--text-mute)', fontSize: 14 }}>
            Start typing to search for your club or association.
          </div>
        )}
      </section>
    </div>
  )
}
