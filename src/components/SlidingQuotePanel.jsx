import { useState, useEffect } from 'react'
import Icon from './Icon'
import { apiSubmitQuote } from '../services/apiService'
import {
  sanitizeContactInput,
  validateName,
  validateContact,
  validateEmail,
  validateMessage,
  validateQuoteForm,
} from '../utils/validation'

const initialForm = {
  name: '',
  contact: '',
  email: '',
  message: '',
}

export default function SlidingQuotePanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(initialForm)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  function getFieldError(fieldName, value) {
    switch (fieldName) {
      case 'name':
        return validateName(value)
      case 'contact':
        return validateContact(value)
      case 'email':
        return validateEmail(value)
      case 'message':
        return validateMessage(value)
      default:
        return null
    }
  }

  function updateField(e) {
    const { name, value } = e.target
    const sanitizedVal = name === 'contact' ? sanitizeContactInput(value) : value

    setFormData((curr) => ({ ...curr, [name]: sanitizedVal }))
    setSubmitted(false)

    if (touched[name]) {
      const err = getFieldError(name, sanitizedVal)
      setErrors((prev) => ({ ...prev, [name]: err }))
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const err = getFieldError(name, value)
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const allTouched = { name: true, contact: true, email: true, message: true }
    setTouched(allTouched)

    const validationErrors = validateQuoteForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setLoading(true)
    try {
      await apiSubmitQuote(formData)
      setSubmitted(true)
      setFormData(initialForm)
      setTouched({})
      setErrors({})
    } catch (err) {
      alert(err.message || 'Failed to record quote request in database. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 z-[998] ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Floating Side Panel Container */}
      <div
        className={`fixed top-1/2 right-0 -translate-y-1/2 flex items-center transition-transform duration-400 ease-in-out z-[999] ${
          isOpen ? 'translate-x-0' : 'translate-x-[400px]'
        }`}
      >
        {/* Rotated Vertical Side Button (Compact Size) */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="group flex h-40 w-11 cursor-pointer flex-col items-center justify-center rounded-l-2xl bg-brand-600 text-white shadow-2xl shadow-brand-900/30 transition-all duration-300 hover:bg-brand-700 hover:w-12 active:scale-95 border-l border-y border-white/20"
          aria-label={isOpen ? 'Close quote form' : 'Open quote form'}
          title="Get Quote"
        >
          <div className="flex items-center gap-2 font-extrabold tracking-wider text-xs uppercase [writing-mode:vertical-rl] rotate-180 select-none">
            <span className="flex items-center gap-1.5">
              <Icon name="quote" className="h-4 w-4 rotate-90 transition-transform group-hover:scale-110" />
              Get Quote
            </span>
          </div>
        </button>

        {/* Sliding Form Box (Wider 400px Width) */}
        <div className="w-[400px] max-w-[calc(100vw-56px)] max-h-[88vh] overflow-y-auto rounded-l-2xl bg-white p-6.5 shadow-2xl shadow-slate-900/25 border-l border-y border-slate-100 text-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="text-lg font-black text-brand-950">Contact Sales</h3>
              <p className="text-xs text-slate-500">Request a customized business quote</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              aria-label="Close form"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
            <label className="grid gap-1.5 text-xs font-bold text-brand-950">
              Name
              <input
                required
                name="name"
                type="text"
                value={formData.name}
                onChange={updateField}
                onBlur={handleBlur}
                placeholder="Your full name"
                className={`h-10 rounded-lg border px-3 text-sm font-normal outline-none transition ${
                  touched.name && errors.name
                    ? 'border-red-500 ring-2 ring-red-100'
                    : 'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50'
                }`}
              />
              {touched.name && errors.name && (
                <span className="text-[11px] font-semibold text-red-500">{errors.name}</span>
              )}
            </label>

            <label className="grid gap-1.5 text-xs font-bold text-brand-950">
              Contact Number
              <input
                required
                name="contact"
                type="tel"
                value={formData.contact}
                onChange={updateField}
                onBlur={handleBlur}
                placeholder="+91 98765 43210"
                className={`h-10 rounded-lg border px-3 text-sm font-normal outline-none transition ${
                  touched.contact && errors.contact
                    ? 'border-red-500 ring-2 ring-red-100'
                    : 'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50'
                }`}
              />
              {touched.contact && errors.contact && (
                <span className="text-[11px] font-semibold text-red-500">{errors.contact}</span>
              )}
            </label>

            <label className="grid gap-1.5 text-xs font-bold text-brand-950">
              Email
              <input
                required
                name="email"
                type="email"
                value={formData.email}
                onChange={updateField}
                onBlur={handleBlur}
                placeholder="name@company.com"
                className={`h-10 rounded-lg border px-3 text-sm font-normal outline-none transition ${
                  touched.email && errors.email
                    ? 'border-red-500 ring-2 ring-red-100'
                    : 'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50'
                }`}
              />
              {touched.email && errors.email && (
                <span className="text-[11px] font-semibold text-red-500">{errors.email}</span>
              )}
            </label>

            <label className="grid gap-1.5 text-xs font-bold text-brand-950">
              Message
              <textarea
                required
                name="message"
                rows="3"
                value={formData.message}
                onChange={updateField}
                onBlur={handleBlur}
                placeholder="Share the device category, quantity, preferred configuration, delivery city and any specific requirements"
                className={`resize-y rounded-lg border p-3 text-sm font-normal outline-none transition ${
                  touched.message && errors.message
                    ? 'border-red-500 ring-2 ring-red-100'
                    : 'border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-50'
                }`}
              />
              {touched.message && errors.message && (
                <span className="text-[11px] font-semibold text-red-500">{errors.message}</span>
              )}
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-brand-600 px-4 text-sm font-bold text-white shadow-md shadow-brand-600/20 transition hover:bg-brand-700 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Get Quote'}
            </button>

            <p className="mt-2 text-center text-[10px] text-slate-400">
              By submitting, you agree to be contacted regarding your business requirement.
            </p>

            {submitted && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="success-title"
              >
                <div className="relative w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="absolute right-4 top-4 h-10 w-10 text-3xl text-slate-400 transition hover:text-slate-700"
                    aria-label="Close popup"
                  >
                    ×
                  </button>

                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
                    ✓
                  </div>

                  <h3
                    id="success-title"
                    className="text-xl font-bold text-slate-900"
                  >
                    Thank you!
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Your request has been submitted successfully.
                    <br />
                    We will get in touch with you shortly to discuss the best solution for
                    your needs.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-xl bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  )
}

