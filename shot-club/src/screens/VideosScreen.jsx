import { useEffect, useState } from 'react'
import { getSkillVideos } from '../lib/videos'

export default function VideosScreen() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSkillVideos()
      .then(setVideos)
      .catch((err) => {
        console.error('Failed to load videos:', err)
        setVideos([])
      })
      .finally(() => setLoading(false))
  }, [])

  const dayIndex = Math.floor(Date.now() / 86400000)
  const featured = videos.length > 0 ? videos[dayIndex % videos.length] : null
  const rest = featured ? videos.filter((v) => v.id !== featured.id) : videos

  return (
    <div className="videos-screen fade-in">
      <header className="videos-header">
        <h1 className="videos-title">Practice drills</h1>
        <div className="videos-sub">Watch and then put it on the wall 🎯</div>
      </header>

      {loading && <div className="videos-loading">Loading drills…</div>}

      {!loading && featured && (
        <>
          <div className="featured-drill">
            <div className="label-sm" style={{ marginBottom: 8, paddingLeft: 14 }}>Drill of the day</div>
            <a
              href={`https://www.youtube.com/watch?v=${featured.youtube_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="featured-card"
            >
              <div className="featured-thumb-wrap">
                <img
                  src={`https://img.youtube.com/vi/${featured.youtube_id}/mqdefault.jpg`}
                  alt={featured.title}
                  className="featured-thumb"
                  loading="lazy"
                />
                <div className="featured-play">▶</div>
              </div>
              <div className="featured-info">
                <div className="featured-badge">
                  {featured.skill_type === 'shooting' ? '🥅 Shooting' : '🏑 Stickhandling'}
                </div>
                <div className="featured-title">{featured.title}</div>
                <div className="featured-cta">Watch on YouTube →</div>
              </div>
            </a>
          </div>

          {rest.length > 0 && (
            <div className="more-drills">
              <div className="label-sm" style={{ marginBottom: 8, paddingLeft: 14 }}>More drills</div>
              <div className="drills-list">
                {rest.map((v) => (
                  <a
                    key={v.id}
                    href={`https://www.youtube.com/watch?v=${v.youtube_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="drill-item"
                  >
                    <div className="drill-thumb-wrap">
                      <img
                        src={`https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`}
                        alt={v.title}
                        className="drill-thumb"
                        loading="lazy"
                      />
                      <div className="drill-play-overlay">▶</div>
                    </div>
                    <div className="drill-meta">
                      <div className="drill-title">{v.title}</div>
                      <div className="drill-badge">
                        {v.skill_type === 'shooting' ? '🥅 Shooting' : '🏑 Stickhandling'}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!loading && videos.length === 0 && (
        <div className="videos-empty">
          <div className="videos-empty-icon">🎬</div>
          <div className="videos-empty-text">No drills yet</div>
        </div>
      )}

      <style>{`
        .videos-screen { padding: 14px 0 90px; }
        .videos-header {
          padding: 12px 14px 20px;
          border-bottom: 0.5px solid var(--border-dim);
        }
        .videos-title {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 4px;
          line-height: 1;
        }
        .videos-sub {
          font-size: 13px;
          color: var(--text-mute);
          margin: 0;
        }
        .videos-loading {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-mute);
          font-size: 14px;
        }
        .featured-drill { margin: 14px 0; }
        .featured-card {
          display: block;
          margin: 0 14px;
          background: var(--surface);
          border-radius: 14px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          border: 0.5px solid var(--border-dim);
          transition: transform 0.15s;
        }
        .featured-card:active { transform: scale(0.98); }
        .featured-thumb-wrap {
          position: relative;
          padding-top: 56.25%;
          background: #000;
        }
        .featured-thumb {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .featured-play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          background: rgba(0, 0, 0, 0.2);
          color: white;
        }
        .featured-info { padding: 14px; }
        .featured-badge {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-mute);
          margin-bottom: 4px;
          letter-spacing: 0.5px;
        }
        .featured-title {
          font-size: 16px;
          font-weight: 700;
          margin-bottom: 8px;
          line-height: 1.3;
        }
        .featured-cta {
          font-size: 12px;
          color: var(--accent);
          font-weight: 600;
        }
        .more-drills { padding: 20px 14px 0; }
        .drills-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .drill-item {
          display: flex;
          gap: 12px;
          background: var(--surface);
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          border: 0.5px solid var(--border-dim);
          transition: transform 0.15s;
        }
        .drill-item:active { transform: scale(0.98); }
        .drill-thumb-wrap {
          position: relative;
          width: 100px;
          height: 56px;
          flex-shrink: 0;
          background: #000;
        }
        .drill-thumb {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .drill-play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          background: rgba(0, 0, 0, 0.2);
          color: white;
        }
        .drill-meta {
          flex: 1;
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .drill-title {
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 4px;
          line-height: 1.2;
        }
        .drill-badge {
          font-size: 10px;
          color: var(--text-mute);
          letter-spacing: 0.5px;
        }
        .videos-empty {
          text-align: center;
          padding: 80px 20px;
        }
        .videos-empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }
        .videos-empty-text {
          color: var(--text-mute);
          font-size: 14px;
        }
      `}</style>
    </div>
  )
}
