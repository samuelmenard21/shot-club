import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'
import ContactSection from '../components/ContactSection'

export default function ForClubsScreen() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'For Clubs & Leagues',
      description: 'An off-ice training platform built for minor hockey clubs. Players log shots and stickhandling reps, access a growing skill library, and compete in team and club challenges. Built for the whole hockey community.',
      url: `${CANONICAL_URL}/for-clubs`,
    })

    addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Hockey Shot Challenge — For Clubs & Leagues',
      url: `${CANONICAL_URL}/for-clubs`,
      description: 'Information for league administrators and club directors evaluating Hockey Shot Challenge for their member clubs.',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Hockey Shot Challenge',
        url: CANONICAL_URL,
      },
    })
  }, [])

  return (
    <div className="forclubs">
      <nav className="fc-nav">
        <div className="fc-brand" onClick={() => nav('/')} role="button" tabIndex={0}>
          <BrandMark />
          <span>Hockey Shot Challenge</span>
        </div>
        <button className="fc-nav-link" onClick={() => nav('/')}>← Home</button>
      </nav>

      <section className="fc-hero">
        <div className="fc-eyebrow">FOR LEAGUES, CLUBS, AND ASSOCIATIONS</div>
        <h1 className="fc-h1">
          The off-ice training platform <span className="fc-h1-em">your member clubs don't have yet.</span>
        </h1>
        <p className="fc-lede">
          Players log shots and stickhandling reps, work through a growing skill library, and challenge each other across teammates, rival teams, and rival clubs. The training piece that connects the entire hockey community — for the work that used to happen invisibly at home.
        </p>

        <div className="fc-phone-wrap">
          <MockScreen />
        </div>

        <div className="fc-ctas">
          <button className="fc-btn-primary" onClick={() => nav('/coach')}>
            Get your club's link →
          </button>
          <a className="fc-btn-ghost" href="#what-to-forward">What to forward to coaches</a>
        </div>
      </section>

      <section className="fc-section">
        <div className="fc-ninety">
          <h2 className="fc-ninety-title">The 90-second version</h2>
          <dl className="fc-dl">
            <dt>What it is</dt>
            <dd>An off-ice training platform built for youth hockey clubs and teams. Players ages 6–18 log their at-home shots and stickhandling reps, access a growing skill video library, and compete in challenges across teammates, rival teams, and rival clubs.</dd>

            <dt>Why it exists</dt>
            <dd>Game stat apps cover what happens on the ice. Team management apps cover scheduling. Off-ice — the work kids do at home with a shooting pad, the daily skill development between practices — has been invisible until now. Coaches couldn't see it, kids didn't get credit for it, and clubs had no way to rally around it. We built the piece that was missing.</dd>

            <dt>What it requires</dt>
            <dd>A browser. Phones, tablets, Chromebooks — anything. Nothing to install, nothing to approve in IT, nothing to download from an app store.</dd>

            <dt>What it doesn't have</dt>
            <dd>No chat between kids. No public profiles. No real names — players use screen names. No data sold to third parties. All skill video content is reviewed before it appears in the app.</dd>

            <dt>Who built it</dt>
            <dd>A hockey parent in Burlington, Ontario. Not a venture-funded startup, not a sports tech company pivoting to youth.</dd>

            <dt>What we're asking</dt>
            <dd>If you think this could help your member clubs, forward the section below to whoever runs your coaches' newsletter. That's it.</dd>
          </dl>
        </div>
      </section>

      <section className="fc-section">
        <h2 className="fc-h2">Three things. Every player.</h2>
        <p className="fc-section-sub">A training rhythm built around the off-ice work kids were already (or should already be) doing.</p>

        <div className="fc-loop">
          <div className="fc-loop-card">
            <div className="fc-loop-icon">🎯</div>
            <div className="fc-loop-verb">LOG</div>
            <h3 className="fc-loop-title">Every off-ice shot.</h3>
            <p className="fc-loop-text">Driveway, basement, garage — every rep shows up on the team leaderboard. Coaches finally see the work that used to be invisible.</p>
          </div>
          <div className="fc-loop-card">
            <div className="fc-loop-icon">📺</div>
            <div className="fc-loop-verb">LEARN</div>
            <h3 className="fc-loop-title">A growing skill library.</h3>
            <p className="fc-loop-text">Short videos — stickhandling drills, shooting tips, edge work — matched to the player's age bracket. Pick what to work on tonight.</p>
          </div>
          <div className="fc-loop-card">
            <div className="fc-loop-icon">⚔️</div>
            <div className="fc-loop-verb">CHALLENGE</div>
            <h3 className="fc-loop-title">Beat somebody.</h3>
            <p className="fc-loop-text">A teammate this week. A rival team next month. The club across town for the season. Pick your battle, set the stakes, watch it climb.</p>
          </div>
        </div>
      </section>

      <section className="fc-section">
        <div className="fc-challenges">
          <h2 className="fc-challenges-title">How challenges work</h2>
          <p className="fc-challenges-text">
            Telling a kid to "shoot 100 pucks a night" gets nowhere. Telling that kid "you're 12 shots behind your line-mate, and Oakville's whole U11 group is up by 800" gets pucks on the wall. Three tiers, mix and match.
          </p>

          <div className="fc-tier-list">
            <div className="fc-tier">
              <div className="fc-tier-num">TIER 1 — PLAYER VS. PLAYER</div>
              <h3 className="fc-tier-title">Teammates on the same bench.</h3>
              <p className="fc-tier-text">Players challenge each other on weekly shot totals, streaks, or the skill-of-the-week. The rivalry is friendly, but the kids take it personally — in the best way.</p>
              <div className="fc-tier-quote">"I'll out-shoot you this week or buy you a Gatorade."</div>
            </div>

            <div className="fc-tier">
              <div className="fc-tier-num">TIER 2 — TEAM VS. TEAM</div>
              <h3 className="fc-tier-title">Two teams inside the same club.</h3>
              <p className="fc-tier-text">Coaches put their teams head-to-head — across age groups (U11 vs U13), within an age group (Bulldogs A vs Bulldogs AA), or any combination they want. Team pride takes over.</p>
              <div className="fc-tier-quote">"U13 AA threw down. U13 A is accepting."</div>
            </div>

            <div className="fc-tier">
              <div className="fc-tier-num">TIER 3 — CLUB VS. CLUB</div>
              <h3 className="fc-tier-title">Two associations, a whole month.</h3>
              <p className="fc-tier-text">Two clubs opt in to a head-to-head event. Every team in both clubs contributes shot totals. The winning club gets bragging rights — and a community of kids who can say they were part of it.</p>
              <div className="fc-tier-quote">"Burlington vs. Oakville. First club to 10,000 shots wins November."</div>
            </div>
          </div>
        </div>
      </section>

      <section className="fc-section" id="what-to-forward">
        <h2 className="fc-h2">What to forward to your coaches</h2>
        <p className="fc-section-sub">
          If this looks like something your member clubs would benefit from, copy and paste this into your next coaches' newsletter or email. No edits needed.
        </p>

        <div className="fc-forward">
          <div className="fc-forward-label">SUGGESTED NEWSLETTER BLURB</div>
          <p className="fc-forward-text">
            "A hockey parent in Ontario built a new off-ice training platform called <strong>Hockey Shot Challenge</strong>. Players log their off-ice shots and stickhandling reps, work through a skill video library, and can challenge teammates, other teams, or even rival clubs head-to-head. It tracks the work kids do at home that nobody used to see, and gives whole associations a way to rally around it. Runs in a browser — no install. Worth a look if you want your team putting in real off-ice reps between practices. <strong>hockeyshotchallenge.com</strong>"
          </p>
        </div>
      </section>

      <section className="fc-section">
        <h2 className="fc-h2">Questions you're probably asking</h2>

        <div className="fc-faq-list">
          <details className="fc-faq">
            <summary>What makes this different from existing hockey apps?</summary>
            <p>Most hockey apps track in-game stats. A few do team scheduling. None of them track off-ice training, deliver daily skill development, and let entire clubs challenge each other. That combination is what's new.</p>
          </details>

          <details className="fc-faq">
            <summary>Where do the skill videos come from?</summary>
            <p>Curated from hockey coaches and skill creators. Every video is reviewed before it appears in the app, and videos are matched to the player's age bracket — a U8 sees different content than a U16. The library grows over time.</p>
          </details>

          <details className="fc-faq">
            <summary>What data do you collect from players?</summary>
            <p>A screen name (chosen by the player, not their real name), an age bracket (6–10, 11–14, 15–18, 18+), a position (F/D/G), and the shots they log. We don't ask for last names, addresses, or contact info from kids. Parents control account setup.</p>
          </details>

          <details className="fc-faq">
            <summary>Who owns the club's data?</summary>
            <p>The club. We don't sell it, share it, or use it for anything other than running the platform for that club.</p>
          </details>

          <details className="fc-faq">
            <summary>Does this conflict with our existing team management tool (TeamSnap, etc.)?</summary>
            <p>No. We don't do scheduling, attendance, or game stats. We only do off-ice training: shot logging, daily skill content, and challenges. Your existing tools keep doing what they do; this adds the piece they don't cover.</p>
          </details>

          <details className="fc-faq">
            <summary>How do clubs run a head-to-head challenge?</summary>
            <p>Two clubs opt in through their coach dashboards. They agree on a duration (typically a month), a target (e.g. total shots logged), and the winning club shows up on a community leaderboard. Every team in both clubs contributes — it's a whole-association event, not a single team thing.</p>
          </details>

          <details className="fc-faq">
            <summary>Is it accessible on Chromebooks / school computers?</summary>
            <p>Yes. It's a browser-based web app. Anything that opens a website opens Hockey Shot Challenge. No app store, no IT approvals.</p>
          </details>

          <details className="fc-faq">
            <summary>What happens if you shut down?</summary>
            <p>Honest answer: we email every coach and player two months in advance and offer a CSV export of their club's data. Built by one hockey parent; if it goes away, it goes away gracefully.</p>
          </details>

          <details className="fc-faq">
            <summary>What does it cost?</summary>
            <p>Free for clubs, coaches, players, and parents. No paid tier.</p>
          </details>
        </div>
      </section>

      <section className="fc-section fc-final">
        <h2 className="fc-h2">Want a signup link for your league or club?</h2>
        <p className="fc-section-sub">
          Reach out and I'll send a personalized signup link for your association — yours to share with member clubs whenever you're ready.
        </p>
        <button className="fc-btn-primary" onClick={() => nav('/coach')}>Start your club</button>
      </section>

      <ContactSection />

      <footer className="fc-footer">
        Hockey Shot Challenge · Built in Burlington, ON ·
        <button className="fc-foot-link" onClick={() => nav('/')}>Home</button>
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
    <div className="fc-mock-phone">
      <div className="fc-mock-inner">
        <div className="fc-mock-top">
          <div>
            <div className="fc-mock-club">Burlington Bulldogs U11 AA</div>
            <div className="fc-mock-week">WEEK 3</div>
          </div>
        </div>
        <div className="fc-mock-section-label">Today</div>

        <div className="fc-mock-skill">
          <div className="fc-mock-skill-play">▶</div>
          <div className="fc-mock-skill-info">
            <div className="fc-mock-skill-label">FEATURED SKILL</div>
            <div className="fc-mock-skill-name">Toe drag → quick release</div>
            <div className="fc-mock-skill-time">2:14 · Try it tonight</div>
          </div>
        </div>

        <div className="fc-mock-progress">
          <div className="fc-mock-progress-row">
            <span className="fc-mock-progress-label">Team weekly goal</span>
            <span className="fc-mock-progress-value">3,612 / 5,000 shots</span>
          </div>
          <div className="fc-mock-bar"><div className="fc-mock-bar-fill" /></div>
        </div>

        <div className="fc-mock-subsection-label">TOP PLAYERS THIS WEEK</div>

        <div className="fc-mock-row">
          <span className="fc-mock-rank fc-mock-rank-1">1</span>
          <span className="fc-mock-name">Connor M.</span>
          <span className="fc-mock-shots">847 <span className="fc-mock-streak">🔥 12</span></span>
        </div>
        <div className="fc-mock-row">
          <span className="fc-mock-rank fc-mock-rank-2">2</span>
          <span className="fc-mock-name">Liam K.</span>
          <span className="fc-mock-shots">692 <span className="fc-mock-streak">🔥 8</span></span>
        </div>
        <div className="fc-mock-row">
          <span className="fc-mock-rank fc-mock-rank-3">3</span>
          <span className="fc-mock-name">Jake R.</span>
          <span className="fc-mock-shots">581</span>
        </div>
        <div className="fc-mock-row">
          <span className="fc-mock-rank">4</span>
          <span className="fc-mock-name">Mason T.</span>
          <span className="fc-mock-shots">443</span>
        </div>
      </div>
    </div>
  )
}

