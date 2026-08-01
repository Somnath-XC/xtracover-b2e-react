import { useEffect, useMemo, useState } from 'react'
import Reveal from './Reveal'
import { laptopSystemInfo, laptopTests } from '../data/qualityChecks'
import laptopImg  from "../assets/laptop-img.png"; 

const laptopInfoCount = Object.values(laptopSystemInfo).reduce((total, items) => total + items.length, 0)
const automaticLaptopTests = laptopTests.filter((test) => test.type === 'Automatic').length
const assistedLaptopTests = laptopTests.length - automaticLaptopTests
const normalize = (value) => value.trim().toLowerCase()

export default function QualityCheck() {
  const [isOpen, setIsOpen] = useState(false)
  const [laptopTab, setLaptopTab] = useState('tests')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  useEffect(() => {
    setSearchQuery('')
  }, [isOpen, laptopTab])

  const filteredLaptopTests = useMemo(() => {
    const query = normalize(searchQuery)
    if (!query) return laptopTests

    return laptopTests.filter(
      (test) => test.name.toLowerCase().includes(query) || test.type.toLowerCase().includes(query),
    )
  }, [searchQuery])

  const filteredLaptopSystemInfo = useMemo(() => {
    const query = normalize(searchQuery)
    if (!query) return laptopSystemInfo

    return Object.entries(laptopSystemInfo).reduce((result, [category, fields]) => {
      const categoryMatches = category.toLowerCase().includes(query)
      const matchingFields = fields.filter((field) => field.toLowerCase().includes(query))

      if (categoryMatches || matchingFields.length > 0) {
        result[category] = categoryMatches ? fields : matchingFields
      }

      return result
    }, {})
  }, [searchQuery])

  const openDetails = (tab) => {
    setLaptopTab(tab)
    setSearchQuery('')
    setIsOpen(true)
  }

  return (
    <section id="quality" className="qc-section qc-certificate-section relative overflow-hidden">
      <div className="qc-section-grid" aria-hidden="true" />
      <div className="qc-section-glow qc-section-glow-left" />
      <div className="qc-section-glow qc-section-glow-right" />

      <div className="container-site relative z-10">
        <div className="qc-verify-layout">
          <Reveal>
            <div className="qc-verify-copy">
              <div className="qc-eyebrow"><span />Quality you can verify</div>
              <h2>
                <span className="block qc-heading-line">Every Laptop Comes</span>
                <span className="block qc-heading-line">with a QC Certificate</span>
              </h2>

              <p>
                Every single laptop undergoes a rigorous 67-parameter diagnostic inspection powered by XCQC, the quality-check engine trusted by leading OEMs, major brands, and top marketplaces like Flipkart.
              </p>

              <div className="qc-marketplace-badge" aria-label="QC software used by Flipkart">
                <span><ShieldIcon /></span>
                <span>QC software used by <strong>Flipkart</strong></span>
              </div>

              <div className="qc-verify-actions">
                <button type="button" className="qc-primary-action" onClick={() => openDetails('tests')}>
                  Test Parameters
                  <ArrowIcon />
                </button>
                
                <a
                  className="qc-secondary-action qc-certificate-action"
                  href="https://grading.xtracover.com/certificate/b60a3acf-b6e4-4365-b3dc-ee27a94f0aaa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="qc-pdf-icon" aria-hidden="true">
                    <CertificateFileIcon />
                  </span>
                  View QC Certificate
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <article className="qc-certificate-preview" aria-label="Digital QC certificate overview">
              <div className="qc-certificate-topline">
                <span className="qc-certificate-icon"><ShieldIcon /></span>
                <div>
                  <span>Quality Check certificate</span>
                  <strong>XCQC Quality Report</strong>
                </div>
                <em>67 parameters</em>
              </div>

              <div className="qc-certificate-device">
                <div className="qc-slick-device-icon" aria-hidden="true">
                  <img src={laptopImg} alt="Laptop Quality verified" />
                  <span className="qc-device-icon-orbit qc-device-icon-orbit-one" />
                  <span className="qc-device-icon-orbit qc-device-icon-orbit-two" />
                </div>
                <div>
                  <span>Certificate status</span>
                  <strong>Quality verified</strong>
                  <p>Complete, auditable visibility before dispatch.</p>
                </div>
              </div>

              <div className="qc-certificate-metrics">
                <CertificateMetric label="Battery health" icon={<BatteryIcon />} />
                <CertificateMetric label="Display integrity" icon={<DisplayIcon />} />
                <CertificateMetric label="Ports & thermals" icon={<PortsIcon />} />
                <CertificateMetric label="Overall performance" icon={<PerformanceIcon />} />
              </div>

              <div className="qc-certificate-footer">
                <span><CheckIcon /> Digital QC certificate issued</span>
                <strong>XCQC verified</strong>
              </div>
            </article>
          </Reveal>
        </div>
      </div>

      {isOpen ? (
        <DiagnosticsModal
          laptopTab={laptopTab}
          setLaptopTab={setLaptopTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredLaptopTests={filteredLaptopTests}
          filteredLaptopSystemInfo={filteredLaptopSystemInfo}
          onClose={() => setIsOpen(false)}
        />
      ) : null}
    </section>
  )
}

function CertificateFileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3.75h6.8L18.25 8v12.25H7V3.75Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M13.5 3.75V8h4.75M9.75 12h5.5M9.75 15.25h5.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DiagnosticsModal({
  laptopTab,
  setLaptopTab,
  searchQuery,
  setSearchQuery,
  filteredLaptopTests,
  filteredLaptopSystemInfo,
  onClose,
}) {
  const resultCount = laptopTab === 'tests'
    ? filteredLaptopTests.length
    : Object.values(filteredLaptopSystemInfo).reduce((total, fields) => total + fields.length, 0)

  return (
    <div className="qc-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="qc-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="qc-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="qc-modal-header">
          <div>
            <span>01 / QC APPLICATION</span>
            <h3 id="qc-modal-title">Laptop QC Support Specifications</h3>
            <p>{laptopTests.length} diagnostics + {laptopInfoCount} system fields</p>
          </div>
          <button type="button" className="qc-modal-close" onClick={onClose} aria-label="Close diagnostics panel">×</button>
        </header>

        <div className="qc-modal-controls">
          <div className="qc-modal-tabs" role="tablist" aria-label="Laptop quality information">
            <button
              type="button"
              role="tab"
              aria-selected={laptopTab === 'tests'}
              className={laptopTab === 'tests' ? 'is-active' : ''}
              onClick={() => setLaptopTab('tests')}
            >
              Diagnostic Tests ({laptopTests.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={laptopTab === 'system'}
              className={laptopTab === 'system' ? 'is-active' : ''}
              onClick={() => setLaptopTab('system')}
            >
              System Info ({laptopInfoCount})
            </button>
          </div>

          <label className="qc-search-field">
            <SearchIcon />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={laptopTab === 'tests' ? 'Search test parameters...' : 'Search system information...'}
              aria-label={laptopTab === 'tests' ? 'Search laptop test parameters' : 'Search laptop system information'}
            />
            {searchQuery ? (
              <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">×</button>
            ) : null}
          </label>
        </div>

        <div className="qc-results-bar" role="status" aria-live="polite">
          <span>{searchQuery ? `${resultCount} matching results` : `${resultCount} items shown`}</span>
          {searchQuery ? <strong>Search: {searchQuery}</strong> : null}
        </div>

        <div className="qc-modal-content">
          {laptopTab === 'tests' ? <LaptopTests tests={filteredLaptopTests} /> : null}
          {laptopTab === 'system' ? <LaptopSystemInfo groups={filteredLaptopSystemInfo} /> : null}
        </div>
      </section>
    </div>
  )
}

function LaptopTests({ tests }) {
  if (tests.length === 0) return <EmptyState message="No matching laptop tests found." />

  return (
    <div>
      <div className="qc-count-strip">
        <CountPill value={automaticLaptopTests} label="Automatic tests" />
        <CountPill value={assistedLaptopTests} label="Assisted tests" />
        <CountPill value={tests.length} label="Results shown" />
      </div>
      <div className="qc-test-grid">
        {tests.map((test, index) => (
          <div key={test.name} className="qc-test-item">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{test.name}</strong>
            <em className={test.type === 'Automatic' ? 'is-automatic' : 'is-assisted'}>{test.type}</em>
          </div>
        ))}
      </div>
    </div>
  )
}

function LaptopSystemInfo({ groups }) {
  if (Object.keys(groups).length === 0) return <EmptyState message="No matching system information found." />

  return (
    <div className="qc-category-grid">
      {Object.entries(groups).map(([category, items]) => (
        <section key={category} className="qc-category-card">
          <header>
            <strong>{category}</strong>
            <span>{items.length} fields</span>
          </header>
          <ul>
            {items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      ))}
    </div>
  )
}

function CertificateMetric({ label, icon }) {
  return (
    <div>
      <span>{icon}</span>
      <strong>{label}</strong>
      <i aria-hidden="true"><CheckIcon /></i>
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <div className="qc-empty-state">
      <SearchIcon />
      <strong>{message}</strong>
      <span>Try another test name, component, field, or test type.</span>
    </div>
  )
}

function CountPill({ value, label }) {
  return (
    <div className="qc-count-pill">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}



function BatteryIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="6.5" width="15" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M18.5 10h2v4h-2M7.2 12h7" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

function DisplayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 20h6M12 16.5V20" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

function PortsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4v5m8-5v5M6 9h12v3.5a6 6 0 0 1-12 0V9Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <path d="M12 18.5V21" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

function PerformanceIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.5 17a8 8 0 1 1 15 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <path d="m12 13 4-4M8 17h8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.7 19 5.6v5.1c0 4.7-2.8 8.8-7 10.6-4.2-1.8-7-5.9-7-10.6V5.6l7-2.9Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m8.8 12 2.1 2.1 4.4-4.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6.5 12.2 3.2 3.2 7.8-8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  )
}
