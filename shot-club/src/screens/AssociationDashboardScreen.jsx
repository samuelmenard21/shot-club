import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { getClubStats, getClubTeams, getClubPlayers } from '../lib/clubs'
import { getTeamWeeklyShots, getAssociationChallenges } from '../lib/challenges'
import { setSEO } from '../lib/seo'

export default function AssociationDashboardScreen() {
  const nav = useNavigate()
  const { player } = useAuth()
  const [clubInfo, setClubInfo] = useState(null)
  const [teams, setTeams] = useState([])
  const [players, setPlayers] = useState([])
  const [teamStats, setTeamStats] = useState([])
  const [associationChallenges, setAssociationChallenges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setSEO({
      title: 'Association Dashboard — Multi-Team Overview',
      description: 'Track all your hockey teams, challenges, and participation.',
      noindex: true,
    })
  }, [])

  useEffect(() => {
    if (!player?.club_id || !player?.is_club_director) {
      if (!loading) nav('/')
      return
    }
    loadDashboard()
  }, [player, nav])

  const loadDashboard = async () => {
    try {
      setLoading(true)
      const [stats, teamList, playerList, challenges] = await Promise.all([
        getClubStats(player.club_id),
        getClubTeams(player.club_id),
        getClubPlayers(player.club_id),
        getAssociationChallenges(player.club_id),
      ])

      setClubInfo(stats)
      setTeams(teamList)
      setPlayers(playerList)
      setAssociationChallenges(challenges)

      // Get weekly shots for each team
      const teamsWithShots = await Promise.all(
        teamList.map(async (team) => {
          const shots = await getTeamWeeklyShots(team.id)
          return { ...team, weeklyShots: shots }
        })
      )

      // Sort by weekly shots (descending)
      teamsWithShots.sort((a, b) => (b.weeklyShots || 0) - (a.weeklyShots || 0))
      setTeamStats(teamsWithShots)
      setError('')
    } catch (err) {
      console.error('Error loading dashboard:', err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-mute)', fontFamily: 'var(--font-body)' }}>
        LOADING…
      </div>
    )
  }

  if (!player?.is_club_director) {
    return (
      <div style={{ minHeight: '100dvh', background: 'var(--bg)', color: 'var(--text)', padding: '20px', fontFamily: 'var(--font-body)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '40px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 16 }}>
            Director Access Only
          </h1>
          <p style={{ color: 'var(--text-soft)', marginBottom: 24 }}>
            Only club directors can view the association dashboard.
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
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', maxWidth: '1200px', margin: '0 auto', borderBottom: '0.5px solid var(--border-dim)' }}>
        <button
          onClick={() => nav('/')}
          style={{ fontSize: 18, fontWeight: 700, background: 'transparent', cursor: 'pointer', color: 'white', border: 'none' }}
        >
          ← Back
        </button>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'white' }}>Association Overview</h1>
        <div style={{ width: '80px' }} />
      </nav>

      {/* MAIN */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 20px 40px' }}>
        {error && (
          <div style={{ marginBottom: 16, padding: 12, background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, color: '#fca5a5', fontSize: 14 }}>
            {error}
          </div>
        )}

        {/* CLUB STATS */}
        {clubInfo && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 32 }}>
            <div style={{ padding: 16, background: 'rgba(61, 214, 140, 0.1)', border: '1px solid rgba(61, 214, 140, 0.3)', borderRadius: 12 }}>
              <div style={{ fontSize: 12, color: 'var(--text-soft)', marginBottom: 8, textTransform: 'uppercase' }}>Teams</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent)' }}>{clubInfo.teamCount}</div>
            </div>
            <div style={{ padding: 16, background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: 12 }}>
              <div style={{ fontSize: 12, color: 'var(--text-soft)', marginBottom: 8, textTransform: 'uppercase' }}>Players</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#60a5fa' }}>{clubInfo.playerCount}</div>
            </div>
            <div style={{ padding: 16, background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: 12 }}>
              <div style={{ fontSize: 12, color: 'var(--text-soft)', marginBottom: 8, textTransform: 'uppercase' }}>Total Shots</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#d8b4fe' }}>{(clubInfo.totalShots || 0).toLocaleString()}</div>
            </div>
          </div>
        )}

        {/* TEAM LEADERBOARD */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'white', marginBottom: 16 }}>🏆 Team Leaderboard (This Week)</div>
          {teamStats.length === 0 ? (
            <div style={{ padding: 20, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 12, textAlign: 'center', color: 'var(--text-soft)' }}>
              No teams yet
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {teamStats.map((team, index) => (
                <div
                  key={team.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px',
                    background: index === 0 ? 'rgba(61, 214, 140, 0.1)' : index === 1 ? 'rgba(168, 85, 247, 0.1)' : index === 2 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: index < 3 ? `1px solid ${index === 0 ? 'rgba(61, 214, 140, 0.3)' : index === 1 ? 'rgba(168, 85, 247, 0.3)' : 'rgba(59, 130, 246, 0.3)'}` : '1px solid var(--border-dim)',
                    borderRadius: 10,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 4 }}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`} {team.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>
                      {team.age_division} {team.tier}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ice)' }}>{(team.weeklyShots || 0).toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-soft)' }}>shots this week</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PARTICIPATION */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'white', marginBottom: 16 }}>📊 Participation</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 8 }}>
            {teamStats.map((team) => {
              const isActive = (team.weeklyShots || 0) > 0
              return (
                <div
                  key={team.id}
                  style={{
                    padding: '12px',
                    background: isActive ? 'rgba(61, 214, 140, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: isActive ? '1px solid rgba(61, 214, 140, 0.3)' : '1px solid var(--border-dim)',
                    borderRadius: 8,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 11, color: isActive ? 'var(--accent)' : 'var(--text-soft)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {isActive ? '✓ Active' : '○ Inactive'}
                  </div>
                  <div style={{ fontSize: 13, color: 'white', fontWeight: 600, marginTop: 4 }}>
                    {team.name}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ASSOCIATION CHALLENGES */}
        {associationChallenges.length > 0 && (
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'white', marginBottom: 16 }}>🎯 Association Challenges</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {associationChallenges.map((challenge) => {
                const daysLeft = Math.ceil((new Date(challenge.end_date) - new Date()) / (1000 * 60 * 60 * 24))
                const isActive = daysLeft > 0
                return (
                  <div
                    key={challenge.id}
                    style={{
                      padding: '16px',
                      background: isActive ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      border: isActive ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid var(--border-dim)',
                      borderRadius: 12,
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: 'white' }}>{challenge.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-soft)', marginTop: 4 }}>{challenge.challenge_type.toUpperCase()} Challenge</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: isActive ? 'var(--accent)' : 'var(--text-soft)' }}>
                          {daysLeft > 0 ? `${daysLeft} days left` : 'Ended'}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-soft)', marginTop: 2 }}>{challenge.goal_shots.toLocaleString()} shots</div>
                      </div>
                    </div>
                    {challenge.description && (
                      <div style={{ fontSize: 13, color: 'var(--text-soft)', marginTop: 8 }}>
                        {challenge.description}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {associationChallenges.length === 0 && (
          <div style={{ padding: 20, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 12, textAlign: 'center', color: 'var(--text-soft)' }}>
            No association challenges created yet
          </div>
        )}
      </div>
    </div>
  )
}
