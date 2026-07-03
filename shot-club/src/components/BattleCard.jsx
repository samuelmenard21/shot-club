export default function BattleCard({ battle, onLogNow }) {
  if (!battle) return null

  const { myShots, rivalShots, rivalName, rivalTeamName, daysLeft, loggedToday, rivalLoggedToday } = battle
  const total = myShots + rivalShots
  const myPct = total === 0 ? 50 : Math.max(4, Math.min(96, Math.round((myShots / total) * 100)))
  const gap = myShots - rivalShots
  const winning = gap >= 0
  const isFinalDay = daysLeft === 0

  let statusText = ''
  let statusClass = ''
  if (isFinalDay && !winning) {
    statusText = '🚨 Last day — go shoot something'
    statusClass = 'bc-status--urgent'
  } else if (isFinalDay && winning) {
    statusText = '🏁 Last day — hold the lead and win it'
    statusClass = 'bc-status--urgent'
  } else if (!loggedToday) {
    statusText = "⚡ You haven't logged today. Your rival might be shooting right now."
    statusClass = 'bc-status--warn'
  } else if (winning && gap > 0) {
    statusText = `🔥 Up ${gap.toLocaleString()} shots — keep building the lead`
    statusClass = 'bc-status--lead'
  } else if (!winning && gap < 0) {
    statusText = `💪 Down ${Math.abs(gap).toLocaleString()} shots — time to push`
    statusClass = 'bc-status--chase'
  } else {
    statusText = 'Tied — next shot wins the lead'
    statusClass = 'bc-status--neutral'
  }

  const handleShare = async () => {
    const text = `${myShots.toLocaleString()} vs ${rivalShots.toLocaleString()} shots this week — 1v1 battle on Hockey Shot Challenge ⚔️ hockeyshotchallenge.com`
    if (navigator.share) { try { await navigator.share({ text }) } catch (_) {} }
    else { try { await navigator.clipboard.writeText(text) } catch (_) {} }
  }

  return (
    <div className={`bc${winning ? ' bc--winning' : ''}`}>
      <div className="bc-header">
        <div className="bc-eyebrow">
          ⚔️ 1V1 BATTLE · {isFinalDay ? 'FINAL DAY' : `${daysLeft} DAY${daysLeft === 1 ? '' : 'S'} LEFT`}
        </div>
        <button className="bc-share-btn" onClick={handleShare}>Share</button>
      </div>

      <div className="bc-matchup">
        <div className="bc-side">
          <div className="bc-name bc-name--me">You</div>
          <div className={`bc-score${winning ? ' bc-score--lead' : ''}`}>{myShots.toLocaleString()}</div>
          <div className="bc-logged">{loggedToday ? '✓ logged today' : '— not yet today'}</div>
        </div>

        <div className="bc-vs">VS</div>

        <div className="bc-side bc-side--right">
          <div className="bc-name">{rivalName.split(' ')[0]}</div>
          <div className={`bc-score${!winning ? ' bc-score--lead' : ''}`}>{rivalShots.toLocaleString()}</div>
          <div className="bc-logged bc-logged--rival">{rivalLoggedToday ? '✓ logged today' : '— quiet today'}</div>
        </div>
      </div>

      <div className="bc-bar-track">
        <div className="bc-bar-fill" style={{ width: `${myPct}%` }} />
        <div className="bc-bar-pct bc-bar-pct--left">{myPct}%</div>
        <div className="bc-bar-pct bc-bar-pct--right">{100 - myPct}%</div>
      </div>

      <div className="bc-rival-team">{rivalTeamName} · resets Monday</div>

      <div className={`bc-status ${statusClass}`}>{statusText}</div>

      {!loggedToday && onLogNow && (
        <button className="bc-log-btn" onClick={onLogNow}>+ Log shots now</button>
      )}

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.bc {
  margin: 0 0 12px;
  background: var(--surface);
  border: 1px solid var(--border-dim);
  border-radius: 16px;
  padding: 14px 16px;
  animation: fade-in 0.3s ease-out;
}
.bc--winning { border-color: rgba(37,99,235,0.3); }
.bc-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 14px;
}
.bc-eyebrow {
  font-size: 10px; font-weight: 700; letter-spacing: 1.2px;
  color: var(--text-mute); text-transform: uppercase;
}
.bc-share-btn {
  font-size: 11px; font-weight: 700;
  color: var(--ice); background: transparent;
  border: 1px solid var(--border-dim);
  border-radius: 6px; padding: 3px 10px; cursor: pointer;
}
.bc-share-btn:active { opacity: 0.7; }

.bc-matchup {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 14px;
}
.bc-side { flex: 1; min-width: 0; }
.bc-side--right { text-align: right; }
.bc-name {
  font-size: 14px; font-weight: 700; color: var(--text-soft);
  margin-bottom: 2px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.bc-name--me { color: var(--ice); }
.bc-score {
  font-size: 38px; font-weight: 800; line-height: 1;
  color: var(--text-soft); font-variant-numeric: tabular-nums;
}
.bc-score--lead { color: var(--ice); }
.bc-logged {
  font-size: 11px; color: var(--text-mute); margin-top: 3px;
}
.bc-logged--rival { }

.bc-vs {
  font-size: 12px; font-weight: 800; color: var(--text-mute);
  flex-shrink: 0;
}

.bc-bar-track {
  height: 7px; background: rgba(255,255,255,0.08);
  border-radius: 99px; overflow: hidden;
  margin-bottom: 4px; position: relative;
}
.bc-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #1d4ed8, #67e8f9);
  border-radius: 99px;
  transition: width 0.6s ease;
  min-width: 4px;
}
.bc-bar-pct {
  position: absolute; top: 10px;
  font-size: 10px; color: var(--text-mute);
}
.bc-bar-pct--left { left: 0; }
.bc-bar-pct--right { right: 0; }

.bc-rival-team {
  font-size: 11px; color: var(--text-mute);
  text-align: center; margin: 18px 0 4px;
}

.bc-status {
  font-size: 12px; font-weight: 600; line-height: 1.4;
  padding: 8px 10px; border-radius: 8px;
  background: rgba(255,255,255,0.04);
  margin-top: 8px;
}
.bc-status--warn { color: #fb923c; }
.bc-status--lead { color: var(--ice); }
.bc-status--chase { color: #f87171; }
.bc-status--urgent { color: #fb923c; font-weight: 700; }
.bc-status--neutral { color: var(--text-mute); }

.bc-log-btn {
  width: 100%; margin-top: 10px;
  background: var(--accent);
  color: white; border-radius: 10px;
  padding: 12px 16px;
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700;
  letter-spacing: 0.4px;
  transition: transform 0.1s;
}
.bc-log-btn:active { transform: scale(0.98); }
`