const styles = `
.forclubs {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}
body:has(.forclubs) { background: var(--bg) !important; }

.fc-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px clamp(16px, 5vw, 24px);
  border-bottom: 0.5px solid var(--border-dim);
}
.fc-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 15px;
  letter-spacing: 0.5px;
  cursor: pointer;
  color: white;
}
.fc-nav-link {
  background: transparent;
  color: var(--text-soft);
  font-size: 14px;
  padding: 6px 10px;
}
.fc-nav-link:hover { color: white; }

.fc-hero {
  padding: 40px clamp(16px, 5vw, 24px) 32px;
  text-align: center;
}
.fc-eyebrow {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  background: var(--accent-bg);
  padding: 6px 12px;
  border-radius: 999px;
  margin-bottom: 16px;
}
.fc-h1 {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.3px;
  color: white;
  margin: 0 0 16px;
}
.fc-h1-em {
  color: var(--ice);
}
.fc-lede {
  font-size: 16px;
  line-height: 1.55;
  color: var(--text-soft);
  margin: 0 0 28px;
}

.fc-phone-wrap {
  display: flex;
  justify-content: center;
  margin: 24px 0;
}
.fc-mock-phone {
  width: 100%;
  max-width: 300px;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 28px;
  padding: 12px;
  box-shadow: 0 30px 80px rgba(41, 121, 255, 0.15), 0 0 0 0.5px var(--border);
}
.fc-mock-inner {
  background: var(--bg);
  border-radius: 18px;
  padding: 14px;
}
.fc-mock-top { margin-bottom: 8px; }
.fc-mock-club {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  color: white;
  line-height: 1.2;
}
.fc-mock-week {
  font-size: 9px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  font-weight: 600;
  margin-top: 2px;
}
.fc-mock-section-label {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: white;
  margin: 10px 0 8px;
}
.fc-mock-subsection-label {
  font-size: 9px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0 6px;
}
.fc-mock-skill {
  background: linear-gradient(135deg, rgba(41,121,255,0.18), rgba(168,212,245,0.05));
  border: 0.5px solid rgba(41,121,255,0.3);
  border-radius: 10px;
  padding: 9px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 9px;
}
.fc-mock-skill-play {
  width: 30px; height: 30px;
  background: var(--accent);
  border-radius: 8px;
  display: grid; place-items: center;
  flex-shrink: 0;
  color: white;
  font-size: 11px;
}
.fc-mock-skill-info { flex: 1; min-width: 0; }
.fc-mock-skill-label {
  font-size: 8px;
  color: var(--ice);
  letter-spacing: 1.2px;
  font-weight: 600;
  margin-bottom: 2px;
}
.fc-mock-skill-name {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 700;
  color: white;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fc-mock-skill-time {
  font-size: 9px;
  color: var(--text-mute);
  margin-top: 1px;
}
.fc-mock-progress {
  background: var(--surface);
  border-radius: 10px;
  padding: 9px 11px;
  margin-bottom: 10px;
}
.fc-mock-progress-row {
  display: flex; justify-content: space-between;
  font-size: 10px;
  margin-bottom: 4px;
}
.fc-mock-progress-label { color: var(--text-soft); }
.fc-mock-progress-value {
  color: white; font-weight: 700;
  font-family: var(--font-display);
}
.fc-mock-bar {
  height: 4px;
  background: rgba(168, 212, 245, 0.1);
  border-radius: 3px;
  overflow: hidden;
}
.fc-mock-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--ice));
  width: 72%;
}
.fc-mock-row {
  display: flex; align-items: center;
  padding: 6px 0;
  border-bottom: 0.5px solid rgba(168, 212, 245, 0.06);
  font-size: 11px;
}
.fc-mock-row:last-child { border-bottom: none; }
.fc-mock-rank {
  width: 20px;
  font-family: var(--font-display);
  color: var(--text-mute);
  font-weight: 700;
  font-size: 10px;
}
.fc-mock-rank-1 { color: #f4c542; }
.fc-mock-rank-2 { color: var(--ice); }
.fc-mock-rank-3 { color: #d4a574; }
.fc-mock-name { flex: 1; color: white; font-weight: 500; }
.fc-mock-shots {
  color: var(--text-soft);
  font-family: var(--font-display);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.fc-mock-streak {
  color: #f4c542;
  font-size: 9px;
  margin-left: 3px;
}

.fc-ctas {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}
.fc-btn-primary {
  background: var(--accent);
  color: white;
  padding: 13px 22px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.4px;
  transition: transform 0.1s, background 0.15s;
}
.fc-btn-primary:hover { background: var(--accent-soft); }
.fc-btn-primary:active { transform: scale(0.98); }
.fc-btn-ghost {
  background: transparent;
  color: var(--ice);
  padding: 13px 20px;
  border-radius: 10px;
  border: 0.5px solid var(--border);
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-decoration: none;
  display: inline-block;
}
.fc-btn-ghost:hover { background: var(--surface); }

.fc-section {
  padding: 36px clamp(16px, 5vw, 24px);
  border-top: 0.5px solid var(--border-dim);
}
.fc-h2 {
  font-family: var(--font-display);
  font-size: clamp(22px, 4vw, 28px);
  font-weight: 800;
  letter-spacing: -0.2px;
  color: white;
  margin: 0 0 12px;
}
.fc-section-sub {
  color: var(--text-soft);
  font-size: 15px;
  line-height: 1.55;
  margin: 0 0 20px;
}

.fc-ninety {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 14px;
  padding: 22px;
}
.fc-ninety-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 800;
  color: white;
  margin: 0 0 4px;
}
.fc-dl { margin: 0; }
.fc-dl dt {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--ice);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-top: 16px;
}
.fc-dl dt:first-of-type { margin-top: 0; }
.fc-dl dd {
  margin: 4px 0 0;
  color: var(--text-soft);
  font-size: 15px;
  line-height: 1.55;
}

.fc-loop {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 700px) {
  .fc-loop { grid-template-columns: repeat(3, 1fr); }
}
.fc-loop-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 12px;
  padding: 20px;
}
.fc-loop-icon {
  font-size: 28px;
  margin-bottom: 10px;
  line-height: 1;
}
.fc-loop-verb {
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--accent);
  margin-bottom: 5px;
}
.fc-loop-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  color: white;
  margin: 0 0 8px;
}
.fc-loop-text {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.5;
  margin: 0;
}

.fc-challenges {
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.05));
  border: 0.5px solid var(--border-dim);
  border-radius: 14px;
  padding: 24px;
}
.fc-challenges-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  color: white;
  margin: 0 0 8px;
}
.fc-challenges-text {
  color: var(--text-soft);
  font-size: 15px;
  line-height: 1.55;
  margin: 0 0 20px;
}
.fc-tier-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.fc-tier {
  background: rgba(10, 14, 26, 0.6);
  border: 0.5px solid var(--border-dim);
  border-radius: 12px;
  padding: 18px;
}
.fc-tier-num {
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: var(--ice);
  margin-bottom: 6px;
}
.fc-tier-title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  color: white;
  margin: 0 0 6px;
}
.fc-tier-text {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.55;
  margin: 0 0 12px;
}
.fc-tier-quote {
  font-size: 13px;
  color: var(--ice);
  font-style: italic;
  padding-top: 10px;
  border-top: 0.5px solid var(--border-dim);
}

.fc-forward {
  background: var(--surface);
  border-left: 3px solid var(--accent);
  padding: 18px 20px;
  border-radius: 0 10px 10px 0;
}
.fc-forward-label {
  font-family: var(--font-display);
  font-size: 10px;
  color: var(--ice);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
  margin-bottom: 8px;
}
.fc-forward-text {
  margin: 0;
  color: var(--text-soft);
  font-size: 15px;
  font-style: italic;
  line-height: 1.55;
}

.fc-faq-list { display: flex; flex-direction: column; gap: 6px; }
.fc-faq {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 10px;
  padding: 2px 0;
  transition: border-color 0.15s;
}
.fc-faq[open] { border-color: var(--accent); }
.fc-faq summary {
  padding: 14px 16px;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.3px;
  list-style: none;
  position: relative;
}
.fc-faq summary::-webkit-details-marker { display: none; }
.fc-faq summary::after {
  content: '+';
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 400;
  color: var(--text-mute);
}
.fc-faq[open] summary::after { content: '−'; }
.fc-faq p {
  padding: 0 16px 14px;
  margin: 0;
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.55;
}

.fc-final {
  text-align: center;
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.08));
}

.fc-footer {
  padding: 24px clamp(16px, 5vw, 24px);
  text-align: center;
  font-size: 12px;
  color: var(--text-mute);
  border-top: 0.5px solid var(--border-dim);
}
.fc-foot-link {
  background: transparent;
  color: var(--text-soft);
  font-size: 12px;
  margin-left: 4px;
  padding: 0 4px;
}
.fc-foot-link:hover { color: white; }
`
