import useReveal from '../hooks/useReveal'
import CountUp from './CountUp'
import FloatingSocial from './FloatingSocial'
import './Hero.css'

function Hero() {
  const contentRef = useReveal()

  const handleClick = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home">
      <FloatingSocial />
      <div className="hero-bg-layer" aria-hidden="true">
        <div className="hero-bg-shape hero-bg-shape-1"></div>
        <div className="hero-bg-shape hero-bg-shape-2"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content reveal" ref={contentRef}>
          <span className="hero-tagline">Premium Shoe Care — Jakarta</span>

          <h1 className="hero-title">
            Sepatu Bersih Seperti Baru,{' '}
            <span className="hero-title-accent">Tanpa Repot.</span>
          </h1>

          <p className="hero-subtitle">
            Perawatan premium untuk sepatu kesayangan Anda. Hemat waktu
            dengan layanan antar-jemput langsung ke lokasi Anda di Jakarta.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => handleClick('#services')}>
              Lihat Harga
            </button>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">
                <CountUp end={500} suffix="+" />
              </span>
              <span className="stat-label">Pelanggan Puas</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">
                <CountUp end={1000} suffix="+" />
              </span>
              <span className="stat-label">Sepatu Ditangani</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">
                <CountUp end={5} decimals={1} />
              </span>
              <span className="stat-label">Rating Google</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">
                <CountUp end={3} />
              </span>
              <span className="stat-label">Cabang Jakarta</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
