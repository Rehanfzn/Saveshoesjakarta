import { useState, useEffect } from 'react'
import './Navbar.css'

const NAV_ITEMS = [
  { label: 'Beranda', href: '#home' },
  { label: 'Mengapa Kami', href: '#why-us' },
  { label: 'Layanan', href: '#services' },
  { label: 'Cara Order', href: '#how-it-works' },
  { label: 'Kontak', href: '#contact' },
]

const SECTION_IDS = ['home', 'why-us', 'services', 'gallery', 'faq', 'how-it-works', 'contact']

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers = []
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (!el) continue
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    }
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const isActive = (href) => activeId === href.replace('#', '')

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="navbar-logo" onClick={(e) => handleNavClick(e, '#home')}>
          <img
            className="logo-icon"
            src="/Logo%20save%20shoes.jpg"
            alt="Save Shoes Jakarta"
          />
          <span className="logo-text">SAVE <span className="logo-accent">SHOES</span></span>
        </a>

        <div className={`navbar-menu${menuOpen ? ' active' : ''}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link${isActive(item.href) ? ' active' : ''}`}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          className={`navbar-toggle${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
