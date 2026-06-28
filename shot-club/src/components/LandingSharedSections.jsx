export function AppMockupSection() {
  return (
    <section className="ls-mockup-wrap">
      <div className="ls-mockup-inner">
        <div className="ls-eyebrow">INSIDE THE APP</div>
        <h2 className="ls-section-title">Built to be opened, tapped, and closed in 10 seconds.</h2>
        <p className="ls-section-sub">No fluff. No social feed. Just your numbers, your team, and who you're chasing today.</p>

        <div className="ls-phone">
          <div className="ls-phone-header">
            <div className="ls-avatar">C</div>
            <div className="ls-player-info">
              <div className="ls-player-name">Connor</div>
              <div className="ls-player-meta">Prospect II · 1,240 shots</div>
            </div>
            <div className="ls-streak-badge">🔥 12</div>
          </div>

          <div className="ls-shot-grid">
            <div className="ls-shot-cell">
              <div className="ls-shot-label">WRIST</div>
              <div className="ls-shot-num">85</div>
              <div className="ls-shot-sub">TODAY</div>
            </div>
            <div className="ls-shot-cell">
              <div className="ls-shot-label">SNAP</div>
              <div className="ls-shot-num">42</div>
              <div className="ls-shot-sub">TODAY</div>
            </div>
            <div className="ls-shot-cell">
              <div className="ls-shot-label">SLAP</div>
              <div className="ls-shot-num">23</div>
              <div className="ls-shot-sub">TODAY</div>
            </div>
            <div className="ls-shot-cell">
              <div className="ls-shot-label">BACKHAND</div>
              <div className="ls-shot-num">18</div>
              <div className="ls-shot-sub">TODAY</div>
            </div>
          </div>

          <div className="ls-stickhandling-section">
            <div className="ls-stickhandling-label">STICKHANDLING</div>
            <div className="ls-shot-grid ls-shot-grid--2">
              <div className="ls-shot-cell">
                <div className="ls-shot-label">REPS</div>
                <div className="ls-shot-num ls-shot-num--orange">240</div>
                <div className="ls-shot-sub">TODAY</div>
              </div>
              <div className="ls-shot-cell">
                <div className="ls-shot-label">MINUTES</div>
                <div className="ls-shot-num ls-shot-num--orange">8</div>
                <div className="ls-shot-sub">TODAY</div>
              </div>
            </div>
          </div>

          <div className="ls-chasing">
            <div className="ls-chasing-left">
              <div className="ls-chasing-label">CHASING TODAY</div>
              <div className="ls-chasing-name">Liam K. · 191 today</div>
            </div>
            <div className="ls-chasing-delta">−23</div>
          </div>
        </div>
      </div>
      <style>{mockupStyles}</style>
    </section>
  )
}

