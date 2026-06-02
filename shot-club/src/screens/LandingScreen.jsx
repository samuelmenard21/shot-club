import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'
import ContactSection from '../components/ContactSection'

export default function LandingScreen() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: null,
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

      <section className="final-cta">
        <h2 className="final-cta-title">Ready to put up some numbers?</h2>
        <button className="btn-primary-land" onClick={() => nav('/start')}>
          Start shooting →
        </button>
        <div className="final-cta-sub">30 seconds. No email. No BS.</div>
      </section>

      <ContactSection />

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
  width: 100%;
  max-width: none;
}
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
.btn-primary-land:ho
