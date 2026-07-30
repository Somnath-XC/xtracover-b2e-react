// Frontend API Client for communicating with Node.js Express & MSSQL Backend

function getAuthHeaders() {
  const token = localStorage.getItem('xtra_admin_token') || sessionStorage.getItem('xtra_admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }
}

// 1. Admin Login API Call
export async function apiLoginAdmin(email, password) {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Authentication failed.')
  }
  return data
}

// 2. Submit Business Quote Request (Public)
export async function apiSubmitQuote(formData) {
  const response = await fetch('/api/quotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Failed to submit quote request.')
  }
  return data
}

// 3. Get All Quote Submissions from Database (Protected)
export async function apiGetQuotes() {
  const response = await fetch('/api/quotes', {
    method: 'GET',
    headers: getAuthHeaders()
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch quote submissions.')
  }
  return data.quotes || []
}

// 4. Update Quote Status in Database (Protected)
export async function apiUpdateQuoteStatus(id, status) {
  const response = await fetch(`/api/quotes/${encodeURIComponent(id)}/status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ status })
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update quote status.')
  }
  return data
}

// 5. Delete Quote Entry from Database (Protected)
export async function apiDeleteQuote(id) {
  const response = await fetch(`/api/quotes/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete quote entry.')
  }
  return data
}

// 6. Clear All Quotes from Database (Protected)
export async function apiClearQuotes() {
  const response = await fetch('/api/quotes', {
    method: 'DELETE',
    headers: getAuthHeaders()
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Failed to clear quotes.')
  }
  return data
}
