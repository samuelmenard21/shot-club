import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { createTeamChallenge, getTeamChallengeProgress, getTeamWeeklyShots } from '../lib/challenges'
import { setSEO } from '../lib/seo'

export default function CoachChallengeScreen() {
  const nav = useNavigate()
  const { player } = useAuth()
  const [teamChallenge, setTeamChallenge] = useState(null)
  const [teamWeeklyShots, setTeamWeeklyShots] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    challengeType: '10k',
    goalShots: 10000,
  })

  useEffect(() => {
    setSEO({
      title: 'Create Team Challenge — Coach Dashboard',
      description: 'Set up a weekly challenge for your hockey team. Track progress, motivate players.',
    })
  }, [])

  useEffect(() => {
    if (!player?.team_id) return
    loadChallenge()
  }, [player])

  const loadChallenge = async () => {
    try {
      const [progress, shots] = await Promise.all([
        getTeamChallengeProgress(player.team_id),
        getTeamWeeklyShots(player.team_id),
      ])
      setTeamChallenge(progress)
      setTeamWeeklyShots(shots)
    } catch (err) {
      console.error('Error loading challenge:', err)
    }
  }

  const handleChallengeTypeChange = (type) => {
    const goals = { '5k': 5000, '10k': 10000, 'custom': 5000 }
    setFormData({
      ...formData,
      challengeType: type,
      goalShots: goals[type],
    })
  }

  const handleCreateChallenge = async (e) => {
    e.preventDefault()
    if (!player?.team_id) return
    if (!formData.name || !formData.goalShots) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')
    try {
      await createTeamChallenge(
        player.team_id,
        formData.name,
        parseInt(formData.goalShots),
        formData.challengeType
      )
      setFormData({ name: '', challengeType: '10k', goalShots: 10000 })
      await loadChallenge()
    } catch (err) {
      console.error('Error creating challenge:', err)
      setError('Failed to create challenge. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!player?.is_coach) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text)', padding: '20px', fontFamily: 'var(--font-body)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '40px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 16 }}>
            Coach Access Only
          </h1>
          <p style={{ color: 'var(--text-soft)', marginBottom: 24 }}>
            Only team coaches can create challenges.
          </p>
          <button
            onClick={() => nav('/')}
            style={{
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Back to home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <button
          onClick={() => nav('/')}
          style={{ fontSize: 18, fontWeight: 700, background: 'transparent', cursor: 'pointer', color: 'white', border: 'none' }}
        >
          ← Back
        </button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'white' }}>Create Challenge</h1>
        <div style={{ width: '80px' }} />
      </nav>

      {/* MAIN */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px 40px' }}>
        {/* CURRENT CHALLENGE */}
        {teamChallenge && (
          <div style={{ marginBottom: 32, padding: 16, background: 'rgba(61, 214, 140, 0.1)', border: '1.5px solid rgba(61, 214, 140, 0.3)', borderRadius: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', marginBottom: 8, textTransform: 'uppercase' }}>
              This Week's Challenge
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 8 }}>
              {teamChallenge.name}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-soft)', marginBottom: 4 }}>TEAM PROGRESS</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ice)' }}>
                  {teamWeeklyShots.toLocaleString()} / {teamChallenge.goal_shots.toLocaleString()}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-soft)', marginBottom: 4 }}>COMPLETE</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--accent)' }}>
                  {teamChallenge.progress_pct}%
                </div>
              </div>
            </div>
            <div style={{
              width: '100%',
              height: 10,
              background: 'rgba(0,0,0,0.2)',
              borderRadius: 5,
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #3dd68c 0%, #2dbd72 100%)',
                width: `${Math.min(100, teamChallenge.progress_pct)}%`,
              }} />
            </div>
          </div>
        )}

        {error && (
          <div style={{ marginBottom: 16, padding: 12, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, color: '#fca5a5', fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleCreateChallenge} style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 8 }}>
              Challenge Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Summer Showdown, August Grind"
              style={{
                width: '100%',
                padding: '12px 14px',
                background: 'var(--surface)',
                border: '0.5px solid var(--border-dim)',
                borderRadius: 8,
                color: 'white',
                fontFamily: 'var(--font-body)',
                fontSize: 14,
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 8 }}>
              Challenge Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {['5k', '10k', 'custom'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChallengeTypeChange(type)}
                  style={{
                    padding: '12px 14px',
                    background: formData.challengeType === type ? 'var(--accent)' : 'var(--surface)',
                    border: formData.challengeType === type ? '1px solid var(--accent)' : '0.5px solid var(--border-dim)',
                    borderRadius: 8,
                    color: 'white',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {type === '5k' ? '5K' : type === '10k' ? '10K' : 'Custom'}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 8 }}>
              Goal Shots
            </label>
            <input
              type="number"
              value={formData.goalShots}
              onChange={(e) => setFormData({ ...formData, goalShots: parseInt(e.target.value) || 0 })}
              min="100"
              step="100"
              style={{
                width: '100%',
                padding: '12px 14px',
                background: 'var(--surface)',
                border: '0.5px solid var(--border-dim)',
                borderRadius: 8,
                color: 'white',
                fontFamily: 'var(--font-body)',
                fontSize: 14,
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: loading ? 'rgba(61, 214, 140, 0.5)' : 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Creating...' : 'Create Challenge'}
          </button>
        </form>

        <div style={{ padding: 16, background: 'rgba(59, 130, 246, 0.05)', borderRadius: 8, borderLeft: '3px solid #3b82f6' }}>
          <div style={{ fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.6 }}>
            <strong style={{ color: 'white' }}>Tip:</strong> Create a challenge at the start of the week. All players on your team will see the goal on their home screen. Weekly challenges reset every Monday.
          </div>
        </div>
      </div>
    </div>
  )
}
