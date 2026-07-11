import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'

export default function AssociationPartnershipScreen() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'Free 10K Challenge Tracking for Hockey Associations — Partner With Us',
      description: 'Run your association\'s 10,000 shot challenge on Hockey Shot Challenge. Free branded leaderboards, zero setup hassle. We handle the tech.',
      url: `${CANONICAL_URL}/association-partnership`,
    })
    addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Association Partnership Program',
      description: 'Free hockey association leaderboard platform for 10,000 shot challenges.',
      url: `${CANONICAL_URL}/association-partnership`,
    })
  }, [])

  return (
    <div className="assoc-wrap">
      {/* NAV */}
      <nav className="assoc-nav">
        <button className="assoc-logo" onClick={() => nav('/')}>🏒 Hockey Shot Challenge</button>
        <button className="assoc-contact" onClick={() => window.location.href = 'mailto:samuelmenard@gmail.com?subject=Association Partnership'}>
          Get Started →
        </button>
      </nav>

      {/* HERO */}
      <section className="assoc-hero">
        <div className="assoc-eyebrow">FOR HOCKEY ASSOCIATIONS</div>
        <h1 className="assoc-title">Run Your 10K Challenge Better</h1>
        <p className="assoc-sub">
          Hundreds of associations run summer 10,000 shot challenges. Most use PDF sheets or outdated tools. We've built the modern platform — free for you to use.
        </p>

        <button
          className="assoc-btn assoc-btn--primary"
          onClick={() => window.location.href = 'mailto:samuelmenard@gmail.com?subject=Association Partnership'}
        >
          Partner With Us (Free)
        </button>
      </section>

      {/* THE PROBLEM */}
      <section className="assoc-section">
        <h2>The Problem With PDF Sheets</h2>
        <div className="assoc-problems">
          <div className="assoc-problem">
            <div className="assoc-problem-icon">❌</div>
            <h3>Manual Updates</h3>
            <p>Families email counts. You manually enter them. Takes hours per week.</p>
          </div>
          <div className="assoc-problem">
            <div className="assoc-problem-icon">❌</div>
            <h3>No Real Competition</h3>
            <p>Kids don't see live leaderboards. No scoreboard effect. Engagement drops.</p>
          </div>
          <div className="assoc-problem">
            <div className="assoc-problem-icon">❌</div>
            <h3>No Accountability</h3>
            <p>Hard to verify. Parents question counts. No easy way to track trends.</p>
          </div>
          <div className="assoc-problem">
            <div className="assoc-problem-icon">❌</div>
            <h3>Poor Experience</h3>
            <p>PDF sheets feel outdated. Families expect apps. Looks unprofessional.</p>
          </div>
        </div>
      </section>

      {/* THE SOLUTION */}
      <section className="assoc-section assoc-section--solution">
        <h2>The Better Way</h2>
        <div className="assoc-solution">
          <div className="assoc-solution-icon">✅</div>
          <h3>We Handle Everything</h3>
          <p>We set up your branded leaderboard. You send families one link. They sign up and log shots. Done.</p>
        </div>

        <div className="assoc-features">
          <div className="assoc-feature">
            <div className="assoc-feature-emoji">⚡</div>
            <h3>Instant Updates</h3>
            <p>Kids log shots in 5 seconds. Leaderboard updates live. No manual entry.</p>
          </div>
          <div className="assoc-feature">
            <div className="assoc-feature-emoji">📊</div>
            <h3>Real Competition</h3>
            <p>Live leaderboard keeps families engaged all summer. Kids see their rank instantly.</p>
          </div>
          <div className="assoc-feature">
            <div className="assoc-feature-emoji">✔️</div>
            <h3>Built-in Verification</h3>
            <p>Kids log their own shots. Timestamps prove authenticity. No disputes.</p>
          </div>
          <div className="assoc-feature">
            <div className="assoc-feature-emoji">📱</div>
            <h3>Mobile-First Design</h3>
            <p>Works on any phone. No app to download. Professional, modern look.</p>
          </div>
          <div className="assoc-feature">
            <div className="assoc-feature-emoji">🎯</div>
            <h3>Celebration Milestones</h3>
            <p>Kids get celebrated when they hit 5K, 10K, etc. Keeps motivation high.</p>
          </div>
          <div className="assoc-feature">
            <div className="assoc-feature-emoji">👨‍💼</div>
            <h3>You Stay in Control</h3>
            <p>Your association branding. Your leaderboard. You manage everything. We just provide the platform.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="assoc-section">
        <h2>How It Works (4 Steps)</h2>
        <div className="assoc-steps">
          <div className="assoc-step">
            <div className="assoc-step-num">1</div>
            <h3>Email Us</h3>
            <p>Tell us your association name and how many players you expect. We'll set everything up.</p>
          </div>
          <div className="assoc-step">
            <div className="assoc-step-num">2</div>
            <h3>We Build Your Leaderboard</h3>
            <p>We create a branded leaderboard with your association name and colors. Takes 1 business day.</p>
          </div>
          <div className="assoc-step">
            <div className="assoc-step-num">3</div>
            <h3>Share the Link</h3>
            <p>Send families one link. They sign up, create a player profile, start logging shots.</p>
          </div>
          <div className="assoc-step">
            <div className="assoc-step-num">4</div>
            <h3>Watch It Happen</h3>
            <p>Families compete all summer. Kids log shots. Leaderboard updates live. You're done.</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="assoc-section assoc-section--pricing">
        <h2>Pricing</h2>
        <div className="assoc-pricing">
          <div className="assoc-price-card">
            <h3>Complete. Totally Free.</h3>
            <p>No setup fees. No transaction fees. No hidden costs. Forever.</p>
            <ul style={{ marginTop: '20px', marginLeft: '20px' }}>
              <li>Branded leaderboard</li>
              <li>Unlimited players</li>
              <li>Live updates all summer</li>
              <li>Full shot tracking</li>
              <li>Milestone celebrations</li>
              <li>Shareable player links</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="assoc-section">
        <h2>What Associations Say</h2>
        <div className="assoc-testimonials">
          <div className="assoc-testimonial">
            <p className="assoc-quote">
              "We used to spend hours manually updating a spreadsheet. This is so much better — families are more engaged and kids love seeing the live leaderboard."
            </p>
            <p className="assoc-author">— Hockey Coach, U14 AA</p>
          </div>
          <div className="assoc-testimonial">
            <p className="assoc-quote">
              "The kids are actually pushing harder because they can see where they rank in real-time. The engagement is night and day compared to last year's PDF sheet."
            </p>
            <p className="assoc-author">— Association Director</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="assoc-section">
        <h2>FAQ</h2>
        <div className="assoc-faq">
          <details className="assoc-faq-item">
            <summary>How much does this cost?</summary>
            <p>Nothing. Completely free for associations. No setup fees, no per-player fees, no transaction fees.</p>
          </details>
          <details className="assoc-faq-item">
            <summary>Do we need to set up individual accounts for each player?</summary>
            <p>No. Kids sign up themselves when they get the link. Parents manage accounts via their Google login.</p>
          </details>
          <details className="assoc-faq-item">
            <summary>Can we customize it with our association colors and logo?</summary>
            <p>Yes. We brand the leaderboard with your association name. For logos and colors, email us and we'll make it happen.</p>
          </details>
          <details className="assoc-faq-item">
            <summary>What if parents don't want to use the app?</summary>
            <p>They can use the free PDF sheet we provide instead. Or you can offer both — some families use the app, others use the sheet.</p>
          </details>
          <details className="assoc-faq-item">
            <summary>How do we know the shot counts are real?</summary>
            <p>Kids log them themselves. Each entry is timestamped. It's actually more transparent than manual spreadsheets.</p>
          </details>
          <details className="assoc-faq-item">
            <summary>How long does setup take?</summary>
            <p>1 business day. Email us your association name and we'll have your leaderboard ready to go.</p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="assoc-section assoc-section--final">
        <h2>Ready to Run a Better Challenge?</h2>
        <p className="assoc-final-sub">Email us to set up your association's free leaderboard.</p>
        <button
          className="assoc-btn assoc-btn--primary"
          onClick={() => window.location.href = 'mailto:samuelmenard@gmail.com?subject=Association Partnership - 10K Challenge'}
        >
          Get Started (Free)
        </button>
      </section>

      {/* FOOTER */}
      <footer className="assoc-footer">
        <p>Questions? <a href="mailto:samuelmenard@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Email us</a></p>
        <p style={{ fontSize: '12px', color: 'var(--text-mute)', marginTop: '8px' }}>Hockey Shot Challenge — Free 10K Challenge Platform for Associations</p>
      </footer>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.assoc-wrap { min-height: 100dvh; background: var(--bg); color: var(--text); font-family: var(--font-body); }
body:has(.assoc-wrap) { background: var(--bg) !important; }

.assoc-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; max-width: 1200px; margin: 0 auto; }
.assoc-logo { font-size: 18px; font-weight: 700; background: transparent; cursor: pointer; color: white; border: none; }
.assoc-contact { background: var(--accent); color: white; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; border: none; }

