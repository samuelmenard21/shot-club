import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchClubs, getClubStats } from '../lib/clubs'
import { setSEO } from '../lib/seo'
import SEOFooter from '../components/SEOFooter'

export default function FindClubScreen() {
  const nav = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [stats, setStats] = useState({})
  const [copiedSlug, setCopiedSlug] = useState('')
  const searchTimer = useRef(null)

  useEffect(() => {
    setSEO({
      title: 'Find Your Hockey Club',
      description: 'Search for your hockey association or club on Hockey Shot Challenge. Get a shareable link to join your team.',
      noindex: true,
    })
  }, [])

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current)
    if (!query.trim() || query.trim().length < 2) {
      setResults([])
      setSearching(false)
      return
    }
    setSearching(true)
    searchTimer.current = setTimeout(async () => {
      try {
        const found = await searchClubs(query, 10)
        setResults(found || [])
        // Fetch stats for each club
        if (found && found.length > 0) {
          const statsMap = {}
          await Promise.all(
            found.map(async (c) => {
              try {
                const s = await getClubStats(c.id)
                statsMap[c.id] = s
              } catch (e) {
                statsMap[c.id] = { playerCount: 0, teamCount: 0, totalShots: 0 }
              }
            })
          )
          setStats(statsMap)
        }
      } catch (e) {
        setResults([])
      } finally {
        setSearching(false)
      }
    }, 300)
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current) }
  }, [query])

  const copyLink = (slug) => {
    const link = `${window.location.origin}/join/${slug}`
    navigator.clipboard.writeText(link)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(''), 2000)
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '14px 16px', maxWidth: '1200px', margin: '0 auto' }}>
        <button
          style={{ fontSize: 'clamp(15px, 4vw, 18px)', fontWeight: 700, background: 'transparent', cursor: 'pointer', color: 'white', border: 'none', padding: 0, textAlign: 'left', lineHeight: 1.15 }}
          onClick={() => nav('/')}
        >
          🏒 Hockey Shot Challenge
        </button>
        <button
          style={{ background: 'var(--accent)', color: 'white', padding: '10px 16px', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer', border: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
          onClick={() => nav('/start')}
        >
          Sign up →
        </button>
      </nav>

      <section style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'var(--accent)', marginBottom: 12 }}>
            FIND YOUR CLUB
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 6vw, 36px)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: 12 }}>
            Find Your Association
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-soft)' }}>
            Search for your club, get a shareable join link, and invite your players and coaches.
          </p>
        </div>

        <div style={{ position: 'relative', marginBottom: 24 }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by club name…"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
            style={{
              width: '100%',
              background: 'var(--surface)',
              border: '1.5px solid var(--border-dim)',
              borderRadius: 12,
              padding: '14px 16px',
              color: 'white',
              fontSize: 16,
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-dim)'
            }}
            autoFocus
          />

          {query.trim().length >= 2 && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              right: 0,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              zIndex: 30,
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              overflow: 'hidden',
              maxHeight: '400px',
              overflowY: 'auto',
            }}>
              {searching && (
                <div style={{ padding: '16px', fontSize: 13, color: 'var(--text-mute)', textAlign: 'center' }}>
                  Searching…
                </div>
              )}
              {!searching && results.length === 0 && (
                <div style={{ padding: '16px', fontSize: 13, color: 'var(--text-mute)', textAlign: 'center' }}>
                  No clubs found. Try a different name.
                </div>
              )}
              {results.map((club) => (
                <button
                  key={club.id}
                  onClick={() => nav(`/join/${club.slug}`)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border-dim)',
                    textAlign: 'left',
                    transition: 'background 0.15s',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--bg)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--ice)', marginBottom: 2 }}>
                    {club.name}
                  </div>
                  {club.city && (
                    <div style={{ fontSize: 12, color: 'var(--text-mute)', marginBottom: 6 }}>
                      {club.city}
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: 'var(--text-mute)' }}>
                    {stats[club.id]?.playerCount || 0} players
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {query.trim().length < 2 && (
          <div style={{ background: 'var(--surface-raised)', border: '1px solid var(--border-dim)', borderRadius: 12, padding: '20px', textAlign: 'center', color: 'var(--text-soft)', fontSize: 13, lineHeight: 1.6 }}>
            Start typing a club name to search
          </div>
        )}
      </section>

      <section style={{ borderTop: '1px solid var(--border-dim)', padding: '40px 20px', marginTop: 40 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
            <div>
              <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 12 }}>Learn</h3>
              <button onClick={() => nav('/blog')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', marginBottom: 8 }}>Guides & Tips</button>
              <button onClick={() => nav('/about')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>About</button>
            </div>
            <div>
              <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 12 }}>For Players</h3>
              <button onClick={() => nav('/player')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', marginBottom: 8 }}>Player Guide</button>
              <button onClick={() => nav('/challenges')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>Challenges</button>
            </div>
            <div>
              <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 12 }}>Organizations</h3>
              <button onClick={() => nav('/for-clubs')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', marginBottom: 8 }}>For Clubs</button>
              <button onClick={() => nav('/coach')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>For Coaches</button>
            </div>
          </div>
        </div>
      </section>

      <SEOFooter />
    </div>
  )
}
