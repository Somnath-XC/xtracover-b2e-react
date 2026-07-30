import { useState } from 'react'
import Icon from './Icon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const initialForm = {
  name: '',
  contact: '',
  email: '',
  message: '',
}

const fields = [
  ['Name', 'name', 'text', 'Your full name'],
  ['Contact', 'contact', 'tel', '+91'],
]

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState(initialForm)

  function updateField(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setSubmitted(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    setFormData(initialForm)
  }

  return (
    <section id="quote" className="quote-bg section-space text-white">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[.78fr_1.22fr]">
        <Reveal>
          <SectionHeading
            light
            eyebrow="Business enquiry"
            title="Request a Business Quote"
            text="Tell us what your organisation needs. Our business team will recommend suitable laptop configurations and commercial options based on current inventory. "
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {['Bulk laptop requirements', 'Mixed device enquiries', 'Configuration guidance', 'Delivery coordination', 'Warranty support'].map((item) => (
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
          <form onSubmit={handleSubmit} className="rounded-[28px] bg-white p-6 text-slate-900 shadow-2xl shadow-black/20 md:p-8">
            <div className="mb-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-600">Tell us about your requirement</p>
              <h3 className="mt-1 text-xl font-black text-brand-950">Request a business quote</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {fields.slice(0, 2).map(([label, name, type, placeholder]) => (
                <label key={name} className="grid gap-2 text-xs font-bold text-brand-950">
                  {label}
                  <input
                    required
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={updateField}
                    placeholder={placeholder}
                    className="min-h-[48px] rounded-lg border border-slate-200 px-4 text-sm font-normal outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-50"
                  />
                </label>
              ))}

              <label className="grid gap-2 text-xs font-bold text-brand-950 sm:col-span-2">
                Email
                <input
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={updateField}
                  placeholder="name@company.com"
                  className="min-h-[48px] rounded-lg border border-slate-200 px-4 text-sm font-normal outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-50"
                />
              </label>

              <label className="grid gap-2 text-xs font-bold text-brand-950 sm:col-span-2">
                Message
                <textarea
                  required
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={updateField}
                  placeholder="Share the device category, quantity, preferred configuration, delivery city and any specific requirements"
                  className="resize-y rounded-lg border border-slate-200 px-4 py-3 text-sm font-normal outline-none transition focus:border-brand-400 focus:ring-4 focus:ring-brand-50"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center rounded-lg bg-brand-600 px-6 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Get Business Quote
            </button>

            <p className="mt-3 text-center text-[10px] text-slate-400">
              By submitting, you agree to be contacted regarding your business requirement.
            </p>

            {submitted && (
              <div role="status" className="mt-4 rounded-xl bg-blue-50 p-4 text-sm font-semibold text-brand-700">
                Thank you. Your requirement has been recorded for the XtraCover business team.
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
