import { useState, useEffect } from 'react'
import { logShots, getStats } from '../lib/shots'
import { useNotifications } from '../hooks/useNotifications'
import { getSpec, milestonesFor, boxCount } from '../lib/challengeSpecs'

// The digital version of the printed sheet.
//
// The whole point is that this looks and behaves like the paper tracker the
// kid stuck on the fridge: the same number of boxes, each worth the same
// number of shots, with the medals on the same squares. One box = one chunk of
// shots (NOT one day) — so a big Saturday fills ten boxes here just like it
// would with a marker, which is the feeling the paper version gets right.
//
// Box geometry comes from lib/challengeSpecs so the two can't drift.

const SHOT_TYPES = [
  { name: 'Wrist', emoji: '🎯' },
  { name: 'Snap', emoji: '⚡' },
  { name: 'Slap', emoji: '💥' },
  { name: 'Backhand', emoji: '🔄' },
]

export default function TrackerGrid({ player, playerChallenge, playerChallengeProgress, onShotLogged }) {
  const { toast } = useNotifications()
  const [pickerOpen, setPickerOpen] = useState(false)
  const [shotType, setShotType] = useState('Wrist')
  const [saving, setSaving] = useState(false)
  const [todayByType, setTodayByType] = useState({})
  const [celebrating, setCelebrating] = useState(null)

  const spec = getSpec(playerChallenge?.challenge_type)

  useEffect(() => {
    if (!player) return
    getStats(player.id)
      .then((s) => setTodayByType(s.todayByType || {}))
      .catch(() => {})
  }, [player, playerChallengeProgress])

  if (!player || !playerChallenge || !playerChallengeProgress) return null

  // Custom challenges have no printed sheet, so there's no grid to mirror.
  if (!spec) return null

  // getPlayerChallengeProgress returns current_shots (from players.lifetime_shots).
  const currentShots = playerChallengeProgress.current_shots || 0
  const total = spec.total
  const step = spec.step
  const boxes = boxCount(spec)
  const milestones = milestonesFor(spec)
  const filledBoxes = Math.min(boxes, Math.floor(currentShots / step))
  const progressPct = Math.min(100, (currentShots / total) * 100)
  const shotsIntoNextBox = currentShots % step

  const medalAtBox = (boxNum) => milestones.find((m) => m.box === boxNum)

  const handleLog = async (count) => {
    if (saving) return
    setSaving(true)
    try {
      const before = currentShots
      const after = before + count
      const crossed = milestones.find((m) => before < m.at && after >= m.at)

      await logShots({ playerId: player.id, shotType, count })

      if (crossed) {
        setCelebrating(crossed)
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200])
      } else {
        const boxesFilled = Math.floor(after / step) - Math.floor(before / step)
        toast(
          boxesFilled > 0
            ? `${count} ${shotType.toLowerCase()} shots — ${boxesFilled} box${boxesFilled > 1 ? 'es' : ''} filled!`
            : `${count} ${shotType.toLowerCase()} shots logged`
        )
        if (navigator.vibrate) navigator.vibrate(12)
      }

      setPickerOpen(false)
      onShotLogged?.()
    } catch (e) {
      console.error('Failed to log shots:', e)
      toast('Could not save those shots — try again')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="tg">
      {/* HEADER — mirrors the sheet's banner */}
      <div className="tg-head" style={{ borderColor: spec.accent }}>
        <div>
          <div className="tg-kicker">My {spec.label} Challenge</div>
          <div className="tg-count">
            <strong style={{ color: spec.accent }}>{currentShots.toLocaleString()}</strong>
            <span> / {total.toLocaleString()}</span>
          </div>
        </div>
        <div className="tg-pct" style={{ color: spec.accent }}>{Math.round(progressPct)}%</div>
      </div>

      <div className="tg-how">
        Each box = <strong style={{ color: spec.accent }}>{step} shots</strong>.
        {filledBoxes < boxes
          ? ` ${boxes - filledBoxes} to go.`
          : ' Sheet complete! 🏆'}
      </div>

      {/* THE GRID — same box count and medal positions as the printable */}
      <div
        className="tg-grid"
        style={{
          gridTemplateColumns: `repeat(${spec.cols}, minmax(0, 1fr))`,
          // Cap the box size so a 5-column sheet doesn't blow up into giant
          // squares on desktop — it should read like the paper grid at any width.
          maxWidth: spec.cols * 52 + (spec.cols - 1) * 5,
        }}
      >
        {Array.from({ length: boxes }, (_, i) => {
          const boxNum = i + 1
          const isFilled = boxNum <= filledBoxes
          const medal = medalAtBox(boxNum)
          const isNext = boxNum === filledBoxes + 1
          return (
            <div
              key={boxNum}
              className={`tg-box${isFilled ? ' tg-box--filled' : ''}${isNext ? ' tg-box--next' : ''}`}
              // Always pass concrete values — React leaves a previously-set
              // inline style in place when the new value is `undefined`, which
              // left stale fills behind when the challenge changed.
              style={{
                borderColor: isFilled || medal ? spec.accent : 'var(--border-dim)',
                background: isFilled ? spec.accent : 'transparent',
              }}
              title={`${(boxNum * step).toLocaleString()} shots`}
            >
              {medal && <span className="tg-medal">{medal.emoji}</span>}
              {isNext && shotsIntoNextBox > 0 && (
                <span
                  className="tg-partial"
                  style={{ height: `${(shotsIntoNextBox / step) * 100}%`, background: spec.accent }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* LOG BUTTON */}
      <button
        className="tg-log"
        style={{ background: spec.accent }}
        onClick={() => setPickerOpen(true)}
      >
        + Log shots
      </button>

      {/* SHOT TYPE TALLY — the sheet's tally section, kept honest */}
      <div className="tg-tally">
        <div className="tg-tally-title">Today by shot type</div>
        <div className="tg-tally-grid">
          {SHOT_TYPES.map((t) => (
            <div key={t.name} className="tg-tally-box">
              <span>{t.emoji} {t.name}</span>
              <strong>{todayByType[t.name] || 0}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* LOG SHEET — pick a type, then an amount */}
      {pickerOpen && (
        <div className="tg-sheet-wrap" onClick={() => !saving && setPickerOpen(false)}>
          <div className="tg-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="tg-sheet-title">What did you shoot?</div>
            <div className="tg-types">
              {SHOT_TYPES.map((t) => (
                <button
                  key={t.name}
                  className={`tg-type${shotType === t.name ? ' tg-type--on' : ''}`}
                  style={{
                    borderColor: shotType === t.name ? spec.accent : 'var(--border-dim)',
                    color: shotType === t.name ? spec.accent : 'var(--text-soft)',
                  }}
                  onClick={() => setShotType(t.name)}
                >
                  <span className="tg-type-emoji">{t.emoji}</span>
                  {t.name}
                </button>
              ))}
            </div>

            <div className="tg-sheet-title">How many?</div>
            <div className="tg-amounts">
              {[10, 25, 50, 100].map((n) => (
                <button
                  key={n}
                  className="tg-amount"
                  disabled={saving}
                  onClick={() => handleLog(n)}
                >
                  +{n}
                </button>
              ))}
            </div>

            <button className="tg-cancel" disabled={saving} onClick={() => setPickerOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* MILESTONE CELEBRATION */}
      {celebrating && (
        <div className="tg-cel" onClick={() => setCelebrating(null)}>
          <div className="tg-cel-card" onClick={(e) => e.stopPropagation()}>
            <div className="tg-cel-emoji">{celebrating.emoji}</div>
            <div className="tg-cel-name">{celebrating.name}</div>
            <div className="tg-cel-sub">
              {celebrating.at.toLocaleString()} shots — colour it in on your sheet too.
            </div>
            <button
              className="tg-cel-btn"
              style={{ background: spec.accent }}
              onClick={() => setCelebrating(null)}
            >
              Keep going →
            </button>
          </div>
        </div>
      )}

      <style>{gridStyles}</style>
    </div>
  )
}

const gridStyles = `
.tg { margin: 16px 14px; padding: 16px; background: var(--surface); border-radius: 14px; }
.tg-head { display: flex; justify-content: space-between; align-items: flex-start;
  padding-bottom: 12px; margin-bottom: 12px; border-bottom: 2px solid; }
.tg-kicker { font-size: 11px; letter-spacing: 1.4px; text-transform: uppercase;
  color: var(--text-mute); font-weight: 800; margin-bottom: 4px; }
.tg-count { font-size: 22px; font-weight: 800; color: var(--text); }
.tg-count span { font-size: 14px; color: var(--text-mute); font-weight: 600; }
.tg-pct { font-size: 26px; font-weight: 900; }
.tg-how { font-size: 13px; color: var(--text-soft); margin-bottom: 14px; }

.tg-grid { display: grid; gap: 5px; margin: 0 0 16px; width: 100%; }
.tg-box { position: relative; aspect-ratio: 1; border: 2px solid var(--border-dim);
  border-radius: 5px; overflow: hidden; display: flex; align-items: center;
  justify-content: center; transition: background .25s ease, border-color .25s ease; }
.tg-box--next { box-shadow: 0 0 0 2px rgba(255,255,255,0.12); }
.tg-medal { font-size: 15px; line-height: 1; position: relative; z-index: 2;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,.55)); }
.tg-partial { position: absolute; left: 0; right: 0; bottom: 0; opacity: .45; }

.tg-log { width: 100%; border: none; border-radius: 12px; padding: 15px;
  font-size: 16px; font-weight: 800; color: #fff; cursor: pointer; margin-bottom: 16px; }

.tg-tally-title { font-size: 11px; letter-spacing: 1.4px; text-transform: uppercase;
  color: var(--text-mute); font-weight: 800; margin-bottom: 8px; }
.tg-tally-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.tg-tally-box { display: flex; justify-content: space-between; align-items: center;
  border: 1px solid var(--border-dim); border-radius: 9px; padding: 9px 11px;
  font-size: 13px; color: var(--text-soft); }
.tg-tally-box strong { color: var(--text); font-size: 15px; }

.tg-sheet-wrap { position: fixed; inset: 0; background: rgba(0,0,0,.72);
  display: flex; align-items: flex-end; justify-content: center; z-index: 60; }
.tg-sheet { width: 100%; max-width: 460px; background: var(--bg);
  border-radius: 18px 18px 0 0; padding: 22px 18px calc(22px + env(safe-area-inset-bottom));
  animation: tgUp .22s ease; }
@keyframes tgUp { from { transform: translateY(14px); opacity: 0 } to { transform: none; opacity: 1 } }
.tg-sheet-title { font-size: 12px; letter-spacing: 1.2px; text-transform: uppercase;
  color: var(--text-mute); font-weight: 800; margin-bottom: 10px; }
.tg-types { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 18px; }
.tg-type { display: flex; flex-direction: column; align-items: center; gap: 4px;
  background: transparent; border: 2px solid var(--border-dim); border-radius: 11px;
  padding: 11px 4px; font-size: 11px; font-weight: 700; color: var(--text-soft); cursor: pointer; }
.tg-type-emoji { font-size: 19px; }
.tg-type--on { background: rgba(255,255,255,.05); }
.tg-amounts { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 14px; }
.tg-amount { background: rgba(255,255,255,.06); border: 1px solid var(--border-dim);
  border-radius: 11px; padding: 15px 4px; font-size: 16px; font-weight: 800;
  color: var(--text); cursor: pointer; }
.tg-amount:disabled { opacity: .5; cursor: default; }
.tg-cancel { width: 100%; background: transparent; border: none; color: var(--text-mute);
  font-size: 14px; font-weight: 700; padding: 10px; cursor: pointer; }

.tg-cel { position: fixed; inset: 0; background: rgba(0,0,0,.8); display: flex;
  align-items: center; justify-content: center; z-index: 70; padding: 20px; }
.tg-cel-card { background: var(--bg); border-radius: 20px; padding: 34px 28px;
  text-align: center; max-width: 340px; animation: tgPop .55s cubic-bezier(.34,1.56,.64,1); }
@keyframes tgPop { 0% { transform: scale(.6); opacity: 0 } 60% { transform: scale(1.06) } 100% { transform: scale(1); opacity: 1 } }
.tg-cel-emoji { font-size: 64px; margin-bottom: 14px; }
.tg-cel-name { font-size: 21px; font-weight: 900; color: #fff; margin-bottom: 6px; }
.tg-cel-sub { font-size: 13px; color: var(--text-soft); margin-bottom: 20px; line-height: 1.45; }
.tg-cel-btn { border: none; border-radius: 11px; padding: 13px 26px; color: #fff;
  font-weight: 800; font-size: 15px; cursor: pointer; }
`
