import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

// Landing Page Components
import Header from './components/Header'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import About from './components/About'
import Solutions from './components/Solutions'
import Warranty from './components/Warranty'
import QualityCheck from './components/QualityCheck'
import Comparison from './components/Comparison'
import Configurations from './components/Configurations'
import Industries from './components/Industries'
import Process from './components/Process'
import Faq from './components/Faq'
import QuoteForm from './components/QuoteForm'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

// Admin Pages & Protection
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import ProtectedRoute from './components/admin/ProtectedRoute'

function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Solutions />
        <Warranty />
        <QualityCheck />
        <Comparison />
        <Configurations />
        <Industries />
        <Process />
        <Faq />
        <QuoteForm />
        <FinalCta />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Enterprise Admin Login Route */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Protected Enterprise Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
