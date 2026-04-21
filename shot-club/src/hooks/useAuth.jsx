import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { getCurrentPlayer } from '../lib/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [player, setPlayer] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const p = await getCurrentPlayer()
    setPlayer(p)
    return p
  }, [])

  useEffect(() => {
    let mounted = true
    refresh().finally(() => {
      if (mounted) setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        setPlayer(null)
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await refresh()
      }
    })

    return () => {
      mounted = false
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
