import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../../lib/seo'
import AuthorBio from '../../components/AuthorBio'

export default function ProChallengePost() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'The Pro Challenge (2,500 Shots): From Practice to Real Training',
      description: `What happens when a player commits to 2,500 shots. How training transforms from casual to intentional, and what coaches notice.`,
      url: `${CANONICAL_URL}/blog/pro-challenge`,
      type: 'article',
    })
    addStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The Pro Challenge (2,500 Shots): From Practice to Real Training',
        description: 'What happens when a player commits to 2,500 shots. How training transforms from casual to intentional, and what coaches notice.',
        datePublished: '2026-08-02',
        dateModified: '2026-08-02',
        author: { '@type': 'Organization', name: 'Hockey Shot Challenge' },
        publisher: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: 'https://hockeyshotchallenge.com' },
        url: `${CANONICAL_URL}/blog/pro-challenge`,
        mainEntityOfPage: `${CANONICAL_URL}/blog/pro-challenge`,
        articleSection: 'Training Challenges',
        keywords: '2500 shot challenge, hockey training, deliberate practice, youth hockey development',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hockeyshotchallenge.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${CANONICAL_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: 'Pro Challenge', item: `${CANONICAL_URL}/blog/pro-challenge` },
        ],
      },
    ])
  }, [])

  return (
    <div className="post-wrap">
      <nav className="post-nav">
        <button className="post-back" onClick={() => nav('/blog')}>← All guides</button>
        <button className="post-nav-cta" onClick={() => nav('/challenges/2_5k')}>Try Pro Challenge →</button>
      </nav>

      <article className="post-article">
        <header className="post-header">
          <div className="post-eyebrow">CHALLENGES · FOR PLAYERS</div>
          <h1 className="post-title">The 2,500-Shot Challenge: The Jump From "I Shoot" to "I Train"</h1>
          <p className="post-subtitle">When kids stop just practicing and start actually training</p>
          <p className="post-date">August 2026</p>
        </header>

        <div className="post-body">
          <p>There's a moment in every athlete's development where practice stops being about doing the thing and starts being about getting better at the thing.</p>
          <p>The Pro Challenge is where that usually happens.</p>
          <p>By this point, your kid has done <button className="post-inline-link" onClick={() => nav('/blog/rookie-challenge')}>1,000 shots (Rookie Challenge)</button>. They know how to show up. They're not learning the absolute basics anymore—they've got the fundamentals. Now they need to actually develop as a player. That's different.</p>

          <h2>The Boring Part (That Actually Matters)</h2>
          <p>Real talk: shooting 2,500 times is a grind. It's about 12-14 weeks of consistent work. The novelty of the tracker has worn off. It's not exciting anymore—it's just... the thing they do.</p>
          <p>And honestly? That's when it starts working.</p>
          <p>I've watched a bunch of kids make this jump, and the ones who finish the Pro Challenge have something different about them. They're not doing it for the tracker anymore. They're doing it because they want to get better. That shift from "I have to do this" to "I want this" is everything.</p>
          <p>Around the midpoint (somewhere around shot 1,500), kids usually hit a wall. They wonder why they're still doing this. The answer? Because they're building something that's not going to be obvious until they're in a game and they don't have to think before they shoot.</p>

          <h2>What's Actually Different at This Level</h2>
          <p>Here's what I notice about Pro-level players: they start asking better questions.</p>
          <p>Instead of just logging shots, they're thinking about <em>why</em> they're shooting. They notice things like: "I'm worse at this angle when I'm tired" or "I'm better at one-timers than wrist shots." They're not just practicing—they're learning how they practice.</p>
          <p>They also start to understand what it means to train like a serious player. They're not trying to score. They're not trying to impress anyone. They're trying to execute the same shot over and over until their body just knows how to do it. That's the difference between playing hockey and training to play hockey.</p>
          <p>By 2,500 shots, the muscle memory is real. On the ice, you see it: they're calmer. Their shot doesn't fall apart when they're tired. They can think about what they're doing next instead of worrying about the mechanics of the shot.</p>

          <h2>The Turning Point</h2>
          <p>Somewhere around shot 1,800, something clicks. I don't know the exact science, but something shifts. The kid has done enough reps that their nervous system just <em>gets it</em>. Their body knows what to do.</p>
          <p>And then the last 700 shots? Those are just proof that they're not going back. They've built a standard for themselves.</p>

          <div className="post-callout">
            <div className="post-callout-title">That's the Pro Challenge.</div>
            <p>It's where kids stop being casual and start being intentional.</p>
          </div>

          <h2>What Comes Next</h2>
          <p>Some kids keep the momentum going and jump into the <button className="post-inline-link" onClick={() => nav('/blog/elite-challenge')}>Elite Challenge (5,000 shots)</button>. That's the one that really separates them from everyone else. But whether they stop here or keep going, they've crossed a threshold: they now know what it means to actually train.</p>

          <div className="post-cta-block">
            <p>Ready for the next level?</p>
            <button className="post-cta" onClick={() => nav('/challenges/2_5k')}>Start the Pro Challenge →</button>
            <p className="post-cta-hint">12-14 weeks of real training. Free to start and track.</p>
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
