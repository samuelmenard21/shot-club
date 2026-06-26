import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../lib/seo'
import { getClubBySlug, getClubStats, getClubTeams, getClubWeeklyRecap, getClubTeamRankings } from '../lib/clubs'
import ContactSection from '../components/ContactSection'

export default function ClubScreen() {
  const { slug } = useParams()
  const nav = useNavigate()
  const [club, setClub] = useState(null)
  const [stats, setStats] = useState(null)
  const [teams, setTeams] = useState([])
  const [weeklyRecap, setWeeklyRecap] = useState(null)
  const [teamRankings, setTeamRankings] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const [copiedWeek, setCopiedWeek] = useState(false)

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
          description: "This club hasn't been set up on Hockey Shot Challenge yet.",
          url: `${CANONICAL_URL}/clubs/${slug}`,
          noindex: true,
        })
        return
      }
      setClub(c)
      const [s, t, recap, rankings] = await Promise.all([
        getClubStats(c.id),
        getClubTeams(c.id),
        getClubWeeklyRecap(c.id),
        getClubTeamRankings(c.id),
      ])
      if (cancelled) return
      setStats(s)
      setTeams(t)
      setWeeklyRecap(recap)
      setTeamRankings(rankings)
      setLoading(false)
      const cityPart = c.city ? `, ${c.city}` : ''
      setSEO({
        title: `${c.name}${cityPart} — Off-Ice Training`,
        description: `Off-ice shot tracking and skill training for ${c.name}${cityPart}. Coaches set up teams in 2 minutes. Players log shots and compete on the leaderboard. Free.`,
        url: `${CANONICAL_URL}/clubs/${slug}`,
      })
      addStructuredData({
        '@context': 'https://schema.org',
        '@type': 'SportsOrganization',
        name: c.name,
        sport: 'Ice Hockey',
        url: `${CANONICAL_URL}/clubs/${slug}`,
        ...(c.city ? { address: { '@type': 'PostalAddress', addressLocality: c.city, addressCountry: 'CA' } } : {}),
        memberOf: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: CANONICAL_URL },
      })
    }
    load()
    return () => { cancelled = true }
  }, [slug])

  const clubUrl = `${CANONICAL_URL}/clubs/${slug}`

  const sharePageWithCoaches = async () => {
    const text = club
      ? `Hey coaches — set up your ${club.name} team on Hockey Shot Challenge. Sign in with Google, pick your age and tier, get a player invite link. 2 minutes, free: ${clubUrl}`
      : clubUrl
    try {
      if (navigator.share) {
        await navigator.share({ title: `${club?.name} — Hockey Shot Challenge`, text, url: clubUrl })
        setShared(true)
        setTimeout(() => setShared(false), 2500)
      } else {
        await navigator.clipboard.writeText(clubUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    } catch (e) {}
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(clubUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (e) {}
  }

  const shareWeekStats = async () => {
    if (!weeklyRecap || !club) return
    const lead = teamRankings.find((t) => t.week_shots > 0)
    const leadLine = lead ? ` ${lead.age_division} ${lead.tier} leads with ${lead.week_shots.toLocaleString()} shots.` : ''
    const challengeLine = teamRankings.length > 1 && teamRankings[1]?.week_shots > 0
      ? ` Can ${teamRankings[1].age_division} ${teamRankings[1].tier} catch up by Sunday?`
      : ''
    const text = `${club.name} — ${weeklyRecap.thisWeekTotal.toLocaleString()} shots logged this week.${leadLine}${challengeLine} 🏒 ${clubUrl}`
    try {
      if (navigator.share) {
        await navigator.share({ title: `${club.name} — this week`, text, url: clubUrl })
      } else {
        await navigator.clipboard.writeText(text)
        setCopiedWeek(true)
        setTimeout(() => setCopiedWeek(false), 2500)
      }
    } catch (e) {}
  }

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
          <p className="club-404-text">We couldn't find a club at that URL. Try searching from the home page.</p>
          <button className="club-btn-primary" onClick={() => nav('/')}>← Back to home</button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  const hasActivity = (stats?.playerCount > 0) || (stats?.totalShots > 0)
  const coachSignupLink = `/coach?club=${slug}`
  const playerSignupLink = `/start`

  const emailBody = [
    `Hey coaches,`,
    ``,
    `We're setting up Hockey Shot Challenge for ${club.name} this season. It's a free off-ice training tool for your players — they log shots at home (driveway, basement, wherever), follow skill videos, and compete on a team leaderboard. You can see who's putting in work between practices.`,
    ``,
    `To get your team on the platform:`,
    `1. Go to ${clubUrl}`,
    `2. Sign in with Google`,
    `3. Pick your age group and tier`,
    `4. Get your player invite link and send it to your parents`,
    ``,
    `Takes 2 minutes. Free for coaches, players, and parents.`,
    ``,
    `${clubUrl}`,
  ].join('%0A')
  const emailCoachesHref = `mailto:?subject=Set up your ${club.name} team — Hockey Shot Challenge&body=${emailBody}`

  // ===== INACTIVE CLUB — coach/director first =====
  if (!hasActivity) {
    return (
      <div className="club-screen">
        <ClubNav nav={nav} />

        {/* Top — two paths: coach and director */}
        <section className="club-hero">
          <h1 className="club-h1">
            <span className="club-h1-name">{club.name}</span>
            <span className="club-h1-em">isn't set up yet.</span>
          </h1>
          <p className="club-lede">
            Are you a coach or a director? Pick your path below.
          </p>
          <div className="club-paths">
            {/* Coach card */}
            <div className="club-path-card">
              <div className="club-path-eyebrow">I'M A COACH</div>
              <h2 className="club-path-title">Set up my team</h2>
              <p className="club-path-text">Sign in with Google, pick your age group and tier, get a player invite link. Takes 2 minutes. Free.</p>
              <button className="club-google-btn" onClick={() => nav(coachSignupLink)}>
                <GoogleIcon />
                Set up my team — free
              </button>
            </div>
            {/* Director card */}
            <div className="club-path-card">
              <div className="club-path-eyebrow">I'M A DIRECTOR</div>
              <h2 className="club-path-title">Send to my coaches</h2>
              <p className="club-path-text">Share this page. Each coach sets up their own team independently. You don't need to do anything after that.</p>
              <div className="club-share-row">
                <button className="club-share-btn" onClick={sharePageWithCoaches}>
                  <span>💬</span>
                  {shared ? 'Shared!' : 'Messages'}
                </button>
                <a className="club-share-btn" href={emailCoachesHref}>
                  <span>✉️</span>
                  Email
                </a>
                <button className="club-share-btn" onClick={copyLink}>
                  <span>📋</span>
                  {copied ? 'Copied!' : 'Copy link'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How it works — 3 steps */}
        <section className="club-section">
          <div className="club-eyebrow-left">HOW IT WORKS</div>
          <div className="club-steps">
            <div className="club-step">
              <div className="club-step-num">1</div>
              <div>
                <div className="club-step-title">Sign in with Google</div>
                <div className="club-step-text">No password to create. One tap.</div>
              </div>
            </div>
            <div className="club-step">
              <div className="club-step-num">2</div>
              <div>
                <div className="club-step-title">Pick your team</div>
                <div className="club-step-text">Choose your age division and tier — U12 AAA, U15 A, etc.</div>
              </div>
            </div>
            <div className="club-step">
              <div className="club-step-num">3</div>
              <div>
                <div className="club-step-title">Get your invite link</div>
                <div className="club-step-text">Send it to your players and parents. They sign up in 30 seconds.</div>
              </div>
            </div>
          </div>
        </section>

        {/* What players do */}
        <section className="club-section">
          <div className="club-eyebrow-left">FOR PLAYERS & PARENTS</div>
          <h2 className="club-h2">What your players get.</h2>
          <div className="club-loop">
            <div className="club-loop-card">
              <div className="club-loop-icon">🎯</div>
              <div className="club-loop-verb">LOG</div>
              <h3 className="club-loop-title">Every off-ice shot.</h3>
              <p className="club-loop-text">Driveway, basement, garage — every rep shows up on the team leaderboard. You see the work that used to be invisible.</p>
            </div>
            <div className="club-loop-card">
              <div className="club-loop-icon">📺</div>
              <div className="club-loop-verb">LEARN</div>
              <h3 className="club-loop-title">Skill video library.</h3>
              <p className="club-loop-text">Shooting and stickhandling videos players can follow at home. Growing all season.</p>
            </div>
            <div className="club-loop-card">
              <div className="club-loop-icon">⚔️</div>
              <div className="club-loop-verb">COMPETE</div>
              <h3 className="club-loop-title">Team leaderboard.</h3>
              <p className="club-loop-text">Players compete within the team, across the club, against rivals. You choose the challenge.</p>
            </div>
          </div>
        </section>

        {/* Player notice */}
        <section className="club-section club-player-notice">
          <div className="club-eyebrow-left">FOR PLAYERS & PARENTS</div>
          <h2 className="club-h2">Player at {club.name}?</h2>
          <p className="club-section-text">
            Your coach needs to set up the team first. Ask them to visit this page — it takes 2 minutes. Once they're set up, they'll send you an invite link and you're in.
          </p>
        </section>

        <ContactSection />
        <ClubFooter nav={nav} />
        <style>{styles}</style>
      </div>
    )
  }

  // ===== ACTIVE CLUB — player/parent first, coach secondary =====
  const weekShotsHeadline = weeklyRecap?.thisWeekTotal > 0
    ? `${weeklyRecap.thisWeekTotal.toLocaleString()} shots logged this week.`
    : null

  return (
    <div className="club-screen">
      <ClubNav nav={nav} />

      <section className="club-hero">
        <div className="club-eyebrow">ACTIVE ON HOCKEY SHOT CHALLENGE</div>
        <h1 className="club-h1">
          <span className="club-h1-name">{club.name}</span>
        </h1>
        {weekShotsHeadline ? (
          <p className="club-lede club-lede--headline">{weekShotsHeadline}</p>
        ) : (
          <p className="club-lede">{club.name} players are logging off-ice shots and competing on the team leaderboard.</p>
        )}
        <div className="club-hero-meta">
          <span className="club-hero-meta-item">{stats.teamCount} team{stats.teamCount !== 1 ? 's' : ''}</span>
          <span className="club-hero-meta-dot">·</span>
          <span className="club-hero-meta-item">{stats.playerCount} player{stats.playerCount !== 1 ? 's' : ''}</span>
          <span className="club-hero-meta-dot">·</span>
          <span className="club-hero-meta-item">{stats.totalShots.toLocaleString()} shots all-time</span>
        </div>
        <div className="club-ctas">
          <button className="club-btn-primary" onClick={() => nav(playerSignupLink)}>
            Sign in / Join →
          </button>
        </div>
      </section>

      {/* ── TEAM LEADERBOARD — this week ── */}
      {teamRankings.length > 0 && (
        <section className="club-section">
          <div className="club-section-header">
            <div className="club-eyebrow-left">⚔️ TEAM LEADERBOARD — THIS WEEK</div>
            {weeklyRecap?.thisWeekTotal > 0 && (
              <button className="club-share-week" onClick={shareWeekStats}>
                {copiedWeek ? '✓ Copied!' : 'Share →'}
              </button>
            )}
          </div>
          <div className="club-board">
            {teamRankings.map((t, i) => {
              const isLead = i === 0 && t.week_shots > 0
              const pct = weeklyRecap?.thisWeekTotal > 0
                ? Math.max(4, Math.round((t.week_shots / weeklyRecap.thisWeekTotal) * 100))
                : 0
              return (
                <div key={t.id} className={`club-board-row${isLead ? ' club-board-row--lead' : ''}`}>
                  <div className="club-board-rank">
                    {isLead ? '🥇' : `#${i + 1}`}
                  </div>
                  <div className="club-board-info">
                    <div className="club-board-name">{t.age_division} {t.tier}</div>
                    <div className="club-board-bar-track">
                      <div className="club-board-bar-fill" style={{ width: t.week_shots > 0 ? `${pct}%` : '0%' }} />
                    </div>
                  </div>
                  <div className="club-board-shots">
                    {t.week_shots > 0 ? t.week_shots.toLocaleString() : '—'}
                  </div>
                </div>
              )
            })}
          </div>
          {weeklyRecap?.thisWeekTotal > 0 && (
            <div className="club-board-foot">
              {weeklyRecap.activePlayers} active players this week
              {weeklyRecap.vsLastWeek !== null && (
                <span className={`club-board-delta ${weeklyRecap.vsLastWeek >= 0 ? 'club-board-delta--up' : 'club-board-delta--down'}`}>
                  {weeklyRecap.vsLastWeek >= 0 ? ' ↑' : ' ↓'} {Math.abs(weeklyRecap.vsLastWeek)}% vs last week
                </span>
              )}
            </div>
          )}
          <p className="club-teams-note" style={{ marginTop: 14 }}>
            Don't see your team? Ask your coach to set it up — or{' '}
            <button className="club-inline-link" onClick={() => nav(coachSignupLink)}>set it up yourself</button>.
          </p>
        </section>
      )}

      <section className="club-section">
        <h2 className="club-h2">What {club.name} players do here</h2>
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
            <h3 className="club-loop-title">Skill video library.</h3>
            <p className="club-loop-text">Shooting and stickhandling videos players can follow at home. Growing all season.</p>
          </div>
          <div className="club-loop-card">
            <div className="club-loop-icon">⚔️</div>
            <div className="club-loop-verb">COMPETE</div>
            <h3 className="club-loop-title">Team leaderboard.</h3>
            <p className="club-loop-text">Compete within your team, across the club, against rivals. New challenges each month.</p>
          </div>
        </div>
      </section>

      {/* Coach section */}
      <section className="club-section club-coach-cta">
        <div className="club-coach-inner">
          <div className="club-coach-text">
            <div className="club-coach-eyebrow">FOR COACHES</div>
            <h2 className="club-coach-title">Coach at {club.name}?</h2>
            <p className="club-coach-sub">
              Set up your team in 2 minutes. Sign in with Google, pick your age and tier, get your player invite link.
            </p>
          </div>
          <div className="club-coach-actions">
            <button className="club-google-btn club-google-btn--sm" onClick={() => nav(coachSignupLink)}>
              <GoogleIcon />
              Set up my team
            </button>
            <button className="club-coach-dash" onClick={() => nav('/coach/dashboard')}>
              Go to my dashboard →
            </button>
          </div>
        </div>
      </section>

      {/* Director share */}
      <section className="club-section club-director">
        <div className="club-eyebrow-left">FOR DIRECTORS & ADMINS</div>
        <h2 className="club-h2">Adding more teams?</h2>
        <p className="club-section-text">
          Send this page to any coach who hasn't set up their team yet. They sign in with Google, pick their team, and get their own player invite link.
        </p>
        <div className="club-share-row">
          <button className="club-share-btn" onClick={sharePageWithCoaches}>
            <span>💬</span>
            {shared ? 'Shared!' : 'Share via messages'}
          </button>
          <a className="club-share-btn" href={emailCoachesHref}>
            <span>✉️</span>
            Email coaches
          </a>
          <button className="club-share-btn" onClick={copyLink}>
            <span>📋</span>
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      </section>

      <ContactSection />
      <ClubFooter nav={nav} />
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

function ClubFooter({ nav }) {
  return (
    <footer className="club-footer">
      <BrandLink nav={nav} />
      <div className="club-foot-links">
        <Link to="/" className="club-foot-link">Home</Link>
        <Link to="/for-clubs" className="club-foot-link">For Clubs</Link>
      </div>
      <div className="club-foot-copy">© {new Date().getFullYear()} Hockey Shot Challenge · Built in Burlington, ON</div>
    </footer>
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
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px clamp(16px, 5vw, 24px);
  border-bottom: 0.5px solid var(--border-dim);
}
.club-brand {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--font-display); font-weight: 800; font-size: 14px;
  letter-spacing: 0.5px; color: white; background: transparent; padding: 0; cursor: pointer;
}
.club-nav-link { background: transparent; color: var(--text-soft); font-size: 14px; padding: 6px 10px; }
.club-nav-link:hover { color: white; }

.club-loading {
  padding: 80px 24px; text-align: center; color: var(--text-mute);
  font-family: var(--font-display); letter-spacing: 1.5px; font-size: 12px;
}
.club-404 { padding: 80px clamp(16px, 5vw, 24px); text-align: center; }
.club-404-title { font-family: var(--font-display); font-size: 32px; font-weight: 800; color: white; margin: 0 0 12px; }
.club-404-text { color: var(--text-soft); font-size: 16px; margin: 0 0 24px; }

.club-hero {
  padding: 40px clamp(16px, 5vw, 24px) 32px;
  text-align: left;
}
.club-eyebrow {
  display: inline-block;
  font-family: var(--font-display); font-size: 11px; font-weight: 600;
  color: var(--ice); letter-spacing: 2px;
  background: var(--accent-bg); padding: 6px 12px; border-radius: 999px; margin-bottom: 16px;
}
.club-eyebrow-left {
  font-family: var(--font-display); font-size: 10px; font-weight: 700;
  color: var(--accent); letter-spacing: 2px; margin-bottom: 10px;
}
.club-h1 {
  font-family: var(--font-display); font-size: clamp(28px, 5.5vw, 42px);
  font-weight: 800; line-height: 1.05; letter-spacing: -0.3px; color: white; margin: 0 0 16px;
}
.club-h1-name { display: block; color: white; }
.club-h1-em { display: block; color: var(--ice); margin-top: 4px; }
.club-lede { font-size: 16px; line-height: 1.55; color: var(--text-soft); margin: 0 0 24px; }
.club-ctas { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-bottom: 16px; }

.club-share-link {
  background: transparent; color: var(--text-mute); font-size: 13px;
  padding: 6px; cursor: pointer; display: block; margin: 0 auto;
  transition: color 0.15s;
}
.club-share-link:hover { color: var(--ice); }

.club-google-btn {
  display: inline-flex; align-items: center; gap: 10px;
  background: white; color: #3c4043;
  border-radius: 10px; padding: 14px 20px;
  font-size: 15px; font-weight: 700; font-family: var(--font-body);
  cursor: pointer; transition: box-shadow 0.15s;
}
.club-google-btn:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.2); }
.club-google-btn--sm { padding: 11px 16px; font-size: 14px; }

.club-btn-primary {
  background: var(--accent); color: white; padding: 13px 22px; border-radius: 10px;
  font-family: var(--font-display); font-size: 15px; font-weight: 700; letter-spacing: 0.4px;
  transition: transform 0.1s, background 0.15s;
}
.club-btn-primary:hover { background: var(--accent-soft); }
.club-btn-primary:active { transform: scale(0.98); }

.club-section {
  padding: 36px clamp(16px, 5vw, 24px);
  border-top: 0.5px solid var(--border-dim);
}
.club-h2 {
  font-family: var(--font-display); font-size: clamp(22px, 4vw, 28px);
  font-weight: 800; letter-spacing: -0.2px; color: white; margin: 0 0 14px;
}
.club-section-text { color: var(--text-soft); font-size: 15px; line-height: 1.6; margin: 0 0 20px; }

/* Steps */
.club-steps { display: flex; flex-direction: column; gap: 14px; }
.club-step {
  display: flex; align-items: flex-start; gap: 14px;
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 12px; padding: 16px;
}
.club-step-num {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--accent); color: white;
  font-family: var(--font-display); font-size: 14px; font-weight: 800;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.club-step-title { font-family: var(--font-display); font-weight: 800; font-size: 15px; color: white; margin-bottom: 3px; }
.club-step-text { font-size: 13px; color: var(--text-mute); line-height: 1.4; }

/* Two-path cards */
.club-paths { display: grid; grid-template-columns: 1fr; gap: 16px; width: 100%; text-align: left; }
@media (min-width: 600px) { .club-paths { grid-template-columns: 1fr 1fr; } }
.club-path-card {
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 16px; padding: 22px; display: flex; flex-direction: column; gap: 12px;
}
.club-path-eyebrow {
  font-family: var(--font-display); font-size: 10px; font-weight: 700;
  color: var(--accent); letter-spacing: 2px;
}
.club-path-title {
  font-family: var(--font-display); font-size: 20px; font-weight: 800; color: white; margin: 0;
}
.club-path-text { font-size: 14px; color: var(--text-soft); line-height: 1.5; margin: 0; }

/* Player notice */
.club-player-notice { background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.03)); }

