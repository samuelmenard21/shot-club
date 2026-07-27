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
    // Opens the print-friendly tracker sheet, which auto-opens the print dialog
    // (print it, or Save as PDF). The old link pointed at a PDF that didn't exist.
    window.open('/10k-tracker.html', '_blank', 'noopener')
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
            🖨️ Get the Free Printable Tracker
          </button>
          <button className="tenk-btn tenk-btn--secondary" onClick={() => nav('/start')}>
            Try Online Tracker (Free) →
          </button>
        </div>

        {/* Love the sheet? Go live in 2 minutes */}
        <div style={{ maxWidth: 640, margin: '20px auto 0', padding: '18px 20px', border: '1px solid rgba(41,121,255,0.3)', borderRadius: 14, background: 'rgba(41,121,255,0.08)', textAlign: 'left' }}>
          <div style={{ fontWeight: 800, color: '#fff', marginBottom: 6, fontSize: 16 }}>Love the sheet? Go live in 2 minutes.</div>
          <div style={{ fontSize: 14, color: 'var(--text-soft)', marginBottom: 12, lineHeight: 1.5 }}>
            The printable is a great start. When your kid wants to see their name climb past a teammate's, scan the QR on the sheet (or tap below) to move the same challenge online — live leaderboards, streaks, and ranks. Free, nothing to install.
          </div>
          <button className="tenk-btn tenk-btn--secondary" onClick={() => nav('/start?src=10ksheet')}>
            Make it a live leaderboard →
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

      {/* GUIDE / ARTICLE */}
      <section className="tenk-section">
        <h2>What Is the 10,000 Shot Challenge?</h2>
        <p style={{ color: 'var(--text-soft)', fontSize: 16, lineHeight: 1.6, maxWidth: 720, margin: '0 auto 14px' }}>
          The 10,000 Shot Challenge is a simple off-season goal: take 10,000 shots away from
          the rink — in your driveway, garage, or basement — over a summer. It became a staple
          of youth hockey development because it turns "practice more" into one concrete,
          countable target. Every shot type counts: wrist, snap, slap, and backhand. Most
          players spread it across an 8-week summer, which works out to about <strong style={{ color: 'var(--ice)' }}>1,250
          shots a week</strong>, or roughly <strong style={{ color: 'var(--ice)' }}>180 a day</strong> if you shoot most days.
        </p>

        <h3 style={{ textAlign: 'center', marginTop: 28 }}>The 8-Week 10,000 Shot Schedule</h3>
        <div style={{ overflowX: 'auto', maxWidth: 720, margin: '10px auto 0', borderRadius: 12, border: '1px solid var(--border-dim)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480, fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--ice)' }}>
                <th style={{ textAlign: 'left', padding: '10px 14px' }}>Week</th>
                <th style={{ textAlign: 'left', padding: '10px 14px' }}>Shots this week</th>
                <th style={{ textAlign: 'left', padding: '10px 14px' }}>Running total</th>
                <th style={{ textAlign: 'left', padding: '10px 14px' }}>Focus</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['1', 'Clean mechanics — weight transfer & follow-through'],
                ['2', 'Quick release'],
                ['3', 'Change the shooting angle'],
                ['4', 'Halfway 🥈 — snap shot power'],
                ['5', 'Catch-and-release'],
                ['6', 'Backhands'],
                ['7', 'Off-balance & in-stride shots'],
                ['8', 'Finish 🏆 — game-speed reps'],
              ].map(([w, focus], i) => (
                <tr key={w} style={{ borderTop: '1px solid var(--border-dim)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#fff' }}>Week {w}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-soft)' }}>1,250</td>
                  <td style={{ padding: '10px 14px', fontWeight: 800, color: 'var(--ice)' }}>{((i + 1) * 1250).toLocaleString()}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-soft)' }}>{focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ textAlign: 'center', marginTop: 28 }}>How Many Shots a Day?</h3>
        <p style={{ color: 'var(--text-soft)', fontSize: 16, lineHeight: 1.6, maxWidth: 720, margin: '0 auto 14px', textAlign: 'center' }}>
          About 180 a day across 6 days — or 1,250 a week, however you split it. Younger players
          often start with the 5,000 version (~90/day). See our full breakdown of{' '}
          <a href="/how-many-shots-per-day" style={{ color: 'var(--ice)', fontWeight: 700 }}>daily shot targets by age</a>.
        </p>

        <h3 style={{ textAlign: 'center', marginTop: 28 }}>5 Tips to Actually Finish</h3>
        <ul style={{ maxWidth: 720, margin: '10px auto 0', color: 'var(--text-soft)', fontSize: 15, lineHeight: 1.7, paddingLeft: 22 }}>
          <li><strong style={{ color: '#fff' }}>Shoot every day, even 50.</strong> Consistency beats one giant weekend session.</li>
          <li><strong style={{ color: '#fff' }}>Leave your pad by the door.</strong> The easier it is to start, the more you'll shoot.</li>
          <li><strong style={{ color: '#fff' }}>Track every shot — don't guess.</strong> Guessing kills motivation; a real count fuels it.</li>
          <li><strong style={{ color: '#fff' }}>Mix all four shot types.</strong> A complete player isn't just a slapshot.</li>
          <li><strong style={{ color: '#fff' }}>Rest when your wrist is sore.</strong> High-volume challenges are where overuse strains happen.</li>
        </ul>
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
          <details className="tenk-faq-item">
            <summary>How long does the 10,000 shot challenge take?</summary>
            <p>Most players finish over an 8-week summer at about 1,250 shots a week (~180 a day). Shoot more days and you'll finish sooner; the only rule is to keep going.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>Is 10,000 shots realistic for a kid?</summary>
            <p>For dedicated U13 and up, yes — 1,250 a week is very doable off-ice. Younger players usually start with the 5,000 Shot Challenge (about 90 shots a day) and build up.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>What age is the 10,000 shot challenge for?</summary>
            <p>It's popular with U13–U18 players. For U9–U11, the 5,000 version is a better first target. What matters most is clean mechanics, not just volume.</p>
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
