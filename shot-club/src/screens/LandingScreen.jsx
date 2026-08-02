import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'
import ContactSection from '../components/ContactSection'
import { searchClubs } from '../lib/clubs'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import { CHALLENGE_LIST, weeklyPace } from '../lib/challengeSpecs'

export default function LandingScreen() {
  const nav = useNavigate()
  const { player } = useAuth()
  const [clubQuery, setClubQuery] = useState('')
  const [clubResults, setClubResults] = useState([])
  const [searchingClubs, setSearchingClubs] = useState(false)
  const [totalShots, setTotalShots] = useState(null)
  const searchTimer = useRef(null)
  const searchInputRef = useRef(null)

  const challenges = CHALLENGE_LIST.map((s) => ({
    id: s.id,
    shots: s.total,
    dailyPace: Math.round(weeklyPace(s) / 5),
    label: s.label,
    color: s.id === '10k' ? '#d4af6a' : s.badge,
    landingPath: s.landingPath,
  }))

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
    supabase.rpc('get_total_shots').then(({ data }) => {
      if (data) setTotalShots(data)
    })
  }, [])

  useEffect(() => {
    setSEO({
      title: 'Free Hockey Shot Tracker & 10,000 Shot Challenge App | HockeyShotChallenge',
      description: 'Free off-ice hockey shot tracking app for players, parents, and coaches. Track wrist shots, snap shots, stickhandling, and compete in 1v1 team battles. Start tracking in 20 seconds.',
      url: CANONICAL_URL,
    })
    addStructuredData({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': `${CANONICAL_URL}#app`,
          name: 'Hockey Shot Challenge',
          url: CANONICAL_URL,
          description: 'Off-ice hockey training tracker for youth players. Log shots, track progress, climb leaderboards, compete in 1v1 battles.',
          applicationCategory: 'SportsApplication',
          operatingSystem: 'Web',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'CAD',
            availability: 'https://schema.org/InStock',
          },
          audience: {
            '@type': 'PeopleAudience',
            suggestedMinAge: '6',
            suggestedMaxAge: '18',
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            ratingCount: '50',
            bestRating: '5',
            worstRating: '1',
          },
          creator: {
            '@type': 'Organization',
            name: 'Hockey Shot Challenge',
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'Is Hockey Shot Challenge free for teams and coaches?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, Hockey Shot Challenge is completely free for individual players, parents, coaches, and entire minor hockey clubs with no subscription or app download required.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do parents manage multiple hockey players on one account?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Parents can sign in with a single Google account, add multiple player profiles, and switch between kids instantly on one centralized family dashboard.',
              },
            },
            {
              '@type': 'Question',
              name: 'What can hockey players track on the app?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Players can track wrist shots, snap shots, slap shots, backhand shots, stickhandling drills, and goalies can track saves. Each session logs in 5 seconds.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is player data private and secure?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Completely private. Parents control all privacy settings. Hockey Shot Challenge uses Google SSO for secure authentication, does not sell data, and contains no ads.',
              },
            },
          ],
        },
      ],
    })
  }, [])

  return (
    <div className="landing">
      {/* ── NAV ── */}
      <nav className="land-nav">
        <button className="land-brand" onClick={() => nav('/')}>
          <BrandMark />
          <span>Hockey Shot Challenge</span>
        </button>
        <div className="land-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="#faq" className="land-nav-link" style={{ color: 'var(--text-soft)', fontSize: '14px', textDecoration: 'none' }}>FAQ</a>
          <button className="land-nav-link" onClick={() => nav('/challenges')} style={{ color: 'var(--text-soft)', fontSize: '14px', background: 'transparent', cursor: 'pointer', border: 'none' }}>Challenges</button>
          <button className="land-nav-link" onClick={() => nav('/province-wide-challenge')} style={{ color: 'var(--text-soft)', fontSize: '14px', background: 'transparent', cursor: 'pointer', border: 'none' }}>For Leagues</button>
          <button className="land-nav-cta" onClick={() => nav(player ? '/home' : '/start?mode=signin')}>
            My Dashboard →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-eyebrow">FREE · FOR HOCKEY PLAYERS · AGES 6–18</div>
        <h1 className="hero-title">Shoot more. Track it. Shoot with your teammates.</h1>
        <p className="hero-sub">
          Log your shots and stickhandling after every practice. Parents can manage multiple kids. Your teammates, parents, and coach can all see how hard you're working.
        </p>

        {totalShots > 0 && (
          <div className="hero-stat">
            🏒 <strong>{totalShots.toLocaleString()}</strong> shots logged by real players
          </div>
        )}

        {/* CHALLENGE HUB — one picker, not two. Each card goes straight to that
            challenge's own page, where paper vs. digital gets a real choice with
            room to sell both — not a cramped sub-picker crammed onto the homepage. */}
        <div style={{ maxWidth: 900, margin: '60px auto 0', padding: '40px 20px', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: 30 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'var(--accent)', marginBottom: 12, textTransform: 'uppercase' }}>
              START HERE
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 8 }}>Pick a Challenge</h2>
            <p style={{ fontSize: 15, color: 'var(--text-soft)' }}>Free on paper or online — every sheet links straight to the app when you're ready.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, maxWidth: 800, margin: '0 auto' }}>
            {challenges.map((c) => (
              <button
                key={c.id}
                onClick={() => nav(c.landingPath)}
                style={{
                  border: '2px solid',
                  borderColor: c.color,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, rgba(${parseInt(c.color.slice(1,3), 16)}, ${parseInt(c.color.slice(3,5), 16)}, ${parseInt(c.color.slice(5,7), 16)}, 0.05) 0%, rgba(${parseInt(c.color.slice(1,3), 16)}, ${parseInt(c.color.slice(3,5), 16)}, ${parseInt(c.color.slice(5,7), 16)}, 0) 100%)`,
                  padding: 20,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 12px 24px rgba(${parseInt(c.color.slice(1,3), 16)}, ${parseInt(c.color.slice(3,5), 16)}, ${parseInt(c.color.slice(5,7), 16)}, 0.2)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 800, color: c.color, marginBottom: 8 }}>{c.label}</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: 'white', marginBottom: 4 }}>{c.shots.toLocaleString()}</div>
                <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>{c.dailyPace} shots/day</div>
              </button>
            ))}
          </div>
        </div>

        {/* Three-path split */}
        <div className="hero-paths hero-paths--three">
          <button className="hero-path hero-path--player" onClick={() => nav('/start')}>
            <div className="hero-path-eyebrow">FOR PLAYERS</div>
            <div className="hero-path-title">Go outside. Shoot. Log it. Watch your rank climb.</div>
            <div className="hero-path-detail">
              <span>🥅 Shots</span>
              <span>🏒 Stickhandling</span>
              <span>🔥 Streaks</span>
              <span>🏅 Ranks</span>
            </div>
            <div className="hero-path-btn hero-path-btn--player">Sign in to track shots →</div>
          </button>

          <button className="hero-path hero-path--parent" onClick={() => nav('/start')}>
            <div className="hero-path-eyebrow">FOR PARENTS</div>
            <div className="hero-path-title">Manage multiple kids. Watch them grow.</div>
            <div className="hero-path-detail">
              <span>👧 Multiple kids</span>
              <span>📊 Real-time stats</span>
              <span>📤 Share progress</span>
              <span>🔒 Private &amp; safe</span>
            </div>
            <div className="hero-path-btn hero-path-btn--parent">Start free →</div>
          </button>

          <button className="hero-path hero-path--coach" onClick={() => nav('/coach')}>
            <div className="hero-path-eyebrow">FOR COACHES</div>
            <div className="hero-path-title">Know who's been shooting before they walk into practice.</div>
            <div className="hero-path-detail">
              <span>📊 Who logged this week</span>
              <span>📈 Shot counts</span>
              <span>⚔️ 1v1 battles</span>
            </div>
            <div className="hero-path-btn hero-path-btn--coach">Set up my team →</div>
          </button>
        </div>

        {/* Club search */}
        <div className="hero-club-search hero-club-search--hide-mobile">
          <div className="hero-club-search-label">Is your team already on here?</div>
          <div style={{ position: 'relative', maxWidth: 420, margin: '0 auto' }}>
            <input
              ref={searchInputRef}
              type="text"
              className="hero-search-input"
              placeholder="Burlington Eagles, Mississauga…"
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
                  <div key={c.id} className="hero-search-result-wrap">
                    <button
                      className="hero-search-result"
                      onClick={() => { nav(`/clubs/${c.slug}`); setClubQuery(''); setClubResults([]) }}
                    >
                      <span className="hero-search-result-name">{c.name}</span>
                      <span className="hero-search-result-meta">
                        {[c.city, c.governing_body].filter(Boolean).join(' · ')}
                      </span>
                    </button>
                    <button
                      className="hero-search-join"
                      onClick={() => { nav(`/start?club=${c.slug}`); setClubQuery(''); setClubResults([]) }}
                    >
                      Sign up →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FAMILY ACCOUNTS ── */}
      <section className="section section--family">
        <div className="section-head">
          <div className="section-eyebrow">👨‍👩‍👧‍👦 FAMILY ACCOUNTS</div>
          <h2 className="section-title">One parent account. Multiple kids.</h2>
          <p className="section-sub">
            Parents sign in once. Add all your kids. Switch between them instantly. See all their stats in real-time from your dashboard.
          </p>
        </div>
        <div className="family-features">
          <div className="family-feature">
            <div className="family-icon">👧</div>
            <div className="family-feature-title">Manage Multiple Players</div>
            <div className="family-feature-text">Coach all your kids from one account. Track their progress side-by-side.</div>
          </div>
          <div className="family-feature">
            <div className="family-icon">📊</div>
            <div className="family-feature-title">See Real-Time Progress</div>
            <div className="family-feature-text">Watch shot counts, streaks, and rankings update instantly after each practice.</div>
          </div>
          <div className="family-feature">
            <div className="family-icon">📤</div>
            <div className="family-feature-title">Share Achievements</div>
            <div className="family-feature-text">Share 1v1 battles, rank ups, and milestones with grandparents, relatives, and friends.</div>
          </div>
          <div className="family-feature">
            <div className="family-icon">🔒</div>
            <div className="family-feature-title">Private & Secure</div>
            <div className="family-feature-text">You control who sees what. No ads. No data selling. Just hockey.</div>
          </div>
        </div>
      </section>

      {/* ── 1V1 BATTLES ── */}
      <section className="section section--compete">
        <div className="section-head">
          <div className="section-eyebrow">⚔️ 1V1 BATTLES</div>
          <h2 className="section-title">You vs one rival. All week.</h2>
          <p className="section-sub">
            Every Monday you get matched against one player from another team. Every shot you log counts. Most shots by Sunday wins. Then it resets and you get a new rival.
          </p>
        </div>
        <BattleMock />
      </section>

      {/* ── TRUST & CREDIBILITY ── */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-head">
          <div className="section-eyebrow">🛡️ TRUSTED BY HOCKEY FAMILIES</div>
          <h2 className="section-title">Youth-Safe. Parent-Controlled. Hockey-Built.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ padding: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>🔒 Privacy by Design</div>
            <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6 }}>
              No data selling. No ads. No tracking pixels. Google Sign-In only. Parents control all sharing settings. COPPA-compliant for players under 13.
            </p>
          </div>
          <div style={{ padding: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>🏒 Built by Hockey People</div>
            <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6 }}>
              Designed by a hockey parent for youth hockey development. Aligned with Hockey Canada Long-Term Player Development (LTPD) and USA Hockey guidelines for off-ice training.
            </p>
          </div>
          <div style={{ padding: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>👧 Ages 6–18 Safe</div>
            <p style={{ fontSize: 14, color: 'var(--text-soft)', lineHeight: 1.6 }}>
              Designed for youth hockey players. No messaging, no social feeds, no dark patterns. Parents get full visibility and control over their child's account.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section">
        <div className="section-head">
          <div className="section-eyebrow">FAQ</div>
          <h2 className="section-title">Quick answers</h2>
        </div>
        <div className="faq-list">
          <details className="faq-item">
            <summary>Is it really free?</summary>
            <p>Yes. Players, parents, coaches, and clubs all use it free. No subscription, no app to download.</p>
          </details>
          <details className="faq-item">
            <summary>Do kids need an email or password?</summary>
            <p>No. Sign in with a Google account — the player's own or a parent's. No passwords, no screen names — just tap to log. That's it.</p>
          </details>
          <details className="faq-item">
            <summary>What can players track?</summary>
            <p>Shots (wrist, snap, slap, backhand), saves for goalies, and stickhandling drills. Takes 5 seconds to log a session.</p>
          </details>
          <details className="faq-item">
            <summary>How do coaches get their team on it?</summary>
            <p>Sign in with Google, set up your team, and you get one invite link. Send it to parents — they tap it, sign up, and their kid appears on your team leaderboard.</p>
          </details>
          <details className="faq-item faq-item--hide-mobile">
            <summary>Can parents manage multiple kids?</summary>
            <p>Yes. Sign in once with your Google account, add all your kids, and switch between them instantly. You'll see all their stats on one dashboard.</p>
          </details>
          <details className="faq-item faq-item--hide-mobile">
            <summary>Can kids share their progress?</summary>
            <p>Yes. Share 1v1 battles, rank-ups, and milestones with anyone. Send a link to grandparents, relatives, coaches—whoever you want to show.</p>
          </details>
          <details className="faq-item faq-item--hide-mobile">
            <summary>Is my data private?</summary>
            <p>Completely. You control what's public and what's private. We don't sell data or show ads. It's just hockey.</p>
          </details>
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <button
              className="faq-view-all"
              onClick={() => {
                const hiddenItems = document.querySelectorAll('.faq-item--hide-mobile')
                hiddenItems.forEach(item => item.classList.toggle('faq-item--show-mobile'))
                event.target.textContent = event.target.textContent === 'View all FAQ' ? 'Show less' : 'View all FAQ'
              }}
            >
              View all FAQ →
            </button>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="final-cta">
        <h2 className="final-cta-title">Go shoot some pucks.<br />Then log it.</h2>
        <div className="final-cta-paths">
          <button className="final-cta-btn final-cta-btn--player" onClick={() => nav('/player')}>
            I'm a player or parent →
          </button>
          <button className="final-cta-btn final-cta-btn--coach" onClick={() => nav('/coach')}>
            I'm a coach →
          </button>
        </div>
        <div className="final-cta-sub">Free. No app to download. Takes 2 minutes to sign up.</div>
        <button className="final-cta-guide" onClick={() => nav('/blog/getting-started')}>
          New to this? Read the parent guide →
        </button>
      </section>

      <ContactSection />

      <footer className="land-footer">
        <button className="foot-brand" onClick={() => nav('/')}>
          <BrandMark />
          <span>Hockey Shot Challenge</span>
        </button>
        <div className="foot-links">
          <button className="foot-link" onClick={() => nav('/start')}>Sign in</button>
          <button className="foot-link" onClick={() => nav('/privacy')}>Privacy</button>
          <button className="foot-link foot-link--hide-mobile" onClick={() => nav('/for-clubs')}>For clubs</button>
          <button className="foot-link foot-link--hide-mobile" onClick={() => nav('/coach')}>Coaches</button>
          <button className="foot-link foot-link--hide-mobile" onClick={() => nav('/blog')}>Guides</button>
          {challenges.map((c) => (
            <button key={c.id} className="foot-link foot-link--hide-mobile" onClick={() => nav(c.landingPath)}>{c.label}</button>
          ))}
          <a href="https://www.usahockey.com" target="_blank" rel="noopener noreferrer" className="foot-link foot-link--hide-mobile" style={{ color: 'var(--text-soft)', textDecoration: 'none' }}>USA Hockey</a>
          <a href="https://www.hockeycanada.ca" target="_blank" rel="noopener noreferrer" className="foot-link foot-link--hide-mobile" style={{ color: 'var(--text-soft)', textDecoration: 'none' }}>Hockey Canada</a>
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

function BattleMock() {
  const myShots = 147
  const rivalShots = 189
  const total = myShots + rivalShots
  const myPct = Math.round((myShots / total) * 100)

  return (
    <div className="sbm-wrap">
      <div className="sbm-card">
        <div className="sbm-header">
          <div className="sbm-eyebrow">⚔️ 1V1 BATTLE · 3 DAYS LEFT</div>
          <div className="sbm-share-pill">Share</div>
        </div>

        <div className="sbm-matchup">
          <div className="sbm-side">
            <div className="sbm-name sbm-name--me">You</div>
            <div className="sbm-score">{myShots}</div>
            <div className="sbm-logged">✓ logged today</div>
          </div>
          <div className="sbm-vs">VS</div>
          <div className="sbm-side sbm-side--right">
            <div className="sbm-name">Tyler B.</div>
            <div className="sbm-score sbm-score--lead">{rivalShots}</div>
            <div className="sbm-logged sbm-logged--rival">✓ logged today</div>
          </div>
        </div>

        <div className="sbm-bar-track">
          <div className="sbm-bar-fill" style={{ width: `${myPct}%` }} />
        </div>
        <div className="sbm-rival-team">Oakville U14 AA · resets Monday</div>

        <div className="sbm-status">💪 Down 42 shots — time to push</div>
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

/* ── NAV ── */
.land-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px clamp(16px, 5vw, 40px);
  max-width: 1100px; margin: 0 auto;
  position: sticky; top: 0;
  background: rgba(10, 14, 26, 0.88);
  backdrop-filter: blur(10px);
  z-index: 100;
}
.land-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display);
  font-weight: 800; font-size: 15px; letter-spacing: 0.5px;
  background: transparent; color: white; padding: 0; cursor: pointer;
}
.land-nav-actions { display: flex; gap: 8px; align-items: center; }
.land-nav-link { color: var(--ice); padding: 8px 14px; font-size: 14px; font-weight: 500; }
@media (max-width: 600px) {
  .land-nav-link { display: none; }

  /* Hide 3rd step of "How it works" on mobile */
  .hiw-step--hide-mobile { display: none; }
  .hiw-arrow--hide-mobile { display: none; }

  /* Hide club search on mobile */
  .hero-club-search--hide-mobile { display: none; }

  /* Hide extra FAQ items on mobile, show with toggle */
  .faq-item--hide-mobile { display: none; }
  .faq-item--show-mobile { display: block !important; }

  /* Hide extra footer links on mobile */
  .foot-link--hide-mobile { display: none; }
}
.land-nav-cta {
  background: var(--accent); color: white;
  padding: 9px 18px; border-radius: 999px;
  font-size: 14px; font-weight: 600;
  transition: transform 0.1s;
}
.land-nav-cta:active { transform: scale(0.97); }

/* ── HERO ── */
.hero {
  padding: 44px clamp(16px, 5vw, 40px) 40px;
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
}
.hero-eyebrow {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 11px; font-weight: 600; color: var(--ice);
  letter-spacing: 2px;
  background: var(--accent-bg);
  padding: 6px 12px; border-radius: 999px;
  margin-bottom: 18px;
}
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 5.5vw, 48px);
  font-weight: 800; line-height: 1.05;
  letter-spacing: -0.5px;
  margin: 0 0 16px; color: white;
}
.hero-sub {
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.55; color: var(--text-soft);
  margin: 0 auto 16px; max-width: 560px;
}
.hero-stat {
  font-size: 14px; color: var(--text-soft);
  margin: 0 auto 28px; letter-spacing: 0.2px;
}
.hero-stat strong { color: white; font-weight: 700; }

/* Multi-path cards */
.hero-paths {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 14px;
  margin-bottom: 32px;
  text-align: left;
}
.hero-paths--three {
  grid-template-columns: 1fr 1fr 1fr;
}
@media (max-width: 900px) {
  .hero-paths--three { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 560px) {
  .hero-paths { grid-template-columns: 1fr; }
}
.hero-path {
  border-radius: 18px;
  padding: 22px 20px;
  display: flex; flex-direction: column; gap: 10px;
  cursor: pointer; transition: transform 0.12s;
  text-align: left;
}
.hero-path:active { transform: scale(0.98); }
.hero-path--player {
  background: #0f1e3a;
  border: 1.5px solid rgba(41,121,255,0.5);
  box-shadow: 0 4px 24px rgba(41,121,255,0.12);
}
.hero-path--parent {
  background: #1a0f2e;
  border: 1.5px solid rgba(168,100,215,0.5);
  box-shadow: 0 4px 24px rgba(168,100,215,0.12);
}
.hero-path--coach {
  background: #0e1a14;
  border: 1.5px solid rgba(45,180,100,0.4);
  box-shadow: 0 4px 24px rgba(45,180,100,0.08);
}
.hero-path-eyebrow {
  font-size: 10px; font-weight: 700; letter-spacing: 2px;
  color: var(--text-mute);
}
.hero-path--player .hero-path-eyebrow { color: #60a5fa; }
.hero-path--coach .hero-path-eyebrow { color: #4ade80; }
.hero-path-title {
  font-family: var(--font-display);
  font-size: clamp(15px, 2.5vw, 18px);
  font-weight: 800; color: white;
  line-height: 1.2; flex: 1;
}
.hero-path-detail {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.hero-path-detail span {
  font-size: 12px; color: var(--text-soft);
  background: rgba(255,255,255,0.05);
  border-radius: 6px; padding: 3px 8px;
}
.hero-path-btn {
  font-family: var(--font-display);
  font-size: 15px; font-weight: 800;
  padding: 12px 16px; border-radius: 10px;
  text-align: center; margin-top: 4px;
  letter-spacing: 0.2px;
}
.hero-path-btn--player {
  background: var(--accent); color: white;
  box-shadow: 0 2px 12px rgba(41,121,255,0.4);
}
.hero-path-btn--parent {
  background: rgba(168,100,215,0.18); color: #d8b4fe;
  border: 1.5px solid rgba(168,100,215,0.45);
}
.hero-path-btn--coach {
  background: rgba(45,180,100,0.18); color: #4ade80;
  border: 1.5px solid rgba(45,180,100,0.45);
}

/* Club search */
.hero-club-search {
  max-width: 520px; margin: 0 auto;
  text-align: center;
}
.hero-club-search-label {
  font-size: 11px; color: var(--text-mute);
  letter-spacing: 1.5px; text-transform: uppercase;
  font-weight: 500; margin-bottom: 10px;
}
.hero-search-input {
  width: 100%;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 12px;
  padding: 12px 16px;
  color: var(--text); font-size: 14px;
  font-family: var(--font-body); outline: none;
  transition: border-color 0.15s; box-sizing: border-box;
}
.hero-search-input:focus { border-color: var(--accent); }
.hero-search-input::placeholder { color: var(--text-mute); }
.hero-search-dropdown {
  position: absolute; top: calc(100% + 6px); left: 0; right: 0;
  background: var(--surface); border: 0.5px solid var(--border);
  border-radius: 12px; overflow: hidden; z-index: 50;
  box-shadow: 0 12px 40px rgba(0,0,0,0.4);
}
.hero-search-result-wrap {
  display: flex; align-items: center;
  border-bottom: 0.5px solid var(--border-dim);
  padding-right: 10px;
}
.hero-search-result-wrap:last-child { border-bottom: none; }
.hero-search-result {
  display: flex; flex-direction: column; align-items: flex-start;
  flex: 1; padding: 12px 16px; text-align: left; transition: background 0.1s;
}
.hero-search-result:hover { background: var(--bg); }
.hero-search-join {
  background: rgba(41,121,255,0.15); color: #60a5fa;
  border: 1px solid rgba(41,121,255,0.3);
  border-radius: 8px; padding: 6px 12px;
  font-size: 13px; font-weight: 700; white-space: nowrap; flex-shrink: 0;
}
.hero-search-result-name {
  font-family: var(--font-display); font-size: 15px; font-weight: 700;
  color: white; letter-spacing: 0.2px;
}
.hero-search-result-meta { font-size: 12px; color: var(--text-mute); margin-top: 2px; }
.hero-search-status {
  padding: 14px 16px; font-size: 13px; color: var(--text-mute); text-align: center;
}
.hero-search-add {
  background: transparent; color: var(--accent); font-size: 13px;
  font-weight: 600; padding: 0; display: inline;
}

/* ── HOW IT WORKS ── */
.hiw {
  border-top: 0.5px solid var(--border-dim);
  padding: 44px clamp(16px, 5vw, 40px);
  max-width: 1100px; margin: 0 auto;
  text-align: center;
}
.hiw-label {
  font-family: var(--font-display); font-size: 11px; font-weight: 600;
  color: var(--ice); letter-spacing: 2px; margin-bottom: 28px;
}
.hiw-steps {
  display: flex; align-items: flex-start; justify-content: center;
  gap: 8px; flex-wrap: wrap;
}
.hiw-arrow {
  font-size: 20px; color: var(--border);
  padding-top: 52px; flex-shrink: 0;
}
@media (max-width: 640px) { .hiw-arrow { display: none; } }
.hiw-step {
  flex: 1; min-width: 180px; max-width: 240px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.hiw-step-num {
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(41,121,255,0.15); border: 1px solid rgba(41,121,255,0.4);
  color: #60a5fa; font-family: var(--font-display); font-size: 13px; font-weight: 800;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.hiw-step-visual {
  width: 100%; background: #0f1928;
  border: 1px solid #1e2f4a; border-radius: 14px;
  padding: 14px; min-height: 88px;
  display: flex; flex-direction: column; justify-content: center; gap: 8px;
}
.hiw-google-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: white; color: #1a1a2e;
  padding: 9px 12px; border-radius: 8px;
  font-family: var(--font-display); font-size: 12px; font-weight: 700;
}
.hiw-visual-hint { font-size: 11px; color: #4a6080; text-align: center; }
.hiw-shot-types { display: flex; gap: 5px; flex-wrap: wrap; justify-content: center; }
.hiw-shot-pill {
  font-size: 11px; font-weight: 600; color: #4a6080;
  background: #0a1220; border: 1px solid #1e2f4a;
  border-radius: 6px; padding: 4px 8px;
}
.hiw-shot-pill--active {
  background: rgba(41,121,255,0.2); border-color: rgba(41,121,255,0.5);
  color: #60a5fa;
}
.hiw-shot-count {
  display: flex; align-items: center; justify-content: space-between;
  background: #0a1220; border: 1px solid #1e2f4a;
  border-radius: 8px; padding: 8px 12px;
}
.hiw-shot-num {
  font-family: var(--font-display); font-size: 22px; font-weight: 800; color: white;
}
.hiw-shot-save {
  font-family: var(--font-display); font-size: 12px; font-weight: 700;
  color: white; background: var(--accent); padding: 5px 10px; border-radius: 6px;
}
.hiw-board-row {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 8px; border-radius: 7px;
}
.hiw-board-row--you {
  background: rgba(41,121,255,0.15); border: 1px solid rgba(41,121,255,0.3);
}
.hiw-board-pos { font-size: 11px; color: #4a6080; font-weight: 700; width: 20px; }
.hiw-board-row--you .hiw-board-pos { color: #60a5fa; }
.hiw-board-name { font-size: 12px; font-weight: 700; color: var(--text-soft); flex: 1; text-align: left; }
.hiw-board-row--you .hiw-board-name { color: white; }
.hiw-board-shots { font-family: var(--font-display); font-size: 13px; font-weight: 800; color: #60a5fa; }
.hiw-step-text { font-size: 13px; color: var(--text-soft); line-height: 1.5; text-align: center; }
.hiw-footer {
  margin-top: 28px; font-size: 14px; color: var(--text-soft);
  background: rgba(255,255,255,0.03); border: 1px solid var(--border-dim);
  border-radius: 10px; padding: 12px 20px; display: inline-block;
}

/* ── SECTIONS ── */
.section {
  padding: 56px clamp(16px, 5vw, 40px);
  max-width: 1100px; margin: 0 auto;
  border-top: 0.5px solid var(--border-dim);
}
.section-head {
  text-align: center; max-width: 640px; margin: 0 auto 32px;
}
.section-eyebrow {
  font-family: var(--font-display); font-size: 11px; font-weight: 600;
  color: var(--ice); letter-spacing: 2px; margin-bottom: 12px;
}
.section-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 36px); font-weight: 800;
  line-height: 1.1; letter-spacing: -0.3px; color: white; margin: 0 0 12px;
}
.section-sub { font-size: 15px; color: var(--text-soft); line-height: 1.55; margin: 0; }

/* ── BATTLE MOCK ── */
.section--compete {
  background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.04));
}
.sbm-wrap { max-width: 420px; margin: 0 auto; }
.sbm-card {
  background: var(--surface);
  border: 1px solid rgba(37,99,235,0.3);
  border-radius: 18px; padding: 18px 20px;
  box-shadow: 0 20px 60px rgba(37,99,235,0.12);
}
.sbm-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.sbm-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 1.2px; color: var(--text-mute); text-transform: uppercase; }
.sbm-share-pill { font-size: 11px; font-weight: 700; color: var(--ice); border: 1px solid var(--border-dim); border-radius: 6px; padding: 3px 10px; }
.sbm-matchup { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
.sbm-side { flex: 1; min-width: 0; }
.sbm-side--right { text-align: right; }
.sbm-name { font-size: 14px; font-weight: 700; color: var(--text-soft); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sbm-name--me { color: var(--ice); }
.sbm-vs { font-size: 12px; font-weight: 800; color: var(--text-mute); flex-shrink: 0; }
.sbm-score { font-size: 38px; font-weight: 800; line-height: 1; font-variant-numeric: tabular-nums; color: var(--text-soft); }
.sbm-score--lead { color: white; }
.sbm-logged { font-size: 11px; color: var(--text-mute); margin-top: 3px; }
.sbm-bar-track { height: 7px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden; margin-bottom: 6px; }
.sbm-bar-fill { height: 100%; background: linear-gradient(90deg, #1d4ed8, #67e8f9); border-radius: 99px; }
.sbm-rival-team { font-size: 11px; color: var(--text-mute); text-align: center; margin-bottom: 10px; }
.sbm-status { font-size: 12px; font-weight: 600; color: #f87171; background: rgba(255,255,255,0.04); border-radius: 8px; padding: 8px 10px; margin-bottom: 10px; line-height: 1.4; }
.sbm-log-btn { width: 100%; background: var(--accent); color: white; border-radius: 10px; padding: 12px 16px; font-family: var(--font-display); font-size: 14px; font-weight: 700; letter-spacing: 0.4px; text-align: center; }

/* ── FAMILY ACCOUNTS ── */
.section--family { border-top: 0.5px solid var(--border-dim); background: rgba(45,180,100,0.04); }
.family-features {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px; margin-top: 32px;
}
.family-feature {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  padding: 24px; background: var(--surface);
  border: 1px solid rgba(45,180,100,0.2); border-radius: 16px;
}
.family-icon {
  font-size: 40px; margin-bottom: 12px;
}
.family-feature-title {
  font-family: var(--font-display); font-size: 16px; font-weight: 700;
  color: white; margin-bottom: 8px; letter-spacing: 0.2px;
}
.family-feature-text {
  font-size: 14px; color: var(--text-soft); line-height: 1.5;
}

/* ── FAQ ── */
.faq-list { display: flex; flex-direction: column; gap: 6px; max-width: 680px; margin: 0 auto; }
.faq-item { background: var(--surface); border-radius: 12px; padding: 4px 0; border: 0.5px solid var(--border-dim); transition: border-color 0.15s; }
.faq-item[open] { border-color: var(--accent); }
.faq-item summary { padding: 16px 18px; cursor: pointer; font-family: var(--font-display); font-size: 15px; font-weight: 700; color: white; letter-spacing: 0.3px; list-style: none; position: relative; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary::after { content: '+'; position: absolute; right: 18px; top: 50%; transform: translateY(-50%); font-family: var(--font-display); font-size: 22px; font-weight: 400; color: var(--text-mute); }
.faq-item[open] summary::after { content: '−'; }
.faq-item p { padding: 0 18px 16px; margin: 0; font-size: 14px; color: var(--text-soft); line-height: 1.55; }
.faq-view-all {
  background: transparent;
  color: var(--ice);
  font-size: 14px;
  font-weight: 600;
  padding: 8px 0;
  cursor: pointer;
  border: none;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.faq-view-all:hover { color: white; }

/* ── FINAL CTA ── */
.final-cta {
  padding: 70px clamp(16px, 5vw, 40px);
  text-align: center;
  border-top: 0.5px solid var(--border-dim);
  background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.08));
}
.final-cta-title {
  font-family: var(--font-display);
  font-size: clamp(22px, 4.5vw, 36px); font-weight: 800;
  margin-bottom: 28px; line-height: 1.15; color: white; letter-spacing: -0.3px;
}
.final-cta-paths {
  display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
  margin-bottom: 16px;
}
.final-cta-btn {
  padding: 15px 28px; border-radius: 12px;
  font-family: var(--font-display); font-size: 16px; font-weight: 700;
  transition: transform 0.1s;
}
.final-cta-btn:active { transform: scale(0.98); }
.final-cta-btn--player { background: var(--accent); color: white; }
.final-cta-btn--coach { background: rgba(45,180,100,0.15); color: #4ade80; border: 1.5px solid rgba(45,180,100,0.4); }
.final-cta-sub { font-size: 13px; color: var(--text-mute); margin-bottom: 14px; }
.final-cta-guide {
  background: transparent; color: var(--text-mute);
  font-size: 13px; text-decoration: underline;
  text-underline-offset: 3px; padding: 0; cursor: pointer;
}
.final-cta-guide:hover { color: var(--ice); }

/* ── FOOTER ── */
.land-footer {
  padding: 36px clamp(16px, 5vw, 40px);
  max-width: 1100px; margin: 0 auto;
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 16px;
  border-top: 0.5px solid var(--border-dim);
}
.foot-brand {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-display); font-size: 14px; font-weight: 700;
  letter-spacing: 0.4px; background: transparent; color: white; padding: 0; cursor: pointer;
}
.foot-links { display: flex; gap: 20px; flex-wrap: wrap; }
.foot-link { background: transparent; color: var(--text-mute); font-size: 13px; padding: 4px 0; }
.foot-link:hover { color: var(--ice); }
.foot-copy { font-size: 12px; color: var(--text-mute); }
`
