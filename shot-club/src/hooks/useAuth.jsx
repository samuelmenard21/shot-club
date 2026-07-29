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

    // A stalled network call here (a dropped connection, a hung Supabase
    // request) used to leave the whole app parked on the "LOADING…" screen
    // forever — no error, nothing to click, the only way out was manually
    // clearing site data to force a fresh connection. A timer-based watchdog
    // on the LOADING SCREEN wasn't enough (it still needed the underlying
    // fetch to eventually settle to show anything useful); this stops
    // BLOCKING on that fetch after a few seconds regardless of whether it
    // ever resolves. The real request keeps running in the background — if
    // it does complete late, refresh()'s own setPlayer call above still
    // updates the UI to the real signed-in state then. This just guarantees
    // the app is never stuck with nothing rendered and nothing to do.
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
