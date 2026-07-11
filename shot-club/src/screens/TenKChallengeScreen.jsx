import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'

export default function TenKChallengeScreen() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: '10,000 Shot Challenge Tracker — Free Printable Log Sheet & Online Tracker',
      description: 'Free printable 10000 shot challenge tracker + online app. Log your shots, track progress, compete with teammates. Perfect for summer hockey training.',
      url: `${CANONICAL_URL}/10000-shot-challenge`,
    })
    addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: '10,000 Shot Challenge Tracker',
      description: 'Free 10000 shot challenge tracking sheet and online app for hockey players and associations.',
      url: `${CANONICAL_URL}/10000-shot-challenge`,
      mainEntity: {
        '@type': 'SoftwareApplication',
        name: 'Hockey Shot Challenge',
        applicationCategory: 'SportsApplication',
        url: 'https://hockeyshotchallenge.com',
      },
    })
  }, [])

  const downloadPDF = () => {
    const element = document.createElement('a')
    element.href = '/10k-challenge-tracker.pdf'
    element.download = '10K-Shot-Challenge-Tracker.pdf'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="tenk-wrap">
      {/* NAV */}
      <nav className="tenk-nav">
        <button className="tenk-logo" onClick={() => nav('/')}>🏒 Hockey Shot Challenge</button>
        <button className="tenk-start" onClick={() => nav('/start')}>Start tracking →</button>
      </nav>

      {/* HERO */}
      <section className="tenk-hero">
        <div className="tenk-eyebrow">10,000 SHOT CHALLENGE</div>
        <h1 className="tenk-title">The Modern Way to Track Your Summer Challenge</h1>
        <p className="tenk-sub">Free printable tracking sheet + online app. Stop using spreadsheets. Start competing.</p>

        <div className="tenk-hero-cta">
          <button className="tenk-btn tenk-btn--primary" onClick={downloadPDF}>
            📥 Download Free PDF Tracker
          </button>
          <button className="tenk-btn tenk-btn--secondary" onClick={() => nav('/start')}>
            Try Online Tracker (Free) →
          </button>
        </div>

        <div className="tenk-hero-image">
          <div className="tenk-tracker-preview">
            <div className="tenk-preview-row">
              <span className="tenk-preview-label">Player</span>
              <span className="tenk-preview-label">Week 1</span>
              <span className="tenk-preview-label">Total</span>
            </div>
            <div className="tenk-preview-row">
              <span className="tenk-preview-name">Your Name</span>
              <span className="tenk-preview-value">150</span>
              <span className="tenk-preview-value tenk-preview-total">1,250</span>
            </div>
            <div className="tenk-preview-row">
              <span className="tenk-preview-name">Teammate 1</span>
              <span className="tenk-preview-value">200</span>
              <span className="tenk-preview-value">1,100</span>
            </div>
            <div className="tenk-preview-row">
              <span className="tenk-preview-name">Teammate 2</span>
              <span className="tenk-preview-value">180</span>
              <span className="tenk-preview-value">950</span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="tenk-section">
        <h2>Why Kids Use Hockey Shot Challenge Instead of PDF Sheets</h2>
        <div className="tenk-grid">
          <div className="tenk-card">
            <div className="tenk-card-icon">⚡</div>
            <h3>Instant Updates</h3>
            <p>Log shots in 5 seconds. Leaderboard updates live. No manually entering counts.</p>
          </div>
          <div className="tenk-card">
            <div className="tenk-card-icon">🏆</div>
            <h3>Real Competition</h3>
            <p>See your rank instantly. Compete with your team. The scoreboard effect actually works.</p>
          </div>
          <div className="tenk-card">
            <div className="tenk-card-icon">📊</div>
            <h3>See Your Progress</h3>
            <p>Weekly breakdowns, streaks, shots by type. PDF sheets don't show this.</p>
          </div>
          <div className="tenk-card">
            <div className="tenk-card-icon">📱</div>
            <h3>Works Everywhere</h3>
            <p>Phone, tablet, no app to download. Works on any device, instantly.</p>
          </div>
          <div className="tenk-card">
            <div className="tenk-card-icon">🔗</div>
            <h3>Share Your Progress</h3>
            <p>Send your leaderboard link to parents and coaches. Everyone stays updated.</p>
          </div>
          <div className="tenk-card">
            <div className="tenk-card-icon">🎯</div>
            <h3>Milestone Celebrations</h3>
            <p>Hit 5K? 10K? Get a celebration. Kids actually stay motivated.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="tenk-section tenk-section--how">
        <h2>How It Works (2 Minutes to Set Up)</h2>
        <div className="tenk-steps">
          <div className="tenk-step">
            <div className="tenk-step-num">1</div>
            <h3>Download the Free PDF</h3>
            <p>Print and post it. Classic tracking sheet format — nothing fancy.</p>
          </div>
          <div className="tenk-step">
            <div className="tenk-step-num">2</div>
            <h3>Or Use the Free App</h3>
            <p>Create your team leaderboard on Hockey Shot Challenge. No credit card required.</p>
          </div>
          <div className="tenk-step">
            <div className="tenk-step-num">3</div>
            <h3>Log Shots After Practice</h3>
            <p>Tap the app or mark the sheet. Everyone sees the updated leaderboard instantly.</p>
          </div>
          <div className="tenk-step">
            <div className="tenk-step-num">4</div>
            <h3>Winner Gets Bragging Rights</h3>
            <p>Hit 10,000 first? Celebrate. The leaderboard keeps everyone pushing all summer.</p>
          </div>
        </div>
      </section>

      {/* FOR ASSOCIATIONS */}
      <section className="tenk-section tenk-section--assoc">
        <h2>Running a 10K Challenge for Your Association?</h2>
        <div className="tenk-assoc-content">
          <p className="tenk-assoc-sub">
            Hundreds of associations run 10K Challenges every summer. Most use PDF sheets or outdated tools. We've built a better way — free for you, better experience for your families.
          </p>
          <div className="tenk-assoc-offer">
            <h3>Free Association Leaderboards</h3>
            <p>We set up a branded leaderboard for your association. Your families sign up, log shots, compete. No cost. No ads. You manage everything.</p>
            <button className="tenk-btn tenk-btn--secondary" onClick={() => nav('/association-partnership')}>
              Learn About Association Partnerships →
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tenk-section">
        <h2>FAQ</h2>
        <div className="tenk-faq">
          <details className="tenk-faq-item">
            <summary>Can we really use this for free?</summary>
            <p>Yes. Hockey Shot Challenge is free for players, teams, and associations. Forever. No hidden tiers.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>Do kids need an app?</summary>
            <p>No. Works in any web browser on phone or computer. No app to download, no accounts for each player.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>Can we run this for our whole association?</summary>
            <p>Yes. We can set up a branded leaderboard for your association, league, or club. All free. Email us to get started.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>What if we prefer PDF sheets?</summary>
            <p>Download the free PDF above. But if you want live leaderboards + real-time competition, try the app.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>Can parents see the leaderboard?</summary>
            <p>Yes. Share the link with anyone. Coaches, parents, players — everyone sees the real-time standings.</p>
          </details>
        </div>
      </section>

      {/* CTA */}
      <section className="tenk-section tenk-section--final">
        <h2>Start Your 10K Challenge Today</h2>
        <p className="tenk-final-sub">Free. Takes 2 minutes to set up. No credit card required.</p>
        <div className="tenk-final-btns">
          <button className="tenk-btn tenk-btn--primary" onClick={() => nav('/start')}>
            Create Your Challenge →
          </button>
          <button className="tenk-btn tenk-btn--outline" onClick={downloadPDF}>
            Download PDF Instead
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="tenk-footer">
        <p>Questions? <a href="mailto:samuelmenard@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Email us</a></p>
        <p style={{ fontSize: '12px', color: 'var(--text-mute)', marginTop: '8px' }}>Hockey Shot Challenge — Free 10,000 shot challenge tracker for players and associations</p>
      </footer>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.tenk-wrap { min-height: 100dvh; background: var(--bg); color: var(--text); font-family: var(--font-body); }
body:has(.tenk-wrap) { background: var(--bg) !important; }

.tenk-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; max-width: 1200px; margin: 0 auto; }
.tenk-logo { font-size: 18px; font-weight: 700; background: transparent; cursor: pointer; color: white; }
.tenk-start { background: var(--accent); color: white; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; }

