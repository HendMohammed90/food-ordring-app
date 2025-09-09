import { signOut } from 'next-auth/react'

/**
 * Comprehensive logout function that clears all authentication data
 */
export const performLogout = async (options?: {
  redirect?: boolean
  callbackUrl?: string
  showToast?: boolean
}) => {
  const { redirect = true, callbackUrl = '/' } = options || {}

  try {
    // Clear client-side storage
    if (typeof window !== 'undefined') {
      // Clear localStorage
      localStorage.clear()
      // Clear sessionStorage  
      sessionStorage.clear()
      
      // Clear any custom cookies (client-side accessible ones)
      document.cookie.split(";").forEach(cookie => {
        const eqPos = cookie.indexOf("=")
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
        document.cookie = `${name.trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
      })
    }

    // Use NextAuth signOut
    await signOut({
      redirect,
      callbackUrl,
    })

  } catch (error) {
    console.error('Logout error:', error)
    throw error
  }
}

/**
 * Clear all auth-related client storage
 */
export const clearAuthStorage = () => {
  if (typeof window !== 'undefined') {
    // Clear specific auth-related items
    const authKeys = [
      'next-auth.session-token',
      'authjs.session-token', 
      'user-session',
      'auth-token',
      // Add any other auth-related keys you might be storing
    ]
    
    authKeys.forEach(key => {
      localStorage.removeItem(key)
      sessionStorage.removeItem(key)
    })
  }
}

/**
 * Force redirect after logout to ensure clean state
 */
export const forceLogoutRedirect = (url: string = '/') => {
  if (typeof window !== 'undefined') {
    // Clear everything one more time
    clearAuthStorage()
    
    // Force hard navigation to clear any remaining state
    setTimeout(() => {
      window.location.href = url
    }, 100)
  }
}