export function RoutineSection() {
  const summerDays = [
    { day: 'MON', task: '100 wrist shots' },
    { day: 'TUE', task: '10 min stickhandling' },
    { day: 'WED', task: '75 snap + 25 backhand' },
    { day: 'THU', task: '10 min stickhandling' },
    { day: 'FRI', task: '100 mixed shots' },
    { day: 'SAT', task: 'Rest' },
    { day: 'SUN', task: 'Rest' },
  ]
  const inSeasonDays = [
    { day: 'MON', task: '50 wrist shots' },
    { day: 'TUE', task: 'Rest / game' },
    { day: 'WED', task: '5 min stickhandling' },
    { day: 'THU', task: 'Practice day' },
    { day: 'FRI', task: '50 mixed shots' },
    { day: 'SAT', task: 'Game day' },
    { day: 'SUN', task: 'Rest' },
  ]

  return (
    <section className="ls-routine-wrap">
      <div className="ls-routine-inner">
        <div className="ls-eyebrow">FOLLOW A ROUTINE</div>
        <h2 className="ls-section-title">A simple plan for summer and the season.</h2>
        <p className="ls-section-sub">Big gains happen in the off-season. Then you keep it going through the year. Pick a routine, log your reps, watch yourself climb.</p>

        <div className="ls-routine-grid">
          <div className="ls-routine-card ls-routine-card--summer">
            <div className="ls-routine-card-header">
              <span className="ls-routine-dot ls-routine-dot--yellow" />
              <span className="ls-routine-tag">SUMMER · HEAVY</span>
            </div>
            <div className="ls-routine-title">5 days a week.</div>
            <div className="ls-routine-sub">Build the engine. This is when you get fast.</div>
            <div className="ls-day-list">
              {summerDays.map(({ day, task }) => (
                <div key={day} className="ls-day-row">
                  <span className="ls-day-label">{day}</span>
                  <span className="ls-day-task">{task}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ls-routine-card ls-routine-card--season">
            <div className="ls-routine-card-header">
              <span className="ls-routine-dot ls-routine-dot--blue" />
              <span className="ls-routine-tag">IN-SEASON · LIGHTER</span>
            </div>
            <div className="ls-routine-title">3 days a week.</div>
            <div className="ls-routine-sub">Keep what you built. Stay sharp around games.</div>
            <div className="ls-day-list">
              {inSeasonDays.map(({ day, task }) => (
                <div key={day} className="ls-day-row">
                  <span className="ls-day-label">{day}</span>
                  <span className="ls-day-task">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="ls-routine-footnote">These are just starting points. You can do more, do less, or build your own. The app tracks whatever you log.</p>
      </div>
      <style>{routineStyles}</style>
    </section>
  )
}

const mockupStyles = `
.ls-mockup-wrap {
  background: #060b18;
  border-top: 1px solid #1a2035;
  border-bottom: 1px solid #1a2035;
  padding: 60px 20px;
}
.ls-mockup-inner {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}
.ls-eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #60a5fa;
  margin-bottom: 14px;
}
.ls-section-title {
  font-family: var(--font-display);
  font-size: clamp(26px, 5vw, 38px);
  font-weight: 800;
  color: white;
  line-height: 1.1;
  letter-spacing: 0.2px;
  margin-bottom: 14px;
}
.ls-section-sub {
  font-size: 16px;
  color: #8899b4;
  line-height: 1.55;
  margin-bottom: 36px;
}
.ls-phone {
  background: #0f1928;
  border: 1px solid #1e2f4a;
  border-radius: 24px;
  padding: 20px 16px;
  max-width: 340px;
  margin: 0 auto;
  box-shadow: 0 0 60px rgba(41,121,255,0.08);
}
.ls-phone-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}
.ls-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2979ff;
  color: white;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.ls-player-info { flex: 1; text-align: left; }
.ls-player-name {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 800;
  color: white;
}
.ls-player-meta {
  font-size: 12px;
  color: #6b7fa8;
}
.ls-streak-badge {
  background: rgba(234,88,12,0.2);
  border: 1px solid rgba(234,88,12,0.4);
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 13px;
  font-weight: 700;
  color: #fb923c;
}
.ls-shot-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 8px;
}
.ls-shot-grid--2 {
  grid-template-columns: 1fr 1fr;
  margin-bottom: 0;
}
.ls-shot-cell {
  background: #0a1220;
  border-radius: 12px;
  padding: 12px 14px;
  text-align: left;
}
.ls-shot-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #4a6080;
  margin-bottom: 4px;
}
.ls-shot-num {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 800;
  color: #60a5fa;
  line-height: 1;
  margin-bottom: 2px;
}
.ls-shot-num--orange { color: #fb923c; }
.ls-shot-sub {
  font-size: 10px;
  color: #4a6080;
  letter-spacing: 1px;
}
.ls-stickhandling-section {
  margin-top: 8px;
}
.ls-stickhandling-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #4a6080;
  margin-bottom: 8px;
  text-align: left;
  padding: 0 2px;
}
.ls-chasing {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #0a1220;
  border: 1px solid #f97316;
  border-left: 3px solid #f97316;
  border-radius: 12px;
  padding: 12px 14px;
  margin-top: 8px;
}
.ls-chasing-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #4a6080;
  margin-bottom: 3px;
}
.ls-chasing-name {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 700;
  color: white;
}
.ls-chasing-delta {
  background: rgba(234,88,12,0.25);
  border-radius: 20px;
  padding: 6px 12px;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 800;
  color: #fb923c;
}
`

const routineStyles = `
.ls-routine-wrap {
  padding: 60px 20px;
  border-top: 1px solid #1a2035;
}
.ls-routine-inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}
.ls-routine-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 36px 0 20px;
  text-align: left;
}
@media (max-width: 540px) {
  .ls-routine-grid { grid-template-columns: 1fr; }
}
.ls-routine-card {
  border-radius: 16px;
  padding: 22px 20px;
  background: #0a111e;
}
.ls-routine-card--summer { border-left: 3px solid #eab308; border: 1px solid #2a2010; border-left: 3px solid #eab308; }
.ls-routine-card--season { border-left: 3px solid #2979ff; border: 1px solid #101a2a; border-left: 3px solid #2979ff; }
.ls-routine-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.ls-routine-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
.ls-routine-dot--yellow { background: #eab308; }
.ls-routine-dot--blue { background: #2979ff; }
.ls-routine-tag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #6b7fa8;
}
.ls-routine-title {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  color: white;
  margin-bottom: 6px;
}
.ls-routine-sub {
  font-size: 13px;
  color: #6b7fa8;
  margin-bottom: 16px;
  line-height: 1.45;
}
.ls-day-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ls-day-row {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #060b18;
  border-radius: 8px;
  padding: 8px 12px;
}
.ls-day-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #2979ff;
  width: 30px;
  flex-shrink: 0;
}
.ls-day-task {
  font-size: 13px;
  color: #a8b8d0;
}
.ls-routine-footnote {
  font-size: 13px;
  color: #4a6080;
  text-align: center;
  line-height: 1.5;
}
`