/* Share row */
.club-director { background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.04)); }
.club-share-row { display: flex; gap: 10px; flex-wrap: wrap; }
.club-share-btn {
  display: flex; align-items: center; gap: 8px;
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 10px; padding: 11px 16px;
  font-size: 13px; font-weight: 600; color: var(--text-soft);
  cursor: pointer; transition: border-color 0.15s, color 0.15s;
  text-decoration: none; font-family: var(--font-body);
}
.club-share-btn:hover { border-color: var(--accent); color: white; }

/* Stats */
.club-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.club-stat {
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 12px; padding: 18px 12px; text-align: center;
}
.club-stat-num {
  font-family: var(--font-display); font-size: clamp(24px, 5vw, 36px);
  font-weight: 800; color: var(--ice); line-height: 1; font-variant-numeric: tabular-nums;
}
.club-stat-label {
  font-family: var(--font-display); font-size: 11px; color: var(--text-mute);
  letter-spacing: 1.5px; text-transform: uppercase; font-weight: 600; margin-top: 8px;
}

/* Teams */
.club-teams { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
.club-team {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 16px; background: var(--surface);
  border: 0.5px solid var(--border-dim); border-radius: 10px;
}
.club-team-name { font-family: var(--font-display); font-weight: 700; color: white; font-size: 15px; }
.club-team-code { font-family: var(--font-display); font-size: 11px; color: var(--text-mute); letter-spacing: 1.5px; font-weight: 600; }
.club-teams-note { font-size: 13px; color: var(--text-mute); margin: 0; }
.club-inline-link { color: var(--accent); font-size: 13px; background: transparent; padding: 0; cursor: pointer; font-weight: 600; }

/* Feature cards */
.club-loop { display: grid; grid-template-columns: 1fr; gap: 12px; }
@media (min-width: 700px) { .club-loop { grid-template-columns: repeat(3, 1fr); } }
.club-loop-card { background: var(--surface); border: 0.5px solid var(--border-dim); border-radius: 12px; padding: 20px; }
.club-loop-icon { font-size: 28px; margin-bottom: 10px; }
.club-loop-verb { font-family: var(--font-display); font-size: 10px; font-weight: 700; letter-spacing: 2px; color: var(--accent); margin-bottom: 5px; }
.club-loop-title { font-family: var(--font-display); font-size: 18px; font-weight: 800; color: white; margin: 0 0 8px; }
.club-loop-text { font-size: 14px; color: var(--text-soft); line-height: 1.5; margin: 0; }

/* Parents */
.club-families { background: linear-gradient(180deg, var(--bg), rgba(41,121,255,0.04)); }

/* Coach CTA (active club) */
.club-coach-cta {
  background: linear-gradient(135deg, rgba(41,121,255,0.08), rgba(41,121,255,0.03));
  border-top: 0.5px solid rgba(41,121,255,0.2);
  border-bottom: 0.5px solid rgba(41,121,255,0.2);
}
.club-coach-inner { display: flex; flex-direction: column; gap: 18px; }
@media (min-width: 600px) {
  .club-coach-inner { flex-direction: row; align-items: center; justify-content: space-between; }
}
.club-coach-eyebrow { font-family: var(--font-display); font-size: 10px; font-weight: 700; letter-spacing: 2px; color: var(--accent); margin-bottom: 6px; }
.club-coach-title { font-family: var(--font-display); font-size: clamp(20px, 3.5vw, 26px); font-weight: 800; color: white; margin: 0 0 6px; }
.club-coach-sub { font-size: 14px; color: var(--text-soft); line-height: 1.5; margin: 0; }
.club-coach-actions { display: flex; flex-direction: column; gap: 8px; flex-shrink: 0; }
.club-coach-dash { color: var(--accent); font-size: 13px; font-weight: 600; background: transparent; padding: 4px 0; cursor: pointer; text-align: left; }

/* Hero meta line */
.club-lede--headline {
  font-family: var(--font-display); font-size: clamp(20px, 4vw, 28px);
  font-weight: 800; color: var(--ice); line-height: 1.1; margin-bottom: 10px;
}
.club-hero-meta {
  display: flex; gap: 6px; flex-wrap: wrap;
  font-size: 13px; color: var(--text-mute); margin-bottom: 24px; align-items: center;
}
.club-hero-meta-dot { color: var(--border-dim); }

/* Section header row */
.club-section-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;
}
.club-section-header .club-eyebrow-left { margin-bottom: 0; }
.club-share-week {
  font-family: var(--font-display); font-size: 12px; font-weight: 700;
  color: var(--accent); background: transparent; padding: 0; cursor: pointer;
  letter-spacing: 0.3px; transition: opacity 0.15s;
}
.club-share-week:hover { opacity: 0.75; }

