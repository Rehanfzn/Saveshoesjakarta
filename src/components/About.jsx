import './About.css'

const features = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
    ),
    title: 'Garansi Cuci Ulang',
    desc: 'Jika hasilnya kurang memuaskan, kami tangani kembali tanpa biaya tambahan.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Aman & Terpercaya',
    desc: 'Menggunakan bahan berkualitas tinggi yang aman untuk semua jenis material sepatu.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Gratis Jemput & Antar',
    desc: 'Layanan antar jemput gratis hingga 5 KM dari lokasi kamu.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: 'Tepat Waktu',
    desc: 'Layanan cepat 24 jam tanpa mengorbankan kualitas kebersihan.',
  },
]

function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-header">
          <div className="about-eyebrow">Why Choose Us</div>
          <h2 className="about-title">
            BARANGMU, <span className="about-title-accent">TANGGUNG JAWAB KAMI</span>
          </h2>
          <p className="about-desc">
            Save Shoes Jakarta merupakan jasa perawatan dan cuci sepatu premium 
            dengan layanan yang dirancang untuk memberikan kemudahan, kenyamanan, 
            dan hasil yang maksimal.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
