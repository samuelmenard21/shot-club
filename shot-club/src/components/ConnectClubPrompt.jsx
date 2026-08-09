import { useState, useEffect, useRef } from 'react'
import { searchClubs, findOrCreateTeamForPlayer, updatePlayerClub, AGE_DIVISIONS, TIERS } from '../lib/clubs'

// A player who skipped club/team at signup gets a low-friction chance to fix
// that wherever it actually matters to them — the dashboard tracker (for
// leaderboard grouping) and the Rank screen (where Team/Club tabs are
// otherwise just disabled with no way out). Reuses the exact same search +
// find_or_create_team_for_player path signup goes through, so a player who
// connects here lands on the identical team row a teammate who filled it in
// at signup would.
export default function ConnectClubPrompt({ playerId, onConnected }) {
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
      <button className="ccp-btn" onClick={() => setOpen(true)}>
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
    <div className="ccp-wrap">
      {!club ? (
        <div className="ccp-search">
          <input
            className="ccp-input"
            type="text"
            placeholder="Burlington Eagles, Mississauga…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query.trim().length >= 2 && results.length > 0 && (
            <div className="ccp-results">
              {results.map((c) => (
                <button key={c.id} className="ccp-result" onClick={() => { setClub(c); setQuery(''); setResults([]) }}>
                  {c.name}{c.city ? ` · ${c.city}` : ''}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="ccp-club">{club.name}</div>
          <select className="ccp-select" value={ageDivision} onChange={(e) => setAgeDivision(e.target.value)}>
            <option value="">Age division</option>
            {AGE_DIVISIONS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <select className="ccp-select" value={tier} onChange={(e) => setTier(e.target.value)}>
            <option value="">Tier</option>
            {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <button className="ccp-save" disabled={!ageDivision || !tier || saving} onClick={connect}>
            {saving ? 'Connecting…' : 'Connect'}
          </button>
        </>
      )}
      {error && <div className="ccp-error">{error}</div>}
      <button className="ccp-cancel" onClick={() => setOpen(false)}>Cancel</button>
      <style>{styles}</style>
    </div>
  )
}

const styles = `
.ccp-btn { font-family: inherit; font-size: 12px; font-weight: 700; background: transparent;
  border: 1px dashed var(--accent); color: var(--accent); border-radius: 999px;
  padding: 5px 12px; cursor: pointer; margin-bottom: 4px; }
.ccp-wrap { background: var(--bg); border: 0.5px solid var(--border-dim); border-radius: 10px; padding: 10px; margin-bottom: 8px;
  display: flex; flex-direction: column; gap: 8px; max-width: 320px; }
.ccp-search { position: relative; }
.ccp-input { width: 100%; padding: 7px 10px; font-size: 13px; border-radius: 8px;
  border: 1px solid var(--border-dim); background: var(--surface); color: var(--text); }
.ccp-results { position: absolute; top: 100%; left: 0; right: 0; z-index: 5; background: var(--surface);
  border: 1px solid var(--border-dim); border-radius: 8px; margin-top: 4px; overflow: hidden; }
.ccp-result { display: block; width: 100%; text-align: left; padding: 8px 10px; font-size: 12.5px;
  background: transparent; border: none; cursor: pointer; color: var(--text); }
.ccp-result:hover { background: rgba(255,255,255,0.05); }
.ccp-club { font-weight: 700; font-size: 13px; color: white; }
.ccp-select { width: 100%; padding: 7px 10px; font-size: 13px; border-radius: 8px;
  border: 1px solid var(--border-dim); background: var(--surface); color: var(--text); }
.ccp-save { font-family: inherit; font-weight: 700; font-size: 12.5px; border: none; border-radius: 8px;
  padding: 8px; cursor: pointer; background: var(--accent); color: #fff; }
.ccp-save:disabled { opacity: .5; cursor: default; }
.ccp-cancel { font-family: inherit; font-size: 11px; background: transparent; border: none;
  color: var(--accent); text-decoration: underline; cursor: pointer; align-self: flex-start; }
.ccp-error { font-size: 11.5px; color: var(--danger); }
`
