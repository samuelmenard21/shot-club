import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../../lib/seo'
import AuthorBio from '../../components/AuthorBio'
import SEOFooter from '../../components/SEOFooter'

export default function RookieChallengePost() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'The Rookie Challenge (1,000 Shots): Building Unstoppable Hockey Habits',
      description: `Learn how 1,000 shots in 5-6 weeks builds real practice habits. What kids actually learn from the Rookie Challenge and when transformation happens.`,
      url: `${CANONICAL_URL}/blog/rookie-challenge`,
      type: 'article',
    })
    addStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The Rookie Challenge (1,000 Shots): Building Unstoppable Hockey Habits',
        description: 'Learn how 1,000 shots in 5-6 weeks builds real practice habits. What kids actually learn from the Rookie Challenge and when transformation happens.',
        datePublished: '2026-08-02',
        dateModified: '2026-08-02',
        author: { '@type': 'Organization', name: 'Hockey Shot Challenge' },
        publisher: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: 'https://hockeyshotchallenge.com' },
        url: `${CANONICAL_URL}/blog/rookie-challenge`,
        mainEntityOfPage: `${CANONICAL_URL}/blog/rookie-challenge`,
        articleSection: 'Training Challenges',
        keywords: 'hockey shot challenge, 1000 shot challenge, hockey habits, off-ice hockey training, hockey for kids',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hockeyshotchallenge.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${CANONICAL_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: 'Rookie Challenge', item: `${CANONICAL_URL}/blog/rookie-challenge` },
        ],
      },
    ])
  }, [])

  return (
    <div className="post-wrap">
      <nav className="post-nav">
        <button className="post-back" onClick={() => nav('/blog')}>← All guides</button>
        <button className="post-nav-cta" onClick={() => nav('/challenges/1k')}>Try Rookie Challenge →</button>
      </nav>

      <article className="post-article">
        <header className="post-header">
          <div className="post-eyebrow">CHALLENGES · FOR PLAYERS</div>
          <h1 className="post-title">Your Kid's First 1,000 Shots: What Actually Happens</h1>
          <p className="post-subtitle">(And It's Better Than You Think)</p>
          <p className="post-date">August 2026</p>
        </header>

        <div className="post-body">
          <p>Here's the thing about building habits that nobody talks about: it takes longer than 21 days. I don't know where that number came from, but if you've ever tried to stick with something, you know it's BS.</p>
          <p>The real number? About two months. That's how long it takes before something stops feeling like a chore and starts feeling like... just what you do.</p>
          <p>The Rookie Challenge is basically that timeline built in. Your kid shoots about 200 times a week, which gets them through the whole 1,000 in about 5-6 weeks. And here's what's wild—if they stick with it, by the end they're not asking "can I go shoot?" anymore. They're just going.</p>

          <h2>Why This Actually Works</h2>
          <p>Look, the tracker isn't magic. It's just boxes. But here's what I've noticed: kids respond to seeing progress. Not like trophies or praise—I mean literally <em>seeing</em> that they've completed 300 shots. Then 600. Then 800. Their brain lights up a little each time.</p>
          <p>And the cool part? They start noticing stuff on their own. Around shot 500, a kid will say something like "wait, I think I'm getting better at that angle." They're not following a plan anymore—they're actually paying attention to their own game. That's when you know it's sticking.</p>

          <h2>What Actually Changes</h2>
          <p>After their first 1,000 shots, parents usually say the same thing: "They're not thinking as hard when they shoot anymore." That's exactly right. Their body is starting to remember what to do without their brain having to think through every step.</p>
          <p>Muscle memory is real. And the way you build it is by doing the thing. A lot.</p>
          <p>The other thing that happens? They get a tiny bit tougher mentally. Not like aggressive or anything—just more resilient. They miss shots. They feel discouraged. But they keep going because it's on the tracker. And then they don't miss the next one. That cycle happens over and over, and it teaches them something: you get better by showing up, not by being perfect.</p>

          <h2>Real Talk</h2>
          <p>Not every kid will finish the Rookie Challenge on their first try. Some will stop at 400 shots. That's okay. It doesn't mean they failed—it means they learned what it takes to commit to something. Some will restart and finish. Either way, they learned.</p>
          <p>The ones who finish? They've built something real. An actual habit. A routine. Ownership of their own improvement.</p>

          <div className="post-callout">
            <div className="post-callout-title">That's worth way more than 1,000 shots.</div>
          </div>

          <h2>What's Next</h2>
          <p>After the Rookie Challenge, some kids keep going. They jump into the <button className="post-inline-link" onClick={() => nav('/blog/pro-challenge')}>Pro Challenge (2,500 shots)</button> — that's where things get really interesting. But even if they stop here, they've built something that matters: proof that they can set a goal and actually see it through.</p>

          <h2>Learn More</h2>
          <p style={{ fontSize: 15, color: 'var(--text-soft)', marginBottom: 20 }}>
            <button className="post-inline-link" onClick={() => nav('/blog/7-off-ice-drills')}>The drills to use →</button>
            {' '} Specific exercises that build the fundamentals.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-soft)', marginBottom: 20 }}>
            <button className="post-inline-link" onClick={() => nav('/blog/5-week-progression')}>What happens each week →</button>
            {' '} Week-by-week breakdown of the first 1,250 shots.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-soft)' }}>
            <button className="post-inline-link" onClick={() => nav('/blog/80-20-finishers')}>How to be in the 20% who finish →</button>
            {' '} The habits that separate finishers from quitters.
          </p>

          <div className="post-cta-block">
            <p>Ready to get your kid started?</p>
            <button className="post-cta" onClick={() => nav('/challenges/1k')}>Start the Rookie Challenge →</button>
            <p className="post-cta-hint">It's free, and they can start today. Takes less than 5 minutes to set up.</p>
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
