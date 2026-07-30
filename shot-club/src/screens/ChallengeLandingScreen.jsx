import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, CANONICAL_URL } from '../lib/seo'
import { getSpec, weeklyPace, printableHref, CHALLENGE_ORDER, CHALLENGE_SPECS } from '../lib/challengeSpecs'
import { stashPendingChallenge } from '../lib/challenges'
import { signInWithGooglePlayer } from '../lib/auth'

// One template drives all four challenge pages. Copy differs per tier (below)
// so the pages don't read as duplicate content to Google, but layout, CSS,
// and the paper/digital CTAs are shared — and everything numeric (targets,
// pace, weeks) comes from lib/challengeSpecs, so a page can't quote a stat
// that disagrees with the printable or the dashboard.
//
// SEO metadata (title/description) lives in scripts/prerender.js, which also
// bakes in the Article/FAQPage/BreadcrumbList schema at build time — this
// component only needs to set the client-side <title> for direct client
// navigations (a visitor clicking from one challenge page to the next never
// does a full reload, so prerendered <head> tags don't update on their own).

const CONTENT = {
  '1k': {
    eyebrow: 'ROOKIE · 1,000 SHOTS',
    tagline: 'Your First Off-Ice Challenge',
    sub: 'The perfect starter goal — finishable in about two weeks, so a young player gets the "I did it" feeling fast.',
    about: `The 1,000 Shot Challenge is the on-ramp: a goal small enough to finish in a couple of
      weeks, big enough to actually build a habit. It's the one we'd recommend to a 7-to-11-year-old
      taking their first real run at off-ice training, or anyone who's tried a bigger challenge before
      and never finished it. Every shot type counts — wrist, snap, slap, backhand.`,
    ageNote: "Built for U7–U11, or any first-timer. Once it's done, the natural next step is the 2,500 Shot Pro Challenge.",
    tips: [
      ['Shoot every day, even 10.', 'Small daily reps beat one big weekend session — and 10 shots takes two minutes.'],
      ['Leave your stick and a few pucks by the door.', 'The easier it is to start, the more you actually will.'],
      ['Track every shot — don’t guess.', 'A real count is what makes finishing feel real.'],
      ['Mix in all four shot types.', 'Wrist, snap, slap, backhand — a complete player, not just one move.'],
      ['Celebrate 250, 500, 750, and 1,000.', 'Four real milestones in a two-week goal — that’s often enough to build the habit.'],
    ],
  },
  '2_5k': {
    eyebrow: 'PRO · 2,500 SHOTS',
    tagline: 'Step Up From Rookie',
    sub: 'A 4-week challenge for a player who finished the 1,000 and wants a real next target — or anyone who wants a solid month of work without a full summer commitment.',
    about: `The 2,500 Shot Challenge sits between a quick starter goal and the full 10,000-shot summer
      grind. Most players spread it across 4 weeks at about 625 shots a week. It's popular with players
      who've already built the daily habit on the 1,000 Shot Challenge and are ready for something
      that actually challenges their consistency.`,
    ageNote: "A good fit for U9–U13, or any player ready to build on the Rookie habit. Ready for more? The 5,000 Shot Elite Challenge is next.",
    tips: [
      ['Set a weekly, not just a total, target.', '625 a week keeps you from cramming it all into one weekend.'],
      ['Track by shot type.', 'A month is long enough to notice which shot you’re avoiding — fix it now.'],
      ['Use the checkpoint boxes as mini-goals.', 'Four quarters of 625 feels a lot more doable than one 2,500.'],
      ['Pair it with a teammate.', 'A shared challenge is a lot easier to actually finish.'],
      ['Don’t skip a day two days in a row.', 'One missed day is fine. Two in a row is where challenges die.'],
    ],
  },
  '5k': {
    eyebrow: 'ELITE · 5,000 SHOTS',
    tagline: 'A Full Summer of Work',
    sub: 'The classic off-season goal for a player serious about their shot — free printable tracker plus a live app if you want the leaderboard.',
    about: `The 5,000 Shot Challenge is a full-summer commitment: 8 weeks at about 625 shots a week,
      or roughly 90 a day if you shoot most days. It's the challenge most youth players mean when they
      say they're "doing a shot challenge" this summer — enough volume to genuinely change your shot,
      not just fill a page.`,
    ageNote: "Popular with U11–U15. Younger players often start with the 1,000 or 2,500 Shot Challenge first and work up.",
    tips: [
      ['Shoot every day, even 50.', 'Consistency beats one giant weekend session.'],
      ['Leave your pad by the door.', 'The easier it is to start, the more you’ll shoot.'],
      ['Track every shot — don’t guess.', 'Guessing kills motivation; a real count fuels it.'],
      ['Mix all four shot types.', 'A complete player isn’t just a slapshot.'],
      ['Rest when your wrist is sore.', 'High-volume challenges are where overuse strains happen.'],
    ],
  },
  '10k': {
    eyebrow: 'HALL OF FAMER · 10,000 SHOTS',
    tagline: 'The Classic Summer Challenge',
    sub: 'The original off-season benchmark — free printable tracking sheet plus a live app for real-time competition.',
    about: `The 10,000 Shot Challenge is a simple off-season goal: take 10,000 shots away from the rink
      — driveway, garage, or basement — over a summer. It became a staple of youth hockey development
      because it turns "practice more" into one concrete, countable target. Most players spread it
      across 8 weeks, about 1,250 shots a week, or roughly 180 a day if you shoot most days.`,
    ageNote: "It's popular with U13–U18 players. For U9–U11, the 5,000 Shot Elite Challenge is a better first target — clean mechanics matter more than volume.",
    tips: [
      ['Shoot every day, even 50.', 'Consistency beats one giant weekend session.'],
      ['Leave your pad by the door.', 'The easier it is to start, the more you’ll shoot.'],
      ['Track every shot — don’t guess.', 'Guessing kills motivation; a real count fuels it.'],
      ['Mix all four shot types.', 'A complete player isn’t just a slapshot.'],
      ['Rest when your wrist is sore.', 'High-volume challenges are where overuse strains happen.'],
    ],
  },
}

