import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import './Gallery.css'

const MATERIALS = [
  {
    name: 'Canvas',
    desc: 'Bahan kanvas ringan dan mudah dirawat. Cukup sikat lembut dan pembersih busa untuk hasil maksimal.',
    img: '/asset-bahan/canvas.png',
    alt: 'Perawatan sepatu bahan canvas',
    do: [
      'Sikat lembut dengan kuas berbulu halus secara rutin',
      'Gunakan pembersih busa (foam cleaner) untuk noda membandel',
      'Jemur di tempat teduh dengan sirkulasi udara yang baik',
    ],
    dont: [
      'Menggosok terlalu keras hingga merusak serat kain',
      'Merendam sepatu terlalu lama dalam air',
      'Menjemur langsung di bawah sinar matahari terik',
    ],
  },
  {
    name: 'Suede',
    desc: 'Bahan suede lembut yang membutuhkan sikat khusus dan pembersih tanpa air agar teksturnya tetap terjaga.',
    img: '/asset-bahan/suede.png',
    alt: 'Perawatan sepatu bahan suede',
    do: [
      'Gunakan sikat karet khusus suede untuk merawat tekstur',
      'Bersihkan noda dengan pembersih khusus tanpa air',
      'Semprotkan pelindung suede setelah dibersihkan',
    ],
    dont: [
      'Menggunakan air berlebihan yang merusak tekstur',
      'Menggosok dengan sikat keras atau sikat biasa',
      'Memakai pembersih berbasis alkohol atau pemutih',
    ],
  },
  {
    name: 'Boots',
    desc: 'Sepatu boots premium perlu pelembap leather khusus untuk menjaga bentuk dan kilau alaminya.',
    img: '/asset-bahan/boots.png',
    alt: 'Perawatan sepatu boots',
    do: [
      'Aplikasikan pelembap leather secara rutin agar tidak kering',
      'Simpan dengan shoe tree untuk menjaga bentuk',
      'Lap dengan kain lembut dan lembap setelah dipakai',
    ],
    dont: [
      'Menjemur di bawah sinar matahari langsung',
      'Menggunakan pembersih kimia keras atau deterjen',
      'Menyimpan dalam keadaan lembap atau basah',
    ],
  },
  {
    name: 'Sneakers',
    desc: 'Sneakers favorit Anda butuh deep cleaning rutin agar tetap putih bersih dan nyaman dipakai.',
    img: '/asset-bahan/sneakers.png',
    alt: 'Perawatan sepatu sneakers',
    do: [
      'Lakukan deep cleaning rutin setiap 1-2 minggu',
      'Lepas tali sepatu sebelum mencuci untuk hasil maksimal',
      'Keringkan dengan kipas atau pengering sepatu khusus',
    ],
    dont: [
      'Menggunakan pemutih atau bahan kimia keras',
      'Memasukkan ke mesin cuci sembarangan tanpa pelindung',
      'Menjemur dalam posisi terbalik atau digantung',
    ],
  },
]

function Gallery() {
  const [active, setActive] = useState(0)
  const [selected, setSelected] = useState(null)
  const headerRef = useReveal()
  const itemRefs = MATERIALS.map(() => useReveal())

  const close = () => setSelected(null)

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
                className={'materials-photo' + (i === active ? ' active' : '')}
                loading="lazy"
              />
            ))}
          </div>

          <div className="materials-list">
            {MATERIALS.map((m, i) => (
              <button
                key={m.name}
                className={'material-item' + (i === active ? ' active' : '')}
                ref={itemRefs[i]}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
              >
                <span className="material-dot"></span>
                <div className="material-text">
                  <span className="material-name">{m.name}</span>
                  <span className="material-desc">{m.desc}</span>
                </div>
                <span className="material-care-tag" onClick={(e) => { e.stopPropagation(); setSelected(m) }}>Lihat Perawatan</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="material-modal-overlay" onClick={close}>
          <div className="material-modal" onClick={(e) => e.stopPropagation()}>
            <button className="material-modal-close" onClick={close}>&times;</button>
            <div className="material-modal-body">
              <h3 className="material-modal-title">{selected.name}</h3>
              <p className="material-modal-desc">{selected.desc}</p>

              <div className="material-modal-section">
                <h4 className="material-modal-heading">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Cara Perawatan
                </h4>
                <ul className="material-modal-list do-list">
                  {selected.do.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="material-modal-section">
                <h4 className="material-modal-heading">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Larangan
                </h4>
                <ul className="material-modal-list dont-list">
                  {selected.dont.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery
