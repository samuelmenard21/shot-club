// Coach Sam line library
// Full voice bible lives in the main repo; this is a Phase-1 subset.
// Each trigger has an array of variants. Variables in {braces} are substituted at render time.

export const SAM_LINES = {
  daily_greeting: [
    "Morning, {name}. Let's get after it.",
    "Back at it. How's the bucket looking?",
    "Here we go. Day {streak}.",
    "What's the plan today — wrist, snap, or a bit of everything?",
    "{name}. Stick in hand. Let's work.",
    "Fresh day. Fresh bucket.",
  ],
  daily_greeting_no_streak: [
    "Welcome back, {name}. Even 20 shots is a day's work.",
    "Glad you're here. Every rep counts when you're starting out.",
    "{name}. Let's build something.",
    "Here's the thing about practice — the only bad one is the one you didn't do.",
  ],
  session_started: [
    "There it is.",
    "Let's go.",
    "Locked in.",
    "That's the stuff.",
    "Bucket open.",
  ],
  mid_session_50: [
    "50 deep. Nice pace.",
    "Halfway through the bucket. Don't rush.",
    "Form over speed, {name}.",
    "Keep the wrists snapping.",
    "Steady hands.",
  ],
  mid_session_100: [
    "Triple digits. That's a workday.",
    "100 in one sit-down. Respect.",
    "This is how Captains are built.",
    "Your wrists are earning it.",
  ],
  welcome_first_time: [
    "Welcome to the squad, {name}. Log your first bucket and we're on.",
    "Glad to have you, {name}. Let's see what you've got.",
    "New name on the roster: {name}. Show me the work.",
  ],
  welcome_with_teammate: [
    "Welcome, {name}. {teammate}'s been ripping {teammate_shots} a day — let's catch up.",
    "{name}'s in. {teammate}'s the one to chase — {teammate_shots} this week.",
  ],
}

// Pick a random line and substitute variables
export function pickLine(trigger, vars = {}) {
  const pool = SAM_LINES[trigger] || SAM_LINES.daily_greeting
  const template = pool[Math.floor(Math.random() * pool.length)]
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '')
}

// Deterministic pick — same trigger + day = same line (so it doesn't change mid-session)
export function pickLineStable(trigger, seed, vars = {}) {
  const pool = SAM_LINES[trigger] || SAM_LINES.daily_greeting
  const hash = String(seed).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const template = pool[hash % pool.length]
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '')
}
