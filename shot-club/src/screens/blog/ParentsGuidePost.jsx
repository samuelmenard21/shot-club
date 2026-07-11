import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../../lib/seo'

export default function ParentsGuidePost() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'Parent\'s Guide to Youth Hockey Training: What Coaches Actually Look For',
      description: 'What skills do hockey coaches evaluate? How to help your kid stand out. Focus on the fundamentals that matter.',
      url: `${CANONICAL_URL}/blog/parents-guide-youth-hockey`,
      type: 'article',
    })
    addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Parent\'s Guide to Youth Hockey Training: What Coaches Actually Look For',
      description: 'What skills separate good hockey players from great ones. A parent\'s guide to helping your kid improve.',
      datePublished: '2026-08-01',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Hockey Shot Challenge' },
      publisher: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: 'https://hockeyshotchallenge.com' },
      keywords: 'youth hockey training, hockey development, how to get better at hockey, hockey parent guide, hockey skills',
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
          <div className="post-eyebrow">COACHING INSIGHTS · FOR PARENTS</div>
          <h1 className="post-title">Parent's Guide to Youth Hockey Training</h1>
          <p className="post-subtitle">What Coaches Actually Look For</p>
          <p className="post-date">August 2026</p>
        </header>

        <div className="post-body">
          <p>If you're a hockey parent, you've probably asked yourself: "What should my kid be working on?"</p>
          <p>Sometimes the answer your kid's coach gives you is vague. "Work on your game." Helpful, right?</p>
          <p>Here's what we've learned from talking to coaches across age groups: There are specific skills that separate players who improve fast from those who plateau. And most of them have nothing to do with raw talent.</p>

          <h2>The Top Skills Coaches Look For</h2>

          <h3>1. Shot Accuracy (Not Power)</h3>
          <p>Here's what coaches actually watch for: Can your player find the top corner from the slot?</p>
          <p>Not how hard they can shoot. Lots of kids can wind up and rip it. But kids who can snap a quick shot into the top shelf? That's a skill that changes game outcomes.</p>
          <p><strong>What to work on:</strong> Shooting accuracy drills. Pick a specific target — top right corner, top left corner, low blocker side — and practice hitting it 20 times per session.</p>
          <p><strong>Why it matters:</strong> A player who scores from unexpected spots gets more ice time. It's that simple.</p>

          <h3>2. Stickhandling Under Pressure</h3>
          <p>Every player can stickhandle in open space. The ones who stand out can keep control when a defenseman is closing on them.</p>
          <p>Tight hands in tight spaces. That's the difference between a good player and a player who gets drafted.</p>
          <p><strong>What to work on:</strong> Stickhandling drills where they're rushed. Cone weaves at game speed. Passing and receiving while moving.</p>
          <p><strong>Why it matters:</strong> Hockey is a contact sport. Players who can create space with their stick — not just their skates — control the puck.</p>

          <h3>3. Hockey IQ (Reading the Play)</h3>
          <p>This is the skill parents can't easily coach. But you can help.</p>
          <p>Watch games with your kid. Ask: "Why did that player pass instead of shoot?" "Where was the open ice?" "How did the defenseman predict that pass?"</p>
          <p>Kids who understand why things happen on ice make better decisions when it's their turn to make them.</p>
          <p><strong>What to work on:</strong> Watching full games (not just highlight reels). Playing different positions in practice. Playing shinny/pond hockey where they make all decisions.</p>
          <p><strong>Why it matters:</strong> A player with low talent but high IQ outperforms a player with high talent and low IQ. Every time.</p>

          <h3>4. Work Ethic & Consistency</h3>
          <p>Here's what coaches tell us: "I can teach skills. I can't teach want."</p>
          <p>The player who shows up to practice first and leaves last. Who asks for extra reps. Who logs their drills instead of making excuses. That's the player who improves.</p>
          <p><strong>What to work on:</strong> Showing up. Being on time (actually, being 10 minutes early). Paying attention. Asking questions. Tracking practice sessions so they see the compounding effect over weeks and months.</p>
          <p><strong>Why it matters:</strong> Talent gets you noticed at age 12. Work ethic gets you drafted at 16. By age 20, everyone who made it is talented. The only difference is who outworked everyone else.</p>

          <h3>5. Skating (Edges, Transitions, Speed)</h3>
          <p>Bad skaters can't apply their skills under game pressure.</p>
          <p>Good skaters can explode to the net, transition fast, and stop on a dime. These aren't born abilities. They're practiced.</p>
          <p><strong>What to work on:</strong> Skating camps. Power skating. Agility drills. Transitions (forward to backward, crossovers, quick stops).</p>
          <p><strong>Why it matters:</strong> A less talented player who skates better than their peers will out-produce them. Speed is the great equalizer.</p>

          <h2>The Skills That DON'T Matter As Much As Parents Think</h2>

          <h3>Shooting Power</h3>
          <p>Parents get obsessed with wrist shot velocity. Coaches care about accuracy and release time.</p>
          <p>A quick, accurate snap shot beats a slow, hard slapshot. Every time.</p>

          <h3>Individual Highlight Plays</h3>
          <p>Your kid did a spinorama goal? Cool. But can they pass to an open teammate? Can they backceck? Can they win a board battle?</p>
          <p>Coaches notice hustle plays more than highlight plays.</p>

          <h3>Being "The Star"</h3>
          <p>Players who only score, never pass, don't go far. Players who make their teammates better go to the next level.</p>
          <p>Teach your kid that making a play is as valuable as scoring.</p>

          <h2>How to Actually Help Your Kid Improve</h2>

          <p><strong>1. Help them track what they're working on.</strong> Not just "we went to practice." What specifically did they drill? How many reps?</p>
          <p><strong>2. Ask about mistakes, not just goals.</strong> "What was hard today?" Not "Did you score?"</p>
          <p><strong>3. Be the person who believes in them.</strong> Coaches will critique them (that's their job). You be the one who says "I see you improving."</p>
          <p><strong>4. Let them struggle.</strong> If you fix everything, they never learn resilience. Let them have bad games. Let them work through it.</p>
          <p><strong>5. Celebrate consistent effort, not just results.</strong> "You showed up and worked hard" beats "You scored." Both matter, but effort compounds over years.</p>

          <h2>The Honest Truth</h2>
          <p>Most kids won't make the NHL. That's not defeatism — it's math. But almost every kid who works can improve dramatically from where they start.</p>
          <p>Your job as a parent isn't to make them a pro. It's to help them become the best version of themselves. And to show them that work compounds.</p>
          <p>Do that, and they'll succeed at hockey. And life.</p>
        </div>

        <div className="post-footer">
          <button className="post-foot-link" onClick={() => nav('/blog')}>← All guides</button>
          <button className="post-foot-cta" onClick={() => nav('/start')}>Help your kid track progress →</button>
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
.post-body h3 { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: #a8b8d0; margin: 20px 0 12px; }
.post-body strong { font-weight: 600; color: white; }
.post-footer { border-top: 1px solid #1a2035; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 40px; }
.post-foot-link { color: #4a6080; font-size: 14px; background: transparent; cursor: pointer; }
.post-foot-link:hover { color: white; }
.post-foot-cta { background: var(--accent); color: white; padding: 12px 20px; border-radius: 10px; font-family: var(--font-display); font-size: 15px; font-weight: 700; cursor: pointer; }
`
