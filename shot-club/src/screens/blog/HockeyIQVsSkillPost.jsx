import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../../lib/seo'
import { usePostHog } from '../../hooks/usePostHog'
import AuthorBio from '../../components/AuthorBio'

export default function HockeyIQVsSkillPost() {
  const nav = useNavigate()
  const { trackBlogViewed } = usePostHog()

  useEffect(() => {
    trackBlogViewed('hockey-iq-vs-skill', 'Hockey IQ vs. Skill: Why Training Matters More Than Talent')
    setSEO({
      title: 'Hockey IQ vs Skill: 6 Ways Off-Ice Training Builds Both',
      description: `Off-ice training does more than build strength. Here are 6 ways it builds hockey IQ, decision-making, and game sense alongside skill.`,
      url: `${CANONICAL_URL}/blog/hockey-iq-vs-skill`,
      type: 'article',
    })
    addStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Hockey IQ vs Skill: 6 Ways Off-Ice Training Builds Both',
        description: `Off-ice training does more than build strength. Here are 6 ways it builds hockey IQ, decision-making, and game sense alongside skill.`,
        datePublished: '2026-08-02',
        dateModified: '2026-08-02',
        author: { '@type': 'Organization', name: 'Hockey Shot Challenge' },
        publisher: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: 'https://hockeyshotchallenge.com' },
        url: `${CANONICAL_URL}/blog/hockey-iq-vs-skill`,
        mainEntityOfPage: `${CANONICAL_URL}/blog/hockey-iq-vs-skill`,
        articleSection: 'Training Philosophy',
        keywords: 'hockey IQ, sports intelligence, decision making hockey, skill development',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hockeyshotchallenge.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${CANONICAL_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: 'Hockey IQ vs Skill', item: `${CANONICAL_URL}/blog/hockey-iq-vs-skill` },
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
          <div className="post-eyebrow">TRAINING · SKILL VS IQ</div>
          <h1 className="post-title">Hockey IQ vs Skill: How Off-Ice Training Builds Both</h1>
          <p className="post-subtitle">It's not just shooting. It's learning to think like a hockey player.</p>
          <p className="post-date">August 2026</p>
        </header>

        <div className="post-body">
          <p>Here's what everyone gets wrong about off-ice hockey training: they think it's about strength and speed.</p>
          <p>It's not. It's about training your brain to make faster decisions under pressure.</p>
          <p>The best off-ice training builds both skill AND hockey IQ. Here's how.</p>

          <h2>1. Shot Variety Teaches Decision-Making</h2>
          <p><strong>The skill:</strong> You can shoot wrist, snap, slap, and backhand.</p>
          <p><strong>The IQ:</strong> You learn which shot works when. Defender closing in? Snap shot. Time to settle? Wrist shot. This isn't coached. Your brain figures it out through rep.</p>
          <p><strong>Why it matters:</strong> In games, you don't have time to think "which shot should I use?" Your nervous system has already decided. Training all four types means your brain has four options ready.</p>

          <h2>2. Tired Shooting Teaches Pressure Decision-Making</h2>
          <p><strong>The skill:</strong> Your shot works when you're fatigued.</p>
          <p><strong>The IQ:</strong> You learn that panic is optional. When tired, poor players fall apart. Good players execute the same shot they practiced. Your brain learns: "fatigue doesn't matter."</p>
          <p><strong>Why it matters:</strong> Third period, down by one, you're dead tired. The player whose brain says "I can still shoot clean" wins. That's learned, not born.</p>

          <h2>3. Off-Angle Shots Teach Adaptability</h2>
          <p><strong>The skill:</strong> You can shoot from anywhere, not just the slot.</p>
          <p><strong>The IQ:</strong> Your brain realizes that "perfect angle" is a myth. Good opportunities are rare. You learn to take what you get. This is huge in games.</p>
          <p><strong>Why it matters:</strong> Real hockey doesn't give you perfect setup time. Training off-angle teaches your brain to recognize a half-decent chance and take it before the moment dies.</p>

          <h2>4. One-Timers Teach Reaction Speed</h2>
          <p><strong>The skill:</strong> You can one-time a pass without setup.</p>
          <p><strong>The IQ:</strong> Your nervous system learns to process a pass and shoot faster than your conscious brain can even register it. You're not thinking. You're reacting.</p>
          <p><strong>Why it matters:</strong> The speed of your decision-making becomes the speed of your play. One-timers are where games are won.</p>

          <h2>5. Mixing Drills Teaches Pattern Recognition</h2>
          <p><strong>The skill:</strong> You can do wall shots, stickhandling gates, and off-balance shots in one session.</p>
          <p><strong>The IQ:</strong> Your brain learns that success requires flexibility. One drill builds accuracy, one builds speed, one builds adaptability. You learn to layer skills.</p>
          <p><strong>Why it matters:</strong> Great players don't have one weapon. They have five. Training variety teaches your brain that mastery is about stacking skills, not perfecting one.</p>

          <h2>6. Consistency Over Intensity Teaches Strategic Thinking</h2>
          <p><strong>The skill:</strong> You can show up every day and execute the same shot.</p>
          <p><strong>The IQ:</strong> You learn that hockey seasons are marathons, not sprints. You learn that showing up matters more than explosive effort. You learn that discipline beats intensity.</p>
          <p><strong>Why it matters:</strong> This is the biggest one. Kids who train consistently think strategically. Kids who train when they feel like it are impulsive. That difference shows up in every game.</p>

          <div className="post-callout">
            <div className="post-callout-title">The Real Answer</div>
            <p>Off-ice training builds skill through repetition and IQ through exposure to variety and pressure. The best training does both at the same time. You're not just getting better at shooting. You're learning how to think like a hockey player.</p>
          </div>

          <h2>The Takeaway</h2>
          <p>Coaches can teach technique. But they can't teach decision-making and pressure response. That only comes through real, consistent training. The more shots you take, the more situations you see, the faster your brain learns to respond. That's the invisible skill that separates elite players from everyone else.</p>

          <h2>Related Reading</h2>
          <p style={{ fontSize: 15, color: 'var(--text-soft)', marginBottom: 20 }}>
            <button className="post-inline-link" onClick={() => nav('/blog/7-off-ice-drills')}>The 7 drills that build both →</button>
            {' '} Each drill trains a specific mental skill alongside physical skill.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-soft)', marginBottom: 20 }}>
            <button className="post-inline-link" onClick={() => nav('/blog/5-week-progression')}>Watch the transformation unfold →</button>
            {' '} See how hockey IQ develops week by week as you train.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-soft)' }}>
            <button className="post-inline-link" onClick={() => nav('/blog/80-20-finishers')}>The habits that create elite players →</button>
            {' '} Building IQ takes consistency. Here\'s how finishers stay committed.
          </p>

          <div className="post-cta-block">
            <p>Want to build both skill and hockey IQ?</p>
            <button className="post-cta" onClick={() => nav('/challenges/1k')}>Start a shot challenge today →</button>
            <p className="post-cta-hint">Variety, volume, and pressure. All three build elite players.</p>
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
