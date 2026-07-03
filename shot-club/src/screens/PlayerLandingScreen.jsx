import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'
import { AppMockupSection, RoutineSection } from '../components/LandingSharedSections'
import { searchClubs } from '../lib/clubs'

export default function PlayerLandingScreen() {
  const nav = useNavigate()
  const [clubQuery, setClubQuery] = useState('')
  const [clubResults, setClubResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [selectedClub, setSelectedClub] = useState(null)
  const searchTimer = useRef(null)

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
        const results = await searchClubs(clubQuery, 5)
        setClubResults(results || [])
      } catch (e) {
        setClubResults([])
      } finally {
        setSearching(false)
      }
    }, 200)
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current) }
  }, [clubQuery])

  const handleStart = () => {
    if (selectedClub) {
      nav(`/start?club=${selectedClub.slug}`)
    } else {
      nav('/start')
    }
  }

  useEffect(() => {
    setSEO({
      title: 'Hockey Shot Tracker for Kids — Log Shots & Earn Ranks',
      description: 'Free off-ice hockey practice tracker for kids ages 6–18. Log shots and stickhandling every day, earn ranks from Rookie to Legend, and compete in weekly squad battles.',
      url: `${CANONICAL_URL}/player`,
    })
    addStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Hockey Shot Challenge',
        url: 'https://hockeyshotchallenge.com',
        applicationCategory: 'SportsApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
        description: 'Free off-ice hockey practice tracker for kids. Log shots and stickhandling reps, earn ranks, and compete in weekly squad battles.',
        audience: { '@type': 'Audience', audienceType: 'Hockey players ages 6–18 and their parents' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is Hockey Shot Challenge free for players?',
            acceptedAnswer: { '@type': 'Answer', text: 'Yes. Hockey Shot Challenge is completely free for players and parents. No subscription, no app to download, no hidden fees.' },
          },
          {
            '@type': 'Question',
            name: 'What age is Hockey Shot Challenge for?',
            acceptedAnswer: { '@type': 'Answer', text: 'Hockey Shot Challenge is designed for hockey players ages 6–18. Parents sign in with their Google account and set up their child\'s profile.' },
          },
          {
            '@type': 'Question',
            name: 'What do kids track on Hockey Shot Challenge?',
            acceptedAnswer: { '@type': 'Answer', text: 'Kids log wrist shots, snap shots, slap shots, backhand shots, and stickhandling reps (toe drags, figure eights, lateral moves). Sessions take 5 seconds to log.' },
          },
        ],
      },
    ])
  }, [])

  return (
    <div className="pl-wrap">
      <nav className="pl-nav">
        <button className="pl-back" onClick={() => nav('/')}>← Back</button>
        <button className="pl-nav-cta" onClick={() => nav('/start')}>Start free →</button>
      </nav>

      <section className="pl-hero">
        <div className="pl-eyebrow">FREE · SIGN IN WITH GOOGLE · AGES 6–18</div>
        <h1 className="pl-title">Log your shots.<br/>Beat your teammates.</h1>
        <p className="pl-sub">
          Every day, log how many shots and stickhandling reps you did at home. Watch your rank climb. Compete against other teams every week.
        </p>
        <div className="pl-club-search">
          <div className="pl-club-search-label">Find your club first (optional)</div>
          {selectedClub ? (
            <div className="pl-club-selected">
              <span className="pl-club-selected-name">{selectedClub.name}</span>
              {selectedClub.city && <span className="pl-club-selected-city">{selectedClub.city}</span>}
              <button className="pl-club-change" onClick={() => { setSelectedClub(null); setClubQuery('') }}>Change</button>
            </div>
          ) : (
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="pl-club-input"
                placeholder="Burlington Eagles, Mississauga…"
                value={clubQuery}
                onChange={(e) => setClubQuery(e.target.value)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
              />
              {clubQuery.trim().length >= 2 && (
                <div className="pl-club-dropdown">
                  {searching && <div className="pl-club-status">Searching…</div>}
                  {!searching && clubResults.length === 0 && (
                    <div className="pl-club-status">No clubs found — you can still sign up.</div>
                  )}
                  {clubResults.map((c) => (
                    <button
                      key={c.id}
                      className="pl-club-result"
                      onClick={() => { setSelectedClub(c); setClubQuery(''); setClubResults([]) }}
                    >
                      <span className="pl-club-result-name">{c.name}</span>
                      {c.city && <span className="pl-club-result-meta">{c.city}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <button className="pl-cta" onClick={handleStart}>
          {selectedClub ? `Start with ${selectedClub.name} →` : 'Start for free — takes 30 seconds →'}
        </button>
        <p className="pl-cta-hint">Sign in with your Google account. No credit card. Just hockey.</p>
      </section>

      <section className="pl-steps">
        <h2 className="pl-section-title">Here's how it works</h2>
        <div className="pl-step-list">
          <div className="pl-step">
            <div className="pl-step-num">1</div>
            <div className="pl-step-body">
              <div className="pl-step-title">Sign up in 30 seconds</div>
              <div className="pl-step-text">Sign in with Google. Pick your team. Create your screen name. Done.</div>
            </div>
          </div>
          <div className="pl-step">
            <div className="pl-step-num">2</div>
            <div className="pl-step-body">
              <div className="pl-step-title">Log shots and stickhandling every day</div>
              <div className="pl-step-text">Tap a shot type or stickhandling drill. Enter how many. Takes 5 seconds. The more you log, the higher you climb.</div>
            </div>
          </div>
          <div className="pl-step">
            <div className="pl-step-num">3</div>
            <div className="pl-step-body">
              <div className="pl-step-title">Compete every week</div>
              <div className="pl-step-text">Every Monday, you get placed with 3 teammates. Your squad faces a rival squad from another team. Most reps by Sunday wins.</div>
            </div>
          </div>
        </div>
      </section>

      <AppMockupSection />

      <RoutineSection />

      <section className="pl-videos">
        <div className="pl-videos-inner">
          <div className="pl-eyebrow">SKILL VIDEOS</div>
          <h2 className="pl-section-title pl-section-title--left">Watch a drill. Then go do it.</h2>
          <p className="pl-section-sub pl-section-sub--left">
            The app includes curated YouTube videos for every shot type and stickhandling skill — wrist shots, snap shots, toe drags, figure eights, and more. Pick a drill, watch it once, then log your reps.
          </p>
          <div className="pl-video-types">
            {['Wrist shots', 'Snap shots', 'Slap shots', 'Backhand shots', 'Toe drags', 'Figure eights', 'Lateral moves', 'One-hand drills'].map((v) => (
              <div key={v} className="pl-video-tag">{v}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="pl-what">
        <h2 className="pl-section-title">What you track</h2>
        <div className="pl-what-grid">
          <div className="pl-what-card">
            <div className="pl-what-icon">🥅</div>
            <div className="pl-what-title">Shots</div>
            <div className="pl-what-text">Wrist, snap, slap, and backhand shots. Goalies track saves. Tap and log — takes 3 seconds.</div>
          </div>
          <div className="pl-what-card">
            <div className="pl-what-icon">🏒</div>
            <div className="pl-what-title">Stickhandling</div>
            <div className="pl-what-text">Toe drags, figure eights, lateral moves, one-hand. Every rep counts.</div>
          </div>
          <div className="pl-what-card">
            <div className="pl-what-icon">🔥</div>
            <div className="pl-what-title">Streaks</div>
            <div className="pl-what-text">Log every day and build your streak. Miss a day and it resets. Simple.</div>
          </div>
          <div className="pl-what-card">
            <div className="pl-what-icon">🏅</div>
            <div className="pl-what-title">Ranks</div>
            <div className="pl-what-text">Start at Rookie. Work your way up to Pro, Elite, and Legend. Your rank shows on your player card.</div>
          </div>
        </div>
      </section>

      <section className="pl-parent">
        <div className="pl-parent-inner">
          <div className="pl-parent-badge">FOR PARENTS</div>
          <h2 className="pl-parent-title">Signing up your kid?</h2>
          <ul className="pl-parent-list">
            <li>You sign in with your Google account — your kid never needs a password</li>
            <li>You can add multiple kids to one account and switch between them</li>
            <li>You can see your kid's shot count and rank any time</li>
            <li>Free. No subscription. No hidden fees.</li>
          </ul>
          <button className="pl-cta" onClick={() => nav('/start')}>
            Sign up for my player →
          </button>
          <p className="pl-cta-hint" style={{ marginTop: 20 }}>
            New to this? Read our{' '}
            <button className="pl-inline-link" onClick={() => nav('/blog/getting-started')}>5-step parent guide →</button>
          </p>
        </div>
      </section>

      <style>{`
        .pl-inline-link {
          background: transparent; color: #60a5fa;
          font-size: inherit; font-family: inherit;
          text-decoration: underline; text-underline-offset: 3px;
          cursor: pointer; padding: 0;
        }
        .pl-inline-link:hover { color: white; }
      `}</style>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.pl-wrap {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
}

.pl-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  max-width: 720px;
  margin: 0 auto;
}
.pl-back {
  color: #8899b4;
  font-size: 15px;
  background: transparent;
}
.pl-back:hover { color: white; }
.pl-nav-cta {
  background: var(--accent);
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.pl-hero {
  text-align: center;
  padding: 40px 20px 50px;
  max-width: 600px;
  margin: 0 auto;
}
.pl-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #60a5fa;
  margin-bottom: 16px;
}
.pl-title {
  font-family: var(--font-display);
  font-size: clamp(36px, 8vw, 56px);
  font-weight: 800;
  color: white;
  line-height: 1.05;
  letter-spacing: -0.5px;
  margin-bottom: 18px;
}
.pl-sub {
  font-size: 18px;
  color: #a8b8d0;
  line-height: 1.55;
  margin-bottom: 28px;
}
.pl-cta {
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
  max-width: 400px;
}
.pl-cta:active { transform: scale(0.98); }
.pl-cta-hint {
  font-size: 13px;
  color: #6b7fa8;
  margin-top: 10px;
}

.pl-club-search {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 16px;
  text-align: left;
}
.pl-club-search-label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #4a6080;
  text-transform: uppercase;
  margin-bottom: 8px;
}
.pl-club-input {
  width: 100%;
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 10px;
  padding: 12px 14px;
  color: var(--text);
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}
.pl-club-input:focus { border-color: var(--accent); }
.pl-club-input::placeholder { color: #3a5070; }
.pl-club-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 10px;
  overflow: hidden;
  z-index: 50;
  box-shadow: 0 12px 40px rgba(0,0,0,0.5);
}
.pl-club-result {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 11px 14px;
  border-bottom: 1px solid #1a2847;
  text-align: left;
  transition: background 0.1s;
}
.pl-club-result:last-child { border-bottom: none; }
.pl-club-result:hover { background: #0a0e1a; }
.pl-club-result-name {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: white;
}
.pl-club-result-meta {
  font-size: 12px;
  color: #4a6080;
  margin-top: 2px;
}
.pl-club-status {
  padding: 12px 14px;
  font-size: 13px;
  color: #4a6080;
  text-align: center;
}
.pl-club-selected {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(41,121,255,0.12);
  border: 1px solid rgba(41,121,255,0.35);
  border-radius: 10px;
  padding: 10px 14px;
}
.pl-club-selected-name {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: white;
  flex: 1;
}
.pl-club-selected-city {
  font-size: 12px;
  color: #6b7fa8;
}
.pl-club-change {
  background: transparent;
  color: #60a5fa;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
}

.pl-steps {
  padding: 50px 20px;
  max-width: 640px;
  margin: 0 auto;
  border-top: 1px solid #1a2035;
}
.pl-section-title {
  font-family: var(--font-display);
  font-size: clamp(22px, 4vw, 30px);
  font-weight: 800;
  color: white;
  margin-bottom: 28px;
  letter-spacing: 0.2px;
}
.pl-section-title--left { text-align: left; }
.pl-section-sub { font-size: 16px; color: #8899b4; line-height: 1.55; margin-bottom: 20px; }
.pl-section-sub--left { text-align: left; }
.pl-step-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.pl-step {
  display: flex;
  gap: 18px;
  align-items: flex-start;
}
.pl-step-num {
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
}
.pl-step-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
}
.pl-step-text {
  font-size: 15px;
  color: #8899b4;
  line-height: 1.55;
}

.pl-videos {
  border-top: 1px solid #1a2035;
  padding: 50px 20px;
}
.pl-videos-inner {
  max-width: 640px;
  margin: 0 auto;
}
.pl-video-types {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.pl-video-tag {
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 20px;
  padding: 7px 14px;
  font-size: 14px;
  color: #a8b8d0;
  font-weight: 500;
}

.pl-what {
  padding: 50px 20px;
  max-width: 640px;
  margin: 0 auto;
  border-top: 1px solid #1a2035;
}
.pl-what-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 400px) {
  .pl-what-grid { grid-template-columns: 1fr; }
}
.pl-what-card {
  background: #0f1624;
  border: 1px solid #1a2847;
  border-radius: 14px;
  padding: 18px 16px;
}
.pl-what-icon {
  font-size: 28px;
  margin-bottom: 10px;
}
.pl-what-title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
}
.pl-what-text {
  font-size: 14px;
  color: #8899b4;
  line-height: 1.5;
}

.pl-parent {
  background: #080d1a;
  border-top: 1px solid #1a2035;
  border-bottom: 1px solid #1a2035;
  padding: 50px 20px;
}
.pl-parent-inner {
  max-width: 560px;
  margin: 0 auto;
}
.pl-parent-badge {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #60a5fa;
  margin-bottom: 12px;
}
.pl-parent-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 5vw, 32px);
  font-weight: 800;
  color: white;
  margin-bottom: 20px;
}
.pl-parent-list {
  list-style: none;
  padding: 0;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.pl-parent-list li {
  font-size: 16px;
  color: #a8b8d0;
  line-height: 1.5;
  padding-left: 24px;
  position: relative;
}
.pl-parent-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #60a5fa;
  font-weight: 700;
}
`
