interface WakeLockSentinelLike {
  release: () => Promise<void>
}

export interface WakeLockEnv {
  wakeLock?: { request: (type: "screen") => Promise<WakeLockSentinelLike> }
  visibilityState: () => string
  onVisibilityChange: (listener: () => void) => () => void
}

export interface WakeLockController {
  isSupported: boolean
  acquire: () => Promise<boolean>
  release: () => Promise<void>
}

export const createWakeLock = (env: WakeLockEnv): WakeLockController => {
  const wakeLock = env.wakeLock
  const state: {
    sentinel: WakeLockSentinelLike | null
    isActive: boolean
    stopListening: (() => void) | null
  } = { sentinel: null, isActive: false, stopListening: null }

  const request = async (): Promise<boolean> => {
    if (!wakeLock) return false
    try {
      const sentinel = await wakeLock.request("screen")
      if (!state.isActive) {
        // Released while the request was pending: drop the late lock.
        await sentinel.release()
        return false
      }
      state.sentinel = sentinel
      return true
    } catch {
      // Denied (low battery, hidden tab): cooking continues without the lock.
      state.sentinel = null
      return false
    }
  }

  const handleVisibilityChange = (): void => {
    if (state.isActive && env.visibilityState() === "visible") void request()
  }

  const acquire = async (): Promise<boolean> => {
    if (!wakeLock) return false
    state.isActive = true
    state.stopListening ??= env.onVisibilityChange(handleVisibilityChange)
    return request()
  }

  const release = async (): Promise<void> => {
    state.isActive = false
    state.stopListening?.()
    state.stopListening = null
    const current = state.sentinel
    state.sentinel = null
    try {
      await current?.release()
    } catch {
      // Already released by the browser.
    }
  }

  return { isSupported: Boolean(wakeLock), acquire, release }
}
