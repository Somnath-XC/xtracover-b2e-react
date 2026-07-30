import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  apiGetQuotes,
  apiUpdateQuoteStatus,
  apiClearQuotes,
  apiSubmitQuote
} from '../../services/apiService'

export default function AdminDashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Business Quote State - loaded from MSSQL database via API
  const [quoteEntries, setQuoteEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedEntry, setSelectedEntry] = useState(null)

  // Fetch submissions from MSSQL database
  const loadSubmissions = async () => {
    try {
      setLoading(true)
      setErrorMsg('')
      const quotes = await apiGetQuotes()
      setQuoteEntries(quotes)
    } catch (err) {
      console.error('Error fetching quotes from database:', err)
      setErrorMsg(err.message || 'Failed to load quote submissions from database.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSubmissions()
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  // Filter quote entries strictly by search & status
  const filteredEntries = quoteEntries.filter((item) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
      item.name?.toLowerCase().includes(searchLower) ||
      item.email?.toLowerCase().includes(searchLower) ||
      item.contact?.toLowerCase().includes(searchLower) ||
      item.message?.toLowerCase().includes(searchLower) ||
      item.id?.toLowerCase().includes(searchLower)
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Update status handler in MSSQL database
  const handleStatusChange = async (id, newStatus) => {
    try {
      await apiUpdateQuoteStatus(id, newStatus)
      setQuoteEntries((prev) =>
        prev.map((entry) => (entry.id === id ? { ...entry, status: newStatus } : entry))
      )
      if (selectedEntry && selectedEntry.id === id) {
        setSelectedEntry((prev) => ({ ...prev, status: newStatus }))
      }
    } catch (err) {
      alert(err.message || 'Failed to update quote status in database.')
    }
  }

  // Clear all entries from MSSQL database
  const handleClearAll = async () => {
    if (window.confirm('Are you sure you want to clear all quote submissions from the database?')) {
      try {
        await apiClearQuotes()
        setQuoteEntries([])
        setSelectedEntry(null)
      } catch (err) {
        alert(err.message || 'Failed to clear quotes from database.')
      }
    }
  }

  // Helper to insert test submission into MSSQL database
  const handleAddTestSubmission = async () => {
    try {
      await apiSubmitQuote({
        name: 'Sample Corporate Client',
        contact: '+91 98765 43210',
        email: 'procurement@enterprise.com',
        message: 'Requirement for 100 enterprise refurbished laptops with 2 years warranty.'
      })
      await loadSubmissions()
    } catch (err) {
      alert(err.message || 'Failed to add test submission.')
    }
  }

  // Calculate summary stats
  const totalEntries = quoteEntries.length
  const newInquiries = quoteEntries.filter((q) => q.status === 'New Inquiry').length
  const quoteSentCount = quoteEntries.filter((q) => q.status === 'Quote Sent').length
  const closedCount = quoteEntries.filter((q) => q.status === 'Closed / Converted').length

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Inter'] antialiased flex flex-col w-full">
      {/* Top Header Bar - Full Width */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs w-full">
        <div className="w-full px-6 sm:px-8 lg:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-brand-600 flex items-center justify-center font-black text-white text-lg shadow-sm group-hover:scale-105 transition-transform">
                X
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">XtraCover B2E Admin</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">

            <div className="flex items-center gap-3 bg-slate-100/90 px-3.5 py-1.5 rounded-xl border border-slate-200">
              <div className="h-8 w-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {user?.name ? user.name[0] : 'A'}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">{user?.name || 'Admin'}</span>
                <span className="text-[10px] text-slate-500 font-semibold">{user?.role || 'Super Admin'}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Full Width Content Area */}
      <main className="w-full px-6 sm:px-8 lg:px-10 py-8 flex-1 space-y-6">

        {/* Error notification if DB fetch failed */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-rose-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errorMsg}</span>
            </div>
            <button onClick={loadSubmissions} className="text-xs font-bold text-rose-700 underline">
              Retry Connection
            </button>
          </div>
        )}

        {/* Summary Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total MSSQL Records</span>
              <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7M4 7c0-2 1.5-3 3.5-3h9c2 0 3.5 1 3.5 3M4 7h16" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">{totalEntries}</div>
            <div className="text-xs text-slate-500 font-medium mt-1">Database quote rows</div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">New Inquiries</span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-black text-amber-600 tracking-tight">{newInquiries}</div>
            <div className="text-xs text-amber-700/80 font-medium mt-1">Pending first contact</div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Quote Sent</span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-black text-blue-600 tracking-tight">{quoteSentCount}</div>
            <div className="text-xs text-blue-700/80 font-medium mt-1">Proposals dispatched</div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Closed / Converted</span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-600 tracking-tight">{closedCount}</div>
            <div className="text-xs text-emerald-700/80 font-medium mt-1">Fulfilled requirements</div>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="w-full md:w-96 relative">
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, contact, email, message..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:bg-white transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto text-xs pb-1 md:pb-0">
            <span className="text-slate-500 font-bold text-xs flex-shrink-0">Filter Status:</span>
            {['All', 'New Inquiry', 'Under Review', 'Quote Sent', 'Closed / Converted'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all flex-shrink-0 cursor-pointer ${statusFilter === status
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Business Quote Entries Table */}
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100/90 text-slate-700 uppercase tracking-wider text-[11px] font-bold border-b border-slate-200">
                <tr>
                  <th className="py-4 px-5">Name</th>
                  <th className="py-4 px-5">Contact</th>
                  <th className="py-4 px-5">Email</th>
                  <th className="py-4 px-5">Message</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5">Submitted Date</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-slate-400 text-xs">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="h-8 w-8 border-4 border-brand-600/30 border-t-brand-600 rounded-full animate-spin"></div>
                        <span>Querying Microsoft SQL Server RDS Database...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-slate-400 text-xs">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7M4 7c0-2 1.5-3 3.5-3h9c2 0 3.5 1 3.5 3M4 7h16" />
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-slate-800 text-sm">No Database Records Found</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/90 transition-colors">
                      <td className="py-4 px-5 font-bold text-slate-900">{item.name}</td>
                      <td className="py-4 px-5 font-mono text-slate-800">{item.contact}</td>
                      <td className="py-4 px-5 text-brand-600 font-semibold">{item.email}</td>
                      <td className="py-4 px-5 text-slate-700 max-w-xs truncate" title={item.message}>
                        {item.message}
                      </td>
                      <td className="py-4 px-5">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border focus:outline-none cursor-pointer ${item.status === 'New Inquiry'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : item.status === 'Quote Sent'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : item.status === 'Closed / Converted'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-purple-50 text-purple-800 border-purple-300'
                            }`}
                        >
                          <option value="New Inquiry">New Inquiry</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Quote Sent">Quote Sent</option>
                          <option value="Closed / Converted">Closed / Converted</option>
                        </select>
                      </td>
                      <td className="py-4 px-5 text-slate-500 text-[11px] font-mono">{item.submittedAt}</td>
                      <td className="py-4 px-5 text-right">
                        <button
                          onClick={() => setSelectedEntry(item)}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all shadow-xs cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Quote Entry Detail Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-mono text-slate-400">{selectedEntry.id}</span>
                <h3 className="text-lg font-black text-slate-900">{selectedEntry.name}</h3>
              </div>
              <button
                onClick={() => setSelectedEntry(null)}
                className="text-slate-400 hover:text-slate-700 p-1 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Contact Number</span>
                <span className="font-bold font-mono text-slate-900 block mt-1">{selectedEntry.contact}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Email Address</span>
                <span className="font-bold text-brand-600 block mt-1">{selectedEntry.email}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500 block text-[10px] uppercase font-bold mb-1.5">Submitted Message / Requirement</span>
              <p className="text-slate-800 font-medium leading-relaxed bg-white p-3 rounded-lg border border-slate-200">{selectedEntry.message}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-600 font-bold">Status:</span>
                <select
                  value={selectedEntry.status}
                  onChange={(e) => handleStatusChange(selectedEntry.id, e.target.value)}
                  className="bg-white border border-slate-300 text-slate-900 rounded-xl px-3 py-1.5 font-bold text-xs focus:outline-none cursor-pointer"
                >
                  <option value="New Inquiry">New Inquiry</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Quote Sent">Quote Sent</option>
                  <option value="Closed / Converted">Closed / Converted</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedEntry(null)}
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold shadow-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
