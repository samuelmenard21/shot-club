import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { getCurrentPlayer } from '../lib/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [player, setPlayer] = useState(null)
  // On the server (SSR prerender) there's no session — start resolved so public
  // pages render their real content instead of the loading state.
  const [loading, setLoading] = useState(typeof window !== 'undefined')

  const refresh = useCallback(async () => {
    const p = await getCurrentPlayer()
    setPlayer(p)
    return p
  }, [])

  useEffect(() => {
    let mounted = true
    let settled = false

    refresh().finally(() => {
      settled = true
      if (mounted) setLoading(false)
    })

    // Belt-and-suspenders: getUserSafe() (lib/supabase.js) already times out
    // and self-heals a hung auth call at the source. This is just a backstop
    // so nothing else in refresh() (e.g. the players query) can leave the
    // loading screen stuck either.
    const timeout = setTimeout(() => {
      if (!settled && mounted) setLoading(false)
    }, 7000)

    const { data: sub } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        setPlayer(null)
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await refresh()
      }
    })

    return () => {
      mounted = false
      clearTimeout(timeout)
      sub.subscription.unsubscribe()
    }
  }, [refresh])

  return (
    <AuthContext.Provider value={{ player, loading, refresh, setPlayer }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
