import { useState, useEffect, useRef } from 'react'
import { logShots, getStats, setLifetimeShots, logStickhandlingSession, getStickhandlingCount } from '../lib/shots'
import { setPlayerChallenge } from '../lib/challenges'
import { searchClubs, findOrCreateTeamForPlayer, updatePlayerClub, AGE_DIVISIONS, TIERS } from '../lib/clubs'
import { useNotifications } from '../hooks/useNotifications'
import { CHALLENGE_LIST, getSpec, milestonesFor, boxCount } from '../lib/challengeSpecs'

// The digital version of the printed sheet.
//
// One box = one chunk of shots (NOT one day) — a big Saturday fills several
// boxes here just like it would with a marker on paper. Box geometry always
// comes from lib/challengeSpecs, so this can never drift from the printable.
//
// Logging is session-based, matching the paper mental model: +1/+5 per shot
// type accumulate locally, "Log session" commits them all at once — nothing
// touches the real total until that tap, same as nothing's true on paper
// until you actually color the box in.

const SHOT_TYPES = [
  { name: 'Wrist', emoji: '🎯' },
  { name: 'Snap', emoji: '⚡' },
  { name: 'Slap', emoji: '💥' },
  { name: 'Backhand', emoji: '🔄' },
]
const EMPTY_SESSION = { Wrist: 0, Snap: 0, Slap: 0, Backhand: 0 }
const GRID_ROWS = 5 // fixed row count — matches the printable, whatever the tier

