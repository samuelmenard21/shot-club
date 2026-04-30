import { useEffect, useState } from 'react'
import { getLast7Days } from '../lib/progress'

export default function SevenDayChart({ playerId }) {
  const [days, setDays] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!playerId) return
    let alive = true
    getLast7Days(playerId).then((data) => {
      if (alive) {
        setDays(data)
        setLoaded(true)
      }
    })
    return () => { alive = false }
  }, [playerId])

  if (!loaded) return null
  const max = Math.max(...days.map((d) => d.shots), 10)

  return (
    <div className="chart-wrap">
      <div className="chart-label">LAST 7 DAYS</div>
      <div className="chart-bars">
        {days.map((d) => {
          const h = max > 0 ? Math.max(2, (d.shots / max) * 100) : 2
          return (
            <div key={d.date} className="chart-col">
              <div className="chart-num">{d.shots}</div>
              <div className="chart-bar-track">
                <div
                  className={`chart-bar ${d.isToday ? 'chart-bar--today' : ''} ${d.goalMet ? 'chart-bar--goal' : ''}`}
                  style={{ height: `${h}%` }}
                />
              </div>
              <div className={`chart-day ${d.isToday ? 'chart-day--today' : ''}`}>{d.day}</div>
            </div>
          )
        })}
      </div>
      <style>{`
        .chart-wrap {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 14px;
          margin-bottom: 14px;
        }
        .chart-label {
          font-size: 10px;
          letter-spacing: 1.5px;
          color: var(--text-mute);
          font-weight: 600;
          margin-bottom: 12px;
        }
        .chart-bars {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 6px;
          height: 130px;
        }
        .chart-col {
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center;
          height: 100%;
        }
        .chart-num {
          font-size: 10px;
          color: var(--text-mute);
          font-weight: 600;
          margin-bottom: 4px;
          height: 14px;
        }
        .chart-bar-track {
          flex: 1;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .chart-bar {
          width: 100%;
          background: rgba(168,212,245,0.25);
          border-radius: 4px 4px 0 0;
          transition: height 0.5s ease;
          min-height: 2px;
        }
        .chart-bar--goal { background: var(--success, #3dd68c); }
        .chart-bar--today {
          background: var(--accent, #2979ff);
          box-shadow: 0 0 12px rgba(41,121,255,0.4);
        }
        .chart-bar--today.chart-bar--goal {
          background: var(--success, #3dd68c);
          box-shadow: 0 0 12px rgba(61,214,140,0.4);
        }
        .chart-day {
          font-size: 10px;
          color: var(--text-mute);
          margin-top: 6px;
          letter-spacing: 0.5px;
        }
        .chart-day--today {
          color: var(--ice);
          font-weight: 700;
        }
      `}</style>
    </div>
  )
}
