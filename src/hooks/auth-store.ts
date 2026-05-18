import { create } from 'zustand'
import {
  LEGACY_AUTH_STORAGE_KEY,
  MOCK_ACCESS_TOKEN,
  MOCK_SESSION_KEY,
} from '@/constants/auth-storage'
import type { User } from '@/types/user'

type AuthState = {
  token: string | null
  user: User | null
  setToken: (token: string) => void
  setUser: (user: User) => void
  logout: () => void
}

function writeTokenToStorage(token: string): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(MOCK_ACCESS_TOKEN, token)
}

function clearTokenStorage(): void {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(MOCK_ACCESS_TOKEN)
}

function looksLikeJwt(value: string): boolean {
  return value.split('.').length === 3
}

function readTokenFromStorage(): string | null {
  if (typeof localStorage === 'undefined') return null

  const direct = localStorage.getItem(MOCK_ACCESS_TOKEN)
  if (direct && looksLikeJwt(direct)) return direct

  try {
    const sessionRaw = localStorage.getItem(MOCK_SESSION_KEY)
    if (sessionRaw) {
      const parsed = JSON.parse(sessionRaw) as unknown
      if (parsed && typeof parsed === 'object' && 'token' in parsed) {
        const t = (parsed as { token?: unknown }).token
        if (typeof t === 'string' && looksLikeJwt(t)) {
          writeTokenToStorage(t)
          localStorage.removeItem(MOCK_SESSION_KEY)
          return t
        }
      }
    }
  } catch {
    void 0
  }

  try {
    const legacy = localStorage.getItem(LEGACY_AUTH_STORAGE_KEY)
    if (!legacy) return null
    const outer = JSON.parse(legacy) as { state?: { token?: unknown } }
    const t = outer.state?.token
    if (typeof t === 'string' && looksLikeJwt(t)) {
      writeTokenToStorage(t)
      localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY)
      return t
    }
    if (typeof t === 'string' && t.startsWith('mock.')) {
      writeTokenToStorage(t)
      localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY)
      return t
    }
  } catch {
    void 0
  }

  return null
}

const initialToken = readTokenFromStorage()

export const useAuthStore = create<AuthState>((set) => ({
  token: initialToken,
  user: null,
  setToken: (token) => {
    writeTokenToStorage(token)
    set({ token, user: null })
  },
  setUser: (user) => set({ user }),
  logout: () => {
    clearTokenStorage()
    set({ token: null, user: null })
  },
}))