.tenk-hero { max-width: 1000px; margin: 0 auto; padding: 60px 20px 40px; text-align: center; }
.tenk-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: var(--accent); margin-bottom: 16px; }
.tenk-title { font-family: var(--font-display); font-size: clamp(32px, 8vw, 56px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 16px; }
.tenk-sub { font-size: 18px; color: var(--text-soft); margin-bottom: 32px; }

.tenk-hero-cta { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }
.tenk-btn { border: none; border-radius: 10px; padding: 14px 28px; font-weight: 700; font-family: var(--font-display); font-size: 16px; cursor: pointer; transition: all 0.2s; }
.tenk-btn--primary { background: var(--accent); color: white; }
.tenk-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(41, 121, 255, 0.3); }
.tenk-btn--secondary { background: transparent; color: white; border: 2px solid var(--accent); }
.tenk-btn--secondary:hover { background: rgba(41, 121, 255, 0.1); }
.tenk-btn--outline { background: transparent; color: var(--accent); border: 2px solid var(--accent); }

.tenk-hero-image { margin-top: 40px; }
.tenk-tracker-preview { background: #0f1624; border: 1px solid #1a2847; border-radius: 12px; padding: 20px; font-family: monospace; font-size: 13px; }
.tenk-preview-row { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px; padding: 12px 0; border-bottom: 1px solid #1a2847; }
.tenk-preview-row:last-child { border-bottom: none; }
.tenk-preview-label { color: var(--text-soft); font-weight: 600; }
.tenk-preview-name { color: white; font-weight: 600; }
.tenk-preview-value { color: var(--ice); text-align: right; }
.tenk-preview-total { color: var(--accent); font-weight: 700; }

.tenk-section { max-width: 1000px; margin: 0 auto; padding: 60px 20px; }
.tenk-section h2 { font-family: var(--font-display); font-size: clamp(28px, 6vw, 42px); font-weight: 800; color: white; margin-bottom: 40px; text-align: center; }

.tenk-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.tenk-card { background: #0f1624; border: 1px solid #1a2847; border-radius: 12px; padding: 24px; }
.tenk-card-icon { font-size: 40px; margin-bottom: 12px; }
.tenk-card h3 { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: white; margin-bottom: 8px; }
.tenk-card p { font-size: 14px; color: var(--text-soft); line-height: 1.5; }

.tenk-section--how { background: rgba(41, 121, 255, 0.05); }
.tenk-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.tenk-step { text-align: center; }
.tenk-step-num { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: var(--accent); color: white; border-radius: 50%; font-weight: 800; font-size: 20px; margin-bottom: 16px; }
.tenk-step h3 { font-family: var(--font-display); font-weight: 700; margin-bottom: 8px; }
.tenk-step p { font-size: 14px; color: var(--text-soft); }

.tenk-section--assoc { background: #0f1624; border-radius: 16px; }
.tenk-assoc-sub { font-size: 16px; color: var(--text-soft); margin-bottom: 24px; line-height: 1.6; }
.tenk-assoc-offer { background: rgba(41, 121, 255, 0.1); border: 1px solid rgba(41, 121, 255, 0.3); border-radius: 12px; padding: 24px; margin-top: 24px; }
.tenk-assoc-offer h3 { font-family: var(--font-display); font-weight: 700; margin-bottom: 8px; }
.tenk-assoc-offer p { margin-bottom: 16px; }

.tenk-faq { display: flex; flex-direction: column; gap: 12px; }
.tenk-faq-item { background: #0f1624; border: 1px solid #1a2847; border-radius: 10px; padding: 16px; cursor: pointer; }
.tenk-faq-item summary { font-weight: 700; color: white; outline: none; }
.tenk-faq-item p { margin-top: 12px; color: var(--text-soft); font-size: 14px; line-height: 1.6; }

.tenk-section--final { text-align: center; background: rgba(61, 214, 140, 0.05); border-radius: 16px; }
.tenk-final-sub { font-size: 16px; color: var(--text-soft); margin-bottom: 24px; }
.tenk-final-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

.tenk-footer { border-top: 1px solid #1a2035; padding: 40px 20px; text-align: center; max-width: 1200px; margin: 0 auto; font-size: 14px; color: var(--text-soft); }
`
