import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../../lib/seo'

export default function SquadBattlesPost() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'How Hockey Squad Battles Work — Weekly Competitions for Kids',
      description: 'Squad battles, daily logging, ranks, streaks, and what coaches can see. Here\'s exactly how a full week looks on Hockey Shot Challenge.',
      url: `${CANONICAL_URL}/blog/how-squad-battles-work`,
      type: 'article',
    })
    addStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How Hockey Squad Battles Work — Weekly Competitions for Kids',
        description: 'Squad battles, daily logging, ranks, streaks, and what coaches can see on Hockey Shot Challenge.',
        datePublished: '2026-07-01',
        dateModified: '2026-07-01',
        author: { '@type': 'Organization', name: 'Hockey Shot Challenge' },
        publisher: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: 'https://hockeyshotchallenge.com' },
        url: `${CANONICAL_URL}/blog/how-squad-battles-work`,
        mainEntityOfPage: `${CANONICAL_URL}/blog/how-squad-battles-work`,
        articleSection: 'How It Works',
        keywords: 'hockey squad battles, hockey team competition kids, off-ice hockey leaderboard, hockey shot tracker weekly',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hockeyshotchallenge.com' },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${CANONICAL_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: 'How Squad Battles Work', item: `${CANONICAL_URL}/blog/how-squad-battles-work` },
        ],
      },
    ])
  }, [])

  return (
    <div className="post-wrap">
      <nav className="post-nav">
        <button className="post-back" onClick={() => nav('/blog')}>← All guides</button>
        <button className="post-nav-cta" onClick={() => nav('/start')}>Start free →</button>
      </nav>

      <article className="post-article">
        <header className="post-header">
          <div className="post-eyebrow">HOW IT WORKS · SQUAD BATTLES</div>
          <h1 className="post-title">What Happens Every Week on Hockey Shot Challenge</h1>
          <p className="post-date">July 2026</p>
        </header>

        <div className="post-body">
          <p>Once your kid is set up, the app runs on a weekly rhythm. Here's exactly what a week looks like — from Monday to Sunday.</p>

          <h2>Monday: A new squad battle starts</h2>
          <p>Every Monday, your child gets placed with three teammates into a group called a squad. That squad gets matched against a rival squad from another team. The goal: log more total shots than the other squad by Sunday.</p>
          <p>Kids can see exactly where they stand — who logged today, who's ahead, who needs to catch up. It creates real pressure in the best way. When your kid sees a teammate hasn't logged yet, they want to carry the team. When they're behind, they want to go outside and shoot.</p>

          <h2>Every day: Log reps in 5 seconds</h2>
          <p>After a practice session at home, open the app and log what they did. Shots, stickhandling, or both. Tap a shot type, enter the number, hit save. The number goes up, the leaderboard updates, and their squad can see the contribution.</p>
          <p>It doesn't have to be a long session. Even 20 shots logged is better than nothing — and keeps the streak alive.</p>

          <h2>Sunday: The battle ends</h2>
          <p>Whichever squad logged more shots wins. Then Monday it resets and a new battle starts with a new rival. Every week is a fresh start.</p>

          <div className="post-callout">
            <div className="post-callout-title">Why this works</div>
            <p>Kids don't practice because you tell them to. They practice because their name is on a scoreboard and their teammates are counting on them. That's the whole idea.</p>
          </div>

          <h2>Ranks and streaks</h2>
          <p>As your kid logs more sessions, they earn ranks — starting at Rookie and working up through Prospect, Regional, Provincial, and beyond. Each rank has a shot requirement and a name your kid can show off.</p>
          <p>There's also a streak counter that tracks how many days in a row they've logged. Kids get surprisingly attached to keeping the streak alive. Missing a day feels real when it's visible.</p>

          <h2>What coaches can see</h2>
          <p>If your child's coach is on the platform, they can see the whole team's weekly activity — who logged, how many shots, who's been consistent all month. It's a great conversation starter before practice and it lets coaches recognize the players who are quietly putting in work at home.</p>
          <p>Coaches can also set weekly shot goals for the team, run team-vs-team challenges, and see stickhandling stats. All without any extra work on your part — just keep logging.</p>

          <h2>What you track</h2>
          <p><strong>Shots</strong> — wrist shots, snap shots, slap shots, backhands. Goalies can track saves. Tap a type, tap a number, done.</p>
          <p><strong>Stickhandling</strong> — log reps or minutes. Great for basement practice when shooting isn't an option.</p>

          <div className="post-cta-block">
            <p>Not signed up yet? It's free and takes less than 5 minutes.</p>
            <button className="post-cta" onClick={() => nav('/player')}>Get started — it's free →</button>
            <p className="post-cta-hint">Also read: <button className="post-inline-link" onClick={() => nav('/blog/getting-started')}>How to get your kid set up →</button></p>
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
