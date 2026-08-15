import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setSEO, CANONICAL_URL } from '../lib/seo'
import { getSpec, weeklyPace, printableHref, CHALLENGE_ORDER, CHALLENGE_SPECS } from '../lib/challengeSpecs'
import { stashPendingChallenge } from '../lib/challenges'
import { signInWithGooglePlayer } from '../lib/auth'
import { usePostHog } from '../hooks/usePostHog'
import { useAuth } from '../hooks/useAuth'
import SEOFooter from '../components/SEOFooter'

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
  const { player } = useAuth()
  // A signed-out visitor who's played before still has activePlayerId in
  // localStorage (set on first sign-in, cleared on sign-out) — that's enough
  // to route them to "Sign in" instead of the full signup flow, without
  // waiting on a network round-trip to know they're a returning player.
  const isReturning = typeof localStorage !== 'undefined' && !!localStorage.getItem('activePlayerId')
  const { trackTrackerDownloaded, trackTrackLiveClicked, trackChallengePicked } = usePostHog()
  const spec = getSpec(challengeId)
  const copy = CONTENT[challengeId]
  const pace = weeklyPace(spec)
  const dailyPace = Math.round(pace / 6)
  const weekFocus = spec.weeks === 8 ? WEEK_FOCUS_8 : WEEK_FOCUS_4
  const idx = CHALLENGE_ORDER.indexOf(challengeId)
  const nextTier = idx < CHALLENGE_ORDER.length - 1 ? CHALLENGE_SPECS[CHALLENGE_ORDER[idx + 1]] : null
  const prevTier = idx > 0 ? CHALLENGE_SPECS[CHALLENGE_ORDER[idx - 1]] : null

  useEffect(() => {
    trackChallengePicked(challengeId, spec.label)
    setSEO({
      title: `${spec.total.toLocaleString()} Shot Challenge — ${spec.label} Tracker, Free Printable & Online`,
      description: `Free ${spec.label} (${spec.total.toLocaleString()} shot) hockey challenge tracker. Print the sheet or track it live with leaderboards. ${copy.sub}`,
      url: `${CANONICAL_URL}${spec.landingPath}`,
    })
  }, [challengeId])

  const goPrint = () => {
    trackTrackerDownloaded(challengeId)
    window.open(printableHref(challengeId, { autoPrint: true }), '_blank', 'noopener')
  }
  const goDigital = () => {
    trackTrackLiveClicked(challengeId)
    if (player) { nav('/home'); return }
    if (isReturning) { stashPendingChallenge(challengeId); nav('/start?mode=signin'); return }
    nav(`/start?challenge=${challengeId}&src=${challengeId}landing`)
  }
  // Skips the multi-step club/position form entirely — straight to Google,
  // straight back to the dashboard (AuthScreen's quick-setup fallback screen
  // still asks for name/position, but in one step instead of two).
  const goDigitalFast = (e) => {
    e.stopPropagation()
    trackTrackLiveClicked(challengeId)
    if (player) { nav('/home'); return }
    stashPendingChallenge(challengeId)
    signInWithGooglePlayer()
  }

  return (
    <div className="tenk-wrap">
      <nav className="tenk-nav">
        <button className="tenk-logo" onClick={() => nav('/')}>🏒 Hockey Shot Challenge</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="tenk-nav-link" onClick={() => nav('/find-club')}>Find your club</button>
          {player ? (
            <button className="tenk-start" onClick={() => nav('/home')}>My Dashboard →</button>
          ) : isReturning ? (
            <button className="tenk-start" onClick={() => { stashPendingChallenge(challengeId); nav('/start?mode=signin') }}>Sign in →</button>
          ) : (
            <button className="tenk-start" onClick={() => nav(`/start?challenge=${challengeId}&src=${challengeId}landing`)}>Start tracking →</button>
          )}
        </div>
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
            <div className="cl-mock cl-mock--digital">
              <div className="cl-mock-digital-label" style={{ color: spec.badge }}>YOUR CHALLENGE</div>
              <div className="cl-mock-digital-title">{spec.label} Shot Challenge</div>
              <div className="cl-mock-digital-bar">
                <div className="cl-mock-digital-bar-fill" style={{ width: '40%', background: spec.badge }} />
              </div>
              <div className="cl-mock-digital-stats">
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

      {/* DOWNLOADABLE PDF */}
      <section className="tenk-section" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h2>Free Downloadable {spec.label} Tracker PDF</h2>
        <p style={{ color: 'var(--text-soft)', fontSize: 16, lineHeight: 1.6, maxWidth: 720, margin: '0 auto 24px', textAlign: 'center' }}>
          Print-ready PDF with pure black/white design that prints perfectly on any printer. Track offline, scan the QR code to go digital anytime.
        </p>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
          <button className="tenk-btn tenk-btn--primary" onClick={goPrint} style={{ gridColumn: '1 / -1' }}>
            Download PDF Tracker
          </button>
          <div style={{ gridColumn: '1 / -1', fontSize: 13, color: 'var(--text-soft)', textAlign: 'center' }}>
            ✓ Free · ✓ Printable immediately · ✓ QR code to switch to live app anytime
          </div>
        </div>
      </section>

      {/* CHALLENGE COMPARISON */}
      {CHALLENGE_ORDER.length > 1 && (
        <section className="tenk-section">
          <h2>All {CHALLENGE_ORDER.length} Hockey Shot Challenges — Pick Your Level</h2>
          <p style={{ color: 'var(--text-soft)', fontSize: 16, lineHeight: 1.6, maxWidth: 720, margin: '0 auto 24px', textAlign: 'center' }}>
            Each challenge is designed to build skills progressively. Start wherever fits your current level — you can always move up.
          </p>
          <div style={{ overflowX: 'auto', maxWidth: 900, margin: '0 auto', borderRadius: 12, border: '1px solid var(--border-dim)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600, fontSize: 14 }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--ice)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px' }}>Challenge</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px' }}>Total Shots</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px' }}>Weekly Pace</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px' }}>Weeks</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px' }}>Age Guide</th>
                </tr>
              </thead>
              <tbody>
                {CHALLENGE_ORDER.map((cid) => {
                  const s = CHALLENGE_SPECS[cid]
                  const wp = weeklyPace(s)
                  const ageGuide = cid === '1k' ? 'U7–U11' : cid === '2_5k' ? 'U9–U13' : cid === '5k' ? 'U11–U15' : 'U13–U18'
                  const isActive = cid === challengeId
                  return (
                    <tr key={cid} style={{ borderTop: '1px solid var(--border-dim)', background: isActive ? 'rgba(255,255,255,0.06)' : undefined }}>
                      <td style={{ padding: '12px 16px', fontWeight: isActive ? 800 : 700, color: isActive ? 'var(--ice)' : '#fff' }}>
                        <a href={s.landingPath} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {s.label} · {s.total.toLocaleString()} shots{isActive ? ' ← You are here' : ''}
                        </a>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: 'var(--text-soft)' }}>{s.total.toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: 'var(--text-soft)' }}>{wp.toLocaleString()}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: 'var(--text-soft)' }}>{s.weeks}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'center', color: 'var(--text-soft)' }}>{ageGuide}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

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
            <p>We set up a branded leaderboard for your association. Your families sign up, track shots, compete. No cost. No ads. You manage everything.</p>
            <button className="tenk-btn tenk-btn--secondary" onClick={() => nav('/association-partnership')}>Learn About Association Partnerships →</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tenk-section">
        <h2>FAQ — {spec.total.toLocaleString()} Shot Challenge</h2>
        <div className="tenk-faq">
          <details className="tenk-faq-item">
            <summary>How long does the {spec.total.toLocaleString()} shot challenge take?</summary>
            <p>Most youth hockey players finish the {spec.label} Challenge over approximately {spec.weeks} weeks. The typical pace is {pace.toLocaleString()} shots per week, or about {dailyPace} shots per day across 5–6 practice days. Players who shoot more frequently can finish sooner; those who shoot fewer days will take longer. The timeline is flexible based on your schedule and training intensity.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>What age group is the {spec.total.toLocaleString()} shot challenge designed for?</summary>
            <p>{copy.ageNote} Each tier builds on the previous challenge — younger players typically start with the Rookie 1,000 Shot Challenge or Pro 2,500 Shot Challenge and progress upward as they build their off-ice training habit and capacity.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>Is Hockey Shot Challenge really free?</summary>
            <p>Yes, completely free. Hockey Shot Challenge is free for individual players, parents managing multiple kids, coaches building team leaderboards, and entire minor hockey associations. There are no subscription tiers, no hidden costs, and no in-app purchases. Forever free.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>Can I print the {spec.label} tracker sheet for free?</summary>
            <p>Yes. Download the free PDF printable tracker above — it's optimized for B&W and color printers. The sheet includes a QR code that lets you scan and switch to the live leaderboard app anytime, with all your logged shots preserved.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>What shot types count toward the challenge?</summary>
            <p>All four shot types count equally: wrist shots, snap shots, slap shots, and backhand shots. The Hockey Shot Challenge encourages mixing all four to develop a complete, versatile shot. Tracking by shot type helps players identify which shots they practice less and where they can improve.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>Do kids need an app to track shots?</summary>
            <p>No. You can print the free PDF sheet and track manually with a pen or marker — no technology required. Alternatively, the web app works on any device (phone, tablet, laptop) without downloading anything. Print or digital — it's your choice.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>Can parents see their child's progress?</summary>
            <p>Yes. Parents can create an account, add their children as profiles, and view real-time leaderboards and shot statistics. Coaches and other family members can also view shared leaderboards via link if the parent grants permission.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>Can I switch from paper to the live app without losing progress?</summary>
            <p>Yes. Every free printable sheet has a QR code that links directly to the digital challenge. Scan the QR code on your paper sheet anytime, sign in, and track your total shots — nothing is lost in the transition.</p>
          </details>
          <details className="tenk-faq-item">
            <summary>Is the {spec.total.toLocaleString()} shot challenge part of Hockey Canada's training framework?</summary>
            <p>Hockey Shot Challenge aligns with Hockey Canada's Long-Term Player Development (LTPD) model, which emphasizes consistent off-ice skill development for youth players. The shot volume and weekly pacing are designed to build capacity progressively and safely without overuse injury.</p>
          </details>
        </div>
      </section>

      {/* BLOG POST LINK */}
      <section className="tenk-section" style={{ background: 'rgba(96,165,250,0.05)', borderTop: '1px solid rgba(96,165,250,0.1)', borderBottom: '1px solid rgba(96,165,250,0.1)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Training Resources & Guides</h2>

          <div style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
            <button
              onClick={() => {
                const blogMap = { '1k': 'rookie-challenge', '2_5k': 'pro-challenge', '5k': 'elite-challenge', '10k': 'hall-of-famer-challenge' }
                nav(`/blog/${blogMap[challengeId]}`)
              }}
              style={{
                display: 'block',
                background: 'transparent',
                border: '1px solid var(--accent)',
                color: 'var(--accent)',
                padding: '12px 16px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.target.style.background = 'rgba(96,165,250,0.1)'; e.target.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent)'; }}
            >
              {"📖 What Happens During the " + spec.label + " Challenge →"}
            </button>

            <button
              onClick={() => nav('/blog/7-off-ice-drills')}
              style={{
                display: 'block',
                background: 'transparent',
                border: '1px solid rgba(96,165,250,0.5)',
                color: 'var(--text-soft)',
                padding: '12px 16px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'white'; }}
              onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(96,165,250,0.5)'; e.target.style.color = 'var(--text-soft)'; }}
            >
              {"🎯 7 Off-Ice Drills That Actually Work →"}
            </button>

            <button
              onClick={() => nav('/blog/5-week-progression')}
              style={{
                display: 'block',
                background: 'transparent',
                border: '1px solid rgba(96,165,250,0.5)',
                color: 'var(--text-soft)',
                padding: '12px 16px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'white'; }}
              onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(96,165,250,0.5)'; e.target.style.color = 'var(--text-soft)'; }}
            >
              {"📈 The Week-By-Week Progression →"}
            </button>

            <button
              onClick={() => nav('/blog/burnout-prevention')}
              style={{
                display: 'block',
                background: 'transparent',
                border: '1px solid rgba(96,165,250,0.5)',
                color: 'var(--text-soft)',
                padding: '12px 16px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'white'; }}
              onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(96,165,250,0.5)'; e.target.style.color = 'var(--text-soft)'; }}
            >
              {"⚠️ How to Avoid Burnout →"}
            </button>

            <button
              onClick={() => nav('/blog/80-20-finishers')}
              style={{
                display: 'block',
                background: 'transparent',
                border: '1px solid rgba(96,165,250,0.5)',
                color: 'var(--text-soft)',
                padding: '12px 16px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'white'; }}
              onMouseLeave={(e) => { e.target.style.borderColor = 'rgba(96,165,250,0.5)'; e.target.style.color = 'var(--text-soft)'; }}
            >
              {"🏆 Why 20% Finish (And How to Be One) →"}
            </button>
          </div>
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
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: 32, borderBottom: '1px solid var(--border-dim)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20, marginBottom: 32 }}>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 12 }}>Learn</h4>
              <button onClick={() => nav('/blog')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', marginBottom: 8 }}>Guides & Tips</button>
              <button onClick={() => nav('/challenges')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>All Challenges</button>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 12 }}>For Players</h4>
              <button onClick={() => nav('/player')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', marginBottom: 8 }}>Player Guide</button>
              <button onClick={() => nav('/find-club')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', marginBottom: 8 }}>Find Your Club</button>
              <button onClick={() => nav('/start')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>Get Started</button>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 12 }}>Help</h4>
              <button onClick={() => nav('/about')} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', marginBottom: 8 }}>About</button>
              <a href="mailto:samuelmenard@gmail.com" style={{ display: 'block', background: 'none', border: 'none', color: 'var(--ice)', fontSize: 14, cursor: 'pointer', textAlign: 'left', textDecoration: 'none' }}>Contact</a>
            </div>
          </div>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-mute)', marginTop: '24px' }}>Hockey Shot Challenge — free {spec.total.toLocaleString()} shot challenge tracker for players and associations</p>
      </footer>

      <SEOFooter />

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
.tenk-nav-link { background: transparent; color: var(--text-soft); font-size: 14px; cursor: pointer; border: none; }
.tenk-nav-link:hover { color: var(--ice); }
@media (max-width: 560px) { .tenk-nav-link { display: none; } }
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
.cl-mock-digital { border-radius: 10px; padding: 14px; background: var(--surface-raised); border: 0.5px solid var(--border-dim); }
.cl-mock-digital-label { font-size: 10px; font-weight: 800; letter-spacing: 1.5px; }
.cl-mock-digital-title { font-family: var(--font-display); font-size: 15px; font-weight: 800; margin-top: 2px; color: white; }
.cl-mock-digital-bar { height: 8px; border-radius: 999px; background: var(--bg); margin-top: 10px; overflow: hidden; }
.cl-mock-digital-bar-fill { height: 100%; border-radius: 999px; }
.cl-mock-digital-stats { display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: var(--text-soft); margin-top: 6px; }

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
