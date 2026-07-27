import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO } from '../lib/seo'
import { useAuth } from '../hooks/useAuth'
import { setPlayerChallenge } from '../lib/challenges'
import { CHALLENGE_LIST, weeklyPace } from '../lib/challengeSpecs'

// #rrggbb -> rgba(), so one accent per challenge drives every tint on the card.
function rgba(hex, alpha) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function ChallengeSelector() {
  const nav = useNavigate()
  const { player, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setSEO({
      title: 'Choose Your Hockey Challenge — 1K, 2.5K, 5K, 10K, or Custom',
      description: 'Pick your hockey challenge: 1000 shot challenge for rookies, 2500 shot challenge, 5000 shot challenge, 10000 shot challenge, or create a custom goal. Free tracking with live leaderboards.',
      url: 'https://hockeyshotchallenge.com/challenges',
    })
  }, [])

  const handleChallengeSelect = async (challengeType, goalShots) => {
    if (!player) {
      console.log('No player found, redirecting to sign-in')
      nav('/start')
      return
    }
    setLoading(true)
    setError('')
    try {
      console.log('Setting challenge:', { playerId: player.id, challengeType, goalShots })
      const result = await setPlayerChallenge(player.id, challengeType, goalShots)
      console.log('Challenge set successfully:', result)
      if (!result) {
        setError('Failed to save challenge. Please try again.')
        setLoading(false)
        return
      }
      nav('/')
    } catch (err) {
      console.error('Error selecting challenge:', err.message, err)
      setError(`Error: ${err.message || 'Failed to save challenge. Please try again.'}`)
      setLoading(false)
    }
  }

  // Cards are derived from the shared spec so this screen, the homepage picker,
  // the printables and the in-app grid can never disagree about targets or pace.
  const challenges = [
    ...CHALLENGE_LIST.map((s) => ({
      id: s.id,
      title: `${s.total.toLocaleString()} Shot Challenge`,
      subtitle: s.label,
      shots: s.total,
      weeks: s.weeks,
      description: s.blurb,
      pace: `${weeklyPace(s).toLocaleString()}/wk`,
      accent: s.accent,
      onClick: () => handleChallengeSelect(s.id, s.total),
    })),
    {
      id: 'custom',
      title: 'Custom Challenge',
      subtitle: 'Your Goal',
      shots: '?',
      weeks: '?',
      description: 'Set your own goal and track progress in real-time',
      pace: 'Yours',
      accent: '#9333ea',
      onClick: () => {
        if (player) nav('/challenges/custom')
        else nav('/start')
      },
    },
  ]

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '14px 16px', maxWidth: '1200px', margin: '0 auto' }}>
        <button
          style={{ fontSize: 'clamp(15px, 4vw, 18px)', fontWeight: 700, background: 'transparent', cursor: 'pointer', color: 'white', border: 'none', padding: 0, textAlign: 'left', lineHeight: 1.15 }}
          onClick={() => nav('/')}
        >
          🏒 Hockey Shot Challenge
        </button>
        <button
          style={{ background: 'var(--accent)', color: 'white', padding: '10px 16px', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer', border: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
          onClick={() => nav('/start')}
        >
          Start →
        </button>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '28px 16px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'var(--accent)', marginBottom: 12 }}>
          PICK YOUR CHALLENGE
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 7vw, 52px)', fontWeight: 800, color: 'white', lineHeight: 1.12, marginBottom: 12 }}>
          Choose Your Shot Challenge
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text-soft)', marginBottom: 0, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
          Start with the 1K and work your way up to Hall of Famer. Every shot counts
          toward live leaderboards, streaks and milestone medals.
        </p>
      </section>

      {error && (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '12px 20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, color: '#fca5a5', fontSize: 14, marginBottom: 24 }}>
          {error}
        </div>
      )}

      {/* CHALLENGE CARDS */}
      {/* min() lets the track collapse to a single full-width column on a phone
          instead of holding a 300px floor and overflowing the viewport. */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 16 }}>
        {challenges.map((c) => (
          <button
            key={c.id}
            onClick={c.onClick}
            disabled={loading || authLoading}
            style={{
              background: `linear-gradient(135deg, ${rgba(c.accent, 0.1)} 0%, ${rgba(c.accent, 0.05)} 100%)`,
              border: `1.5px solid ${rgba(c.accent, 0.3)}`,
              borderRadius: 16,
              padding: 'clamp(18px, 5vw, 28px)',
              cursor: loading || authLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'left',
              color: 'white',
              opacity: loading || authLoading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading && !authLoading) {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = `${rgba(c.accent, 0.6)}`
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = `${rgba(c.accent, 0.3)}`
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: c.accent, marginBottom: 8, textTransform: 'uppercase' }}>
              {c.subtitle}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(20px, 5.5vw, 24px)', fontWeight: 800, marginBottom: 8 }}>
              {c.title}
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.45, color: 'var(--text-soft)', marginBottom: 16 }}>
              {c.description}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 0.6, color: 'var(--text-mute)' }}>TARGET</div>
                <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--ice)' }}>{c.shots.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 0.6, color: 'var(--text-mute)' }}>PACE</div>
                <div style={{ fontSize: 19, fontWeight: 800, color: 'var(--ice)' }}>{c.pace}</div>
              </div>
            </div>
            <div
              style={{
                marginTop: 24,
                width: '100%',
                background: `${rgba(c.accent, 0.9)}`,
                color: 'white',
                borderRadius: 10,
                padding: '14px 20px',
                fontWeight: 800,
                fontSize: 15,
                textAlign: 'center',
              }}
            >
              {loading ? 'Saving…' : `Start This Challenge →`}
            </div>
          </button>
        ))}
      </section>

      {/* FOOTER CTA */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', textAlign: 'center', background: 'rgba(61, 214, 140, 0.05)', borderRadius: 16, marginBottom: 60 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 6vw, 36px)', fontWeight: 800, color: 'white', marginBottom: 16 }}>
          Running a League Challenge?
        </h2>
        <p style={{ fontSize: 16, color: 'var(--text-soft)', marginBottom: 24, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Associations and leagues can set up branded leaderboards for their members — completely free. We handle the tech, you keep the community.
        </p>
        <button
          onClick={() => nav('/association-partnership')}
          style={{
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '14px 28px',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(41, 121, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          Set Up Your League Challenge
        </button>
      </section>
    </div>
  )
}
