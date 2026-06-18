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
  const searchRef = useRef(null)

  useEffect(() => {
    setSEO({
      title: 'Free off-ice training for your whole association — Hockey Shot Challenge',
      description: 'Coaches set up their own teams. Players track their own shots. You get the stats. Free for everyone, all season.',
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

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => searchRef.current?.querySelector('input')?.focus(), 300)
  }

  return (
    <div className="cs-wrap">
      <nav className="cs-nav">
        <button className="cs-brand" onClick={() => nav('/')}>
          <BrandMark />
          <span>Hockey Shot Challenge</span>
        </button>
        <button className="cs-nav-link" onClick={() => nav('/coach')}>I'm a coach →</button>
      </nav>

      {/* Hero — director first */}
      <section className="cs-hero">
        <div className="cs-eyebrow">FOR ASSOCIATION DIRECTORS</div>
        <h1 className="cs-title">Give your players something to do between practices.</h1>
        <p className="cs-sub">
          Hockey Shot Challenge is a free training tool for your whole association. Coaches set up their own teams. Players track their shots at home. You get the numbers to talk about all season.
        </p>
        <div className="cs-hero-ctas">
          <button className="cs-cta-primary" onClick={scrollToSearch}>
            Find my association →
          </button>
          <button className="cs-cta-ghost" onClick={() => nav('/coach')}>
            I'm a coach
          </button>
        </div>
      </section>

      {/* Zero work for you */}
      <section className="cs-section">
        <div className="cs-eyebrow-left">FOR BUSY DIRECTORS</div>
        <h2 className="cs-h2">You don't have to manage any of it.</h2>
        <p className="cs-body">You share one link. Each coach finds their team and sets up in 2 minutes on their own. Players sign up from their phones. You don't chase anyone.</p>
        <div className="cs-zero-cards">
          <div className="cs-zero-card">
            <div className="cs-zero-icon">👆</div>
            <div className="cs-zero-title">One link to share</div>
            <div className="cs-zero-text">Send this page to your coaches. That's it. They do the rest.</div>
          </div>
          <div className="cs-zero-card">
            <div className="cs-zero-icon">⚙️</div>
            <div className="cs-zero-title">Coaches set up their own teams</div>
            <div className="cs-zero-text">Each coach signs in with Google, picks their age and tier, and gets their own player invite link.</div>
          </div>
          <div className="cs-zero-card">
            <div className="cs-zero-icon">📲</div>
            <div className="cs-zero-title">Players sign up themselves</div>
            <div className="cs-zero-text">No app to install. No email needed. Kids are signed up in 30 seconds.</div>
          </div>
        </div>
      </section>

      {/* Content to talk about */}
      <section className="cs-section cs-talk">
        <div className="cs-eyebrow-left">SOMETHING TO TALK ABOUT</div>
        <h2 className="cs-h2">Real numbers. All season long.</h2>
        <p className="cs-body">Your players are putting in work at home. Now you can see it — and talk about it. Post it on your socials. Share it at your AGM. Show parents their kids are getting better.</p>
        <div className="cs-stat-examples">
          <div className="cs-stat-ex">
            <div className="cs-stat-ex-num">12,400</div>
            <div className="cs-stat-ex-label">shots logged this month</div>
          </div>
          <div className="cs-stat-ex">
            <div className="cs-stat-ex-num">#2</div>
            <div className="cs-stat-ex-label">in Ontario this season</div>
          </div>
          <div className="cs-stat-ex">
            <div className="cs-stat-ex-num">84%</div>
            <div className="cs-stat-ex-label">of players active this week</div>
          </div>
        </div>
        <p className="cs-stat-note">These are the kinds of numbers your association will have to share.</p>
      </section>

      {/* What players get */}
      <section className="cs-section">
        <div className="cs-eyebrow-left">WHAT PLAYERS GET</div>
        <h2 className="cs-h2">Kids actually want to use it.</h2>
        <p className="cs-body" style={{ marginBottom: 20 }}>It's not homework. It's a game. Players log shots, follow skill videos, and compete against teammates and rival clubs every day.</p>
        <div className="cs-cards">
          <div className="cs-card">
            <div className="cs-card-icon">📺</div>
            <h3 className="cs-card-title">Skill videos</h3>
            <p className="cs-card-text">Shooting drills and stickhandling videos players follow at home. New videos added all season.</p>
          </div>
          <div className="cs-card">
            <div className="cs-card-icon">🔥</div>
            <h3 className="cs-card-title">Daily challenges</h3>
            <p className="cs-card-text">New challenges keep players coming back. Streaks, personal bests, team goals.</p>
          </div>
          <div className="cs-card">
            <div className="cs-card-icon">🏆</div>
            <h3 className="cs-card-title">Rankings at every level</h3>
            <p className="cs-card-text">Players compete within their team, across your whole association, and against every club on the platform.</p>
          </div>
        </div>
      </section>

      {/* Rankings ladder */}
      <section className="cs-section cs-rankings">
        <div className="cs-eyebrow-left">HOW RANKINGS WORK</div>
        <h2 className="cs-h2">Start local. Go national.</h2>
        <div className="cs-rank-levels">
          <div className="cs-rank-level">
            <div className="cs-rank-num">1</div>
            <div>
              <div className="cs-rank-title">Beat your teammates</div>
              <div className="cs-rank-text">Every player on the team is ranked. Who put in the most work this week?</div>
            </div>
          </div>
          <div className="cs-rank-connector">↓</div>
          <div className="cs-rank-level">
            <div className="cs-rank-num">2</div>
            <div>
              <div className="cs-rank-title">Compete across your association</div>
              <div className="cs-rank-text">U12 AAA vs U12 AA vs U12 A. All your teams, one board.</div>
            </div>
          </div>
          <div className="cs-rank-connector">↓</div>
          <div className="cs-rank-level">
            <div className="cs-rank-num">3</div>
            <div>
              <div className="cs-rank-title">Your association vs everyone</div>
              <div className="cs-rank-text">Burlington vs Oakville vs Stoney Creek. See where your club stands across Ontario.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Free */}
      <section className="cs-section cs-free">
        <div className="cs-free-badge">$0</div>
        <h2 className="cs-h2">Free. No budget needed.</h2>
        <p className="cs-body">No credit card. No trial. No "ask the board." Every coach, every player, every parent uses it free. All season, every season.</p>
        <div className="cs-free-pills">
          <span className="cs-pill">✓ Free for coaches</span>
          <span className="cs-pill">✓ Free for players</span>
          <span className="cs-pill">✓ Free for parents</span>
          <span className="cs-pill">✓ No app to install</span>
        </div>
      </section>

      {/* Search */}
      <section className="cs-section cs-search-section" ref={searchRef}>
        <div className="cs-eyebrow-left">GET STARTED</div>
        <h2 className="cs-h2">Find your association.</h2>
        <p className="cs-body" style={{ marginBottom: 20 }}>Search below. Share the page with your coaches. They take it from there.</p>

        <div className="cs-search-wrap">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by city or club name…"
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
      </section>

      <footer className="cs-footer">
        <button className="cs-brand" onClick={() => nav('/')}>
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
  padding: 52px clamp(16px, 5vw, 24px) 44px;
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
  font-family: var(--font-display); font-size: clamp(30px, 5.5vw, 48px);
  font-weight: 800; line-height: 1.07; letter-spacing: -0.5px; color: white; margin: 0 0 16px;
}
.cs-sub { font-size: 17px; color: var(--text-soft); line-height: 1.6; margin: 0 0 28px; }
.cs-hero-ctas { display: flex; gap: 10px; flex-wrap: wrap; }
.cs-cta-primary {
  background: var(--accent); color: white; border-radius: 10px; padding: 14px 22px;
  font-family: var(--font-display); font-size: 15px; font-weight: 700; letter-spacing: 0.4px;
  cursor: pointer; transition: background 0.15s;
}
.cs-cta-primary:hover { background: var(--accent-soft); }
.cs-cta-ghost {
  background: transparent; color: var(--ice); border: 0.5px solid var(--border);
  border-radius: 10px; padding: 14px 20px;
  font-family: var(--font-display); font-size: 14px; font-weight: 600;
  cursor: pointer; transition: background 0.15s;
}
.cs-cta-ghost:hover { background: var(--surface); }

.cs-h2 {
  font-family: var(--font-display); font-size: clamp(22px, 4vw, 30px);
  font-weight: 800; letter-spacing: -0.3px; color: white; margin: 0 0 12px;
}
.cs-body { font-size: 15px; color: var(--text-soft); line-height: 1.6; margin: 0; }

.cs-section {
  max-width: 680px; margin: 0 auto;
  padding: 44px clamp(16px, 5vw, 24px);
  border-top: 0.5px solid var(--border-dim);
}

/* Zero work cards */
.cs-zero-cards { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 20px; }
@media (min-width: 600px) { .cs-zero-cards { grid-template-columns: repeat(3, 1fr); } }
.cs-zero-card { background: var(--surface); border: 0.5px solid var(--border-dim); border-radius: 14px; padding: 20px; }
.cs-zero-icon { font-size: 26px; margin-bottom: 10px; }
.cs-zero-title { font-family: var(--font-display); font-size: 15px; font-weight: 800; color: white; margin-bottom: 6px; }
.cs-zero-text { font-size: 13px; color: var(--text-soft); line-height: 1.5; }

/* Stat examples */
.cs-talk { background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.06)); }
.cs-stat-examples { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0 12px; }
.cs-stat-ex { background: var(--surface); border: 0.5px solid var(--border-dim); border-radius: 12px; padding: 18px 12px; text-align: center; }
.cs-stat-ex-num { font-family: var(--font-display); font-size: clamp(22px, 4vw, 32px); font-weight: 800; color: var(--ice); line-height: 1; font-variant-numeric: tabular-nums; }
.cs-stat-ex-label { font-size: 12px; color: var(--text-mute); margin-top: 6px; line-height: 1.3; }
.cs-stat-note { font-size: 12px; color: var(--text-mute); font-style: italic; margin: 0; }