/* Team leaderboard board */
.club-board { display: flex; flex-direction: column; gap: 8px; }
.club-board-row {
  display: flex; align-items: center; gap: 12px;
  background: var(--surface); border: 0.5px solid var(--border-dim);
  border-radius: 12px; padding: 14px 16px;
  transition: border-color 0.15s;
}
.club-board-row--lead {
  border-color: #f4c542;
  background: linear-gradient(90deg, rgba(244,197,66,0.07), var(--surface));
}
.club-board-rank {
  font-family: var(--font-display); font-size: 13px; font-weight: 800;
  color: var(--text-mute); min-width: 28px; text-align: center; flex-shrink: 0;
}
.club-board-row--lead .club-board-rank { color: #f4c542; }
.club-board-info { flex: 1; min-width: 0; }
.club-board-name {
  font-family: var(--font-display); font-weight: 700; font-size: 15px; color: white;
  margin-bottom: 6px;
}
.club-board-bar-track {
  height: 4px; background: rgba(168,212,245,0.1); border-radius: 2px; overflow: hidden;
}
.club-board-bar-fill {
  height: 100%; border-radius: 2px;
  background: linear-gradient(90deg, var(--accent), var(--ice));
  transition: width 0.4s ease;
}
.club-board-row--lead .club-board-bar-fill { background: linear-gradient(90deg, #f4c542, #fde68a); }
.club-board-shots {
  font-family: var(--font-display); font-size: 18px; font-weight: 800;
  color: var(--ice); font-variant-numeric: tabular-nums; flex-shrink: 0; min-width: 52px; text-align: right;
}
.club-board-row--lead .club-board-shots { color: #f4c542; }
.club-board-foot {
  font-size: 12px; color: var(--text-mute); margin-top: 10px;
}
.club-board-delta { font-weight: 600; }
.club-board-delta--up { color: #22c55e; }
.club-board-delta--down { color: #ef4444; }

/* Footer */
.club-footer {
  padding: 24px clamp(16px, 5vw, 24px); text-align: center;
  border-top: 0.5px solid var(--border-dim);
  display: flex; flex-direction: column; gap: 10px; align-items: center;
}
.club-foot-links { display: flex; gap: 16px; }
.club-foot-link { color: var(--text-soft); font-size: 13px; text-decoration: none; }
.club-foot-link:hover { color: white; }
.club-foot-copy { font-size: 12px; color: var(--text-mute); }
`
