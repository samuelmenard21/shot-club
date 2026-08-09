import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing Supabase env vars. Copy .env.example to .env and fill in.')
}

export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    // kids never sign out on their own — session persists forever on this device.
    // Guard localStorage so the module is importable under Node (SSR prerender).
    storage: typeof localStorage !== 'undefined' ? localStorage : undefined,
    storageKey: 'hsc-auth',
  },
})

// supabase.auth.getUser() can hang indefinitely if the stored refresh token is
// stale/invalid — the SDK retries the token refresh against the network rather
// than failing fast. Every caller in this app goes through here instead of
// calling supabase.auth.getUser() directly, so a hang self-heals everywhere at
// once.
//
// This used to wipe the local session on ANY timeout, on the theory that a
// hang meant a stale token. In practice a slow network (rink wifi, a cold
// tab resuming from background, a slow first round trip to Supabase) hits
// the same 3s timeout as a genuinely dead token — so a kid with a perfectly
// valid session would get silently signed out and dumped back on signup,
// which is exactly the opposite of "sign in once, never again" this app
// promises. Now: a timeout falls back to the session already sitting in
// local storage (no network needed, so it's instant) instead of assuming
// the worst — RLS still rejects a genuinely bad token on every real query,
// so this can't leak access, it just stops punishing slow networks. Only an
// explicit rejection from the server (not a timeout) wipes the session.
export async function getUserSafe() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return null

  const timeout = new Promise((resolve) => setTimeout(() => resolve('timeout'), 8000))
  const result = await Promise.race([supabase.auth.getUser(), timeout])
  if (result === 'timeout') {
    return session.user
  }
  if (result.error) {
    await supabase.auth.signOut({ scope: 'local' })
    return null
  }
  return result.data.user
}
