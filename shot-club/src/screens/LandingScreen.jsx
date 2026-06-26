import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'
import ContactSection from '../components/ContactSection'
import { searchClubs } from '../lib/clubs'

export default function LandingScreen() {
  const nav = useNavigate()
  const [clubQuery, setClubQuery] = useState('')
  const [clubResults, setClubResults] = useState([])
  const [searchingClubs, setSearchingClubs] = useState(false)
  const searchTimer = useRef(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current)
    if (!clubQuery.trim() || clubQuery.trim().length < 2) {
      setClubResults([])
      setSearchingClubs(false)
      return
    }
    setSearchingClubs(true)
    searchTimer.current = setTimeout(async () => {
      try {
        const results = await searchClubs(clubQuery, 6)
        setClubResults(results || [])
      } catch (e) {
        setClubResults([])
      } finally {
        setSearchingClubs(false)
      }
    }, 200)
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current) }
  }, [clubQuery])

  useEffect(() => {
    setSEO({
      title: null,
      description: 'Off-ice hockey training for players, coaches, and clubs. Log shots and stickhandling reps, follow a daily routine, and compete with teammates and rivals. Free for ages 6-18.',
      url: CANONICAL_URL,
    })
    addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Hockey Shot Challenge',
      description: 'Off-ice hockey training app for kids. Track shots and stickhandling reps, follow daily routines, compete on leaderboards.',
      applicationCategory: 'SportsApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '50',
      },
    })
  }, [])

  return (
    <div className="landing">
      <nav className="land-nav">
        <button className="land-brand" onClick={() => nav('/')}>
          <BrandMark />
          <span>Hockey Shot Challenge</span>
        </button>
        <div className="land-nav-actions">
          <button className="land-nav-link" onClick={() => nav('/clubs')}>Find your club</button>
          <button className="land-nav-link" onClick={() => nav('/start')}>Sign in</button>
          <button className="land-nav-cta" onClick={() => nav('/start')}>Join free</button>
        </div>
      </nav>

      {/* ============================================================
          HERO — the 3-audience picker IS the hero
         ============================================================ */}
      <section className="hero">
        <div className="hero-eyebrow">FREE · AGES 6–18 · OFF-ICE TRAINING</div>
        <h1 className="hero-title">
          Get better between practices.
        </h1>
        <p className="hero-sub">
          Hockey Shot Challenge helps young players put in the work at home.
          Log your shots and stickhandling reps. Climb the team leaderboard.
          Beat your rivals.
        </p>
        <p className="hero-origin">Built by a hockey parent in Burlington, ON. Free for players, coaches, and clubs.</p>

        <div className="hero-pick">
          <div className="hero-search-wrap">
            <input
              ref={searchInputRef}
              type="text"
              className="hero-search-input"
              placeholder="Search for your club or association..."
              value={clubQuery}
              onChange={(e) => setClubQuery(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
            />
            {clubQuery.trim().length >= 2 && (
              <div className="hero-search-dropdown">
                {searchingClubs && clubResults.length === 0 && (
                  <div className="hero-search-status">Searching…</div>
                )}
                {!searchingClubs && clubResults.length === 0 && (
                  <div className="hero-search-status">
                    No clubs found. <button className="hero-search-add" onClick={() => nav('/coach')}>Add yours →</button>
                  </div>
                )}
                {clubResults.map((c) => (
                  <button
                    key={c.id}
                    className="hero-search-result"
                    onClick={() => { nav(`/clubs/${c.slug}`); setClubQuery(''); setClubResults([]) }}
                  >
                    <span className="hero-search-result-name">{c.name}</span>
                    <span className="hero-search-result-meta">
                      {[c.city, c.governing_body].filter(Boolean).join(' · ')}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hero-pick-label">WHO ARE YOU?</div>

          <div className="hero-cards">
            <button className="hero-card hero-card--coach" onClick={() => nav('/coach')}>
              <div className="hero-card-icon">📋</div>
              <div className="hero-card-eyebrow">FOR COACHES</div>
              <h2 className="hero-card-title">See who's actually putting in the reps.</h2>
              <p className="hero-card-text">
                Send one link to parents. Your team shows up on the board.
                You get a dashboard with weekly stats and a team challenge tool.
              </p>
              <span className="hero-card-cta">Set up your team — free →</span>
            </button>

            <button className="hero-card hero-card--player" onClick={() => nav('/start')}>
              <div className="hero-card-icon">🎯</div>
              <div className="hero-card-eyebrow">FOR PLAYERS & PARENTS</div>
              <h2 className="hero-card-title">Pick a name. Join your squad.</h2>
              <p className="hero-card-text">
                Track every shot and stickhandling drill. Earn ranks.
                Compete in 4-player squad battles against rival teams every week.
              </p>
              <span className="hero-card-cta">Start shooting →</span>
            </button>

            <button className="hero-card hero-card--association" onClick={() => nav('/for-clubs')}>
              <div className="hero-card-icon">🏒</div>
              <div className="hero-card-eyebrow">FOR LEAGUES & ASSOCIATIONS</div>
              <h2 className="hero-card-title">Bring your whole league on board.</h2>
              <p className="hero-card-text">
                Get every club in your league training off-ice. Free to start.
                Three minutes to set up.
              </p>
              <span className="hero-card-cta">See the pitch →</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================
          SQUAD BATTLES — moved up: the #1 differentiator
         ============================================================ */}
      <section className="section section--compete">
        <div className="section-head">
          <div className="section-eyebrow">⚔️ SQUAD BATTLES</div>
          <h2 className="section-title">4 vs 4. Real names. Daily pressure.</h2>
          <p className="section-sub">
            Every week you're placed in a squad of 4 with your teammates.
            Your squad faces a rival squad from another team — boys, girls, any division.
            Every shot you log shows up live. You can't hide.
          </p>
        </div>

        <SquadBattleMock />

        <div className="compete-how">
          <div className="compete-how-item">
            <div className="compete-how-num">1</div>
            <div className="compete-how-text">Every Monday you're auto-placed in a squad of 4. Squad captain picks the name.</div>
          </div>
          <div className="compete-how-item">
            <div className="compete-how-num">2</div>
            <div className="compete-how-text">Your squad gets matched against a rival squad from another team — live score on your home screen all week.</div>
          </div>
          <div className="compete-how-item">
            <div className="compete-how-num">3</div>
            <div className="compete-how-text">Most shots by Sunday wins. Who logged today is visible to your whole squad. Every shot counts.</div>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHAT YOU TRACK — shots AND stickhandling
         ============================================================ */}
      <section className="section">
        <div className="section-head">
          <div className="section-eyebrow">WHAT YOU TRACK</div>
          <h2 className="section-title">Two things every great player works on.</h2>
        </div>

        <div className="track-grid">
          <div className="track-card">
            <div className="track-card-icon">🥅</div>
            <h3 className="track-card-title">Shots</h3>
            <p className="track-card-text">
              Wrist shots. Snap shots. Slap shots. Backhands. Goalies track saves.
              Tap a type, tap a number, done. Three seconds.
            </p>
            <div className="track-card-eg">
              <span className="track-card-eg-label">EXAMPLE</span>
              <span>"50 wrist shots" → logged.</span>
            </div>
          </div>

          <div className="track-card">
            <div className="track-card-icon">🏑</div>
            <h3 className="track-card-title">Stickhandling drills</h3>
            <p className="track-card-text">
              Toe drags, figure eights, lateral moves, one-hand control —
              log your reps and every touch counts toward your streak.
            </p>
            <div className="track-card-eg">
              <span className="track-card-eg-label">EXAMPLE</span>
              <span>"30 toe drags" → logged.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PHONE MOCKUP — what the app actually looks like
         ============================================================ */}
      <section className="section section--mock">
        <div className="section-head">
          <div className="section-eyebrow">INSIDE THE APP</div>
          <h2 className="section-title">Built to be opened, tapped, and closed in 10 seconds.</h2>
          <p className="section-sub">
            No fluff. No social feed. Just your numbers, your team, and who you're chasing today.
          </p>
        </div>

        <div className="mock-wrap">
          <PlayerMock />
        </div>
      </section>

      {/* ============================================================
          ROUTINES — summer vs in-season
         ============================================================ */}
      <section className="section">
        <div className="section-head">
          <div className="section-eyebrow">FOLLOW A ROUTINE</div>
          <h2 className="section-title">A simple plan for summer and the season.</h2>
          <p className="section-sub">
            Big gains happen in the off-season. Then you keep it going through the year.
            Pick a routine, log your reps, watch yourself climb.
          </p>
        </div>

        <div className="routine-grid">
          <div className="routine-card routine-card--summer">
            <div className="routine-card-tag">
              <span className="routine-card-dot routine-card-dot--summer" />
              SUMMER · HEAVY
            </div>
            <h3 className="routine-card-title">5 days a week.</h3>
            <p className="routine-card-sub">Build the engine. This is when you get fast.</p>
            <ul className="routine-list">
              <li><span className="routine-day">MON</span><span>100 wrist shots</span></li>
              <li><span className="routine-day">TUE</span><span>10 min stickhandling</span></li>
              <li><span className="routine-day">WED</span><span>75 snap + 25 backhand</span></li>
              <li><span className="routine-day">THU</span><span>10 min stickhandling</span></li>
              <li><span className="routine-day">FRI</span><span>100 mixed shots</span></li>
              <li><span className="routine-day routine-day--rest">SAT</span><span>Rest</span></li>
              <li><span className="routine-day routine-day--rest">SUN</span><span>Rest</span></li>
            </ul>
          </div>

          <div className="routine-card routine-card--season">
            <div className="routine-card-tag">
              <span className="routine-card-dot routine-card-dot--season" />
              IN-SEASON · LIGHTER
            </div>
            <h3 className="routine-card-title">3 days a week.</h3>
            <p className="routine-card-sub">Keep what you built. Stay sharp around games.</p>
            <ul className="routine-list">
              <li><span className="routine-day">MON</span><span>50 wrist shots</span></li>
              <li><span className="routine-day routine-day--rest">TUE</span><span>Rest / game</span></li>
              <li><span className="routine-day">WED</span><span>5 min stickhandling</span></li>
              <li><span className="routine-day routine-day--rest">THU</span><span>Practice day</span></li>
              <li><span className="routine-day">FRI</span><span>50 mixed shots</span></li>
              <li><span className="routine-day routine-day--rest">SAT</span><span>Game day</span></li>
              <li><span className="routine-day routine-day--rest">SUN</span><span>Rest</span></li>
            </ul>
          </div>
        </div>

        <div className="routine-note">
          These are just starting points. You can do more, do less, or build your own. The app tracks whatever you log.
        </div>
      </section>

      {/* ============================================================
          AUDIENCE-SPECIFIC NEXT STEPS — second pass at routing
         ============================================================ */}
      <section className="section section--routes">
        <div className="section-head">
          <div className="section-eyebrow">READY TO GO?</div>
          <h2 className="section-title">Pick your next step.</h2>
        </div>

        <div className="route-list">
          <button className="route-row" onClick={() => nav('/for-clubs')}>
            <div className="route-row-icon">🏒</div>
            <div className="route-row-body">
              <div className="route-row-title">I run a league or association</div>
              <div className="route-row-text">Read the pitch. See how to bring your member clubs on board.</div>
            </div>
            <div className="route-row-arrow">→</div>
          </button>

          <button className="route-row" onClick={() => nav('/coach')}>
            <div className="route-row-icon">📋</div>
            <div className="route-row-body">
              <div className="route-row-title">I coach a team</div>
              <div className="route-row-text">Get your team's invite link. Send it to parents. Done.</div>
            </div>
            <div className="route-row-arrow">→</div>
          </button>

          <button className="route-row" onClick={() => nav('/start')}>
            <div className="route-row-icon">🎯</div>
            <div className="route-row-body">
              <div className="route-row-title">I'm a player or parent</div>
              <div className="route-row-text">Sign up your kid (or yourself). Start logging tonight.</div>
            </div>
            <div className="route-row-arrow">→</div>
          </button>
        </div>
      </section>

      {/* ============================================================
          FAQ
         ============================================================ */}
      <section className="section">
        <div className="section-head">
          <div className="section-eyebrow">FAQ</div>
          <h2 className="section-title">Common questions</h2>
        </div>
        <div className="faq-list">
          <details className="faq-item">
            <summary>Is it really free?</summary>
            <p>Yes. Players, coaches, parents, and clubs all use it free.</p>
          </details>
          <details className="faq-item">
            <summary>Do kids need an email to sign up?</summary>
            <p>No. Players pick a screen name. No email, no password. We built it that way on purpose — kids' privacy first.</p>
          </details>
          <details className="faq-item">
            <summary>What can my kid track?</summary>
            <p>Shots (wrist, snap, slap, backhand), saves for goalies, and stickhandling drills (reps or minutes). All in the same app.</p>
          </details>
          <details className="faq-item">
            <summary>Does this work for goalies?</summary>
            <p>Yes. Goalies track saves and stickhandling drills. Both count toward your rank.</p>
          </details>
          <details className="faq-item">
            <summary>How is this different from team scheduling apps?</summary>
            <p>Other apps cover games, attendance, and schedules. This is about the work kids do at home between practices. Different job. We don't compete with TeamSnap; we add what it doesn't do.</p>
          </details>
          <details className="faq-item">
            <summary>Can my whole team join?</summary>
            <p>Yes. Coaches get one invite link. Every parent who taps it puts their kid on the same team leaderboard.</p>
          </details>
          <details className="faq-item">
            <summary>What if my players don't use it?</summary>
            <p>That's the #1 thing coaches ask. The short answer: the leaderboard creates its own pressure. Once two or three kids are on the board, the ones who aren't start noticing. Start by getting five players on — the rest usually follow within a week. And if some don't log, you've learned something useful about who's putting in work between practices.</p>
          </details>
        </div>
      </section>

      {/* ============================================================
          FINAL CTA + CONTACT + FOOTER
         ============================================================ */}
      <section className="final-cta">
        <h2 className="final-cta-title">Stop telling your kid to shoot more.<br/>Show them their numbers.</h2>
        <button className="btn-primary-land" onClick={() => nav('/start')}>
          Start shooting →
        </button>
        <div className="final-cta-sub">30 seconds to sign up. No email. No catch.</div>
      </section>

      <ContactSection />

      <footer className="land-footer">
        <button className="foot-brand" onClick={() => nav('/')}>
          <BrandMark />
          <span>Hockey Shot Challenge</span>
        </button>
        <div className="foot-links">
          <button className="foot-link" onClick={() => nav('/for-clubs')}>For clubs</button>
          <button className="foot-link" onClick={() => nav('/coach')}>Coaches</button>
          <button className="foot-link" onClick={() => nav('/start')}>Sign in</button>
        </div>
        <div className="foot-copy">© {new Date().getFullYear()} Hockey Shot Challenge · Built in Burlington, ON</div>
      </footer>

      <style>{styles}</style>
    </div>
  )
}

function BrandMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 40 40" style={{ display: 'block', flexShrink: 0 }}>
      <circle cx="20" cy="20" r="17" fill="#1a2847" stroke="#2979ff" strokeWidth="1" />
      <path d="M 12 22 L 17.5 27 L 28 15" stroke="#a8d4f5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlayerMock() {
  return (
    <div className="pm-phone">
      <div className="pm-inner">
        <div className="pm-top">
          <div className="pm-avatar">C</div>
          <div>
            <div className="pm-name">Connor</div>
            <div className="pm-sub">Prospect II · 1,240 shots</div>
          </div>
          <div className="pm-streak">🔥 12</div>
        </div>

        <div className="pm-shot-grid">
          {[
            { name: 'WRIST', v: 85 },
            { name: 'SNAP', v: 42 },
            { name: 'SLAP', v: 23 },
            { name: 'BACKHAND', v: 18 },
          ].map((s) => (
            <div key={s.name} className="pm-card">
              <div className="pm-card-label">{s.name}</div>
              <div className="pm-card-val">{s.v}</div>
              <div className="pm-card-today">today</div>
            </div>
          ))}
        </div>

        <div className="pm-drill-label">STICKHANDLING</div>
        <div className="pm-drill-grid">
          <div className="pm-card pm-card--drill">
            <div className="pm-card-label">REPS</div>
            <div className="pm-card-val pm-card-val--drill">240</div>
            <div className="pm-card-today">today</div>
          </div>
          <div className="pm-card pm-card--drill">
            <div className="pm-card-label">MINUTES</div>
            <div className="pm-card-val pm-card-val--drill">8</div>
            <div className="pm-card-today">today</div>
          </div>
        </div>

        <div className="pm-chase">
          <div>
            <div className="pm-chase-label">CHASING TODAY</div>
            <div className="pm-chase-name">Liam K. · 191 today</div>
          </div>
          <div className="pm-gap">−23</div>
        </div>
      </div>
    </div>
  )
}

function SquadBattleMock() {
  const myMembers = [
    { name: 'You', shots: 95, logged: true, isMe: true, isCap: true },
    { name: 'Connor', shots: 50, logged: true, isMe: false },
    { name: 'Liam', shots: 89, logged: true, isMe: false },
    { name: 'Ethan', shots: 0, logged: false, isMe: false },
  ]
  const rivalMembers = [
    { name: 'A', shots: 102, logged: true },
    { name: 'B', shots: 78, logged: true },
    { name: 'C', shots: 56, logged: true },
    { name: 'D', shots: 0, logged: false },
  ]
  const myTotal = myMembers.reduce((s, m) => s + m.shots, 0)
  const rivalTotal = rivalMembers.reduce((s, m) => s + m.shots, 0)
  const total = myTotal + rivalTotal
  const myPct = Math.round((myTotal / total) * 100)

  return (
    <div className="sbm-wrap">
      <div className="sbm-card">
        <div className="sbm-header">
          <div className="sbm-eyebrow">⚔️ SQUAD BATTLE · 3 DAYS LEFT</div>
          <div className="sbm-share-pill">Share</div>
        </div>

        <div className="sbm-matchup">
          <div className="sbm-side">
            <div className="sbm-squad-name">
              THE SNIPERS <span className="sbm-edit">✎</span>
            </div>
            <div className="sbm-score sbm-score--trail">{myTotal}</div>
          </div>
          <div className="sbm-vs">VS</div>
          <div className="sbm-side sbm-side--right">
            <div className="sbm-squad-name sbm-squad-name--rival">ICE BREAKERS</div>
            <div className="sbm-rival-team">Oakville U14 AA</div>
            <div className="sbm-score sbm-score--lead">{rivalTotal}</div>
          </div>
        </div>

        <div className="sbm-bar-track">
          <div className="sbm-bar-fill" style={{ width: `${myPct}%` }} />
        </div>

        <div className="sbm-rosters">
          <div className="sbm-roster">
            {myMembers.map((m) => (
              <div key={m.name} className={`sbm-player${m.isMe ? ' sbm-player--me' : ''}`}>
                <div className="sbm-player-row">
                  <div className={`sbm-dot${m.logged ? ' sbm-dot--on' : ''}`} />
                  <div className="sbm-player-name">{m.name}</div>
                  {m.isCap && <div className="sbm-cap">C</div>}
                </div>
                <div className="sbm-player-shots">{m.shots > 0 ? m.shots : '—'}</div>
              </div>
            ))}
          </div>
          <div className="sbm-divider" />
          <div className="sbm-roster sbm-roster--rival">
            {rivalMembers.map((m) => (
              <div key={m.name} className="sbm-player">
                <div className="sbm-player-row">
                  <div className={`sbm-dot sbm-dot--rival${m.logged ? ' sbm-dot--on' : ''}`} />
                  <div className="sbm-player-name">{m.name}.</div>
                </div>
                <div className="sbm-player-shots">{m.shots > 0 ? m.shots : '—'}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="sbm-status">⚡ Ethan hasn't logged today. You need everyone.</div>

        <div className="sbm-log-btn">+ Log shots now</div>
      </div>
    </div>
  )
}

const styles = `
.landing {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
  width: 100%;
  max-width: none;
}
body:has(.landing) { background: var(--bg) !important; }

.land-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px clamp(16px, 5vw, 40px);
  max-width: 1200px; margin: 0 auto;
  position: sticky; top: 0;
  background: rgba(10, 14, 26, 0.88);
  backdrop-filter: blur(10px);
  z-index: 100;
}
.land-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display);
  font-weight: 800; font-size: 15px;
  letter-spacing: 0.5px;
  background: transparent;
  color: white;
  padding: 0;
  cursor: pointer;
}
.land-nav-actions { display: flex; gap: 8px; align-items: center; }
.land-nav-link {
  color: var(--ice);
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 500;
}
.land-nav-cta {
  background: var(--accent);
  color: white;
  padding: 9px 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  transition: transform 0.1s;
}
.land-nav-cta:active { transform: scale(0.97); }

/* ============ HERO ============ */
.hero {
  padding: 36px clamp(16px, 5vw, 40px) 28px;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}
.hero-eyebrow {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  background: var(--accent-bg);
  padding: 6px 12px;
  border-radius: 999px;
  margin-bottom: 18px;
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.5px;
  margin: 0 0 16px;
  color: white;
}
.hero-sub {
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.55;
  color: var(--text-soft);
  margin: 0 auto 16px;
  max-width: 560px;
}
.hero-origin {
  font-size: 13px;
  color: var(--text-mute);
  margin: 0 auto 32px;
  max-width: 560px;
}

.hero-pick {
  margin-top: 8px;
}
.hero-search-wrap {
  position: relative;
  max-width: 480px;
  margin: 0 auto 20px;
}
.hero-search-input {
  width: 100%;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 12px;
  padding: 14px 18px;
  color: var(--text);
  font-size: 15px;
  font-family: var(--font-body);
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}
.hero-search-input:focus { border-color: var(--accent); }
.hero-search-input::placeholder { color: var(--text-mute); }
.hero-search-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0; right: 0;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  z-index: 50;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4);
}
.hero-search-result {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 12px 16px;
  border-bottom: 0.5px solid var(--border-dim);
  text-align: left;
  transition: background 0.1s;
}
.hero-search-result:last-child { border-bottom: none; }
.hero-search-result:hover { background: var(--bg); }
.hero-search-result-name {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.2px;
}
.hero-search-result-meta {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 2px;
}
.hero-search-status {
  padding: 14px 16px;
  font-size: 13px;
  color: var(--text-mute);
  text-align: center;
}
.hero-search-add {
  background: transparent;
  color: var(--accent);
  font-size: 13px;
  font-weight: 600;
  padding: 0;
  display: inline;
}
.hero-pick-label {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-mute);
  letter-spacing: 2px;
  margin-bottom: 14px;
}

.hero-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  max-width: 980px;
  margin: 0 auto;
}
@media (min-width: 800px) {
  .hero-cards { grid-template-columns: repeat(3, 1fr); }
}

.hero-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 18px;
  padding: 22px 20px 20px;
  text-align: left;
  color: var(--text);
  cursor: pointer;
  transition: border-color 0.2s, transform 0.15s, background 0.2s;
  display: flex;
  flex-direction: column;
}
.hero-card:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
  background: var(--surface-raised, var(--surface));
}
.hero-card:active { transform: translateY(-1px); }
.hero-card-icon {
  font-size: 30px;
  line-height: 1;
  margin-bottom: 14px;
}
.hero-card-eyebrow {
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.8px;
  color: var(--ice);
  margin-bottom: 6px;
}
.hero-card--association .hero-card-eyebrow { color: #f4c542; }
.hero-card--coach .hero-card-eyebrow { color: var(--ice); }
.hero-card--player .hero-card-eyebrow { color: var(--accent); }

.hero-card-title {
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 800;
  color: white;
  margin: 0 0 8px;
  letter-spacing: 0.2px;
  line-height: 1.15;
}
.hero-card-text {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.45;
  margin: 0 0 16px;
  flex: 1;
}
.hero-card-cta {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.4px;
}

/* ============ SECTIONS ============ */
.section {
  padding: 56px clamp(16px, 5vw, 40px);
  max-width: 1100px;
  margin: 0 auto;
  border-top: 0.5px solid var(--border-dim);
}
.section-head {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 32px;
}
.section-eyebrow {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  margin-bottom: 12px;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.3px;
  color: white;
  margin: 0 0 12px;
}
.section-sub {
  font-size: 15px;
  color: var(--text-soft);
  line-height: 1.55;
  margin: 0;
}

/* ============ TRACK (shots + drills) ============ */
.track-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  max-width: 800px;
  margin: 0 auto;
}
@media (min-width: 700px) {
  .track-grid { grid-template-columns: 1fr 1fr; }
}
.track-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 16px;
  padding: 24px;
}
.track-card-icon {
  font-size: 36px;
  line-height: 1;
  margin-bottom: 14px;
}
.track-card-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  color: white;
  margin: 0 0 10px;
  letter-spacing: 0.2px;
}
.track-card-text {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.55;
  margin: 0 0 16px;
}
.track-card-eg {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: var(--bg);
  border-left: 2px solid var(--accent);
  border-radius: 0 8px 8px 0;
  padding: 10px 14px;
  font-size: 13px;
  color: var(--text-soft);
}
.track-card-eg-label {
  font-family: var(--font-display);
  font-size: 10px;
  color: var(--accent);
  letter-spacing: 1.5px;
  font-weight: 600;
}

/* ============ PHONE MOCK ============ */
.section--mock {
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.04));
}
.mock-wrap {
  display: flex;
  justify-content: center;
}
.pm-phone {
  width: 100%;
  max-width: 340px;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 28px;
  padding: 14px;
  box-shadow: 0 30px 80px rgba(41, 121, 255, 0.18), 0 0 0 0.5px var(--border);
}
.pm-inner {
  background: var(--bg);
  border-radius: 18px;
  padding: 14px;
}
.pm-top {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 14px;
}
.pm-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent);
  display: grid; place-items: center;
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700; color: white;
  flex-shrink: 0;
}
.pm-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  line-height: 1.1;
}
.pm-sub { font-size: 10px; color: var(--text-mute); margin-top: 2px; }
.pm-streak {
  margin-left: auto;
  font-size: 12px;
  background: rgba(255, 122, 41, 0.15);
  padding: 4px 10px;
  border-radius: 999px;
  color: var(--warn-soft);
  font-weight: 600;
}
.pm-shot-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}
.pm-card {
  background: var(--surface);
  border-radius: 12px;
  padding: 12px;
}
.pm-card-label {
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  opacity: 0.8;
}
.pm-card-val {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 800;
  color: var(--ice);
  line-height: 1;
  margin-top: 4px;
}
.pm-card-val--drill { color: var(--warn-soft); }
.pm-card-today {
  font-size: 9px;
  color: var(--text-mute);
  letter-spacing: 1px;
  margin-top: 4px;
  text-transform: uppercase;
}
.pm-drill-label {
  font-size: 9px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  font-weight: 600;
  text-transform: uppercase;
  margin: 4px 0 6px;
}
.pm-drill-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}
.pm-chase {
  background: var(--surface);
  border-left: 2px solid var(--warn);
  border-radius: 10px;
  padding: 10px 12px;
  display: flex; justify-content: space-between; align-items: center;
}
.pm-chase-label {
  font-size: 9px; color: var(--text-mute);
  letter-spacing: 1.5px; text-transform: uppercase;
  font-weight: 500;
}
.pm-chase-name {
  font-family: var(--font-display);
  font-size: 12px; font-weight: 700;
  margin-top: 2px;
}
.pm-gap {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 800;
  background: rgba(255, 122, 41, 0.15);
  color: var(--warn-soft);
  padding: 4px 11px;
  border-radius: 999px;
}

/* ============ ROUTINES ============ */
.routine-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  max-width: 900px;
  margin: 0 auto;
}
@media (min-width: 800px) {
  .routine-grid { grid-template-columns: 1fr 1fr; }
}
.routine-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 16px;
  padding: 22px;
}
.routine-card--summer { border-left: 3px solid #f4c542; }
.routine-card--season { border-left: 3px solid var(--ice); }
.routine-card-tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--text-mute);
  margin-bottom: 10px;
}
.routine-card-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
}
.routine-card-dot--summer { background: #f4c542; }
.routine-card-dot--season { background: var(--ice); }
.routine-card-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  color: white;
  margin: 0 0 6px;
}
.routine-card-sub {
  font-size: 13px;
  color: var(--text-soft);
  margin: 0 0 16px;
  line-height: 1.45;
}
.routine-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.routine-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg);
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 13px;
  color: var(--text);
}
.routine-day {
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--accent);
  min-width: 32px;
}
.routine-day--rest {
  color: var(--text-mute);
}
.routine-note {
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: var(--text-mute);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* ============ COMPETE ============ */
.section--compete {
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.04));
}
.compete-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  max-width: 900px;
  margin: 0 auto;
}
@media (min-width: 800px) {
  .compete-grid { grid-template-columns: 1fr 1fr; }
}
.compete-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 16px;
  padding: 20px;
}
.compete-card-title {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: var(--ice);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0 0 14px;
}
.compete-board {
  background: var(--bg);
  border-radius: 10px;
  padding: 10px 12px;
}
.compete-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 0.5px solid rgba(168, 212, 245, 0.06);
  font-size: 13px;
}
.compete-row:last-of-type { border-bottom: none; }
.compete-row--me {
  background: rgba(41, 121, 255, 0.1);
  margin: -8px -8px 0;
  padding: 8px 8px;
  border-radius: 8px;
}
.compete-row--win {
  background: rgba(244, 197, 66, 0.12);
  margin: -8px -8px 0;
  padding: 8px 8px;
  border-radius: 8px;
}
.compete-rank {
  width: 16px;
  font-family: var(--font-display);
  color: var(--text-mute);
  font-weight: 700;
  font-size: 11px;
}
.compete-row--me .compete-rank,
.compete-row--win .compete-rank { color: #f4c542; }
.compete-logo {
  font-size: 14px;
}
.compete-name { flex: 1; color: white; font-weight: 500; }
.compete-num {
  font-family: var(--font-display);
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: var(--ice);
}
.compete-caption-bar {
  margin-top: 12px;
  height: 6px;
  background: rgba(168, 212, 245, 0.1);
  border-radius: 3px;
  overflow: hidden;
}
.compete-caption-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--ice));
}
.compete-gap {
  font-size: 12px;
  color: var(--text-soft);
  margin-top: 8px;
}
.compete-gap strong {
  color: white;
}
.compete-caption {
  margin-top: 12px;
  font-size: 12px;
  color: var(--text-mute);
  text-align: center;
}

/* ============ SQUAD BATTLE MOCK ============ */
.sbm-wrap {
  max-width: 480px;
  margin: 0 auto 32px;
}
.sbm-card {
  background: var(--surface);
  border: 1px solid rgba(37,99,235,0.3);
  border-radius: 18px;
  padding: 18px 20px;
  box-shadow: 0 20px 60px rgba(37,99,235,0.12);
}
.sbm-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 14px;
}
.sbm-eyebrow {
  font-size: 10px; font-weight: 700; letter-spacing: 1.2px;
  color: var(--text-mute); text-transform: uppercase;
}
.sbm-share-pill {
  font-size: 11px; font-weight: 700; color: var(--ice);
  border: 1px solid var(--border-dim);
  border-radius: 6px; padding: 3px 10px;
}
.sbm-matchup {
  display: flex; align-items: flex-start; gap: 10px;
  margin-bottom: 12px;
}
.sbm-side { flex: 1; min-width: 0; }
.sbm-side--right { text-align: right; }
.sbm-squad-name {
  font-size: 14px; font-weight: 800; letter-spacing: 0.3px;
  color: white; margin-bottom: 3px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.sbm-squad-name--rival { color: var(--text-soft); }
.sbm-edit { font-size: 11px; color: var(--text-mute); margin-left: 4px; }
.sbm-rival-team { font-size: 10px; color: var(--text-mute); margin-bottom: 4px; }
.sbm-vs {
  font-size: 11px; font-weight: 800; color: var(--text-mute);
  padding-top: 20px; flex-shrink: 0;
}
.sbm-score {
  font-size: 32px; font-weight: 800; line-height: 1;
  font-variant-numeric: tabular-nums; color: var(--text-soft);
}
.sbm-score--lead { color: #ef4444; }
.sbm-score--trail { color: var(--ice); }
.sbm-bar-track {
  height: 7px; background: rgba(255,255,255,0.08);
  border-radius: 99px; overflow: hidden; margin-bottom: 16px;
}
.sbm-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #1d4ed8, #67e8f9);
  border-radius: 99px;
}
.sbm-rosters {
  display: flex; gap: 10px; margin-bottom: 12px;
}
.sbm-roster {
  display: flex; gap: 4px; flex: 1; min-width: 0;
}
.sbm-roster--rival { justify-content: flex-end; }
.sbm-divider {
  width: 1px; background: var(--border-dim);
  align-self: stretch; flex-shrink: 0;
}
.sbm-player {
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  flex: 1; min-width: 0;
}
.sbm-player--me .sbm-player-name { color: var(--ice); font-weight: 800; }
.sbm-player--me .sbm-player-shots { color: var(--ice); }
.sbm-player-row {
  display: flex; align-items: center; gap: 3px;
}
.sbm-player-name {
  font-size: 10px; font-weight: 600; color: var(--text-soft);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 48px;
}
.sbm-cap {
  font-size: 8px; font-weight: 800; color: #fbbf24;
  background: rgba(251,191,36,0.15);
  border-radius: 3px; padding: 0 3px; flex-shrink: 0;
}
.sbm-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--border-dim); flex-shrink: 0;
}
.sbm-dot--on { background: #22c55e; }
.sbm-dot--rival.sbm-dot--on { background: #ef4444; }
.sbm-player-shots {
  font-size: 15px; font-weight: 800; line-height: 1;
  color: var(--text-soft); font-variant-numeric: tabular-nums;
}
.sbm-status {
  font-size: 12px; font-weight: 600; color: #fb923c;
  background: rgba(255,255,255,0.04);
  border-radius: 8px; padding: 8px 10px;
  margin-bottom: 10px; line-height: 1.4;
}
.sbm-log-btn {
  width: 100%; background: var(--accent);
  color: white; border-radius: 10px;
  padding: 12px 16px;
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700; letter-spacing: 0.4px;
  text-align: center;
}
.compete-how {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 480px;
  margin: 0 auto 20px;
}
.compete-how-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}
.compete-how-num {
  width: 28px; height: 28px;
  background: rgba(37,99,235,0.15);
  border: 1px solid rgba(37,99,235,0.3);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800;
  color: #67e8f9;
  flex-shrink: 0;
}
.compete-how-text {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.5;
  padding-top: 4px;
}

/* ============ ROUTES (second-pass audience picker) ============ */
.section--routes {
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.06));
}
.route-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 700px;
  margin: 0 auto;
}
.route-row {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 14px;
  padding: 18px 20px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.1s;
  color: var(--text);
}
.route-row:hover {
  border-color: var(--accent);
  transform: translateX(3px);
}
.route-row-icon {
  font-size: 24px;
  flex-shrink: 0;
}
.route-row-body { flex: 1; }
.route-row-title {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.3px;
  margin-bottom: 4px;
}
.route-row-text {
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.4;
}
.route-row-arrow {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: var(--accent);
}

/* ============ FAQ ============ */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 720px;
  margin: 0 auto;
}
.faq-item {
  background: var(--surface);
  border-radius: 12px;
  padding: 4px 0;
  border: 0.5px solid var(--border-dim);
  transition: border-color 0.15s;
}
.faq-item[open] { border-color: var(--accent); }
.faq-item summary {
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
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after {
  content: '+';
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  color: var(--text-mute);
}
.faq-item[open] summary::after { content: '−'; }
.faq-item p {
  padding: 0 18px 16px;
  margin: 0;
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.55;
}

/* ============ FINAL CTA + FOOTER ============ */
.final-cta {
  padding: 70px clamp(16px, 5vw, 40px);
  text-align: center;
  border-top: 0.5px solid var(--border-dim);
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.1));
}
.final-cta-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 5vw, 40px);
  font-weight: 800;
  margin-bottom: 22px;
  line-height: 1.15;
  color: white;
  letter-spacing: -0.3px;
}
.btn-primary-land {
  background: var(--accent);
  color: white;
  padding: 16px 28px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  transition: transform 0.1s, background 0.15s;
}
.btn-primary-land:hover { background: var(--accent-soft); }
.btn-primary-land:active { transform: scale(0.98); }
.final-cta-sub {
  font-size: 13px;
  color: var(--text-mute);
  margin-top: 14px;
}

.land-footer {
  padding: 36px clamp(16px, 5vw, 40px);
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  border-top: 0.5px solid var(--border-dim);
}
.foot-brand {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.4px;
  background: transparent;
  color: white;
  padding: 0;
  cursor: pointer;
}
.foot-links { display: flex; gap: 20px; }
.foot-link {
  background: transparent;
  color: var(--text-mute);
  font-size: 13px;
  padding: 4px 0;
}
.foot-link:hover { color: var(--ice); }
.foot-copy {
  font-size: 12px;
  color: var(--text-mute);
}
`
