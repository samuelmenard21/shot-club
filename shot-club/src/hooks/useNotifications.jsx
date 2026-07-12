import { createContext, useContext, useState, useCallback } from 'react'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const toast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now()
    const notification = { id, message, type }

    setNotifications((prev) => [...prev, notification])

    if (duration) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
      }, duration)
    }

    return id
  }, [])

  const dismiss = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, toast, dismiss }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}
