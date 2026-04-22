import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'

export default function LandingScreen() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: null, // use default (already optimized)
      description: 'Off-ice hockey practice tracking for kids ages 6-18. Log your shots, climb team and global leaderboards, earn ranks, and get better every day.',
      url: CANONICAL_URL,
    })
    addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Hockey Shot Challenge',
      description: 'Off-ice hockey shot tracker for kids. Track practice shots, climb leaderboards, earn ranks.',
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
      {/* Nav */}
      <nav className="land-nav">
        <div className="land-brand">
          <BrandMark />
          <span>Hockey Shot Challenge</span>
        </div>
        <div className="land-nav-actions">
          <button className="land-nav-link" onClick={() => nav('/start')}>Sign in</button>
          <button className="land-nav-cta" onClick={() => nav('/start')}>Join free</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">FREE · OFF-ICE TRAINING · AGES 6–18</div>
          <h1 className="hero-title">Track every shot.<br/>Climb the rankings.</h1>
          <p className="hero-sub">
            The simplest way for young hockey players to log off-ice practice, earn ranks, and beat their teammates.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary-land" onClick={() => nav('/start')}>
              Start shooting →
            </button>
            <button className="btn-ghost-land" onClick={() => nav('/coach')}>
              I'm a coach
            </button>
          </div>
          <div className="hero-trust">
            No credit card · Set up in 30 seconds · Works on any phone
          </div>
        </div>
        <div className="hero-preview">
          <MockScreen />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="section-head">
          <div className="section-eyebrow">WHY IT WORKS</div>
          <h2 className="section-title">Shot tracking that actually gets used.</h2>
        </div>

        <div className="feat-grid">
          <div className="feat-card">
            <div className="feat-icon">🎯</div>
            <h3 className="feat-title">3 seconds to log</h3>
            <p className="feat-text">Tap a shot type, enter a number, done. No logins, no forms, no fluff. Kids actually use it.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🏆</div>
            <h3 className="feat-title">7 ranks to climb</h3>
            <p className="feat-text">Rookie → Junior → Prospect → Varsity → Captain → All-Star → Legend. Real progression, real motivation.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">⚔️</div>
            <h3 className="feat-title">Daily rivals</h3>
            <p className="feat-text">Every day a teammate to chase. See the gap live. Nothing beats "you're down 9 — catch up."</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🔥</div>
            <h3 className="feat-title">Streaks that stick</h3>
            <p className="feat-text">Shoot every day. Keep the flame. Simple psychology that turns casual practice into a habit.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🃏</div>
            <h3 className="feat-title">A card of your own</h3>
            <p className="feat-text">Serial-numbered player card with your rank, stats, and shot mix. Screenshot-worthy. Shareable.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">👥</div>
            <h3 className="feat-title">Team & club rankings</h3>
            <p className="feat-text">See where you stand on your team, across your club, and against every kid on the app.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how">
        <div className="section-head">
          <div className="section-eyebrow">HOW IT WORKS</div>
          <h2 className="section-title">From zero to first rank in a day.</h2>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3 className="step-title">Make your card</h3>
            <p className="step-text">Pick a name, position, and age. No email, no password. You get a unique username and a serial-numbered card.</p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3 className="step-title">Log your shots</h3>
            <p className="step-text">Go shoot a bucket of pucks. Come back, tap your shot type, punch in the count. Coach Sam keeps you going.</p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3 className="step-title">Climb the rankings</h3>
            <p className="step-text">See yourself rise on the team, club, and global boards. Hit milestones. Unlock the next rank.</p>
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section className="coaches-section">
        <div className="coaches-inner">
          <div className="coaches-eyebrow">FOR COACHES & CLUBS</div>
          <h2 className="coaches-title">Your whole club, logging shots every day.</h2>
          <p className="coaches-text">
            Create a branded club page. Share one link or QR code. Every kid who scans joins your club — instantly. No accounts for parents, no paperwork, no friction.
          </p>
          <div className="coaches-ctas">
            <button className="btn-primary-land" onClick={() => nav('/coach')}>
              Set up your club →
            </button>
          </div>
          <div className="coaches-bullets">
            <div className="coach-bullet">✓ Free to start</div>
            <div className="coach-bullet">✓ 5-minute setup</div>
            <div className="coach-bullet">✓ Branded invite page</div>
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
            <summary>Is it really free?</summary>
            <p>Yes. Players and coaches sign up and use the core app free. We'll offer premium features for clubs later, but tracking shots will always be free for kids.</p>
          </details>
          <details className="faq-item">
            <summary>Do kids need to create an account with email?</summary>
            <p>No. Kids pick a name and get a username automatically. No email or password needed. We designed this specifically for young athletes and their parents' privacy.</p>
          </details>
          <details className="faq-item">
            <summary>What positions are supported?</summary>
            <p>Forwards and defense track wrist shots, snap shots, slap shots, and backhands. Goalies track saves and practice reps. All four shot types count toward your rank.</p>
          </details>
          <details className="faq-item">
            <summary>How does shot counting work?</summary>
            <p>Kids shoot their pucks, then log the count in the app. Tap a shot type, enter the number on the keypad, save. Takes 3 seconds.</p>
          </details>
          <details className="faq-item">
            <summary>Can my whole team use it?</summary>
            <p>Absolutely. When you sign up, pick a team name. Your teammates sign up with the same name and you're all on the same leaderboard.</p>
          </details>
          <details className="faq-item">
            <summary>What ages is this for?</summary>
            <p>Built for ages 6–18. Popular with U9 through U18 players who want to track practice and compete with friends.</p>
          </details>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <h2 className="final-cta-title">Ready to put up some numbers?</h2>
        <button className="btn-primary-land" onClick={() => nav('/start')}>
          Start shooting →
        </button>
        <div className="final-cta-sub">30 seconds. No email. No BS.</div>
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
        </div>
        <div className="foot-copy">© {new Date().getFullYear()} Hockey Shot Challenge</div>
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
  // A stylized preview of the Home screen
  return (
    <div className="mock-phone">
      <div className="mock-inner">
        <div className="mock-top">
          <div className="mock-avatar">C</div>
          <div>
            <div className="mock-name">Connor</div>
            <div className="mock-sub">Junior I · 250 shots</div>
          </div>
          <div className="mock-streak">🔥 7</div>
        </div>
        <div className="mock-grid">
          {[
            { name: 'WRIST', v: 85 },
            { name: 'SNAP', v: 42 },
            { name: 'SLAP', v: 23 },
            { name: 'BACKHAND', v: 18 },
          ].map((s) => (
            <div key={s.name} className="mock-card">
              <div className="mock-label">{s.name}</div>
              <div className="mock-val">{s.v}</div>
              <div className="mock-today">today</div>
            </div>
          ))}
        </div>
        <div className="mock-chase">
          <div>
            <div className="mock-chase-label">CHASING TODAY</div>
            <div className="mock-chase-name">Tyler · 145 today</div>
          </div>
          <div className="mock-gap">−23</div>
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
  /* Override the app-shell width constraint */
  width: 100%;
  max-width: none;
}
/* Override app-shell styles on landing */
body:has(.landing) { background: var(--bg) !important; }

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

