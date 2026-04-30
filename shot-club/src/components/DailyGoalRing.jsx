mport { useEffect, useState } from 'react'
import { getTodayProgress } from '../lib/progress'

export default function DailyGoalRing({ playerId, dailyGoal, refreshKey }) {
  const [progress, setProgress] = useState({ shotsToday: 0, goalMet: false, pctOfGoal: 0 })

  useEffect(() => {
    if (!playerId) return
    let alive = true
    getTodayProgress(playerId, dailyGoal).then((p) => {
      if (alive) setProgress(p)
    })
    return () => { alive = false }
  }, [playerId, dailyGoal, refreshKey])

  const size = 88
  const stroke = 8
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress.pctOfGoal / 100)

  return (
    <div className="goal-ring-wrap">
      <svg width={size} height={size} className="goal-ring-svg" aria-hidden>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(168,212,245,0.12)" strokeWidth={stroke}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={progress.goalMet ? 'var(--success, #3dd68c)' : 'var(--accent, #2979ff)'}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s' }}
        />
      </svg>
      <div className="goal-ring-inner">
        <div className="goal-ring-num">{progress.shotsToday}</div>
        <div className="goal-ring-sub">/ {dailyGoal}</div>
      </div>
      <div className="goal-ring-label">
        {progress.goalMet ? 'GOAL MET ✓' : 'DAILY GOAL'}
      </div>
      <style>{`
        .goal-ring-wrap {
          display: flex; flex-direction: column; align-items: center;
          padding: 4px 0 12px;
          position: relative;
        }
        .goal-ring-svg { display: block; }
        .goal-ring-inner {
          position: absolute;
          top: 4px;
          width: 88px; height: 88px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          pointer-events: none;
        }
        .goal-ring-num {
          font-family: var(--font-display);
          font-size: 22px; font-weight: 800;
          color: var(--ice);
          line-height: 1;
        }
        .goal-ring-sub {
          font-size: 10px; color: var(--text-mute);
          letter-spacing: 0.5px;
          margin-top: 1px;
        }
        .goal-ring-label {
          font-size: 9px; color: var(--text-mute);
          letter-spacing: 1.5px;
          margin-top: 6px;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

