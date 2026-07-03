import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'
import { AppMockupSection, RoutineSection } from '../components/LandingSharedSections'

export default function CoachLandingScreen() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'Hockey Coaching Dashboard — Track Player Off-Ice Training Free',
      description: 'Free hockey coaching tool. See which players are logging shots at home, track streaks and ranks, see weekly 1v1 battle results, and motivate your team — no app required.',
      url: `${CANONICAL_URL}/coach`,
    })
    addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Hockey Shot Challenge — Coach Dashboard',
      url: 'https://hockeyshotchallenge.com/coach',
      applicationCategory: 'SportsApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
      description: 'Free hockey coaching dashboard. Track which players log shots and stickhandling at home, see weekly activity, see 1v1 battle results, and motivate your team.',
      audience: { '@type': 'Audience', audienceType: 'Hockey coaches and club managers' },
    })
  }, [])

  return (
    <div className="cl-wrap">
      <nav className="cl-nav">
        <button className="cl-back" onClick={() => nav('/')}>← Back</button>
        <button className="cl-nav-cta" onClick={() => nav('/coach/start')}>Set up my team →</button>
      </nav>

      <section className="cl-hero">
        <div className="cl-eyebrow">FREE FOR COACHES · SIGN IN WITH GOOGLE</div>
        <h1 className="cl-title">See which players are putting in the work.</h1>
        <p className="cl-sub">
          Your players log shots and stickhandling reps every day. You see who's showing up. Free for your whole team — no app store, no subscriptions.
        </p>
        <button className="cl-cta" onClick={() => nav('/coach/start')}>
          Set up my team — it's free →
        </button>
        <p className="cl-cta-hint">Takes 2 minutes. Sign in with Google.</p>
      </section>

      <section className="cl-features">
        <div className="cl-features-inner">
          <div className="cl-feature">
            <div className="cl-feature-icon">📊</div>
            <div className="cl-feature-body">
              <div className="cl-feature-title">Activity feed</div>
              <div className="cl-feature-text">See every rep your players logged this week. Filter by player or shot type. Know who's putting in the work before practice.</div>
            </div>
          </div>
          <div className="cl-feature">
            <div className="cl-feature-icon">🏆</div>
            <div className="cl-feature-body">
              <div className="cl-feature-title">Weekly 1v1 battles</div>
              <div className="cl-feature-text">Every Monday, each player gets matched 1v1 against a player from another team. Most shots by Sunday wins. You can see every result.</div>
            </div>
          </div>
          <div className="cl-feature">
            <div className="cl-feature-icon">🎬</div>
            <div className="cl-feature-body">
              <div className="cl-feature-title">Skill videos</div>
              <div className="cl-feature-text">The app includes curated drill videos for every shot type and stickhandling skill. Your players can watch a drill and log it right after.</div>
            </div>
          </div>
          <div className="cl-feature">
            <div className="cl-feature-icon">📈</div>
            <div className="cl-feature-body">
              <div className="cl-feature-title">Player progress</div>
              <div className="cl-feature-text">Track lifetime shots, current rank, and day streaks for every player on your team. See who's building the habit.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cl-dashboard-preview">
        <div className="cl-dashboard-inner">
          <div className="cl-eyebrow">THE COACH DASHBOARD</div>
          <h2 className="cl-section-title">Your whole team. One screen.</h2>
          <p className="cl-section-sub">See every player, their shot count this week, their rank, and their streak — all in one place. No spreadsheets. No chasing kids for updates.</p>

          <div className="cl-dash-mock">
            <div className="cl-dash-header">
              <div className="cl-dash-team">Peewee AA · Burlington</div>
              <div className="cl-dash-week">This week</div>
            </div>
            <div className="cl-dash-players">
              {[
                { name: 'Olivia M.', rank: 'Prospect II', shots: 168, streak: 12, active: true },
                { name: 'Liam K.', rank: 'Prospect I', shots: 191, streak: 8, active: true },
                { name: 'Jake T.', rank: 'Rookie III', shots: 84, streak: 3, active: false },
                { name: 'Owen S.', rank: 'Rookie II', shots: 42, streak: 1, active: false },
              ].map((p) => (
                <div key={p.name} className={`cl-dash-row ${p.active ? 'cl-dash-row--active' : ''}`}>
                  <div className="cl-dash-player-info">
                    <div className="cl-dash-player-name">{p.name}</div>
                    <div className="cl-dash-player-rank">{p.rank}</div>
                  </div>
                  <div className="cl-dash-player-stats">
                    <div className="cl-dash-stat">
                      <span className="cl-dash-stat-num">{p.shots}</span>
                      <span className="cl-dash-stat-label">shots</span>
                    </div>
                    <div className="cl-dash-stat">
                      <span className="cl-dash-stat-num cl-dash-stat-num--fire">🔥 {p.streak}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AppMockupSection />

      <RoutineSection />

      <section className="cl-videos">
        <div className="cl-videos-inner">
          <div className="cl-eyebrow">SKILL VIDEOS</div>
          <h2 className="cl-section-title">Drills your players can watch and do.</h2>
          <p className="cl-section-sub">
            Every shot type and stickhandling skill has curated YouTube drills built right in. Players pick a drill, watch it, then log their reps. You see everything.
          </p>
          <div className="cl-video-tags">
            {['Wrist shots', 'Snap shots', 'Slap shots', 'Backhand shots', 'Toe drags', 'Figure eights', 'Lateral moves', 'One-hand drills'].map((v) => (
              <div key={v} className="cl-video-tag">{v}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="cl-free">
        <div className="cl-free-inner">
          <div className="cl-eyebrow">PRICING</div>
          <h2 className="cl-section-title">Free. For everyone.</h2>
          <ul className="cl-free-list">
            <li>Free for coaches</li>
            <li>Free for players</li>
            <li>No app store required — runs in any browser</li>
            <li>No subscription, no hidden fees</li>
          </ul>
          <button className="cl-cta" onClick={() => nav('/coach/start')}>
            Set up my team →
          </button>
          <p className="cl-cta-hint">Sign in with Google. Takes 2 minutes.</p>
          <p style={{ marginTop: 20, fontSize: 14, color: '#4a6080' }}>
            Managing a full association?{' '}
            <button className="cl-assoc-link" onClick={() => nav('/for-clubs')}>See club & association tools →</button>
          </p>
        </div>
      </section>

      <style>{styles + `
        .cl-assoc-link {
          background: transparent; color: #60a5fa;
          font-size: inherit; font-family: inherit;
          text-decoration: underline; text-underline-offset: 3px;
          cursor: pointer; padding: 0;
        }
        .cl-assoc-link:hover { color: white; }
      `}</style>
    </div>
  )
}

const styles = `
.cl-wrap {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
}
.cl-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  max-width: 720px;
  margin: 0 auto;
}
.cl-back {
  color: #8899b4;
  font-size: 15px;
  background: transparent;
}
.cl-back:hover { color: white; }
.cl-nav-cta {
  background: var(--accent);
  color: white;
  padding: 10px 18px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
}

.cl-hero {
  text-align: center;
  padding: 40px 20px 50px;
  max-width: 620px;
  margin: 0 auto;
}
.cl-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #60a5fa;
  margin-bottom: 16px;
}
.cl-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 7vw, 52px);
  font-weight: 800;
  color: white;
  line-height: 1.05;
  letter-spacing: -0.5px;
  margin-bottom: 18px;
}
.cl-sub {
  font-size: 18px;
  color: #a8b8d0;
  line-height: 1.55;
  margin-bottom: 28px;
}
.cl-cta {
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
  max-width: 420px;
}
.cl-cta:active { transform: scale(0.98); }
.cl-cta-hint {
  font-size: 13px;
  color: #6b7fa8;
  margin-top: 10px;
}

.cl-features {
  border-top: 1px solid #1a2035;
  padding: 50px 20px;
}
.cl-features-inner {
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.cl-feature {
  display: flex;
  gap: 18px;
  align-items: flex-start;
}
.cl-feature-icon {
  font-size: 26px;
  width: 44px;
  height: 44px;
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cl-feature-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 5px;
}
.cl-feature-text {
  font-size: 15px;
  color: #8899b4;
  line-height: 1.55;
}

.cl-dashboard-preview {
  background: #060b18;
  border-top: 1px solid #1a2035;
  border-bottom: 1px solid #1a2035;
  padding: 60px 20px;
}
.cl-dashboard-inner {
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
}
.cl-section-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 800;
  color: white;
  margin-bottom: 14px;
  letter-spacing: 0.2px;
}
.cl-section-sub {
  font-size: 16px;
  color: #8899b4;
  line-height: 1.55;
  margin-bottom: 32px;
}
.cl-dash-mock {
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 20px;
  padding: 18px 16px;
  text-align: left;
}
.cl-dash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #1a2847;
}
.cl-dash-team {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.3px;
}
.cl-dash-week {
  font-size: 12px;
  color: #4a6080;
  font-weight: 600;
}
.cl-dash-players {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cl-dash-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #0a1220;
  border-radius: 10px;
  padding: 10px 12px;
  border: 1px solid transparent;
}
.cl-dash-row--active { border-color: rgba(41,121,255,0.2); }
.cl-dash-player-name {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: white;
}
.cl-dash-player-rank {
  font-size: 12px;
  color: #4a6080;
  margin-top: 2px;
}
.cl-dash-player-stats {
  display: flex;
  align-items: center;
  gap: 16px;
}
.cl-dash-stat {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.cl-dash-stat-num {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 800;
  color: #60a5fa;
}
.cl-dash-stat-num--fire {
  font-size: 13px;
  color: #fb923c;
}
.cl-dash-stat-label {
  font-size: 11px;
  color: #4a6080;
}

.cl-videos {
  border-top: 1px solid #1a2035;
  padding: 50px 20px;
}
.cl-videos-inner {
  max-width: 640px;
  margin: 0 auto;
}
.cl-video-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.cl-video-tag {
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 20px;
  padding: 7px 14px;
  font-size: 14px;
  color: #a8b8d0;
  font-weight: 500;
}

.cl-free {
  background: #080d1a;
  border-top: 1px solid #1a2035;
  padding: 60px 20px;
  text-align: center;
}
.cl-free-inner {
  max-width: 480px;
  margin: 0 auto;
}
.cl-free-list {
  list-style: none;
  padding: 0;
  margin: 0 0 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  display: inline-flex;
}
.cl-free-list li {
  font-size: 16px;
  color: #a8b8d0;
  padding-left: 24px;
  position: relative;
}
.cl-free-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #60a5fa;
  font-weight: 700;
}
`
