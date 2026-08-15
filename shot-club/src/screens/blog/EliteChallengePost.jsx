import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../../lib/seo'
import AuthorBio from '../../components/AuthorBio'
import SEOFooter from '../../components/SEOFooter'

export default function EliteChallengePost() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'The Elite Challenge (5,000 Shots): What Actually Separates Elite Players',
      description: `At 5,000 shots, most quit. The ones who push through build something rare: mental toughness and mastery. Here's what happens.`,
      url: `${CANONICAL_URL}/blog/elite-challenge`,
      type: 'article',
    })
    addStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The Elite Challenge (5,000 Shots): What Actually Separates Elite Players',
        description: `At 5,000 shots, most quit. The ones who push through build something rare: mental toughness and mastery. Here's what happens.`,
        datePublished: '2026-08-02',
        dateModified: '2026-08-02',
        author: { '@type': 'Organization', name: 'Hockey Shot Challenge' },
        publisher: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: 'https://hockeyshotchallenge.com' },
        url: `${CANONICAL_URL}/blog/elite-challenge`,
        mainEntityOfPage: `${CANONICAL_URL}/blog/elite-challenge`,
        articleSection: 'Training Challenges',
        keywords: '5000 shot challenge, elite hockey training, grit, mental toughness, hockey development',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hockeyshotchallenge.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${CANONICAL_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: 'Elite Challenge', item: `${CANONICAL_URL}/blog/elite-challenge` },
        ],
      },
    ])
  }, [])

  return (
    <div className="post-wrap">
      <nav className="post-nav">
        <button className="post-back" onClick={() => nav('/blog')}>← All guides</button>
        <button className="post-nav-cta" onClick={() => nav('/challenges/5k')}>Try Elite Challenge →</button>
      </nav>

      <article className="post-article">
        <header className="post-header">
          <div className="post-eyebrow">CHALLENGES · FOR PLAYERS</div>
          <h1 className="post-title">The 5,000-Shot Challenge: What It Actually Takes to Be Elite</h1>
          <p className="post-subtitle">Hint: It's not talent</p>
          <p className="post-date">August 2026</p>
        </header>

        <div className="post-body">
          <p>Okay, so here's the thing about the Elite Challenge that I think is important to understand: most kids won't do it.</p>
          <p>Not because they can't. Because it's hard in a way that talent doesn't fix.</p>
          <p>By 5,000 shots, your kid has been doing this for months. Like, 6-7 months of consistent work. The novelty is completely gone. The tracker doesn't feel special anymore. They've already proven they can commit to something. Now they're just... still doing it.</p>
          <p>This is where you find out who really wants it.</p>

          <h2>The Motivation Drop</h2>
          <p>I'm going to be real with you: around shot 3,500, something happens. The kid has been at this for so long that they stop <em>feeling</em> like they're making progress. They're better than they were, sure, but they can't feel the growth the same way anymore. It's like hitting a wall in a video game—they know the wall is fake, but they also know they're going to have to grind through it.</p>
          <p>This is where most people quit. Not because they're not good enough. But because the work stops being rewarding in an obvious way.</p>
          <p>The kids who push through? They've figured something out: they don't need the reward to be obvious. They just keep going because they decided to.</p>
          <p>That's actually rarer than you'd think.</p>

          <h2>What Elite Actually Means</h2>
          <p>Here's what I've noticed about kids who finish the Elite Challenge: they're different. Not bigger or faster—just different.</p>
          <p>They're calmer. When they miss, they don't get frustrated. When they hit a good shot, they don't celebrate—they just note it and move on. They're focused on the process, not the outcome. And that's the hallmark of someone who's actually trained.</p>
          <p>They also handle criticism better. A coach can give them feedback and they're just like "okay, got it" and they implement it. Because they've done 5,000 shots, they understand that feedback is data, not judgment.</p>
          <p>And on the ice? They make smarter decisions. Not because they're smarter—because their body knows the fundamentals so well that their brain has room to think about strategy.</p>

          <h2>The Hidden Part</h2>
          <p>Here's something that happens that people don't talk about: kids who hit 5,000 shots start helping other kids. Not because anyone asks them to. But because they remember the journey and they see younger players struggling with the same stuff they struggled with.</p>
          <p>That's when you know something real has happened. It's not just about them anymore—they're the kid that other kids want to be like.</p>

          <div className="post-callout">
            <div className="post-callout-title">The Elite Challenge isn't about being talented.</div>
            <p>It's about being willing to do the work that most people won't do.</p>
          </div>

          <h2>After Elite</h2>
          <p>A small percentage of kids keep going after 5,000 shots. They pursue the <button className="post-inline-link" onClick={() => nav('/blog/hall-of-famer-challenge')}>Hall of Famer Challenge (10,000 shots)</button>. That's the one where mastery actually starts. But whether they stop here or go further, they've built something that's hard to build: genuine resilience and a growth mindset that carries into everything else they do.</p>

          <h2>Learn More</h2>
          <p style={{ fontSize: 15, color: 'var(--text-soft)', marginBottom: 20 }}>
            <button className="post-inline-link" onClick={() => nav('/blog/5-week-progression')}>The progression framework →</button>
            {' '} Understand the stages of skill development.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-soft)', marginBottom: 20 }}>
            <button className="post-inline-link" onClick={() => nav('/blog/burnout-prevention')}>Training smart, not just hard →</button>
            {' '} Mental toughness requires recovery too.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-soft)' }}>
            <button className="post-inline-link" onClick={() => nav('/blog/80-20-finishers')}>Why elite players actually finish →</button>
            {' '} The systems that sustain long-term commitment.
          </p>

          <div className="post-cta-block">
            <p>Think your kid is ready for elite-level training?</p>
            <button className="post-cta" onClick={() => nav('/challenges/5k')}>Start the Elite Challenge →</button>
            <p className="post-cta-hint">6-7 months of focused work. Only for kids who are serious about getting better.</p>
          </div>
        </div>
      </article>

      <AuthorBio />

      <footer className="post-footer">
        <button className="post-foot-link" onClick={() => nav('/blog')}>← All guides</button>
        <button className="post-foot-link" onClick={() => nav('/')}>Home</button>
      </footer>

      <SEOFooter />

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
