import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  addRecord,
  SERVICE_TYPES,
  SHOE_TYPES,
  STATUS_OPTIONS,
  SERVICE_PRICES,
} from '../api/records'
import { IconSave, IconPlus } from './icons'
import './AddRecord.css'

const INITIAL_FORM = {
  tanggal: new Date().toISOString().split('T')[0],
  customerName: '',
  customerPhone: '',
  serviceType: 'Deep Cleaning',
  shoeBrand: '',
  shoeType: 'Sneakers',
  quantity: 1,
  hargaSatuan: SERVICE_PRICES['Deep Cleaning'],
  totalHarga: SERVICE_PRICES['Deep Cleaning'],
  status: 'Diproses',
  catatan: '',
}

export default function AddRecord() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const [submitMode, setSubmitMode] = useState('save')
  const navigate = useNavigate()

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => {
      const updated = { ...prev, [name]: value }

      if (name === 'serviceType') {
        updated.hargaSatuan = SERVICE_PRICES[value] || 0
        updated.totalHarga = (updated.hargaSatuan || 0) * (updated.quantity || 1)
      }
      if (name === 'quantity') {
        const qty = parseInt(value) || 0
        updated.quantity = qty
        updated.totalHarga = (updated.hargaSatuan || 0) * qty
      }
      if (name === 'hargaSatuan') {
        const harga = parseInt(value) || 0
        updated.hargaSatuan = harga
        updated.totalHarga = harga * (updated.quantity || 1)
      }

      return updated
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.customerName.trim()) {
      alert('Nama customer wajib diisi')
      return
    }
    if (!form.quantity || form.quantity < 1) {
      alert('Quantity minimal 1')
      return
    }

    setLoading(true)
    try {
      await addRecord({ ...form, inputBy: 'admin' })
      showToast('Data berhasil disimpan!')
      if (submitMode === 'new') {
        setForm({ ...INITIAL_FORM, tanggal: new Date().toISOString().split('T')[0] })
      } else {
        setTimeout(() => navigate('/admin/data'), 500)
      }
    } catch (err) {
      alert('Gagal menyimpan. Pastikan API server jalan (npm run server) dan MySQL aktif.\nError: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-record">
      {toast && (
        <div className="toast-container">
          <div className="toast">✓ {toast}</div>
        </div>
      )}

      <h1 className="page-title">Tambah Data Cucian</h1>
      <p className="page-subtitle">Input data pelanggan baru</p>

      <form className="record-form" onSubmit={handleSubmit}>
        <div className="form-card">
          <div className="form-card-header">
            <span className="form-card-step">1</span>
            <h3>Data Pelanggan</h3>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="customerName">Nama Customer <span className="required">*</span></label>
              <input
                id="customerName"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                placeholder="Nama lengkap"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerPhone">No. HP</label>
              <input
                id="customerPhone"
                name="customerPhone"
                value={form.customerPhone}
                onChange={handleChange}
                placeholder="0812xxxx"
              />
            </div>
          </div>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <span className="form-card-step">2</span>
            <h3>Data Sepatu</h3>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="serviceType">Jenis Layanan</label>
              <select
                id="serviceType"
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
              >
                {SERVICE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="shoeBrand">Merk Sepatu</label>
              <input
                id="shoeBrand"
                name="shoeBrand"
                value={form.shoeBrand}
                onChange={handleChange}
                placeholder="Nike, Adidas, dll"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="shoeType">Jenis Sepatu</label>
              <select
                id="shoeType"
                name="shoeType"
                value={form.shoeType}
                onChange={handleChange}
              >
                {SHOE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity <span className="required">*</span></label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <span className="form-card-step">3</span>
            <h3>Pembayaran & Status</h3>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hargaSatuan">Harga Satuan (Rp)</label>
              <input
                id="hargaSatuan"
                name="hargaSatuan"
                type="number"
                min="0"
                value={form.hargaSatuan}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="totalHarga">Total Harga (Rp)</label>
              <input
                id="totalHarga"
                name="totalHarga"
                type="number"
                value={form.totalHarga}
                disabled
                className="input-disabled"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tanggal">Tanggal</label>
              <input
                id="tanggal"
                name="tanggal"
                type="date"
                value={form.tanggal}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="price-summary">
            <div className="price-item">
              <span className="price-label">Harga Satuan</span>
              <span className="price-amount">Rp {(form.hargaSatuan || 0).toLocaleString('id-ID')}</span>
            </div>
            <div className="price-item">
              <span className="price-label">Quantity</span>
              <span className="price-amount">x {form.quantity || 0}</span>
            </div>
            <div className="price-item price-total">
              <span className="price-label">Total Harga</span>
              <span className="price-amount">Rp {(form.totalHarga || 0).toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <span className="form-card-step">4</span>
            <h3>Catatan</h3>
          </div>
          <div className="form-group">
            <textarea
              id="catatan"
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              placeholder="Catatan tambahan (warna, noda, request khusus...)"
              rows={3}
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/admin')}
          >
            Batal
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            onClick={() => setSubmitMode('save')}
          >
            <IconSave /> {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button
            type="submit"
            className="btn-primary btn-save-new"
            disabled={loading}
            onClick={() => setSubmitMode('new')}
          >
            <IconPlus /> {loading ? 'Menyimpan...' : 'Simpan & Tambah Lagi'}
          </button>
        </div>
      </form>
    </div>
  )
}
