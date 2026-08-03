import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../../lib/seo'
import { usePostHog } from '../../hooks/usePostHog'
import AuthorBio from '../../components/AuthorBio'

export default function BurnoutPreventionPost() {
  const nav = useNavigate()
  const { trackBlogViewed, trackBlogLinkClicked } = usePostHog()

  useEffect(() => {
    trackBlogViewed('burnout-prevention', 'Burnout Prevention: The 4 Warning Signs Every Coach Misses')
    setSEO({
      title: 'Hockey Burnout Prevention: 4 Signs Your Kid Is Overtraining + How to Fix It',
      description: `4 signs of overtraining in hockey: injury frequency, loss of enthusiasm, plateaued progress, reduced game performance. How to prevent burnout.`,
      url: `${CANONICAL_URL}/blog/burnout-prevention`,
      type: 'article',
    })
    addStructuredData([
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Hockey Burnout Prevention: 4 Signs Your Kid Is Overtraining + How to Fix It',
        description: `4 signs of overtraining in hockey: injury frequency, loss of enthusiasm, plateaued progress, reduced game performance. How to prevent burnout.`,
        datePublished: '2026-08-02',
        dateModified: '2026-08-02',
        author: { '@type': 'Organization', name: 'Hockey Shot Challenge' },
        publisher: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: 'https://hockeyshotchallenge.com' },
        url: `${CANONICAL_URL}/blog/burnout-prevention`,
        mainEntityOfPage: `${CANONICAL_URL}/blog/burnout-prevention`,
        articleSection: 'Youth Development',
        keywords: 'youth sports burnout, overtraining youth athletes, preventing athlete burnout, sports injury prevention',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://hockeyshotchallenge.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${CANONICAL_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: 'Burnout Prevention', item: `${CANONICAL_URL}/blog/burnout-prevention` },
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
          <div className="post-eyebrow">PARENT GUIDE · BURNOUT</div>
          <h1 className="post-title">Hockey Burnout Prevention: 4 Warning Signs</h1>
          <p className="post-subtitle">How to tell if your kid is overtraining and what to do about it</p>
          <p className="post-date">August 2026</p>
        </header>

        <div className="post-body">
          <p>There's a line between training hard and training too hard. Most parents don't know where that line is until their kid crosses it.</p>
          <p>Here are the four signs that your kid is overtraining. And what to do if you see them.</p>

          <h2>Sign 1: Injury Frequency (More Than One Per Year)</h2>
          <p><strong>What it looks like:</strong> Your kid gets injured, recovers, and gets injured again. Different injuries. Wrist strain, shoulder pain, ankle rolls. It's not one bad accident — it's a pattern.</p>
          <p><strong>What it means:</strong> Their body isn't recovering between training sessions. When you don't recover, your form breaks down. When form breaks down, injuries happen.</p>
          <p><strong>What to do:</strong></p>
          <ul>
            <li><strong>Add rest days.</strong> If they're training 6 days a week, cut it to 5. Their body needs time to rebuild.</li>
            <li><strong>Reduce volume.</strong> Don't cut training intensity — just the total shots/reps per week. Quality over quantity.</li>
            <li><strong>Track recovery metrics.</strong> Sleep, soreness, energy level. If soreness stays high, volume is too high.</li>
            <li><strong>Get a PT to assess form.</strong> Repetitive injuries usually mean form is breaking down under fatigue. Fix the form first.</li>
          </ul>

          <h2>Sign 2: Loss of Enthusiasm (They Don't Want to Practice Anymore)</h2>
          <p><strong>What it looks like:</strong> A few months ago, they wanted to shoot every day. Now you have to push them. They're going through the motions.</p>
          <p><strong>What it means:</strong> Burnout. They've lost the intrinsic motivation. They're training because they feel like they have to, not because they want to. That's when it stops working.</p>
          <p><strong>What to do:</strong></p>
          <ul>
            <li><strong>Take a week off.</strong> Not from hockey entirely — just from the structured challenge or intensive training. Let them play for fun.</li>
            <li><strong>Switch up the drill.</strong> If they've been doing wall shots, try stickhandling gates. Different stimulus, same training.</li>
            <li><strong>Ask why.</strong> Is it boredom? Pressure? Fear of failure? Different problems need different fixes.</li>
            <li><strong>Remove the scoreboard.</strong> If you've been tracking every shot, stop for a week. Training can be fun without metrics.</li>
          </ul>

          <h2>Sign 3: Plateaued Progress (Getting Worse, Not Better)</h2>
          <p><strong>What it looks like:</strong> For months, they were improving. Accuracy up, consistency up. Then it stopped. Now they're actually getting worse — missing more, slower release, sloppier form.</p>
          <p><strong>What it means:</strong> They've hit the point where more volume isn't helping. Their nervous system is fried. They're too tired to learn. You need to back off so their body can recover and adapt.</p>
          <p><strong>What to do:</strong></p>
          <ul>
            <li><strong>Drop volume by 25%.</strong> If they're doing 500 shots a week, do 375. Give the nervous system room to recover.</li>
            <li><strong>Increase intensity.</strong> Instead of 500 medium-effort shots, do 375 high-effort shots. Quality matters more than quantity.</li>
            <li><strong>Take a full week off.</strong> This is the hardest one for parents, but a full rest week often breaks through plateaus. The body needs time to rebuild.</li>
            <li><strong>Change the metric.</strong> Stop tracking total shots. Track accurate shots or consistency instead. Progress looks different at different stages.</li>
          </ul>

          <h2>Sign 4: Reduced Game Performance (They Dominate Practice, Disappear in Games)</h2>
          <p><strong>What it looks like:</strong> In practice, they're sharp. In games, they're invisible. They're tentative, missing easy chances, making mistakes they don't make in practice.</p>
          <p><strong>What it means:</strong> They're mentally fatigued. Their nervous system has so much load from training that it has nothing left for games. They're training tired.</p>
          <p><strong>What to do:</strong></p>
          <ul>
            <li><strong>Scale back training 3 days before games.</strong> Not zero training, but 50% volume. Let them show up fresh.</li>
            <li><strong>Track sleep.</strong> If they're getting less than 8 hours, training volume is too high. Sleep is where recovery happens.</li>
            <li><strong>Prioritize game recovery.</strong> After a game, that's a rest day. Not a light practice day. A real rest day.</li>
            <li><strong>Measure game performance, not practice performance.</strong> If they're crushing practice but disappearing in games, practice isn't the right metric.</li>
          </ul>

          <div className="post-callout">
            <div className="post-callout-title">The Real Rule</div>
            <p>If your kid is injured, losing motivation, plateaued, or disappearing in games, volume is too high. It's not about working harder — it's about working smarter. Rest is part of training, not the opposite of it.</p>
          </div>

          <h2>Recovery Is Training</h2>
          <p>This is the thing that separates elite training from just grinding. Elite training has phases: build phase (high volume), peak phase (high intensity), taper phase (low volume, high freshness). Most kids just grind at high volume year-round and wonder why they burn out.</p>
          <p>If you see any of these four signs, it's time to pull back. Your kid will actually get better faster by training smarter, not harder.</p>

          <h2>Related Reading</h2>
          <p style={{ fontSize: 15, color: 'var(--text-soft)', marginBottom: 20 }}>
            <button className="post-inline-link" onClick={() => { trackBlogLinkClicked('hockey-iq-vs-skill', 'related_reading'); nav('/blog/hockey-iq-vs-skill'); }}>Training smart builds both skill and IQ →</button>
            {' '} Quality matters more than volume. Here\'s why.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-soft)', marginBottom: 20 }}>
            <button className="post-inline-link" onClick={() => { trackBlogLinkClicked('5-week-progression', 'related_reading'); nav('/blog/5-week-progression'); }}>How to pace your training →</button>
            {' '} The progression guide shows what sustainable looks like.
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-soft)' }}>
            <button className="post-inline-link" onClick={() => { trackBlogLinkClicked('80-20-finishers', 'related_reading'); nav('/blog/80-20-finishers'); }}>How finishers stay healthy and motivated →</button>
            {' '} The 20% who finish also know how to avoid burnout.
          </p>

          <div className="post-cta-block">
            <p>Want to track training without overtraining?</p>
            <button className="post-cta" onClick={() => nav('/challenges/1k')}>Start a challenge at a smart pace →</button>
            <p className="post-cta-hint">Structured, measured, sustainable. That's how you actually improve.</p>
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
