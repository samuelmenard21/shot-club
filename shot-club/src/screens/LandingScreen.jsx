import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'

export default function LandingScreen() {
  const nav = useNavigate()

  const scrollToPaths = () => {
    document.getElementById('choose-path')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    setSEO({
      title: null,
      description: 'The off-ice training platform built for the whole hockey family. Players log shots, learn a new skill every day, and challenge teammates, rival teams, and rival clubs.',
      url: CANONICAL_URL,
    })

    addStructuredData({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${CANONICAL_URL}/#org`,
          name: 'Hockey Shot Challenge',
          url: CANONICAL_URL,
          logo: `${CANONICAL_URL}/logo.png`,
          description: 'Off-ice training platform for youth hockey clubs, teams, and players ages 6-18.',
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${CANONICAL_URL}/#app`,
          name: 'Hockey Shot Challenge',
          applicationCategory: 'SportsApplication',
          operatingSystem: 'Web',
          url: CANONICAL_URL,
          description: 'Off-ice training web app for minor hockey clubs, coaches, and players ages 6-18. Players log shots, watch a daily skill video, and compete in player, team, and club challenges. Browser-based, no download required.',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
          audience: { '@type': 'Audience', audienceType: 'Youth Hockey Players, Coaches, Clubs' },
        },
        {
          '@type': 'FAQPage',
          '@id': `${CANONICAL_URL}/#faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is Hockey Shot Challenge?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Hockey Shot Challenge is an off-ice training platform built for youth hockey clubs and teams. Players ages 6 to 18 log their off-ice shooting practice, watch a new skill video every day, and compete in challenges against teammates, rival teams, and rival clubs. Coaches see weekly team progress on a dashboard, and clubs can run head-to-head challenges across whole associations.',
              },
            },
            {
              '@type': 'Question',
              name: 'What does Hockey Shot Challenge do that other hockey apps don\'t?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Most hockey stats apps track in-game performance. A few track team scheduling. None of them track off-ice training, deliver daily skill development, and connect entire clubs around the work kids do at home. Hockey Shot Challenge combines all three: log your shots, learn something new every day, and compete with teammates, rival teams, and rival clubs.',
              },
            },
            {
              '@type': 'Question',
              name: 'How do the daily skill videos work?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Every day, players see a new short skill video — a stickhandling drill, a shooting tip, an edge work technique — they can try at home that same day. Content is curated from hockey coaches and skill creators, every video reviewed before it appears in the app. Videos are matched to the player\'s age, so a U8 sees different content than a U16.',
              },
            },
            {
              '@type': 'Question',
              name: 'What are the three types of challenges?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Player vs. player happens inside a team — teammates competing on weekly shot totals or streaks. Team vs. team happens across a club — coaches put their teams head-to-head. Club vs. club happens across associations — two clubs opt in to a monthly matchup like "first to 10,000 shots wins."',
              },
            },
            {
              '@type': 'Question',
              name: 'Do I need to download an app?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Hockey Shot Challenge runs in any web browser on phones, tablets, and computers. There is nothing to install from the App Store or Google Play.',
              },
            },
            {
              '@type': 'Question',
              name: 'How does a hockey club get started?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A coach or club director signs up through their club\'s dedicated link, sets up their team in under three minutes, and shares a player invite link with parents. Players then log their off-ice shots from home, watch the daily skill video, and see their progress on the team leaderboard.',
              },
            },
            {
              '@type': 'Question',
              name: 'Is Hockey Shot Challenge safe for kids?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Players use a screen name, not a real name. There is no chat between players, no public profiles, and no data sold to third parties. Coaches see only their own team. All skill video content is reviewed before it appears in the app.',
              },
            },
            {
              '@type': 'Question',
              name: 'How much does Hockey Shot Challenge cost?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Hockey Shot Challenge is free for all clubs, coaches, players, and parents. There is no subscription and no paid tier.',
              },
            },
            {
              '@type': 'Question',
              name: 'What ages is Hockey Shot Challenge designed for?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Built for youth hockey players ages 6 to 18, covering U7 through U18 divisions, plus House League, Select, A, AA, and AAA tiers.',
              },
            },
          ],
        },
      ],
    })
  }, [])

  return (
    <div className="landing">
      {/* Nav */}
      <nav className="land-nav">
        <div className="land-brand">
          <BrandMark />
          <span>Hockey Shot Challenge</span>
        </div>
        <div className="land-nav-actions">
          <button className="land-nav-link" onClick={() => nav('/start')}>Sign in</button>
          <button className="land-nav-cta" onClick={scrollToPaths}>Get started</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">OFF-ICE TRAINING · AGES 6–18 · BUILT FOR CLUBS</div>
          <h1 className="hero-title">
            Log your shots. Learn a skill every day.<br/>
            <span className="hero-title-em">Challenge anybody in the rink.</span>
          </h1>
          <p className="hero-sub">
            The off-ice training platform built for youth hockey. Players log their reps and watch a daily skill drop. Coaches see what their team is putting in. Whole clubs go head-to-head with their biggest rivals.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary-land" onClick={scrollToPaths}>
              How do I start? ↓
            </button>
          </div>
          <div className="hero-trust">
            Runs in any browser · No app to install · No IT approvals
          </div>
        </div>
        <div className="hero-preview">
          <MockScreen />
        </div>
      </section>

      {/* Choose your path — three role tiles */}
      <section className="paths" id="choose-path">
        <div className="paths-head">
          <div className="paths-eyebrow">GET STARTED</div>
          <h2 className="paths-title">Pick your path.</h2>
          <p className="paths-sub">Three different doors, all leading to the same rink.</p>
        </div>

        <div className="paths-grid">
          {/* Club Leader */}
          <button className="path-card path-club" onClick={() => nav('/coach')}>
            <div className="path-icon">🏒</div>
            <div className="path-label">CLUB LEADER</div>
            <h3 className="path-title">Bring your whole association on board.</h3>
            <p className="path-text">Sign up your club and get a personalized link to share with your coaches. The first move that starts the chain.</p>
            <div className="path-cta">Sign up your club →</div>
          </button>

          {/* Coach */}
          <button className="path-card path-coach" onClick={() => nav('/coach')}>
            <div className="path-icon">🎯</div>
            <div className="path-label">COACH</div>
            <h3 className="path-title">Set up your team in 3 minutes.</h3>
            <p className="path-text">Claim your team, set a weekly shot target, and share one invite link with parents. Watch your team climb the leaderboard.</p>
            <div className="path-cta">Claim your team →</div>
          </button>

          {/* Player */}
          <button className="path-card path-player" onClick={() => nav('/start')}>
            <div className="path-icon">⚡</div>
            <div className="path-label">PLAYER</div>
            <h3 className="path-title">Already have a screen name?</h3>
            <p className="path-text">Sign in with the link your coach sent you, log your shots, watch today's skill, and chase the top spot on your team.</p>
            <div className="path-cta">Sign in →</div>
          </button>
        </div>
      </section>

      {/* Core Loop */}
      <section className="features">
        <div className="section-head">
          <div className="section-eyebrow">WHY IT WORKS</div>
          <h2 className="section-title">Three things, every day, every player.</h2>
          <p className="section-sub">
            Stat apps cover what happens on the ice. Team apps cover scheduling. We built the piece that didn't exist: a daily training rhythm for the work kids do at home.
          </p>
        </div>

        <div className="loop-grid">
          <div className="loop-card">
            <div className="loop-icon">🎯</div>
            <div className="loop-verb">LOG</div>
            <h3 className="loop-title">Every off-ice shot.</h3>
            <p className="loop-text">Driveway, basement, garage — every rep shows up on the team leaderboard. Coaches finally see the work that used to be invisible.</p>
          </div>
          <div className="loop-card">
            <div className="loop-icon">📺</div>
            <div className="loop-verb">LEARN</div>
            <h3 className="loop-title">One new skill a day.</h3>
            <p className="loop-text">A short video — stickhandling drill, shooting tip, edge work — picked for the player's age. Try it tonight. Better tomorrow than yesterday.</p>
          </div>
          <div className="loop-card">
            <div className="loop-icon">⚔️</div>
            <div className="loop-verb">CHALLENGE</div>
            <h3 className="loop-title">Beat somebody.</h3>
            <p className="loop-text">A teammate this week. A rival team next month. The club across town for the season. Pick your battle, set the stakes, watch it climb.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how">
        <div className="section-head">
          <div className="section-eyebrow">HOW IT WORKS</div>
          <h2 className="section-title">From sign-up to first logged shot in under five minutes.</h2>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3 className="step-title">We send your club's link</h3>
            <p className="step-text">Reply to our intro email. We'll send a personalized signup link for your association.</p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3 className="step-title">Coaches set up teams</h3>
            <p className="step-text">Each coach claims their team in three minutes and shares a player invite link with parents.</p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3 className="step-title">Kids log, learn, and climb</h3>
            <p className="step-text">Players open the app each day, watch the skill drop, log their shots, and see the team move up. Coaches see it all in one dashboard.</p>
          </div>
        </div>
      </section>

      {/* Challenges — three tiers */}
      <section className="challenges">
        <div className="challenges-inner">
          <div className="section-eyebrow">CHALLENGES</div>
          <h2 className="challenges-title">Challenges are how off-ice gets fun.</h2>
          <p className="challenges-text">
            Telling a kid to "shoot 100 pucks a night" gets nowhere. Telling that kid "you're 12 shots behind your line-mate, and Oakville's whole U11 group is up by 800" — that gets pucks on the wall. Three tiers. Pick any. Run all of them.
          </p>

          <div className="tier-grid">
            <div className="tier-card">
              <div className="tier-num">TIER 1</div>
              <h3 className="tier-title">Player vs. player</h3>
              <p className="tier-text">Teammates challenge each other on shot totals, streaks, or skill-of-the-week. Weekly rivalry between the kids who share a bench.</p>
              <div className="tier-quote">"I'll out-shoot you this week or buy you a Gatorade."</div>
            </div>
            <div className="tier-card">
              <div className="tier-num">TIER 2</div>
              <h3 className="tier-title">Team vs. team</h3>
              <p className="tier-text">Two teams within the same club go head-to-head. Across age groups (U11 vs U13) or within one (Bulldogs A vs Bulldogs AA).</p>
              <div className="tier-quote">"U13 AA threw down. U13 A is accepting."</div>
            </div>
            <div className="tier-card">
              <div className="tier-num">TIER 3</div>
              <h3 className="tier-title">Club vs. club</h3>
              <p className="tier-text">Two associations opt in to a month-long head-to-head. Every team in both clubs contributes. The winning club gets bragging rights all season.</p>
              <div className="tier-quote">"Burlington vs. Oakville. First club to 10,000 shots wins November."</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="section-head">
          <div className="section-eyebrow">FAQ</div>
          <h2 className="section-title">Common questions</h2>
        </div>
        <div className="faq-list">
          <details className="faq-item">
            <summary>What does this do that other hockey apps don't?</summary>
            <p>Most hockey apps track in-game stats — shots from where, save percentages, plus-minus. A few do team scheduling. None of them track off-ice training, deliver daily skill content, and connect whole clubs through challenges. That combination is what's new.</p>
          </details>
          <details className="faq-item">
            <summary>How do the daily skill videos work?</summary>
            <p>Every day, players see a new short skill video — a stickhandling drill, a shooting tip, an edge work technique — they can try at home that same day. Content is curated and reviewed, matched to the player's age.</p>
          </details>
          <details className="faq-item">
            <summary>How do the challenges work?</summary>
            <p>Three tiers: player vs. player (within a team), team vs. team (within a club), and club vs. club (across associations). Coaches and players opt in. Shot totals decide. Bragging rights last all season.</p>
          </details>
          <details className="faq-item">
            <summary>Do kids need to create an account with email?</summary>
            <p>No. Kids pick a screen name and get a username automatically. No email or password needed. Designed for young athletes and their parents' privacy.</p>
          </details>
          <details className="faq-item">
            <summary>What positions are supported?</summary>
            <p>Forwards and defense track wrist shots, snap shots, slap shots, and backhands. Goalies track saves and practice reps. All count toward team and club totals.</p>
          </details>
          <details className="faq-item">
            <summary>Is it really free?</summary>
            <p>Yes. Free for clubs, coaches, players, and parents. No paid tier.</p>
          </details>
          <details className="faq-item">
            <summary>What ages is this for?</summary>
            <p>Built for ages 6–18. Covers U7 through U18, plus House League, Select, A, AA, and AAA tiers.</p>
          </details>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <h2 className="final-cta-title">Ready to get your club logging?</h2>
        <button className="btn-primary-land" onClick={scrollToPaths}>
          Pick your path ↑
        </button>
        <div className="final-cta-sub">3 minutes per team. No app to install. No paperwork.</div>
      </section>

      {/* Footer */}
      <footer className="land-footer">
        <div className="foot-brand">
          <BrandMark />
          <span>Hockey Shot Challenge</span>
        </div>
        <div className="foot-links">
          <button className="foot-link" onClick={() => nav('/start')}>Sign in</button>
          <button className="foot-link" onClick={() => nav('/coach')}>Coaches</button>
          <button className="foot-link" onClick={() => nav('/for-clubs')}>For Clubs</button>
        </div>
        <div className="foot-copy">© {new Date().getFullYear()} Hockey Shot Challenge · Built in Burlington, ON</div>
      </footer>

      <style>{styles}</style>
    </div>
  )
}

function BrandMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" style={{ display: 'block', flexShrink: 0 }}>
      <circle cx="20" cy="20" r="17" fill="#1a2847" stroke="#2979ff" strokeWidth="1" />
      <path d="M 12 22 L 17.5 27 L 28 15" stroke="#a8d4f5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MockScreen() {
  return (
    <div className="mock-phone">
      <div className="mock-inner">
        <div className="mock-top">
          <div>
            <div className="mock-club">Burlington Bulldogs U11 AA</div>
            <div className="mock-week">WEEK 3</div>
          </div>
        </div>
        <div className="mock-section-label">Today</div>

        <div className="mock-skill">
          <div className="mock-skill-play">▶</div>
          <div className="mock-skill-info">
            <div className="mock-skill-label">TODAY'S SKILL</div>
            <div className="mock-skill-name">Toe drag → quick release</div>
            <div className="mock-skill-time">2:14 · Try it tonight</div>
          </div>
        </div>

        <div className="mock-progress">
          <div className="mock-progress-row">
            <span className="mock-progress-label">Team weekly goal</span>
            <span className="mock-progress-value">3,612 / 5,000 shots</span>
          </div>
          <div className="mock-bar"><div className="mock-bar-fill" /></div>
        </div>

        <div className="mock-subsection-label">TOP PLAYERS THIS WEEK</div>

        <div className="mock-row">
          <span className="mock-rank mock-rank-1">1</span>
          <span className="mock-name">Connor M.</span>
          <span className="mock-shots">847 <span className="mock-streak">🔥 12</span></span>
        </div>
        <div className="mock-row">
          <span className="mock-rank mock-rank-2">2</span>
          <span className="mock-name">Liam K.</span>
          <span className="mock-shots">692 <span className="mock-streak">🔥 8</span></span>
        </div>
        <div className="mock-row">
          <span className="mock-rank mock-rank-3">3</span>
          <span className="mock-name">Jake R.</span>
          <span className="mock-shots">581</span>
        </div>
        <div className="mock-row">
          <span className="mock-rank">4</span>
          <span className="mock-name">Mason T.</span>
          <span className="mock-shots">443</span>
        </div>
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

/* === NAV === */
.land-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px clamp(16px, 5vw, 40px);
  max-width: 1200px; margin: 0 auto;
  position: sticky; top: 0;
  background: rgba(10, 14, 26, 0.85);
  backdrop-filter: blur(10px);
  z-index: 100;
}
.land-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display);
  font-weight: 800; font-size: 16px;
  letter-spacing: 0.5px;
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

/* === HERO === */
.hero {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding: 40px clamp(16px, 5vw, 40px) 60px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}
@media (min-width: 900px) {
  .hero {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 60px;
    padding-top: 80px;
    padding-bottom: 80px;
  }
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
  font-size: clamp(36px, 7vw, 64px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.5px;
  margin-bottom: 18px;
  color: white;
}
.hero-title-em { color: var(--ice); }
.hero-sub {
  font-size: clamp(16px, 2vw, 18px);
  line-height: 1.55;
  color: var(--text-soft);
  margin-bottom: 28px;
  max-width: 560px;
}
.hero-ctas {
  display: flex; gap: 10px; flex-wrap: wrap;
  margin-bottom: 16px;
}
.hero-trust {
  font-size: 13px;
  color: var(--text-mute);
  letter-spacing: 0.3px;
}

/* === BUTTONS === */
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
.btn-ghost-land {
  background: transparent;
  color: var(--ice);
  padding: 16px 22px;
  border-radius: 12px;
  border: 0.5px solid var(--border);
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.3px;
}
.btn-ghost-land:hover { background: var(--surface); }

/* === MOCK PHONE === */
.hero-preview { display: flex; justify-content: center; }
.mock-phone {
  width: 100%;
  max-width: 340px;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 28px;
  padding: 14px;
  box-shadow: 0 30px 80px rgba(41, 121, 255, 0.15), 0 0 0 0.5px var(--border);
}
.mock-inner {
  background: var(--bg);
  border-radius: 18px;
  padding: 16px;
}
.mock-top { margin-bottom: 8px; }
.mock-club {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}
.mock-week {
  font-size: 9px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  font-weight: 600;
  margin-top: 2px;
}
.mock-section-label {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: white;
  margin: 12px 0 8px;
}
.mock-subsection-label {
  font-size: 9px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 600;
  margin: 12px 0 6px;
}
.mock-skill {
  background: linear-gradient(135deg, rgba(41,121,255,0.18), rgba(168,212,245,0.05));
  border: 0.5px solid rgba(41,121,255,0.3);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 12px;
  display: flex; align-items: center; gap: 10px;
}
.mock-skill-play {
  width: 32px; height: 32px;
  background: var(--accent);
  border-radius: 8px;
  display: grid; place-items: center;
  flex-shrink: 0;
  color: white; font-size: 12px;
}
.mock-skill-info { flex: 1; min-width: 0; }
.mock-skill-label {
  font-size: 8px;
  color: var(--ice);
  letter-spacing: 1.2px;
  font-weight: 600;
  margin-bottom: 2px;
}
.mock-skill-name {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  color: white;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mock-skill-time {
  font-size: 10px;
  color: var(--text-mute);
  margin-top: 1px;
}
.mock-progress {
  background: var(--surface);
  border-radius: 10px;
  padding: 10px 12px;
  margin-bottom: 12px;
}
.mock-progress-row {
  display: flex; justify-content: space-between;
  font-size: 11px;
  margin-bottom: 5px;
}
.mock-progress-label { color: var(--text-soft); }
.mock-progress-value {
  color: white; font-weight: 700;
  font-family: var(--font-display);
}
.mock-bar {
  height: 5px;
  background: rgba(168, 212, 245, 0.1);
  border-radius: 3px;
  overflow: hidden;
}
.mock-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--ice));
  width: 72%;
}
.mock-row {
  display: flex; align-items: center;
  padding: 7px 0;
  border-bottom: 0.5px solid rgba(168, 212, 245, 0.06);
  font-size: 12px;
}
.mock-row:last-child { border-bottom: none; }
.mock-rank {
  width: 22px;
  font-family: var(--font-display);
  color: var(--text-mute);
  font-weight: 700;
  font-size: 11px;
}
.mock-rank-1 { color: #f4c542; }
.mock-rank-2 { color: var(--ice); }
.mock-rank-3 { color: #d4a574; }
.mock-name { flex: 1; color: white; font-weight: 500; }
.mock-shots {
  color: var(--text-soft);
  font-family: var(--font-display);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.mock-streak {
  color: #f4c542;
  font-size: 10px;
  margin-left: 4px;
}

/* === PATHS — three role tiles === */
.paths {
  padding: 64px clamp(16px, 5vw, 40px);
  max-width: 1200px;
  margin: 0 auto;
  border-top: 0.5px solid var(--border-dim);
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.04), var(--bg));
  scroll-margin-top: 80px;
}
.paths-head {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 40px;
}
.paths-eyebrow {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  margin-bottom: 12px;
}
.paths-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.3px;
  color: white;
  margin-bottom: 12px;
}
.paths-sub {
  font-size: 16px;
  color: var(--text-soft);
}
.paths-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 1100px;
  margin: 0 auto;
}
@media (min-width: 800px) {
  .paths-grid { grid-template-columns: repeat(3, 1fr); }
}
.path-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 18px;
  padding: 32px 28px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.2s, background 0.2s;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.path-card:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
  background: linear-gradient(180deg, var(--surface), rgba(41, 121, 255, 0.06));
}
.path-card:active {
  transform: translateY(-1px);
}
.path-icon {
  font-size: 36px;
  margin-bottom: 14px;
  line-height: 1;
}
.path-label {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--accent);
  margin-bottom: 8px;
}
.path-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.2px;
  margin-bottom: 12px;
  color: white;
  line-height: 1.15;
}
.path-text {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.55;
  margin: 0 0 20px;
  flex: 1;
}
.path-cta {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: var(--ice);
  letter-spacing: 0.3px;
}
.path-card:hover .path-cta {
  color: white;
}

/* === SECTION HEADERS === */
.section-head {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 40px;
  padding: 0 16px;
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
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.3px;
  color: white;
}
.section-sub {
  font-size: clamp(15px, 2vw, 17px);
  color: var(--text-soft);
  line-height: 1.55;
  margin-top: 14px;
}

/* === LOOP GRID === */
.features {
  padding: 60px clamp(16px, 5vw, 40px);
  max-width: 1200px;
  margin: 0 auto;
  border-top: 0.5px solid var(--border-dim);
}
.loop-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 1000px;
  margin: 0 auto;
}
@media (min-width: 800px) {
  .loop-grid { grid-template-columns: repeat(3, 1fr); }
}
.loop-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 16px;
  padding: 28px;
  transition: border-color 0.2s, transform 0.2s;
}
.loop-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}
.loop-icon {
  font-size: 32px;
  margin-bottom: 14px;
  line-height: 1;
}
.loop-verb {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--accent);
  margin-bottom: 6px;
}
.loop-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.2px;
  margin-bottom: 10px;
  color: white;
}
.loop-text {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.55;
  margin: 0;
}

/* === HOW IT WORKS === */
.how {
  padding: 60px clamp(16px, 5vw, 40px);
  max-width: 1200px;
  margin: 0 auto;
  border-top: 0.5px solid var(--border-dim);
}
.steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}
@media (min-width: 700px) {
  .steps { grid-template-columns: repeat(3, 1fr); }
}
.step {
  background: var(--surface);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
}
.step-num {
  font-family: var(--font-display);
  font-size: 52px;
  font-weight: 800;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 12px;
  opacity: 0.6;
}
.step-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
  color: white;
}
.step-text {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.5;
  margin: 0;
}

/* === CHALLENGES === */
.challenges {
  padding: 80px clamp(16px, 5vw, 40px);
  border-top: 0.5px solid var(--border-dim);
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.04));
}
.challenges-inner {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}
.challenges-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.3px;
  color: white;
  margin: 12px 0 16px;
}
.challenges-text {
  font-size: clamp(15px, 2vw, 17px);
  color: var(--text-soft);
  line-height: 1.55;
  max-width: 720px;
  margin: 0 auto 36px;
}
.tier-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
@media (min-width: 800px) {
  .tier-grid { grid-template-columns: repeat(3, 1fr); }
}
.tier-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 14px;
  padding: 22px;
  text-align: left;
}
.tier-num {
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--ice);
  margin-bottom: 8px;
}
.tier-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}
.tier-text {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.55;
  margin-bottom: 14px;
}
.tier-quote {
  font-size: 13px;
  color: var(--ice);
  font-style: italic;
  padding-top: 12px;
  border-top: 0.5px solid var(--border-dim);
}

/* === FAQ === */
.faq {
  padding: 60px clamp(16px, 5vw, 40px);
  max-width: 720px;
  margin: 0 auto;
  border-top: 0.5px solid var(--border-dim);
}
.faq-list { display: flex; flex-direction: column; gap: 6px; }
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
  transition: transform 0.15s;
}
.faq-item[open] summary::after { content: '−'; }
.faq-item p {
  padding: 0 18px 16px;
  margin: 0;
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.5;
}

/* === FINAL CTA === */
.final-cta {
  padding: 80px clamp(16px, 5vw, 40px);
  text-align: center;
  border-top: 0.5px solid var(--border-dim);
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.08));
}
.final-cta-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 800;
  margin-bottom: 20px;
  line-height: 1.1;
  color: white;
  letter-spacing: -0.3px;
}
.final-cta-sub {
  font-size: 13px;
  color: var(--text-mute);
  margin-top: 14px;
}

/* === FOOTER === */
.land-footer {
  padding: 40px clamp(16px, 5vw, 40px);
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
}
.foot-links { display: flex; gap: 20px; flex-wrap: wrap; }
.foot-link {
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
