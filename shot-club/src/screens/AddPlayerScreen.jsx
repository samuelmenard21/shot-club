import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPlayerWithGoogleAuth } from '../lib/auth'
import { useAuth } from '../hooks/useAuth'
import { searchClubs, findOrCreateTeamForPlayer, AGE_DIVISIONS, TIERS } from '../lib/clubs'

function ageBracketFromDivision(div) {
  const n = parseInt((div || '').replace('U', ''), 10)
  if (!n) return null
  if (n <= 10) return '6-10'
  if (n <= 14) return '11-14'
  if (n <= 18) return '15-18'
  return '18+'
}

export default function AddPlayerScreen() {
  const nav = useNavigate()
  const { refresh } = useAuth()

  const [firstName, setFirstName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [position, setPosition] = useState(null)

  const [clubQuery, setClubQuery] = useState('')
  const [clubResults, setClubResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [selectedClub, setSelectedClub] = useState(null)
  const [ageDivision, setAgeDivision] = useState('')
  const [tier, setTier] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (!clubQuery.trim() || clubQuery.trim().length < 2) {
      setClubResults([])
      setSearching(false)
      return
    }
    setSearching(true)
    timerRef.current = setTimeout(async () => {
      try {
        const results = await searchClubs(clubQuery, 6)
        setClubResults(results || [])
      } catch (e) {
        setClubResults([])
      } finally {
        setSearching(false)
      }
    }, 200)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [clubQuery])

  const handleSubmit = async () => {
    if (!firstName.trim()) { setError("Add the player's first name so their coach knows who they are."); return }
    if (!displayName.trim()) { setError("Add a player name for the leaderboard."); return }
    if (!position) { setError("Pick a position."); return }
    setError('')
    setLoading(true)
    try {
      let teamId = null
      if (selectedClub && ageDivision && tier) {
        const result = await findOrCreateTeamForPlayer({
          clubId: selectedClub.id,
          ageDivision,
          tier,
        })
        teamId = result.teamId
      }
      await createPlayerWithGoogleAuth({
        firstName: firstName.trim(),
        displayName: displayName.trim(),
        position,
        ageBracket: ageBracketFromDivision(ageDivision),
        teamId,
        clubId: selectedClub?.id || null,
        clubName: selectedClub?.name || null,
      })
      await refresh()
      nav('/home', { replace: true })
    } catch (e) {
      setError(e.message || 'Something went wrong. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className="add-player-wrap fade-in">
      <div className="add-player-card">
        <button className="add-player-back" onClick={() => nav(-1)}>← Back</button>

        <h2 className="add-player-title">Add a player</h2>
        <p className="add-player-sub">
          This creates a new player profile on your Google account. You can switch between players any time.
        </p>

        <label className="input-label">
          <span>First name (shown to their coach)</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Their real first name"
            className="input-field"
            autoFocus
          />
        </label>

        <label className="input-label" style={{ marginTop: 12 }}>
          <span>Player name (on leaderboards)</span>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="What do they go by?"
            className="input-field"
          />
        </label>

        <div className="add-player-pos-label">Position</div>
        <div className="add-player-chips">
          {['F', 'D', 'G'].map((p) => (
            <button
              key={p}
              className={`add-player-chip ${position === p ? 'add-player-chip--active' : ''}`}
              onClick={() => setPosition(p)}
            >
              <div className="add-player-chip-letter">{p}</div>
              <div className="add-player-chip-sub">{p === 'F' ? 'Forward' : p === 'D' ? 'Defense' : 'Goalie'}</div>
            </button>
          ))}
        </div>

        <div className="add-player-section-label">Club (optional)</div>
        <div className="add-player-club-hint">Connect them to their association so coaches can see them.</div>

        {!selectedClub ? (
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={clubQuery}
              onChange={(e) => setClubQuery(e.target.value)}
              placeholder="Search for their association…"
              className="input-field"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
            />
            {clubQuery.trim().length >= 2 && (
              <div className="join-club-dropdown">
                {searching && <div className="join-club-status">Searching…</div>}
                {!searching && clubResults.length === 0 && (
                  <div className="join-club-status">No clubs found — you can skip this for now.</div>
                )}
                {clubResults.map((c) => (
                  <button
                    key={c.id}
                    className="join-club-result"
                    onClick={() => { setSelectedClub(c); setClubQuery(''); setClubResults([]) }}
                  >
                    <span className="join-club-result-name">{c.name}</span>
                    {c.city && <span className="join-club-result-meta">{c.city}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="join-club-selected">
              <div className="join-club-selected-name">{selectedClub.name}</div>
              {selectedClub.city && <div className="join-club-selected-city">{selectedClub.city}</div>}
              <button className="join-club-change" onClick={() => { setSelectedClub(null); setAgeDivision(''); setTier('') }}>Change</button>
            </div>
            <label className="input-label" style={{ marginTop: 12 }}>
              <span>Age division</span>
              <select value={ageDivision} onChange={(e) => setAgeDivision(e.target.value)} className="input-field">
                <option value="">Pick one</option>
                {AGE_DIVISIONS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </label>
            <label className="input-label" style={{ marginTop: 10 }}>
              <span>Tier</span>
              <select value={tier} onChange={(e) => setTier(e.target.value)} className="input-field">
                <option value="">Pick one</option>
                {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
          </>
        )}

        {error && <div className="add-player-error">{error}</div>}

        <button
          className="add-player-submit"
          onClick={handleSubmit}
          disabled={!firstName || !displayName || !position || loading}
        >
          {loading ? 'Creating profile…' : 'Create profile →'}
        </button>
      </div>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.add-player-wrap {
  min-height: 100dvh;
  background: var(--bg);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 24px 16px 60px;
}
.add-player-card {
  width: 100%;
  max-width: 400px;
}
.add-player-back {
  color: var(--text-mute);
  font-size: 13px;
  margin-bottom: 20px;
  display: block;
}
.add-player-back:hover { color: var(--ice); }
.add-player-title {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  color: white;
  letter-spacing: 0.3px;
  margin-bottom: 6px;
}
.add-player-sub {
  font-size: 13px;
  color: var(--text-mute);
  line-height: 1.5;
  margin-bottom: 22px;
}
.add-player-pos-label {
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
  margin: 16px 0 8px;
}
.add-player-chips {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 20px;
}
.add-player-chip {
  background: var(--surface);
  border: 1.5px solid var(--border-dim);
  border-radius: 12px;
  padding: 12px 8px;
  text-align: center;
  transition: all 0.1s;
  cursor: pointer;
}
.add-player-chip--active {
  background: rgba(41, 121, 255, 0.15);
  border-color: var(--accent);
}
.add-player-chip:active { transform: scale(0.97); }
.add-player-chip-letter {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 800;
  color: var(--ice);
  line-height: 1;
}
.add-player-chip-sub {
  font-size: 10px;
  color: var(--text-mute);
  margin-top: 4px;
  letter-spacing: 0.3px;
}
.add-player-section-label {
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 4px;
}
.add-player-club-hint {
  font-size: 12px;
  color: var(--text-mute);
  margin-bottom: 10px;
  line-height: 1.4;
}
.add-player-error {
  color: #ef4444;
  font-size: 13px;
  margin: 12px 0;
  line-height: 1.4;
}
.add-player-submit {
  width: 100%;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 15px;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.4px;
  margin-top: 18px;
  transition: all 0.15s;
}
.add-player-submit:active:not(:disabled) { transform: scale(0.98); }
.add-player-submit:disabled { opacity: 0.5; cursor: not-allowed; }

/* Reuse join-club styles from AuthScreen */
.join-club-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0; right: 0;
  background: var(--surface-raised);
  border: 0.5px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  z-index: 20;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.join-club-result {
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  border-bottom: 0.5px solid var(--border-dim);
  display: flex; flex-direction: column;
  transition: background 0.1s;
}
.join-club-result:last-child { border-bottom: none; }
.join-club-result:hover { background: var(--bg); }
.join-club-result-name {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 700; color: white;
}
.join-club-result-meta { font-size: 11px; color: var(--text-mute); margin-top: 1px; }
.join-club-status {
  padding: 12px 14px;
  font-size: 13px;
  color: var(--text-mute);
}
.join-club-selected {
  background: var(--surface);
  border-radius: 10px;
  padding: 12px 14px;
  display: flex; align-items: center;
  gap: 10px;
  margin-bottom: 2px;
}
.join-club-selected-name {
  font-family: var(--font-display);
  font-size: 15px; font-weight: 700; color: white;
  flex: 1;
}
.join-club-selected-city { font-size: 11px; color: var(--text-mute); }
.join-club-change {
  color: var(--ice);
  font-size: 12px; font-weight: 600;
  padding: 4px 10px;
  border: 0.5px solid var(--border-dim);
  border-radius: 999px;
  background: transparent;
  flex-shrink: 0;
}

.input-label { display: block; margin-bottom: 4px; }
.input-label > span {
  font-size: 11px;
  color: var(--text-mute);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
}
.input-field {
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border-dim);
  color: var(--text);
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
  -webkit-appearance: none;
}
.input-field:focus { border-color: var(--accent); }
.input-field::placeholder { color: var(--text-mute); }
`
