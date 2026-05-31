import { useState, useRef, useEffect } from 'react'
import './Faq.css'

const faqs = [
  {
    q: 'Berapa lama proses perawatan sepatu?',
    a: 'Proses perawatan umumnya selesai dalam 24–48 jam tergantung tingkat kekotoran dan jenis layanan. Untuk layanan express bisa selesai dalam 6 jam.',
  },
  {
    q: 'Apakah bisa antar-jemput?',
    a: 'Tentu! Kami menyediakan layanan antar-jemput gratis untuk area dalam radius 5 KM dari workshop kami. Silakan hubungi kami untuk koordinasi lokasi.',
  },
  {
    q: 'Apa perbedaan Deep Cleaning dengan layanan lainnya?',
    a: 'Deep Cleaning adalah pencucian menyeluruh luar & dalam sepatu, cocok untuk perawatan rutin. Sedangkan Unyellowing khusus untuk sol yang menguning, dan Repaint untuk pemulihan warna cat yang pudar atau rusak.',
  },
  {
    q: 'Apakah aman untuk bahan suede atau leather?',
    a: 'Sangat aman. Kami menggunakan pembersih khusus yang disesuaikan dengan jenis bahan sepatu. Tim kami sudah berpengalaman menangani berbagai material mulai dari kanvas, suede, leather, hingga mesh.',
  },
]

function Faq() {
  const [openIdx, setOpenIdx] = useState(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); observer.unobserve(el) } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const toggle = (i) => setOpenIdx(openIdx === i ? null : i)

  return (
    <section className="faq" id="faq">
      <div className="faq-container">
        <div className="faq-header reveal" ref={headerRef}>
          <span className="faq-eyebrow">FAQ</span>
          <h2 className="faq-title">
            Pertanyaan{' '}
            <span className="faq-title-accent">Umum</span>
          </h2>
          <p className="faq-desc">
            Masih ragu? Temukan jawaban dari pertanyaan yang sering diajukan.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, i) => (
              <div
                className={`faq-item${openIdx === i ? ' open' : ''}`}
                key={i}
              >
                <button
                  className="faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={openIdx === i}
                >
                  <span>{faq.q}</span>
                  <svg
                    className="faq-arrow"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className="faq-answer" role="region">
                  <p>{faq.a}</p>
                </div>
                </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
