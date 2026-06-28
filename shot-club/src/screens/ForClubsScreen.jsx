import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, CANONICAL_URL } from '../lib/seo'
import { searchClubs } from '../lib/clubs'
import ContactSection from '../components/ContactSection'

export default function ForClubsScreen() {
  const nav = useNavigate()
  const [clubQuery, setClubQuery] = useState('')
  const [clubResults, setClubResults] = useState([])
  const [searching, setSearching] = useState(false)
  const searchTimer = useRef(null)

  useEffect(() => {
    setSEO({
      title: 'For Clubs & Leagues',
      description: 'An off-ice training platform built for minor hockey clubs. Players log shots and reps, access skill videos, and compete in squad battles. Free for your whole association.',
      url: `${CANONICAL_URL}/for-clubs`,
    })
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
        const results = await searchClubs(clubQuery, 6)
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
        <div className="fcl-eyebrow">FOR LEAGUES, CLUBS & ASSOCIATIONS</div>
        <h1 className="fcl-title">Your whole association.<br/>One training platform.</h1>
        <p className="fcl-sub">
          Players log shots and stickhandling reps at home every day. Coaches see who's putting in the work. Teams and clubs compete against each other. All free.
        </p>
        <button className="fcl-cta" onClick={() => nav('/coach/start')}>
          Set up a team — it's free →
        </button>
        <p className="fcl-cta-hint">Takes 2 minutes. Sign in with Google.</p>
      </section>

      <section className="fcl-three">
        <div className="fcl-three-inner">
          <h2 className="fcl-section-title">Three things every player gets.</h2>
          <div className="fcl-three-grid">
            <div className="fcl-three-card">
              <div className="fcl-three-icon">📊</div>
              <div className="fcl-three-title">Track every rep</div>
              <div className="fcl-three-text">Shots, stickhandling, saves — players log what they did at home in 5 seconds. Coaches see the full picture.</div>
            </div>
            <div className="fcl-three-card">
              <div className="fcl-three-icon">🎬</div>
              <div className="fcl-three-title">Skill videos</div>
              <div className="fcl-three-text">Curated YouTube drills for every shot type and stickhandling skill. Players watch a drill and log it right after.</div>
            </div>
            <div className="fcl-three-card">
              <div className="fcl-three-icon">⚔️</div>
              <div className="fcl-three-title">Compete together</div>
              <div className="fcl-three-text">Weekly squad battles, team vs. team, and club vs. club challenges. Your whole association has skin in the game.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="fcl-tiers">
        <div className="fcl-tiers-inner">
          <div className="fcl-eyebrow">HOW COMPETITION WORKS</div>
          <h2 className="fcl-section-title">Three levels of challenge.</h2>
          <div className="fcl-tier-list">
            <div className="fcl-tier">
              <div className="fcl-tier-num">1</div>
              <div className="fcl-tier-body">
                <div className="fcl-tier-label">SQUAD BATTLES</div>
                <div className="fcl-tier-title">4 players vs. 4 players. Every week.</div>
                <div className="fcl-tier-text">Each Monday, players get placed with 3 teammates. Their squad faces a rival squad from another team. Most reps by Sunday wins. Every rep counts.</div>
                <div className="fcl-tier-quote">"I'll out-shoot you this week or buy you a Gatorade."</div>
              </div>
            </div>
            <div className="fcl-tier">
              <div className="fcl-tier-num">2</div>
              <div className="fcl-tier-body">
                <div className="fcl-tier-label">TEAM VS. TEAM</div>
                <div className="fcl-tier-title">Two teams inside your club.</div>
                <div className="fcl-tier-text">Coaches put their teams head-to-head — across age groups, within a division, any combination. The whole team's reps add up. Team pride takes over.</div>
                <div className="fcl-tier-quote">"U13 AA threw down. U13 A is accepting."</div>
              </div>
            </div>
            <div className="fcl-tier">
              <div className="fcl-tier-num">3</div>
              <div className="fcl-tier-body">
                <div className="fcl-tier-label">CLUB VS. CLUB</div>
                <div className="fcl-tier-title">Two associations. A whole month.</div>
                <div className="fcl-tier-text">Two clubs opt in for a head-to-head event. Every team in both clubs contributes. The winning club gets bragging rights — and a community of kids who were part of it.</div>
                <div className="fcl-tier-quote">"Burlington vs. Oakville. First club to 10,000 shots wins November."</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fcl-blurb">
        <div className="fcl-blurb-inner">
          <div className="fcl-eyebrow">FORWARD THIS TO YOUR COACHES</div>
          <h2 className="fcl-section-title">Copy and paste this.</h2>
          <p className="fcl-section-sub">Drop this into your next coaches' newsletter or email. No edits needed.</p>
          <div className="fcl-blurb-card">
            <p className="fcl-blurb-text">
              "A hockey parent in Ontario built an off-ice training platform called <strong>Hockey Shot Challenge</strong>. Players log shots and stickhandling reps at home, watch skill drill videos, and compete against teammates and rival teams in weekly squad battles. Coaches get a dashboard that shows exactly who logged shots this week — so you finally know who's actually putting in work between practices. Runs in a browser. No app to download. Free for coaches, players, and parents. Worth a look: <strong>hockeyshotchallenge.com/coach</strong>"
            </p>
          </div>
        </div>
      </section>

      <section className="fcl-search">
        <div className="fcl-search-inner">
          <div className="fcl-eyebrow">ALREADY HAVE A TEAM?</div>
          <h2 className="fcl-section-title">Find your club's leaderboard.</h2>
          <div style={{ position: 'relative', maxWidth: 480, margin: '0 auto' }}>
            <input
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
                {searching && <div className="fcl-search-status">Searching…</div>}
                {!searching && clubResults.length === 0 && (
                  <div className="fcl-search-status">
                    Not listed yet. <button className="fcl-search-add" onClick={() => nav('/coach/start')}>Add your club →</button>
                  </div>
                )}
                {clubResults.map((c) => (
                  <div key={c.id} className="fcl-search-result-wrap">
                    <button
                      className="fcl-search-result"
                      onClick={() => { nav(`/clubs/${c.slug}`); setClubQuery(''); setClubResults([]) }}
                    >
                      <span className="fcl-search-result-name">{c.name}</span>
                      <span className="fcl-search-result-meta">{[c.city, c.governing_body].filter(Boolean).join(' · ')}</span>
                    </button>
                    <button
                      className="fcl-search-join"
                      onClick={() => { nav(`/coach/start`); setClubQuery(''); setClubResults([]) }}
                    >
                      Set up →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="fcl-faq">
        <div className="fcl-faq-inner">
          <h2 className="fcl-section-title">Common questions</h2>
          <div className="fcl-faq-list">
            {[
              ['What makes this different from TeamSnap?', "TeamSnap does scheduling and game stats. We track off-ice training — the work kids do at home between practices. Different job. We don't compete with it; we add what it doesn't cover."],
              ['What data do you collect from players?', "A screen name (not their real name), age bracket, position, and their shot logs. We don't ask for last names, addresses, or contact info from kids. Parents control account setup."],
              ['Does it work on school Chromebooks?', "Yes. It's a browser-based web app. Anything that opens a website can open Hockey Shot Challenge. No app store, no IT approvals."],
              ['What does it cost?', "Free. For clubs, coaches, players, and parents. No paid tier."],
              ['Who built this?', "A hockey parent in Burlington, Ontario. Not a venture-funded startup — just someone who wanted this tool to exist."],
              ['What if you shut down?', "We email every coach two months in advance and offer a full data export. If it goes away, it goes away gracefully."],
            ].map(([q, a]) => (
              <details key={q} className="fcl-faq-item">
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="fcl-final">
        <h2 className="fcl-final-title">Ready to bring your association on board?</h2>
        <p className="fcl-final-sub">Forward the blurb above to your coaches, or set up your own team right now.</p>
        <button className="fcl-cta" onClick={() => nav('/coach/start')}>Set up a team →</button>
      </section>

      <ContactSection />

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
.fcl-back {
  color: #8899b4;
  font-size: 15px;
  background: transparent;
}
.fcl-back:hover { color: white; }
.fcl-nav-cta {
  background: var(--accent);
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.fcl-hero {
  text-align: center;
  padding: 40px 20px 50px;
  max-width: 640px;
  margin: 0 auto;
}
.fcl-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #60a5fa;
  margin-bottom: 16px;
}
.fcl-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 7vw, 50px);
  font-weight: 800;
  color: white;
  line-height: 1.05;
  letter-spacing: -0.5px;
  margin-bottom: 18px;
}
.fcl-sub {
  font-size: 18px;
  color: #a8b8d0;
  line-height: 1.55;
  margin-bottom: 28px;
}
.fcl-cta {
  display: inline-block;
  background: var(--accent);
  color: white;
  padding: 16px 28px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.3px;
  transition: transform 0.1s;
  width: 100%;
  max-width: 420px;
}
.fcl-cta:active { transform: scale(0.98); }
.fcl-cta-hint {
  font-size: 13px;
  color: #6b7fa8;
  margin-top: 10px;
}
.fcl-section-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 800;
  color: white;
  margin-bottom: 14px;
  letter-spacing: 0.2px;
}
.fcl-section-sub {
  font-size: 16px;
  color: #8899b4;
  line-height: 1.55;
  margin-bottom: 24px;
}

.fcl-three {
  border-top: 1px solid #1a2035;
  padding: 50px 20px;
}
.fcl-three-inner {
  max-width: 720px;
  margin: 0 auto;
}
.fcl-three-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
@media (max-width: 560px) {
  .fcl-three-grid { grid-template-columns: 1fr; }
}
.fcl-three-card {
  background: #0f1624;
  border: 1px solid #1a2847;
  border-radius: 16px;
  padding: 22px 18px;
}
.fcl-three-icon {
  font-size: 28px;
  margin-bottom: 12px;
}
.fcl-three-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}
.fcl-three-text {
  font-size: 14px;
  color: #8899b4;
  line-height: 1.55;
}

.fcl-tiers {
  background: #060b18;
  border-top: 1px solid #1a2035;
  border-bottom: 1px solid #1a2035;
  padding: 60px 20px;
}
.fcl-tiers-inner {
  max-width: 640px;
  margin: 0 auto;
}
.fcl-tier-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.fcl-tier {
  display: flex;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 1px solid #1a2847;
  align-items: flex-start;
}
.fcl-tier:last-child { border-bottom: none; }
.fcl-tier-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(41,121,255,0.15);
  border: 1.5px solid rgba(41,121,255,0.4);
  color: #60a5fa;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}
.fcl-tier-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #4a6080;
  margin-bottom: 6px;
}
.fcl-tier-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
}
.fcl-tier-text {
  font-size: 15px;
  color: #8899b4;
  line-height: 1.55;
  margin-bottom: 12px;
}
.fcl-tier-quote {
  font-size: 14px;
  color: #60a5fa;
  font-style: italic;
  border-left: 2px solid rgba(41,121,255,0.4);
  padding-left: 12px;
}

.fcl-blurb {
  border-top: 1px solid #1a2035;
  padding: 60px 20px;
}
.fcl-blurb-inner {
  max-width: 640px;
  margin: 0 auto;
}
.fcl-blurb-card {
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 16px;
  padding: 24px 22px;
}
.fcl-blurb-text {
  font-size: 15px;
  color: #a8b8d0;
  line-height: 1.7;
  margin: 0;
}
.fcl-blurb-text strong { color: white; }

.fcl-search {
  border-top: 1px solid #1a2035;
  padding: 50px 20px;
}
.fcl-search-inner {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}
.fcl-search-input {
  width: 100%;
  background: #0f1624;
  border: 1px solid #1e2f4a;
  border-radius: 12px;
  padding: 14px 18px;
  color: var(--text);
  font-size: 16px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}
.fcl-search-input:focus { border-color: var(--accent); }
.fcl-search-input::placeholder { color: #4a6080; }
.fcl-search-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0; right: 0;
  background: #0f1624;
  border: 1px solid #1e2f4a;
  border-radius: 12px;
  overflow: hidden;
  z-index: 50;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4);
}
.fcl-search-result-wrap {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #1a2847;
  padding-right: 12px;
}
.fcl-search-result-wrap:last-child { border-bottom: none; }
.fcl-search-result {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  text-align: left;
  transition: background 0.1s;
}
.fcl-search-result:hover { background: #0a0e1a; }
.fcl-search-result-name {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: white;
}
.fcl-search-result-meta {
  font-size: 12px;
  color: #4a6080;
  margin-top: 2px;
}
.fcl-search-join {
  background: rgba(41,121,255,0.15);
  color: #60a5fa;
  border-radius: 8px;
  padding: 7px 12px;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
  border: 1px solid rgba(41,121,255,0.3);
}
.fcl-search-status {
  padding: 14px 16px;
  font-size: 13px;
  color: #4a6080;
  text-align: center;
}
.fcl-search-add {
  background: transparent;
  color: #60a5fa;
  font-size: 13px;
  font-weight: 600;
  padding: 0;
  display: inline;
}

.fcl-faq {
  border-top: 1px solid #1a2035;
  padding: 50px 20px;
}
.fcl-faq-inner {
  max-width: 640px;
  margin: 0 auto;
}
.fcl-faq-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.fcl-faq-item {
  background: #0f1624;
  border: 1px solid #1a2847;
  border-radius: 12px;
  padding: 4px 0;
  transition: border-color 0.15s;
}
.fcl-faq-item[open] { border-color: var(--accent); }
.fcl-faq-item summary {
  padding: 16px 18px;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.3px;
  list-style: none;
  position: relative;
}
.fcl-faq-item summary::-webkit-details-marker { display: none; }
.fcl-faq-item summary::after {
  content: '+';
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  color: #4a6080;
}
.fcl-faq-item[open] summary::after { content: '−'; }
.fcl-faq-item p {
  padding: 0 18px 16px;
  margin: 0;
  font-size: 14px;
  color: #8899b4;
  line-height: 1.55;
}

.fcl-final {
  background: #060b18;
  border-top: 1px solid #1a2035;
  padding: 60px 20px;
  text-align: center;
}
.fcl-final-title {
  font-family: var(--font-display);
  font-size: clamp(26px, 5vw, 36px);
  font-weight: 800;
  color: white;
  margin-bottom: 12px;
}
.fcl-final-sub {
  font-size: 16px;
  color: #6b7fa8;
  margin-bottom: 28px;
}

.fcl-footer {
  padding: 24px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #1a2035;
  max-width: 720px;
  margin: 0 auto;
}
.fcl-foot-link {
  background: transparent;
  color: #4a6080;
  font-size: 14px;
}
.fcl-foot-link:hover { color: white; }
.fcl-foot-copy {
  font-size: 12px;
  color: #2a3a50;
}
`
