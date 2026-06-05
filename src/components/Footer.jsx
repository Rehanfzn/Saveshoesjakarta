import { WA_LINK } from '../constants'
import useReveal from '../hooks/useReveal'
import './Footer.css'

function Footer() {
  const ctaRef = useReveal()

  return (
    <footer className="footer" id="contact">
      <div className="footer-cta">
        <div className="footer-cta-container reveal" ref={ctaRef}>
          <h2 className="footer-cta-title">
            Berikan Perawatan Terbaik untuk{' '}
            <span className="footer-cta-accent">Investasi Kaki Anda</span>
          </h2>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-cta-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Hubungi via WhatsApp
          </a>
        </div>
      </div>

      <div className="footer-bottom">
          <div className="footer-bottom-container">
          <div className="footer-bottom-grid">
            <div className="footer-left">
              <div className="footer-info">
                <div className="footer-logo">
                  <img
                    className="footer-logo-img"
                    src="/Logo%20save%20shoes.jpg"
                    alt="Save Shoes Jakarta"
                  />
                  <span className="footer-logo-text">SAVE SHOES</span>
                </div>
                <p className="footer-desc">
                  Jasa perawatan dan cuci sepatu premium di Jakarta. 
                  Sepatu bersih, wangi, dan seperti baru lagi.
                </p>
              </div>
              <div className="footer-map">
              <iframe
                src="https://maps.google.com/maps?q=-6.17808,106.7556534&z=17&output=embed&hl=id"
                width="100%"
                height="260"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Save Shoes Jakarta"
              />
            </div>
            </div>
              <div className="footer-links">
                <div className="footer-col">
                  <h4 className="footer-col-title">Navigasi</h4>
                  <ul>
                    <li><a href="#home">Beranda</a></li>
                    <li><a href="#services">Layanan</a></li>
                    <li><a href="#gallery">Bahan Sepatu</a></li>
                    <li><a href="#faq">FAQ</a></li>
                    <li><a href="#how-it-works">Cara Order</a></li>
                    <li><a href="#contact">Kontak</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4 className="footer-col-title">Layanan</h4>
                  <ul>
                    <li><a href="#services">Deep Cleaning</a></li>
                    <li><a href="#services">Unyellowing</a></li>
                    <li><a href="#services">Repaint & Restoration</a></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4 className="footer-col-title">Jam Operasional</h4>
                  <ul className="footer-hours">
                    <li><span>Senin - Sabtu</span><span>08.00 - 20.00 WIB</span></li>
                    <li><span>Minggu</span><span>10.00 - 17.00 WIB</span></li>
                  </ul>
                </div>
                <div className="footer-col">
                  <h4 className="footer-col-title">Kontak</h4>
                  <ul>
                    <li>
                      <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                        +62 896-5242-9733
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/saveshoes_jkt/" target="_blank" rel="noopener noreferrer">
@saveshoes_jkt
                      </a>
                    </li>
                    <li>Jl. Adhikarya I Gg. H. Arifin No.17A, Kedoya Sel., Kebon Jeruk, Jakarta Barat 11520</li>
                  </ul>
                  <div className="footer-social">
                    <a href="https://www.instagram.com/saveshoes_jkt/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>
                    </a>
                    <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </a>
                    <a href="https://tiktok.com/@saveshoes.jkt" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="TikTok">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
          </div>

          <div className="footer-copyright">
            <p>&copy; 2026 Save Shoes Jakarta. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
