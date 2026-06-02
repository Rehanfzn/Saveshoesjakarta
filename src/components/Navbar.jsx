import { useState, useEffect, useRef } from 'react'
import './Navbar.css'

const NAV_ITEMS = [
  { type: 'link', label: 'Beranda', href: '#home' },
  { type: 'link', label: 'Tentang Kami', href: '#why-us' },
  { type: 'link', label: 'Layanan', href: '#services' },
  { type: 'link', label: 'Bahan Sepatu', href: '#gallery' },
  {
    type: 'dropdown',
    label: 'Store',
    items: [
      { label: 'Kedoya', href: '#store-kedoya' },
      { label: 'Trisakti', href: '#store-trisakti', note: 'Toko Tutup' },
    ],
  },
  { type: 'link', label: 'Kontak', href: '#contact' },
]

const SECTION_IDS = ['home', 'why-us', 'services', 'gallery', 'faq', 'how-it-works', 'contact']

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [storeOpen, setStoreOpen] = useState(false)
  const dropdownRef = useRef(null)

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setStoreOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    setStoreOpen(false)
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
          {NAV_ITEMS.map((item) => {
            if (item.type === 'link') {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`nav-link${isActive(item.href) ? ' active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              )
            }

            return (
              <div
                key={item.label}
                className="nav-dropdown"
                ref={dropdownRef}
                onMouseEnter={() => setStoreOpen(true)}
                onMouseLeave={() => setStoreOpen(false)}
              >
                <button
                  className={`nav-dropdown-toggle${storeOpen ? ' active' : ''}`}
                  onClick={() => setStoreOpen((prev) => !prev)}
                  aria-haspopup="true"
                  aria-expanded={storeOpen}
                >
                  {item.label}
                  <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div className={`nav-dropdown-menu${storeOpen ? ' show' : ''}`}>
                  <div className="nav-dropdown-header">Daftar Cabang</div>
                  {item.items.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      className="nav-dropdown-item"
                      onClick={(e) => handleNavClick(e, sub.href)}
                    >
                      <span>{sub.label}</span>
                      {sub.note && <span className="nav-dropdown-note">{sub.note}</span>}
                    </a>
                  ))}
                </div>

                <div className="nav-dropdown-mobile">
                  <div className="nav-dropdown-header">Daftar Cabang</div>
                  {item.items.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      className="nav-link nav-dropdown-mobile-link"
                      onClick={(e) => handleNavClick(e, sub.href)}
                    >
                      {sub.label}
                      {sub.note && <span className="nav-dropdown-note">{sub.note}</span>}
                    </a>
                  ))}
                </div>
              </div>
            )
          })}
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