/* Hero */
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
    padding-bottom: 100px;
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
  font-size: clamp(40px, 8vw, 72px);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.5px;
  margin-bottom: 18px;
  color: white;
}
.hero-sub {
  font-size: clamp(16px, 2vw, 19px);
  line-height: 1.5;
  color: var(--text-soft);
  margin-bottom: 28px;
  max-width: 520px;
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

/* Mock phone preview */
.hero-preview {
  display: flex; justify-content: center;
}
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
  padding: 14px;
}
.mock-top {
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 14px;
}
.mock-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700; color: white;
  flex-shrink: 0;
}
.mock-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  line-height: 1.1;
}
.mock-sub { font-size: 10px; color: var(--text-mute); margin-top: 2px; }
.mock-streak {
  margin-left: auto;
  font-size: 12px;
  background: rgba(255, 122, 41, 0.15);
  padding: 4px 10px;
  border-radius: 999px;
  color: var(--warn-soft);
  font-weight: 600;
}
.mock-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}
.mock-card {
  background: var(--surface);
  border-radius: 12px;
  padding: 12px;
}
.mock-label {
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  opacity: 0.8;
}
.mock-val {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 800;
  color: var(--ice);
  line-height: 1;
  margin-top: 4px;
}
.mock-today {
  font-size: 9px;
  color: var(--text-mute);
  letter-spacing: 1px;
  margin-top: 4px;
  text-transform: uppercase;
}
.mock-chase {
  background: var(--surface);
  border-left: 2px solid var(--warn);
  border-radius: 10px;
  padding: 10px 12px;
  display: flex; justify-content: space-between; align-items: center;
}
.mock-chase-label {
  font-size: 9px; color: var(--text-mute);
  letter-spacing: 1.5px; text-transform: uppercase;
  font-weight: 500;
}
.mock-chase-name {
  font-family: var(--font-display);
  font-size: 12px; font-weight: 700;
  margin-top: 2px;
}
.mock-gap {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 800;
  background: rgba(255, 122, 41, 0.15);
  color: var(--warn-soft);
  padding: 4px 11px;
  border-radius: 999px;
}

/* Section headers */
.section-head {
  text-align: center;
  max-width: 680px;
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

/* Features grid */
.features {
  padding: 60px clamp(16px, 5vw, 40px);
  max-width: 1200px;
  margin: 0 auto;
  border-top: 0.5px solid var(--border-dim);
}
.feat-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  max-width: 1000px;
  margin: 0 auto;
}
@media (min-width: 700px) {
  .feat-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1000px) {
  .feat-grid { grid-template-columns: repeat(3, 1fr); }
}
.feat-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 16px;
  padding: 24px;
  transition: border-color 0.2s, transform 0.2s;
}
.feat-card:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}
.feat-icon {
  font-size: 32px;
  margin-bottom: 14px;
  line-height: 1;
}
.feat-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.3px;
  margin-bottom: 8px;
  color: white;
}
.feat-text {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.5;
  margin: 0;
}

/* How it works */
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

/* Coaches */
.coaches-section {
  padding: 80px clamp(16px, 5vw, 40px);
  border-top: 0.5px solid var(--border-dim);
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.04));
}
.coaches-inner {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}
.coaches-eyebrow {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  margin-bottom: 12px;
}
.coaches-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.3px;
  color: white;
  margin-bottom: 16px;
}
.coaches-text {
  font-size: clamp(15px, 2vw, 17px);
  color: var(--text-soft);
  line-height: 1.6;
  margin-bottom: 28px;
}
.coaches-ctas { margin-bottom: 18px; }
.coaches-bullets {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}
.coach-bullet {
  font-size: 13px;
  color: var(--text-mute);
}

/* FAQ */
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

/* Final CTA */
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

/* Footer */
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
.foot-links { display: flex; gap: 20px; }
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
