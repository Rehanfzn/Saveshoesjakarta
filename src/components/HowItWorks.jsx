import useReveal from '../hooks/useReveal'
import './HowItWorks.css'

const steps = [
  {
    number: '1',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: 'Hubungi Kami',
    desc: 'Klik tombol WhatsApp dan kirim foto kondisi sepatu Anda untuk konsultasi gratis.',
  },
  {
    number: '2',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="3"/>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Penjemputan',
    desc: 'Sepatu Anda dijemput oleh kurir atau bisa diantar langsung ke workshop kami.',
  },
  {
    number: '3',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Treatment & Kirim Balik',
    desc: 'Sepatu dibersihkan oleh spesialis kami dan dikirim kembali dalam kondisi siap pakai.',
  },
]

function HowItWorks() {
  const headerRef = useReveal()

  return (
    <section className="steps" id="how-it-works">
      <div className="steps-container">
        <div className="steps-header reveal" ref={headerRef}>
          <span className="steps-eyebrow">Cara Order</span>
          <h2 className="steps-title">
            3 Langkah Mudah{' '}
            <span className="steps-title-accent">Mulai Sekarang</span>
          </h2>
          <p className="steps-desc">
            Proses cepat dan tanpa ribet. Kami urus semuanya untuk Anda.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, i) => {
            const cardRef = useReveal()
            return (
            <div className="step-card reveal" key={i} ref={cardRef} style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="step-number">{step.number}</span>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              {i < steps.length - 1 && <div className="step-connector" aria-hidden="true"></div>}
            </div>
          )})}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
