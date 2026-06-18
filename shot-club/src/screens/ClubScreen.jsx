import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'
import { getClubBySlug, getClubStats, getClubTeams } from '../lib/clubs'
import ContactSection from '../components/ContactSection'

export default function ClubScreen() {
  const { slug } = useParams()
  const nav = useNavigate()
  const [club, setClub] = useState(null)
  const [stats, setStats] = useState(null)
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const c = await getClubBySlug(slug)
      if (cancelled) return
      if (!c) {
        setNotFound(true)
        setLoading(false)
        setSEO({
          title: 'Club not found',
          description: 'This club hasn\'t been set up on Hockey Shot Challenge yet.',
          url: `${CANONICAL_URL}/clubs/${slug}`,
          noindex: true,
        })
        return
      }

      setClub(c)
      const [s, t] = await Promise.all([
        getClubStats(c.id),
        getClubTeams(c.id),
      ])
      if (cancelled) return
      setStats(s)
      setTeams(t)
      setLoading(false)

      const cityPart = c.city ? `, ${c.city}` : ''
      setSEO({
        title: `${c.name}${cityPart} — Off-Ice Training`,
        description: `Off-ice training and shot tracking for ${c.name}${cityPart}. Log your shots, learn a new skill every day, and compete on the team leaderboard. Free for the whole club.`,
        url: `${CANONICAL_URL}/clubs/${slug}`,
      })

      addStructuredData({
        '@context': 'https://schema.org',
        '@type': 'SportsOrganization',
        name: c.name,
        sport: 'Ice Hockey',
        url: `${CANONICAL_URL}/clubs/${slug}`,
        ...(c.city ? {
          address: {
            '@type': 'PostalAddress',
            addressLocality: c.city,
            addressCountry: 'CA',
          },
        } : {}),
        memberOf: {
          '@type': 'Organization',
          name: 'Hockey Shot Challenge',
          url: CANONICAL_URL,
        },
      })
    }
    load()
    return () => { cancelled = true }
  }, [slug])

  if (loading) {
    return (
      <div className="club-screen">
        <ClubNav nav={nav} />
        <div className="club-loading">Loading…</div>
        <style>{styles}</style>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="club-screen">
        <ClubNav nav={nav} />
        <div className="club-404">
          <h1 className="club-404-title">Club not found.</h1>
          <p className="club-404-text">
            We couldn't find a club with that slug. It may have been removed, or the link might be wrong.
          </p>
          <button className="club-btn-primary" onClick={() => nav('/')}>← Back to home</button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  const hasActivity = (stats?.playerCount > 0) || (stats?.totalShots > 0)
  const cityPart = club.city ? `, ${club.city}` : ''
  const coachSignupLink = `/coach?club=${slug}`
  const playerSignupLink = `/start`

  return (
    <div className="club-screen">
      <ClubNav nav={nav} />

      <section className="club-hero">
        <div className="club-eyebrow">
          {hasActivity ? 'ACTIVE ON HOCKEY SHOT CHALLENGE' : 'JOIN THE CHALLENGE'}
        </div>
        <h1 className="club-h1">
          {hasActivity ? (
            <>
              <span className="club-h1-name">{club.name}</span>
              <span className="club-h1-em">is climbing the leaderboard.</span>
            </>
          ) : (
            <>
              <span className="club-h1-name">{club.name}</span>
              <span className="club-h1-em">isn't on the platform yet.</span>
            </>
          )}
        </h1>
        <p className="club-lede">
          {hasActivity ? (
            <>
              {club.name}{cityPart} is tracking off-ice shots, learning new skills, and competing in challenges. See team progress, climb your team's leaderboard, or bring more parents on board.
            </>
          ) : (
            <>
              Hockey Shot Challenge is an off-ice training platform for youth hockey clubs. Players log shots, browse a growing skill video library, and compete in challenges. {club.name}{cityPart} families can be the first to bring the club on board.
            </>
          )}
        </p>

        <div className="club-ctas">
          {hasActivity ? (
            <>
              <button className="club-btn-primary" onClick={() => nav(playerSignupLink)}>
                Sign in →
              </button>
              <button className="club-btn-ghost" onClick={() => nav(coachSignupLink)}>
                I'm a coach
              </button>
            </>
          ) : (
            <>
              <button className="club-btn-primary" onClick={() => nav(coachSignupLink)}>
                Bring {club.name} on board →
              </button>
              <button className="club-btn-ghost" onClick={() => nav('/')}>
                Learn more
              </button>
            </>
          )}
        </div>
      </section>

      {hasActivity && (
        <section className="club-section">
          <div className="club-stats">
            <div className="club-stat">
              <div className="club-stat-num">{stats.playerCount.toLocaleString()}</div>
              <div className="club-stat-label">Players</div>
            </div>
            <div className="club-stat">
              <div className="club-stat-num">{stats.teamCount.toLocaleString()}</div>
              <div className="club-stat-label">Teams</div>
            </div>
            <div className="club-stat">
              <div className="club-stat-num">{stats.totalShots.toLocaleString()}</div>
              <div className="club-stat-label">Shots logged</div>
            </div>
          </div>
        </section>
      )}

      {teams.length > 0 && (
        <section className="club-section">
          <h2 className="club-h2">Teams in {club.name}</h2>
          <div className="club-teams">
            {teams.map((t) => (
              <div key={t.id} className="club-team">
                <span className="club-team-name">{t.name}</span>
                <span className="club-team-code">CODE {t.code}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="club-section">
        <h2 className="club-h2">
          {hasActivity ? `What ${club.name} families do here` : `What ${club.name} families would do here`}
        </h2>
        <div className="club-loop">
          <div className="club-loop-card">
            <div className="club-loop-icon">🎯</div>
            <div className="club-loop-verb">LOG</div>
            <h3 className="club-loop-title">Every off-ice shot.</h3>
            <p className="club-loop-text">Driveway, basement, garage — every rep shows up on the team leaderboard. Coaches see the work that used to be invisible.</p>
          </div>
          <div className="club-loop-card">
            <div className="club-loop-icon">📺</div>
            <div className="club-loop-verb">LEARN</div>
            <h3 className="club-loop-title">A growing skill library.</h3>
            <p className="club-loop-text">Short skill videos — stickhandling, shooting, edge work — matched to the player's age. Browse anytime.</p>
          </div>
          <div className="club-loop-card">
            <div className="club-loop-icon">⚔️</div>
            <div className="club-loop-verb">CHALLENGE</div>
            <h3 className="club-loop-title">Beat your rivals.</h3>
            <p className="club-loop-text">Teammate this week. Rival team next month. Whole club across town for the season. Pick your battle.</p>
          </div>
        </div>
      </section>

      <section className="club-section club-families">
        <h2 className="club-h2">
          {hasActivity ? `For ${club.name} parents` : `Calling all ${club.name} parents`}
        </h2>
        <p className="club-section-text">
          {hasActivity ? (
            <>
              If your kid plays for {club.name}, ask your coach for the team's invite link. Your kid logs their off-ice shots from home, browses the skill library, and watches their team climb. Free for all {club.name} families.
            </>
          ) : (
            <>
              Hockey Shot Challenge isn't active at {club.name} yet — but it's free to bring on board. Forward this page to your team coach, your hockey director, or anyone else at {club.name} who can sign the club up. Three minutes per team to set up. No app to install.
            </>
          )}
        </p>
      </section>

      <section className="club-section club-coach-cta">
        <div className="club-coach-inner">
          <div className="club-coach-text">
            <div className="club-coach-eyebrow">FOR COACHES</div>
            <h2 className="club-coach-title">Coach at {club.name}?</h2>
            <p className="club-coach-sub">Set up your team in 2 minutes. Pick your age and tier, get a link, send it to your parents. Free.</p>
          </div>
          <button
            className="club-coach-btn"
            onClick={() => nav(coachSignupLink)}
          >
            <GoogleIcon />
            Set up my team →
          </button>
        </div>
      </section>

      <section className="club-section club-final">
        <h2 className="club-h2">
          {hasActivity ? `Ready to log your shots for ${club.name}?` : `Be the parent who brought ${club.name} on board.`}
        </h2>
        <button className="club-btn-primary" onClick={() => nav(hasActivity ? playerSignupLink : coachSignupLink)}>
          {hasActivity ? 'Sign in →' : `Sign up ${club.name} →`}
        </button>
        <div className="club-final-sub">
          Free for clubs, coaches, players, and parents.
        </div>
      </section>

      <ContactSection />

      <footer className="club-footer">
        <BrandLink nav={nav} />
        <div className="club-foot-links">
          <Link to="/" className="club-foot-link">Home</Link>
          <Link to="/for-clubs" className="club-foot-link">For Clubs</Link>
        </div>
        <div className="club-foot-copy">
          © {new Date().getFullYear()} Hockey Shot Challenge · Built in Burlington, ON
        </div>
      </footer>

      <style>{styles}</style>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

function ClubNav({ nav }) {
  return (
    <nav className="club-nav">
      <BrandLink nav={nav} />
      <button className="club-nav-link" onClick={() => nav('/')}>← Home</button>
    </nav>
  )
}

function BrandLink({ nav }) {
  return (
    <button className="club-brand" onClick={() => nav('/')}>
      <svg width="24" height="24" viewBox="0 0 40 40" style={{ display: 'block', flexShrink: 0 }}>
        <circle cx="20" cy="20" r="17" fill="#1a2847" stroke="#2979ff" strokeWidth="1" />
        <path d="M 12 22 L 17.5 27 L 28 15" stroke="#a8d4f5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>Hockey Shot Challenge</span>
    </button>
  )
}

const styles = `
.club-screen {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
  overflow-x: hidden;
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}
body:has(.club-screen) { background: var(--bg) !important; }

.club-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px clamp(16px, 5vw, 24px);
  border-bottom: 0.5px solid var(--border-dim);
}
.club-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.5px;
  color: white;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.club-nav-link {
  background: transparent;
  color: var(--text-soft);
  font-size: 14px;
  padding: 6px 10px;
}
.club-nav-link:hover { color: white; }

.club-loading {
  padding: 80px 24px;
  text-align: center;
  color: var(--text-mute);
  font-family: var(--font-display);
  letter-spacing: 1.5px;
  font-size: 12px;
}
.club-404 {
  padding: 80px clamp(16px, 5vw, 24px);
  text-align: center;
}
.club-404-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 800;
  color: white;
  margin: 0 0 12px;
}
.club-404-text {
  color: var(--text-soft);
  font-size: 16px;
  margin: 0 0 24px;
}

.club-hero {
  padding: 40px clamp(16px, 5vw, 24px) 32px;
  text-align: center;
}
.club-eyebrow {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  background: var(--accent-bg);
  padding: 6px 12px;
  border-radius: 999px;
  margin-bottom: 16px;
}
.club-h1 {
  font-family: var(--font-display);
  font-size: clamp(28px, 5.5vw, 42px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.3px;
  color: white;
  margin: 0 0 16px;
}
.club-h1-name {
  display: block;
  color: white;
}
.club-h1-em {
  display: block;
  color: var(--ice);
  margin-top: 4px;
}
.club-lede {
  font-size: 16px;
  line-height: 1.55;
  color: var(--text-soft);
  margin: 0 0 28px;
}
.club-ctas {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.club-btn-primary {
  background: var(--accent);
  color: white;
  padding: 13px 22px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.4px;
  transition: transform 0.1s, background 0.15s;
}
.club-btn-primary:hover { background: var(--accent-soft); }
.club-btn-primary:active { transform: scale(0.98); }
.club-btn-ghost {
  background: transparent;
  color: var(--ice);
  padding: 13px 20px;
  border-radius: 10px;
  border: 0.5px solid var(--border);
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.3px;
}
.club-btn-ghost:hover { background: var(--surface); }

.club-section {
  padding: 36px clamp(16px, 5vw, 24px);
  border-top: 0.5px solid var(--border-dim);
}
.club-h2 {
  font-family: var(--font-display);
  font-size: clamp(22px, 4vw, 28px);
  font-weight: 800;
  letter-spacing: -0.2px;
  color: white;
  margin: 0 0 14px;
}
.club-section-text {
  color: var(--text-soft);
  font-size: 15px;
  line-height: 1.6;
  margin: 0;
}

.club-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.club-stat {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 12px;
  padding: 18px 12px;
  text-align: center;
}
.club-stat-num {
  font-family: var(--font-display);
  font-size: clamp(24px, 5vw, 36px);
  font-weight: 800;
  color: var(--ice);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.club-stat-label {
  font-family: var(--font-display);
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 8px;
}

.club-teams {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.club-team {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 10px;
}
.club-team-name {
  font-family: var(--font-display);
  font-weight: 700;
  color: white;
  font-size: 15px;
}
.club-team-code {
  font-family: var(--font-display);
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  font-weight: 600;
}

.club-loop {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
@media (min-width: 700px) {
  .club-loop { grid-template-columns: repeat(3, 1fr); }
}
.club-loop-card {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 12px;
  padding: 20px;
}
.club-loop-icon {
  font-size: 28px;
  margin-bottom: 10px;
}
.club-loop-verb {
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--accent);
  margin-bottom: 5px;
}
.club-loop-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 800;
  color: white;
  margin: 0 0 8px;
}
.club-loop-text {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.5;
  margin: 0;
}

.club-families {
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.04));
}

.club-coach-cta {
  background: linear-gradient(135deg, rgba(41,121,255,0.08), rgba(41,121,255,0.03));
  border: 0.5px solid rgba(41,121,255,0.2);
  border-radius: 16px;
  margin: 0 clamp(16px, 5vw, 24px);
}
.club-coach-inner {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
@media (min-width: 600px) {
  .club-coach-inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
.club-coach-eyebrow {
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--accent);
  margin-bottom: 6px;
}
.club-coach-title {
  font-family: var(--font-display);
  font-size: clamp(20px, 3.5vw, 26px);
  font-weight: 800;
  color: white;
  margin: 0 0 6px;
}
.club-coach-sub {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.5;
  margin: 0;
}
.club-coach-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  color: #3c4043;
  border-radius: 10px;
  padding: 13px 20px;
  font-size: 14px;
  font-weight: 700;
  font-family: var(--font-body);
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
  transition: box-shadow 0.15s;
}
.club-coach-btn:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.2); }

.club-final {
  text-align: center;
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.08));
}
.club-final-sub {
  font-size: 13px;
  color: var(--text-mute);
  margin-top: 14px;
}

.club-footer {
  padding: 24px clamp(16px, 5vw, 24px);
  text-align: center;
  font-size: 12px;
  color: var(--text-mute);
  border-top: 0.5px solid var(--border-dim);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}
.club-foot-links {
  display: flex;
  gap: 16px;
}
.club-foot-link {
  color: var(--text-soft);
  font-size: 13px;
  text-decoration: none;
}
.club-foot-link:hover { color: white; }
.club-foot-copy {
  font-size: 12px;
  color: var(--text-mute);
}
`
