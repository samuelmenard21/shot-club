import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, CANONICAL_URL } from '../lib/seo'
import { searchClubs } from '../lib/clubs'

export default function ForClubsScreen() {
  const nav = useNavigate()
  const [clubQuery, setClubQuery] = useState('')
  const [clubResults, setClubResults] = useState([])
  const [searching, setSearching] = useState(false)
  const searchTimer = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    setSEO({
      title: 'Find your club',
      description: 'Find your hockey club on Hockey Shot Challenge. See team leaderboards, get sharing links for parents and coaches, and track off-ice training.',
      url: `${CANONICAL_URL}/for-clubs`,
    })
    // Auto-focus the search on load
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current)
    if (!clubQuery.trim() || clubQuery.trim().length < 2) {
      setClubResults([])
      setSearching(false)
      return
    }
    setSearching(true)
    searchTimer.current = setTimeout(async () => {
      try {
        const results = await searchClubs(clubQuery, 8)
        setClubResults(results || [])
      } catch (e) {
        setClubResults([])
      } finally {
        setSearching(false)
      }
    }, 200)
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current) }
  }, [clubQuery])

  return (
    <div className="fcl-wrap">
      <nav className="fcl-nav">
        <button className="fcl-back" onClick={() => nav('/')}>← Back</button>
        <button className="fcl-nav-cta" onClick={() => nav('/coach/start')}>Set up a team →</button>
      </nav>

      <section className="fcl-hero">
        <div className="fcl-eyebrow">CLUBS & ASSOCIATIONS</div>
        <h1 className="fcl-title">Find your club.</h1>
        <p className="fcl-sub">Search for your association to see team leaderboards and get sharing links for your coaches and parents.</p>

        <div className="fcl-search-wrap">
          <input
            ref={inputRef}
            type="text"
            className="fcl-search-input"
            placeholder="Burlington Eagles, Mississauga…"
            value={clubQuery}
            onChange={(e) => setClubQuery(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
          />
          {clubQuery.trim().length >= 2 && (
            <div className="fcl-search-dropdown">
              {searching && clubResults.length === 0 && (
                <div className="fcl-search-status">Searching…</div>
              )}
              {!searching && clubResults.length === 0 && (
                <div className="fcl-search-empty">
                  <div className="fcl-search-empty-title">No clubs found for "{clubQuery}"</div>
                  <div className="fcl-search-empty-sub">Your association might not be on here yet.</div>
                  <button className="fcl-search-add-btn" onClick={() => nav('/coach/start')}>
                    Set up your club — free →
                  </button>
                </div>
              )}
              {clubResults.map((c) => (
                <button
                  key={c.id}
                  className="fcl-search-result"
                  onClick={() => nav(`/clubs/${c.slug}`)}
                >
                  <div className="fcl-result-left">
                    <div className="fcl-result-name">{c.name}</div>
                    <div className="fcl-result-meta">{[c.city, c.governing_body].filter(Boolean).join(' · ')}</div>
                  </div>
                  <div className="fcl-result-arrow">→</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="fcl-what">
        <div className="fcl-what-inner">
          <div className="fcl-eyebrow">WHAT YOUR CLUB PAGE HAS</div>
          <div className="fcl-what-grid">
            <div className="fcl-what-card">
              <div className="fcl-what-icon">📊</div>
              <div className="fcl-what-title">Team leaderboards</div>
              <div className="fcl-what-text">See which teams are logging the most shots this week, all on one page.</div>
            </div>
            <div className="fcl-what-card">
              <div className="fcl-what-icon">🔗</div>
              <div className="fcl-what-title">Links to share</div>
              <div className="fcl-what-text">Send your club page to coaches to set up their teams. Send parent links so players can sign up.</div>
            </div>
            <div className="fcl-what-card">
              <div className="fcl-what-icon">🏆</div>
              <div className="fcl-what-title">Top players</div>
              <div className="fcl-what-text">Who's logging the most shots across all teams this week.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="fcl-notlisted">
        <div className="fcl-notlisted-inner">
          <div className="fcl-eyebrow">NOT LISTED YET?</div>
          <h2 className="fcl-section-title">Set up your club in 2 minutes.</h2>
          <p className="fcl-section-sub">
            Any coach can set up a team and get the club on the leaderboard. Sign in with Google, pick your age group and tier, and your club page goes live automatically.
          </p>
          <button className="fcl-cta" onClick={() => nav('/coach/start')}>
            Set up my team — free →
          </button>
          <p className="fcl-cta-hint">Takes 2 minutes. Sign in with Google.</p>
        </div>
      </section>

      <section className="fcl-pitch">
        <div className="fcl-pitch-inner">
          <div className="fcl-eyebrow">WHAT THIS IS</div>
          <div className="fcl-pitch-grid">
            <div className="fcl-pitch-item">
              <div className="fcl-pitch-q">What do players do?</div>
              <div className="fcl-pitch-a">Log shots and stickhandling reps at home — driveway, basement, wherever. It takes 5 seconds. The more they log, the higher they climb on the team leaderboard.</div>
            </div>
            <div className="fcl-pitch-item">
              <div className="fcl-pitch-q">What do coaches see?</div>
              <div className="fcl-pitch-a">A dashboard showing every player's weekly shot count, streak, and rank. You know who's putting in work before practice even starts.</div>
            </div>
            <div className="fcl-pitch-item">
              <div className="fcl-pitch-q">What does it cost?</div>
              <div className="fcl-pitch-a">Free. For coaches, players, parents, and clubs. No paid tier, no subscription, no app to download.</div>
            </div>
            <div className="fcl-pitch-item">
              <div className="fcl-pitch-q">Do kids need a password?</div>
              <div className="fcl-pitch-a">No. Parents sign in with their Google account and set up their kid's profile. Kids just tap and log.</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="fcl-footer">
        <button className="fcl-foot-link" onClick={() => nav('/')}>← Home</button>
        <span className="fcl-foot-copy">© {new Date().getFullYear()} Hockey Shot Challenge · Burlington, ON</span>
      </footer>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.fcl-wrap {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
  width: 100%;
  max-width: none;
}
body:has(.fcl-wrap) { background: var(--bg) !important; }

.fcl-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  max-width: 720px;
  margin: 0 auto;
}
.fcl-back { color: #8899b4; font-size: 15px; background: transparent; }
.fcl-back:hover { color: white; }
.fcl-nav-cta {
  background: var(--accent); color: white;
  padding: 10px 18px; border-radius: 10px;
  font-family: var(--font-display); font-size: 14px; font-weight: 700; letter-spacing: 0.3px;
}

.fcl-hero {
  padding: 40px 20px 50px;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
.fcl-eyebrow {
  font-size: 12px; font-weight: 700;
  letter-spacing: 2px; color: #60a5fa;
  margin-bottom: 14px;
}
.fcl-title {
  font-family: var(--font-display);
  font-size: clamp(36px, 8vw, 56px);
  font-weight: 800; color: white;
  line-height: 1.0; letter-spacing: -0.5px;
  margin-bottom: 14px;
}
.fcl-sub {
  font-size: 17px; color: #a8b8d0;
  line-height: 1.55; margin-bottom: 28px;
}
.fcl-section-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 800; color: white;
  margin-bottom: 12px; letter-spacing: 0.2px;
}
.fcl-section-sub {
  font-size: 16px; color: #8899b4; line-height: 1.55; margin-bottom: 24px;
}

.fcl-search-wrap {
  position: relative;
  max-width: 520px;
  margin: 0 auto;
}
.fcl-search-input {
  width: 100%;
  background: #0f1928;
  border: 2px solid #1e2f4a;
  border-radius: 14px;
  padding: 18px 20px;
  color: white;
  font-size: 17px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}
.fcl-search-input:focus { border-color: var(--accent); }
.fcl-search-input::placeholder { color: #3a5070; }
.fcl-search-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0; right: 0;
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 14px;
  overflow: hidden;
  z-index: 50;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}
.fcl-search-status {
  padding: 18px 20px;
  font-size: 14px; color: #4a6080;
  text-align: center;
}
.fcl-search-empty {
  padding: 22px 20px;
  text-align: center;
}
.fcl-search-empty-title {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 700; color: white;
  margin-bottom: 6px;
}
.fcl-search-empty-sub {
  font-size: 14px; color: #4a6080; margin-bottom: 16px;
}
.fcl-search-add-btn {
  background: var(--accent); color: white;
  padding: 12px 20px; border-radius: 10px;
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
}
.fcl-search-result {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 16px 20px;
  border-bottom: 1px solid #1a2847;
  text-align: left;
  cursor: pointer;
  transition: background 0.1s;
}
.fcl-search-result:last-child { border-bottom: none; }
.fcl-search-result:hover { background: #0a1220; }
.fcl-result-left { flex: 1; min-width: 0; }
.fcl-result-name {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 800; color: white;
  letter-spacing: 0.2px;
}
.fcl-result-meta {
  font-size: 12px; color: #4a6080; margin-top: 3px;
}
.fcl-result-arrow {
  font-size: 18px; color: #2979ff; flex-shrink: 0;
}

.fcl-what {
  border-top: 1px solid #1a2035;
  padding: 50px 20px;
}
.fcl-what-inner { max-width: 680px; margin: 0 auto; }
.fcl-what-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 24px;
}
@media (max-width: 540px) { .fcl-what-grid { grid-template-columns: 1fr; } }
.fcl-what-card {
  background: #0f1624; border: 1px solid #1a2847;
  border-radius: 16px; padding: 20px 16px;
}
.fcl-what-icon { font-size: 26px; margin-bottom: 10px; }
.fcl-what-title {
  font-family: var(--font-display);
  font-size: 17px; font-weight: 700; color: white; margin-bottom: 6px;
}
.fcl-what-text { font-size: 14px; color: #8899b4; line-height: 1.5; }

.fcl-notlisted {
  background: #060b18;
  border-top: 1px solid #1a2035;
  border-bottom: 1px solid #1a2035;
  padding: 60px 20px;
  text-align: center;
}
.fcl-notlisted-inner { max-width: 500px; margin: 0 auto; }
.fcl-cta {
  display: inline-block;
  background: var(--accent); color: white;
  padding: 16px 28px; border-radius: 12px;
  font-family: var(--font-display);
  font-size: 17px; font-weight: 700; letter-spacing: 0.3px;
  transition: transform 0.1s;
  width: 100%; max-width: 400px;
}
.fcl-cta:active { transform: scale(0.98); }
.fcl-cta-hint { font-size: 13px; color: #6b7fa8; margin-top: 10px; }

.fcl-pitch {
  border-top: 1px solid #1a2035;
  padding: 50px 20px;
}
.fcl-pitch-inner { max-width: 640px; margin: 0 auto; }
.fcl-pitch-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 24px;
}
@media (max-width: 480px) { .fcl-pitch-grid { grid-template-columns: 1fr; } }
.fcl-pitch-item { }
.fcl-pitch-q {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 800; color: white;
  margin-bottom: 8px;
}
.fcl-pitch-a { font-size: 14px; color: #8899b4; line-height: 1.6; }

.fcl-footer {
  padding: 24px 20px;
  display: flex; align-items: center; justify-content: space-between;
  border-top: 1px solid #1a2035;
  max-width: 720px; margin: 0 auto;
}
.fcl-foot-link { background: transparent; color: #4a6080; font-size: 14px; }
.fcl-foot-link:hover { color: white; }
.fcl-foot-copy { font-size: 12px; color: #2a3a50; }
`
