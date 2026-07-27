import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'

export default function FiveKChallengeScreen() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: '5,000 Shot Challenge Tracker — Free Printable Log Sheet & Online Tracker',
      description: 'Free printable 5000 shot challenge tracker + online app. Perfect for young hockey players. Log shots, track progress, compete with teammates.',
      url: `${CANONICAL_URL}/5000-shot-challenge`,
    })
    addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: '5,000 Shot Challenge Tracker',
      description: 'Free 5000 shot challenge tracking sheet and online app for youth hockey players and associations.',
      url: `${CANONICAL_URL}/5000-shot-challenge`,
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
    window.open('/5k-tracker.html?print=1', '_blank', 'noopener')
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
        <div className="tenk-eyebrow">5,000 SHOT CHALLENGE</div>
        <h1 className="tenk-title">The Beginner-Friendly Summer Challenge</h1>
        <p className="tenk-sub">Free printable tracking sheet + online app. Perfect for young players or a 2-month challenge. Stop using spreadsheets. Start competing.</p>

        <div className="tenk-hero-cta">
          <button className="tenk-btn tenk-btn--primary" onClick={downloadPDF}>
            🖨️ Get the Free Printable Tracker
          </button>
          <button className="tenk-btn tenk-btn--secondary" onClick={() => nav('/start')}>
            Try Online Tracker (Free) →
          </button>
        </div>

        {/* Love the sheet? Go live in 2 minutes */}
        <div style={{ maxWidth: 640, margin: '20px auto 0', padding: '18px 20px', border: '1px solid rgba(255,122,41,0.3)', borderRadius: 14, background: 'rgba(255,122,41,0.08)', textAlign: 'left' }}>
          <div style={{ fontWeight: 800, color: '#fff', marginBottom: 6, fontSize: 16 }}>Love the sheet? Go live in 2 minutes.</div>
          <div style={{ fontSize: 14, color: 'var(--text-soft)', marginBottom: 12, lineHeight: 1.5 }}>
            The printable is a great start. When your kid wants to see their name climb past a teammate's, scan the QR on the sheet (or tap below) to move the same challenge online — live leaderboards, streaks, and ranks. Free, nothing to install.
          </div>
          <button className="tenk-btn tenk-btn--secondary" onClick={() => nav('/start?src=5ksheet')}>
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
              <span className="tenk-preview-value">600</span>
              <span className="tenk-preview-value tenk-preview-total">625</span>
            </div>
            <div className="tenk-preview-row">
              <span className="tenk-preview-name">Teammate 1</span>
              <span className="tenk-preview-value">580</span>
              <span className="tenk-preview-value">625</span>
            </div>
            <div className="tenk-preview-row">
              <span className="tenk-preview-name">Teammate 2</span>
              <span className="tenk-preview-value">550</span>
              <span className="tenk-preview-value">625</span>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDE / ARTICLE */}
      <section className="tenk-section">
        <h2>What Is the 5,000 Shot Challenge?</h2>
        <p style={{ color: 'var(--text-soft)', fontSize: 16, lineHeight: 1.6, maxWidth: 720, margin: '0 auto 14px' }}>
          The 5,000 Shot Challenge is the perfect first off-season goal: take 5,000 shots away
          from the rink — driveway, garage, or basement — over a summer. It's the friendlier
          sibling of the classic 10,000 Shot Challenge, ideal for younger players (U9–U11) or a
          first serious summer of off-ice work. Every shot type counts: wrist, snap, slap, and
          backhand. Spread across 8 weeks, that's about <strong style={{ color: 'var(--ice)' }}>625 shots a week</strong>,
          or roughly <strong style={{ color: 'var(--ice)' }}>90 a day</strong> if you shoot most days.
        </p>

        <h3 style={{ textAlign: 'center', marginTop: 28 }}>The 8-Week 5,000 Shot Schedule</h3>
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
                ['2', 'Wrist-shot accuracy'],
                ['3', 'Quick release'],
                ['4', 'Halfway 🥈 — change the angle'],
                ['5', 'Snap shot'],
                ['6', 'Backhands'],
                ['7', 'Shooting on the move'],
                ['8', 'Finish 🏆 — put it all together'],
              ].map(([w, focus], i) => (
                <tr key={w} style={{ borderTop: '1px solid var(--border-dim)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#fff' }}>Week {w}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-soft)' }}>625</td>
                  <td style={{ padding: '10px 14px', fontWeight: 800, color: 'var(--ice)' }}>{((i + 1) * 625).toLocaleString()}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-soft)' }}>{focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ textAlign: 'center', marginTop: 28 }}>How Many Shots a Day?</h3>
        <p style={{ color: 'var(--text-soft)', fontSize: 16, lineHeight: 1.6, maxWidth: 720, margin: '0 auto 14px', textAlign: 'center' }}>
          About 90 a day across 6–7 days — or 625 a week, however you split it. Just starting out?
          Try the <a href="/challenges" style={{ color: 'var(--ice)', fontWeight: 700 }}>1,000 Shot Challenge</a> first.
          Ready for more? Step up to the{' '}
          <a href="/10000-shot-challenge" style={{ color: 'var(--ice)', fontWeight: 700 }}>10,000 Shot Challenge</a>.
        </p>

        <h3 style={{ textAlign: 'center', marginTop: 28 }}>5 Tips to Finish Your First Challenge</h3>
        <ul style={{ maxWidth: 720, margin: '10px auto 0', color: 'var(--text-soft)', fontSize: 15, lineHeight: 1.7, paddingLeft: 22 }}>
          <li><strong style={{ color: '#fff' }}>Shoot every day, even 25.</strong> Small daily reps beat rare big sessions.</li>
          <li><strong style={{ color: '#fff' }}>Leave your pad by the door.</strong> The easier it is to start, the more you'll shoot.</li>
          <li><strong style={{ color: '#fff' }}>Track every shot — don't guess.</strong> A real count keeps kids motivated.</li>
          <li><strong style={{ color: '#fff' }}>Mix all four shot types.</strong> Build a complete shot, not just one.</li>
          <li><strong style={{ color: '#fff' }}>Celebrate the milestones.</strong> 1,250 · 2,500 · 3,750 · 5,000 — mark every one.</li>
        </ul>
      </section>

      {/* WHY */}
      <section className="tenk-section">
        <h2>Why Kids Love the 5K Challenge</h2>
        <div className="tenk-grid">
          <div className="tenk-card">
            <div className="tenk-card-icon">✨</div>
            <h3>Achievable Goal</h3>
            <p>625 shots per week is realistic for kids to hit. Big enough to matter, small enough to finish.</p>
          </div>
          <div className="tenk-card">
            <div className="tenk-card-icon">⚡</div>
            <h3>Instant Updates</h3>
            <p>Log shots in 5 seconds. Leaderboard updates live. No manually entering counts.</p>
          </div>
          <div className="tenk-card">
            <div className="tenk-card-icon">🏆</div>
            <h3>Real Competition</h3>
            <p>See your rank instantly. Compete with your team. The scoreboard effect actually motivates kids.</p>
          </div>
          <div className="tenk-card">
            <div className="tenk-card-icon">📊</div>
            <h3>See Your Progress</h3>
            <p>Weekly breakdowns, streaks, shots by type. PDF sheets don't show this level of detail.</p>
          </div>
          <div className="tenk-card">
            <div className="tenk-card-icon">📱</div>
            <h3>Works Everywhere</h3>
            <p>Phone, tablet, no app to download. Works on any device, instantly from home.</p>
          </div>
          <div className="tenk-card">
            <div className="tenk-card-icon">🎯</div>
            <h3>Milestone Celebrations</h3>
            <p>Hit 5K? Get a celebration. Kids actually stay motivated and finish the challenge.</p>
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
            <p>Hit 5,000 first? Celebrate. The leaderboard keeps everyone pushing all summer.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="tenk-section tenk-section--testimonials">
        <h2>What Coaches & Parents Say</h2>
        <div className="tenk-testimonials">
          <div className="tenk-testimonial">
            <p>"The 5K challenge is perfect for age 8-12. Kids can actually hit it and feel like champions."</p>
            <div className="tenk-testimonial-author">— Dave, Hockey Parent</div>
          </div>
          <div className="tenk-testimonial">
            <p>"No more kids asking 'how many shots until I'm done?' The app shows them exactly where they stand."</p>
            <div className="tenk-testimonial-author">— Sarah, Coach</div>
          </div>
          <div className="tenk-testimonial">
            <p>"My team loved seeing their names on the leaderboard. Even the quiet kids wanted to log shots."</p>
            <div className="tenk-testimonial-author">— Chris, Club Director</div>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="tenk-footer-cta">
        <h2>Ready to Run Your 5K Challenge?</h2>
        <p>Pick a challenge, log shots, watch your team climb the leaderboard.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
          <button className="tenk-btn tenk-btn--primary" onClick={() => nav('/start')}>
            Start Your Team Challenge →
          </button>
          <button className="tenk-btn tenk-btn--secondary" onClick={() => nav('/challenges')}>
            View All Challenges
          </button>
        </div>
      </section>

      <style>{`
        .tenk-testimonials {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 32px;
        }
        .tenk-testimonial {
          padding: 24px;
          background: rgba(61, 214, 140, 0.1);
          border: 1px solid rgba(61, 214, 140, 0.3);
          border-radius: 12px;
          color: var(--text-soft);
          font-size: 15px;
          line-height: 1.6;
        }
        .tenk-testimonial p {
          margin: 0 0 16px;
          font-style: italic;
          color: white;
        }
        .tenk-testimonial-author {
          font-weight: 600;
          color: var(--accent);
          font-size: 13px;
        }
      `}</style>
    </div>
  )
}
