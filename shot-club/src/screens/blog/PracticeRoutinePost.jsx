import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, addStructuredData, CANONICAL_URL } from '../../lib/seo'

export default function PracticeRoutinePost() {
  const nav = useNavigate()

  useEffect(() => {
    setSEO({
      title: 'How to Build a Consistent Hockey Practice Routine (Without Burnout)',
      description: 'Weekly hockey training schedules for youth players. How much time per day? What skills to focus on? Here\'s what coaches recommend.',
      url: `${CANONICAL_URL}/blog/building-practice-routine`,
      type: 'article',
    })
    addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'How to Build a Consistent Hockey Practice Routine (Without Burnout)',
      description: 'Weekly practice schedules for youth hockey players that actually work.',
      datePublished: '2026-08-01',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Hockey Shot Challenge' },
      publisher: { '@type': 'Organization', name: 'Hockey Shot Challenge', url: 'https://hockeyshotchallenge.com' },
      keywords: 'hockey practice routine, hockey training schedule, youth hockey, off-ice training, hockey conditioning',
    })
  }, [])

  return (
    <div className="post-wrap">
      <nav className="post-nav">
        <button className="post-back" onClick={() => nav('/blog')}>← All guides</button>
        <button className="post-nav-cta" onClick={() => nav('/start')}>Start free →</button>
      </nav>

      <article className="post-article">
        <header className="post-header">
          <div className="post-eyebrow">PRACTICE ROUTINES · FOR PARENTS</div>
          <h1 className="post-title">How to Build a Consistent Hockey Practice Routine</h1>
          <p className="post-subtitle">(Without Burnout)</p>
          <p className="post-date">August 2026</p>
        </header>

        <div className="post-body">
          <p>Here's what every hockey parent wonders: How much should my kid be practicing?</p>
          <p>The answer: It depends on age, goals, and what "practice" actually means.</p>
          <p>A 10-year-old playing rec league needs a different routine than a 16-year-old trying to make elite travel. And neither one needs to be grinding 2 hours a day (that leads to burnout, not improvement).</p>
          <p>Here's how to build a practice routine that actually sticks, broken down by age and commitment level.</p>

          <h2>Ages 6–10: Foundation Phase (2–3 hours/week)</h2>
          <p><strong>Goal:</strong> Learn the fundamentals. Build love for the game. Have fun.</p>
          <p><strong>Weekly breakdown:</strong></p>
          <ul style={{ marginLeft: '20px', marginBottom: '18px' }}>
            <li>2–3x team practices (coach-led)</li>
            <li>1–2x off-ice practice (20–30 minutes)</li>
            <li>1x skills video or drill</li>
          </ul>
          <p><strong>Off-ice focus:</strong> Stickhandling, basic shooting, balance, fun. Keep it light.</p>
          <p><strong>Why this works:</strong> Kids this age need variety. Three team practices + 30 minutes of home drills per week is plenty. The goal is consistency, not intensity.</p>

          <h2>Ages 11–14: Development Phase (4–6 hours/week)</h2>
          <p><strong>Goal:</strong> Build skating skills, shot accuracy, game sense. Start specializing.</p>
          <p><strong>Weekly breakdown:</strong></p>
          <ul style={{ marginLeft: '20px', marginBottom: '18px' }}>
            <li>2–3x team practices</li>
            <li>1–2x power skating or skills clinic</li>
            <li>2–3x off-ice practice (30–45 minutes each)</li>
            <li>1x strength/conditioning</li>
          </ul>
          <p><strong>Off-ice focus:</strong> Shooting accuracy, stickhandling under pressure, agility work, basic strength.</p>
          <p><strong>Why this works:</strong> This is when skill gaps start showing. Kids who add 2–3 hours of focused practice per week pull ahead. But still keep it fun — burnout is real at this age.</p>

          <h2>Ages 15+: Competitive Phase (6–10 hours/week)</h2>
          <p><strong>Goal:</strong> Elite-level skills. Fitness. Game strategy. Preparing for tryouts.</p>
          <p><strong>Weekly breakdown:</strong></p>
          <ul style={{ marginLeft: '20px', marginBottom: '18px' }}>
            <li>3–4x team practices</li>
            <li>1–2x skills clinic or extra ice time</li>
            <li>3–4x off-ice practice (45–60 minutes each)</li>
            <li>2–3x strength/conditioning</li>
            <li>1x video review or strategy study</li>
          </ul>
          <p><strong>Off-ice focus:</strong> Advanced shooting, game-speed stickhandling, footwork, strength, speed, agility.</p>
          <p><strong>Why this works:</strong> At this level, tournament and elite teams play 25+ games per season. Year-round training is expected. Serious players add 3–5 hours of off-ice work weekly.</p>

          <h2>The Consistency Formula That Actually Works</h2>
          <p>Forget the idea of "big practice days." Consistency beats intensity every time.</p>
          <p>A player who practices 30 minutes, 3x per week = 90 min/week = 4.7 hours/month. Over a year, that's 56 hours of extra skill work.</p>
          <p>A player who tries to do a 2-hour marathon session once per month? They burn out, miss sessions, and end up with less total work.</p>
          <p><strong>The rule:</strong> 3–4x per week, 30–60 minutes per session, is the sweet spot for most players.</p>

          <h2>How to Actually Stick With It</h2>
          <p><strong>1. Make it routine.</strong> Same day, same time each week. Wednesday night after school. Saturday morning. Muscle memory applies to schedules too.</p>
          <p><strong>2. Track it.</strong> Players who see their practice reps add up — and know they're working toward a goal — stay motivated longer. Use an app to log drills.</p>
          <p><strong>3. Vary the drills.</strong> Doing the same drill every day gets boring. Mix it up: shooting one day, stickhandling the next, fitness the third.</p>
          <p><strong>4. Make it social.</strong> Practice with a friend when possible. Working out alone is harder.</p>
          <p><strong>5. Celebrate small wins.</strong> Hit 5 consecutive shots? Log 20 drills this week? That's progress. Notice it.</p>

          <h2>The Burnout Warning Signs</h2>
          <p>If your player is:</p>
          <ul style={{ marginLeft: '20px', marginBottom: '18px' }}>
            <li>Dreading practice instead of excited for it</li>
            <li>Complaining about sore joints or constant fatigue</li>
            <li>Losing interest in hockey entirely</li>
            <li>Missing friends because all free time is hockey</li>
          </ul>
          <p>...you've gone too far. Pull back. Cut hours. Shift focus to fun. Burnout is real, and it kills hockey careers.</p>

          <h2>The Bottom Line</h2>
          <p>Your kid doesn't need to practice 3 hours a day to improve. They need to practice consistently — 3–4x per week, focused on skill, with variety — and actually show up every week.</p>
          <p>Consistency > intensity. Every time.</p>
          <p>Start with your kid's age group, add one extra session per week, and build from there. Check in every month. If they're still hungry, add more. If they're burned out, dial it back.</p>
          <p>The goal is to build a player (and a person) who loves hockey. The wins will follow.</p>
        </div>

        <div className="post-footer">
          <button className="post-foot-link" onClick={() => nav('/blog')}>← All guides</button>
          <button className="post-foot-cta" onClick={() => nav('/start')}>Track practice sessions →</button>
        </div>
      </article>

      <style>{styles}</style>
    </div>
  )
}

