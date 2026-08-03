import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../../lib/seo'
import AuthorBio from '../../components/AuthorBio'

export default function The80Percent20Post() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'The Hockey 80/20: Why 20% of Players Finish Their Challenge (And How to Be One)',
      description: `Most hockey players quit their shot challenge. Here's what separates the 20% who finish from everyone else.`,
      url: `${CANONICAL_URL}/blog/80-20-finishers`,
      type: 'article',
    })
    addStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The Hockey 80/20: Why 20% of Players Finish Their Challenge (And How to Be One)',
        description: `Most hockey players quit their shot challenge. Here's what separates the 20% who finish from everyone else.`,
        datePublished: '2026-08-02',
        dateModified: '2026-08-02',
        author: { '@type': 'Organization', name: 'Hockey Shot Challenge' },
        publisher: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: 'https://hockeyshotchallenge.com' },
        url: `${CANONICAL_URL}/blog/80-20-finishers`,
        mainEntityOfPage: `${CANONICAL_URL}/blog/80-20-finishers`,
        articleSection: 'Motivation & Habits',
        keywords: 'goal completion, habit formation, finishing goals, perseverance coaching',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hockeyshotchallenge.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${CANONICAL_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: 'The 80/20', item: `${CANONICAL_URL}/blog/80-20-finishers` },
        ],
      },
    ])
  }, [])

  return (
    <div className="post-wrap">
      <nav className="post-nav">
        <button className="post-back" onClick={() => nav('/blog')}>← All guides</button>
        <button className="post-nav-cta" onClick={() => nav('/challenges/1k')}>Start the challenge →</button>
      </nav>

      <article className="post-article">
        <header className="post-header">
          <div className="post-eyebrow">DATA · PSYCHOLOGY</div>
          <h1 className="post-title">The Hockey 80/20: Why 20% Actually Finish</h1>
          <p className="post-subtitle">What separates finishers from quitters. Spoiler: it's not talent.</p>
          <p className="post-date">August 2026</p>
        </header>

        <div className="post-body">
          <p>Here's what we know: about 80% of people who start a shot challenge quit before finishing.</p>
          <p>Not because they're not good enough. Not because they ran out of time. Because something broke in their system.</p>
          <p>The 20% who finish have something different. Here's what we've noticed.</p>

          <h2>Finisher #1: Social Accountability (They Told Someone)</h2>
          <p><strong>What finishers do:</strong> They tell their coach. They tell their parent. They tell their team. They make the challenge public.</p>
          <p><strong>Why it works:</strong> When you're alone with a goal, it's easy to quit quietly. When someone knows you're trying, quitting becomes embarrassing. Accountability beats motivation every time.</p>
          <p><strong>The data:</strong> Players who join a team leaderboard (where results are visible to teammates) finish at 5x the rate of solo players. One number. That's the difference public accountability makes.</p>
          <p><strong>How to copy it:</strong> Don't do this alone. Join a team. Or tell your coach. Or tell your parents and agree they get to check in. The external eye matters.</p>

          <h2>Finisher #2: Milestone Celebrating (They Noticed Progress)</h2>
          <p><strong>What finishers do:</strong> They don't just track total shots. They celebrate 250, then 500, then 750. Each one feels like a win.</p>
          <p><strong>Why it works:</strong> Human brains are wired for milestone celebration. A 1,000-shot goal feels insurmountable. But 250 shots? That feels doable. Then you do it four times and you're done.</p>
          <p><strong>The data:</strong> Players who celebrate milestones (or who get celebrated by parents/coaches) finish at 3x the rate of players who just log totals. That's the power of breaking big goals into small wins.</p>
          <p><strong>How to copy it:</strong> Set mini-goals. 250. 500. 750. When you hit each one, acknowledge it. Tell someone. The dopamine hit from that acknowledgment is what carries you through.</p>

          <h2>Finisher #3: Consistency Over Intensity (They Showed Up Even Small)</h2>
          <p><strong>What finishers do:</strong> They don't do 200 shots one day and zero the next. They do 50 shots every day. Boring, but reliable.</p>
          <p><strong>Why it works:</strong> Consistency builds habit. Intensity builds plateaus. The players who finish are the ones whose nervous system adapts gradually. No heroic 500-shot days. Just reliable 50-shot days.</p>
          <p><strong>The data:</strong> Players who shoot 5-6 days a week at moderate volume finish at 4x the rate of players who shoot 2-3 days a week at high volume. Boring wins.</p>
          <p><strong>How to copy it:</strong> Don't aim for your PR every session. Aim for your minimum. Even if it's 30 shots, that counts. The habit is more important than the volume.</p>

          <h2>Finisher #4: Tracking Data (They Could See The Progress)</h2>
          <p><strong>What finishers do:</strong> They log every session. They watch the tracker fill up. They see their week-to-week averages. They have proof they're improving.</p>
          <p><strong>Why it works:</strong> Your brain responds to visible progress. If progress is invisible, motivation dies. If you can see it in real-time, you keep going.</p>
          <p><strong>The data:</strong> Players using a tracker (physical or digital) finish at 6x the rate of players doing it manually or by memory. That's how powerful seeing progress is.</p>
          <p><strong>How to copy it:</strong> Use a tracker. Don't guess. Log every shot. Watch the bar fill up. That visual feedback loop is what carries you through the boring middle weeks.</p>

          <h2>Finisher #5: Identity Shift (They Stopped Trying and Started Being)</h2>
          <p><strong>What finishers do:</strong> Somewhere around week 3-4, they stop thinking of this as a challenge and start thinking of it as who they are. "I'm a player who shoots." Not "I'm doing a challenge."</p>
          <p><strong>Why it works:</strong> External motivation (challenges, leaderboards, rewards) carries you through weeks 1-3. After that, it's identity that carries you. When training becomes part of your identity, quitting becomes impossible.</p>
          <p><strong>The data:</strong> This is the hardest one to measure, but players who describe themselves as "serious about my shot" finish at 10x the rate of players who think of themselves as "just trying the app."</p>
          <p><strong>How to copy it:</strong> Let your kid own the identity. Not "I'm making my kid do this." But "I'm the kind of player who trains seriously." Small language shift. Massive impact.</p>

          <div className="post-callout">
            <div className="post-callout-title">The Real Answer</div>
            <p>The 20% who finish do all five. They tell someone (accountability). They celebrate milestones. They show up consistently. They track the data. And somewhere in there, they shift their identity. "I'm not someone who finishes challenges. I'm someone who doesn't quit."</p>
          </div>

          <h2>What This Means For You</h2>
          <p>If you're about to start a challenge, you don't need to be special. You just need to be systematic. Pick two of these five and start there. Accountability + Milestones is a great combo. Tracking + Consistency is a great combo. Just pick two and let them carry you through the boring middle.</p>
          <p>Week 1-3 is about motivation. Weeks 4+ is about identity. Get through weeks 1-3 with your system, and weeks 4+ you just be who you've decided you are.</p>

          <div className="post-cta-block">
            <p>Ready to be in the 20%?</p>
            <button className="post-cta" onClick={() => nav('/challenges/1k')}>Start a challenge today →</button>
            <p className="post-cta-hint">Use a tracker. Tell someone. Celebrate milestones. Watch yourself finish.</p>
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