const WEEK_FOCUS_4 = ['Clean mechanics — weight transfer & follow-through', 'Quick release', 'Halfway 🥈 — change the angle', 'Finish 🏆 — put it all together']
const WEEK_FOCUS_8 = [
  'Clean mechanics — weight transfer & follow-through', 'Quick release', 'Change the shooting angle', 'Halfway 🥈 — snap shot power',
  'Catch-and-release', 'Backhands', 'Off-balance & in-stride shots', 'Finish 🏆 — game-speed reps',
]

export default function ChallengeLandingScreen({ challengeId }) {
  const nav = useNavigate()
  const spec = getSpec(challengeId)
  const copy = CONTENT[challengeId]
  const pace = weeklyPace(spec)
  const dailyPace = Math.round(pace / 6)
  const weekFocus = spec.weeks === 8 ? WEEK_FOCUS_8 : WEEK_FOCUS_4
  const idx = CHALLENGE_ORDER.indexOf(challengeId)
  const nextTier = idx < CHALLENGE_ORDER.length - 1 ? CHALLENGE_SPECS[CHALLENGE_ORDER[idx + 1]] : null
  const prevTier = idx > 0 ? CHALLENGE_SPECS[CHALLENGE_ORDER[idx - 1]] : null

  useEffect(() => {
    setSEO({
      title: `${spec.total.toLocaleString()} Shot Challenge — ${spec.label} Tracker, Free Printable & Online`,
      description: `Free ${spec.label} (${spec.total.toLocaleString()} shot) hockey challenge tracker. Print the sheet or track it live with leaderboards. ${copy.sub}`,
      url: `${CANONICAL_URL}${spec.landingPath}`,
    })
  }, [challengeId])

  const goPrint = () => window.open(printableHref(challengeId, { autoPrint: true }), '_blank', 'noopener')
  const goDigital = () => nav(`/start?challenge=${challengeId}&src=${challengeId}landing`)
  // Skips the multi-step club/position form entirely — straight to Google,
  // straight back to the dashboard (AuthScreen's quick-setup fallback screen
  // still asks for name/position, but in one step instead of two).
  const goDigitalFast = (e) => {
    e.stopPropagation()
    stashPendingChallenge(challengeId)
    signInWithGooglePlayer()
  }

  return (
    <div className="tenk-wrap">
      <nav className="tenk-nav">
        <button className="tenk-logo" onClick={() => nav('/')}>🏒 Hockey Shot Challenge</button>
        <button className="tenk-start" onClick={() => nav('/start')}>Start tracking →</button>
      </nav>

      {/* HERO — paper and digital are equal, side by side, right up top */}
      <section className="tenk-hero">
        <div className="tenk-eyebrow">{copy.eyebrow}</div>
        <h1 className="tenk-title">{copy.tagline}</h1>
        <p className="tenk-sub">{copy.sub}</p>

        <div className="cl-choice cl-choice--big">
          <button className="cl-choice-card cl-choice-card--paper" onClick={goPrint}>
            <div className="cl-choice-eyebrow">FREE PRINTABLE</div>
            <div className="cl-choice-title">Print the Sheet</div>
            <div className="cl-choice-body">Free printable tracker. Stick it on the fridge, color a box every practice.</div>
            <div className="cl-mock cl-mock--paper">
              <div className="cl-mock-paper-sheet">
                <div className="cl-mock-paper-head">{spec.label.toUpperCase()} · {spec.total.toLocaleString()}</div>
                <div className="cl-mock-paper-grid">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className={`cl-mock-box${i < 6 ? ' cl-mock-box--filled' : ''}`} style={i < 6 ? { background: spec.badge } : undefined} />
                  ))}
                </div>
              </div>
            </div>
            <div className="cl-choice-cta">Open printable PDF →</div>
          </button>

          <button className="cl-choice-card cl-choice-card--digital" style={{ borderColor: spec.badge }} onClick={goDigital}>
            <div className="cl-choice-eyebrow" style={{ color: spec.badge }}>LIVE APP</div>
            <div className="cl-choice-title">Track It Live</div>
            <div className="cl-choice-body">Same {spec.total.toLocaleString()}-shot goal, upgraded: live leaderboards, streaks, and ranks.</div>
            <div className="cl-mock cl-mock--digital" style={{ background: spec.tint }}>
              <div className="cl-mock-digital-label" style={{ color: spec.accentText }}>YOUR CHALLENGE</div>
              <div className="cl-mock-digital-title" style={{ color: spec.accentText }}>{spec.label} Shot Challenge</div>
              <div className="cl-mock-digital-bar">
                <div className="cl-mock-digital-bar-fill" style={{ width: '40%', background: spec.badge }} />
              </div>
              <div className="cl-mock-digital-stats" style={{ color: spec.accentText }}>
                <span>{Math.round(spec.total * 0.4).toLocaleString()} / {spec.total.toLocaleString()}</span>
                <span>40%</span>
              </div>
            </div>
            <div className="cl-choice-google" onClick={goDigitalFast} role="button" tabIndex={0}>
              <GoogleIcon />
              Sign in with Google
            </div>
          </button>
        </div>
        <div className="cl-choice-note">Not sure? Print it now — every sheet has a QR code that switches you to digital any time, and nothing you've logged is lost.</div>
      </section>

      {/* GUIDE / ARTICLE */}
      <section className="tenk-section">
        <h2>What Is the {spec.total.toLocaleString()} Shot Challenge?</h2>
        <p style={{ color: 'var(--text-soft)', fontSize: 16, lineHeight: 1.6, maxWidth: 720, margin: '0 auto 14px' }}>{copy.about}</p>
        <p style={{ color: 'var(--text-soft)', fontSize: 15, lineHeight: 1.6, maxWidth: 720, margin: '0 auto', textAlign: 'center', fontStyle: 'italic' }}>{copy.ageNote}</p>

        <h3 style={{ textAlign: 'center', marginTop: 32 }}>The {spec.weeks}-Week {spec.label} Schedule</h3>
        <div style={{ overflowX: 'auto', maxWidth: 720, margin: '10px auto 0', borderRadius: 12, border: '1px solid var(--border-dim)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480, fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--ice)' }}>
                <th style={{ textAlign: 'left', padding: '10px 14px' }}>Week</th>
                <th style={{ textAlign: 'left', padding: '10px 14px' }}>Shots this week</th>
                <th style={{ textAlign: 'left', padding: '10px 14px' }}>Running total</th>
                <th style={{ textAlign: 'left', padding: '10px 14px' }}>Focus</th>
              </tr>
            </thead>
            <tbody>
              {weekFocus.map((focus, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--border-dim)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#fff' }}>Week {i + 1}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-soft)' }}>{pace.toLocaleString()}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 800, color: 'var(--ice)' }}>{Math.min(spec.total, (i + 1) * pace).toLocaleString()}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-soft)' }}>{focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ textAlign: 'center', marginTop: 32 }}>How Many Shots a Day?</h3>
        <p style={{ color: 'var(--text-soft)', fontSize: 16, lineHeight: 1.6, maxWidth: 720, margin: '0 auto 14px', textAlign: 'center' }}>
          About {dailyPace} a day across 6 days — or {pace.toLocaleString()} a week, however you split it.
          {nextTier && <> Finished this one? Step up to the <a href={nextTier.landingPath} style={{ color: 'var(--ice)', fontWeight: 700 }}>{nextTier.total.toLocaleString()} Shot {nextTier.label} Challenge</a>.</>}
          {prevTier && <> New to this? The <a href={prevTier.landingPath} style={{ color: 'var(--ice)', fontWeight: 700 }}>{prevTier.total.toLocaleString()} Shot {prevTier.label} Challenge</a> is a gentler first goal.</>}
        </p>

        <h3 style={{ textAlign: 'center', marginTop: 32 }}>5 Tips to Actually Finish</h3>
        <ul style={{ maxWidth: 720, margin: '10px auto 0', color: 'var(--text-soft)', fontSize: 15, lineHeight: 1.7, paddingLeft: 22 }}>
          {copy.tips.map(([bold, rest], i) => (
            <li key={i}><strong style={{ color: '#fff' }}>{bold}</strong> {rest}</li>
          ))}
        </ul>
      </section>

      {/* WHY DIGITAL */}
      <section className="tenk-section">
        <h2>Why Track It Live Instead of Just Paper</h2>
        <div className="tenk-grid">
          <div className="tenk-card"><div className="tenk-card-icon">⚡</div><h3>Instant Updates</h3><p>Log shots in 5 seconds. Leaderboard updates live. No manually tallying marks.</p></div>
          <div className="tenk-card"><div className="tenk-card-icon">🏆</div><h3>Real Competition</h3><p>See your rank instantly. Compete with your team. The scoreboard effect actually works.</p></div>
          <div className="tenk-card"><div className="tenk-card-icon">📊</div><h3>See Your Progress</h3><p>Streaks, shots by type, weekly breakdowns — a paper sheet can't show this.</p></div>
          <div className="tenk-card"><div className="tenk-card-icon">📱</div><h3>Works Everywhere</h3><p>Phone, tablet, no app to download. Works on any device, instantly.</p></div>
          <div className="tenk-card"><div className="tenk-card-icon">🔗</div><h3>Share Your Progress</h3><p>Send your leaderboard link to parents and coaches. Everyone stays updated.</p></div>
          <div className="tenk-card"><div className="tenk-card-icon">🎯</div><h3>Milestone Celebrations</h3><p>Hit a checkpoint? Get a real celebration. Kids actually stay motivated.</p></div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="tenk-section tenk-section--how">
        <h2>How It Works (2 Minutes to Set Up)</h2>
        <div className="tenk-steps">
          <div className="tenk-step"><div className="tenk-step-num">1</div><h3>Print or Sign In</h3><p>Grab the free sheet, or create your free account. No credit card, ever.</p></div>
          <div className="tenk-step"><div className="tenk-step-num">2</div><h3>Log Shots After Practice</h3><p>Color a box on paper, or tap the app — takes seconds either way.</p></div>
          <div className="tenk-step"><div className="tenk-step-num">3</div><h3>Scan to Go Digital Anytime</h3><p>Every sheet has a QR code straight into this exact challenge — no starting over.</p></div>
          <div className="tenk-step"><div className="tenk-step-num">4</div><h3>Hit {spec.total.toLocaleString()}</h3><p>Celebrate. Then pick your next challenge.</p></div>
        </div>
      </section>

      {/* FOR ASSOCIATIONS */}
      <section className="tenk-section tenk-section--assoc">
        <h2>Running This Challenge for Your Association?</h2>
        <div className="tenk-assoc-content">
          <p className="tenk-assoc-sub">
            Hundreds of associations run shot challenges every summer. Most use paper sheets or outdated tools. We've built a better way — free for you, better experience for your families.
          </p>
          <div className="tenk-assoc-offer">
            <h3>Free Association Leaderboards</h3>
            <p>We set up a branded leaderboard for your association. Your families sign up, log shots, compete. No cost. No ads. You manage everything.</p>
            <button className="tenk-btn tenk-btn--secondary" onClick={() => nav('/association-partnership')}>Learn About Association Partnerships →</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tenk-section">
        <h2>FAQ</h2>
        <div className="tenk-faq">
          <details className="tenk-faq-item"><summary>Can we really use this for free?</summary><p>Yes. Hockey Shot Challenge is free for players, teams, and associations. Forever. No hidden tiers.</p></details>
          <details className="tenk-faq-item"><summary>Do kids need an app?</summary><p>No. The printable works with just a pen. The app works in any web browser — no app to download.</p></details>
          <details className="tenk-faq-item"><summary>What if we prefer paper?</summary><p>Print the free sheet above. Scan the QR code on it anytime you want live leaderboards instead — nothing you've logged is lost.</p></details>
          <details className="tenk-faq-item"><summary>How long does the {spec.total.toLocaleString()} shot challenge take?</summary><p>Most players finish over {spec.weeks} weeks at about {pace.toLocaleString()} shots a week (~{dailyPace} a day). Shoot more days and you'll finish sooner.</p></details>
          <details className="tenk-faq-item"><summary>What age is the {spec.total.toLocaleString()} shot challenge for?</summary><p>{copy.ageNote}</p></details>
          <details className="tenk-faq-item"><summary>Can parents see the leaderboard?</summary><p>Yes. Share the link with anyone. Coaches, parents, players — everyone sees the real-time standings.</p></details>
        </div>
      </section>

      {/* CTA */}
      <section className="tenk-section tenk-section--final">
        <h2>Start Your {spec.label} Challenge Today</h2>
        <p className="tenk-final-sub">Free. Takes 2 minutes to set up. No credit card required.</p>
        <div className="tenk-final-btns">
          <button className="tenk-btn tenk-btn--primary" onClick={goDigital}>Track It Live →</button>
          <button className="tenk-btn tenk-btn--outline" onClick={goPrint}>Print the Sheet Instead</button>
        </div>
      </section>

      <footer className="tenk-footer">
        <p>Questions? <a href="mailto:samuelmenard@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Email us</a></p>
        <p style={{ fontSize: '12px', color: 'var(--text-mute)', marginTop: '8px' }}>Hockey Shot Challenge — free {spec.total.toLocaleString()} shot challenge tracker for players and associations</p>
      </footer>

      <style>{styles}</style>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 18 18" style={{ flexShrink: 0 }}>
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
      <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

const styles = `
.tenk-wrap { min-height: 100dvh; background: var(--bg); color: var(--text); font-family: var(--font-body); }
body:has(.tenk-wrap) { background: var(--bg) !important; }

.tenk-nav { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; max-width: 1200px; margin: 0 auto; }
.tenk-logo { font-size: 18px; font-weight: 700; background: transparent; cursor: pointer; color: white; }
.tenk-start { background: var(--accent); color: white; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; }

.tenk-hero { max-width: 1000px; margin: 0 auto; padding: 60px 20px 40px; text-align: center; }
.tenk-eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: var(--accent); margin-bottom: 16px; }
.tenk-title { font-family: var(--font-display); font-size: clamp(32px, 8vw, 56px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 16px; }
.tenk-sub { font-size: 18px; color: var(--text-soft); margin-bottom: 32px; max-width: 640px; margin-left: auto; margin-right: auto; }

.cl-choice { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; max-width: 620px; margin: 0 auto; }
.cl-choice--big { max-width: 760px; gap: 22px; }
.cl-choice-card { border: 2px solid var(--border-dim); border-radius: 14px; padding: 22px; cursor: pointer; text-align: left;
  background: rgba(255,255,255,0.02); transition: transform 0.2s, box-shadow 0.2s; }
.cl-choice--big .cl-choice-card { padding: 26px; border-radius: 18px; }
.cl-choice-card:hover { transform: translateY(-3px); }
.cl-choice-card--digital:hover { box-shadow: 0 10px 24px rgba(0,0,0,0.25); }
.cl-choice-icon { font-size: 28px; margin-bottom: 8px; }
.cl-choice-eyebrow { font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: var(--text-mute); margin-bottom: 8px; }
.cl-choice-title { font-family: var(--font-display); font-weight: 700; font-size: 18px; color: white; margin-bottom: 6px; }
.cl-choice--big .cl-choice-title { font-size: 22px; }
.cl-choice-body { font-size: 13px; color: var(--text-soft); line-height: 1.5; }
.cl-choice-cta { font-size: 13px; font-weight: 700; color: var(--text-soft); margin-top: 16px; }
.cl-choice-google { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: var(--text-soft);
  margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-dim); cursor: pointer; }
.cl-choice-note { font-size: 13px; color: var(--text-mute); max-width: 480px; margin: 18px auto 0; }

/* Mini "what it looks like" previews inside each choice card */
.cl-mock { margin-top: 16px; border-radius: 10px; overflow: hidden; }
.cl-mock-paper-sheet { background: #f4f1ea; border-radius: 10px; padding: 14px; }
.cl-mock-paper-head { font-family: var(--font-display); font-size: 10px; font-weight: 800; letter-spacing: 1px; color: #45403a; margin-bottom: 8px; }
.cl-mock-paper-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
.cl-mock-box { aspect-ratio: 1; border-radius: 3px; border: 1.5px solid #c9c2b4; background: transparent; }
.cl-mock-box--filled { border-color: transparent; }
.cl-mock-digital { border-radius: 10px; padding: 14px; }
.cl-mock-digital-label { font-size: 10px; font-weight: 800; letter-spacing: 1.5px; opacity: 0.7; }
.cl-mock-digital-title { font-family: var(--font-display); font-size: 15px; font-weight: 800; margin-top: 2px; }
.cl-mock-digital-bar { height: 8px; border-radius: 999px; background: rgba(0,0,0,0.12); margin-top: 10px; overflow: hidden; }
.cl-mock-digital-bar-fill { height: 100%; border-radius: 999px; }
.cl-mock-digital-stats { display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; margin-top: 6px; }

.tenk-section { max-width: 1000px; margin: 0 auto; padding: 60px 20px; }
.tenk-section h2 { font-family: var(--font-display); font-size: clamp(28px, 6vw, 42px); font-weight: 800; color: white; margin-bottom: 40px; text-align: center; }

.tenk-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
.tenk-card { background: #0f1624; border: 1px solid #1a2847; border-radius: 12px; padding: 24px; }
.tenk-card-icon { font-size: 40px; margin-bottom: 12px; }
.tenk-card h3 { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: white; margin-bottom: 8px; }
.tenk-card p { font-size: 14px; color: var(--text-soft); line-height: 1.5; }

.tenk-section--how { background: rgba(41, 121, 255, 0.05); }
.tenk-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.tenk-step { text-align: center; }
.tenk-step-num { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: var(--accent); color: white; border-radius: 50%; font-weight: 800; font-size: 20px; margin-bottom: 16px; }
.tenk-step h3 { font-family: var(--font-display); font-weight: 700; margin-bottom: 8px; }
.tenk-step p { font-size: 14px; color: var(--text-soft); }

.tenk-section--assoc { background: #0f1624; border-radius: 16px; }
.tenk-assoc-sub { font-size: 16px; color: var(--text-soft); margin-bottom: 24px; line-height: 1.6; }
.tenk-assoc-offer { background: rgba(41, 121, 255, 0.1); border: 1px solid rgba(41, 121, 255, 0.3); border-radius: 12px; padding: 24px; margin-top: 24px; }
.tenk-assoc-offer h3 { font-family: var(--font-display); font-weight: 700; margin-bottom: 8px; }
.tenk-assoc-offer p { margin-bottom: 16px; }

.tenk-faq { display: flex; flex-direction: column; gap: 12px; }
.tenk-faq-item { background: #0f1624; border: 1px solid #1a2847; border-radius: 10px; padding: 16px; cursor: pointer; }
.tenk-faq-item summary { font-weight: 700; color: white; outline: none; }
.tenk-faq-item p { margin-top: 12px; color: var(--text-soft); font-size: 14px; line-height: 1.6; }

.tenk-section--final { text-align: center; background: rgba(61, 214, 140, 0.05); border-radius: 16px; }
.tenk-final-sub { font-size: 16px; color: var(--text-soft); margin-bottom: 24px; }
.tenk-final-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.tenk-btn { border: none; border-radius: 10px; padding: 14px 28px; font-weight: 700; font-family: var(--font-display); font-size: 16px; cursor: pointer; transition: all 0.2s; }
.tenk-btn--primary { background: var(--accent); color: white; }
.tenk-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 8px 16px rgba(41, 121, 255, 0.3); }
.tenk-btn--secondary { background: transparent; color: white; border: 2px solid var(--accent); }
.tenk-btn--secondary:hover { background: rgba(41, 121, 255, 0.1); }
.tenk-btn--outline { background: transparent; color: var(--accent); border: 2px solid var(--accent); }

.tenk-footer { border-top: 1px solid #1a2035; padding: 40px 20px; text-align: center; max-width: 1200px; margin: 0 auto; font-size: 14px; color: var(--text-soft); }
`
