import { useEffect, useState, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getClubBySlug, getClubStats, getClubTeams } from '../lib/clubs'
import { getLeaderboardLifetime } from '../lib/shots'
import { supabase } from '../lib/supabase'

const TODAY_REFRESH_MS = 15000

export default function ClubScreen() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { player } = useAuth()

  const [club, setClub] = useState(undefined)
  const [stats, setStats] = useState({ playerCount: 0, teamCount: 0, totalShots: 0 })
  const [teams, setTeams] = useState([])
  const [lifetime, setLifetime] = useState([])
  const [todayLeader, setTodayLeader] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [todayPulse, setTodayPulse] = useState(false)

  useEffect(() => {
    let cancelled = false
    setClub(undefined)
    getClubBySlug(slug).then((c) => {
      if (cancelled) return
      setClub(c || null)
    })
    return () => { cancelled = true }
  }, [slug])

  useEffect(() => {
    if (!club) return
    let cancelled = false

    Promise.all([
      getClubStats(club.id),
      getClubTeams(club.id),
      getLeaderboardLifetime({ clubName: club.name, limit: 25 }),
    ]).then(([s, t, l]) => {
      if (cancelled) return
      setStats(s)
      setTeams(t)
      setLifetime(l.filter((p) => (p.lifetime_shots || 0) > 0))
    })

    return () => { cancelled = true }
  }, [club])

  useEffect(() => {
    if (!club) return
    let cancelled = false

    const fetchTodayLeader = async () => {
      try {
        const today = new Date().toISOString().slice(0, 10)
        const { data: clubPlayers } = await supabase
          .from('players')
          .select('id, display_name, team:teams(name)')
          .eq('club_name', club.name)
        if (cancelled || !clubPlayers || clubPlayers.length === 0) {
          if (!cancelled) setTodayLeader(null)
          return
        }
        const ids = clubPlayers.map((p) => p.id)

        const { data: logs } = await supabase
          .from('shot_logs')
          .select('player_id, count')
          .in('player_id', ids)
          .eq('log_date', today)
        if (cancelled) return

        const totals = {}
        ;(logs || []).forEach((r) => {
          totals[r.player_id] = (totals[r.player_id] || 0) + r.count
        })

        let topId = null
        let topCount = 0
        Object.entries(totals).forEach(([id, c]) => {
          if (c > topCount) { topId = id; topCount = c }
        })

        if (!topId || topCount === 0) {
          setTodayLeader(null)
          return
        }
        const topPlayer = clubPlayers.find((p) => p.id === topId)
        setTodayLeader({
          id: topId,
          display_name: topPlayer?.display_name || 'Someone',
          team_name: topPlayer?.team?.name || null,
          today_shots: topCount,
        })
        setTodayPulse(true)
        setTimeout(() => setTodayPulse(false), 600)
      } catch (e) {
        // silent
      }
    }

    fetchTodayLeader()
    const t = setInterval(fetchTodayLeader, TODAY_REFRESH_MS)
    return () => { cancelled = true; clearInterval(t) }
  }, [club])

  const ctaLabel = useMemo(() => {
    if (!club) return ''
    if (player) return 'Start logging shots'
    return `Join ${club.name}`
  }, [player, club])

  const ctaTarget = useMemo(() => {
    if (!club) return '/start'
    if (player) return '/home'
    return `/start?club=${encodeURIComponent(club.slug)}`
  }, [player, club])

  if (club === undefined) {
    return (
      <div className="club-loading">
        <div className="club-loading-text">LOADING…</div>
        <style>{styles}</style>
      </div>
    )
  }

  if (club === null) {
    return (
      <div className="club-404">
        <div className="club-404-mark">?</div>
        <div className="club-404-title">Club not found</div>
        <div className="club-404-text">
          The club <span className="club-404-slug">{slug}</span> isn't on Hockey Shot Challenge yet.
        </div>
        <button className="club-404-btn" onClick={() => navigate('/start')}>
          Search clubs
        </button>
        <style>{styles}</style>
      </div>
    )
  }

  const hasAnyShots = lifetime.length > 0
  const top1 = lifetime[0]
  const next4 = lifetime.slice(1, 5)
  const rest = lifetime.slice(5)

  return (
    <div className="club fade-in">
      <div className="club-back">
        <button className="club-back-btn" onClick={() => navigate(-1)} aria-label="Back">←</button>
      </div>

      <header className="club-header">
        <div className="club-eyebrow">
          {club.governing_body && <span className="club-badge">{club.governing_body}</span>}
          {club.city && <span className="club-city">{club.city}</span>}
        </div>
        <h1 className="club-name">{club.name}</h1>
      </header>

      {todayLeader ? (
        <div className="today-strip">
          <div className="today-left">
            <span className={`today-dot ${todayPulse ? 'today-dot--pulse' : ''}`} />
            <span className="today-label">Today's leader</span>
          </div>
          <div className="today-body">
            <span className="today-name">{todayLeader.display_name}</span>
            {todayLeader.team_name && (
              <span className="today-team"> · {todayLeader.team_name}</span>
            )}
            <span className="today-count tnum"> {todayLeader.today_shots}</span>
            <span className="today-unit"> shots</span>
          </div>
        </div>
      ) : hasAnyShots ? (
        <div className="today-strip today-strip--quiet">
          <div className="today-left">
            <span className="today-dot today-dot--off" />
            <span className="today-label">No shots today yet</span>
          </div>
          <div className="today-quiet-cta">First one sets the pace</div>
        </div>
      ) : null}

      <div className="stats-row">
        <div className="stat">
          <div className="stat-num tnum">{stats.playerCount.toLocaleString()}</div>
          <div className="stat-label">{stats.playerCount === 1 ? 'Player' : 'Players'}</div>
        </div>
        <div className="stat">
          <div className="stat-num tnum">{stats.teamCount.toLocaleString()}</div>
          <div className="stat-label">{stats.teamCount === 1 ? 'Team' : 'Teams'}</div>
        </div>
        <div className="stat">
          <div className="stat-num tnum">{stats.totalShots.toLocaleString()}</div>
          <div className="stat-label">Total shots</div>
        </div>
      </div>

      {!hasAnyShots && (
        <div className="empty">
          <div className="empty-glyph">🏒</div>
          <div className="empty-title">Be the first kid from {club.name} to log a shot.</div>
          <div className="empty-text">The leaderboard starts with you.</div>
        </div>
      )}

      {hasAnyShots && (
        <section className="rank-section">
          <div className="section-label">All-time leaders</div>

          {top1 && (
            <Link to={top1.username ? `/card/${top1.username}` : '#'} className="hero-card">
              <div className="hero-rank">1</div>
              <div className="hero-body">
                <div className="hero-name">{top1.display_name}</div>
                <div className="hero-meta">
                  {top1.team?.name || top1.club_name || ''}
                </div>
              </div>
              <div className="hero-num tnum">{(top1.lifetime_shots || 0).toLocaleString()}</div>
            </Link>
          )}

          {next4.length > 0 && (
            <div className="rank-list">
              {next4.map((p, i) => (
                <RankRow key={p.id} rank={i + 2} player={p} />
              ))}
            </div>
          )}

          {rest.length > 0 && !showAll && (
            <button className="see-all" onClick={() => setShowAll(true)}>
              See all {lifetime.length} shooters →
            </button>
          )}

          {showAll && rest.length > 0 && (
            <div className="rank-list rank-list--rest">
              {rest.map((p, i) => (
                <RankRow key={p.id} rank={i + 6} player={p} />
              ))}
            </div>
          )}
        </section>
      )}

      {teams.length > 0 && (
        <section className="teams-section">
          <div className="section-label">Teams ({teams.length})</div>
          <div className="teams-list">
            {teams.map((t) => (
              <div key={t.id} className="team-row">
                <div className="team-name">{t.name}</div>
                {t.code && <div className="team-code">{t.code}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="cta-spacer" />
      <div className="cta-dock">
        <button className="cta-btn" onClick={() => navigate(ctaTarget)}>
          {ctaLabel}
        </button>
      </div>

      <style>{styles}</style>
    </div>
  )
}

function RankRow({ rank, player }) {
  const teamName = player.team?.name || ''
  return (
    <Link to={player.username ? `/card/${player.username}` : '#'} className="rank-row">
      <div className="rank-num tnum">{rank}</div>
      <div className="rank-body">
        <div className="rank-name">{player.display_name}</div>
        {teamName && <div className="rank-meta">{teamName}</div>}
      </div>
      <div className="rank-count tnum">{(player.lifetime_shots || 0).toLocaleString()}</div>
    </Link>
  )
}

const styles = `
.club {
  padding: 16px 16px 0;
  min-height: 100dvh;
  max-width: 480px;
  margin: 0 auto;
  position: relative;
}

.club-loading {
  min-height: 100dvh;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg);
}
.club-loading-text {
  font-family: var(--font-display);
  color: var(--text-mute);
  letter-spacing: 2px;
  font-size: 12px;
}

.club-404 {
  min-height: 100dvh;
  max-width: 420px;
  margin: 0 auto;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 24px;
  text-align: center;
}
.club-404-mark {
  font-family: var(--font-display);
  font-size: 56px;
  color: var(--text-mute);
  margin-bottom: 8px;
}
.club-404-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}
.club-404-text {
  color: var(--text-soft);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 24px;
}
.club-404-slug {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  background: var(--surface);
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 12px;
  color: var(--text);
}
.club-404-btn {
  background: var(--accent);
  color: white;
  border-radius: 12px;
  padding: 14px 28px;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.club-back {
  margin-bottom: 8px;
}
.club-back-btn {
  background: var(--surface);
  color: var(--text);
  width: 36px; height: 36px;
  border-radius: 50%;
  font-size: 18px;
  display: flex; align-items: center; justify-content: center;
}

.club-header {
  margin-bottom: 16px;
}
.club-eyebrow {
  display: flex; align-items: center; gap: 8px;
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.club-badge {
  background: var(--surface);
  padding: 3px 8px;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.8px;
}
.club-city {
  font-weight: 500;
}
.club-name {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.3px;
  line-height: 1.1;
  margin: 0;
}

.today-strip {
  background: var(--surface);
  border-left: 2px solid var(--success);
  border-radius: var(--radius);
  padding: 12px 14px;
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.today-strip--quiet {
  border-left-color: var(--border);
}
.today-left {
  display: flex; align-items: center; gap: 8px;
}
.today-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 0 0 rgba(61, 214, 140, 0.5);
  transition: box-shadow 0.6s;
}
.today-dot--pulse {
  box-shadow: 0 0 0 5px rgba(61, 214, 140, 0);
  transition: box-shadow 0.6s;
}
.today-dot--off {
  background: var(--text-mute);
  opacity: 0.5;
}
.today-label {
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  font-weight: 600;
}
.today-body {
  font-size: 14px;
  line-height: 1.4;
  color: var(--text);
}
.today-name {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.3px;
}
.today-team {
  color: var(--text-mute);
  font-size: 13px;
}
.today-count {
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--ice);
  margin-left: 4px;
}
.today-unit {
  color: var(--text-mute);
  font-size: 12px;
}
.today-quiet-cta {
  font-size: 13px;
  color: var(--text-soft);
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 18px;
}
.stat {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 12px 8px;
  text-align: center;
}
.stat-num {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 800;
  line-height: 1;
  color: var(--ice);
}
.stat-label {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  margin-top: 6px;
  font-weight: 500;
}

.empty {
  background: var(--surface);
  border-radius: 16px;
  padding: 28px 22px;
  text-align: center;
  margin-bottom: 18px;
  border: 0
