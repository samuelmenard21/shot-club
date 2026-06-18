import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchClubs } from '../lib/clubs'
import { setSEO, CANONICAL_URL } from '../lib/seo'

export default function ClubsScreen() {
  const nav = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const timerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    setSEO({
      title: 'Find your hockey association',
      description: 'Search for your hockey club or association on Hockey Shot Challenge.',
      url: `${CANONICAL_URL}/clubs`,
    })
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!query.trim() || query.trim().length < 2) {
      setResults([])
      setSearching(false)
      return
    }
    setSearching(true)
    timerRef.current = setTimeout(async () => {
      try {
        const r = await searchClubs(query)
        setResults(r || [])
      } catch (e) {
        setResults([])
      } finally {
        setSearching(false)
      }
    }, 200)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [query])

  return (
    <div className="cs-wrap">
      <nav className="cs-nav">
        <button className="cs-brand" onClick={() => nav('/')}>
          <BrandMark />
          <span>Hockey Shot Challenge</span>
        </button>
        <button className="cs-nav-link" onClick={() => nav('/coach')}>Coaches →</button>
      </nav>

      <div className="cs-hero">
        <div className="cs-eyebrow">FIND YOUR CLUB</div>
        <h1 className="cs-title">Search your association.</h1>
        <p className="cs-sub">Find your club to set up as a coach or join as a player.</p>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Burlington, Stoney Creek, Mississauga…"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          className="cs-input"
        />

        <div className="cs-results">
          {searching && <div className="cs-status">Searching…</div>}
          {!searching && query.length >= 2 && results.length === 0 && (
            <div className="cs-status">
              No clubs found.{' '}
              <button className="cs-link" onClick={() => nav('/coach')}>Add yours →</button>
            </div>
          )}
          {results.map((c) => (
            <button key={c.id} className="cs-result" onClick={() => nav(`/clubs/${c.slug}`)}>
              <div>
                <div className="cs-result-name">{c.name}</div>
                <div className="cs-result-meta">
                  {[c.city, c.governing_body, c.gender_type === 'girls' ? 'Girls' : null].filter(Boolean).join(' · ')}
                </div>
              </div>
              <span className="cs-result-arrow">→</span>
            </button>
          ))}
        </div>
      </div>

      <style>{styles}</style>
    </div>
  )
}

function BrandMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" style={{ display: 'block', flexShrink: 0 }}>
      <circle cx="20" cy="20" r="17" fill="#1a2847" stroke="#2979ff" strokeWidth="1" />
      <path d="M 12 22 L 17.5 27 L 28 15" stroke="#a8d4f5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const styles = `
.cs-wrap { min-height: 100dvh; background: var(--bg); color: var(--text); font-family: var(--font-body); }
.cs-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px clamp(16px, 5vw, 40px);
  border-bottom: 0.5px solid var(--border-dim);
}
.cs-brand {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-display); font-weight: 800; font-size: 14px;
  letter-spacing: 0.5px; color: white; background: transparent; padding: 0; cursor: pointer;
}
.cs-nav-link { color: var(--ice); font-size: 14px; font-weight: 500; padding: 8px 12px; background: transparent; }
.cs-nav-link:hover { color: white; }
.cs-hero { max-width: 600px; margin: 0 auto; padding: 48px clamp(16px, 5vw, 24px) 60px; }
.cs-eyebrow {
  display: inline-block;
  font-family: var(--font-display); font-size: 11px; font-weight: 600;
  color: var(--ice); letter-spacing: 2px;
  background: var(--accent-bg); padding: 6px 12px; border-radius: 999px; margin-bottom: 16px;
}
.cs-title {
  font-family: var(--font-display); font-size: clamp(32px, 6vw, 48px);
  font-weight: 800; line-height: 1.05; letter-spacing: -0.5px; color: white; margin: 0 0 12px;
}
.cs-sub { font-size: 16px; color: var(--text-soft); line-height: 1.5; margin: 0 0 28px; }
.cs-input {
  width: 100%; background: var(--surface); border: 0.5px solid var(--border);
  border-radius: 14px; padding: 16px 20px; color: var(--text); font-size: 17px;
  outline: none; transition: border-color 0.15s; font-family: inherit;
}
.cs-input:focus { border-color: var(--accent); }
.cs-results { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
.cs-status { text-align: center; font-size: 14px; color: var(--text-mute); padding: 20px 0; }
.cs-link { color: var(--accent); font-size: 14px; font-weight: 600; background: transparent; padding: 0; cursor: pointer; }
.cs-result {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 12px; padding: 16px 18px; text-align: left; cursor: pointer; width: 100%;
  transition: border-color 0.15s, background 0.15s;
}
.cs-result:hover { border-color: var(--accent); background: var(--surface-raised); }
.cs-result-name { font-family: var(--font-display); font-weight: 800; font-size: 16px; color: white; margin-bottom: 3px; }
.cs-result-meta { font-size: 12px; color: var(--text-mute); }
.cs-result-arrow { color: var(--accent); font-size: 18px; flex-shrink: 0; margin-left: 12px; }
`
