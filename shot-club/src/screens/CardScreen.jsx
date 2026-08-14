import { useEffect, useMemo, useState, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNotifications } from '../hooks/useNotifications'
import { getRank, RANKS } from '../lib/ranks'
import { getLifetimeBreakdown } from '../lib/shots'
import SevenDayChart from '../components/SevenDayChart'
import AchievementBadgeRow from '../components/AchievementBadgeRow'

export default function CardScreen() {
  const { player } = useAuth()
  const { toast } = useNotifications()
  const [breakdown, setBreakdown] = useState(null)
  const [shareState, setShareState] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    if (!player) return
    getLifetimeBreakdown(player.id).then(setBreakdown)
  }, [player])

  const rank = useMemo(() => getRank(player?.lifetime_shots || 0), [player?.lifetime_shots])

  if (!player) return null

  const joinedDate = player.created_at
    ? new Date(player.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '—'

  const cardNumber = player.card_number || 0
  const cardNumberDisplay = String(cardNumber).padStart(3, '0')

  const positionFull = player.position === 'F' ? 'Forward' : player.position === 'D' ? 'Defense' : 'Goalie'

  const total = breakdown ? Object.values(breakdown).reduce((s, v) => s + v, 0) : 0
  const pct = (n) => total > 0 ? Math.round((n / total) * 100) : 0
  const mix = breakdown ? [
    { name: 'Wrist', val: breakdown.Wrist, pct: pct(breakdown.Wrist), color: '#2979ff' },
    { name: 'Snap', val: breakdown.Snap, pct: pct(breakdown.Snap), color: '#a8d4f5' },
    { name: 'Slap', val: breakdown.Slap, pct: pct(breakdown.Slap), color: '#ff7a29' },
    { name: 'Backhand', val: breakdown.Backhand, pct: pct(breakdown.Backhand), color: '#3dd68c' },
  ].filter(m => m.val > 0) : []

  let specialty = null
  if (mix.length > 0) {
    const top = [...mix].sort((a, b) => b.pct - a.pct)[0]
    if (top.pct >= 50) specialty = `${top.name} specialist`
    else if (mix.length >= 3) specialty = 'Balanced shooter'
    else specialty = `${top.name} focused`
  }

  const handleShareClick = () => {
    setShowShareModal(true)
  }

  const handleCopyShareLink = async () => {
    try {
      const shareUrl = `${window.location.origin}/card/${player.username}`
      await navigator.clipboard.writeText(shareUrl)
      toast('✓ Link copied to clipboard', 'success')
      setShowShareModal(false)
    } catch (e) {
      toast('Failed to copy link', 'error')
    }
  }

  const handleCopyParentLink = async () => {
    try {
      const parentUrl = `${window.location.origin}/card/${player.id}/parent`
      await navigator.clipboard.writeText(parentUrl)
      toast('✓ Parent link copied', 'success')
      setShowInviteModal(false)
    } catch (e) {
      toast('Failed to copy link', 'error')
    }
  }

  return (
    <div className="card-screen fade-in">
      <header className="card-header">
        <h1 className="card-title">My card</h1>
        <div className="card-header-buttons">
          <button className="card-header-btn" onClick={() => setShowInviteModal(true)}>
            👨‍👩‍👧 Invite Parent
          </button>
          <button className="share-link" onClick={handleShareClick}>
            Share ↗
          </button>
        </div>
      </header>

      <div ref={cardRef} className="player-card">
        <div className="player-card-bg">
          <svg viewBox="0 0 320 220" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M -20 140 Q 80 110, 180 150 T 360 130" stroke="#a8d4f5" strokeWidth="0.5" fill="none" opacity="0.3" />
            <path d="M -20 160 Q 100 130, 200 170 T 360 150" stroke="#a8d4f5" strokeWidth="0.5" fill="none" opacity="0.25" />
            <path d="M -20 180 Q 120 150, 220 190 T 360 170" stroke="#a8d4f5" strokeWidth="0.5" fill="none" opacity="0.2" />
            <circle cx="40" cy="40" r="1" fill="#a8d4f5" opacity="0.6" />
            <circle cx="280" cy="30" r="1" fill="#a8d4f5" opacity="0.5" />
            <circle cx="180" cy="50" r="0.8" fill="#a8d4f5" opacity="0.5" />
            <circle cx="80" cy="70" r="0.8" fill="#a8d4f5" opacity="0.4" />
            <circle cx="290" cy="80" r="1" fill="#a8d4f5" opacity="0.5" />
          </svg>
        </div>

        <div className="player-card-content">
          <div className="card-meta">
            <div>
              <div className="card-meta-label">HOCKEY SHOT CHALLENGE · {new Date().getFullYear()}</div>
              <div className="card-meta-handle">@{player.username}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="card-meta-label">CARD</div>
              <div className="card-meta-serial tnum">#{cardNumberDisplay}</div>
            </div>
          </div>

          <div className="card-identity">
            <div className="card-avatar">
              <svg viewBox="0 0 80 80" style={{ width: '100%', height: '100%' }}>
                <polygon points="40,4 72,22 72,58 40,76 8,58 8,22" fill="#1a2847" stroke="#2979ff" strokeWidth="1.5" />
                <polygon points="40,12 66,26 66,54 40,68 14,54 14,26" fill="none" stroke="#4a92ff" strokeWidth="0.5" opacity="0.6" />
              </svg>
              <div className="card-avatar-letters">
                {player.display_name.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="card-identity-text">
              <div className="card-display-name">{player.display_name}</div>
              <div className="card-pills">
                <div className="card-pill">{positionFull.toUpperCase()}</div>
                {player.team?.name && <div className="card-pill">{player.team.name}</div>}
                {player.club_name && <div className="card-pill card-pill--club">{player.club_name}</div>}
              </div>
            </div>
          </div>

          <div className="card-rank">
            <div className="card-rank-row">
              <div>
                <div className="card-meta-label">Current rank</div>
                <div className="card-rank-name-row">
                  <RankIcon rank={rank.name} />
                  <div className="card-rank-name">{rank.name} <span className="card-rank-tier">{rank.tier}</span></div>
                </div>
              </div>
              {!rank.isMax && (
                <div style={{ textAlign: 'right' }}>
                  <div className="card-meta-label">NEXT</div>
                  <div className="card-rank-next">{rank.nextRankName}</div>
                  <div className="card-rank-togo tnum">{rank.shotsToNextRank.toLocaleString()} to go</div>
                </div>
              )}
            </div>
            {!rank.isMax && (
              <div className="card-rank-bar">
                <div className="card-rank-bar-fill" style={{ width: `${Math.round(rank.progress * 100)}%` }} />
              </div>
            )}
          </div>

          <div className="card-stats">
            <div className="card-stat">
              <div className="card-stat-num tnum">{player.lifetime_shots.toLocaleString()}</div>
              <div className="card-stat-label">Lifetime</div>
            </div>
            <div className="card-stat">
              <div className="card-stat-num-row">
                {player.current_streak > 0 && <FlameIcon />}
                <div className="card-stat-num tnum">{player.current_streak}</div>
              </div>
              <div className="card-stat-label">Streak</div>
            </div>
            <div className="card-stat">
              <div className="card-stat-num">{player.position}</div>
              <div className="card-stat-label">Position</div>
            </div>
          </div>

          {mix.length > 0 && (
            <div className="card-mix">
              <div className="card-mix-head">
                <div className="card-meta-label">Shot mix · lifetime</div>
                {specialty && <div className="card-specialty">{specialty}</div>}
              </div>
              <div className="card-mix-bar">
                {mix.map(m => (
                  <div key={m.name} style={{ width: `${m.pct}%`, background: m.color }} />
                ))}
              </div>
              <div className="card-mix-legend">
                {mix.map(m => (
                  <div key={m.name} className="card-mix-item">
                    <span style={{ color: m.color }}>●</span>
                    <span>{m.name} {m.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="card-footer">
            <div>
              <div className="card-meta-label">Joined</div>
              <div className="card-footer-text">{joinedDate}</div>
            </div>
            <div className="card-meta-label">HSC</div>
          </div>
        </div>
      </div>

      <SevenDayChart playerId={player.id} />
      <AchievementBadgeRow playerId={player.id} />

      <div className="rank-ladder">
        <div className="label-sm" style={{ marginBottom: 8, padding: '0 4px' }}>The ladder</div>
        <div className="rank-ladder-rows">
          {RANKS.map((r) => {
            const reached = player.lifetime_shots >= r.floor
            const current = rank.name === r.name
            return (
              <div key={r.name} className={`ladder-row ${current ? 'ladder-row--current' : ''} ${!reached ? 'ladder-row--locked' : ''}`}>
                <div className="ladder-icon"><RankIcon rank={r.name} small /></div>
                <div className="ladder-name">{r.name}</div>
                <div className="ladder-range tnum">
                  {r.next === Infinity ? `${r.floor.toLocaleString()}+` : `${r.floor.toLocaleString()}–${r.next.toLocaleString()}`}
                </div>
                {current && <div className="ladder-current-tag">You</div>}
              </div>
            )
          })}
        </div>
      </div>

      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🔗</div>
            <h2 className="modal-title">Share Your Card</h2>

            <div className="modal-section">
              <div className="modal-label">Direct Link</div>
              <div className="modal-input-group">
                <input
                  type="text"
                  className="modal-input"
                  value={`${window.location.origin}/card/${player.username}`}
                  readOnly
                />
                <button className="modal-copy-btn" onClick={handleCopyShareLink}>Copy</button>
              </div>
            </div>

            <div className="modal-section">
              <div className="modal-label">QR Code</div>
              <img
                className="modal-qr"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`${window.location.origin}/card/${player.username}`)}`}
                alt="QR Code"
              />
            </div>

            <button className="modal-close-btn" onClick={() => setShowShareModal(false)}>Done</button>
          </div>
        </div>
      )}

      {showInviteModal && (
        <div className="modal-overlay" onClick={() => setShowInviteModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">👨‍👩‍👧</div>
            <h2 className="modal-title">Invite a Parent</h2>

            <div className="modal-description">
              Share this link with a parent or guardian. They can view your progress without needing an account.
            </div>

            <div className="modal-section">
              <div className="modal-label">Parent View Link</div>
              <div className="modal-input-group">
                <input
                  type="text"
                  className="modal-input"
                  value={`${window.location.origin}/card/${player.id}/parent`}
                  readOnly
                />
                <button className="modal-copy-btn" onClick={handleCopyParentLink}>Copy</button>
              </div>
            </div>

            <button className="modal-close-btn" onClick={() => setShowInviteModal(false)}>Done</button>
          </div>
        </div>
      )}

      <style>{styles}</style>
    </div>
  )
}

function RankIcon({ rank, small }) {
  const size = small ? 16 : 22
  const props = { width: size, height: size }
  switch (rank) {
    case 'Rookie':
      return <svg {...props} viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#a8d4f5" opacity="0.7" /></svg>
    case 'Junior':
      return <svg {...props} viewBox="0 0 16 16"><polygon points="8,2 14,14 2,14" fill="#a8d4f5" /></svg>
    case 'Prospect':
      return <svg {...props} viewBox="0 0 16 16"><polygon points="8,2 14,5 14,11 8,14 2,11 2,5" fill="#7f77dd" /></svg>
    case 'Varsity':
      return <svg {...props} viewBox="0 0 24 24"><polygon points="12,2 15,9 22,9 16.5,13.5 18.5,21 12,17 5.5,21 7.5,13.5 2,9 9,9" fill="#ffb94a" /></svg>
    case 'Captain':
      return <svg {...props} viewBox="0 0 24 24">
        <path d="M 6 4 L 18 4 L 18 10 Q 18 16, 12 19 Q 6 16, 6 10 Z" fill="#ffb94a" stroke="#ff9b1a" strokeWidth="0.5" />
        <text x="12" y="14" textAnchor="middle" fontFamily="var(--font-display)" fontSize="10" fontWeight="700" fill="#2a2416">C</text>
      </svg>
    case 'All-Star':
      return <svg {...props} viewBox="0 0 16 16"><polygon points="8,1 9.7,5.4 14.4,5.8 10.8,9 11.9,13.7 8,11.2 4.1,13.7 5.2,9 1.6,5.8 6.3,5.4" fill="#ffb94a" /></svg>
    case 'Legend':
      return <svg {...props} viewBox="0 0 16 16">
        <path d="M 4 4 L 12 4 L 12 8 Q 12 12, 8 13 Q 4 12, 4 8 Z" fill="#ffb94a" />
        <rect x="7.4" y="1" width="1.2" height="3" fill="#ffb94a" />
        <rect x="3" y="3" width="10" height="1.5" fill="#ffb94a" />
      </svg>
    default:
      return <svg {...props} viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#a8d4f5" /></svg>
  }
}

function FlameIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 12 14" style={{ display: 'block' }}>
      <path d="M6 0 C 6 4, 10 4, 10 8 C 10 11, 8 13, 6 13 C 4 13, 2 11, 2 8 C 2 6, 4 6, 4 4 C 4 2, 6 2, 6 0 Z" fill="#ff7a29" />
    </svg>
  )
}

const styles = `
.card-screen { padding: 14px 14px 30px; }
.card-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 4px 4px 14px;
}
.card-title {
  font-family: var(--font-display);
  font-size: 24px; font-weight: 700;
  letter-spacing: 0.5px;
}
.card-header-buttons {
  display: flex; gap: 8px; align-items: center;
}
.card-header-btn {
  background: transparent;
  color: var(--ice);
  font-size: 12px; font-weight: 600;
  padding: 6px 10px;
  border-radius: 8px;
  border: 0.5px solid var(--border-dim);
  cursor: pointer;
  transition: all 0.15s;
}
.card-header-btn:active {
  background: rgba(41, 121, 255, 0.1);
}
.share-link {
  background: transparent;
  color: var(--ice);
  font-size: 13px; font-weight: 500;
  padding: 6px 12px;
  border-radius: 999px;
  border: 0.5px solid var(--border-dim);
  cursor: pointer;
  transition: all 0.15s;
}
.share-link:active {
  background: rgba(41, 121, 255, 0.1);
}

.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex; align-items: flex-end; justify-content: center;
  z-index: 100;
  padding: 16px;
}
.modal-content {
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 20px;
  padding: 24px 20px 20px;
  width: 100%; max-width: 380px;
  text-align: center;
}
.modal-icon {
  font-size: 32px;
  margin-bottom: 12px;
}
.modal-title {
  font-family: var(--font-display);
  font-size: 20px; font-weight: 800;
  color: white; margin-bottom: 8px;
}
.modal-description {
  font-size: 13px;
  color: var(--text-soft);
  margin-bottom: 16px;
  line-height: 1.5;
}
.modal-section {
  margin-bottom: 16px;
  text-align: left;
}
.modal-label {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 8px;
}
.modal-input-group {
  display: flex; gap: 8px;
}
.modal-input {
  flex: 1;
  padding: 10px 12px;
  font-size: 12px;
  border: 0.5px solid var(--border-dim);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text-mute);
  font-family: monospace;
  word-break: break-all;
}
.modal-copy-btn {
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
  flex-shrink: 0;
}
.modal-copy-btn:active {
  transform: scale(0.98);
}
.modal-qr {
  width: 160px;
  height: 160px;
  border: 2px solid var(--border);
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}
.modal-close-btn {
  width: 100%;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 14px;
  margin-top: 12px;
}
.modal-close-btn:active {
  transform: scale(0.98);
}

.player-card {
  position: relative;
  background: var(--surface-raised);
  border: 0.5px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: 18px;
}
.player-card-bg { position: absolute; inset: 0; opacity: 0.22; pointer-events: none; }
.player-card-content { position: relative; padding: clamp(14px, 4vw, 18px); }

.card-meta {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 14px; gap: 10px;
}
.card-meta-label {
  font-size: 11px; color: var(--text-mute);
  letter-spacing: 1.5px; text-transform: uppercase;
  font-weight: 500;
}
.card-meta-handle {
  font-size: 11px; color: var(--ice);
  margin-top: 2px;
  font-family: var(--font-display);
  font-weight: 600; letter-spacing: 0.5px;
}
.card-meta-serial {
  font-size: 14px; color: var(--text);
  font-family: var(--font-display);
  font-weight: 700; margin-top: 2px;
}

.card-identity {
  display: flex; gap: 14px; align-items: center;
  margin-bottom: 16px;
}
.card-avatar {
  position: relative;
  width: clamp(64px, 18vw, 78px);
  height: clamp(64px, 18vw, 78px);
  flex-shrink: 0;
}
.card-avatar-letters {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: clamp(22px, 6vw, 28px);
  font-weight: 800; color: white; letter-spacing: 1px;
}
.card-identity-text { flex: 1; min-width: 0; }
.card-display-name {
  font-family: var(--font-display);
  font-size: clamp(20px, 6vw, 24px);
  font-weight: 800; letter-spacing: 0.4px;
  line-height: 1.05; word-break: break-word;
}
.card-pills { display: flex; gap: 5px; margin-top: 7px; flex-wrap: wrap; }
.card-pill {
  background: var(--accent-bg);
  color: var(--ice);
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 10px; font-weight: 600;
  letter-spacing: 0.5px;
  font-family: var(--font-display);
}
.card-pill--club {
  background: transparent;
  border: 0.5px solid var(--border);
  color: var(--text-soft);
}

.card-rank {
  background: rgba(10,14,26,0.5);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 12px 14px;
  margin-bottom: 14px;
}
.card-rank-row {
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 8px; gap: 12px;
}
.card-rank-name-row {
  display: flex; align-items: center; gap: 8px;
  margin-top: 4px;
}
.card-rank-name {
  font-family: var(--font-display);
  font-size: clamp(18px, 5vw, 22px);
  font-weight: 800; letter-spacing: 0.5px;
}
.card-rank-tier { color: var(--gold); font-size: 14px; }
.card-rank-next {
  font-family: var(--font-display);
  font-size: 13px; font-weight: 700;
  color: var(--ice);
}
.card-rank-togo { font-size: 10px; color: var(--text-mute); margin-top: 1px; }
.card-rank-bar {
  height: 5px;
  background: var(--bg);
  border-radius: 999px;
  overflow: hidden;
}
.card-rank-bar-fill {
  height: 100%; background: var(--gold); border-radius: 999px;
  transition: width 0.4s;
}

.card-stats {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 8px; margin-bottom: 14px;
}
.card-stat {
  text-align: center;
  background: rgba(10,14,26,0.4);
  border-radius: 10px;
  padding: 10px 4px;
}
.card-stat-num {
  font-family: var(--font-display);
  font-size: clamp(18px, 5vw, 22px);
  font-weight: 800; line-height: 1; color: white;
}
.card-stat-num-row { display: inline-flex; align-items: center; gap: 4px; }
.card-stat-label {
  font-size: 11px; color: var(--text-mute);
  letter-spacing: 1px; margin-top: 5px;
  text-transform: uppercase;
}

.card-mix { margin-bottom: 14px; }
.card-mix-head {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 8px;
}
.card-specialty {
  font-size: 10px; color: var(--ice);
  font-family: var(--font-display);
  font-weight: 700; letter-spacing: 0.5px;
}
.card-mix-bar {
  display: flex; height: 6px;
  border-radius: 999px; overflow: hidden;
  background: var(--bg);
  margin-bottom: 8px;
}
.card-mix-bar > div { transition: width 0.4s; }
.card-mix-legend {
  display: flex; flex-wrap: wrap; gap: 8px 12px;
  font-size: 10px; color: var(--text-soft);
}
.card-mix-item { display: flex; align-items: center; gap: 4px; }

.card-footer {
  padding-top: 12px;
  border-top: 0.5px solid var(--border-dim);
  display: flex; justify-content: space-between; align-items: center;
}
.card-footer-text { font-size: 11px; color: var(--text); margin-top: 1px; }

.rank-ladder {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 12px;
}
.rank-ladder-rows { display: flex; flex-direction: column; gap: 4px; }
.ladder-row {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 10px;
  background: var(--bg);
  border-radius: 10px;
  position: relative;
}
.ladder-row--current {
  background: var(--surface-raised);
  border: 0.5px solid var(--gold);
}
.ladder-row--locked { opacity: 0.45; }
.ladder-icon {
  width: 22px; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.ladder-name {
  flex: 1;
  font-family: var(--font-display);
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.4px;
}
.ladder-range { font-size: 11px; color: var(--text-mute); }
.ladder-current-tag {
  background: var(--gold);
  color: var(--gold-bg);
  font-family: var(--font-display);
  font-size: 11px; font-weight: 800;
  letter-spacing: 1px;
  padding: 2px 7px;
  border-radius: 999px;
  margin-left: 6px;
}
`
