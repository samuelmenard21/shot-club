import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getClubBySlug, getClubStats, getClubTeams } from '../lib/clubs'
import { setSEO, CANONICAL_URL } from '../lib/seo'

export default function ClubJoinScreen() {
  const { slug } = useParams()
  const nav = useNavigate()
  const [club, setClub] = useState(null)
  const [stats, setStats] = useState({ playerCount: 0, teamCount: 0, totalShots: 0 })
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    ;(async () => {
      const c = await getClubBySlug(slug)
      if (!c) {
        setNotFound(true)
        setLoading(false)
        setSEO({
          title: 'Club not found',
          noindex: true,
        })
        return
      }
      setClub(c)
      const [s, t] = await Promise.all([getClubStats(c.id), getClubTeams(c.id)])
      setStats(s)
      setTeams(t)
      setLoading(false)

      setSEO({
        title: `Join ${c.name}`,
        description: `${c.name} is on Hockey Shot Challenge. ${s.playerCount} players, ${s.totalShots.toLocaleString()}+ shots logged. Join your team today.`,
        url: `${CANONICAL_URL}/join/${c.slug}`,
      })
    })()
  }, [slug])

  if (loading) {
    return (
      <div className="join-wrap join-loading">
        <div>Loading…</div>
        <style>{styles}</style>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="join-wrap">
        <div className="join-card">
          <h1 className="join-title">Club not found</h1>
          <p className="join-sub">We couldn't find a club at that link. Double-check with the person who sent it.</p>
          <button className="btn-primary-join" onClick={() => nav('/')}>Go to Hockey Shot Challenge</button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  return (
    <div className="join-wrap">
      <div className="join-card">
        <div className="join-brand">
          <BrandMark />
          <span>Hockey Shot Challenge</span>
        </div>

        <div className="join-crest">
          <div className="join-crest-letter">{club.name[0]?.toUpperCase()}</div>
        </div>

        <div className="join-eyebrow">YOU'VE BEEN INVITED TO JOIN</div>
        <h1 className="join-title">{club.name}</h1>
        {club.city && <div className="join-city">{club.city}</div>}

        <div className="join-stats">
          <div className="stat">
            <div className="stat-num tnum">{stats.playerCount}</div>
            <div className="stat-label">Players</div>
          </div>
          <div className="stat">
            <div className="stat-num tnum">{stats.teamCount}</div>
            <div className="stat-label">Teams</div>
          </div>
          <div className="stat">
            <div className="stat-num tnum">{stats.totalShots.toLocaleString()}</div>
            <div className="stat-label">Shots</div>
          </div>
        </div>

        <button className="btn-primary-join" onClick={() => nav(`/start?club=${club.slug}`)}>
          Join {club.name} →
        </button>

        <div className="join-hint">
          Takes 30 seconds. No email needed.
        </div>

        {teams.length > 0 && (
          <div className="join-teams">
            <div className="join-teams-label">TEAMS IN THIS CLUB</div>
            <div className="join-teams-list">
              {teams.slice(0, 10).map((t) => (
                <div key={t.id} className="join-team-pill">{t.name}</div>
              ))}
              {teams.length > 10 && (
                <div className="join-team-pill">+{teams.length - 10} more</div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="join-foot">
        <button className="join-foot-link" onClick={() => nav('/')}>
          What is Hockey Shot Challenge? →
        </button>
      </div>

      <style>{styles}</style>
    </div>
  )
}

function BrandMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" style={{ display: 'block', flexShrink: 0 }}>
      <circle cx="20" cy="20" r="17" fill="#1a2847" stroke="#2979ff" strokeWidth="1" />
      <path d="M 12 22 L 17.5 27 L 28 15" stroke="#a8d4f5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const styles = `
.join-wrap {
  min-height: 100dvh;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 20px 16px 40px;
  background: linear-gradient(180deg, var(--bg), rgba(41, 121, 255, 0.08));
  width: 100%; max-width: none;
}
.join-loading {
  color: var(--text-mute);
  font-family: var(--font-display);
  letter-spacing: 2px;
  font-size: 12px;
}
.join-card {
  width: 100%; max-width: 420px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 24px;
  padding: 28px 24px;
  text-align: center;
  position: relative;
}
.join-brand {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  font-family: var(--font-display);
  font-size: 12px; font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-soft);
  margin-bottom: 24px;
  text-transform: uppercase;
}
.join-crest {
  width: 76px; height: 76px;
  margin: 0 auto 20px;
  background: var(--accent-bg);
  border: 2px solid var(--accent);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 36px; font-weight: 800;
  color: white;
  letter-spacing: 1px;
}
.join-crest-letter { line-height: 1; }
.join-eyebrow {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  margin-bottom: 10px;
}
.join-title {
  font-family: var(--font-display);
  font-size: clamp(28px, 6vw, 36px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: 0.3px;
  color: white;
  margin: 0 0 6px;
}
.join-city {
  font-size: 14px;
  color: var(--text-mute);
  margin-bottom: 24px;
}
.join-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 24px;
  padding: 16px;
  background: var(--bg);
  border-radius: var(--radius);
}
.stat { text-align: center; }
.stat-num {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  color: var(--ice);
  line-height: 1;
}
.stat-label {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  margin-top: 5px;
  text-transform: uppercase;
}

.btn-primary-join {
  width: 100%;
  background: var(--accent);
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.5px;
  transition: transform 0.1s, background 0.15s;
  margin-bottom: 10px;
}
.btn-primary-join:hover { background: var(--accent-soft); }
.btn-primary-join:active { transform: scale(0.98); }

.join-hint {
  font-size: 12px;
  color: var(--text-mute);
  margin-bottom: 20px;
}

.join-teams {
  padding-top: 20px;
  border-top: 0.5px solid var(--border-dim);
}
.join-teams-label {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  margin-bottom: 10px;
  font-weight: 500;
}
.join-teams-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}
.join-team-pill {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  color: var(--ice);
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-display);
  letter-spacing: 0.4px;
}

.join-foot {
  margin-top: 20px;
  text-align: center;
}
.join-foot-link {
  color: var(--text-mute);
  font-size: 13px;
  padding: 8px 16px;
}
.join-foot-link:hover { color: var(--ice); }
`
