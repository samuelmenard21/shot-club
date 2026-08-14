import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, CANONICAL_URL } from '../lib/seo'
import { useAuth } from '../hooks/useAuth'
import SEOFooter from '../components/SEOFooter'

export default function AboutScreen() {
  const nav = useNavigate()
  const { player } = useAuth()

  useEffect(() => {
    setSEO({
      title: 'About Sam Menard — Hockey Shot Challenge',
      description: 'Learn about Sam Menard, founder of Hockey Shot Challenge. Building tools to keep young hockey players motivated and engaged.',
      url: `${CANONICAL_URL}/about`,
    })
  }, [])

  const emailAddress = 'samuelmenard@gmail.com'
  const emailEncoded = emailAddress
    .split('')
    .map((char) => `&#${char.charCodeAt(0)};`)
    .join('')

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      {/* NAV */}
      <nav className="land-nav">
        <button className="land-brand" onClick={() => nav('/')}>
          🏒
          <span>Hockey Shot Challenge</span>
        </button>
        <div className="land-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <a href="#faq" className="land-nav-link" style={{ color: 'var(--text-soft)', fontSize: '14px', textDecoration: 'none' }}>FAQ</a>
          <button className="land-nav-link" onClick={() => nav('/blog')} style={{ color: 'var(--text-soft)', fontSize: '14px', background: 'transparent', cursor: 'pointer', border: 'none' }}>Guides</button>
          <button className="land-nav-link" onClick={() => nav('/challenges')} style={{ color: 'var(--text-soft)', fontSize: '14px', background: 'transparent', cursor: 'pointer', border: 'none' }}>Challenges</button>
          <button className="land-nav-link" onClick={() => nav('/province-wide-challenge')} style={{ color: 'var(--text-soft)', fontSize: '14px', background: 'transparent', cursor: 'pointer', border: 'none' }}>For Leagues</button>
          <button className="land-nav-cta" onClick={() => nav(player ? '/home' : '/start?mode=signin')}>
            {player ? 'My Dashboard →' : 'Get Started →'}
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <article style={{ maxWidth: '720px', margin: '0 auto', padding: '60px 20px 80px' }}>
        <header style={{ marginBottom: 48, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: 16 }}>
            About Me
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-soft)' }}>
            Building tools for hockey families
          </p>
        </header>

        <div style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-soft)' }}>
          <p style={{ marginBottom: 24 }}>
            My name is <strong style={{ color: 'white' }}>Sam Menard</strong>. I'm a business and technology leader who enjoys building things from the ground up—especially when there's an opportunity to take a great idea and turn it into something people actually use.
          </p>

          <p style={{ marginBottom: 24 }}>
            Over the course of my career, I've worked across technology, digital products, startups and large organizations, with a particular focus on launching and scaling businesses in North America and global markets. I've had the opportunity to lead some pretty unique projects, including helping launch the App Store across 90 emerging markets, as well as bringing new products and companies to the Canadian market from the early seed stage through Series B.
          </p>

          <p style={{ marginBottom: 24 }}>
            Today, I'm focused on digital health with the incredible team at Shoppers Drug Mart, where I'm working to make health care more accessible, convenient and connected for Canadians. I'm especially interested in the intersection of technology, AI, personalization and health—and how we can use those tools to create experiences that genuinely make people's lives easier.
          </p>

          <p style={{ marginBottom: 24 }}>
            I've always been drawn to the challenge of taking something that's complicated and making it simple. Whether that means launching a new business, growing a digital product, figuring out how technology can solve a real-world problem, or helping a team turn an idea into reality, that's the work I enjoy most.
          </p>

          {/* The Hockey Story */}
          <div style={{ background: 'rgba(41, 121, 255, 0.08)', border: '1px solid rgba(41, 121, 255, 0.2)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--ice)', marginBottom: 12 }}>
              Why Hockey Shot Challenge
            </h2>
            <p style={{ marginBottom: 16 }}>
              I have two daughters who play rep hockey. Watching them train, compete, and push themselves has been one of the most rewarding parts of my life. But I also noticed something: the gap between practice and off-ice training was huge. Kids would practice twice a week, but what about the other five days? How do they stay sharp? How do they stay motivated?
            </p>
            <p style={{ marginBottom: 16 }}>
              I wanted to create something simple—a tool that made it <strong style={{ color: 'white' }}>easy and fun</strong> for kids to track their off-ice work, see their progress, and compete with teammates. Something coaches could use to see who's putting in the work. Something parents could use to keep their kids engaged. And something that turned solo practice into community.
            </p>
            <p>
              Hockey Shot Challenge is that tool. It's built for kids, coaches, associations, and parents who believe that small, consistent effort adds up to big results. And every feature is designed with one thing in mind: keeping players motivated and making the work visible.
            </p>
          </div>

          <p style={{ marginBottom: 24 }}>
            Outside of work, you'll usually find me around a hockey rink. I'm actively involved in coaching girls' rep hockey, which has taught me at least as much about leadership, motivation and teamwork as any business role ever has. And when I'm not at the rink, there's a pretty good chance I'm watching the Raptors.
          </p>

          <p style={{ marginBottom: 32 }}>
            I'm curious by nature, optimistic about what technology can do, and always interested in what's next.
          </p>

          {/* Contact Section */}
          <div style={{ borderTop: '1px solid var(--border-dim)', paddingTop: 32 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 16 }}>
              Let's Connect
            </h2>
            <p style={{ marginBottom: 20 }}>
              I'd love to hear from you—whether it's feedback on Hockey Shot Challenge, ideas for coaches and associations, or just to chat about hockey and tech.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a
                href="https://www.linkedin.com/in/sammenard/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 18px',
                  background: 'rgba(41, 121, 255, 0.15)',
                  border: '1px solid rgba(41, 121, 255, 0.3)',
                  borderRadius: 8,
                  color: 'var(--ice)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.15s',
                  width: 'fit-content',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(41, 121, 255, 0.25)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(41, 121, 255, 0.15)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <span>💼</span>
                LinkedIn
              </a>
              <a
                href={`mailto:${emailAddress}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 18px',
                  background: 'rgba(61, 214, 140, 0.15)',
                  border: '1px solid rgba(61, 214, 140, 0.3)',
                  borderRadius: 8,
                  color: 'var(--success)',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'all 0.15s',
                  width: 'fit-content',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(61, 214, 140, 0.25)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(61, 214, 140, 0.15)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <span>✉️</span>
                Email
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div style={{ borderTop: '1px solid var(--border-dim)', marginTop: 48, paddingTop: 32 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
              <div>
                <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 12 }}>Learn</h3>
                <button onClick={() => nav('/blog')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', marginBottom: 8 }}>Guides & Tips</button>
                <button onClick={() => nav('/challenges')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', marginBottom: 8 }}>Challenge Tiers</button>
              </div>
              <div>
                <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 12 }}>For Players</h3>
                <button onClick={() => nav('/player')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', marginBottom: 8 }}>Player Dashboard</button>
                <button onClick={() => nav('/start')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', marginBottom: 8 }}>Get Started</button>
              </div>
              <div>
                <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 12 }}>Organizations</h3>
                <button onClick={() => nav('/for-clubs')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', marginBottom: 8 }}>For Clubs</button>
                <button onClick={() => nav('/coach')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', marginBottom: 8 }}>For Coaches</button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <SEOFooter />
    </div>
  )
}
