import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  DRILL_CATEGORIES,
  drillsByCategory,
  youtubeThumbUrl,
  youtubeWatchUrl,
} from '../lib/drills'

export default function DrillsScreen() {
  const navigate = useNavigate()
  const [activeCat, setActiveCat] = useState('wrist')
  const drills = drillsByCategory(activeCat)

  return (
    <div className="drills-screen fade-in">
      <header className="drills-header">
        <button onClick={() => navigate(-1)} className="drills-back" aria-label="Back">←</button>
        <div>
          <h1 className="drills-title">Drills</h1>
          <div className="drills-sub">Pick a shot type. Watch. Then put it on the wall.</div>
        </div>
      </header>

      <div className="drills-tabs">
        {DRILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`drills-tab ${cat.id === activeCat ? 'drills-tab--active' : ''}`}
          >
            <span style={{ marginRight: 6 }}>{cat.emoji}</span>{cat.label}
          </button>
        ))}
      </div>

      <div className="drills-list">
        {drills.length === 0 && (
          <div className="drills-empty">No drills here yet.</div>
        )}
        {drills.map((drill) => (
          <a
            key={drill.id}
            href={youtubeWatchUrl(drill.youtubeId)}
            target="_blank"
            rel="noopener noreferrer"
            className="drill-card"
          >
            <div className="drill-thumb-wrap">
              <img src={youtubeThumbUrl(drill.youtubeId)} alt={drill.title} className="drill-thumb" />
              <div className="drill-play-overlay">
                <div className="drill-play-btn">
                  <div className="drill-play-tri" />
                </div>
              </div>
              {drill.level && drill.level !== 'all' && (
                <div className="drill-level">{drill.level}</div>
              )}
            </div>
            <div className="drill-meta">
              <div className="drill-title">{drill.title}</div>
              <div className="drill-source">{drill.source}</div>
            </div>
          </a>
        ))}
      </div>

      <style>{`
        .drills-screen { padding: 14px 14px 90px; }
        .drills-header {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 4px 4px 14px;
        }
        .drills-back {
          background: transparent;
          color: var(--ice);
          font-size: 22px;
          padding: 4px 8px;
          margin-top: 2px;
        }
        .drills-title {
          font-family: var(--font-display);
          font-size: 24px; font-weight: 700;
          letter-spacing: 0.5px;
          line-height: 1;
        }
        .drills-sub {
          font-size: 12px; color: var(--text-mute);
          margin-top: 4px;
        }
        .drills-tabs {
          display: flex; gap: 8px;
          padding: 8px 0 14px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .drills-tabs::-webkit-scrollbar { display: none; }
        .drills-tab {
          flex-shrink: 0;
          padding: 8px 14px;
          border-radius: 999px;
          background: var(--surface);
          border: 0.5px solid var(--border-dim);
          color: var(--text-mute);
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
        }
        .drills-tab--active {
          background: rgba(41, 121, 255, 0.15);
          border-color: var(--accent);
          color: var(--ice);
        }
        .drills-list { display: flex; flex-direction: column; gap: 12px; }
        .drills-empty {
          text-align: center; padding: 40px;
          color: var(--text-mute);
        }
        .drill-card {
          display: block;
          background: var(--surface);
          border-radius: var(--radius);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          border: 0.5px solid var(--border-dim);
          transition: transform 0.15s;
        }
        .drill-card:active { transform: scale(0.98); }
        .drill-thumb-wrap {
          position: relative;
          padding-top: 56.25%;
          background: #000;
        }
        .drill-thumb {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
        }
        .drill-play-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.15);
        }
        .drill-play-btn {
          width: 54px; height: 54px;
          border-radius: 50%;
          background: rgba(41, 121, 255, 0.92);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(0,0,0,0.4);
        }
        .drill-play-tri {
          width: 0; height: 0;
          border-left: 16px solid #fff;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          margin-left: 4px;
        }
        .drill-level {
          position: absolute;
          top: 8px; right: 8px;
          background: rgba(0,0,0,0.7);
          color: var(--ice);
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        .drill-meta { padding: 12px 14px; }
        .drill-title {
          font-size: 14px; font-weight: 600;
          color: var(--text);
          margin-bottom: 3px;
          line-height: 1.3;
        }
        .drill-source {
          font-size: 11px;
          color: var(--text-mute);
        }
      `}</style>
    </div>
  )
}
