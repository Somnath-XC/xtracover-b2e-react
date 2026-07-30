import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm tracking-wider uppercase">Verifying Enterprise Credentials...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect unauthenticated user to /admin/login keeping target location state
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
