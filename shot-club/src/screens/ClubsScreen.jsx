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
      title: 'Find your hockey association — Hockey Shot Challenge',
      description: 'Free off-ice training for every player in your association. Skill videos, daily challenges, team leaderboards, and cross-association rankings. Set up in 2 minutes.',
      url: `${CANONICAL_URL}/clubs`,
    })
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
        <button className="cs-nav-link" onClick={() => nav('/coach')}>Set up my team →</button>
      </nav>

      {/* Hero */}
      <section className="cs-hero">
        <div className="cs-eyebrow">FREE FOR EVERY TEAM & PLAYER</div>
        <h1 className="cs-title">Off-ice training for your whole association.</h1>
        <p className="cs-sub">
          Every coach sets up their team in 2 minutes. Players log shots, follow skill videos, and compete on daily challenges — all season long. Free for coaches, players, and parents. No app to install.
        </p>

        <div className="cs-search-wrap">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your association — Burlington, Stoney Creek…"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            className="cs-input"
          />
          {query.length >= 2 && (
            <div className="cs-results">
              {searching && <div className="cs-status">Searching…</div>}
              {!searching && results.length === 0 && (
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
          )}
        </div>

        <p className="cs-search-hint">Search your city or association name to get started.</p>
      </section>

      {/* Free for everyone */}
      <section className="cs-section cs-free">
        <div className="cs-free-badge">$0</div>
        <h2 className="cs-h2">Free. For everyone. No catch.</h2>
        <p className="cs-body">
          Every coach, every player, every parent in your association uses Hockey Shot Challenge at no cost. No trial period, no credit card, no "premium" tier that locks out features. We mean it.
        </p>
        <div className="cs-free-pills">
          <span className="cs-pill">✓ Free for coaches</span>
          <span className="cs-pill">✓ Free for players</span>
          <span className="cs-pill">✓ Free for parents</span>
          <span className="cs-pill">✓ Free forever</span>
        </div>
      </section>

      {/* What players do */}
      <section className="cs-section">
        <div className="cs-eyebrow-left">WHAT PLAYERS DO</div>
        <h2 className="cs-h2">A daily routine that actually sticks.</h2>
        <div className="cs-cards">
          <div className="cs-card">
            <div className="cs-card-icon">📺</div>
            <h3 className="cs-card-title">Skill video library</h3>
            <p className="cs-card-text">Shooting drills, stickhandling sequences, edge work — short videos players follow at home. New content added regularly.</p>
          </div>
          <div className="cs-card">
            <div className="cs-card-icon">🎯</div>
            <h3 className="cs-card-title">Log every rep</h3>
            <p className="cs-card-text">Players log shots and stickhandling reps from the driveway, basement, or garage. Every rep counts toward the team total.</p>
          </div>
          <div className="cs-card">
            <div className="cs-card-icon">🔥</div>
            <h3 className="cs-card-title">Daily challenges</h3>
            <p className="cs-card-text">New challenges keep players coming back. Streak bonuses, personal bests, and team goals make every session matter.</p>
          </div>
        </div>
      </section>

      {/* Rankings */}
      <section className="cs-section cs-rankings">
        <div className="cs-eyebrow-left">RANKINGS & COMPETITION</div>
        <h2 className="cs-h2">Players compete at every level.</h2>
        <p className="cs-body" style={{ marginBottom: 24 }}>
          Rankings start within the team and scale up to the whole platform. Every player has something to chase — whether it's beating a teammate or topping the national board.
        </p>
        <div className="cs-rank-levels">
          <div className="cs-rank-level">
            <div className="cs-rank-num">1</div>
            <div>
              <div className="cs-rank-title">Within your team</div>
              <div className="cs-rank-text">U12 AAA players compete against their own teammates. Daily and season totals.</div>
            </div>
          </div>
          <div className="cs-rank-connector">↓</div>
          <div className="cs-rank-level">
            <div className="cs-rank-num">2</div>
            <div>
              <div className="cs-rank-title">Across your association</div>
              <div className="cs-rank-text">U12 AAA vs U12 AA vs U12 A — every team in {`your`} association on one board.</div>
            </div>
          </div>
          <div className="cs-rank-connector">↓</div>
          <div className="cs-rank-level">
            <div className="cs-rank-num">3</div>
            <div>
              <div className="cs-rank-title">Against all associations</div>
              <div className="cs-rank-text">Burlington vs Oakville vs Stoney Creek. Your players, your association, on the national leaderboard.</div>
            </div>
          </div>
        </div>
      </section>

      {/* How coaches set up */}
      <section className="cs-section">
        <div className="cs-eyebrow-left">FOR COACHES</div>
        <h2 className="cs-h2">2 minutes to set up. Done.</h2>
        <div className="cs-steps">
          <div className="cs-step">
            <div className="cs-step-num">1</div>
            <div>
              <div className="cs-step-title">Find your association above</div>
              <div className="cs-step-text">Search by city or club name.</div>
            </div>
          </div>
          <div className="cs-step">
            <div className="cs-step-num">2</div>
            <div>
              <div className="cs-step-title">Sign in with Google</div>
              <div className="cs-step-text">No password to create. One tap.</div>
            </div>
          </div>
          <div className="cs-step">
            <div className="cs-step-num">3</div>
            <div>
              <div className="cs-step-title">Pick your team & get your invite link</div>
              <div className="cs-step-text">Send it to your players and parents. They're signed up in 30 seconds.</div>
            </div>
          </div>
        </div>
        <button className="cs-cta" onClick={() => nav('/coach')}>
          Set up my team — free →
        </button>
      </section>

      <footer className="cs-footer">
        <button className="cs-brand cs-brand--footer" onClick={() => nav('/')}>
          <BrandMark />
          <span>Hockey Shot Challenge</span>
        </button>
        <div className="cs-foot-copy">© {new Date().getFullYear()} Hockey Shot Challenge · Built in Burlington, ON · Free for all youth hockey</div>
      </footer>

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
.cs-nav-link { color: var(--ice); font-size: 14px; font-weight: 600; padding: 8px 12px; background: transparent; cursor: pointer; }
.cs-nav-link:hover { color: white; }

.cs-hero {
  max-width: 680px; margin: 0 auto;
  padding: 48px clamp(16px, 5vw, 24px) 40px;
}
.cs-eyebrow {
  display: inline-block;
  font-family: var(--font-display); font-size: 11px; font-weight: 600;
  color: var(--ice); letter-spacing: 2px;
  background: var(--accent-bg); padding: 6px 12px; border-radius: 999px; margin-bottom: 18px;
}
.cs-eyebrow-left {
  font-family: var(--font-display); font-size: 10px; font-weight: 700;
  color: var(--accent); letter-spacing: 2px; margin-bottom: 10px;
}
.cs-title {
  font-family: var(--font-display); font-size: clamp(32px, 6vw, 52px);
  font-weight: 800; line-height: 1.05; letter-spacing: -0.5px; color: white; margin: 0 0 16px;
}
.cs-sub { font-size: 17px; color: var(--text-soft); line-height: 1.6; margin: 0 0 32px; }
.cs-h2 {
  font-family: var(--font-display); font-size: clamp(22px, 4vw, 32px);
  font-weight: 800; letter-spacing: -0.3px; color: white; margin: 0 0 14px;
}
.cs-body { font-size: 15px; color: var(--text-soft); line-height: 1.6; margin: 0; }

.cs-search-wrap { position: relative; margin-bottom: 8px; }
.cs-input {
  width: 100%; background: var(--surface); border: 1.5px solid var(--accent);
  border-radius: 14px; padding: 18px 22px; color: var(--text); font-size: 17px;
  outline: none; font-family: inherit;
}
.cs-input::placeholder { color: var(--text-mute); }
.cs-results {
  position: absolute; top: calc(100% + 6px); left: 0; right: 0;
  background: var(--surface); border: 0.5px solid var(--border);
  border-radius: 12px; overflow: hidden; z-index: 10;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.cs-status { text-align: center; font-size: 14px; color: var(--text-mute); padding: 16px; }
.cs-link { color: var(--accent); font-size: 14px; font-weight: 600; background: transparent; padding: 0; cursor: pointer; }
.cs-result {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 18px; text-align: left; cursor: pointer; width: 100%;
  border-bottom: 0.5px solid var(--border-dim); transition: background 0.1s;
}
.cs-result:last-child { border-bottom: none; }
.cs-result:hover { background: var(--surface-raised); }
.cs-result-name { font-family: var(--font-display); font-weight: 800; font-size: 15px; color: white; margin-bottom: 2px; }
.cs-result-meta { font-size: 12px; color: var(--text-mute); }
.cs-result-arrow { color: var(--accent); font-size: 16px; flex-shrink: 0; margin-left: 12px; }
.cs-search-hint { font-size: 13px; color: var(--text-mute); margin: 10px 0 0; text-align: center; }

.cs-section {
  max-width: 680px; margin: 0 auto;
  padding: 44px clamp(16px, 5vw, 24px);
  border-top: 0.5px solid var(--border-dim);
}

/* Free section */
.cs-free { text-align: center; }
.cs-free-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--accent); color: white;
  font-family: var(--font-display); font-size: 22px; font-weight: 800;
  margin-bottom: 16px;
}
.cs-free-pills {
  display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 20px;
}
.cs-pill {
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 999px; padding: 7px 14px;
  font-size: 13px; font-weight: 600; color: var(--ice);
  font-family: var(--font-display); letter-spacing: 0.3px;
}

/* Feature cards */
.cs-cards { display: grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 600px) { .cs-cards { grid-template-columns: repeat(3, 1fr); } }
.cs-card { background: var(--surface); border: 0.5px solid var(--border-dim); border-radius: 14px; padding: 22px; }
.cs-card-icon { font-size: 28px; margin-bottom: 12px; }
.cs-card-title { font-family: var(--font-display); font-size: 17px; font-weight: 800; color: white; margin: 0 0 8px; }
.cs-card-text { font-size: 14px; color: var(--text-soft); line-height: 1.5; margin: 0; }

/* Rankings */
.cs-rankings { background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.05)); }
.cs-rank-levels { display: flex; flex-direction: column; gap: 0; }
.cs-rank-level {
  display: flex; align-items: flex-start; gap: 14px;
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 12px; padding: 16px 18px;
}
.cs-rank-connector {
  text-align: center; color: var(--accent); font-size: 20px;
  padding: 4px 0; margin-left: 22px;
}
.cs-rank-num {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent); color: white;
  font-family: var(--font-display); font-size: 14px; font-weight: 800;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cs-rank-title { font-family: var(--font-display); font-weight: 800; font-size: 15px; color: white; margin-bottom: 4px; }
.cs-rank-text { font-size: 13px; color: var(--text-mute); line-height: 1.4; }

/* Steps */
.cs-steps { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.cs-step {
  display: flex; align-items: flex-start; gap: 14px;
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 12px; padding: 16px;
}
.cs-step-num {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent); color: white;
  font-family: var(--font-display); font-size: 14px; font-weight: 800;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cs-step-title { font-family: var(--font-display); font-weight: 800; font-size: 15px; color: white; margin-bottom: 3px; }
.cs-step-text { font-size: 13px; color: var(--text-mute); line-height: 1.4; }
.cs-cta {
  width: 100%; background: var(--accent); color: white;
  border-radius: 12px; padding: 16px;
  font-family: var(--font-display); font-size: 16px; font-weight: 700; letter-spacing: 0.4px;
  cursor: pointer; transition: background 0.15s;
}
.cs-cta:hover { background: var(--accent-soft); }

.cs-footer {
  border-top: 0.5px solid var(--border-dim);
  padding: 24px clamp(16px, 5vw, 40px);
  display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center;
}
.cs-brand--footer { cursor: pointer; }
.cs-foot-copy { font-size: 12px; color: var(--text-mute); }
`
