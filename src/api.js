// Tiny fetch wrapper for the VINUR backend API.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const TOKEN_KEY = 'vinur_token'

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export const setToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignore */
  }
}

export const clearToken = () => setToken(null)

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new Error('Tidak dapat terhubung ke server. Pastikan backend berjalan.')
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Terjadi kesalahan pada server')
  }
  return data
}

export const api = {
  register: (payload) => request('/api/register', { method: 'POST', body: payload }),
  login: (email, password) => request('/api/login', { method: 'POST', body: { email, password } }),
  getMe: () => request('/api/me', { auth: true }),
  updateProfile: (payload) => request('/api/profile', { method: 'PUT', body: payload, auth: true }),
  updateProgress: (stageId, data) =>
    request(`/api/progress/${stageId}`, { method: 'PUT', body: data, auth: true }),
}
