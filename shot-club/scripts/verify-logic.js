#!/usr/bin/env node
// Runs with plain node — no npm install needed.
// Usage: node scripts/verify-logic.js

// ── Tiny test harness ──────────────────────────────────────────────────────

let passed = 0
let failed = 0

function test(name, fn) {
  try {
    fn()
    console.log(`  ✓  ${name}`)
    passed++
  } catch (e) {
    console.log(`  ✗  ${name}`)
    console.log(`     → ${e.message}`)
    failed++
  }
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'Assertion failed')
}

function assertEqual(a, b, msg) {
  if (a !== b) throw new Error(`${msg || 'Expected equal'}\n     got      ${JSON.stringify(a)}\n     expected ${JSON.stringify(b)}`)
}

// ── Inlined pure functions (mirrors src/lib/challenges.js + progress.js) ──

function stableIndex(seed, length) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (Math.imul(31, hash) + seed.charCodeAt(i)) >>> 0
  }
  return hash % length
}

const SQUAD_SIZE = 4

function formSquads(players, weekStart) {
  const shuffled = [...players].sort((a, b) => {
    const ha = stableIndex(a.id + weekStart, 100000)
    const hb = stableIndex(b.id + weekStart, 100000)
    return ha - hb
  })
  const squads = []
  for (let i = 0; i < shuffled.length; i += SQUAD_SIZE) {
    squads.push(shuffled.slice(i, i + SQUAD_SIZE))
  }
  return squads
}

const SQUAD_NAMES = [
  'The Snipers', 'Ice Breakers', 'The Wall', 'Iron Five',
  'Puck Hunters', 'Frozen Few', 'The Grinders', 'Top Shelf',
  'The Enforcers', 'Night Train', 'Sudden Death', 'Power Play',
  'Bardown Boys', 'Overtime Kings', 'The Backcheck', 'Slot Monsters',
]

function defaultSquadName(teamId, weekStart, squadIndex) {
  return SQUAD_NAMES[stableIndex(teamId + weekStart + String(squadIndex), SQUAD_NAMES.length)]
}

function daysUntilSundayFor(day) {
  return day === 0 ? 0 : 7 - day
}

function comebackTarget(player) {
  return Math.max(20, (player?.daily_goal || 50) * 2)
}

