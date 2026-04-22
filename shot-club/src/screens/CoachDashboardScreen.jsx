import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyCoachProfile, getClubStats, getClubTeams, getClubPlayers, createInvite } from '../lib/clubs'
import { signOut } from '../lib/auth'
import { setSEO, CANONICAL_URL } from '../lib/seo'

export default function CoachDashboardScreen() {
  const nav = useNavigate()
  const [coach, setCoach] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ playerCount: 0, teamCount: 0, totalShots: 0 })
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [tab, setTab] = useState('overview') // 'overview' | 'roster' | 'share'
  const [copied, setCopied] = useState('')
  const [shared, setShared] = useState(false)

  useEffect(() => {
    setSEO({ title: 'Coach dashboard', noindex: true })
    ;(async () => {
      const profile = await getMyCoachProfile()
      if (!profile) {
        nav('/coach')
        return
      }
      setCoach(profile)
      if (profile.club?.id) {
        const [s, t, p] = await Promise.all([
          getClubStats(profile.club.id),
          getClubTeams(profile.club.id),
          getClubPlayers(profile.club.id),
        ])
        setStats(s)
        setTeams(t)
        setPlayers(p)
      }
      setLoading(false)
    })()
  }, [nav])

  if (loading) {
    return (
      <div className="dash-wrap dash-loading">
        <div>Loading…</div>
        <style>{styles}</style>
      </div>
    )
  }

  if (!coach?.club) {
    return null
  }

  const joinUrl = `${CANONICAL_URL}/join/${coach.club.slug}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(joinUrl)
      setCopied('link')
      setTimeout(() => setCopied(''), 2000)
    } catch (e) {}
  }

  const copyMessage = async () => {
    const msg = `Join the ${coach.club.name} on Hockey Shot Challenge! Track every shot, climb the leaderboard, earn your rank. Sign up here: ${joinUrl}`
    try {
      await navigator.clipboard.writeText(msg)
      setCopied('message')
      setTimeout(() => setCopied(''), 2000)
    } catch (e) {}
  }

  const sharePage = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Join ${coach.club.name}`,
          text: `Join the ${coach.club.name} on Hockey Shot Challenge!`,
          url: joinUrl,
        })
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } else {
        copyLink()
      }
    } catch (e) {}
  }

  const doSignOut = async () => {
    if (!window.confirm('Sign out?')) return
    await signOut()
    nav('/coach')
  }

  return (
    <div className="dash-wrap">
      <nav className="dash-nav">
        <div className="dash-brand" onClick={() => nav('/')}>
          <BrandMark />
          <span>Coach dashboard</span>
        </div>
        <button className="dash-signout" onClick={doSignOut}>Sign out</button>
      </nav>

      <div className="dash-inner">
        <div className="dash-header">
          <div className="dash-eyebrow">YOUR CLUB</div>
          <h1 className="dash-title">{coach.club.name}</h1>
          {coach.club.city && <div className="dash-city">{coach.club.city}</div>}
        </div>

        <div className="dash-tabs">
          <button className={`dash-tab ${tab === 'overview' ? 'dash-tab--active' : ''}`} onClick={() => setTab('overview')}>
            Overview
          </button>
          <button className={`dash-tab ${tab === 'roster' ? 'dash-tab--active' : ''}`} onClick={() => setTab('roster')}>
            Roster
          </button>
          <button className={`dash-tab ${tab === 'share' ? 'dash-tab--active' : ''}`} onClick={() => setTab('share')}>
            Invite players
          </button>
        </div>

        {tab === 'overview' && (
          <>
            <div className="dash-stats">
              <div className="dash-stat">
                <div className="dash-stat-num tnum">{stats.playerCount}</div>
                <div className="dash-stat-label">Players</div>
              </div>
              <div className="dash-stat">
                <div className="dash-stat-num tnum">{stats.teamCount}</div>
                <div className="dash-stat-label">Teams</div>
              </div>
              <div className="dash-stat">
                <div className="dash-stat-num tnum">{stats.totalShots.toLocaleString()}</div>
                <div className="dash-stat-label">Shots logged</div>
              </div>
            </div>

            <div className="dash-section">
              <div className="dash-section-head">
                <div className="dash-label">Your public join page</div>
                <a className="dash-visit" href={joinUrl} target="_blank" rel="noopener noreferrer">
                  View ↗
                </a>
              </div>
              <div className="dash-url-box">
                <div className="dash-url tnum">{joinUrl}</div>
                <button className={`dash-copy ${copied === 'link' ? 'dash-copy--done' : ''}`} onClick={copyLink}>
                  {copied === 'link' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <div className="dash-hint">
                Share this with your players. Anyone who opens it and signs up joins your club automatically.
              </div>
            </div>

            <div className="dash-section">
              <div className="dash-label">Quick actions</div>
              <div className="dash-actions">
                <button className="dash-action" onClick={sharePage}>
                  <div className="dash-action-icon">↗</div>
                  <div className="dash-action-text">
                    <div className="dash-action-title">{shared ? 'Sent!' : 'Share link'}</div>
                    <div className="dash-action-sub">Text, email, or post it</div>
                  </div>
                </button>
                <button className="dash-action" onClick={() => setTab('share')}>
                  <div className="dash-action-icon">👥</div>
                  <div className="dash-action-text">
                    <div className="dash-action-title">Invite players</div>
                    <div className="dash-action-sub">Message templates & QR</div>
                  </div>
                </button>
              </div>
            </div>

            {teams.length > 0 && (
              <div className="dash-section">
                <div className="dash-label">Teams in your club</div>
                <div className="dash-pills">
                  {teams.map((t) => (
                    <div key={t.id} className="dash-pill">{t.name}</div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {tab === 'roster' && (
          <>
            <div className="dash-label" style={{ marginBottom: 10 }}>
              {players.length} player{players.length === 1 ? '' : 's'}
            </div>
            {players.length === 0 ? (
              <div className="dash-empty">
                <div className="dash-empty-title">No players yet</div>
                <div className="dash-empty-sub">Share your join link and they'll start appearing here.</div>
                <button className="dash-btn-ghost" onClick={() => setTab('share')}>Invite players →</button>
              </div>
            ) : (
              <div className="dash-roster">
                {players.map((p, i) => (
                  <div key={p.id} className="dash-player">
                    <div className="dash-player-rank">{i + 1}</div>
                    <div className="dash-player-avatar">{p.display_name[0]?.toUpperCase()}</div>
                    <div className="dash-player-info">
                      <div className="dash-player-name">{p.display_name}</div>
                      <div className="dash-player-sub">
                        {p.team?.name || 'No team'} · {p.position || '—'}
                      </div>
                    </div>
                    {p.current_streak > 0 && (
                      <div className="dash-player-streak">🔥 {p.current_streak}</div>
                    )}
                    <div className="dash-player-shots tnum">{p.lifetime_shots.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'share' && (
          <>
            <div className="dash-section">
              <div className="dash-label">QR code for your club</div>
              <div className="dash-qr-box">
                <QRPreview url={joinUrl} />
                <div className="dash-qr-caption">
                  Print this, post it in the rink. Kids scan → they're signed up in your club.
                </div>
                <a
                  className="dash-btn-ghost"
                  href={`https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(joinUrl)}&bgcolor=0a0e1a&color=e8eef7&qzone=2`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download high-res QR ↗
                </a>
              </div>
            </div>

            <div className="dash-section">
              <div className="dash-label">Ready-to-send message</div>
              <div className="dash-msg-box">
                <div className="dash-msg">
                  Join the {coach.club.name} on Hockey Shot Challenge! Track every shot, climb the leaderboard, earn your rank. Sign up here: {joinUrl}
                </div>
                <button className={`dash-btn ${copied === 'message' ? 'dash-btn--done' : ''}`} onClick={copyMessage}>
                  {copied === 'message' ? '✓ Copied — paste into group chat' : 'Copy message'}
                </button>
              </div>
              <div className="dash-hint">
                Paste this into your team's group chat, email, or Slack.
              </div>
            </div>

            <div className="dash-section">
              <div className="dash-label">Tips for coaches</div>
              <ul className="dash-tips">
                <li>Post the QR in the dressing room or on the rink bulletin board</li>
                <li>Send the link on Day 1 of the season — kids are most excited then</li>
                <li>Mention the global leaderboard — kids love competing beyond the rink</li>
                <li>Make it a team challenge: "Whoever logs the most shots this week gets first line next game"</li>
              </ul>
            </div>
          </>
        )}
      </div>

      <style>{styles}</style>
    </div>
  )
}

function QRPreview({ url }) {
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&bgcolor=0a0e1a&color=e8eef7&qzone=2`
  return (
    <img
      src={src}
      alt="Club join QR code"
      width="220"
      height="220"
      style={{ display: 'block', borderRadius: 12, border: '0.5px solid var(--border-dim)' }}
    />
  )
}

function BrandMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 40 40" style={{ display: 'block', flexShrink: 0 }}>
      <circle cx="20" cy="20" r="17" fill="#1a2847" stroke="#2979ff" strokeWidth="1" />
      <path d="M 12 22 L 17.5 27 L 28 15" stroke="#a8d4f5" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const styles = `
.dash-wrap {
  min-height: 100dvh;
  background: var(--bg);
  width: 100%; max-width: none;
  color: var(--text);
}
.dash-loading {
  display: flex; align-items: center; justify-content: center;
  color: var(--text-mute);
  font-family: var(--font-display);
  letter-spacing: 2px; font-size: 12px;
}

.dash-nav {
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px clamp(16px, 5vw, 40px);
  max-width: 1100px; margin: 0 auto;
  border-bottom: 0.5px solid var(--border-dim);
}
.dash-brand {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display);
  font-weight: 800; font-size: 14px;
  letter-spacing: 0.5px;
  cursor: pointer;
}
.dash-signout {
  color: var(--text-mute);
  font-size: 13px;
  padding: 6px 12px;
}
.dash-signout:hover { color: var(--danger); }

.dash-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px clamp(16px, 5vw, 40px) 60px;
}

.dash-header { margin-bottom: 24px; }
.dash-eyebrow {
  font-family: var(--font-display);
  font-size: 11px; font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  margin-bottom: 6px;
}
.dash-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 40px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.3px;
  margin: 0;
  color: white;
}
.dash-city {
  font-size: 14px; color: var(--text-mute);
  margin-top: 4px;
}

.dash-tabs {
  display: flex; gap: 4px;
  padding: 4px;
  background: var(--surface);
  border-radius: var(--radius);
  margin-bottom: 20px;
  overflow-x: auto;
}
.dash-tab {
  flex: 1;
  min-width: max-content;
  padding: 10px 14px;
  border-radius: 9px;
  color: var(--ice);
  font-family: var(--font-display);
  font-size: 13px; font-weight: 700;
  letter-spacing: 0.4px;
  background: transparent;
  white-space: nowrap;
}
.dash-tab--active {
  background: var(--accent);
  color: white;
}

.dash-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 20px;
  padding: 16px;
  background: var(--surface-raised);
  border-radius: var(--radius);
  border: 0.5px solid var(--border-dim);
}
.dash-stat { text-align: center; }
.dash-stat-num {
  font-family: var(--font-display);
  font-size: clamp(22px, 4vw, 28px);
  font-weight: 800;
  color: var(--ice);
  line-height: 1;
}
.dash-stat-label {
  font-size: 10px;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  margin-top: 6px;
  text-transform: uppercase;
}

.dash-section {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 14px;
}
.dash-section-head {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 10px;
}
.dash-label {
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-mute);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.dash-visit {
  color: var(--ice);
  font-size: 12px;
  text-decoration: none;
  padding: 4px 10px;
  border: 0.5px solid var(--border-dim);
  border-radius: 999px;
}
.dash-url-box {
  display: flex; gap: 8px; align-items: center;
  background: var(--bg);
  border-radius: var(--radius);
  padding: 4px 4px 4px 14px;
  border: 0.5px solid var(--border-dim);
}
.dash-url {
  flex: 1; min-width: 0;
  color: var(--ice);
  font-size: 13px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--font-display);
}
.dash-copy {
  background: var(--accent);
  color: white;
  padding: 9px 14px;
  border-radius: 9px;
  font-size: 12px; font-weight: 700;
  letter-spacing: 0.3px;
  flex-shrink: 0;
  font-family: var(--font-display);
}
.dash-copy--done { background: var(--success); }

.dash-hint {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 10px;
  line-height: 1.4;
}

.dash-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.dash-action {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 14px 12px;
  display: flex; align-items: center; gap: 12px;
  text-align: left;
  transition: all 0.15s;
}
.dash-action:hover {
  border-color: var(--accent);
}
.dash-action-icon {
  width: 34px; height: 34px;
  background: var(--accent-bg);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  color: var(--ice);
  flex-shrink: 0;
}
.dash-action-title {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: white;
}
.dash-action-sub {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 2px;
}

.dash-pills {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.dash-pill {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  color: var(--ice);
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px; font-weight: 600;
  font-family: var(--font-display);
  letter-spacing: 0.4px;
}

/* Roster */
.dash-empty {
  text-align: center; padding: 40px 20px;
  background: var(--surface);
  border-radius: var(--radius);
}
.dash-empty-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin-bottom: 6px;
}
.dash-empty-sub {
  font-size: 13px;
  color: var(--text-mute);
  margin-bottom: 18px;
}
.dash-btn-ghost {
  background: transparent;
  border: 0.5px solid var(--accent);
  color: var(--accent);
  padding: 10px 18px;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-display);
  letter-spacing: 0.4px;
  display: inline-block;
  text-decoration: none;
}
.dash-btn-ghost:hover {
  background: var(--accent);
  color: white;
}

.dash-roster {
  display: flex; flex-direction: column; gap: 4px;
}
.dash-player {
  display: flex; align-items: center; gap: 10px;
  background: var(--surface);
  border-radius: 10px;
  padding: 10px 12px;
}
.dash-player-rank {
  width: 24px;
  font-family: var(--font-display);
  font-size: 13px; font-weight: 700;
  color: var(--text-mute);
  text-align: center;
}
.dash-player-avatar {
  width: 30px; height: 30px;
  border-radius: 50%;
  background: var(--accent);
  color: white;
  font-family: var(--font-display);
  font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.dash-player-info { flex: 1; min-width: 0; }
.dash-player-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.3px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.dash-player-sub {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 2px;
}
.dash-player-streak {
  font-size: 11px;
  color: var(--warn-soft);
  background: rgba(255, 122, 41, 0.15);
  padding: 3px 7px;
  border-radius: 999px;
  font-weight: 600;
}
.dash-player-shots {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 800;
  color: white;
}

/* Share tab */
.dash-qr-box {
  text-align: center;
  padding: 18px 0;
}
.dash-qr-caption {
  font-size: 13px;
  color: var(--text-soft);
  margin: 14px 0;
  line-height: 1.5;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
}
.dash-msg-box { }
.dash-msg {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 14px;
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.5;
  margin-bottom: 10px;
}
.dash-btn {
  width: 100%;
  background: var(--accent);
  color: white;
  padding: 12px;
  border-radius: var(--radius);
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.4px;
}
.dash-btn--done { background: var(--success); }
.dash-tips {
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.6;
}
.dash-tips li { margin-bottom: 6px; }
`
