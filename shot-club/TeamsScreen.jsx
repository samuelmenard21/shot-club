import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { getLeaderboardLifetime, getLeaderboardWeekly, getTeamSize } from '../lib/shots'
import { getRank } from '../lib/ranks'

export default function TeamsScreen() {
  const { player } = useAuth()
  const [scope, setScope] = useState('team') // 'team' | 'global'
  const [period, setPeriod] = useState('week') // 'week' | 'all'
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [teamSize, setTeamSize] = useState(0)

  // If they have no team, force global scope
  const effectiveScope = player?.team_id ? scope : 'global'

  useEffect(() => {
    if (!player) return
    setLoading(true)
    const teamId = effectiveScope === 'team' ? player.team_id : null
    const fetcher = period === 'week' ? getLeaderboardWeekly : getLeaderboardLifetime
    fetcher({ teamId }).then((r) => {
      setRows(r)
      setLoading(false)
    })
    if (player.team_id) {
      getTeamSize(player.team_id).then(setTeamSize)
    }
  }, [player, effectiveScope, period])

  const myRank = useMemo(() => {
    if (!player) return null
    const idx = rows.findIndex(r => r.id === player.id)
    return idx === -1 ? null : idx + 1
  }, [rows, player])

  const myRow = useMemo(() => rows.find(r => r.id === player?.id), [rows, player])

  // Find rows around me to show even if I'm deep in the list
  const aroundMe = useMemo(() => {
    if (!player || rows.length === 0) return []
    const idx = rows.findIndex(r => r.id === player.id)
    if (idx === -1 || idx < 5) return []
    return rows.slice(Math.max(0, idx - 1), Math.min(rows.length, idx + 2))
  }, [rows, player])

  const top = rows.slice(0, 5)

  if (!player) return null

  return (
    <div className="teams-screen fade-in">
      <header className="teams-header">
        <h1 className="teams-title">Leaderboard</h1>
      </header>

      {/* Scope selector */}
      <div className="seg-control">
        <button
          className={`seg-btn ${effectiveScope === 'team' ? 'seg-btn--active' : ''}`}
          onClick={() => setScope('team')}
          disabled={!player.team_id}
        >
          {player.team?.name || 'My Team'}
        </button>
        <button
          className={`seg-btn ${effectiveScope === 'global' ? 'seg-btn--active' : ''}`}
          onClick={() => setScope('global')}
        >
          Global
        </button>
      </div>

      {/* Period toggle */}
      <div className="period-row">
        <button
          className={`pill ${period === 'week' ? 'pill--active' : ''}`}
          onClick={() => setPeriod('week')}
        >
          This week
        </button>
        <button
          className={`pill ${period === 'all' ? 'pill--active' : ''}`}
          onClick={() => setPeriod('all')}
        >
          All time
        </button>
      </div>

      {/* Your spot */}
      {myRow && myRank && (
        <div className="my-spot">
          <div>
            <div className="label-sm">Your spot</div>
            <div className="my-spot-rank tnum">
              #{myRank}
              {effectiveScope === 'team' && teamSize > 0 && (
                <span className="my-spot-of"> of {teamSize}</span>
              )}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="label-sm">{period === 'week' ? 'Week shots' : 'Lifetime'}</div>
            <div className="my-spot-shots tnum">
              {(period === 'week' ? myRow.week_shots : myRow.lifetime_shots).toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {!myRow && period === 'week' && (
        <div className="empty-spot">
          <div>You haven't logged any shots this week yet.</div>
          <div style={{ fontSize: 12, color: 'var(--text-mute)', marginTop: 4 }}>Hit the home tab and rack 'em up.</div>
        </div>
      )}

      {/* Top of leaderboard */}
      {!loading && top.length > 0 && (
        <>
          <div className="label-sm" style={{ margin: '14px 4px 8px' }}>Top of the {effectiveScope === 'team' ? 'team' : 'board'}</div>
          <div className="board">
            {top.map((row, i) => (
              <Row
                key={row.id}
                row={row}
                rank={i + 1}
                isMe={row.id === player.id}
                period={period}
              />
            ))}
          </div>
        </>
      )}

      {/* Around me */}
      {aroundMe.length > 0 && (
        <>
          <div className="dots">· · ·</div>
          <div className="label-sm" style={{ margin: '0 4px 8px' }}>Around you</div>
          <div className="board">
            {aroundMe.map((row) => {
              const idx = rows.findIndex(r => r.id === row.id)
              return (
                <Row
                  key={row.id}
                  row={row}
                  rank={idx + 1}
                  isMe={row.id === player.id}
                  period={period}
                />
              )
            })}
          </div>
        </>
      )}

      {!loading && rows.length === 0 && (
        <div className="empty-state">
          <div className="empty-title">No shots logged yet</div>
          <div className="empty-sub">
            {effectiveScope === 'team'
              ? 'Be the first on your team this week.'
              : 'Be the first to put up a number.'}
          </div>
        </div>
      )}

      {loading && (
        <div className="empty-state">
          <div className="empty-sub">Loading…</div>
        </div>
      )}

      <style>{styles}</style>
    </div>
  )
}

function Row({ row, rank, isMe, period }) {
  const playerRank = getRank(row.lifetime_shots)
  const shotCount = period === 'week' ? row.week_shots : row.lifetime_shots
  const initials = row.display_name?.slice(0, 2).toUpperCase() || '??'

  return (
    <div className={`row ${isMe ? 'row--me' : ''}`}>
      <div className={`row-rank ${rank === 1 ? 'row-rank--gold' : rank <= 3 ? 'row-rank--silver' : ''}`}>
        {rank}
      </div>
      <div className="row-avatar">{initials}</div>
      <div className="row-info">
        <div className="row-name">
          {isMe ? 'You' : row.display_name}
          {row.position && <span className="row-pos"> · {row.position}</span>}
        </div>
        <div className="row-rank-name">{playerRank.fullName}</div>
      </div>
      {row.current_streak > 0 && (
        <div className="row-streak">
          <FlameIcon />
          <span className="tnum">{row.current_streak}</span>
        </div>
      )}
      <div className="row-shots tnum">{shotCount.toLocaleString()}</div>
    </div>
  )
}

function FlameIcon() {
  return (
    <svg width="9" height="11" viewBox="0 0 12 14" style={{ display: 'block' }}>
      <path d="M6 0 C 6 4, 10 4, 10 8 C 10 11, 8 13, 6 13 C 4 13, 2 11, 2 8 C 2 6, 4 6, 4 4 C 4 2, 6 2, 6 0 Z" fill="#ff7a29" />
    </svg>
  )
}

const styles = `
.teams-screen { padding: 14px 14px 30px; }
.teams-header { padding: 4px 4px 14px; }
.teams-title {
  font-family: var(--font-display);
  font-size: 24px; font-weight: 700;
  letter-spacing: 0.5px;
}

.seg-control {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  padding: 3px;
  background: var(--surface);
  border-radius: var(--radius);
  margin-bottom: 10px;
}
.seg-btn {
  padding: 9px 8px;
  border-radius: 9px;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: var(--ice);
  text-align: center;
  background: transparent;
  text-transform: uppercase;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.seg-btn--active {
  background: var(--accent);
  color: white;
}
.seg-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.period-row {
  display: flex; gap: 6px; margin-bottom: 14px;
}
.pill {
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--surface);
  color: var(--ice);
  font-size: 12px;
  font-weight: 500;
  border: 0.5px solid var(--border-dim);
  font-family: inherit;
}
.pill--active {
  background: var(--accent);
  color: white;
  border-color: var(--accent-soft);
}

.my-spot {
  background: var(--surface-raised);
  border: 0.5px solid var(--border);
  border-radius: var(--radius);
  padding: 14px;
  display: flex; justify-content: space-between; align-items: flex-end;
  margin-bottom: 12px;
}
.my-spot-rank {
  font-family: var(--font-display);
  font-size: 28px; font-weight: 800;
  color: white;
  margin-top: 2px;
  line-height: 1;
}
.my-spot-of {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text-mute);
  font-weight: 400;
}
.my-spot-shots {
  font-family: var(--font-display);
  font-size: 24px; font-weight: 800;
  color: var(--ice);
  margin-top: 2px;
  line-height: 1;
}

.empty-spot {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 14px;
  text-align: center;
  margin-bottom: 14px;
  font-size: 13px;
}

.dots {
  text-align: center;
  font-size: 14px;
  color: var(--text-mute);
  letter-spacing: 4px;
  padding: 12px 0;
}

.board {
  display: flex; flex-direction: column; gap: 4px;
}
.row {
  display: flex; align-items: center; gap: 10px;
  background: var(--surface);
  border-radius: 10px;
  padding: 10px;
}
.row--me {
  background: var(--surface-raised);
  border: 0.5px solid var(--accent);
}
.row-rank {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  width: 26px; height: 26px;
  border-radius: 50%;
  background: var(--bg);
  color: var(--ice);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.row-rank--gold { background: var(--gold); color: var(--gold-bg); }
.row-rank--silver { background: var(--text-soft); color: var(--bg); }
.row-avatar {
  width: 30px; height: 30px;
  border-radius: 50%;
  background: var(--accent-bg);
  color: var(--ice);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display);
  font-size: 11px; font-weight: 700;
  flex-shrink: 0;
}
.row-info { flex: 1; min-width: 0; }
.row-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.row-pos {
  color: var(--text-mute); font-weight: 400;
}
.row-rank-name {
  font-size: 11px;
  color: var(--text-mute);
  margin-top: 2px;
}
.row-streak {
  display: flex; align-items: center; gap: 3px;
  background: rgba(255, 122, 41, 0.15);
  padding: 3px 7px;
  border-radius: 999px;
  font-size: 11px;
  color: var(--warn-soft);
  font-weight: 600;
}
.row-shots {
  font-family: var(--font-display);
  font-size: 18px; font-weight: 800;
  color: white;
  margin-left: 4px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-mute);
}
.empty-title {
  font-family: var(--font-display);
  font-size: 16px; font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
}
.empty-sub { font-size: 13px; }
`
