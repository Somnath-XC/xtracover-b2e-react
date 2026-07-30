import { useEffect, useState } from 'react'
import Icon from './Icon'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`back-to-top ${visible ? 'is-visible' : ''}`}
      aria-label="Back to top"
      title="Back to top"
    >
      <Icon name="arrowUp" className="h-5 w-5" />
    </button>
  )
}
