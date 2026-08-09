import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { getPlayersForAccount } from '../lib/auth'
import { getRank } from '../lib/ranks'

export default function ParentDashboardScreen() {
  const { player } = useAuth()
  const nav = useNavigate()
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!player) return
    setLoading(true)
    getPlayersForAccount()
      .then((p) => {
        if (p && p.length > 0) {
          setPlayers(p)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [player])

  if (!player) return null

  if (loading) {
    return (
      <div className="parent-dashboard loading">
        <div className="loading-text">Loading…</div>
      </div>
    )
  }

  if (players.length === 0) {
    return (
      <div className="parent-dashboard empty">
        <div className="empty-icon">👨‍👩‍👧‍👦</div>
        <div className="empty-title">No players yet</div>
        <div className="empty-text">Add players to track their progress here.</div>
        <button className="empty-btn" onClick={() => nav('/add-player')}>
          + Add Player
        </button>
      </div>
    )
  }

  return (
    <div className="parent-dashboard fade-in">
      <header className="pd-header">
        <h1 className="pd-title">My Players</h1>
        <div className="pd-subtitle">Track all your players in one place</div>
      </header>

      <div className="pd-grid">
        {players.map((p) => {
          const rank = getRank(p.lifetime_shots || 0)
          return (
            <div
              key={p.id}
              className="pd-card"
              onClick={() => nav(`/card/${p.username || p.id}`)}
            >
              <div className="pdc-avatar">{p.display_name?.[0]?.toUpperCase() || '?'}</div>
              <div className="pdc-name">{p.display_name}</div>
              <div className="pdc-rank">{rank.badge} {rank.name}</div>

              <div className="pdc-stats">
                <div className="pdc-stat">
                  <div className="pdc-stat-label">Shots</div>
                  <div className="pdc-stat-num">{(p.lifetime_shots || 0).toLocaleString()}</div>
                </div>
                <div className="pdc-stat">
                  <div className="pdc-stat-label">Streak</div>
                  <div className="pdc-stat-num">🔥 {p.current_streak || 0}</div>
                </div>
              </div>

              {p.team?.name && (
                <div className="pdc-team">{p.team.name}</div>
              )}

              <div className="pdc-arrow">→</div>
            </div>
          )
        })}
      </div>

      <button className="pd-add-btn" onClick={() => nav('/add-player')}>
        + Add Another Player
      </button>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.parent-dashboard {
  padding: 14px;
  min-height: 100vh;
}

.parent-dashboard.loading,
.parent-dashboard.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 20px;
  text-align: center;
}

.loading-text {
  font-size: 12px;
  color: var(--text-mute);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.empty-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  letter-spacing: 0.3px;
}

.empty-text {
  font-size: 13px;
  color: var(--text-mute);
  margin-bottom: 20px;
  line-height: 1.4;
}

.empty-btn {
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 13px;
  transition: all 0.15s;
}

.empty-btn:active {
  transform: scale(0.98);
}

.pd-header {
  padding: 4px 0 20px;
}

.pd-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.pd-subtitle {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 4px;
  letter-spacing: 0.3px;
}

.pd-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.pd-card {
  background: linear-gradient(135deg, rgba(41, 121, 255, 0.1), rgba(61, 214, 140, 0.05));
  border: 0.5px solid var(--accent);
  border-radius: 14px;
  padding: 14px;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pd-card:active {
  transform: scale(0.98);
  border-color: var(--ice);
}

.pdc-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.pdc-name {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: white;
  margin-bottom: 2px;
  word-break: break-word;
}

.pdc-rank {
  font-size: 11px;
  color: var(--ice);
  font-weight: 600;
  margin-bottom: 8px;
}

.pdc-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  width: 100%;
  margin-bottom: 8px;
}

.pdc-stat {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 6px;
}

.pdc-stat-label {
  font-size: 9px;
  color: var(--text-mute);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pdc-stat-num {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: var(--ice);
  margin-top: 2px;
}

.pdc-team {
  font-size: 10px;
  color: var(--text-mute);
  background: rgba(0, 0, 0, 0.2);
  padding: 4px 8px;
  border-radius: 6px;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.pdc-arrow {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 14px;
  color: var(--text-mute);
  opacity: 0.6;
}

.pd-add-btn {
  width: 100%;
  background: var(--surface);
  border: 0.5px solid var(--accent);
  color: var(--ice);
  padding: 13px;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.15s;
}

.pd-add-btn:active {
  background: rgba(41, 121, 255, 0.1);
}
`
