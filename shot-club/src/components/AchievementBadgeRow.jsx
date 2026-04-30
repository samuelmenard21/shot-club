import { useEffect, useState } from 'react'
import { getAchievements } from '../lib/progress'

export default function AchievementBadgeRow({ playerId }) {
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    if (!playerId) return
    let alive = true
    getAchievements(playerId).then((data) => {
      if (alive) setAchievements(data)
    })
    return () => { alive = false }
  }, [playerId])

  if (achievements.length === 0) return null
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div className="badges-wrap">
      <div className="badges-header">
        <div className="badges-label">ACHIEVEMENTS</div>
        <div className="badges-count">{unlockedCount} / {achievements.length}</div>
      </div>
      <div className="badges-row">
        {achievements.map((a) => (
          <div
            key={a.code}
            className={`badge ${a.unlocked ? 'badge--unlocked' : 'badge--locked'}`}
            title={a.unlocked ? a.title : `Locked — ${a.description}`}
          >
            <div className="badge-icon">{a.unlocked ? a.icon : '🔒'}</div>
            <div className="badge-name">{a.title}</div>
          </div>
        ))}
      </div>
      <style>{`
        .badges-wrap {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 14px;
          margin-bottom: 14px;
        }
        .badges-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 12px;
        }
        .badges-label {
          font-size: 10px;
          letter-spacing: 1.5px;
          color: var(--text-mute);
          font-weight: 600;
        }
        .badges-count {
          font-size: 11px;
          color: var(--ice);
          font-weight: 700;
          font-family: var(--font-display);
          letter-spacing: 0.5px;
        }
        .badges-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .badge {
          display: flex; flex-direction: column; align-items: center;
          padding: 8px 4px;
          border-radius: 10px;
          text-align: center;
        }
        .badge--unlocked {
          background: rgba(41,121,255,0.08);
          border: 0.5px solid rgba(41,121,255,0.3);
        }
        .badge--locked {
          background: rgba(168,212,245,0.04);
          opacity: 0.45;
        }
        .badge-icon {
          font-size: 22px;
          margin-bottom: 4px;
          filter: var(--badge-filter, none);
        }
        .badge--locked .badge-icon { filter: grayscale(1); }
        .badge-name {
          font-size: 9px;
          color: var(--text-soft);
          line-height: 1.2;
          font-weight: 500;
          letter-spacing: 0.2px;
        }
      `}</style>
    </div>
  )
}
