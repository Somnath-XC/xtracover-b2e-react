import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiLoginAdmin } from '../services/apiService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Rate limiting / Lockout state
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [lockoutUntil, setLockoutUntil] = useState(null)

  // Initialize session from localStorage/sessionStorage on app mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('xtra_admin_token') || sessionStorage.getItem('xtra_admin_token')
      const storedUser = localStorage.getItem('xtra_admin_user') || sessionStorage.getItem('xtra_admin_user')
      const storedLockout = localStorage.getItem('xtra_lockout_until')

      if (storedLockout) {
        const lockoutTime = parseInt(storedLockout, 10)
        if (lockoutTime > Date.now()) {
          setLockoutUntil(lockoutTime)
        } else {
          localStorage.removeItem('xtra_lockout_until')
        }
      }

      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
      }
    } catch (err) {
      console.error('Error loading stored auth state:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Admin login calling backend Express API
  const login = async (email, password, rememberMe = false) => {
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remainingSec = Math.ceil((lockoutUntil - Date.now()) / 1000)
      throw new Error(`Account temporarily locked due to multiple failed attempts. Try again in ${remainingSec}s.`)
    }

    try {
      // Call backend API endpoint POST /api/admin/login
      const res = await apiLoginAdmin(email, password)

      setFailedAttempts(0)
      setLockoutUntil(null)
      localStorage.removeItem('xtra_lockout_until')

      const loggedUser = res.user
      const authToken = res.token

      setUser(loggedUser)
      setToken(authToken)
      setIsAuthenticated(true)

      if (rememberMe) {
        localStorage.setItem('xtra_admin_token', authToken)
        localStorage.setItem('xtra_admin_user', JSON.stringify(loggedUser))
      } else {
        sessionStorage.setItem('xtra_admin_token', authToken)
        sessionStorage.setItem('xtra_admin_user', JSON.stringify(loggedUser))
      }

      return { success: true, user: loggedUser }
    } catch (err) {
      const newCount = failedAttempts + 1
      setFailedAttempts(newCount)

      if (newCount >= 3) {
        const lockoutTime = Date.now() + 30 * 1000 // 30 second lock
        setLockoutUntil(lockoutTime)
        localStorage.setItem('xtra_lockout_until', lockoutTime.toString())
        throw new Error('Too many failed attempts. Account locked for 30 seconds.')
      }

      throw new Error(err.message || `Invalid credentials. Attempt ${newCount} of 3.`)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('xtra_admin_token')
    localStorage.removeItem('xtra_admin_user')
    sessionStorage.removeItem('xtra_admin_token')
    sessionStorage.removeItem('xtra_admin_user')
  }

  // Password Reset simulation
  const requestPasswordReset = async (email) => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return true
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        failedAttempts,
        lockoutUntil,
        login,
        logout,
        requestPasswordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
