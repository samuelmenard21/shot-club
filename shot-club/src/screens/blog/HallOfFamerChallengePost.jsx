import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../../lib/seo'
import AuthorBio from '../../components/AuthorBio'

export default function HallOfFamerChallengePost() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'The Hall of Famer Challenge (10,000 Shots): Why Elite Athletes Never Stop Training',
      description: `At 10,000 shots, mastery begins. Players become mentors. Habits become identity. Here's what happens when someone actually commits to elite-level training.`,
      url: `${CANONICAL_URL}/blog/hall-of-famer-challenge`,
      type: 'article',
    })
    addStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The Hall of Famer Challenge (10,000 Shots): Why Elite Athletes Never Stop Training',
        description: `At 10,000 shots, mastery begins. Players become mentors. Habits become identity. Here's what happens when someone actually commits to elite-level training.`,
        datePublished: '2026-08-02',
        dateModified: '2026-08-02',
        author: { '@type': 'Organization', name: 'Hockey Shot Challenge' },
        publisher: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: 'https://hockeyshotchallenge.com' },
        url: `${CANONICAL_URL}/blog/hall-of-famer-challenge`,
        mainEntityOfPage: `${CANONICAL_URL}/blog/hall-of-famer-challenge`,
        articleSection: 'Training Challenges',
        keywords: '10000 shot challenge, mastery, elite hockey training, deliberate practice',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hockeyshotchallenge.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${CANONICAL_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: 'Hall of Famer Challenge', item: `${CANONICAL_URL}/blog/hall-of-famer-challenge` },
        ],
      },
    ])
  }, [])

  return (
    <div className="post-wrap">
      <nav className="post-nav">
        <button className="post-back" onClick={() => nav('/blog')}>← All guides</button>
        <button className="post-nav-cta" onClick={() => nav('/challenges/10k')}>Try Hall of Famer →</button>
      </nav>

      <article className="post-article">
        <header className="post-header">
          <div className="post-eyebrow">CHALLENGES · FOR PLAYERS</div>
          <h1 className="post-title">The 10,000-Shot Journey: Why Your Kid Will Never Stop Training After This</h1>
          <p className="post-subtitle">What mastery actually looks like</p>
          <p className="post-date">August 2026</p>
        </header>

        <div className="post-body">
          <p>I'm going to tell you something that might sound crazy: the kids who finish 10,000 shots aren't done. They're not even close to done.</p>
          <p>Because by the time they hit 10,000, they've figured something out: there's no finish line. There's just getting better, always.</p>

          <h2>What 10,000 Actually Means</h2>
          <p>10,000 shots is a lot. Like, think about it—that's probably 9-12 months of consistent, deliberate practice. Maybe longer. And by the end, your kid isn't doing it because it's a challenge anymore. They're doing it because it's who they are.</p>
          <p>I know that sounds dramatic, but I've watched it happen. A kid will talk about themselves differently. "I'm the kind of person who shoots every day" or "I actually take my training serious." It's not arrogance—it's just how they see themselves now.</p>
          <p>And that's the thing: mastery isn't an achievement. It's an identity.</p>

          <h2>The Actual Skill They've Built</h2>
          <p>Here's what's wild about 10,000 shots: your kid's intuition is sharp now. They don't have to think before they shoot anymore. Their body just <em>knows</em>. They can read a defenseman moving and release in one smooth motion without their brain doing calculations.</p>
          <p>That's pattern recognition at work. Their nervous system has seen every variation enough times that decision-making is automatic.</p>
          <p>On the ice, it looks effortless. But it's the opposite of effortless—it's the result of thousands of moments of effort that have now become automatic.</p>
          <p>They're also mentally tougher in a way that's hard to explain. Pressure doesn't rattle them. They miss a shot and they're already thinking about the next one. They're composed because they've learned that emotions are just part of the process, not the point.</p>

          <h2>The Culture Shift</h2>
          <p>Here's the thing nobody talks about: when one kid on a team hits 10,000 shots, it changes the whole team.</p>
          <p>Younger players see it and think "oh, that's possible." The standard for what commitment looks like rises. Suddenly, showing up to practice is different because there's a kid on the team who actually trains.</p>
          <p>And the kid who hit 10,000? They naturally become a leader. Not because anyone put them in charge, but because they've figured out how to do hard things consistently. And other kids want to learn from that.</p>

          <div className="post-callout">
            <div className="post-callout-title">The Hall of Famer Challenge isn't really about 10,000 shots.</div>
            <p>It's about deciding to become the kind of person who doesn't quit when it gets hard.</p>
          </div>

          <h2>What Actually Happens</h2>
          <p>Your kid will hit days when they don't feel like shooting. When they're tired. When it feels pointless. And they'll do it anyway. That's the actual challenge.</p>
          <p>By the end, they won't remember individual shots. They'll remember that they proved something to themselves: they can set a big goal and actually see it through.</p>
          <p>And honestly? That skill matters way more than hockey.</p>

          <h2>The Real Thing</h2>
          <p>The kids who finish this don't just become better hockey players. They become the kind of people who finish things they start.</p>
          <p>That's a quality that carries into school, work, relationships, everything. When you've done something hard for months and months, other things stop seeming impossible.</p>

          <div className="post-cta-block">
            <p>Ready to start the biggest challenge?</p>
            <button className="post-cta" onClick={() => nav('/challenges/10k')}>Start the Hall of Famer Challenge →</button>
            <p className="post-cta-hint">9-12 months of focused work. This is where mastery begins.</p>
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
