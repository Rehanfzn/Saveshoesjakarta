import { useState, useRef, useEffect, useCallback } from 'react'
import useReveal from '../hooks/useReveal'
import './BeforeAfter.css'

const examples = [
  {
    before: new URL('../assets/images/hero-shoe.jpg', import.meta.url).href,
    after: new URL('../assets/images/deep-clean.jpg', import.meta.url).href,
    label: 'Deep Cleaning',
    desc: 'Sepatu putih kotor kembali bersih bersinar setelah perawatan deep cleaning.',
  },
  {
    before: new URL('../assets/images/gallery-1.jpg', import.meta.url).href,
    after: new URL('../assets/images/repaint.jpg', import.meta.url).href,
    label: 'Repaint & Restoration',
    desc: 'Warna sepatu yang pudar dikembalikan dengan cat premium, hasil seperti baru.',
  },
  {
    before: new URL('../assets/images/unyellowing.jpg', import.meta.url).href,
    after: new URL('../assets/images/hero-shoe.jpg', import.meta.url).href,
    label: 'Unyellowing',
    desc: 'Sol sepatu yang menguning kembali putih cemerlang tanpa residu kimia.',
  },
]

function Slider({ before, after, label, desc }) {
  const containerRef = useRef(null)
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const cardRef = useReveal()

  const updatePos = useCallback((clientX) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPos((x / rect.width) * 100)
  }, [])

  const onMouseDown = (e) => {
    setDragging(true)
    updatePos(e.clientX)
  }

  const onTouchStart = (e) => {
    setDragging(true)
    updatePos(e.touches[0].clientX)
  }

  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => updatePos(e.clientX)
    const onTouchMove = (e) => updatePos(e.touches[0].clientX)
    const onUp = () => setDragging(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging, updatePos])

  return (
    <div className="ba-card reveal" ref={cardRef}>
      <div className="ba-slider" ref={containerRef}>
        <div className="ba-after">
          <img src={after} alt={`${label} - Setelah`} draggable={false} />
        </div>
        <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={before} alt={`${label} - Sebelum`} draggable={false} />
          <div className="ba-before-label">Sebelum</div>
        </div>
        <div
          className="ba-handle"
          style={{ left: `${pos}%` }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          role="slider"
          tabIndex={0}
          aria-label="Slider perbandingan sebelum dan sesudah"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 2))
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 2))
          }}
        >
          <div className="ba-handle-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>
      <div className="ba-info">
        <h3 className="ba-label">{label}</h3>
        <p className="ba-desc">{desc}</p>
      </div>
    </div>
  )
}

function BeforeAfter() {
  const headerRef = useReveal()

  return (
    <section className="ba-section" id="before-after">
      <div className="ba-container">
        <div className="ba-header reveal" ref={headerRef}>
          <span className="ba-eyebrow">Hasil Pekerjaan</span>
          <h2 className="ba-title">
            Lihat Sendiri{' '}
            <span className="ba-title-accent">Perbedaannya</span>
          </h2>
          <p className="ba-desc">
            Geser slider untuk melihat langsung perbedaan sebelum dan sesudah
            perawatan dari tim profesional kami.
          </p>
        </div>

        <div className="ba-grid">
          {examples.map((ex, i) => (
            <Slider key={i} {...ex} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BeforeAfter
