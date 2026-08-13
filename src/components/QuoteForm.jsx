import { useState } from 'react'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
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

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(initialForm)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

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

  function updateField(event) {
    const { name, value } = event.target
    const sanitizedVal = name === 'contact' ? sanitizeContactInput(value) : value

    setFormData((current) => ({ ...current, [name]: sanitizedVal }))
    setSubmitted(false)

    if (touched[name]) {
      const err = getFieldError(name, sanitizedVal)
      setErrors((prev) => ({ ...prev, [name]: err }))
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const err = getFieldError(name, value)
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    // Touch all fields to show validation errors if empty or invalid
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
    <section id="quote" className="quote-bg section-space text-white">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading
            light
            eyebrow="Business enquiry"
            title="Request a business quote"
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {['Bulk laptop requirements', 'Configuration guidance', 'PAN-India Services', 'Quality Check Process'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-blue-100/80">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-blue-200">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={90}>
          <form onSubmit={handleSubmit} className="rounded-[28px] bg-white p-6 text-slate-900 shadow-2xl shadow-black/20 md:p-8" noValidate>
            <div className="mb-6">
              <h3 className="mt-1 text-xl font-black text-brand-950">Contact Sales</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Name Field */}
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
                  className={`min-h-[48px] rounded-lg border px-4 text-sm font-normal outline-none transition ${
                    touched.name && errors.name
                      ? 'border-red-500 ring-2 ring-red-100'
                      : 'border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50'
                  }`}
                />
                {touched.name && errors.name && (
                  <span className="text-[11px] font-semibold text-red-500">{errors.name}</span>
                )}
              </label>

              {/* Contact Field */}
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
                  className={`min-h-[48px] rounded-lg border px-4 text-sm font-normal outline-none transition ${
                    touched.contact && errors.contact
                      ? 'border-red-500 ring-2 ring-red-100'
                      : 'border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50'
                  }`}
                />
                {touched.contact && errors.contact && (
                  <span className="text-[11px] font-semibold text-red-500">{errors.contact}</span>
                )}
              </label>

              {/* Email Field */}
              <label className="grid gap-1.5 text-xs font-bold text-brand-950 sm:col-span-2">
                Email
                <input
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={updateField}
                  onBlur={handleBlur}
                  placeholder="name@company.com"
                  className={`min-h-[48px] rounded-lg border px-4 text-sm font-normal outline-none transition ${
                    touched.email && errors.email
                      ? 'border-red-500 ring-2 ring-red-100'
                      : 'border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50'
                  }`}
                />
                {touched.email && errors.email && (
                  <span className="text-[11px] font-semibold text-red-500">{errors.email}</span>
                )}
              </label>

              {/* Message Field */}
              <label className="grid gap-1.5 text-xs font-bold text-brand-950 sm:col-span-2">
                Message
                <textarea
                  required
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={updateField}
                  onBlur={handleBlur}
                  placeholder="Share the device category, quantity, preferred configuration, delivery city and any specific requirements"
                  className={`resize-y rounded-lg border px-4 py-3 text-sm font-normal outline-none transition ${
                    touched.message && errors.message
                      ? 'border-red-500 ring-2 ring-red-100'
                      : 'border-slate-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-50'
                  }`}
                />
                {touched.message && errors.message && (
                  <span className="text-[11px] font-semibold text-red-500">{errors.message}</span>
                )}
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Get Quote'}
            </button>

            <p className="mt-3 text-center text-[13px] text-slate-600">
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
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-4xl leading-none text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
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
        </Reveal>
      </div>
    </section>
  )
}

