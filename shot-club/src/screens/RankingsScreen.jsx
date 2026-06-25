import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAssociationRankings, getTeamOfTheWeek } from '../lib/clubs'

function formatShots(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toLocaleString()
}

const MEDALS = ['🥇', '🥈', '🥉']

export default function RankingsScreen() {
  const [rankings, setRankings] = useState([])
  const [teamOfWeek, setTeamOfWeek] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAssociationRankings(), getTeamOfTheWeek()]).then(([data, totw]) => {
      setRankings(data)
      setTeamOfWeek(totw)
      setLoading(false)
    })
  }, [])

  const shareUrl = 'https://hockeyshotchallenge.com/rankings'
  const shareText = rankings[0]
    ? `${rankings[0].name} leads Hockey Shot Challenge with ${formatShots(rankings[0].total_shots)} shots fired! 🏒 Check the association rankings:`
    : 'Check the Hockey Shot Challenge association rankings!'

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Hockey Shot Challenge Rankings', text: shareText, url: shareUrl })
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
      alert('Link copied!')
    }
  }

  return (
    <div className="rk-page">
      <header className="rk-header">
        <Link to="/" className="rk-back">← Back</Link>
        <div className="rk-header-text">
          <h1 className="rk-title">Association Rankings</h1>
          <p className="rk-sub">Total shots fired — all time</p>
        </div>
        <button className="rk-share-btn" onClick={handleShare}>Share</button>
      </header>

      {!loading && teamOfWeek && (
        <div className="totw-card">
          <div className="totw-eyebrow">🏆 TEAM OF THE WEEK</div>
          <div className="totw-name">
            {teamOfWeek.team.age_division} {teamOfWeek.team.tier}
          </div>
          <div className="totw-club">
            {teamOfWeek.team.club?.name}{teamOfWeek.team.club?.city ? ` · ${teamOfWeek.team.club.city}` : ''}
          </div>
          <div className="totw-shots tnum">{teamOfWeek.shots.toLocaleString()} shots this week</div>
          <div className="totw-players">{teamOfWeek.players} active player{teamOfWeek.players !== 1 ? 's' : ''}</div>
        </div>
      )}

      {loading && <div className="rk-loading">Loading rankings…</div>}

      {!loading && rankings.length === 0 && (
        <div className="rk-empty">
          <p>No shots logged yet. Be the first association on the board!</p>
          <Link to="/clubs" className="rk-cta-btn">Find your association →</Link>
        </div>
      )}

      {!loading && rankings.length > 0 && (
        <div className="rk-list">
          {rankings.map((assoc, i) => {
            const rank = i + 1
            const medal = MEDALS[i] || null
            const isTop3 = i < 3

            return (
              <Link
                key={assoc.club_id}
                to={`/clubs/${assoc.slug}`}
                className={`rk-row${isTop3 ? ' rk-row--top' : ''}`}
              >
                <div className={`rk-rank${isTop3 ? ' rk-rank--top' : ''}`}>
                  {medal || <span className="rk-rank-num">#{rank}</span>}
                </div>
                <div className="rk-info">
                  <div className="rk-name">{assoc.name}</div>
                  <div className="rk-location">
                    {[assoc.city, assoc.province].filter(Boolean).join(', ')}
                    <span className="rk-players"> · {assoc.player_count} player{assoc.player_count !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                <div className="rk-shots">
                  <span className="rk-shots-num">{formatShots(assoc.total_shots)}</span>
                  <span className="rk-shots-label">shots</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      <div className="rk-footer">
        <p className="rk-footer-text">Is your association missing?</p>
        <Link to="/clubs" className="rk-footer-link">Find your club →</Link>
      </div>
      <style>{styles}</style>
    </div>
  )
}

const styles = `
.rk-page {
  min-height: 100dvh;
  background: var(--bg);
  color: var(--text);
  padding-bottom: 48px;
}
.rk-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px 12px;
  border-bottom: 1px solid var(--border, #e5e7eb);
  position: sticky;
  top: 0;
  background: var(--bg);
  z-index: 10;
}
.rk-back {
  color: var(--accent, #2563eb);
  text-decoration: none;
  font-size: 14px;
  white-space: nowrap;
}
.rk-header-text {
  flex: 1;
}
.rk-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}
.rk-sub {
  font-size: 12px;
  color: var(--text-muted, #6b7280);
  margin: 2px 0 0;
}
.rk-share-btn {
  background: var(--accent, #2563eb);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.totw-card {
  margin: 8px 16px 4px;
  background: linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(37,99,235,0.08) 100%);
  border: 1px solid rgba(251,191,36,0.3);
  border-radius: 14px;
  padding: 16px 18px;
  text-align: center;
}
.totw-eyebrow {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #92400e;
  margin-bottom: 8px;
}
.totw-name {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 2px;
}
.totw-club {
  font-size: 13px;
  color: var(--text-muted, #6b7280);
  margin-bottom: 10px;
}
.totw-shots {
  font-size: 16px;
  font-weight: 700;
  color: var(--accent, #2563eb);
}
.totw-players {
  font-size: 11px;
  color: var(--text-muted, #6b7280);
  margin-top: 4px;
}

.rk-loading {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted, #6b7280);
  font-size: 15px;
}
.rk-empty {
  text-align: center;
  padding: 60px 24px;
}
.rk-empty p {
  color: var(--text-muted, #6b7280);
  margin-bottom: 20px;
}
.rk-cta-btn {
  display: inline-block;
  background: var(--accent, #2563eb);
  color: #fff;
  padding: 12px 24px;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
}
.rk-list {
  padding: 8px 0;
}
.rk-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border, #e5e7eb);
  text-decoration: none;
  color: inherit;
  transition: background 0.15s;
}
.rk-row:active,
.rk-row:hover {
  background: var(--surface, #f9fafb);
}
.rk-row--top {
  background: linear-gradient(135deg, rgba(251,191,36,0.06) 0%, transparent 100%);
}
.rk-rank {
  width: 36px;
  text-align: center;
  font-size: 22px;
  flex-shrink: 0;
}
.rk-rank--top {
  font-size: 26px;
}
.rk-rank-num {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted, #6b7280);
}
.rk-info {
  flex: 1;
  min-width: 0;
}
.rk-name {
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rk-location {
  font-size: 12px;
  color: var(--text-muted, #6b7280);
  margin-top: 2px;
}
.rk-players {
  color: var(--text-muted, #6b7280);
}
.rk-shots {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
}
.rk-shots-num {
  font-size: 18px;
  font-weight: 800;
  color: var(--accent, #2563eb);
  line-height: 1;
}
.rk-shots-label {
  font-size: 11px;
  color: var(--text-muted, #6b7280);
  margin-top: 2px;
}
.rk-footer {
  text-align: center;
  padding: 32px 20px 0;
}
.rk-footer-text {
  color: var(--text-muted, #6b7280);
  font-size: 14px;
  margin-bottom: 8px;
}
.rk-footer-link {
  color: var(--accent, #2563eb);
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
}
`

