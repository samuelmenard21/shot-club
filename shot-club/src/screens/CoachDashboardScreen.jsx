import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyCoachProfile, getClubStats, getClubTeams, getClubPlayers, getClubTeamRankings } from '../lib/clubs'
import { getMyTeams, getOrCreateTeamInvite, getPendingCoachesForOwnedTeams, approveTeamCoach } from '../lib/teams'
import { getClubDrillStats } from '../lib/clubs'
import { getTeamChallenge, setTeamChallenge, getTeamWeeklyShots } from '../lib/challenges'
import { signOut } from '../lib/auth'
import { setSEO, CANONICAL_URL } from '../lib/seo'

export default function CoachDashboardScreen() {
  const nav = useNavigate()
  const [coach, setCoach] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ playerCount: 0, teamCount: 0, totalShots: 0 })
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [myTeams, setMyTeams] = useState([])
  const [activeTeamId, setActiveTeamId] = useState(null)
  const [activeTeamCode, setActiveTeamCode] = useState(null)
  const [pendingCoaches, setPendingCoaches] = useState([])
  const [drillStats, setDrillStats] = useState([])
  const [teamRankings, setTeamRankings] = useState([])
  const [challenge, setChallenge] = useState(null)
  const [teamWeekShots, setTeamWeekShots] = useState(0)
  const [goalInput, setGoalInput] = useState('')
  const [savingGoal, setSavingGoal] = useState(false)
  const [tab, setTab] = useState('invite') // default to 'invite' since that's the main job
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
        const [s, t, p, mine, pending, drills, rankings] = await Promise.all([
          getClubStats(profile.club.id),
          getClubTeams(profile.club.id),
          getClubPlayers(profile.club.id),
          getMyTeams(profile.id),
          getPendingCoachesForOwnedTeams(profile.id),
          getClubDrillStats(profile.club.id),
          getClubTeamRankings(profile.club.id),
        ])
        setStats(s)
        setTeams(t)
        setPlayers(p)
        setMyTeams(mine)
        setPendingCoaches(pending)
        setDrillStats(drills)
        setTeamRankings(rankings)
        // Default the active team to the first one the coach belongs to
        if (mine.length > 0) {
          const first = mine[0]
          setActiveTeamId(first.id)
          // Get/create the invite for it
          try {
            const code = await getOrCreateTeamInvite({ teamId: first.id, coachId: profile.id })
            setActiveTeamCode(code)
          } catch (e) {}
        }
      }
      setLoading(false)
    })()
  }, [nav])

  // When active team changes, fetch its invite + challenge
  useEffect(() => {
    if (!activeTeamId || !coach?.id) return
    ;(async () => {
      try {
        const code = await getOrCreateTeamInvite({ teamId: activeTeamId, coachId: coach.id })
        setActiveTeamCode(code)
      } catch (e) {
        setActiveTeamCode(null)
      }
      const [ch, wk] = await Promise.all([
        getTeamChallenge(activeTeamId),
        getTeamWeeklyShots(activeTeamId),
      ])
      setChallenge(ch)
      setTeamWeekShots(wk)
      setGoalInput(ch?.goal_shots ? String(ch.goal_shots) : '')
    })()
  }, [activeTeamId, coach])

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

  const clubJoinUrl = `${CANONICAL_URL}/join/${coach.club.slug}`
  const teamJoinUrl = activeTeamCode ? `${CANONICAL_URL}/j/${activeTeamCode}` : null
  const activeTeam = myTeams.find((t) => t.id === activeTeamId)

  const handleSaveGoal = async () => {
    const shots = parseInt(goalInput, 10)
    if (!shots || shots < 1 || !activeTeamId) return
    setSavingGoal(true)
    try {
      const ch = await setTeamChallenge(activeTeamId, shots)
      setChallenge(ch)
    } catch (e) {
      console.warn('setTeamChallenge error:', e)
    }
    setSavingGoal(false)
  }

  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(''), 2000)
    } catch (e) {}
  }

  const teamInviteMessage = activeTeam && teamJoinUrl
    ? `Hey team — we're using Hockey Shot Challenge to track off-ice shots. Sign up here: ${teamJoinUrl}\n\nIt takes 30 seconds and you'll be on the ${activeTeam.club?.name || coach.club.name} ${activeTeam.age_division || ''} ${activeTeam.tier || ''} leaderboard.`
    : ''

  const sharePage = async (url, title, text) => {
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url })
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } else {
        copyText(url, 'link')
      }
    } catch (e) {}
  }

  const doApprove = async (pendingCoachId) => {
    if (!activeTeamId) return
    try {
      const ok = await approveTeamCoach({
        teamId: activeTeamId,
        pendingCoachId,
        approverCoachId: coach.id,
      })
      if (ok) {
        // Refetch
        const fresh = await getPendingCoachesForOwnedTeams(coach.id)
        setPendingCoaches(fresh)
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

        {/* Pending coach approvals — surface aggressively */}
        {pendingCoaches.length > 0 && (
          <div className="dash-pending">
            <div className="dash-pending-label">{pendingCoaches.length} coach{pendingCoaches.length === 1 ? '' : 'es'} waiting for approval</div>
            {pendingCoaches.map((p) => (
              <div key={p.id} className="dash-pending-item">
                <div>
                  <div className="dash-pending-name">{p.coach?.display_name}</div>
                  <div className="dash-pending-sub">wants to join {p.team?.name}</div>
                </div>
                <button className="dash-btn-mini" onClick={() => doApprove(p.coach?.id)}>
                  Approve
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="dash-tabs">
          <button className={`dash-tab ${tab === 'invite' ? 'dash-tab--active' : ''}`} onClick={() => setTab('invite')}>
            Invite players
          </button>
          <button className={`dash-tab ${tab === 'overview' ? 'dash-tab--active' : ''}`} onClick={() => setTab('overview')}>
            Overview
          </button>
          <button className={`dash-tab ${tab === 'roster' ? 'dash-tab--active' : ''}`} onClick={() => setTab('roster')}>
            Roster
          </button>
          <button className={`dash-tab ${tab === 'drills' ? 'dash-tab--active' : ''}`} onClick={() => setTab('drills')}>
            Drills
          </button>
        </div>

        {tab === 'invite' && (
          <>
            {myTeams.length === 0 ? (
              <div className="dash-empty">
                <div className="dash-empty-title">No teams yet</div>
                <div className="dash-empty-sub">Set up a team to start inviting players.</div>
              </div>
            ) : (
              <>
                {/* Team picker (if multiple teams) */}
                {myTeams.length > 1 && (
                  <div className="dash-section">
                    <div className="dash-label">Which team?</div>
                    <div className="dash-team-pills">
                      {myTeams.map((t) => (
                        <button
                          key={t.id}
                          className={`dash-team-pill ${t.id === activeTeamId ? 'dash-team-pill--active' : ''}`}
                          onClick={() => setActiveTeamId(t.id)}
                        >
                          {t.age_division} {t.tier}
                          {t.role === 'owner' && <span className="dash-pill-tag">OWNER</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTeam && teamJoinUrl && (
                  <>
                    {/* Primary: the link + share */}
                    <div className="dash-section">
                      <div className="dash-section-head">
                        <div className="dash-label">Player invite link</div>
                      </div>
                      <div className="dash-team-info">
                        {activeTeam.age_division} {activeTeam.tier}
                      </div>
                      <div className="dash-url-box">
                        <div className="dash-url tnum">{teamJoinUrl}</div>
                        <button className={`dash-copy ${copied === 'link' ? 'dash-copy--done' : ''}`} onClick={() => copyText(teamJoinUrl, 'link')}>
                          {copied === 'link' ? '✓' : 'Copy'}
                        </button>
                      </div>
                      <div className="dash-actions">
                        <button className="dash-action" onClick={() => sharePage(teamJoinUrl, `Join ${activeTeam.club?.name || coach.club.name}`, teamInviteMessage)}>
                          <div className="dash-action-icon">↗</div>
                          <div className="dash-action-text">
                            <div className="dash-action-title">{shared ? 'Sent!' : 'Share link'}</div>
                            <div className="dash-action-sub">Text, email, or post it</div>
                          </div>
                        </button>
                        <button className="dash-action" onClick={() => copyText(teamInviteMessage, 'message')}>
                          <div className="dash-action-icon">💬</div>
                          <div className="dash-action-text">
                            <div className="dash-action-title">{copied === 'message' ? 'Copied!' : 'Copy message'}</div>
                            <div className="dash-action-sub">Pre-written for group chat</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* QR code */}
                    <div className="dash-section">
                      <div className="dash-label">QR code</div>
                      <div className="dash-qr-box">
                        <QRPreview url={teamJoinUrl} />
                        <div className="dash-qr-caption">
                          Show this at practice. Players scan with their phone — they're signed up in 30 seconds.
                        </div>
                        <a
                          className="dash-btn-ghost"
                          href={`https://api.qrserver.com/v1/create-qr-code/?size=800x800&data=${encodeURIComponent(teamJoinUrl)}&bgcolor=0a0e1a&color=e8eef7&qzone=2`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download high-res QR ↗
                        </a>
                      </div>
                    </div>

                    {/* Email template */}
                    <div className="dash-section">
                      <div className="dash-section-head">
                        <div className="dash-label">Email to parents</div>
                        <button
                          className={`dash-copy ${copied === 'email' ? 'dash-copy--done' : ''}`}
                          onClick={() => {
                            const teamName = `${coach.club.name}${activeTeam ? ` ${activeTeam.age_division} ${activeTeam.tier}` : ''}`
                            const emailText = [
                              `Hi ${teamName} parents,`,
                              ``,
                              `We're using Hockey Shot Challenge this season to track off-ice training. Players log their shots at home — driveway, basement, wherever — and compete on a team leaderboard. It keeps them motivated between practices.`,
                              ``,
                              `Sign up here: ${teamJoinUrl}`,
                              ``,
                              `Takes 30 seconds. No app to install. Free.`,
                              ``,
                              `— ${coach.display_name || 'Coach'}`,
                            ].join('\n')
                            copyText(emailText, 'email')
                          }}
                        >
                          {copied === 'email' ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                      <div className="dash-email-preview">
                        <div className="dash-email-line dash-email-to">
                          <span className="dash-email-field">To:</span> {coach.club.name} parents
                        </div>
                        <div className="dash-email-line dash-email-sub-line">
                          <span className="dash-email-field">Subject:</span> Join us on Hockey Shot Challenge
                        </div>
                        <div className="dash-email-body">
                          <p>Hi {coach.club.name}{activeTeam ? ` ${activeTeam.age_division} ${activeTeam.tier}` : ''} parents,</p>
                          <p>We're using Hockey Shot Challenge this season to track off-ice training. Players log their shots at home — driveway, basement, wherever — and compete on a team leaderboard. It keeps them motivated between practices.</p>
                          <p>Sign up here: <span className="dash-email-link">{teamJoinUrl}</span></p>
                          <p>Takes 30 seconds. No app to install. Free.</p>
                          <p>— {coach.display_name || 'Coach'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="dash-section">
                      <div className="dash-label">Tips for coaches</div>
                      <ul className="dash-tips">
                        <li>Send the link in your team group chat right after practice</li>
                        <li>Show the QR at the next practice — easiest signup is in person</li>
                        <li>Mention the leaderboard — kids love competing with teammates</li>
                        <li>Make it a challenge: "Most shots this week gets first line next game"</li>
                      </ul>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}

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

            {teamRankings.filter((t) => t.week_shots > 0).length > 0 && (
              <div className="dash-section">
                <div className="dash-label" style={{ marginBottom: 10 }}>Team rankings — this week</div>
                <div className="tr-list">
                  {teamRankings.map((t, i) => {
                    const isMyTeam = myTeams.some((m) => m.id === t.id)
                    const medals = ['🥇', '🥈', '🥉']
                    return (
                      <div key={t.id} className={`tr-row${isMyTeam ? ' tr-row--mine' : ''}`}>
                        <div className="tr-rank">
                          {t.week_shots > 0 && medals[i] ? medals[i] : <span className="tr-rank-num">#{i + 1}</span>}
                        </div>
                        <div className="tr-info">
                          <div className="tr-name">{t.age_division} {t.tier}{isMyTeam ? <span className="tr-you"> YOU</span> : ''}</div>
                          <div className="tr-players">{t.player_count} player{t.player_count !== 1 ? 's' : ''}</div>
                        </div>
                        <div className="tr-shots tnum">{t.week_shots.toLocaleString()}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="dash-section">
              <div className="dash-section-head">
                <div className="dash-label">Club page (public)</div>
                <a className="dash-visit" href={clubJoinUrl} target="_blank" rel="noopener noreferrer">
                  View ↗
                </a>
              </div>
              <div className="dash-url-box">
                <div className="dash-url tnum">{clubJoinUrl}</div>
                <button className={`dash-copy ${copied === 'cluburl' ? 'dash-copy--done' : ''}`} onClick={() => copyText(clubJoinUrl, 'cluburl')}>
                  {copied === 'cluburl' ? '✓' : 'Copy'}
                </button>
              </div>
              <div className="dash-hint">
                For sharing the whole club. For team-specific invites, use the Invite Players tab.
              </div>
            </div>

            {myTeams.length > 0 && (
              <div className="dash-section">
                <div className="dash-label">Your teams</div>
                <div className="dash-pills">
                  {myTeams.map((t) => (
                    <div key={t.id} className="dash-pill">
                      {t.age_division} {t.tier}
                      {t.role === 'owner' && <span className="dash-pill-tag-inline">OWNER</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTeamId && (
              <div className="dash-section">
                <div className="dash-section-head">
                  <div className="dash-label">Team Challenge — this week</div>
                </div>
                {challenge && (
                  <div className="ch-progress-wrap">
                    <div className="ch-progress-bar">
                      <div
                        className="ch-progress-fill"
                        style={{ width: `${Math.min(100, Math.round((teamWeekShots / challenge.goal_shots) * 100))}%` }}
                      />
                    </div>
                    <div className="ch-progress-meta">
                      <span className="ch-shots-done">{teamWeekShots.toLocaleString()} shots</span>
                      <span className="ch-shots-goal">goal: {challenge.goal_shots.toLocaleString()}</span>
                    </div>
                    {teamWeekShots >= challenge.goal_shots && (
                      <div className="ch-complete">🏆 Goal crushed! Update it to keep the momentum going.</div>
                    )}
                  </div>
                )}
                <div className="ch-set-goal">
                  <input
                    className="ch-goal-input"
                    type="number"
                    min="1"
                    placeholder="Set a shot goal (e.g. 500)"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveGoal()}
                  />
                  <button
                    className="ch-goal-btn"
                    onClick={handleSaveGoal}
                    disabled={savingGoal || !goalInput}
                  >
                    {savingGoal ? '…' : challenge ? 'Update' : 'Set goal'}
                  </button>
                </div>
                <div className="dash-hint">Players will see a progress bar on their home screen.</div>
              </div>
            )}
          </>
        )}

        {tab === 'roster' && (
          <>
            <div className="dash-label" style={{ marginBottom: 10 }}>
              {players.length} player{players.length === 1 ? '' : 's'} in club
            </div>
            {players.length === 0 ? (
              <div className="dash-empty">
                <div className="dash-empty-title">No players yet</div>
                <div className="dash-empty-sub">Share your team invite link and they'll start appearing here.</div>
                <button className="dash-btn-ghost" onClick={() => setTab('invite')}>Invite players →</button>
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

        {tab === 'drills' && (
          <>
            <div className="dash-label" style={{ marginBottom: 10 }}>
              Stickhandling this week — {drillStats.length} player{drillStats.length === 1 ? '' : 's'} active
            </div>
            {drillStats.length === 0 ? (
              <div className="dash-empty">
                <div className="dash-empty-title">No drills logged yet</div>
                <div className="dash-empty-sub">Players will appear here once they log stickhandling reps on the home screen.</div>
              </div>
            ) : (
              <div className="dash-roster">
                {drillStats.map((p, i) => (
                  <div key={p.id} className="dash-player">
                    <div className="dash-player-rank">{i + 1}</div>
                    <div className="dash-player-avatar">{p.display_name[0]?.toUpperCase()}</div>
                    <div className="dash-player-info">
                      <div className="dash-player-name">{p.display_name}</div>
                      <div className="dash-player-sub">
                        {['Toe Drag', 'Figure 8', 'Lateral', 'One-Hand']
                          .filter((d) => p.drills[d])
                          .map((d) => `${d} ${p.drills[d]}`)
                          .join(' · ')}
                      </div>
                    </div>
                    <div className="dash-player-shots tnum">{p.drills.total}</div>
                  </div>
                ))}
              </div>
            )}
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
      alt="Team join QR code"
      width="220"
      height="220"
      style={{ display: 'block', borderRadius: 12, border: '0.5px solid var(--border-dim)', margin: '0 auto' }}
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

.dash-pending {
  background: rgba(255, 122, 41, 0.12);
  border: 0.5px solid rgba(255, 122, 41, 0.35);
  border-radius: var(--radius);
  padding: 14px;
  margin-bottom: 16px;
}
.dash-pending-label {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  color: var(--warn-soft);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.dash-pending-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 0;
  border-top: 0.5px solid rgba(255, 122, 41, 0.2);
}
.dash-pending-item:first-of-type { border-top: 0; }
.dash-pending-name {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  color: white;
}
.dash-pending-sub {
  font-size: 12px;
  color: var(--text-mute);
  margin-top: 2px;
}
.dash-btn-mini {
  background: var(--accent);
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  font-family: var(--font-display);
  letter-spacing: 0.4px;
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

.dash-team-pills {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.dash-team-pill {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  color: var(--ice);
  padding: 8px 14px;
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.4px;
  display: inline-flex; align-items: center; gap: 8px;
}
.dash-team-pill--active {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}
.dash-pill-tag {
  font-size: 9px;
  letter-spacing: 1px;
  background: rgba(255,255,255,0.15);
  padding: 2px 6px;
  border-radius: 4px;
}
.dash-pill-tag-inline {
  font-size: 9px;
  letter-spacing: 1px;
  margin-left: 6px;
  color: var(--text-mute);
  font-weight: 600;
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
.dash-team-info {
  font-family: var(--font-display);
  color: white;
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 10px;
  letter-spacing: 0.3px;
}
.dash-url-box {
  display: flex; gap: 8px; align-items: center;
  background: var(--bg);
  border-radius: var(--radius);
  padding: 4px 4px 4px 14px;
  border: 0.5px solid var(--border-dim);
  margin-bottom: 12px;
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

/* Email template */
.dash-email-preview {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  overflow: hidden;
  font-size: 13px;
}
.dash-email-line {
  display: flex; gap: 6px; align-items: baseline;
  padding: 8px 14px;
  border-bottom: 0.5px solid var(--border-dim);
  color: var(--text-mute);
  font-size: 12px;
}
.dash-email-field {
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-mute);
  text-transform: uppercase;
  flex-shrink: 0;
}
.dash-email-body {
  padding: 14px;
  color: var(--text-soft);
  line-height: 1.6;
}
.dash-email-body p { margin: 0 0 10px; }
.dash-email-body p:last-child { margin-bottom: 0; }
.dash-email-link { color: var(--ice); word-break: break-all; }

/* QR */
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

.dash-tips {
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.6;
}
.dash-tips li { margin-bottom: 6px; }

.tr-list { display: flex; flex-direction: column; gap: 6px; }
.tr-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--surface-2, rgba(255,255,255,0.04));
  border: 1px solid var(--border-dim);
}
.tr-row--mine {
  border-color: #2563eb;
  background: rgba(37,99,235,0.08);
}
.tr-rank { width: 28px; text-align: center; font-size: 18px; flex-shrink: 0; }
.tr-rank-num { font-size: 12px; font-weight: 600; color: var(--text-soft); }
.tr-info { flex: 1; min-width: 0; }
.tr-name { font-size: 14px; font-weight: 700; }
.tr-you { font-size: 10px; font-weight: 700; color: #2563eb; margin-left: 6px; letter-spacing: 0.5px; }
.tr-players { font-size: 11px; color: var(--text-soft); margin-top: 1px; }
.tr-shots { font-size: 16px; font-weight: 800; color: var(--ice, #67e8f9); flex-shrink: 0; }

.ch-progress-wrap { margin-bottom: 14px; }
.ch-progress-bar {
  height: 12px;
  background: var(--border, #e5e7eb);
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 8px;
}
.ch-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #06b6d4);
  border-radius: 99px;
  transition: width 0.4s ease;
  min-width: 4px;
}
.ch-progress-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}
.ch-shots-done { font-weight: 700; color: var(--text); }
.ch-shots-goal { color: var(--text-soft); }
.ch-complete {
  margin-top: 10px;
  background: rgba(251,191,36,0.12);
  border: 1px solid rgba(251,191,36,0.3);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 600;
  color: #92400e;
}
.ch-set-goal {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.ch-goal-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 8px;
  font-size: 14px;
  background: var(--surface);
  color: var(--text);
}
.ch-goal-input:focus { outline: 2px solid #2563eb; border-color: transparent; }
.ch-goal-btn {
  padding: 10px 18px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.ch-goal-btn:disabled { opacity: 0.5; cursor: not-allowed; }
`
