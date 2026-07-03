import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, CANONICAL_URL } from '../../lib/seo'

const POSTS = [
  {
    slug: 'getting-started',
    title: 'How to Get Your Kid Started on Hockey Shot Challenge (It Takes 5 Minutes)',
    description: 'A step-by-step guide for parents. Sign in with Google, set up your player, find their team, and log the first session.',
    date: 'July 2026',
  },
  {
    slug: 'how-squad-battles-work',
    title: 'What Happens Every Week on Hockey Shot Challenge',
    description: '1v1 battles, daily logging, ranks, streaks, and what coaches can see. Here\'s how a full week looks.',
    date: 'July 2026',
  },
]

export default function BlogIndex() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'Blog — Hockey Shot Challenge',
      description: 'Tips and guides for parents, players, and coaches using Hockey Shot Challenge. Learn how to get started and make the most of off-ice training.',
      url: `${CANONICAL_URL}/blog`,
    })
  }, [])

  return (
    <div className="blog-wrap">
      <nav className="blog-nav">
        <button className="blog-back" onClick={() => nav('/')}>← Home</button>
        <button className="blog-nav-cta" onClick={() => nav('/start')}>Start free →</button>
      </nav>

      <header className="blog-header">
        <div className="blog-eyebrow">GUIDES & TIPS</div>
        <h1 className="blog-index-title">For parents, players & coaches.</h1>
        <p className="blog-index-sub">Short guides to get the most out of Hockey Shot Challenge.</p>
      </header>

      <div className="blog-list">
        {POSTS.map((post) => (
          <button
            key={post.slug}
            className="blog-card"
            onClick={() => nav(`/blog/${post.slug}`)}
          >
            <div className="blog-card-date">{post.date}</div>
            <h2 className="blog-card-title">{post.title}</h2>
            <p className="blog-card-desc">{post.description}</p>
            <span className="blog-card-read">Read →</span>
          </button>
        ))}
      </div>

      <footer className="blog-footer">
        <button className="blog-foot-link" onClick={() => nav('/')}>← Home</button>
        <button className="blog-foot-cta" onClick={() => nav('/start')}>Start free — it's 2 minutes →</button>
      </footer>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.blog-wrap {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
}
body:has(.blog-wrap) { background: var(--bg) !important; }

.blog-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px 20px; max-width: 720px; margin: 0 auto;
}
.blog-back { color: #8899b4; font-size: 15px; background: transparent; }
.blog-back:hover { color: white; }
.blog-nav-cta {
  background: var(--accent); color: white;
  padding: 10px 18px; border-radius: 10px;
  font-family: var(--font-display); font-size: 14px; font-weight: 700;
}

.blog-header {
  padding: 32px 20px 40px;
  max-width: 680px; margin: 0 auto; text-align: center;
}
.blog-eyebrow {
  font-size: 12px; font-weight: 700; letter-spacing: 2px;
  color: #60a5fa; margin-bottom: 14px;
}
.blog-index-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 6vw, 42px);
  font-weight: 800; color: white; line-height: 1.05;
  margin-bottom: 12px; letter-spacing: -0.3px;
}
.blog-index-sub { font-size: 17px; color: #a8b8d0; line-height: 1.5; }

.blog-list {
  max-width: 680px; margin: 0 auto;
  padding: 0 20px 60px;
  display: flex; flex-direction: column; gap: 16px;
}
.blog-card {
  background: #0f1624;
  border: 1px solid #1a2847;
  border-radius: 16px;
  padding: 24px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.1s;
  width: 100%;
}
.blog-card:hover { border-color: var(--accent); }
.blog-card:active { transform: scale(0.99); }
.blog-card-date { font-size: 13px; color: #4a6080; margin-bottom: 10px; }
.blog-card-title {
  font-family: var(--font-display);
  font-size: clamp(18px, 3vw, 22px);
  font-weight: 800; color: white;
  line-height: 1.2; margin-bottom: 10px;
}
.blog-card-desc { font-size: 15px; color: #8899b4; line-height: 1.55; margin-bottom: 14px; }
.blog-card-read { font-size: 14px; color: var(--accent); font-weight: 600; }

.blog-footer {
  border-top: 1px solid #1a2035;
  padding: 24px 20px;
  max-width: 680px; margin: 0 auto;
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 12px;
}
.blog-foot-link { color: #4a6080; font-size: 14px; background: transparent; }
.blog-foot-link:hover { color: white; }
.blog-foot-cta {
  background: var(--accent); color: white;
  padding: 12px 20px; border-radius: 10px;
  font-family: var(--font-display); font-size: 15px; font-weight: 700;
}
`
