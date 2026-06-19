import { comebackTarget } from '../lib/progress'

export default function StreakRecoveryBanner({ player, todayShots }) {
  if (!player) return null

  const target = comebackTarget(player)
  const pct = Math.min(100, Math.round((todayShots / target) * 100))
  const done = todayShots >= target
  const remaining = Math.max(0, target - todayShots)

  return (
    <div className={`srb${done ? ' srb--done' : ''}`}>
      {done ? (
        <>
          <div className="srb-icon">🔥</div>
          <div className="srb-body">
            <div className="srb-title">Comeback complete!</div>
            <div className="srb-sub">You hit {target} shots. Streak is back. Don't miss again.</div>
          </div>
        </>
      ) : (
        <>
          <div className="srb-icon">💀</div>
          <div className="srb-body">
            <div className="srb-title">Streak recovery — {remaining} shots to go</div>
            <div className="srb-sub">
              You missed yesterday. Hit {target} shots today to bring it back.
            </div>
            <div className="srb-track">
              <div className="srb-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="srb-count tnum">{todayShots} / {target}</div>
          </div>
        </>
      )}
      <style>{`
        .srb {
          display: flex; gap: 10px; align-items: flex-start;
          background: rgba(239, 68, 68, 0.08);
          border: 0.5px solid rgba(239, 68, 68, 0.35);
          border-radius: var(--radius);
          padding: 12px 14px;
          margin-bottom: 12px;
        }
        .srb--done {
          background: rgba(34, 197, 94, 0.08);
          border-color: rgba(34, 197, 94, 0.35);
        }
        .srb-icon { font-size: 20px; line-height: 1.2; flex-shrink: 0; }
        .srb-body { flex: 1; min-width: 0; }
        .srb-title {
          font-size: 13px; font-weight: 700;
          color: var(--text); line-height: 1.3;
        }
        .srb-sub {
          font-size: 11px; color: var(--text-mute);
          margin-top: 3px; line-height: 1.4;
        }
        .srb-track {
          height: 6px;
          background: rgba(239, 68, 68, 0.2);
          border-radius: 99px;
          overflow: hidden;
          margin-top: 8px;
        }
        .srb-fill {
          height: 100%;
          background: linear-gradient(90deg, #ef4444, #f97316);
          border-radius: 99px;
          transition: width 0.4s ease;
          min-width: 4px;
        }
        .srb-count {
          font-size: 11px; color: var(--text-mute);
          margin-top: 4px; text-align: right;
        }
      `}</style>
    </div>
  )
}
