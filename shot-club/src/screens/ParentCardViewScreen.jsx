import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getRank } from '../lib/ranks'

export default function ParentCardViewScreen() {
  const { playerId } = useParams()
  const nav = useNavigate()
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!playerId) return

    const fetchPlayerData = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('players')
          .select('id, display_name, position, lifetime_shots, current_streak, daily_goal, lifetime_shot_goal, club_name, team(id, name)')
          .eq('id', playerId)
          .single()

        if (fetchError) throw fetchError
        if (!data) {
          setError('Player not found')
          return
        }

        setPlayer(data)
      } catch (e) {
        console.error('Failed to load player:', e)
        setError('Could not load player card')
      } finally {
        setLoading(false)
      }
    }

    fetchPlayerData()
  }, [playerId])

  if (loading) {
    return (
      <div className="parent-card-view loading">
        <div className="loading-spinner">Loading…</div>
      </div>
    )
  }

  if (error || !player) {
    return (
      <div className="parent-card-view error">
        <div className="error-icon">❌</div>
        <div className="error-title">{error || 'Player not found'}</div>
        <div className="error-text">This player's card link may have expired or been removed.</div>
        <button className="error-btn" onClick={() => nav('/')}>Back to Home</button>
      </div>
    )
  }

  const rank = getRank(player.lifetime_shots || 0)
  const cardNumberDisplay = player.id ? `#${String(player.id.charCodeAt(0) + player.id.charCodeAt(player.id.length - 1)).padStart(3, '0')}` : '—'

  return (
    <div className="parent-card-view fade-in">
      <div className="pcv-header">
        <button className="pcv-back" onClick={() => nav('/')}>← Home</button>
        <div className="pcv-title">Player Card</div>
      </div>

      <div className="pcv-container">
        {/* Player Header */}
        <div className="pcv-card">
          <div className="pcv-avatar">{player.display_name?.[0]?.toUpperCase() || '?'}</div>
          <div className="pcv-name">{player.display_name}</div>
          <div className="pcv-rank">{rank.fullName}</div>
          <div className="pcv-card-number">{cardNumberDisplay}</div>
        </div>

        {/* Stats Grid */}
        <div className="pcv-stats">
          <div className="pcv-stat">
            <div className="pcv-stat-label">Total Shots</div>
            <div className="pcv-stat-value">{(player.lifetime_shots || 0).toLocaleString()}</div>
          </div>
          <div className="pcv-stat">
            <div className="pcv-stat-label">Current Streak</div>
            <div className="pcv-stat-value">🔥 {player.current_streak || 0}</div>
          </div>
          <div className="pcv-stat">
            <div className="pcv-stat-label">Daily Goal</div>
            <div className="pcv-stat-value">{player.daily_goal || 50}</div>
          </div>
          <div className="pcv-stat">
            <div className="pcv-stat-label">Lifetime Goal</div>
            <div className="pcv-stat-value">{(player.lifetime_shot_goal || 5000).toLocaleString()}</div>
          </div>
        </div>

        {/* Team Info */}
        {player.team && (
          <div className="pcv-section">
            <div className="pcv-section-label">Team</div>
            <div className="pcv-section-value">{player.team.name}</div>
            {player.club_name && (
              <div className="pcv-section-sub">{player.club_name}</div>
            )}
          </div>
        )}

        {/* Position Info */}
        <div className="pcv-section">
          <div className="pcv-section-label">Position</div>
          <div className="pcv-section-value">
            {player.position === 'F' ? 'Forward' : player.position === 'D' ? 'Defense' : player.position === 'G' ? 'Goalie' : 'Unknown'}
          </div>
        </div>

        {/* Note */}
        <div className="pcv-note">
          <div className="pcv-note-icon">ℹ️</div>
          <div className="pcv-note-text">This is a read-only view. Only {player.display_name} can log shots and update settings.</div>
        </div>
      </div>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.parent-card-view {
  padding: 14px;
  min-height: 100vh;
  background: var(--bg);
}

.parent-card-view.loading,
.parent-card-view.error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.loading-spinner {
  font-size: 14px;
  color: var(--text-mute);
  letter-spacing: 2px;
  text-transform: uppercase;
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.error-text {
  font-size: 13px;
  color: var(--text-mute);
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.4;
}

.error-btn {
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
}

.pcv-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding: 4px 0;
}

.pcv-back {
  background: transparent;
  border: none;
  color: var(--ice);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 0;
}

.pcv-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
}

.pcv-container {
  max-width: 400px;
  margin: 0 auto;
}

.pcv-card {
  background: linear-gradient(135deg, rgba(41, 121, 255, 0.1), rgba(61, 214, 140, 0.05));
  border: 0.5px solid var(--accent);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.pcv-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  margin: 0 auto 12px;
}

.pcv-name {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.pcv-rank {
  font-size: 12px;
  color: var(--ice);
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.pcv-card-number {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: var(--text-mute);
  letter-spacing: 2px;
}

.pcv-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.pcv-stat {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 12px;
  padding: 14px;
  text-align: center;
}

.pcv-stat-label {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
  font-weight: 600;
}

.pcv-stat-value {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--ice);
}

.pcv-section {
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 12px;
}

.pcv-section-label {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 6px;
  font-weight: 600;
}

.pcv-section-value {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.3px;
}

.pcv-section-sub {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 4px;
}

.pcv-note {
  background: rgba(41, 121, 255, 0.08);
  border: 0.5px solid rgba(41, 121, 255, 0.2);
  border-radius: 12px;
  padding: 12px;
  margin-top: 20px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.pcv-note-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.pcv-note-text {
  font-size: 12px;
  color: var(--text-soft);
  line-height: 1.4;
}
`