/* Feature cards */
.cs-cards { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 4px; }
@media (min-width: 600px) { .cs-cards { grid-template-columns: repeat(3, 1fr); } }
.cs-card { background: var(--surface); border: 0.5px solid var(--border-dim); border-radius: 14px; padding: 22px; }
.cs-card-icon { font-size: 28px; margin-bottom: 12px; }
.cs-card-title { font-family: var(--font-display); font-size: 17px; font-weight: 800; color: white; margin: 0 0 8px; }
.cs-card-text { font-size: 14px; color: var(--text-soft); line-height: 1.5; margin: 0; }

/* Rankings */
.cs-rankings { }
.cs-rank-levels { display: flex; flex-direction: column; }
.cs-rank-level {
  display: flex; align-items: flex-start; gap: 14px;
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 12px; padding: 16px 18px;
}
.cs-rank-connector { text-align: center; color: var(--accent); font-size: 20px; padding: 4px 0; margin-left: 22px; }
.cs-rank-num {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent); color: white;
  font-family: var(--font-display); font-size: 14px; font-weight: 800;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cs-rank-title { font-family: var(--font-display); font-weight: 800; font-size: 15px; color: white; margin-bottom: 4px; }
.cs-rank-text { font-size: 13px; color: var(--text-mute); line-height: 1.4; }

/* Free */
.cs-free { text-align: center; background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.06)); }
.cs-free-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 64px; height: 64px; border-radius: 50%;
  background: var(--accent); color: white;
  font-family: var(--font-display); font-size: 22px; font-weight: 800; margin-bottom: 16px;
}
.cs-free-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 20px; }
.cs-pill {
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 999px; padding: 7px 14px;
  font-size: 13px; font-weight: 600; color: var(--ice);
  font-family: var(--font-display); letter-spacing: 0.3px;
}

/* Search */
.cs-search-section { }
.cs-search-wrap { position: relative; }
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

.cs-footer {
  border-top: 0.5px solid var(--border-dim);
  padding: 24px clamp(16px, 5vw, 40px);
  display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center;
}
.cs-foot-copy { font-size: 12px; color: var(--text-mute); }
`