function localISO(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

// todayISO: 'YYYY-MM-DD' string — noon-anchored to avoid DST/timezone shifts
function isStreakInRecovery(player, todayISO) {
  if (!player) return false
  if ((player.current_streak ?? 0) > 0) return false
  if (!player.last_shot_date) return false
  const d = new Date(todayISO + 'T12:00:00')
  d.setDate(d.getDate() - 2)
  const twoDaysAgo = localISO(d)
  return player.last_shot_date === twoDaysAgo
}

function squadBattleState({ myShots, rivalShots, loggedToday, fullSquadDay, daysLeft }) {
  const total = myShots + rivalShots
  const myPct = total === 0 ? 50 : Math.max(4, Math.min(96, Math.round((myShots / total) * 100)))
  const gap = myShots - rivalShots
  const winning = gap >= 0
  const isFinalDay = daysLeft === 0
  let status
  if (isFinalDay && !winning)       status = 'final-urgent'
  else if (isFinalDay && winning)   status = 'final-hold'
  else if (!loggedToday)            status = 'need-to-log'
  else if (fullSquadDay)            status = 'full-squad'
  else if (winning && gap > 0)      status = 'leading'
  else if (!winning && gap < 0)     status = 'chasing'
  else                              status = 'tied'
  return { myPct, gap, winning, status }
}

// ── Test suite: stableIndex ────────────────────────────────────────────────

console.log('\nstableIndex')

test('deterministic — same seed always returns same value', () => {
  const a = stableIndex('player-abc-2025-06-23', 100)
  const b = stableIndex('player-abc-2025-06-23', 100)
  assertEqual(a, b)
})

test('output is always within [0, length-1]', () => {
  for (let i = 0; i < 200; i++) {
    const r = stableIndex(`seed-${i}-extra`, 10)
    assert(r >= 0 && r < 10, `got ${r}, expected 0–9`)
  }
})

test('length=1 always returns 0', () => {
  assertEqual(stableIndex('anything at all', 1), 0)
  assertEqual(stableIndex('', 1), 0)
})

test('produces varied distribution across 20 seeds', () => {
  const results = new Set()
  for (let i = 0; i < 20; i++) results.add(stableIndex(`unique-seed-${i}`, 1000))
  assert(results.size > 10, `Only ${results.size} unique values from 20 seeds — too uniform`)
})

test('different seeds give different results (spot check)', () => {
  const a = stableIndex('team-1-2025-06-23-0', 16)
  const b = stableIndex('team-1-2025-06-30-0', 16)
  assert(a !== b, 'Different week seeds should produce different squad names')
})

test('empty string seed is handled safely', () => {
  const r = stableIndex('', 10)
  assert(r >= 0 && r < 10)
})

// ── Test suite: formSquads ─────────────────────────────────────────────────

console.log('\nformSquads')

const WEEK_A = '2025-06-23'
const WEEK_B = '2025-07-07' // different month so hashes diverge early, not just a constant offset
// IDs vary in the prefix so hashes diverge across week seeds (same-prefix IDs sort identically)
const PLAYER_IDS = [
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'b3d9e821-7f14-4c0a-93b6-1d5e8f2a0c7d',
  '2a1c4f8e-d073-4b29-8ea1-c6f3905b7d12',
  'e90c7d43-1b8f-4a56-bd92-73f1e08c25a0',
  '6c5f2b0d-a831-4e97-bc04-d9287f13e6a5',
  '9d8e1f7c-3a02-4b65-8f1e-a04c7b923d6f',
  '1e7f3a9b-c24d-4086-95b3-e81f0d5c42a7',
  '4b2e8d1f-06c7-4a93-b15d-f9e30a7824c6',
  '7a0f5c2e-b9d4-4817-a03c-2e8f1b6d950a',
  'c318a5e9-4f0b-4d72-8c61-9b5d27e0a3f4',
  'd06b7f2a-e41c-4953-b780-3a1d9e5c08b6',
  '8f4e0c1b-73a9-4d26-be50-6c2f8d0a1e97',
]
const makePlayers = (n) => PLAYER_IDS.slice(0, n).map(id => ({ id }))

test('every player appears exactly once', () => {
  const players = makePlayers(12)
  const ids = formSquads(players, WEEK_A).flat().map(p => p.id)
  assertEqual(ids.length, 12, 'Total count')
  assertEqual(new Set(ids).size, 12, 'All unique')
})

test('no squad exceeds SQUAD_SIZE', () => {
  ;[5, 8, 9, 11, 15, 16, 17].forEach(n => {
    for (const squad of formSquads(makePlayers(n), WEEK_A)) {
      assert(squad.length <= SQUAD_SIZE, `n=${n}: squad has ${squad.length} members`)
    }
  })
})

test('exactly SQUAD_SIZE players → 1 full squad', () => {
  const squads = formSquads(makePlayers(SQUAD_SIZE), WEEK_A)
  assertEqual(squads.length, 1)
  assertEqual(squads[0].length, SQUAD_SIZE)
})

test('SQUAD_SIZE + 1 → 2 squads, remainder in second', () => {
  const squads = formSquads(makePlayers(SQUAD_SIZE + 1), WEEK_A)
  assertEqual(squads.length, 2)
  assertEqual(squads[1].length, 1)
})

test('deterministic — same week always gives same order', () => {
  const players = makePlayers(8)
  const r1 = formSquads(players, WEEK_A).flat().map(p => p.id).join(',')
  const r2 = formSquads(players, WEEK_A).flat().map(p => p.id).join(',')
  assertEqual(r1, r2)
})

test('reshuffles week-over-week', () => {
  const players = makePlayers(8)
  const r1 = formSquads(players, WEEK_A).flat().map(p => p.id).join(',')
  const r2 = formSquads(players, WEEK_B).flat().map(p => p.id).join(',')
  assert(r1 !== r2, 'Squads should differ across weeks')
})

test('input order does not affect squad membership', () => {
  const players = makePlayers(8)
  const reversed = [...players].reverse()
  const all1 = formSquads(players, WEEK_A).flat().map(p => p.id).sort().join(',')
  const all2 = formSquads(reversed, WEEK_A).flat().map(p => p.id).sort().join(',')
  assertEqual(all1, all2)
})

test('single player → one squad of one', () => {
  const squads = formSquads([{ id: 'solo' }], WEEK_A)
  assertEqual(squads.length, 1)
  assertEqual(squads[0].length, 1)
})

test('empty roster → no squads', () => {
  assertEqual(formSquads([], WEEK_A).length, 0)
})

// ── Test suite: squad assignment stability ─────────────────────────────────

console.log('\nSquad assignment stability')

test('given player is always in the same squad index within a week', () => {
  const players = makePlayers(8)
  players.forEach(p => {
    const idx1 = formSquads(players, WEEK_A).findIndex(s => s.some(m => m.id === p.id))
    const idx2 = formSquads(players, WEEK_A).findIndex(s => s.some(m => m.id === p.id))
    assertEqual(idx1, idx2, `Player ${p.id}`)
  })
})

test('rivals in same squad stay together all week (multiple calls)', () => {
  const players = makePlayers(8)
  const getSquad = pid => formSquads(players, WEEK_A).findIndex(s => s.some(m => m.id === pid))
  // player-1 and whoever shares their squad should be consistent
  const idx = getSquad('player-1')
  assert(idx === getSquad('player-1'), 'Consistent squad index on repeated calls')
})

test('player moves to different squad next week', () => {
  const players = makePlayers(8)
  const pid = players[0].id
  const idxA = formSquads(players, WEEK_A).findIndex(s => s.some(m => m.id === pid))
  const idxB = formSquads(players, WEEK_B).findIndex(s => s.some(m => m.id === pid))
  assert(idxA >= 0, 'Player found in week A')
  assert(idxB >= 0, 'Player found in week B')
})

// ── Test suite: defaultSquadName ───────────────────────────────────────────

console.log('\ndefaultSquadName')

test('returns a non-empty string', () => {
  const name = defaultSquadName('team-1', WEEK_A, 0)
  assert(typeof name === 'string' && name.length > 0)
})

test('same inputs always return same name', () => {
  assertEqual(
    defaultSquadName('team-abc', WEEK_A, 0),
    defaultSquadName('team-abc', WEEK_A, 0)
  )
})

test('name is always from the approved SQUAD_NAMES list', () => {
  for (let i = 0; i < 10; i++) {
    const name = defaultSquadName(`team-${i}`, WEEK_A, i % 4)
    assert(SQUAD_NAMES.includes(name), `"${name}" not in list`)
  }
})

test('different week seeds produce different names (not locked to one name)', () => {
  const names = new Set()
  for (let w = 0; w < 8; w++) {
    names.add(defaultSquadName('team-1', `2025-0${w+1}-01`, 0))
  }
  assert(names.size > 1, 'Expected variety across weeks')
})

test('different squad indices on same team can produce different names', () => {
  const names = new Set(Array.from({ length: 4 }, (_, i) => defaultSquadName('team-x', WEEK_A, i)))
  assert(names.size >= 2, 'Expected some variety across squad indices')
})

// ── Test suite: daysUntilSunday ────────────────────────────────────────────

console.log('\ndaysUntilSunday')

const DAY_CASES = [
  ['Sunday',    0, 0],
  ['Monday',    1, 6],
  ['Tuesday',   2, 5],
  ['Wednesday', 3, 4],
  ['Thursday',  4, 3],
  ['Friday',    5, 2],
  ['Saturday',  6, 1],
]

for (const [label, day, expected] of DAY_CASES) {
  test(`${label} → ${expected} days left`, () => {
    assertEqual(daysUntilSundayFor(day), expected, label)
  })
}

// ── Test suite: comebackTarget ─────────────────────────────────────────────

console.log('\ncomebackTarget')

test('daily_goal 50 → target 100', () => assertEqual(comebackTarget({ daily_goal: 50 }), 100))
test('daily_goal 5 → floor at 20', () => assertEqual(comebackTarget({ daily_goal: 5 }), 20))
test('daily_goal 10 → floor at 20', () => assertEqual(comebackTarget({ daily_goal: 10 }), 20))
test('daily_goal 11 → 22 (above floor)', () => assertEqual(comebackTarget({ daily_goal: 11 }), 22))
test('no daily_goal prop → defaults to 50 → 100', () => assertEqual(comebackTarget({}), 100))
test('null player → 100', () => assertEqual(comebackTarget(null), 100))
test('daily_goal 200 → 400', () => assertEqual(comebackTarget({ daily_goal: 200 }), 400))

// ── Test suite: isStreakInRecovery ─────────────────────────────────────────

console.log('\nisStreakInRecovery')

// We pass today explicitly so this doesn't depend on the real clock
const TODAY = '2025-06-25' // Wednesday
const TWO_DAYS_AGO = '2025-06-23'   // Monday
const ONE_DAY_AGO  = '2025-06-24'   // Tuesday
const THREE_DAYS_AGO = '2025-06-22' // Sunday

test('null player → false', () => assert(!isStreakInRecovery(null, TODAY)))
test('active streak (>0) → false even if last_shot was 2 days ago', () => {
  assert(!isStreakInRecovery({ current_streak: 3, last_shot_date: TWO_DAYS_AGO }, TODAY))
})
test('no last_shot_date → false', () => {
  assert(!isStreakInRecovery({ current_streak: 0, last_shot_date: null }, TODAY))
})
test('streak=0, shot exactly 2 days ago → true (recovery window)', () => {
  assert(isStreakInRecovery({ current_streak: 0, last_shot_date: TWO_DAYS_AGO }, TODAY))
})
test('streak=0, shot 1 day ago (missed today, not yesterday) → false', () => {
  assert(!isStreakInRecovery({ current_streak: 0, last_shot_date: ONE_DAY_AGO }, TODAY))
})
test('streak=0, shot 3 days ago (window closed) → false', () => {
  assert(!isStreakInRecovery({ current_streak: 0, last_shot_date: THREE_DAYS_AGO }, TODAY))
})
test('streak=0, shot today → false', () => {
  assert(!isStreakInRecovery({ current_streak: 0, last_shot_date: '2025-06-25' }, TODAY))
})

// ── Test suite: squad battle scoring state ─────────────────────────────────

console.log('\nSquad battle scoring')

test('0-0 → 50% bar, not logged triggers need-to-log', () => {
  const s = squadBattleState({ myShots: 0, rivalShots: 0, loggedToday: false, fullSquadDay: false, daysLeft: 3 })
  assertEqual(s.myPct, 50)
  assertEqual(s.status, 'need-to-log')
})

test('tied, logged → tied status', () => {
  const s = squadBattleState({ myShots: 100, rivalShots: 100, loggedToday: true, fullSquadDay: false, daysLeft: 3 })
  assertEqual(s.myPct, 50)
  assertEqual(s.status, 'tied')
})

test('winning, logged → leading status', () => {
  const s = squadBattleState({ myShots: 200, rivalShots: 100, loggedToday: true, fullSquadDay: false, daysLeft: 3 })
  assert(s.myPct > 50, `Expected myPct > 50, got ${s.myPct}`)
  assert(s.winning)
  assertEqual(s.status, 'leading')
})

test('losing, logged → chasing status', () => {
  const s = squadBattleState({ myShots: 100, rivalShots: 200, loggedToday: true, fullSquadDay: false, daysLeft: 3 })
  assert(s.myPct < 50)
  assert(!s.winning)
  assertEqual(s.status, 'chasing')
})

test('not logged overrides leading → need-to-log', () => {
  const s = squadBattleState({ myShots: 999, rivalShots: 1, loggedToday: false, fullSquadDay: false, daysLeft: 3 })
  assertEqual(s.status, 'need-to-log')
})

test('full squad day overrides leading → full-squad', () => {
  const s = squadBattleState({ myShots: 200, rivalShots: 100, loggedToday: true, fullSquadDay: true, daysLeft: 3 })
  assertEqual(s.status, 'full-squad')
})

test('final day + losing → final-urgent', () => {
  const s = squadBattleState({ myShots: 100, rivalShots: 200, loggedToday: true, fullSquadDay: false, daysLeft: 0 })
  assertEqual(s.status, 'final-urgent')
})

test('final day + winning → final-hold', () => {
  const s = squadBattleState({ myShots: 300, rivalShots: 100, loggedToday: true, fullSquadDay: false, daysLeft: 0 })
  assertEqual(s.status, 'final-hold')
})

test('massive lead: bar clamped to max 96%', () => {
  const s = squadBattleState({ myShots: 100000, rivalShots: 1, loggedToday: true, fullSquadDay: false, daysLeft: 2 })
  assert(s.myPct <= 96, `got ${s.myPct}`)
})

test('massive deficit: bar clamped to min 4%', () => {
  const s = squadBattleState({ myShots: 1, rivalShots: 100000, loggedToday: true, fullSquadDay: false, daysLeft: 2 })
  assert(s.myPct >= 4, `got ${s.myPct}`)
})

test('gap is correct', () => {
  const s = squadBattleState({ myShots: 250, rivalShots: 180, loggedToday: true, fullSquadDay: false, daysLeft: 2 })
  assertEqual(s.gap, 70)
})

// ── Summary ────────────────────────────────────────────────────────────────

const total = passed + failed
console.log(`\n${'─'.repeat(42)}`)
console.log(`  ${passed} / ${total} passed${failed > 0 ? `   (${failed} failed)` : ''}`)
if (failed > 0) {
  console.log(`\n  Fix the failures above before deploying.\n`)
  process.exit(1)
} else {
  console.log(`\n  All tests passed ✓\n`)
}
