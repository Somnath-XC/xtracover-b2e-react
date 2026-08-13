/**
 * Form validation and sanitization utilities for contact forms
 */

/**
 * Sanitizes contact input to prevent alphabets and invalid special characters from being entered.
 * Allows digits (0-9), optional leading '+', spaces, and hyphens '-'.
 * Max length of 17 characters (including + prefix and spaces).
 */
export function sanitizeContactInput(value) {
  if (typeof value !== 'string') return ''
  
  // Preserve leading '+' if present at index 0, filter out all other non-digit, non-space, non-hyphen chars
  let cleaned = value.replace(/[^0-9+\s-]/g, '')
  
  // Prevent multiple '+' or '+' in middle of string
  if (cleaned.includes('+')) {
    const startsWithPlus = cleaned.startsWith('+')
    cleaned = (startsWithPlus ? '+' : '') + cleaned.replace(/\+/g, '')
  }
  
  // Limit max length to 15 characters (e.g. +91 98765 43210)
  return cleaned.slice(0, 15)
}

/**
 * Validates a full name input.
 * Returns an error message string if invalid, or null if valid.
 */
export function validateName(name) {
  if (!name || !name.trim()) {
    return 'Full name is required.'
  }
  const trimmed = name.trim()
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters.'
  }
  if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
    return 'Name can only contain letters, spaces, dots, and hyphens.'
  }
  return null
}

/**
 * Validates a contact phone number input against Indian mobile number standards (10 digits starting with 6-9, with optional +91/91/0 prefix).
 * Returns an error message string if invalid, or null if valid.
 */
export function validateContact(contact) {
  if (!contact || !contact.trim()) {
    return 'Contact number is required.'
  }
  
  // Check if contact contains any alphabets (fail fast)
  if (/[a-zA-Z]/.test(contact)) {
    return 'Contact number cannot contain letters.'
  }

  // Indian mobile regex: optional +91, 91, or 0 prefix followed by 10 digits starting with 6, 7, 8, or 9
  const indianMobileRegex = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/
  if (!indianMobileRegex.test(contact.trim())) {
    return 'Please enter a valid phone number.'
  }

  return null
}

/**
 * Validates an email address.
 * Returns an error message string if invalid, or null if valid.
 */
export function validateEmail(email) {
  if (!email || !email.trim()) {
    return 'Email address is required.'
  }
  const trimmed = email.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address.'
  }
  return null
}

/**
 * Validates a message input.
 * Returns an error message string if invalid, or null if valid.
 */
export function validateMessage(message) {
  if (!message || !message.trim()) {
    return 'Message is required.'
  }
  return null
}

/**
 * Validates the complete quote form data object.
 * Returns an object containing error messages for invalid fields, or empty object if all valid.
 */
export function validateQuoteForm(formData) {
  const errors = {}

  const nameErr = validateName(formData.name)
  if (nameErr) errors.name = nameErr

  const contactErr = validateContact(formData.contact)
  if (contactErr) errors.contact = contactErr

  const emailErr = validateEmail(formData.email)
  if (emailErr) errors.email = emailErr

  const messageErr = validateMessage(formData.message)
  if (messageErr) errors.message = messageErr

  return errors
}
