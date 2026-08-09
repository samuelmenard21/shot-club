import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export default function NotificationsScreen() {
  const { player } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (player) {
      loadNotifications()
    }
  }, [player])

  const loadNotifications = async () => {
    if (!player) return
    setLoading(true)
    try {
      // Fetch recent milestones and activities
      const { data: shots, error: shotsError } = await supabase
        .from('shots')
        .select('created_at, count')
        .eq('player_id', player.id)
        .order('created_at', { ascending: false })
        .limit(50)

      if (shotsError) throw shotsError

      // Build notifications from shot data
      const notifs = []
      let totalShots = 0
      const milestones = [1000, 2500, 5000, 10000]

      // Count shots and detect milestones
      if (shots) {
        for (const shot of shots) {
          totalShots += shot.count || 1
          const milestone = milestones.find(m => totalShots >= m && totalShots - (shot.count || 1) < m)
          if (milestone) {
            notifs.push({
              id: `milestone-${milestone}`,
              type: 'milestone',
              title: `🎉 Reached ${milestone} shots!`,
              description: `You've hit your ${milestone}-shot goal. Keep it up!`,
              timestamp: shot.created_at,
              date: new Date(shot.created_at),
            })
          }
        }
      }

      // Add generic welcome notification
      if (notifs.length === 0) {
        notifs.push({
          id: 'welcome',
          type: 'system',
          title: '👋 Welcome to Hockey Shot Challenge',
          description: 'Start logging shots to build your streak and climb the rankings.',
          timestamp: player.created_at,
          date: new Date(player.created_at),
        })
      }

      // Sort by date descending
      notifs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      setNotifications(notifs)
    } catch (e) {
      console.error('Failed to load notifications:', e)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (date) => {
    const now = new Date()
    const diffMs = now - new Date(date)
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  if (!player) return null

  return (
    <div className="notifications-screen fade-in">
      <header className="notifications-header">
        <h1 className="notifications-title">Notifications</h1>
      </header>

      {loading ? (
        <div className="notifications-loading">
          <div className="skeleton-line" style={{ marginBottom: 12 }}></div>
          <div className="skeleton-line" style={{ marginBottom: 12 }}></div>
          <div className="skeleton-line" style={{ width: '70%' }}></div>
        </div>
      ) : notifications.length > 0 ? (
        <div className="notifications-list">
          {notifications.map((notif) => (
            <div key={notif.id} className="notification-card">
              <div className="notification-left">
                <div className="notification-title">{notif.title}</div>
                <div className="notification-description">{notif.description}</div>
              </div>
              <div className="notification-time">{formatTime(notif.date)}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="notifications-empty">
          <div className="empty-icon">🔔</div>
          <div className="empty-title">No notifications yet</div>
          <div className="empty-text">Keep tracking shots and hitting milestones — achievements will appear here.</div>
        </div>
      )}

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.notifications-screen {
  padding: 14px;
  min-height: 100vh;
}

.notifications-header {
  padding: 4px 0 20px;
}

.notifications-title {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.notifications-loading {
  margin-top: 16px;
}

.skeleton-line {
  height: 40px;
  background: linear-gradient(90deg, var(--surface) 0%, var(--surface-raised) 50%, var(--surface) 100%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.notification-card {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 10px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.15s;
}

.notification-card:active {
  background: var(--surface-raised);
  border-color: var(--accent);
}

.notification-left {
  flex: 1;
}

.notification-title {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
  letter-spacing: 0.2px;
}

.notification-description {
  font-size: 12px;
  color: var(--text-mute);
  line-height: 1.4;
}

.notification-time {
  font-size: 11px;
  color: var(--text-mute);
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  text-align: right;
}

.notifications-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
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
  line-height: 1.5;
  max-width: 240px;
}
`
