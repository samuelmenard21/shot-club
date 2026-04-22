import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { getRank } from '../lib/ranks'
import { getLifetimeBreakdown } from '../lib/shots'
import { setSEO, CANONICAL_URL } from '../lib/seo'

export default function CardPublicScreen() {
  const { username } = useParams()
  const nav = useNavigate()
  const [player, setPlayer] = useState(null)
  const [breakdown, setBreakdown] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!username) return
    ;(async () => {
      const { data } = await supabase
        .from('players')
        .select('id, username, display_name, position, lifetime_shots, current_streak, card_number, created_at, club_name, team:teams(id, name), club:clubs(id, name, slug)')
        .eq('username', username)
        .maybeSingle()

      if (!data) {
        setNotFound(true)
        setLoading(false)
        setSEO({ title: 'Card not found', noindex: true })
        return
      }

      setPlayer(data)
      const rank = getRank(data.lifetime_shots)
      setSEO({
        title: `${data.display_name}'s card`,
        description: `${rank.fullName} · ${data.lifetime_shots.toLocaleString()} shots · Check out ${data.display_name}'s Hockey Shot Challenge card.`,
        url: `${CANONICAL_URL}/card/${username}`,
      })

      const bd = await getLifetimeBreakdown(data.id)
      setBreakdown(bd)
      setLoading(false)
    })()
  }, [username])

  if (loading) {
    return (
      <div className="pc-wrap pc-loading">
        <div>Loading…</div>
        <style>{styles}</style>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="pc-wrap">
        <div className="pc-card">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, marginBottom: 12 }}>Card not found</h1>
          <p style={{ color: 'var(--text-mute)', marginBottom: 20 }}>We couldn't find a player with that username.</p>
          <button className="pc-cta" onClick={() => nav('/')}>Go to Hockey Shot Challenge</button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  const rank = getRank(player.lifetime_shots)
  const cardNumber = player.card_number ? String(player.card_number).padStart(3, '0') : '000'
  const positionFull = player.position === 'F' ? 'Forward' : player.position === 'D' ? 'Defense' : 'Goalie'

  const total = breakdown ? Object.values(breakdown).reduce((s, v) => s + v, 0) : 0
  const pct = (n) => total > 0 ? Math.round((n / total) * 100) : 0
  const mix = breakdown ? [
    { name: 'Wrist', val: breakdown.Wrist, pct: pct(breakdown.Wrist), color: '#2979ff' },
    { name: 'Snap', val: breakdown.Snap, pct: pct(breakdown.Snap), color: '#a8d4f5' },
    { name: 'Slap', val: breakdown.Slap, pct: pct(breakdown.Slap), color: '#ff7a29' },
    { name: 'Backhand', val: breakdown.Backhand, pct: pct(breakdown.Backhand), color: '#3dd68c' },
  ].filter(m => m.val > 0) : []

  return (
    <div className="pc-wrap">
      <nav className="pc-nav">
        <div className="pc-brand" onClick={() => nav('/')}>
          <BrandMark />
          <span>Hockey Shot Challenge</span>
        </div>
      </nav>

      <div className="pc-inner">
        <div className="pc-card">
          <div className="pc-meta">
            <div>
              <div className="pc-meta-label">HOCKEY SHOT CHALLENGE · {new Date().getFullYear()}</div>
              <div className="pc-meta-handle">@{player.username}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="pc-meta-label">CARD</div>
              <div className="pc-meta-serial">#{cardNumber}</div>
            </div>
          </div>

          <div className="pc-identity">
            <div className="pc-avatar">
              <svg viewBox="0 0 80 80" style={{ width: '100%', height: '100%' }}>
                <polygon points="40,4 72,22 72,58 40,76 8,58 8,22" fill="#1a2847" stroke="#2979ff" strokeWidth="1.5" />
                <polygon points="40,12 66,26 66,54 40,68 14,54 14,26" fill="none" stroke="#4a92ff" strokeWidth="0.5" opacity="0.6" />
              </svg>
              <div className="pc-avatar-letters">{player.display_name.slice(0, 2).toUpperCase()}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="pc-name">{player.display_name}</div>
              <div className="pc-pills">
                <div className="pc-pill">{positionFull.toUpperCase()}</div>
                {player.team?.name && <div className="pc-pill">{player.team.name}</div>}
                {(player.club?.name || player.club_name) && (
                  <div className="pc-pill pc-pill--alt">{player.club?.name || player.club_name}</div>
                )}
              </div>
            </div>
          </div>

          <div className="pc-rank">
            <div className="pc-meta-label">Current rank</div>
            <div className="pc-rank-name">{rank.name} <span style={{ color: 'var(--gold)' }}>{rank.tier}</span></div>
          </div>

          <div className="pc-stats">
            <div className="pc-stat">
              <div className="pc-stat-num">{player.lifetime_shots.toLocaleString()}</div>
              <div className="pc-stat-label">Lifetime</div>
            </div>
            <div className="pc-stat">
              <div className="pc-stat-num">{player.current_streak || 0}</div>
              <div className="pc-stat-label">Streak</div>
            </div>
            <div className="pc-stat">
              <div className="pc-stat-num">{player.position}</div>
              <div className="pc-stat-label">Pos</div>
            </div>
          </div>

          {mix.length > 0 && (
            <div className="pc-mix">
              <div className="pc-meta-label">Shot mix · lifetime</div>
              <div className="pc-mix-bar">
                {mix.map(m => (
                  <div key={m.name} style={{ width: `${m.pct}%`, background: m.color }} />
                ))}
              </div>
              <div className="pc-mix-legend">
                {mix.map(m => (
                  <div key={m.name} className="pc-mix-item">
                    <span style={{ color: m.color }}>●</span>
                    <span>{m.name} {m.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button className="pc-cta" onClick={() => nav('/start')}>
          Make your own card →
        </button>
        <div className="pc-hint">Free. 30 seconds. No email needed.</div>
      </div>

      <style>{styles}</style>
    </div>
  )
}

function BrandMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" style={{ display: 'block' }}>
      <circle cx="20" cy="20" r="17" fill="#1a2847" stroke="#2979ff" strokeWidth="1" />
      <path d="M 12 22 L 17.5 27 L 28 15" stroke="#a8d4f5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const styles = `
.pc-wrap {
  min-height: 100dvh;
  background: var(--bg);
  width: 100%; max-width: none;
}
.pc-loading {
  display: flex; align-items: center; justify-content: center;
  color: var(--text-mute);
  font-family: var(--font-display);
  letter-spacing: 2px; font-size: 12px;
}
.pc-nav {
  display: flex; justify-content: center;
  padding: 18px 20px;
  border-bottom: 0.5px solid var(--border-dim);
}
.pc-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display);
  font-weight: 800; font-size: 14px;
  letter-spacing: 0.5px;
  cursor: pointer;
}
.pc-inner {
  max-width: 430px;
  margin: 0 auto;
  padding: 24px 16px 40px;
  text-align: center;
}
.pc-card {
  background: var(--surface-raised);
  border: 0.5px solid var(--border);
  border-radius: 20px;
  padding: 18px;
  margin-bottom: 18px;
  text-align: left;
}
.pc-meta {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 16px;
}
.pc-meta-label {
  font-size: 9px; color: var(--text-mute);
  letter-spacing: 1.5px; font-weight: 500;
  text-transform: uppercase;
}
.pc-meta-handle {
  font-size: 11px; color: var(--ice);
  margin-top: 2px;
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.5px;
}
.pc-meta-serial {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  margin-top: 2px;
}

.pc-identity {
  display: flex; gap: 12px; align-items: center;
  margin-bottom: 16px;
}
.pc-avatar {
  position: relative;
  width: 70px; height: 70px;
  flex-shrink: 0;
}
.pc-avatar-letters {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 24px; font-weight: 800;
  color: white;
  letter-spacing: 1px;
}
.pc-name {
  font-family: var(--font-display);
  font-size: 24px; font-weight: 800;
  letter-spacing: 0.3px;
  line-height: 1.05;
  word-break: break-word;
}
.pc-pills {
  display: flex; gap: 5px; margin-top: 7px; flex-wrap: wrap;
}
.pc-pill {
  background: var(--accent-bg);
  color: var(--ice);
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-family: var(--font-display);
}
.pc-pill--alt {
  background: transparent;
  border: 0.5px solid var(--border);
  color: var(--text-soft);
}

.pc-rank {
  background: rgba(10,14,26,0.5);
  border: 0.5px solid var(--border-dim);
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 14px;
}
.pc-rank-name {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  letter-spacing: 0.4px;
  margin-top: 4px;
}

.pc-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}
.pc-stat {
  text-align: center;
  background: rgba(10,14,26,0.4);
  border-radius: 10px;
  padding: 10px 4px;
}
.pc-stat-num {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 800;
  color: white;
  line-height: 1;
}
.pc-stat-label {
  font-size: 9px; color: var(--text-mute);
  letter-spacing: 1px; margin-top: 5px;
  text-transform: uppercase;
}

.pc-mix { }
.pc-mix-bar {
  display: flex; height: 6px;
  border-radius: 999px; overflow: hidden;
  background: var(--bg);
  margin: 8px 0;
}
.pc-mix-legend {
  display: flex; flex-wrap: wrap; gap: 8px 12px;
  font-size: 10px; color: var(--text-soft);
}
.pc-mix-item { display: flex; align-items: center; gap: 4px; }

.pc-cta {
  width: 100%;
  background: var(--accent);
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}
.pc-cta:hover { background: var(--accent-soft); }
.pc-hint {
  font-size: 12px;
  color: var(--text-mute);
}
`
