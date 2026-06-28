import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { setSEO, CANONICAL_URL } from '../lib/seo'

export default function PlayerLandingScreen() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'For players and parents',
      description: 'Log your shots at home. Compete in squad battles every week. Earn your rank. Free for hockey players ages 6–18.',
      url: `${CANONICAL_URL}/player`,
    })
  }, [])

  return (
    <div className="pl-wrap">
      <nav className="pl-nav">
        <button className="pl-back" onClick={() => nav('/')}>← Back</button>
        <button className="pl-nav-cta" onClick={() => nav('/start')}>Start free →</button>
      </nav>

      <section className="pl-hero">
        <div className="pl-eyebrow">FREE · NO EMAIL NEEDED · AGES 6–18</div>
        <h1 className="pl-title">Log your shots.<br/>Beat your teammates.</h1>
        <p className="pl-sub">
          Every day, log how many shots you took at home. Watch your rank climb. Compete against other teams every week.
        </p>
        <button className="pl-cta" onClick={() => nav('/start')}>
          Start for free — takes 30 seconds →
        </button>
        <p className="pl-cta-hint">No email. No credit card. Just hockey.</p>
      </section>

      <section className="pl-steps">
        <h2 className="pl-section-title">Here's how it works</h2>
        <div className="pl-step-list">
          <div className="pl-step">
            <div className="pl-step-num">1</div>
            <div className="pl-step-body">
              <div className="pl-step-title">Sign up in 30 seconds</div>
              <div className="pl-step-text">Pick your team. Create your screen name. No email or password needed. Done.</div>
            </div>
          </div>
          <div className="pl-step">
            <div className="pl-step-num">2</div>
            <div className="pl-step-body">
              <div className="pl-step-title">Log shots every day</div>
              <div className="pl-step-text">Tap a shot type. Enter how many. Takes 5 seconds. The more you log, the higher you climb.</div>
            </div>
          </div>
          <div className="pl-step">
            <div className="pl-step-num">3</div>
            <div className="pl-step-body">
              <div className="pl-step-title">Compete every week</div>
              <div className="pl-step-text">Every Monday, you get placed with 3 teammates. Your squad faces a rival squad from another team. Most shots by Sunday wins.</div>
            </div>
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
        </div>
      </section>

      <section className="pl-final">
        <h2 className="pl-final-title">Ready to start?</h2>
        <p className="pl-final-sub">Takes 30 seconds. No email needed.</p>
        <button className="pl-cta pl-cta--big" onClick={() => nav('/start')}>
          Create my free account →
        </button>
      </section>

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
.pl-cta--big {
  font-size: 19px;
  padding: 18px 32px;
}
.pl-cta-hint {
  font-size: 13px;
  color: #6b7fa8;
  margin-top: 10px;
}

.pl-steps, .pl-what, .pl-final {
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

.pl-final {
  text-align: center;
  border-top: 1px solid #1a2035;
  padding: 60px 20px;
}
.pl-final-title {
  font-family: var(--font-display);
  font-size: clamp(26px, 5vw, 36px);
  font-weight: 800;
  color: white;
  margin-bottom: 10px;
}
.pl-final-sub {
  font-size: 16px;
  color: #6b7fa8;
  margin-bottom: 24px;
}
`