export default function TrackerGrid({ player, playerChallenge, playerChallengeProgress, onShotLogged, onClubConnected }) {
  const { toast } = useNotifications()
  const [session, setSession] = useState(EMPTY_SESSION)
  const [saving, setSaving] = useState(false)
  const [switching, setSwitching] = useState(false)
  const [todayByType, setTodayByType] = useState({})
  const [celebrating, setCelebrating] = useState(null)
  const [paperInput, setPaperInput] = useState('')
  const [settingPaper, setSettingPaper] = useState(false)
  const [stickCount, setStickCount] = useState(0)
  const [stickChecked, setStickChecked] = useState(false)

  const spec = getSpec(playerChallenge?.challenge_type)

  useEffect(() => {
    if (!player) return
    getStats(player.id)
      .then((s) => setTodayByType(s.todayByType || {}))
      .catch(() => {})
    getStickhandlingCount(player.id)
      .then(setStickCount)
      .catch(() => {})
  }, [player, playerChallengeProgress])

  // Real club/team, not a free-text field — reuses the existing club → team
  // (age division + tier) join instead of re-inventing that data entry.
  const team = player?.team
  const teamLine = team
    ? [team.club?.name, team.name, [team.age_division, team.tier].filter(Boolean).join('')]
        .filter(Boolean)
        .join(' · ')
    : null

  if (!player || !playerChallenge || !playerChallengeProgress) return null
  // Custom challenges have no printed sheet, so there's no grid to mirror.
  if (!spec) return null

  const currentShots = playerChallengeProgress.current_shots || 0
  const total = spec.total
  const step = spec.step
  const boxes = boxCount(spec)
  const cols = boxes / GRID_ROWS
  const milestones = milestonesFor(spec)
  const filledBoxes = Math.min(boxes, Math.floor(currentShots / step))
  const progressPct = Math.min(100, (currentShots / total) * 100)
  const shotsIntoNextBox = currentShots % step
  const sessionTotal = SHOT_TYPES.reduce((s, t) => s + session[t.name], 0)
  const stickDots = stickCount > 0 && stickCount % 10 === 0 ? 10 : stickCount % 10

  const medalAtBox = (boxNum) => milestones.find((m) => m.box === boxNum)

  const bump = (name, amt) =>
    setSession((s) => ({ ...s, [name]: Math.max(0, s[name] + amt) }))

  const handleSwitchTier = async (newId) => {
    if (newId === spec.id || switching) return
    setSwitching(true)
    try {
      // Switching tiers changes the goal, not the player's progress — a kid
      // previewing a bigger challenge doesn't lose what they've already shot.
      await setPlayerChallenge(player.id, newId, getSpec(newId).total)
      onShotLogged?.()
    } catch (e) {
      console.error('Failed to switch challenge:', e)
      toast('Could not switch challenges — try again')
    } finally {
      setSwitching(false)
    }
  }

  const handleSetPaperTotal = async () => {
    const n = parseInt(paperInput, 10)
    if (Number.isNaN(n) || n < 0 || settingPaper) return
    setSettingPaper(true)
    try {
      await setLifetimeShots(player.id, n)
      setPaperInput('')
      onShotLogged?.()
      toast(`Set your total to ${n.toLocaleString()} shots`)
    } catch (e) {
      console.error('Failed to set starting total:', e)
      toast('Could not save that total — try again')
    } finally {
      setSettingPaper(false)
    }
  }

  const handleLogSession = async () => {
    if (sessionTotal <= 0 || saving) return
    setSaving(true)
    try {
      const before = currentShots
      const after = before + sessionTotal
      const crossed = milestones.find((m) => before < m.at && after >= m.at)

      for (const t of SHOT_TYPES) {
        if (session[t.name] > 0) {
          await logShots({ playerId: player.id, shotType: t.name, count: session[t.name] })
        }
      }
      if (stickChecked) {
        try {
          await logStickhandlingSession(player.id)
          setStickCount((n) => n + 1)
        } catch (e) {
          console.error('Stickhandling log failed:', e)
        }
        setStickChecked(false)
      }

      if (crossed) {
        setCelebrating(crossed)
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200])
      } else {
        const boxesFilled = Math.floor(after / step) - Math.floor(before / step)
        toast(
          boxesFilled > 0
            ? `${sessionTotal} shots logged — ${boxesFilled} box${boxesFilled > 1 ? 'es' : ''} filled!`
            : `${sessionTotal} shots logged`
        )
        if (navigator.vibrate) navigator.vibrate(12)
      }

      setSession(EMPTY_SESSION)
      onShotLogged?.()
    } catch (e) {
      console.error('Failed to log session:', e)
      toast('Could not save that session — try again')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="tg" style={{ '--tg-badge': spec.badge }}>
      {/* HERO — tinted to the tier, same badge language as the printable */}
      <div className="tg-hero">
        <div className="tg-hero-main">
          <div className="tg-kicker">Your challenge</div>
          <div className="tg-title">{spec.label} Shot Challenge</div>
          {teamLine
            ? <div className="tg-team">{teamLine}</div>
            : <ConnectClubPrompt playerId={player.id} onConnected={onClubConnected} />}
          <div className="tg-progress-note">
            {Math.max(0, total - currentShots).toLocaleString()} shots left to finish the {spec.label} Challenge.
          </div>
          <div className="tg-seg">
            {CHALLENGE_LIST.map((s) => (
              <button
                key={s.id}
                className={`tg-seg-opt${s.id === spec.id ? ' tg-seg-opt--on' : ''}`}
                disabled={switching}
                onClick={() => handleSwitchTier(s.id)}
              >
                <span className="tg-seg-name">{s.label}</span>
                <span className="tg-seg-shots">{s.total.toLocaleString()} shots</span>
              </button>
            ))}
          </div>
        </div>
        <div className="tg-badge">
          <div className="tg-badge-name">{spec.label}</div>
          <div className="tg-badge-level">Level {CHALLENGE_LIST.findIndex((s) => s.id === spec.id) + 1} of 4</div>
        </div>
      </div>

      {/* PAPER -> DIGITAL BRIDGE */}
      <div className="tg-paper">
        <span>Already tracking on paper? Enter your shots so far:</span>
        <input
          type="number"
          min="0"
          className="tg-paper-input"
          placeholder="e.g. 300"
          value={paperInput}
          onChange={(e) => setPaperInput(e.target.value)}
        />
        <button className="tg-paper-btn" disabled={!paperInput || settingPaper} onClick={handleSetPaperTotal}>
          Set as my total
        </button>
      </div>

      {/* TRACK */}
      <div className="tg-track-head">
        <div className="tg-track-title">Track today's practice</div>
        <div className="tg-track-stat">
          {currentShots.toLocaleString()} of {total.toLocaleString()} shots · {Math.round(progressPct)}%
          {currentShots >= total ? ' · challenge complete' : ''}
        </div>
      </div>

      <div className="tg-bar"><div className="tg-bar-fill" style={{ width: `${progressPct}%` }} /></div>

      <div className="tg-rows">
        {SHOT_TYPES.map((t) => (
          <div key={t.name} className="tg-row">
            <span className="tg-row-label">{t.emoji} {t.name}</span>
            <span className="tg-row-count">{session[t.name]}</span>
            <button className="tg-row-btn" onClick={() => bump(t.name, 1)}>+1</button>
            <button className="tg-row-btn" onClick={() => bump(t.name, 5)}>+5</button>
            <span className="tg-row-today">{(todayByType[t.name] || 0).toLocaleString()} today</span>
          </div>
        ))}
      </div>

      {/* Simple bonus: no minutes to enter, just a checkbox per session.
          Cycles every 10 — filling the dot strip is its own small win, then
          starts again, rather than counting up forever. */}
      <div className="tg-stick">
        <span className="tg-stick-label">Stickhandling bonus — do 10</span>
        <div className="tg-stick-dots">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className={`tg-dot${i < stickDots ? ' tg-dot--on' : ''}`} />
          ))}
        </div>
        <span className="tg-stick-count">{stickDots} of 10 done</span>
        <label className="tg-stick-check">
          <input type="checkbox" checked={stickChecked} onChange={(e) => setStickChecked(e.target.checked)} />
          Did 15 min today
        </label>
      </div>

      <div className="tg-session-bar">
        <span>Session total: <strong>{sessionTotal}</strong> shots</span>
        <button className="tg-log" disabled={sessionTotal === 0 || saving} onClick={handleLogSession}>
          Log session
        </button>
      </div>

      {/* THE GRID — same box count and checkpoint column as the printable */}
      <div className="tg-fill-note">Every {step} shots logged fills in a box below.</div>
      <div className="tg-grid-wrap">
        {Array.from({ length: GRID_ROWS }, (_, r) => {
          const rowTarget = Math.round((total * (r + 1)) / GRID_ROWS)
          return (
            <div key={r} className="tg-grid-row">
              <div className="tg-row-target">{rowTarget.toLocaleString()}</div>
              <div className="tg-grid-boxes" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {Array.from({ length: cols }, (_, c) => {
                  const boxNum = r * cols + c + 1
                  const isCheckpoint = c === cols - 1
                  const isFilled = boxNum <= filledBoxes
                  const medal = medalAtBox(boxNum)
                  const isNext = boxNum === filledBoxes + 1
                  return (
                    <div
                      key={boxNum}
                      className="tg-box"
                      style={{
                        borderColor: isFilled ? spec.badge : isCheckpoint ? 'var(--tg-accent2-400)' : 'var(--tg-divider)',
                        background: isFilled ? spec.badge : isCheckpoint ? 'var(--tg-accent2-100)' : 'var(--bg)',
                      }}
                      title={`${(boxNum * step).toLocaleString()} shots`}
                    >
                      {isFilled && <span className="tg-check">✓</span>}
                      {medal && !isFilled && <span className="tg-medal">{medal.emoji}</span>}
                      {isNext && shotsIntoNextBox > 0 && (
                        <span className="tg-partial" style={{ height: `${(shotsIntoNextBox / step) * 100}%`, background: spec.badge }} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* MILESTONE CELEBRATION */}
      {celebrating && (
        <div className="tg-cel" onClick={() => setCelebrating(null)}>
          <div className="tg-cel-card" onClick={(e) => e.stopPropagation()}>
            <div className="tg-cel-emoji">{celebrating.emoji}</div>
            <div className="tg-cel-name">{celebrating.name}</div>
            <div className="tg-cel-sub">{celebrating.at.toLocaleString()} shots — color it in on your sheet too.</div>
            <button className="tg-cel-btn" onClick={() => setCelebrating(null)}>Keep going →</button>
          </div>
        </div>
      )}

      <style>{gridStyles}</style>
    </div>
  )
}

// A player who skipped club/team at signup gets a second, low-friction chance
// right here instead of a hard signup requirement — collecting club/age/tier
// matters for leaderboard grouping, but blocking sign-up on it risks losing a
// kid before they've logged a single shot. Reuses the exact same search +
// find_or_create_team_for_player path signup goes through, so a player who
// connects here lands on the identical team row a teammate who filled it in
// at signup would.
function ConnectClubPrompt({ playerId, onConnected }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [club, setClub] = useState(null)
  const [ageDivision, setAgeDivision] = useState('')
  const [tier, setTier] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const timer = useRef(null)

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    if (!query.trim() || query.trim().length < 2) { setResults([]); return }
    timer.current = setTimeout(() => {
      searchClubs(query, 6).then(setResults).catch(() => setResults([]))
    }, 200)
    return () => { if (timer.current) clearTimeout(timer.current) }
  }, [query])

  if (!open) {
    return (
      <button className="tg-connect-btn" onClick={() => setOpen(true)}>
        + Connect your club
      </button>
    )
  }

  const connect = async () => {
    if (!club || !ageDivision || !tier || saving) return
    setSaving(true)
    setError('')
    try {
      const { teamId } = await findOrCreateTeamForPlayer({ clubId: club.id, ageDivision, tier })
      await updatePlayerClub(playerId, { clubId: club.id, clubName: club.name, teamId })
      await onConnected?.()
      setOpen(false)
    } catch (e) {
      console.error('Failed to connect club:', e)
      setError('Could not connect — try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="tg-connect">
      {!club ? (
        <div className="tg-connect-search">
          <input
            className="tg-connect-input"
            type="text"
            placeholder="Burlington Eagles, Mississauga…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query.trim().length >= 2 && results.length > 0 && (
            <div className="tg-connect-results">
              {results.map((c) => (
                <button key={c.id} className="tg-connect-result" onClick={() => { setClub(c); setQuery(''); setResults([]) }}>
                  {c.name}{c.city ? ` · ${c.city}` : ''}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="tg-connect-club">{club.name}</div>
          <select className="tg-connect-select" value={ageDivision} onChange={(e) => setAgeDivision(e.target.value)}>
            <option value="">Age division</option>
            {AGE_DIVISIONS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <select className="tg-connect-select" value={tier} onChange={(e) => setTier(e.target.value)}>
            <option value="">Tier</option>
            {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <button className="tg-connect-save" disabled={!ageDivision || !tier || saving} onClick={connect}>
            {saving ? 'Connecting…' : 'Connect'}
          </button>
        </>
      )}
      {error && <div className="tg-connect-error">{error}</div>}
      <button className="tg-connect-cancel" onClick={() => setOpen(false)}>Cancel</button>
    </div>
  )
}

const gridStyles = `
.tg { margin: 16px 14px; padding: 18px; border-radius: var(--radius-lg); background: var(--surface); color: var(--text);
  border: 0.5px solid var(--border-dim);
  --tg-divider: var(--border-dim); --tg-accent2-100: var(--surface-raised); --tg-accent2-400: var(--border); }

.tg-hero { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px;
  background: var(--surface-raised); border: 0.5px solid var(--tg-badge); border-radius: 16px; padding: 16px 18px; margin-bottom: 14px; flex-wrap: wrap; }
.tg-kicker { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: var(--tg-badge); margin-bottom: 4px; }
.tg-title { font-family: var(--font-display); font-weight: 700; font-size: 21px; margin-bottom: 6px; color: white; }
.tg-team { font-size: 12.5px; font-weight: 600; color: var(--text-soft); margin-bottom: 4px; }
.tg-connect-btn { font-family: inherit; font-size: 12px; font-weight: 700; background: transparent;
  border: 1px dashed var(--tg-badge); color: var(--tg-badge); border-radius: 999px;
  padding: 5px 12px; cursor: pointer; margin-bottom: 4px; }
.tg-connect { background: var(--bg); border: 0.5px solid var(--border-dim); border-radius: 10px; padding: 10px; margin-bottom: 8px;
  display: flex; flex-direction: column; gap: 8px; max-width: 320px; }
.tg-connect-search { position: relative; }
.tg-connect-input { width: 100%; padding: 7px 10px; font-size: 13px; border-radius: 8px;
  border: 1px solid var(--tg-divider); background: var(--surface); color: var(--text); }
.tg-connect-results { position: absolute; top: 100%; left: 0; right: 0; z-index: 5; background: var(--surface);
  border: 1px solid var(--tg-divider); border-radius: 8px; margin-top: 4px; overflow: hidden; }
.tg-connect-result { display: block; width: 100%; text-align: left; padding: 8px 10px; font-size: 12.5px;
  background: transparent; border: none; cursor: pointer; color: var(--text); }
.tg-connect-result:hover { background: rgba(255,255,255,0.05); }
.tg-connect-club { font-weight: 700; font-size: 13px; color: white; }
.tg-connect-select { width: 100%; padding: 7px 10px; font-size: 13px; border-radius: 8px;
  border: 1px solid var(--tg-divider); background: var(--surface); color: var(--text); }
.tg-connect-save { font-family: inherit; font-weight: 700; font-size: 12.5px; border: none; border-radius: 8px;
  padding: 8px; cursor: pointer; background: var(--accent); color: #fff; }
.tg-connect-save:disabled { opacity: .5; cursor: default; }
.tg-connect-cancel { font-family: inherit; font-size: 11px; background: transparent; border: none;
  color: var(--tg-badge); text-decoration: underline; cursor: pointer; align-self: flex-start; }
.tg-connect-error { font-size: 11.5px; color: var(--danger); }
.tg-progress-note { font-size: 13px; color: var(--text-soft); margin-bottom: 12px; }
.tg-seg { display: inline-flex; flex-wrap: wrap; overflow: hidden; border: 1px solid var(--tg-divider); border-radius: 12px; }
.tg-seg-opt { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; background: transparent;
  border: none; border-right: 1px solid var(--tg-divider); padding: 7px 12px; font-size: 12px; cursor: pointer; color: var(--text-soft);
  font-family: inherit; }
.tg-seg-opt:last-child { border-right: none; }
.tg-seg-opt--on { background: var(--tg-badge); color: white; }
.tg-seg-opt:disabled { cursor: default; opacity: .7; }
.tg-seg-name { font-weight: 700; }
.tg-seg-shots { font-size: 10px; opacity: .8; }
.tg-badge { text-align: center; flex: none; background: var(--tg-badge); color: white;
  border-radius: 12px; padding: 9px 15px; white-space: nowrap; }
.tg-badge-name { font-family: var(--font-display); font-weight: 700; font-size: 14px; }
.tg-badge-level { font-size: 10px; opacity: .85; }

.tg-paper { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; font-size: 12.5px; color: var(--text-soft); margin-bottom: 18px; }
.tg-paper-input { width: 110px; min-height: 32px; padding: 5px 10px; font-size: 13px; color: var(--text);
  background: var(--bg); border: 1px solid var(--tg-divider); border-radius: 999px; }
.tg-paper-btn { font-family: inherit; font-size: 12.5px; font-weight: 700; border-radius: 999px; padding: 7px 14px;
  cursor: pointer; background: transparent; border: 1px solid var(--tg-divider); color: var(--text); }
.tg-paper-btn:disabled { opacity: .5; cursor: default; }

.tg-track-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; }
.tg-track-title { font-family: var(--font-display); font-weight: 700; font-size: 17px; color: white; }
.tg-track-stat { font-size: 13px; color: var(--text-soft); }
.tg-bar { width: 100%; height: 8px; border-radius: 999px; background: var(--bg); overflow: hidden; margin-bottom: 14px; }
.tg-bar-fill { height: 100%; border-radius: 999px; background: var(--accent); transition: width .3s ease; }

.tg-rows { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }

.tg-stick { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; background: var(--tg-accent2-100);
  border-radius: 12px; padding: 9px 13px; margin-bottom: 14px; font-size: 13px; }
.tg-stick-label { font-weight: 700; color: var(--ice); }
.tg-stick-dots { display: flex; gap: 4px; }
.tg-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--tg-accent2-400); }
.tg-dot--on { background: var(--accent); }
.tg-stick-count { font-size: 12px; color: var(--text-soft); }
.tg-stick-check { display: flex; align-items: center; gap: 6px; font-size: 13px; margin-left: auto; cursor: pointer; color: var(--text-soft); }
.tg-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.tg-row-label { width: 100px; flex: none; font-weight: 700; font-size: 13.5px; }
.tg-row-count { font-family: var(--font-display); font-weight: 700; font-size: 20px; width: 30px; }
.tg-row-btn { font-family: inherit; font-weight: 700; font-size: 13px; border-radius: 999px; padding: 8px 16px;
  cursor: pointer; background: transparent; border: 1px solid var(--tg-divider); color: var(--text); min-height: 44px; }
@media (max-width: 430px) { .tg-row-btn { padding: 12px 20px; font-size: 14px; } }
.tg-row-btn:hover { background: rgba(255,255,255,0.06); }
.tg-row-today { font-size: 11.5px; color: var(--text-mute); margin-left: auto; }

.tg-session-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  padding: 12px 0; border-top: 1px solid var(--tg-divider); border-bottom: 1px solid var(--tg-divider); margin-bottom: 16px; font-size: 13.5px; }
.tg-log { font-family: var(--font-display); font-weight: 700; font-size: 14px; border: none; border-radius: 999px;
  padding: 10px 20px; cursor: pointer; background: var(--accent); color: white; }
.tg-log:disabled { opacity: .45; cursor: default; }

.tg-fill-note { font-size: 13px; color: var(--text-soft); margin-bottom: 10px; }
.tg-grid-wrap { display: flex; flex-direction: column; gap: 9px; margin-bottom: 14px; }
.tg-grid-row { display: flex; align-items: center; gap: 10px; }
.tg-row-target { width: 52px; font-size: 11px; color: var(--text-mute); text-align: right; flex: none; }
.tg-grid-boxes { display: grid; gap: 6px; flex: 1; }
.tg-box { position: relative; aspect-ratio: 1; border-radius: 8px; border: 2px solid; overflow: hidden;
  display: flex; align-items: center; justify-content: center; transition: background .2s ease, border-color .2s ease; }
.tg-check { color: white; font-weight: 800; font-size: 15px; z-index: 2; position: relative; }
.tg-medal { font-size: 13px; line-height: 1; z-index: 2; position: relative; }
.tg-partial { position: absolute; left: 0; right: 0; bottom: 0; opacity: .4; }

.tg-cel { position: fixed; inset: 0; background: rgba(0,0,0,.72); display: flex;
  align-items: center; justify-content: center; z-index: 70; padding: 20px; }
.tg-cel-card { background: var(--surface); color: var(--text); border: 0.5px solid var(--border-dim); border-radius: 20px; padding: 34px 28px;
  text-align: center; max-width: 340px; animation: tgPop .55s cubic-bezier(.34,1.56,.64,1); }
@keyframes tgPop { 0% { transform: scale(.6); opacity: 0 } 60% { transform: scale(1.06) } 100% { transform: scale(1); opacity: 1 } }
.tg-cel-emoji { font-size: 60px; margin-bottom: 14px; }
.tg-cel-name { font-family: var(--font-display); font-weight: 700; font-size: 21px; margin-bottom: 6px; color: white; }
.tg-cel-sub { font-size: 13px; color: var(--text-soft); margin-bottom: 20px; line-height: 1.45; }
.tg-cel-btn { font-family: var(--font-display); font-weight: 700; border: none; border-radius: 999px;
  padding: 12px 24px; color: white; background: var(--accent); font-size: 15px; cursor: pointer; }
`