const styles = `
.post-wrap { min-height: 100dvh; background: var(--bg); color: var(--text); font-family: var(--font-body); overflow-x: hidden; }
body:has(.post-wrap) { background: var(--bg) !important; }
.post-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; max-width: 720px; margin: 0 auto; }
.post-back { color: #8899b4; font-size: 15px; background: transparent; cursor: pointer; }
.post-back:hover { color: white; }
.post-nav-cta { background: var(--accent); color: white; padding: 10px 18px; border-radius: 10px; font-family: var(--font-display); font-size: 14px; font-weight: 700; cursor: pointer; }
.post-article { max-width: 680px; margin: 0 auto; padding: 0 20px 60px; }
.post-header { padding: 40px 0 30px; }
.post-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #60a5fa; margin-bottom: 14px; }
.post-title { font-family: var(--font-display); font-size: clamp(28px, 6vw, 42px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 8px; letter-spacing: -0.3px; }
.post-subtitle { font-size: 18px; color: #a8b8d0; margin-bottom: 12px; }
.post-date { font-size: 13px; color: #4a6080; }
.post-body { font-size: 16px; line-height: 1.7; color: #d0dce8; }
.post-body p { margin-bottom: 18px; }
.post-body h2 { font-family: var(--font-display); font-size: 24px; font-weight: 700; color: white; margin: 28px 0 16px; }
.post-body ul { list-style-type: disc; }
.post-body ul li { margin-bottom: 8px; }
.post-body strong { font-weight: 600; color: white; }
.post-footer { border-top: 1px solid #1a2035; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 40px; }
.post-foot-link { color: #4a6080; font-size: 14px; background: transparent; cursor: pointer; }
.post-foot-link:hover { color: white; }
.post-foot-cta { background: var(--accent); color: white; padding: 12px 20px; border-radius: 10px; font-family: var(--font-display); font-size: 15px; font-weight: 700; cursor: pointer; }
`
