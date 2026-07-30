// Centralized Service for managing Business Quote Submissions in localStorage & sync

const STORAGE_KEY = 'xtracover_business_quotes'

// Retrieve all quote submissions (defaults to [] empty array)
export function getQuoteSubmissions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (err) {
    console.error('Error reading quote submissions:', err)
    return []
  }
}

// Save a new quote submission from the QuoteForm
export function saveQuoteSubmission(formData) {
  try {
    const existing = getQuoteSubmissions()
    const newEntry = {
      id: `REQ-${Math.floor(100000 + Math.random() * 900000)}`,
      name: formData.name.trim(),
      contact: formData.contact.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      status: 'New Inquiry',
      submittedAt: new Date().toLocaleString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }

    const updated = [newEntry, ...existing]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    
    // Notify all open tabs & reactive listeners
    window.dispatchEvent(new Event('xtra_quote_updated'))
    return newEntry
  } catch (err) {
    console.error('Error saving quote submission:', err)
    return null
  }
}

// Update status of an existing entry
export function updateQuoteStatus(id, newStatus) {
  try {
    const existing = getQuoteSubmissions()
    const updated = existing.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('xtra_quote_updated'))
    return updated
  } catch (err) {
    console.error('Error updating quote status:', err)
    return []
  }
}

// Clear all quote submissions
export function clearQuoteSubmissions() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new Event('xtra_quote_updated'))
  } catch (err) {
    console.error('Error clearing quote submissions:', err)
  }
}
