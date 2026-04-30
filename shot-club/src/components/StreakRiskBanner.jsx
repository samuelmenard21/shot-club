import { isStreakAtRisk, freezesAvailable } from '../lib/progress'
import { pickLineStable } from '../lib/coachSam'

export default function StreakRiskBanner({ player }) {
  if (!player) return null
  if (!isStreakAtRisk(player)) return null

  const freezes = freezesAvailable(player)
  const line = pickLineStable('streak_at_risk', `${player.id}-${new Date().toDateString()}`, {
    name: player.display_name,
    streak: player.current_streak,
  })

  return (
    <div className="risk-banner">
      <div className="risk-icon">⚠️</div>
      <div className="risk-body">
        <div className="risk-title">{line}</div>
        {freezes > 0 && (
          <div className="risk-sub">
            {freezes} freeze{freezes === 1 ? '' : 's'} left this month — keeps your streak alive if you skip
          </div>
        )}
      </div>
      <style>{`
        .risk-banner {
          display: flex; gap: 10px; align-items: flex-start;
          background: rgba(255, 159, 67, 0.1);
          border: 0.5px solid rgba(255, 159, 67, 0.4);
          border-radius: var(--radius);
          padding: 12px 14px;
          margin-bottom: 12px;
        }
        .risk-icon { font-size: 18px; line-height: 1.2; flex-shrink: 0; }
        .risk-title {
          font-size: 13px; color: var(--text);
          font-weight: 600;
          line-height: 1.3;
        }
        .risk-sub {
          font-size: 11px; color: var(--text-mute);
          margin-top: 3px; line-height: 1.4;
        }
      `}</style>
    </div>
  )
}
