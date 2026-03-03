const AUTH_BASE = 'https://accounts.spotify.com'
const API_BASE = 'https://api.spotify.com/v1'

const TOKEN_KEY = 'spotivibe.spotify.token'
const PKCE_KEY = 'spotivibe.spotify.pkce.verifier'

function isBrowser() {
  return typeof window !== 'undefined'
}

function loadToken() {
  if (!isBrowser()) return null
  try {
    const raw = localStorage.getItem(TOKEN_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveToken(token) {
  if (!isBrowser()) return
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

function clearToken() {
  if (!isBrowser()) return
  localStorage.removeItem(TOKEN_KEY)
}

function savePkceVerifier(verifier) {
  if (!isBrowser()) return
  localStorage.setItem(PKCE_KEY, verifier)
}

function loadPkceVerifier() {
  if (!isBrowser()) return null
  return localStorage.getItem(PKCE_KEY)
}

function clearPkceVerifier() {
  if (!isBrowser()) return
  localStorage.removeItem(PKCE_KEY)
}

function randomString(length = 64) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  let out = ''
  for (let i = 0; i < bytes.length; i++) out += charset[bytes[i] % charset.length]
  return out
}

function base64UrlEncode(bytes) {
  let binary = ''
  const chunkSize = 0x8000
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize))
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

async function sha256Base64Url(input) {
  const data = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return base64UrlEncode(new Uint8Array(digest))
}

function nowMs() {
  return Date.now()
}

function isExpired(token) {
  if (!token) return true
  return nowMs() >= token.expires_at_ms - 30_000
}

function getConfig() {
  const clientId =
    typeof import.meta !== 'undefined' ? import.meta.env.VITE_SPOTIFY_CLIENT_ID || null : null
  const redirectUri =
    typeof import.meta !== 'undefined'
      ? import.meta.env.VITE_SPOTIFY_REDIRECT_URI || `${window.location.origin}/app`
      : ''
  return { clientId, redirectUri }
}

export function hasStoredToken() {
  return !!loadToken()
}

export async function startSpotifyLogin({
  scopes = [
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'user-read-recently-played',
    'user-top-read',
  ],
} = {}) {
  const { clientId, redirectUri } = getConfig()
  if (!clientId) throw new Error('Missing Spotify client id in environment.')

  const verifier = randomString(96)
  const challenge = await sha256Base64Url(verifier)
  savePkceVerifier(verifier)

  const url = new URL(`${AUTH_BASE}/authorize`)
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('redirect_uri', redirectUri)
  url.searchParams.set('code_challenge_method', 'S256')
  url.searchParams.set('code_challenge', challenge)
  url.searchParams.set('scope', scopes.join(' '))

  window.location.assign(url.toString())
}

async function tokenRequest(body) {
  const res = await fetch(`${AUTH_BASE}/api/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(body).toString(),
  })

  const payload = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = payload?.error_description || payload?.error || 'Token request failed'
    throw new Error(msg)
  }
  return payload
}

export async function handleSpotifyRedirectIfPresent() {
  if (!isBrowser()) return { didHandle: false }
  const url = new URL(window.location.href)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')

  if (error) {
    url.searchParams.delete('error')
    window.history.replaceState({}, '', url.pathname + url.search)
    throw new Error(error)
  }
  if (!code) return { didHandle: false }

  const verifier = loadPkceVerifier()
  if (!verifier) throw new Error('Missing PKCE verifier, please try logging in again.')

  const { clientId, redirectUri } = getConfig()
  const payload = await tokenRequest({
    client_id: clientId,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    code_verifier: verifier,
  })

  const token = {
    access_token: payload.access_token,
    refresh_token: payload.refresh_token || loadToken()?.refresh_token || null,
    token_type: payload.token_type,
    scope: payload.scope,
    expires_in: payload.expires_in,
    expires_at_ms: nowMs() + payload.expires_in * 1000,
  }

  saveToken(token)
  clearPkceVerifier()

  url.searchParams.delete('code')
  window.history.replaceState({}, '', url.pathname + url.search)

  return { didHandle: true, token }
}

export async function refreshSpotifyAccessToken() {
  const existing = loadToken()
  const { clientId } = getConfig()
  if (!existing?.refresh_token) throw new Error('No refresh token available')

  const payload = await tokenRequest({
    client_id: clientId,
    grant_type: 'refresh_token',
    refresh_token: existing.refresh_token,
  })

  const token = {
    ...existing,
    access_token: payload.access_token,
    token_type: payload.token_type || existing.token_type,
    scope: payload.scope || existing.scope,
    expires_in: payload.expires_in,
    expires_at_ms: nowMs() + payload.expires_in * 1000,
  }

  saveToken(token)
  return token
}

export async function getValidSpotifyAccessToken() {
  const token = loadToken()
  if (!token) return null
  if (!isExpired(token)) return token.access_token
  const refreshed = await refreshSpotifyAccessToken()
  return refreshed.access_token
}

export async function spotifyApi(path, { method = 'GET', headers, body } = {}) {
  const accessToken = await getValidSpotifyAccessToken()
  if (!accessToken) throw new Error('Not logged in to Spotify')

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(headers || {}),
    },
    body,
  })

  if (res.status === 204) return null
  const payload = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = payload?.error?.message || payload?.error_description || 'Spotify API error'
    throw new Error(msg)
  }
  return payload
}

export function logoutSpotify() {
  clearToken()
  clearPkceVerifier()
}