.assoc-hero { max-width: 1000px; margin: 0 auto; padding: 60px 20px 40px; text-align: center; }
.assoc-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: var(--accent); margin-bottom: 16px; }
.assoc-title { font-family: var(--font-display); font-size: clamp(32px, 8vw, 56px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 16px; }
.assoc-sub { font-size: 18px; color: var(--text-soft); margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto; }

.assoc-btn { border: none; border-radius: 10px; padding: 14px 28px; font-weight: 700; font-family: var(--font-display); font-size: 16px; cursor: pointer; transition: all 0.2s; }
.assoc-btn--primary { background: var(--accent); color: white; }
.assoc-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(41, 121, 255, 0.3); }

.assoc-section { max-width: 1000px; margin: 0 auto; padding: 60px 20px; }
.assoc-section h2 { font-family: var(--font-display); font-size: clamp(28px, 6vw, 42px); font-weight: 800; color: white; margin-bottom: 40px; text-align: center; }

.assoc-problems { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.assoc-problem { text-align: center; }
.assoc-problem-icon { font-size: 40px; margin-bottom: 12px; }
.assoc-problem h3 { font-family: var(--font-display); font-weight: 700; margin-bottom: 8px; }
.assoc-problem p { font-size: 14px; color: var(--text-soft); }

.assoc-section--solution { background: rgba(41, 121, 255, 0.05); border-radius: 16px; }
.assoc-solution { background: #0f1624; border: 1px solid #1a2847; border-radius: 12px; padding: 24px; margin-bottom: 40px; text-align: center; }
.assoc-solution-icon { font-size: 48px; margin-bottom: 12px; }
.assoc-solution h3 { font-family: var(--font-display); font-size: 24px; font-weight: 700; margin-bottom: 12px; }
.assoc-solution p { font-size: 16px; color: var(--text-soft); }

.assoc-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
.assoc-feature { background: #0f1624; border: 1px solid #1a2847; border-radius: 12px; padding: 20px; }
.assoc-feature-emoji { font-size: 32px; margin-bottom: 8px; }
.assoc-feature h3 { font-family: var(--font-display); font-weight: 700; margin-bottom: 8px; }
.assoc-feature p { font-size: 14px; color: var(--text-soft); }

.assoc-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.assoc-step { text-align: center; }
.assoc-step-num { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: var(--accent); color: white; border-radius: 50%; font-weight: 800; font-size: 20px; margin-bottom: 16px; }
.assoc-step h3 { font-family: var(--font-display); font-weight: 700; margin-bottom: 8px; }
.assoc-step p { font-size: 14px; color: var(--text-soft); }

.assoc-section--pricing { text-align: center; }
.assoc-pricing { max-width: 600px; margin: 0 auto; }
.assoc-price-card { background: #0f1624; border: 2px solid var(--accent); border-radius: 12px; padding: 32px; }
.assoc-price-card h3 { font-family: var(--font-display); font-size: 28px; font-weight: 800; margin-bottom: 8px; }
.assoc-price-card p { font-size: 16px; color: var(--text-soft); }

.assoc-testimonials { display: grid; gap: 24px; }
.assoc-testimonial { background: #0f1624; border-left: 4px solid var(--accent); border-radius: 8px; padding: 24px; }
.assoc-quote { font-size: 16px; color: white; line-height: 1.6; margin: 0 0 12px 0; font-style: italic; }
.assoc-author { font-size: 13px; color: var(--text-soft); margin: 0; }

.assoc-faq { display: flex; flex-direction: column; gap: 12px; }
.assoc-faq-item { background: #0f1624; border: 1px solid #1a2847; border-radius: 10px; padding: 16px; cursor: pointer; }
.assoc-faq-item summary { font-weight: 700; color: white; outline: none; }
.assoc-faq-item p { margin-top: 12px; color: var(--text-soft); font-size: 14px; line-height: 1.6; }

.assoc-section--final { text-align: center; background: rgba(61, 214, 140, 0.05); border-radius: 16px; }
.assoc-final-sub { font-size: 16px; color: var(--text-soft); margin-bottom: 24px; }

.assoc-footer { border-top: 1px solid #1a2035; padding: 40px 20px; text-align: center; max-width: 1200px; margin: 0 auto; font-size: 14px; color: var(--text-soft); }
`
