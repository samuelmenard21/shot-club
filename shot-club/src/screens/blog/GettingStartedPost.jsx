import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, CANONICAL_URL } from '../../lib/seo'

export default function GettingStartedPost() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'How to Get Your Kid Started on Hockey Shot Challenge',
      description: 'A step-by-step guide for hockey parents. Sign in with Google, set up your player profile, find their team, and log the first session. Takes 5 minutes.',
      url: `${CANONICAL_URL}/blog/getting-started`,
    })
  }, [])

  return (
    <div className="post-wrap">
      <nav className="post-nav">
        <button className="post-back" onClick={() => nav('/blog')}>← All guides</button>
        <button className="post-nav-cta" onClick={() => nav('/start')}>Start free →</button>
      </nav>

      <article className="post-article">
        <header className="post-header">
          <div className="post-eyebrow">GETTING STARTED · FOR PARENTS</div>
          <h1 className="post-title">How to Get Your Kid Started on Hockey Shot Challenge</h1>
          <p className="post-subtitle">(It Takes 5 Minutes)</p>
          <p className="post-date">July 2026</p>
        </header>

        <div className="post-body">
          <p>If your son or daughter plays hockey, you've probably heard the advice a hundred times: "They need to work on their shot at home."</p>
          <p>But actually getting them to do it? That's the hard part.</p>
          <p>Hockey Shot Challenge is a free tool that makes it easier. Kids log their shots and stickhandling reps from home — the driveway, the basement, wherever they practice — and they compete with their teammates on a weekly leaderboard. When there's a scoreboard involved, kids actually want to show up.</p>
          <p>Here's how to get started.</p>

          <h2>Step 1: Go to hockeyshotchallenge.com</h2>
          <p>No app to download. It works right in your phone's browser. Bookmark it so your kid can find it easily.</p>

          <h2>Step 2: Sign in with your Google account</h2>
          <p>You use your Gmail to sign in — not your kid's. You're the account holder, and you can add all your kids under one login. No passwords for kids to remember.</p>

          <h2>Step 3: Set up your player's profile</h2>
          <p>Pick a username, enter your child's age group, and you're in. Takes about two minutes. The username shows up on leaderboards, so let your kid choose it.</p>

          <h2>Step 4: Find their team (if their coach is on here)</h2>
          <p>If their coach has already set up a team, search for it and join. Your kid will show up on the team leaderboard right away. Not sure if their coach is on it? Ask — or have your coach visit <button className="post-inline-link" onClick={() => nav('/coach')}>the coach page</button> to get set up for free.</p>

          <h2>Step 5: Log the first session</h2>
          <p>After your kid does some shots in the driveway, open the app and tap "Log shots." Pick the shot type (wrist, snap, slap, backhand), enter the number, and hit save. Done. Three seconds.</p>

          <div className="post-callout">
            <div className="post-callout-title">That's it.</div>
            <p>From now on, every time they practice, log it. Watch them climb the rankings.</p>
          </div>

          <h2>Tips that help</h2>
          <ul>
            <li><strong>Make it a habit right after practice.</strong> Log it while you're still outside. Takes 5 seconds.</li>
            <li><strong>Let them see the leaderboard.</strong> Kids care a lot more when they can see exactly where they rank.</li>
            <li><strong>Don't skip small sessions.</strong> Even 20 shots logged beats 0. Streaks are built on consistency, not big numbers.</li>
            <li><strong>Multiple kids?</strong> Add them all under your account. Switch between players from the menu.</li>
          </ul>

          <div className="post-cta-block">
            <p>Ready to get started? It's free and takes less than 5 minutes.</p>
            <button className="post-cta" onClick={() => nav('/start')}>Sign in with Google →</button>
            <p className="post-cta-hint">Also read: <button className="post-inline-link" onClick={() => nav('/blog/how-squad-battles-work')}>What happens every week on Hockey Shot Challenge →</button></p>
          </div>
        </div>
      </article>

      <footer className="post-footer">
        <button className="post-foot-link" onClick={() => nav('/blog')}>← All guides</button>
        <button className="post-foot-link" onClick={() => nav('/')}>Home</button>
      </footer>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.post-wrap {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
}
body:has(.post-wrap) { background: var(--bg) !important; }

.post-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 20px; max-width: 720px; margin: 0 auto;
}
.post-back { color: #8899b4; font-size: 15px; background: transparent; }
.post-back:hover { color: white; }
.post-nav-cta {
  background: var(--accent); color: white;
  padding: 10px 18px; border-radius: 10px;
  font-family: var(--font-display); font-size: 14px; font-weight: 700;
}

.post-article {
  max-width: 680px; margin: 0 auto; padding: 0 20px 60px;
}
.post-header { text-align: center; padding: 32px 0 40px; }
.post-eyebrow {
  font-size: 12px; font-weight: 700; letter-spacing: 2px;
  color: #60a5fa; margin-bottom: 16px;
}
.post-title {
  font-family: var(--font-display);
  font-size: clamp(26px, 5vw, 40px);
  font-weight: 800; color: white;
  line-height: 1.1; letter-spacing: -0.3px;
  margin-bottom: 10px;
}
.post-subtitle {
  font-size: 18px; color: #8899b4; margin-bottom: 10px;
}
.post-date { font-size: 13px; color: #4a6080; }

.post-body p {
  font-size: 17px; line-height: 1.7; color: #c8d8f0;
  margin-bottom: 20px;
}
.post-body h2 {
  font-family: var(--font-display);
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 800; color: white;
  margin: 36px 0 14px; letter-spacing: 0.1px;
}
.post-body ul {
  margin: 0 0 24px 0; padding-left: 20px;
}
.post-body li {
  font-size: 17px; line-height: 1.7; color: #c8d8f0;
  margin-bottom: 10px;
}
.post-body strong { color: white; font-weight: 600; }

.post-callout {
  background: #0f1624;
  border: 1px solid #1e3a6a;
  border-left: 3px solid var(--accent);
  border-radius: 12px;
  padding: 20px 22px;
  margin: 28px 0;
}
.post-callout-title {
  font-family: var(--font-display);
  font-size: 18px; font-weight: 800; color: white;
  margin-bottom: 8px;
}
.post-callout p { margin: 0; }

.post-inline-link {
  background: transparent; color: var(--accent);
  font-size: inherit; font-family: inherit;
  text-decoration: underline; text-underline-offset: 3px;
  cursor: pointer; padding: 0;
}
.post-inline-link:hover { color: white; }

.post-cta-block {
  background: #0a1220;
  border: 1px solid #1a2847;
  border-radius: 16px;
  padding: 28px 24px;
  text-align: center;
  margin-top: 40px;
}
.post-cta-block p { color: #a8b8d0; margin-bottom: 16px; }
.post-cta {
  display: inline-block;
  background: var(--accent); color: white;
  padding: 16px 28px; border-radius: 12px;
  font-family: var(--font-display);
  font-size: 17px; font-weight: 700;
  margin-bottom: 16px;
  transition: transform 0.1s;
}
.post-cta:active { transform: scale(0.98); }
.post-cta-hint { font-size: 14px; color: #6b7fa8; margin: 0; }

.post-footer {
  border-top: 1px solid #1a2035;
  padding: 24px 20px;
  max-width: 680px; margin: 0 auto;
  display: flex; justify-content: space-between;
}
.post-foot-link { color: #4a6080; font-size: 14px; background: transparent; }
.post-foot-link:hover { color: white; }
`
