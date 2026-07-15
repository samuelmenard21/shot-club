import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO } from '../lib/seo'
import { useAuth } from '../hooks/useAuth'
import { setPlayerChallenge } from '../lib/challenges'

export default function ChallengeSelector() {
  const nav = useNavigate()
  const { player } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setSEO({
      title: 'Choose Your Hockey Challenge — 5K, 10K, or Custom',
      description: 'Pick your hockey challenge: 5000 shot challenge, 10000 shot challenge, or create a custom goal. Free tracking with live leaderboards.',
      url: 'https://hockeyshotchallenge.com/challenges',
    })
  }, [])

  const handleChallengeSelect = async (challengeType, goalShots) => {
    if (!player) {
      nav('/start')
      return
    }
    setLoading(true)
    setError('')
    try {
      await setPlayerChallenge(player.id, challengeType, goalShots)
      nav('/')
    } catch (err) {
      console.error('Error selecting challenge:', err)
      setError('Failed to save challenge. Please try again.')
      setLoading(false)
    }
  }

  const challenges = [
    {
      id: '5k',
      title: '5,000 Shot Challenge',
      subtitle: 'Beginner to Intermediate',
      shots: 5000,
      weeks: 8,
      description: 'Perfect for young players or a 2-month challenge',
      pace: '625 shots/week',
      color: 'from-orange-500 to-red-600',
      onClick: () => handleChallengeSelect('5k', 5000),
    },
    {
      id: '10k',
      title: '10,000 Shot Challenge',
      subtitle: 'Intermediate to Advanced',
      shots: 10000,
      weeks: 8,
      description: 'The classic summer challenge for dedicated players',
      pace: '1,250 shots/week',
      color: 'from-blue-500 to-cyan-600',
      onClick: () => handleChallengeSelect('10k', 10000),
    },
    {
      id: 'custom',
      title: 'Custom Challenge',
      subtitle: 'Your Goal',
      shots: '?',
      weeks: '?',
      description: 'Set your own goal and track progress in real-time',
      pace: 'Your pace',
      color: 'from-purple-500 to-pink-600',
      onClick: () => {
        if (player) nav('/challenges/custom')
        else nav('/start')
      },
    },
  ]

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <button
          style={{ fontSize: 18, fontWeight: 700, background: 'transparent', cursor: 'pointer', color: 'white', border: 'none' }}
          onClick={() => nav('/')}
        >
          🏒 Hockey Shot Challenge
        </button>
        <button
          style={{ background: 'var(--accent)', color: 'white', padding: '10px 20px', borderRadius: 8, fontWeight: 700, cursor: 'pointer', border: 'none' }}
          onClick={() => nav('/start')}
        >
          Start tracking →
        </button>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'var(--accent)', marginBottom: 16 }}>
          PICK YOUR CHALLENGE
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 8vw, 56px)', fontWeight: 800, color: 'white', lineHeight: 1.1, marginBottom: 16 }}>
          Choose Your Shot Challenge
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-soft)', marginBottom: 32, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Whether it's a quick 5K or an ambitious 10K, we've got you covered. Track your progress in real-time with live leaderboards and celebrate every milestone.
        </p>
      </section>

      {error && (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '12px 20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, color: '#fca5a5', fontSize: 14, marginBottom: 24 }}>
          {error}
        </div>
      )}

      {/* CHALLENGE CARDS */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {challenges.map((c) => (
          <button
            key={c.id}
            onClick={c.onClick}
            disabled={loading}
            style={{
              background: `linear-gradient(135deg, rgba(${c.id === '5k' ? '249, 115, 22' : c.id === '10k' ? '59, 130, 246' : '147, 51, 234'}, 0.1) 0%, rgba(${c.id === '5k' ? '220, 38, 38' : c.id === '10k' ? '6, 182, 212' : '236, 72, 153'}, 0.05) 100%)`,
              border: `1.5px solid rgba(${c.id === '5k' ? '249, 115, 22' : c.id === '10k' ? '59, 130, 246' : '147, 51, 234'}, 0.3)`,
              borderRadius: 16,
              padding: 32,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'left',
              color: 'white',
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = `rgba(${c.id === '5k' ? '249, 115, 22' : c.id === '10k' ? '59, 130, 246' : '147, 51, 234'}, 0.6)`
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = `rgba(${c.id === '5k' ? '249, 115, 22' : c.id === '10k' ? '59, 130, 246' : '147, 51, 234'}, 0.3)`
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: 'var(--accent)', marginBottom: 8 }}>
              {c.subtitle}
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, marginBottom: 12 }}>
              {c.title}
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-soft)', marginBottom: 20 }}>
              {c.description}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-mute)' }}>TARGET SHOTS</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ice)' }}>{c.shots.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-mute)' }}>DAILY PACE</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ice)' }}>{c.pace}</div>
              </div>
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
