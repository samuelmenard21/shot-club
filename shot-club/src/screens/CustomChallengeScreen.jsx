import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { setPlayerChallenge } from '../lib/challenges'
import { setSEO } from '../lib/seo'

export default function CustomChallengeScreen() {
  const nav = useNavigate()
  const { player } = useAuth()
  const [shotGoal, setShotGoal] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setSEO({
      title: 'Set Your Custom Challenge',
      description: 'Create a custom shot goal and track your progress toward your own target.',
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!shotGoal || parseInt(shotGoal) < 100) {
      setError('Please enter a goal of at least 100 shots')
      return
    }

    if (!player) {
      setError('You must be logged in')
      return
    }

    setLoading(true)
    setError('')

    try {
      await setPlayerChallenge(
        player.id,
        'custom',
        parseInt(shotGoal),
        targetDate || null
      )
      nav('/')
    } catch (err) {
      console.error('Error creating challenge:', err)
      setError('Failed to create challenge. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getSuggestedGoals = () => {
    const today = new Date()
    const endOfSummer = new Date(today.getFullYear(), 8, 1) // September 1
    const daysLeft = Math.ceil((endOfSummer - today) / (1000 * 60 * 60 * 24))

    return [
      { shots: 2500, label: '2,500 shots', desc: `~${Math.ceil(2500 / daysLeft)}/day by end of summer` },
      { shots: 5000, label: '5,000 shots', desc: `~${Math.ceil(5000 / daysLeft)}/day by end of summer` },
      { shots: 7500, label: '7,500 shots', desc: `~${Math.ceil(7500 / daysLeft)}/day by end of summer` },
      { shots: 10000, label: '10,000 shots', desc: `~${Math.ceil(10000 / daysLeft)}/day by end of summer` },
    ]
  }

  const suggestedGoals = getSuggestedGoals()

  // Calculate min date (today) and format it
  const today = new Date()
  const minDate = today.toISOString().split('T')[0]
  const maxDate = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0]

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-body)' }}>
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <button
          onClick={() => nav('/challenges')}
          style={{ fontSize: 18, fontWeight: 700, background: 'transparent', cursor: 'pointer', color: 'white', border: 'none' }}
        >
          ← Back
        </button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'white' }}>Custom Challenge</h1>
        <div style={{ width: '80px' }} />
      </nav>

      {/* MAIN */}
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '0 20px 40px' }}>
        {error && (
          <div style={{ marginBottom: 16, padding: 12, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, color: '#fca5a5', fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* HERO */}
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: 'var(--accent)', marginBottom: 16, textTransform: 'uppercase' }}>
            SET YOUR OWN GOAL
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: 12 }}>
            Pick Your Challenge
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-soft)' }}>
            No pressure. You can set any goal and adjust it anytime.
          </p>
        </div>

        {/* QUICK SUGGESTIONS */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-soft)', marginBottom: 12, textTransform: 'uppercase' }}>
            Popular Goals
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {suggestedGoals.map((goal) => (
              <button
                key={goal.shots}
                onClick={() => setShotGoal(String(goal.shots))}
                style={{
                  padding: '12px',
                  background: shotGoal === String(goal.shots) ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)',
                  border: shotGoal === String(goal.shots) ? '1px solid var(--accent)' : '1px solid var(--border-dim)',
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  if (shotGoal !== String(goal.shots)) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (shotGoal !== String(goal.shots)) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 4 }}>
                  {goal.label}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-soft)' }}>
                  {goal.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 8 }}>
              Shot Goal
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="number"
                value={shotGoal}
                onChange={(e) => setShotGoal(e.target.value)}
                placeholder="e.g., 5000"
                min="100"
                step="100"
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  background: 'var(--surface)',
                  border: '0.5px solid var(--border-dim)',
                  borderRadius: 8,
                  color: 'white',
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  fontWeight: 700,
                }}
              />
              <div style={{ fontSize: 12, color: 'var(--text-soft)', display: 'flex', alignItems: 'center', paddingTop: 12 }}>
                shots
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 8 }}>
              Target Completion Date (Optional)
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              min={minDate}
              max={maxDate}
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
            <div style={{ fontSize: 12, color: 'var(--text-soft)', marginTop: 6 }}>
              {targetDate
                ? `You'll need ~${Math.ceil(parseInt(shotGoal || 0) / Math.max(1, Math.ceil((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24))))} shots/day`
                : 'No deadline — go at your own pace'}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !shotGoal}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: loading || !shotGoal ? 'rgba(61, 214, 140, 0.5)' : 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 16,
              cursor: loading || !shotGoal ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Creating...' : 'Create My Challenge'}
          </button>
        </form>

        {/* INFO */}
        <div style={{ padding: 16, background: 'rgba(59, 130, 246, 0.05)', borderRadius: 8, borderLeft: '3px solid #3b82f6' }}>
          <div style={{ fontSize: 13, color: 'var(--text-soft)', lineHeight: 1.6 }}>
            <strong style={{ color: 'white' }}>💡 Tip:</strong> Start with something achievable. You can always adjust your goal or create a new one later.
          </div>
        </div>
      </div>
    </div>
  )
}
