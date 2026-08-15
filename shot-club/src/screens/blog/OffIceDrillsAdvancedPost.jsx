import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../../lib/seo'
import { usePostHog } from '../../hooks/usePostHog'
import SEOFooter from '../../components/SEOFooter'
import AuthorBio from '../../components/AuthorBio'

export default function OffIceDrillsAdvancedPost() {
  const nav = useNavigate()
  const { trackBlogViewed, trackBlogLinkClicked } = usePostHog()

  useEffect(() => {
    trackBlogViewed('7-off-ice-drills', '7 Off-Ice Drills That Actually Improve Shot Accuracy')
    setSEO({
      title: '7 Off-Ice Drills That Actually Improve Shot Accuracy (Tested by Coaches)',
      description: `7 proven off-ice hockey drills coaches recommend. Step-by-step instructions for each. Build accuracy, consistency, and muscle memory at home.`,
      url: `${CANONICAL_URL}/blog/7-off-ice-drills`,
      type: 'article',
    })
    addStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: '7 Off-Ice Drills That Actually Improve Shot Accuracy (Tested by Coaches)',
        description: `7 proven off-ice hockey drills coaches recommend. Step-by-step instructions for each. Build accuracy, consistency, and muscle memory at home.`,
        datePublished: '2026-08-02',
        dateModified: '2026-08-02',
        author: { '@type': 'Organization', name: 'Hockey Shot Challenge' },
        publisher: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: 'https://hockeyshotchallenge.com' },
        url: `${CANONICAL_URL}/blog/7-off-ice-drills`,
        mainEntityOfPage: `${CANONICAL_URL}/blog/7-off-ice-drills`,
        articleSection: 'Training Drills',
        keywords: 'off-ice hockey drills, hockey training at home, shot accuracy drills, hockey conditioning',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hockeyshotchallenge.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${CANONICAL_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: '7 Off-Ice Drills', item: `${CANONICAL_URL}/blog/7-off-ice-drills` },
        ],
      },
    ])
  }, [])

  return (
    <div className="post-wrap">
      <nav className="post-nav">
        <button className="post-back" onClick={() => nav('/blog')}>← All guides</button>
        <button className="post-nav-cta" onClick={() => nav('/challenges/1k')}>Start tracking →</button>
      </nav>

      <article className="post-article">
        <header className="post-header">
          <div className="post-eyebrow">TRAINING · OFF-ICE DRILLS</div>
          <h1 className="post-title">7 Off-Ice Drills That Actually Improve Shot Accuracy</h1>
          <p className="post-subtitle">Tested by coaches. No ice required. Takes 30 minutes.</p>
          <p className="post-date">August 2026</p>
        </header>

        <div className="post-body">
          <p>Here's the thing about off-ice training: most of it is garbage. Kids do random exercises with no idea what they're actually building. Then they get on the ice and none of it carries over.</p>
          <p>The drills that work are the ones that build specific muscle patterns your body needs for hockey. Not generic fitness. Actual shot mechanics.</p>
          <p>These 7 drills are the ones coaches recommend. All can be done in a driveway or basement. All build something real.</p>

          <h2>1. Wall Shots (Accuracy + Release Speed)</h2>
          <p><strong>What it targets:</strong> Teaches clean release without thinking about accuracy. Your body learns the exact angle your stick needs at the moment of release.</p>
          <p><strong>How to do it:</strong></p>
          <ul>
            <li>Stand 10 feet from a wall (or garage). Mark a 2-foot square target at chest height with tape or chalk.</li>
            <li>Shoot at the target as fast as you can. 50 shots. Time matters — you're training speed, not perfection.</li>
            <li>Move 5 feet farther away. Do it again.</li>
          </ul>
          <p><strong>What happens:</strong> After 150 wall shots, your release is grooved. The target teaches your brain where the puck goes. On ice, you stop thinking about the shot and just execute.</p>

          <h2>2. Stickhandling Gates (Puck Control + Quick Hands)</h2>
          <p><strong>What it targets:</strong> Game-speed puck handling. Not slow weaving. Fast hands under pressure.</p>
          <p><strong>How to do it:</strong></p>
          <ul>
            <li>Set up 5 cones in a line, 2 feet apart. Start with the puck at the first cone.</li>
            <li>Weave through all 5 cones as fast as possible. Touch each cone, turn around, come back.</li>
            <li>Do 10 reps. Rest 30 seconds. Repeat 3 more sets.</li>
          </ul>
          <p><strong>What happens:</strong> Your hands learn to react fast without your brain slowing you down. This is the difference between "can stickhandle" and "stickhandles under pressure."</p>

          <h2>3. One-Timers From the Slot (Game-Speed Reaction)</h2>
          <p><strong>What it targets:</strong> The shot that actually matters. One-timers win hockey games.</p>
          <p><strong>How to do it:</strong></p>
          <ul>
            <li>Have a partner (or wall) pass you the puck from the side. You take a one-timer at a target 20 feet away.</li>
            <li>If solo: set a puck on the ground, skate up and one-time it into a wall target.</li>
            <li>Do 50 reps. Focus on footwork, not accuracy. The accuracy comes if footwork is right.</li>
          </ul>
          <p><strong>What happens:</strong> Game situations demand one-timers. 50 reps trains your legs to set up, your core to rotate, and your stick to catch the puck clean. That's three systems syncing.</p>

          <h2>4. Backhand Shots (Weak-Side Strength)</h2>
          <p><strong>What it targets:</strong> The shot everybody avoids. That's why it works.</p>
          <p><strong>How to do it:</strong></p>
          <ul>
            <li>Shoot 50 backhand shots at a target, same distance as your forehand (usually 15 feet).</li>
            <li>Don't worry if they're ugly. Just do the reps. Your brain learns the feel.</li>
            <li>Do this 3 times a week. Backhand takes longer to build, but it pays off.</li>
          </ul>
          <p><strong>What happens:</strong> Backhands are usually soft because kids never practice them. 50 backhand shots a week for a month and you have an actual weapon. Defenders don't expect it.</p>

          <h2>5. Catch-and-Release Volleys (Game Instinct)</h2>
          <p><strong>What it targets:</strong> Teaching your body to shoot when a pass comes in tight. No time to think.</p>
          <p><strong>How to do it:</strong></p>
          <ul>
            <li>Bounce a ball off a wall or have a partner toss one to you in the scoring area.</li>
            <li>Catch it on your stick and release in one motion. No setup.</li>
            <li>Do 30 reps. Then increase speed.</li>
          </ul>
          <p><strong>What happens:</strong> In games, passes come in and you have 0.5 seconds. This drill trains that exact moment. Your body learns to shoot without permission from your brain.</p>

          <h2>6. Off-Balance Shots (Real Game Angles)</h2>
          <p><strong>What it targets:</strong> Hockey doesn't give you perfect stance. This trains you anyway.</p>
          <p><strong>How to do it:</strong></p>
          <ul>
            <li>Skate hard to one side, then shoot while still moving. No stop-and-set.</li>
            <li>Or: stand on one leg and shoot. It's awkward. That's the point.</li>
            <li>Do 40 reps. Accuracy doesn't matter. Muscle memory does.</li>
          </ul>
          <p><strong>What happens:</strong> Games are chaos. Your shot can't depend on perfect form. This drill trains your muscles to shoot clean from anywhere.</p>

          <h2>7. Shooting Ladder (Endurance + Consistency)</h2>
          <p><strong>What it targets:</strong> The hardest thing: shooting accurately when you're tired.</p>
          <p><strong>How to do it:</strong></p>
          <ul>
            <li>Shoot 20 shots. Rest 1 minute. Shoot 20 shots. Rest 1 minute. Keep going for 10 rounds.</li>
            <li>You just took 200 shots while tired. That's the real test.</li>
          </ul>
          <p><strong>What happens:</strong> Most kids practice fresh. Third period, you're tired and your shot falls apart. This trains the exact scenario that matters.</p>

          <div className="post-callout">
            <div className="post-callout-title">The Real Principle</div>
            <p>Off-ice drills work when they build muscle memory for something that actually happens in games. Wall shots, stickhandling gates, one-timers, backhands, catch-and-release, off-balance, and tired shooting. All of these show up on ice. That's why they work.</p>
          </div>

          <h2>How to Track It</h2>
          <p>The best part about drills? You can see progress immediately. Track how many shots you took this week. Do it again next week and beat that number. That's how you know it's working.</p>

          <h2>Related Reading</h2>
          <p style={{ fontSize: 15, color: 'var(--text-soft)', marginBottom: 20 }}>
            <button className="post-inline-link" onClick={() => { trackBlogLinkClicked('5-week-progression', 'related_reading'); nav('/blog/5-week-progression'); }}>How players progress week-by-week →</button>
            {' '} See what happens as you do these drills consistently.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-soft)' }}>
            <button className="post-inline-link" onClick={() => { trackBlogLinkClicked('hockey-iq-vs-skill', 'related_reading'); nav('/blog/hockey-iq-vs-skill'); }}>How drills build hockey IQ, not just skill →</button>
            {' '} It's not just about accuracy. It's about thinking faster.
          </p>

          <div className="post-cta-block">
            <p>Ready to start training seriously?</p>
            <button className="post-cta" onClick={() => nav('/challenges/1k')}>Start tracking your shots →</button>
            <p className="post-cta-hint">Log every drill and watch your consistency improve week to week.</p>
          </div>
        </div>
      </article>

      <AuthorBio />

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
.post-body em { color: #e8f0ff; }
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
