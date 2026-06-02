import useReveal from '../hooks/useReveal'
import './WhyChooseUs.css'

const items = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
    title: 'Berpengalaman Sejak 2017',
    desc: 'Pengalaman bertahun-tahun menangani ribuan pasang sepatu premium dengan aman.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Bahan Premium & Aman',
    desc: 'Menggunakan pembersih khusus yang disesuaikan dengan jenis bahan sepatu Anda (Suede, Leather, Canvas).',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Garansi Kepuasan',
    desc: 'Jika hasil cuci dirasa kurang bersih, kami cuci ulang gratis tanpa biaya tambahan.',
  },
]

function WhyChooseUs() {
  const headerRef = useReveal()

  return (
    <section className="whychoose" id="why-us">
      <div className="whychoose-container">
        <div className="whychoose-header reveal" ref={headerRef}>
          <span className="whychoose-eyebrow">Mengapa Kami?</span>
          <h2 className="whychoose-title">
            Tiga Pilar Kepercayaan{' '}
            <span className="whychoose-title-accent">Pelanggan Kami</span>
          </h2>
          <p className="whychoose-desc">
            Kami berkomitmen memberikan layanan terbaik untuk setiap sepatu
            yang dipercayakan kepada kami.
          </p>
        </div>

        <div className="whychoose-grid">
          {items.map((item, i) => {
            const cardRef = useReveal()
            return (
              <div className="whychoose-card reveal" key={i} ref={cardRef} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="whychoose-card-icon">{item.icon}</div>
                <h3 className="whychoose-card-title">{item.title}</h3>
                <p className="whychoose-card-desc">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
