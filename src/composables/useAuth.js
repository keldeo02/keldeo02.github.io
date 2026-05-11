async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function useAuth() {
  const EXPECTED_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH

  async function login(password) {
    const hash = await hashPassword(password)
    if (hash === EXPECTED_HASH) {
      sessionStorage.setItem('admin_auth', '1')
      return true
    }
    return false
  }

  function logout() {
    sessionStorage.removeItem('admin_auth')
  }

  function isAuthenticated() {
    return !!sessionStorage.getItem('admin_auth')
  }

  return { login, logout, isAuthenticated }
}
