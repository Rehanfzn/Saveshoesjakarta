import { useState } from 'react'
import { WA_LINK_TEXT } from '../constants'
import useReveal from '../hooks/useReveal'
import './Services.css'

const services = [
  {
    img: '/perawatan/deepclean.png',
    title: 'Deep Cleaning',
    desc: 'Pencucian menyeluruh luar dan dalam untuk sepatu harian agar bebas kuman dan bau.',
    price: 'Mulai Rp 50.000',
    items: [
      'Pencucian luar & dalam sepatu',
      'Sterilisasi kuman & bakteri',
      'Penghilangan bau tidak sedap',
      'Pengeringan dengan mesin',
      'Finishing wangi antiseptik',
    ],
  },
  {
    img: '/perawatan/unyellowing.png',
    title: 'Unyellowing',
    desc: 'Mengembalikan sol sepatu yang menguning (midsole) menjadi putih cerah kembali.',
    price: 'Mulai Rp 75.000',
    items: [
      'Aplikasi chemical pemutih khusus',
      'Proses bleaching midsole',
      'Pembilasan & penetralan',
      'Pengeringan & finishing',
    ],
  },
  {
    img: '/perawatan/repaint.png',
    title: 'Repaint & Restoration',
    desc: 'Mengembalikan warna sepatu yang pudar atau rusak agar tajam kembali.',
    price: 'Mulai Rp 150.000',
    items: [
      'Pembersihan permukaan sepatu',
      'Aplikasi cat premium',
      'Finishing protective coat',
      'Pengeringan sempurna',
      'Quality check akhir',
    ],
  },
]

function Services() {
  const [selected, setSelected] = useState(null)
  const headerRef = useReveal()

  const close = () => setSelected(null)

  return (
    <section className="services" id="services">
      <div className="services-container">
        <div className="services-header reveal" ref={headerRef}>
          <span className="services-eyebrow">Layanan Utama</span>
          <h2 className="services-title">
            Perawatan Lengkap{' '}
            <span className="services-title-accent">untuk Sepatu Anda</span>
          </h2>
          <p className="services-desc">
            Dari pembersihan rutin hingga restorasi warna, kami siap mengembalikan
            keindahan sepatu kesayangan Anda.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => {
            const cardRef = useReveal()
            return (
            <div className="service-card reveal" key={i} ref={cardRef} style={{ transitionDelay: `${i * 100}ms` }} onClick={() => setSelected(s)}>
              <div className="service-card-img">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                />
                <div className="service-card-overlay"></div>
                <div className="service-card-badge">Detail</div>
              </div>
              <div className="service-card-body">
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-desc">{s.desc}</p>
              </div>
            </div>
          )})}
        </div>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={close}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={close}>
              &times;
            </button>
            <div className="modal-img">
              <img src={selected.img} alt={selected.title} />
            </div>
            <div className="modal-body">
              <h3 className="modal-title">{selected.title}</h3>
              <p className="modal-desc">{selected.desc}</p>

              <div className="modal-items">
                <h4 className="modal-items-heading">Layanan yang Didapat:</h4>
                <ul>
                  {selected.items.map((item, i) => (
                    <li key={i}>
                      <span className="check-icon">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-price">
                <span className="modal-price-label">Harga</span>
                <span className="modal-price-value">{selected.price}</span>
              </div>

              <a
                className="modal-cta"
                href={WA_LINK_TEXT}
                target="_blank"
                rel="noopener noreferrer"
              >
                konsultasi sekarang
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Services
