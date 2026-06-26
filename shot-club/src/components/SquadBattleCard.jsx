import { useState } from 'react'
import { setSquadName } from '../lib/challenges'

export default function SquadBattleCard({ squadBattle, teamId, onLogNow }) {
  const [editing, setEditing] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [localName, setLocalName] = useState(null)

  if (!squadBattle) return null

  const { mySquad, rivalSquad, daysLeft, weekStart, squadIndex, isLeader } = squadBattle
  const myShots = mySquad.totalWeekShots
  const rivalShots = rivalSquad.totalWeekShots
  const total = myShots + rivalShots
  const myPct = total === 0 ? 50 : Math.max(4, Math.min(96, Math.round((myShots / total) * 100)))
  const gap = myShots - rivalShots
  const winning = gap >= 0
  const me = mySquad.members.find((m) => m.isMe)
  const iLoggedToday = me?.loggedToday || false
  const isFinalDay = daysLeft === 0
  const displayName = localName ?? mySquad.name

  let statusText = ''
  let statusClass = ''
  if (isFinalDay && !winning) {
    statusText = '🚨 FINAL DAY — time to make your move'
    statusClass = 'sbc-status--urgent'
  } else if (isFinalDay && winning) {
    statusText = '🏁 FINAL DAY — hold the lead and win it'
    statusClass = 'sbc-status--urgent'
  } else if (!iLoggedToday && mySquad.loggedTodayCount === 0) {
    statusText = "⚡ No one's logged yet today. Be the first."
    statusClass = 'sbc-status--warn'
  } else if (!iLoggedToday) {
    statusText = `⚡ You haven't logged today. Your squad needs you.`
    statusClass = 'sbc-status--warn'
  } else if (mySquad.fullSquadDay) {
    statusText = '✅ Full squad day — everyone showed up'
    statusClass = 'sbc-status--good'
  } else if (winning && gap > 0) {
    statusText = `🔥 Up ${gap.toLocaleString()} shots — keep building the lead`
    statusClass = 'sbc-status--lead'
  } else if (!winning && gap < 0) {
    statusText = `💪 Down ${Math.abs(gap).toLocaleString()} shots — time to push`
    statusClass = 'sbc-status--chase'
  } else {
    statusText = 'Dead even — next shot wins the lead'
    statusClass = 'sbc-status--neutral'
  }

  const handleSaveName = async () => {
    const trimmed = nameInput.trim()
    if (trimmed && trimmed !== mySquad.name) {
      setLocalName(trimmed)
      try { await setSquadName(teamId, weekStart, squadIndex, trimmed) } catch (_) {}
    }
    setEditing(false)
  }

  const handleShare = async () => {
    const text = `${displayName} vs ${rivalSquad.name} — ${myShots.toLocaleString()} to ${rivalShots.toLocaleString()} shots this week ⚔️ hockeyshotchallenge.com`
    if (navigator.share) { try { await navigator.share({ text }) } catch (_) {} }
    else { await navigator.clipboard.writeText(text) }
  }

  return (
    <div className={`sbc${mySquad.fullSquadDay ? ' sbc--gold' : winning ? ' sbc--winning' : ''}`}>
      <div className="sbc-header">
        <div className="sbc-eyebrow">
          ⚔️ SQUAD BATTLE · {isFinalDay ? 'FINAL DAY' : `${daysLeft} DAY${daysLeft === 1 ? '' : 'S'} LEFT`}
        </div>
        <button className="sbc-share-btn" onClick={handleShare}>Share</button>
      </div>

      <div className="sbc-matchup">
        <div className="sbc-side">
          {editing ? (
            <input
              className="sbc-name-input"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              autoFocus
              maxLength={20}
            />
          ) : (
            <div
              className={`sbc-squad-name sbc-squad-name--mine${isLeader ? ' sbc-squad-name--editable' : ''}`}
              onClick={isLeader ? () => { setNameInput(displayName); setEditing(true) } : undefined}
            >
              {displayName}
              {isLeader && <span className="sbc-edit">✎</span>}
            </div>
          )}
          <div className={`sbc-score${winning ? ' sbc-score--lead' : ''}`}>{myShots.toLocaleString()}</div>
        </div>

        <div className="sbc-center">
          <div className="sbc-vs">VS</div>
        </div>

        <div className="sbc-side sbc-side--right">
          <div className="sbc-squad-name sbc-squad-name--rival">{rivalSquad.name}</div>
          <div className="sbc-rival-team">{rivalSquad.teamName}</div>
          <div className={`sbc-score${!winning ? ' sbc-score--lead' : ''}`}>{rivalShots.toLocaleString()}</div>
        </div>
      </div>

      <div className="sbc-bar-track">
        <div className="sbc-bar-fill" style={{ width: `${myPct}%` }} />
        <div className="sbc-bar-pct sbc-bar-pct--left">{myPct}%</div>
        <div className="sbc-bar-pct sbc-bar-pct--right">{100 - myPct}%</div>
      </div>

      <div className="sbc-rosters">
        <div className="sbc-roster">
          {mySquad.members.map((m) => (
            <div key={m.id} className={`sbc-player${m.isMe ? ' sbc-player--me' : ''}`}>
              <div className="sbc-player-top">
                <div className={`sbc-dot${m.loggedToday ? ' sbc-dot--on' : ''}`} />
                <div className="sbc-player-name">{m.isMe ? 'You' : m.display_name.split(' ')[0]}</div>
                {m.isLeader && <div className="sbc-cap">C</div>}
              </div>
              <div className="sbc-player-shots">{m.todayShots > 0 ? m.todayShots : '—'}</div>
            </div>
          ))}
        </div>

        <div className="sbc-roster-divider" />

        <div className="sbc-roster sbc-roster--rival">
          {rivalSquad.members.map((m) => (
            <div key={m.id} className="sbc-player sbc-player--rival">
              <div className="sbc-player-top">
                <div className={`sbc-dot sbc-dot--rival${m.loggedToday ? ' sbc-dot--on' : ''}`} />
                <div className="sbc-player-name">{m.display_name[0]}.</div>
              </div>
              <div className="sbc-player-shots">{m.todayShots > 0 ? m.todayShots : '—'}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`sbc-status ${statusClass}`}>{statusText}</div>

      {!iLoggedToday && onLogNow && (
        <button className="sbc-log-btn" onClick={onLogNow}>+ Log shots now</button>
      )}

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.sbc {
  margin: 0 0 12px;
  background: var(--surface);
  border: 1px solid var(--border-dim);
  border-radius: 16px;
  padding: 14px 16px;
  animation: fade-in 0.3s ease-out;
}
.sbc--winning {
  border-color: rgba(37,99,235,0.3);
}
.sbc--gold {
  border-color: rgba(251,191,36,0.5);
  background: linear-gradient(135deg, rgba(251,191,36,0.06) 0%, var(--surface) 60%);
}
.sbc-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 12px;
}
.sbc-eyebrow {
  font-size: 10px; font-weight: 700; letter-spacing: 1.2px;
  color: var(--text-mute); text-transform: uppercase;
}
.sbc-share-btn {
  font-size: 11px; font-weight: 700;
  color: var(--ice); background: transparent;
  border: 1px solid var(--border-dim);
  border-radius: 6px; padding: 3px 10px; cursor: pointer;
}
.sbc-share-btn:active { opacity: 0.7; }

.sbc-matchup {
  display: flex; align-items: flex-start; gap: 8px;
  margin-bottom: 12px;
}
.sbc-side { flex: 1; min-width: 0; }
.sbc-side--right { text-align: right; }
.sbc-squad-name {
  font-size: 13px; font-weight: 800; letter-spacing: 0.3px;
  line-height: 1.2; margin-bottom: 3px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.sbc-squad-name--mine { color: var(--text); }
.sbc-squad-name--editable { cursor: pointer; }
.sbc-squad-name--editable:active { opacity: 0.7; }
.sbc-squad-name--rival { color: var(--text-soft); }
.sbc-edit {
  font-size: 11px; color: var(--text-mute);
  margin-left: 5px; vertical-align: middle;
}
.sbc-rival-team {
  font-size: 10px; color: var(--text-mute); margin-bottom: 4px;
}
.sbc-name-input {
  width: 100%; background: var(--bg);
  border: 1px solid var(--ice); border-radius: 8px;
  padding: 6px 10px; color: var(--text);
  font-size: 13px; font-weight: 700;
  font-family: inherit; margin-bottom: 3px;
}
.sbc-name-input:focus { outline: none; }
.sbc-center {
  display: flex; align-items: center;
  padding-top: 18px; flex-shrink: 0;
}
.sbc-vs {
  font-size: 11px; font-weight: 800; color: var(--text-mute);
}
.sbc-score {
  font-size: 30px; font-weight: 800; line-height: 1;
  color: var(--text-soft); font-variant-numeric: tabular-nums;
}
.sbc-score--lead { color: var(--ice); }

.sbc-bar-track {
  height: 7px; background: rgba(255,255,255,0.08);
  border-radius: 99px; overflow: hidden;
  margin-bottom: 4px; position: relative;
}
.sbc-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #1d4ed8, #67e8f9);
  border-radius: 99px;
  transition: width 0.6s ease;
  min-width: 4px;
}
.sbc-bar-pct {
  position: absolute; top: 10px;
  font-size: 10px; color: var(--text-mute);
}
.sbc-bar-pct--left { left: 0; }
.sbc-bar-pct--right { right: 0; }

.sbc-rosters {
  display: flex; gap: 10px; align-items: flex-start;
  margin-top: 18px; margin-bottom: 12px;
}
.sbc-roster {
  display: flex; gap: 6px; flex: 1; min-width: 0;
}
.sbc-roster--rival { justify-content: flex-end; }
.sbc-roster-divider {
  width: 1px; background: var(--border-dim);
  align-self: stretch; flex-shrink: 0;
  margin: 0 2px;
}
.sbc-player {
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  min-width: 0; flex: 1;
}
.sbc-player--me .sbc-player-name { color: var(--ice); font-weight: 800; }
.sbc-player-top {
  display: flex; align-items: center; gap: 3px;
}
.sbc-player-name {
  font-size: 11px; font-weight: 600; color: var(--text-soft);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 52px;
}
.sbc-cap {
  font-size: 9px; font-weight: 800; color: #fbbf24;
  background: rgba(251,191,36,0.15);
  border-radius: 3px; padding: 0 3px; flex-shrink: 0;
}
.sbc-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--border-dim); flex-shrink: 0;
}
.sbc-dot--on { background: #22c55e; }
.sbc-dot--rival.sbc-dot--on { background: #ef4444; }
.sbc-player-shots {
  font-size: 16px; font-weight: 800; line-height: 1;
  color: var(--text-soft); font-variant-numeric: tabular-nums;
}
.sbc-player--me .sbc-player-shots { color: var(--ice); }

.sbc-status {
  font-size: 12px; font-weight: 600; line-height: 1.4;
  padding: 8px 10px; border-radius: 8px;
  background: rgba(255,255,255,0.04);
}
.sbc-status--warn { color: #fb923c; }
.sbc-status--good { color: #22c55e; }
.sbc-status--lead { color: var(--ice); }
.sbc-status--chase { color: #f87171; }
.sbc-status--urgent { color: #fb923c; font-weight: 700; }
.sbc-status--neutral { color: var(--text-mute); }

.sbc-log-btn {
  width: 100%; margin-top: 10px;
  background: var(--accent);
  color: white; border-radius: 10px;
  padding: 12px 16px;
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.4px;
  transition: transform 0.1s;
}
.sbc-log-btn:active { transform: scale(0.98); }
`
