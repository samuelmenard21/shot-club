import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../../lib/seo'

export default function OffIceDrillsPost() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'Top 5 Off-Ice Hockey Drills Your Kid Can Practice at Home',
      description: 'Five off-ice hockey drills that build shooting accuracy, stickhandling, and strength. No ice required. Perfect for home practice.',
      url: `${CANONICAL_URL}/blog/off-ice-drills`,
      type: 'article',
    })
    addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Top 5 Off-Ice Hockey Drills Your Kid Can Practice at Home',
      description: 'Five off-ice hockey drills that build shooting accuracy, stickhandling, and strength. No ice required.',
      datePublished: '2026-08-01',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Hockey Shot Challenge' },
      publisher: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: 'https://hockeyshotchallenge.com' },
      keywords: 'hockey drills, off-ice hockey training, stickhandling drills, hockey practice at home, youth hockey training',
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
          <div className="post-eyebrow">HOCKEY DRILLS · FOR COACHES & PARENTS</div>
          <h1 className="post-title">Top 5 Off-Ice Hockey Drills Your Kid Can Practice at Home</h1>
          <p className="post-subtitle">No ice rink required. 30 minutes. Builds shooting, stickhandling, and strength.</p>
          <p className="post-date">August 2026</p>
        </header>

        <div className="post-body">
          <p>The difference between good hockey players and great ones isn't always made on the ice.</p>
          <p>It's made at home. On the driveway. In the basement. In the backyard. The kids who put in extra work away from team practice are the ones who stand out.</p>
          <p>If your player wants to level up their game, here are five off-ice drills that actually work. All of them take under 30 minutes, require minimal equipment, and target the skills coaches are looking for.</p>

          <h2>1. Wrist Shot Accuracy Ladder (10 minutes)</h2>
          <p><strong>What it builds:</strong> Shooting accuracy and consistency.</p>
          <p>Set up a target (bucket, small cone, or taped circle on the wall) at knee height, about 10 feet away. Have your player shoot 10 wrist shots from different distances — 5 feet, 10 feet, 15 feet. Count how many hit the target.</p>
          <p>The goal: Hit 8+ from each distance. Repeat 3 sets.</p>
          <p><strong>Why it matters:</strong> Coaches notice players who can find the top corner. Accuracy wins games.</p>

          <h2>2. Stickhandling Ladder Drill (8 minutes)</h2>
          <p><strong>What it builds:</strong> Hand-eye coordination and puck control.</p>
          <p>Lay out a ladder (or use tape to mark a ladder pattern on pavement). Stickhandle through the ladder forward, backward, and sideways. Do three passes through, increasing speed each time.</p>
          <p><strong>Why it matters:</strong> Players with tight stickhandling can escape pressure. It's a fundamental that never goes away.</p>

          <h2>3. One-Touch Passing Wall (7 minutes)</h2>
          <p><strong>What it builds:</strong> Passing accuracy and quick release.</p>
          <p>Stand 6 feet from a wall. Pass the puck or ball to the wall with one touch, receive it, pass it back. Do 20 consecutive passes without stopping. Rest. Repeat 3 times.</p>
          <p><strong>Why it matters:</strong> Good passes move the puck faster than skating it. Quick-passing teams score more.</p>

          <h2>4. Agility Cone Weave (5 minutes)</h2>
          <p><strong>What it builds:</strong> Lateral movement, footwork, and change of direction.</p>
          <p>Set up 5 cones in a line, 3 feet apart. Skate or sprint (with the stick) through the cones in a weave pattern. Do three passes as fast as possible.</p>
          <p><strong>Why it matters:</strong> Hockey is about making sharp cuts, not just going straight. This builds the agility scouts see.</p>

          <h2>5. Push-Up + Box Hop Circuit (5 minutes)</h2>
          <p><strong>What it builds:</strong> Upper body and leg strength.</p>
          <p>Do 10 push-ups, then 10 box jumps or step-ups, then 10 more push-ups. One round = 2 minutes. Do 2-3 rounds.</p>
          <p><strong>Why it matters:</strong> Stronger players take harder shots and crash the net harder. Strength is half the game.</p>

          <h2>Making It Stick: The Consistency Hack</h2>
          <p>Here's the thing: one session doesn't make a player. The difference is doing this 3-4 times per week, every week, for months.</p>
          <p>The best way to build that habit? Track it. Log your drills the same way you'd log game stats. When your player can see their practice reps add up over time, they'll want to keep going.</p>
          <p>That's exactly what Hockey Shot Challenge does — it gamifies practice so kids actually want to show up.</p>

          <h2>The Bottom Line</h2>
          <p>You don't need an ice rink to get better at hockey. You need 30 minutes, some space, and a willingness to grind. These five drills hit every skill that matters, and they work anywhere.</p>
          <p>Start with two drills this week. Add one more next week. By September, your player will feel a real difference.</p>
        </div>

        <div className="post-footer">
          <button className="post-foot-link" onClick={() => nav('/blog')}>← All guides</button>
          <button className="post-foot-cta" onClick={() => nav('/start')}>Start tracking drills →</button>
        </div>
      </article>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.post-wrap { min-height: 100dvh; background: var(--bg); color: var(--text); font-family: var(--font-body); overflow-x: hidden; }
body:has(.post-wrap) { background: var(--bg) !important; }
.post-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; max-width: 720px; margin: 0 auto; }
.post-back { color: #8899b4; font-size: 15px; background: transparent; cursor: pointer; }
.post-back:hover { color: white; }
.post-nav-cta { background: var(--accent); color: white; padding: 10px 18px; border-radius: 10px; font-family: var(--font-display); font-size: 14px; font-weight: 700; cursor: pointer; }
.post-article { max-width: 680px; margin: 0 auto; padding: 0 20px 60px; }
.post-header { padding: 40px 0 30px; }
.post-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #60a5fa; margin-bottom: 14px; }
.post-title { font-family: var(--font-display); font-size: clamp(28px, 6vw, 42px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 8px; letter-spacing: -0.3px; }
.post-subtitle { font-size: 18px; color: #a8b8d0; margin-bottom: 12px; }
.post-date { font-size: 13px; color: #4a6080; }
.post-body { font-size: 16px; line-height: 1.7; color: #d0dce8; }
.post-body p { margin-bottom: 18px; }
.post-body h2 { font-family: var(--font-display); font-size: 24px; font-weight: 700; color: white; margin: 28px 0 16px; }
.post-body strong { font-weight: 600; color: white; }
.post-footer { border-top: 1px solid #1a2035; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 40px; }
.post-foot-link { color: #4a6080; font-size: 14px; background: transparent; cursor: pointer; }
.post-foot-link:hover { color: white; }
.post-foot-cta { background: var(--accent); color: white; padding: 12px 20px; border-radius: 10px; font-family: var(--font-display); font-size: 15px; font-weight: 700; cursor: pointer; }
`
