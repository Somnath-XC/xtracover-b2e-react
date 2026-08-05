import { useEffect, useState } from 'react'
import { navItems } from '../data/content'
import logo from "../assets/logo.svg";


const STICKY_SCROLL_THRESHOLD = 200

export default function Header() {
  const [open, setOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    let animationFrameId = 0

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const handleResize = () => {
      if (window.innerWidth >= 1280) setOpen(false)
    }

    const updateStickyState = () => {
      const shouldBeSticky = window.scrollY >= STICKY_SCROLL_THRESHOLD
      setSticky((currentValue) => (
        currentValue === shouldBeSticky ? currentValue : shouldBeSticky
      ))
      animationFrameId = 0
    }

    const handleScroll = () => {
      if (animationFrameId) return
      animationFrameId = window.requestAnimationFrame(updateStickyState)
    }

    updateStickyState()
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`site-header-slot ${sticky ? 'is-sticky' : ''}`}>
      <header className={`site-header ${sticky ? 'is-sticky' : ''}`}>
        <div className="site-header-inner container-site flex h-[68px] items-center gap-7">
          <a href="/" className="site-header-logo flex items-center gap-2.5" aria-label="XtraCover Business home">
            <span className="site-header-brand text-lg font-bold tracking-[-0.03em] text-brand-950"><img src={logo} alt="XtraCover Logo" /></span>
            <span className="hidden rounded-full bg-brand-50 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.17em] text-brand-600 sm:inline">Corporate</span>
          </a>

          <nav className="ml-auto hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="header-nav-link text-xs font-semibold text-slate-600">
                {label}
              </a>
            ))}
          </nav>

          <a href="#quote" className="ml-2 hidden rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-brand-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl xl:inline-flex">Get Quote</a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className={`hamburger-button ml-auto grid xl:hidden ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`mobile-menu-shell grid xl:hidden ${open ? 'is-open' : ''}`}
          aria-hidden={!open}
        >
          <nav className="mobile-menu-panel bg-white px-3" aria-label="Mobile navigation">
            <div className="container-site grid gap-1">
              {navItems.map(([label, href], index) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="mobile-menu-link rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-600"
                  style={{ '--menu-delay': `${index * 45}ms` }}
                  tabIndex={open ? 0 : -1}
                >
                  {label}
                </a>
              ))}
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="mobile-menu-link mt-2 rounded-xl bg-brand-600 px-5 py-3 text-center text-sm font-semibold text-white"
                style={{ '--menu-delay': `${navItems.length * 45}ms` }}
                tabIndex={open ? 0 : -1}
              >
                Get Quote
              </a>
            </div>
          </nav>
        </div>
      </header>
    </div>
  )
}
