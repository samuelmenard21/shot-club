// Auto-recovers from the classic "stale SPA tab after a new deploy" failure:
// every deploy ships JS chunks under NEW content-hashed filenames and the old
// ones are gone. A tab that's been open across a deploy (or one that loaded
// an HTML shell a beat before the new deploy fully propagated) still holds
// React.lazy() imports pointing at the OLD hashes. When the user then
// navigates to a route whose chunk hasn't loaded yet, the dynamic import()
// 404s — and because that rejection happens outside React's synchronous
// render, it can land in Suspense as a promise that never resolves rather
// than a caught error, leaving the app parked on the "LOADING…" fallback
// forever with nothing in the console to point at. A real caching bug would
// show up in HTTP headers; this doesn't — it's a version-skew race, and the
// fix is simply "reload once," which is exactly what manually clearing the
// cache was doing by accident.
//
// Guarded by sessionStorage so a genuinely broken chunk (a bad deploy, not a
// version race) reloads once and then falls through to the ErrorBoundary
// instead of reload-looping forever.

const RELOAD_GUARD_KEY = 'chunkReloadAttempted'

const CHUNK_FAILURE_PATTERNS = [
  'Failed to fetch dynamically imported module',
  'error loading dynamically imported module',
  'Importing a module script failed',
  'Unable to preload CSS',
]

function looksLikeChunkFailure(message) {
  if (typeof message !== 'string') return false
  return CHUNK_FAILURE_PATTERNS.some((p) => message.includes(p))
}

function reloadOnce() {
  if (typeof sessionStorage === 'undefined') return
  if (sessionStorage.getItem(RELOAD_GUARD_KEY)) return // already tried this session — let it surface as a real error
  sessionStorage.setItem(RELOAD_GUARD_KEY, '1')
  window.location.reload()
}

export function installChunkRecovery() {
  if (typeof window === 'undefined') return

  window.addEventListener('unhandledrejection', (event) => {
    if (looksLikeChunkFailure(event.reason?.message)) reloadOnce()
  })

  window.addEventListener('error', (event) => {
    if (looksLikeChunkFailure(event.message)) reloadOnce()
  })
}

// Clears the guard once something on the page actually renders successfully,
// so a real transient failure gets its own fresh "try once" budget next time
// rather than a permanently spent one from a prior session.
export function clearChunkRecoveryGuard() {
  if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(RELOAD_GUARD_KEY)
}
