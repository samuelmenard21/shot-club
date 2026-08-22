import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { setSEO, CANONICAL_URL } from '../../lib/seo'
import SEOFooter from '../../components/SEOFooter'

const POSTS = [
  {
    slug: '7-off-ice-drills',
    title: '7 Off-Ice Drills That Actually Improve Shot Accuracy (Tested by Coaches)',
    description: '7 proven off-ice hockey drills coaches recommend. Step-by-step instructions. Build accuracy and muscle memory at home.',
    date: 'August 2026',
  },
  {
    slug: '5-week-progression',
    title: 'The 5-Week Hockey Progression: What Players Learn Each Week',
    description: 'Track your first 1,250 shots week-by-week. What happens week 1 vs week 5. How muscle memory builds.',
    date: 'August 2026',
  },
  {
    slug: 'hockey-iq-vs-skill',
    title: 'Hockey IQ vs Skill: 6 Ways Off-Ice Training Builds Both',
    description: 'Off-ice training does more than build strength. Here are 6 ways it builds hockey IQ and decision-making.',
    date: 'August 2026',
  },
  {
    slug: 'burnout-prevention',
    title: 'Hockey Burnout Prevention: 4 Signs Your Kid Is Overtraining',
    description: '4 signs of overtraining: injury frequency, loss of enthusiasm, plateaued progress, reduced game performance. How to fix it.',
    date: 'August 2026',
  },
  {
    slug: '80-20-finishers',
    title: 'The Hockey 80/20: Why 20% of Players Finish Their Challenge',
    description: 'What separates the 20% who finish from the 80% who quit. Spoiler: it\'s not talent.',
    date: 'August 2026',
  },
  {
    slug: 'rookie-challenge',
    title: 'The Rookie Challenge (1,000 Shots): Building Unstoppable Hockey Habits',
    description: 'How 1,000 shots in 5-6 weeks builds real practice habits. What kids actually learn from the Rookie Challenge and when transformation happens.',
    date: 'August 2026',
  },
  {
    slug: 'pro-challenge',
    title: 'The Pro Challenge (2,500 Shots): From Practice to Real Training',
    description: "What happens when a player commits to 2,500 shots. How training transforms from casual to intentional, and what coaches notice.",
    date: 'August 2026',
  },
  {
    slug: 'elite-challenge',
    title: 'The Elite Challenge (5,000 Shots): What It Actually Takes to Be Elite',
    description: 'At 5,000 shots, most quit. The ones who push through build something rare: mental toughness and mastery. Here\'s what happens.',
    date: 'August 2026',
  },
  {
    slug: 'hall-of-famer-challenge',
    title: 'The Hall of Famer Challenge (10,000 Shots): Why Elite Athletes Never Stop Training',
    description: 'At 10,000 shots, mastery begins. Players become mentors. Habits become identity. Here\'s what happens when someone actually commits to elite-level training.',
    date: 'August 2026',
  },
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
  {
    slug: 'off-ice-drills',
    title: 'Top 5 Off-Ice Hockey Drills Your Kid Can Practice at Home',
    description: 'Hockey training doesn\'t need ice. These five drills build shooting accuracy, stickhandling, and strength—and take 30 minutes.',
    date: 'August 2026',
  },
  {
    slug: 'building-practice-routine',
    title: 'How to Build a Consistent Hockey Practice Routine (Without Burnout)',
    description: 'Weekly practice schedules that work. How much time per day? What drills hit all the skills? Here\'s what coaches recommend.',
    date: 'August 2026',
  },
  {
    slug: 'parents-guide-youth-hockey',
    title: 'Parent\'s Guide to Youth Hockey Training: What Coaches Actually Look For',
    description: 'Not sure what your kid should be practicing? Here\'s what separates players who improve fast from those who plateau.',
    date: 'August 2026',
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
          <Link
            key={post.slug}
            className="blog-card"
            to={`/blog/${post.slug}`}
          >
            <div className="blog-card-date">{post.date}</div>
            <h2 className="blog-card-title">{post.title}</h2>
            <p className="blog-card-desc">{post.description}</p>
            <span className="blog-card-read">Read →</span>
          </Link>
        ))}
      </div>

      <section className="blog-popular">
        <div className="blog-popular-inner">
          <h2 className="blog-popular-title">Popular Guides</h2>
          <div className="blog-popular-grid">
            <Link className="blog-popular-card" to="/blog/getting-started">
              <span className="blog-popular-emoji">🚀</span>
              <span className="blog-popular-label">Getting Started</span>
            </Link>
            <Link className="blog-popular-card" to="/blog/building-practice-routine">
              <span className="blog-popular-emoji">📋</span>
              <span className="blog-popular-label">Practice Routine</span>
            </Link>
            <Link className="blog-popular-card" to="/blog/parents-guide-youth-hockey">
              <span className="blog-popular-emoji">👨‍👩‍👧‍👦</span>
              <span className="blog-popular-label">Parents' Guide</span>
            </Link>
            <Link className="blog-popular-card" to="/blog/off-ice-drills">
              <span className="blog-popular-emoji">🎯</span>
              <span className="blog-popular-label">Off-Ice Drills</span>
            </Link>
            <Link className="blog-popular-card" to="/blog/5-week-progression">
              <span className="blog-popular-emoji">📈</span>
              <span className="blog-popular-label">5-Week Progression</span>
            </Link>
            <Link className="blog-popular-card" to="/blog/80-20-finishers">
              <span className="blog-popular-emoji">🏆</span>
              <span className="blog-popular-label">Why 20% Finish</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="blog-footer">
        <button className="blog-foot-link" onClick={() => nav('/')}>← Home</button>
        <button className="blog-foot-cta" onClick={() => nav('/start')}>Start free — it's 2 minutes →</button>
      </footer>

      <SEOFooter />

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
  display: block;
  background: #0f1624;
  border: 1px solid #1a2847;
  border-radius: 16px;
  padding: 24px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.1s;
  width: 100%;
  text-decoration: none;
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

.blog-popular {
  background: linear-gradient(135deg, rgba(41, 121, 255, 0.05) 0%, rgba(61, 214, 140, 0.05) 100%);
  border-top: 1px solid rgba(41, 121, 255, 0.1);
  border-bottom: 1px solid rgba(41, 121, 255, 0.1);
  padding: 60px 20px;
  margin: 40px 0;
}
.blog-popular-inner {
  max-width: 1000px; margin: 0 auto;
}
.blog-popular-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 800; color: white;
  text-align: center; margin-bottom: 36px;
}
.blog-popular-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}
.blog-popular-card {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; padding: 20px;
  background: rgba(15, 22, 36, 0.6);
  border: 1px solid rgba(41, 121, 255, 0.15);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  text-decoration: none;
}
.blog-popular-card:hover {
  border-color: var(--accent);
  background: rgba(41, 121, 255, 0.1);
  transform: translateY(-2px);
}
.blog-popular-emoji {
  font-size: 32px; display: block;
}
.blog-popular-label {
  font-size: 14px; font-weight: 600;
  color: var(--text-soft); line-height: 1.3;
}
.blog-popular-card:hover .blog-popular-label { color: var(--ice); }

@media (max-width: 640px) {
  .blog-popular-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .blog-popular { padding: 40px 20px; margin: 24px 0; }
}

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
