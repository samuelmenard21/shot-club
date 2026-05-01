import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTeamInviteByCode } from '../lib/teams'
import { setSEO, CANONICAL_URL } from '../lib/seo'

export default function PlayerJoinTeamScreen() {
  const { code } = useParams()
  const nav = useNavigate()
  const [invite, setInvite] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setSEO({
      title: 'Join your team',
      description: 'Join your hockey team on Hockey Shot Challenge.',
      url: `${CANONICAL_URL}/j/${code || ''}`,
      noindex: true,
    })
  }, [code])

  useEffect(() => {
    ;(async () => {
      if (!code) {
        setError('Invalid link.')
        setLoading(false)
        return
      }
      try {
        const inv = await getTeamInviteByCode(code)
        if (!inv) {
          setError("This invite link isn't valid anymore. Ask your coach for a new one.")
          setLoading(false)
          return
        }
        // Check expiry / max uses
        if (inv.expires_at && new Date(inv.expires_at) < new Date()) {
          setError('This invite has expired. Ask your coach for a new one.')
          setLoading(false)
          return
        }
        if (inv.max_uses && inv.uses_count >= inv.max_uses) {
          setError("This invite has been used up. Ask your coach for a new one.")
          setLoading(false)
          return
        }
        setInvite(inv)
      } catch (e) {
        setError("Couldn't load that invite. Try again or ask your coach for a new link.")
      }
      setLoading(false)
    })()
  }, [code])

  const handleStart = () => {
    // Stash the invite code so AuthScreen / signup can attach the new player to the team
    try {
      sessionStorage.setItem('pending_team_invite', code)
    } catch (e) {}
    nav('/start')
  }

  if (loading) {
    return (
      <div className="pj-wrap pj-centered">
        <div style={{ color: 'var(--text-mute)', fontFamily: 'var(--font-display)', letterSpacing: 2, fontSize: 12 }}>
          LOADING…
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  if (error || !invite) {
    return (
      <div className="pj-wrap pj-centered">
        <div className="pj-card">
          <div className="pj-result-mark">⚠</div>
          <h2 className="pj-card-title">Hmm.</h2>
          <p className="pj-card-sub">{error || 'Something went wrong.'}</p>
          <button className="pj-btn" onClick={() => nav('/')}>
            Go home
          </button>
        </div>
        <style>{styles}</style>
      </div>
    )
  }

  const team = invite.team
  const club = team?.club
  const teamLabel = team ? `${team.age_division || ''} ${team.tier || ''}`.trim() : 'Your team'

  return (
    <div className="pj-wrap pj-centered">
      <div className="pj-card">
        <div className="pj-eyebrow">YOU'RE INVITED</div>
        <h1 className="pj-club-name">{club?.name}</h1>
        <div className="pj-team">{teamLabel}{club?.city ? ` · ${club.city}` : ''}</div>

        <div className="pj-pitch">
          <p className="pj-pitch-text">
            Track every shot you take. Climb your team's leaderboard. Earn your rank.
          </p>
        </div>

        <button className="pj-btn pj-btn-big" onClick={handleStart}>
          I'm in →
        </button>

        <div className="pj-tiny">
          Takes 30 seconds. Just pick a name — no email needed.
        </div>
      </div>
      <style>{styles}</style>
    </div>
  )
}

const styles = `
.pj-wrap {
  min-height: 100dvh;
  background: var(--bg);
  width: 100%;
  color: var(--text);
  font-family: var(--font-body);
}
.pj-centered {
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.pj-card {
  width: 100%; max-width: 420px;
  background: var(--surface);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius-lg);
  padding: 28px 22px;
  text-align: center;
}
.pj-eyebrow {
  font-family: var(--font-display);
  font-size: 11px; font-weight: 600;
  color: var(--ice);
  letter-spacing: 2px;
  margin-bottom: 12px;
}
.pj-club-name {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.3px;
  color: white;
  margin: 0 0 6px;
}
.pj-team {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--ice);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 22px;
}
.pj-pitch {
  background: var(--bg);
  border: 0.5px solid var(--border-dim);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 20px;
}
.pj-pitch-text {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.5;
  margin: 0;
}
.pj-card-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 800;
  color: white;
  margin: 0 0 6px;
}
.pj-card-sub {
  font-size: 14px;
  color: var(--text-soft);
  margin: 0 0 18px;
  line-height: 1.5;
}
.pj-btn {
  width: 100%;
  background: var(--accent);
  color: white;
  border-radius: var(--radius);
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.4px;
  font-family: var(--font-display);
  transition: transform 0.1s, background 0.15s;
}
.pj-btn:hover { background: var(--accent-soft); }
.pj-btn:active { transform: scale(0.98); }
.pj-btn-big {
  padding: 16px;
  font-size: 16px;
  margin-bottom: 12px;
}
.pj-tiny {
  font-size: 12px;
  color: var(--text-mute);
  line-height: 1.4;
}
.pj-result-mark {
  font-size: 40px;
  margin-bottom: 14px;
}
`
