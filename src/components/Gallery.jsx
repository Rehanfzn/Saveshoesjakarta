import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import './Gallery.css'

const MATERIALS = [
  {
    name: 'Canvas',
    desc: 'Bahan kanvas ringan dan mudah dirawat. Cukup sikat lembut dan pembersih busa untuk hasil maksimal.',
    img: new URL('../assets/images/deep-clean.jpg', import.meta.url).href,
    alt: 'Perawatan sepatu bahan canvas',
  },
  {
    name: 'Suede',
    desc: 'Bahan suede lembut yang membutuhkan sikat khusus dan pembersih tanpa air agar teksturnya tetap terjaga.',
    img: new URL('../assets/images/gallery-1.jpg', import.meta.url).href,
    alt: 'Perawatan sepatu bahan suede',
  },
  {
    name: 'Boots',
    desc: 'Sepatu boots premium perlu pelembap leather khusus untuk menjaga bentuk dan kilau alaminya.',
    img: new URL('../assets/images/repaint.jpg', import.meta.url).href,
    alt: 'Perawatan sepatu boots',
  },
  {
    name: 'Sneakers',
    desc: 'Sneakers favorit Anda butuh deep cleaning rutin agar tetap putih bersih dan nyaman dipakai.',
    img: new URL('../assets/images/hero-shoe.jpg', import.meta.url).href,
    alt: 'Perawatan sepatu sneakers',
  },
]

function Gallery() {
  const [active, setActive] = useState(0)
  const headerRef = useReveal()
  const itemRefs = MATERIALS.map(() => useReveal())

  return (
    <section className="gallery" id="gallery">
      <div className="gallery-container">
        <div className="gallery-header reveal" ref={headerRef}>
          <span className="gallery-eyebrow">Bahan Sepatu</span>
          <h2 className="gallery-title">
            Kami Paham{' '}
            <span className="gallery-title-accent">Setiap Bahannya</span>
          </h2>
          <p className="gallery-desc">
            Setiap bahan sepatu punya karakter berbeda. Tim kami tahu cara
            merawatnya dengan tepat.
          </p>
        </div>

        <div className="materials-wrapper">
          <div className="materials-image">
            {MATERIALS.map((m, i) => (
              <img
                key={m.name}
                src={m.img}
                alt={m.alt}
                className={`materials-photo${i === active ? ' active' : ''}`}
                loading="lazy"
              />
            ))}
          </div>

          <div className="materials-list">
            {MATERIALS.map((m, i) => (
              <button
                key={m.name}
                className={`material-item${i === active ? ' active' : ''}`}
                ref={itemRefs[i]}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
              >
                <span className="material-dot"></span>
                <div className="material-text">
                  <span className="material-name">{m.name}</span>
                  <span className="material-desc">{m.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery
