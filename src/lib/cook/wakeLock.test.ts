import { describe, expect, it, vi } from "vitest"
import { createWakeLock, type WakeLockEnv } from "./wakeLock"

type Listener = () => void

const makeEnv = (isSupported: boolean, shouldReject = false) => {
  const listeners: Listener[] = []
  const sentinel = { release: vi.fn(async () => {}) }
  const request = vi.fn(async () => {
    if (shouldReject) throw new Error("NotAllowedError")
    return sentinel
  })
  const env: WakeLockEnv = {
    wakeLock: isSupported ? { request } : undefined,
    visibilityState: () => "visible",
    onVisibilityChange: (listener) => {
      listeners.push(listener)
      return () => listeners.splice(listeners.indexOf(listener), 1)
    },
  }
  return { env, request, sentinel, fire: () => listeners.forEach((listener) => listener()) }
}

describe("createWakeLock", () => {
  it("reports unsupported and never throws", async () => {
    const { env } = makeEnv(false)
    const lock = createWakeLock(env)
    expect(lock.isSupported).toBe(false)
    await expect(lock.acquire()).resolves.toBe(false)
    await expect(lock.release()).resolves.toBeUndefined()
  })

  it("swallows a rejected request", async () => {
    const { env } = makeEnv(true, true)
    await expect(createWakeLock(env).acquire()).resolves.toBe(false)
  })

  it("acquires and releases the sentinel", async () => {
    const { env, request, sentinel } = makeEnv(true)
    const lock = createWakeLock(env)
    await expect(lock.acquire()).resolves.toBe(true)
    expect(request).toHaveBeenCalledWith("screen")
    await lock.release()
    expect(sentinel.release).toHaveBeenCalledTimes(1)
  })

  it("releases a lock granted after release was called", async () => {
    const { env, sentinel } = makeEnv(true)
    const lock = createWakeLock(env)
    const pending = lock.acquire()
    await lock.release()
    await expect(pending).resolves.toBe(false)
    expect(sentinel.release).toHaveBeenCalledTimes(1)
  })

  it("re-acquires on visibilitychange while active, not after release", async () => {
    const { env, request, fire } = makeEnv(true)
    const lock = createWakeLock(env)
    await lock.acquire()
    fire()
    await vi.waitFor(() => expect(request).toHaveBeenCalledTimes(2), { timeout: 500 })
    await lock.release()
    fire()
    await Promise.resolve()
    expect(request).toHaveBeenCalledTimes(2)
  })
})
