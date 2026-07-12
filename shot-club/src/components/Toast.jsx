import { useNotifications } from '../hooks/useNotifications'

export default function Toast() {
  const { notifications, dismiss } = useNotifications()

  return (
    <div
      style={{
        position: 'fixed',
        top: 16,
        left: 50,
        right: 50,
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {notifications.map((notif) => (
        <div
          key={notif.id}
          style={{
            marginBottom: 8,
            padding: '12px 16px',
            borderRadius: 8,
            background:
              notif.type === 'success'
                ? 'rgba(34, 197, 94, 0.9)'
                : notif.type === 'error'
                  ? 'rgba(239, 68, 68, 0.9)'
                  : notif.type === 'warning'
                    ? 'rgba(217, 119, 6, 0.9)'
                    : 'rgba(59, 130, 246, 0.9)',
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'var(--font-body)',
            backdropFilter: 'blur(8px)',
            pointerEvents: 'auto',
            cursor: 'pointer',
            animation: 'slideIn 0.3s ease',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
          }}
          onClick={() => dismiss(notif.id)}
        >
          <span>{notif.message}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              dismiss(notif.id)
            }}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            ✕
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
