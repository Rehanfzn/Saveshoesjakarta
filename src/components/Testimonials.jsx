import { useState, useEffect, useCallback } from 'react'
import useReveal from '../hooks/useReveal'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Ahmad Rizki',
    role: 'Pelanggan Setia',
    avatar: null,
    rating: 5,
    text: 'Sepatu putih kesayangan saya jadi kinclong lagi! Deep cleaning-nya beneran bersih sampai ke dalam. Antar-jemput juga cepat. Recommended banget!',
  },
  {
    name: 'Sarah Wijaya',
    role: 'Pelanggan Baru',
    avatar: null,
    rating: 5,
    text: 'Baru pertama coba dan hasilnya luar biasa. Unyellowing midsole sepatu Nike saya berhasil, sol yang tadinya kuning jadi putih lagi. Thanks Save Shoes!',
  },
  {
    name: 'Dimas Prasetyo',
    role: 'Pelanggan Setia',
    avatar: null,
    rating: 5,
    text: 'Udah 3 kali pake jasa ini. Kualitas konsisten, harga masuk akal, dan kurirnya tepat waktu. Sepatu leather saya dirawat dengan sangat baik.',
  },
  {
    name: 'Maya Anggraini',
    role: 'Pelanggan Baru',
    avatar: null,
    rating: 4,
    text: 'Repaint sepatu favorit saya hasilnya memuaskan. Warnanya kembali tajam seperti baru. Cuma prosesnya agak lama karena lagi high season.',
  },
  {
    name: 'Fajar Nugroho',
    role: 'Pelanggan Setia',
    avatar: null,
    rating: 5,
    text: 'Pelayanan ramah dan profesional. Timnya juga komunikatif via WhatsApp. Sepatu saya yang suede ditangani dengan hati-hati. Pasti balik lagi!',
  },
  {
    name: 'Dinda Permata',
    role: 'Pelanggan Baru',
    avatar: null,
    rating: 5,
    text: 'Awalnya ragu karena takut rusak, tapi ternyata aman banget. Hasil deep cleaning dan unyellowing bikin sepatu seperti baru lagi. 10/10!',
  },
]

function StarRating({ count }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`star${i < count ? ' filled' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < count ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const headerRef = useReveal()

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [paused, next])

  const goTo = (i) => {
    setActive(i)
    setPaused(true)
    setTimeout(() => setPaused(false), 8000)
  }

  const visible = []
  const total = testimonials.length
  for (let i = -1; i <= 1; i++) {
    const idx = (active + i + total) % total
    visible.push({ index: idx, position: i })
  }

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-header reveal" ref={headerRef}>
          <span className="testimonials-eyebrow">Testimoni</span>
          <h2 className="testimonials-title">
            Apa Kata{' '}
            <span className="testimonials-title-accent">Pelanggan Kami</span>
          </h2>
          <p className="testimonials-desc">
            Kepuasan pelanggan adalah prioritas utama kami. Berikut beberapa
            pengalaman mereka setelah menggunakan layanan Save Shoes Jakarta.
          </p>
        </div>

        <div
          className="testimonials-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="carousel-track">
            {visible.map(({ index, position }) => {
              const t = testimonials[index]
              return (
                <div
                  key={index}
                  className={`carousel-card${position === 0 ? ' active' : ''}`}
                  style={{ transform: `translateX(${position * 100}%) scale(${position === 0 ? 1 : 0.88})`, opacity: position === 0 ? 1 : 0.4, zIndex: position === 0 ? 2 : 1 }}
                  onClick={() => goTo(index)}
                >
                  <div className="card-top">
                    <div className="card-avatar">
                      {t.avatar ? (
                        <img src={t.avatar} alt={t.name} />
                      ) : (
                        <span className="avatar-placeholder">
                          {t.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="card-info">
                      <span className="card-name">{t.name}</span>
                      <span className="card-role">{t.role}</span>
                    </div>
                  </div>
                  <StarRating count={t.rating} />
                  <p className="card-text">{t.text}</p>
                </div>
              )
            })}
          </div>

          <div className="carousel-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === active ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Testimoni ke-${i + 1}`}
              />
            ))}
          </div>

          <button className="carousel-btn carousel-btn-prev" onClick={() => goTo((active - 1 + total) % total)} aria-label="Sebelumnya">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="carousel-btn carousel-btn-next" onClick={next} aria-label="Selanjutnya">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
