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

    // Defer auth refresh so it doesn't block hydration on public pages.
    // Use requestIdleCallback for better priority; fall back to setTimeout.
    const scheduleRefresh = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          refresh().finally(() => {
            settled = true
            if (mounted) setLoading(false)
          })
        }, { timeout: 4000 })
      } else {
        setTimeout(() => {
          refresh().finally(() => {
            settled = true
            if (mounted) setLoading(false)
          })
        }, 0)
      }
    }
    scheduleRefresh()

    // Belt-and-suspenders: if refresh doesn't settle in 7s, unblock anyway
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
