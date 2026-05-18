import { useAuthStore } from '@/hooks/auth-store'
import { parseApiErrorKeyFromBody } from '@/utils/parse-api-error-body'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

function errorMessageFromBody(text: string, fallback: string): string {
  if (!text) return fallback
  const key = parseApiErrorKeyFromBody(text)
  if (key) return key
  try {
    const json = JSON.parse(text) as { message?: unknown }
    if (typeof json?.message === 'string') return json.message
  } catch {
    /* use raw text */
  }
  return text
}

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text()
  if (!res.ok) {
    const msg = errorMessageFromBody(text, res.statusText)
    throw new Error(msg)
  }
  if (!text.trim()) return {} as T
  return JSON.parse(text) as T
}

export async function apiGet<T>(path: string): Promise<T> {
  const token = useAuthStore.getState().token
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, { headers })
  return parseJson<T>(res)
}

export async function apiPost<T, B = unknown>(path: string, body: B): Promise<T> {
  const token = useAuthStore.getState().token
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  return parseJson<T>(res)
}

export async function apiPatch<T, B = unknown>(path: string, body: B): Promise<T> {
  const token = useAuthStore.getState().token
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  })
  return parseJson<T>(res)
}

export async function apiPut<T, B = unknown>(path: string, body: B): Promise<T> {
  const token = useAuthStore.getState().token
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  })
  return parseJson<T>(res)
}

export async function apiDelete(path: string): Promise<void> {
  const token = useAuthStore.getState().token
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(`${API_BASE}${path}`, { method: 'DELETE', headers })
  const text = await res.text()
  if (!res.ok) {
    const msg = errorMessageFromBody(text, res.statusText)
    throw new Error(msg)
  }
}
