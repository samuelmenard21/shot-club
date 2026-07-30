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
// once: the local session is wiped (which is what "clearing cache" was really
// fixing) and the caller gets a clean signed-out result instead of hanging.
export async function getUserSafe() {
  const timeout = new Promise((resolve) => setTimeout(() => resolve('timeout'), 3000))
  const result = await Promise.race([supabase.auth.getUser(), timeout])
  if (result === 'timeout') {
    await supabase.auth.signOut({ scope: 'local' })
    return null
  }
  return result.data.user
}
