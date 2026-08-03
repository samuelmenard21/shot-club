import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../../lib/seo'
import AuthorBio from '../../components/AuthorBio'

export default function HockeyProgressionPost() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'The 5-Week Hockey Progression: What Players Learn Each Week (Week by Week)',
      description: `Track your first 1,250 shots week-by-week. What happens week 1 vs week 5. How muscle memory builds. What to expect.`,
      url: `${CANONICAL_URL}/blog/5-week-progression`,
      type: 'article',
    })
    addStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'The 5-Week Hockey Progression: What Players Learn Each Week',
        description: `Track your first 1,250 shots week-by-week. What happens week 1 vs week 5. How muscle memory builds. What to expect.`,
        datePublished: '2026-08-02',
        dateModified: '2026-08-02',
        author: { '@type': 'Organization', name: 'Hockey Shot Challenge' },
        publisher: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: 'https://hockeyshotchallenge.com' },
        url: `${CANONICAL_URL}/blog/5-week-progression`,
        mainEntityOfPage: `${CANONICAL_URL}/blog/5-week-progression`,
        articleSection: 'Training Progression',
        keywords: 'hockey skill progression, shot accuracy improvement timeline, hockey training weeks',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hockeyshotchallenge.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${CANONICAL_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: '5-Week Progression', item: `${CANONICAL_URL}/blog/5-week-progression` },
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
          <div className="post-eyebrow">PROGRESSION · WHAT TO EXPECT</div>
          <h1 className="post-title">The 5-Week Hockey Progression</h1>
          <p className="post-subtitle">What players actually learn, week by week, shooting 250+ times a week</p>
          <p className="post-date">August 2026</p>
        </header>

        <div className="post-body">
          <p>If you're about to start a shot challenge, you're probably wondering: what actually happens? What will week 1 look like vs week 5?</p>
          <p>Here's the reality. It's not linear. There are breakthroughs and plateaus. But there's a pattern.</p>

          <h2>Week 1: "Why Does This Feel So Awkward?"</h2>
          <p><strong>Shots this week:</strong> ~250</p>
          <p><strong>Running total:</strong> 250</p>
          <p><strong>What's happening:</strong> Your nervous system is completely new to this volume. You're thinking about every shot: grip, stance, release, where the puck went.</p>
          <p><strong>How you feel:</strong> Tired. Your arms might be sore. Your hands are probably sore (blisters are real). But you keep going because it's new and exciting.</p>
          <p><strong>Reality check:</strong> You won't hit targets consistently yet. Your brain is too busy processing. That's normal. Don't panic.</p>
          <p><strong>The breakthrough:</strong> By day 5, you stop thinking about grip. By day 7, your body remembers where it was yesterday. Small.</p>

          <h2>Week 2: "Okay, I Can Feel The Pattern Now"</h2>
          <p><strong>Shots this week:</strong> ~250</p>
          <p><strong>Running total:</strong> 500</p>
          <p><strong>What's happening:</strong> Your nervous system has done this enough times that it's building a template. You're not thinking as hard. Your body just knows what to do.</p>
          <p><strong>How you feel:</strong> Less sore. More bored, actually. Week 1 was exciting. Week 2 is just... the thing you do. That's when the real habit is forming.</p>
          <p><strong>What you notice:</strong> You start hitting targets more consistently. Not because you got better — because you stopped thinking. Thinking makes you worse.</p>
          <p><strong>The breakthrough:</strong> You realize that shooting is boring and that's the whole point. Boring = automatic = good.</p>

          <h2>Week 3: "Wait, Did I Get Better?"</h2>
          <p><strong>Shots this week:</strong> ~250</p>
          <p><strong>Running total:</strong> 750</p>
          <p><strong>What's happening:</strong> Muscle memory is becoming real. Your wrists know the motion without thinking. Your core knows how to rotate. Your legs know how to set up.</p>
          <p><strong>How you feel:</strong> Stronger. Faster. More confident. You're also halfway done, which feels good.</p>
          <p><strong>What you notice:</strong> Your shot is grooved. When you miss, you know exactly why. "That one was too open" or "I didn't follow through." You're developing coach's voice in your own head.</p>
          <p><strong>The plateau:</strong> This is where some people think they've stopped improving. You haven't. You're just past the novelty bump. Push through.</p>

          <h2>Week 4: "Okay, Now I'm Actually Better"</h2>
          <p><strong>Shots this week:</strong> ~250</p>
          <p><strong>Running total:</strong> 1,000</p>
          <p><strong>What's happening:</strong> By 1,000 shots, your nervous system has such a clear template for shooting that adjustments are fast. You miss? You correct next shot. And the shot after that, you're already adjusted.</p>
          <p><strong>How you feel:</strong> Like you actually know what you're doing. Confident without arrogance. You're not thinking anymore — you're executing.</p>
          <p><strong>What you notice:</strong> Accuracy is up. Consistency is up. But more than that: speed is up. You're not overthinking anymore. The shot just happens.</p>
          <p><strong>The breakthrough:</strong> You hit a target stretch where 8 out of 10 shots go where you want. That's not luck. That's muscle memory winning.</p>

          <h2>Week 5: "I Can't Believe How Far I've Come"</h2>
          <p><strong>Shots this week:</strong> ~250</p>
          <p><strong>Running total:</strong> 1,250</p>
          <p><strong>What's happening:</strong> You're at 1,250 shots. That's a full 1/4 of the 5,000 shot elite challenge. Your body has been programmed. Hard.</p>
          <p><strong>How you feel:</strong> Different. Not just better at shooting, but different mentally. You proved you could show up for 5 weeks straight. You proved you could get better through repetition. You're the kind of person who finishes things now.</p>
          <p><strong>What you notice:</strong> Your shot on ice feels different. Cleaner. Faster. More confident. Your release is there. Your follow-through is grooved. Ice time looks easier because your fundamentals are solid.</p>
          <p><strong>The reality:</strong> You're still a beginner. But you're not an amateur anymore. You're someone who trains.</p>

          <div className="post-callout">
            <div className="post-callout-title">The Pattern Across All Five Weeks</div>
            <p>Week 1 is thinking. Week 2 is habit. Week 3 is doubt. Week 4 is clarity. Week 5 is identity. You're not just someone who shot 1,250 times. You're someone who trained 1,250 times. That's different.</p>
          </div>

          <h2>What To Do After Week 5?</h2>
          <p>You have options. Some players stop here — they've built the habit and the skills. Some jump into the <button className="post-inline-link" onClick={() => nav('/blog/pro-challenge')}>Pro Challenge (2,500 shots)</button> and keep going. Both are wins. The real achievement is that you proved you could do hard things for five weeks straight. Everything else is just more of the same.</p>

          <div className="post-cta-block">
            <p>Ready to start your 5-week progression?</p>
            <button className="post-cta" onClick={() => nav('/challenges/1k')}>Start the Rookie Challenge →</button>
            <p className="post-cta-hint">Track your progress week by week. Watch your accuracy climb.</p>
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
