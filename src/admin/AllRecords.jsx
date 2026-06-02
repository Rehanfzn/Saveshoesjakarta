import { useState, useEffect, useRef } from 'react'
import {
  getAllRecords,
  updateRecord,
  deleteRecord,
  SERVICE_TYPES,
  STATUS_OPTIONS,
  SERVICE_PRICES,
} from '../api/records'
import { IconSearch, IconEdit, IconDelete, IconSave, IconCancel, IconChevronLeft, IconChevronRight } from './icons'
import './AllRecords.css'

const ITEMS_PER_PAGE = 10

function ConfirmModal({ show, name, onConfirm, onCancel }) {
  if (!show) return null
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">🗑️</div>
        <h3>Hapus Data</h3>
        <p>Yakin ingin menghapus data <strong>{name}</strong>?</p>
        <div className="modal-actions">
          <button className="btn-secondary" onClick={onCancel}>Batal</button>
          <button className="btn-danger" onClick={onConfirm}>Hapus</button>
        </div>
      </div>
    </div>
  )
}

export default function AllRecords() {
  const [records, setRecords] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterService, setFilterService] = useState('')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const abortRef = useRef(null)
  const debounceRef = useRef(null)

  const refresh = () => setRefreshKey((k) => k + 1)

  useEffect(() => {
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    getAllRecords({
      page,
      limit: ITEMS_PER_PAGE,
      search,
      status: filterStatus,
      serviceType: filterService,
    }).then((data) => {
      if (!controller.signal.aborted) {
        setRecords(data.records)
        setTotal(data.total)
        setLoading(false)
      }
    }).catch((err) => {
      if (!controller.signal.aborted) {
        console.error('Failed to load records:', err)
        setLoading(false)
      }
    })

    return () => {
      if (abortRef.current) abortRef.current.abort()
    }
  }, [page, search, filterStatus, filterService, refreshKey])

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchInput(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setSearch(value)
      setPage(1)
    }, 300)
  }

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  const startEdit = (record) => {
    setEditing(record.id)
    setEditForm({
      customerName: record.customerName || '',
      customerPhone: record.customerPhone || '',
      serviceType: record.serviceType || 'Deep Cleaning',
      shoeBrand: record.shoeBrand || '',
      shoeType: record.shoeType || 'Sneakers',
      quantity: record.quantity || 1,
      hargaSatuan: record.hargaSatuan || 0,
      totalHarga: record.totalHarga || 0,
      status: record.status || 'Diproses',
      catatan: record.catatan || '',
      tanggal: record.tanggal || '',
    })
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm((prev) => {
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

  const saveEdit = async (id) => {
    try {
      await updateRecord(id, editForm)
      setEditing(null)
      refresh()
    } catch (err) {
      alert('Gagal update: ' + err.message)
    }
  }

  const cancelEdit = () => {
    setEditing(null)
    setEditForm({})
  }

  const confirmDelete = async () => {
    if (!deleteTarget) return
    try {
      await deleteRecord(deleteTarget.id)
      setDeleteTarget(null)
      refresh()
    } catch (err) {
      alert('Gagal hapus: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="all-records">
        <h1 className="page-title">Semua Data Cucian</h1>
        <p className="page-subtitle">Memuat data...</p>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton skeleton-row" style={{ marginBottom: 8 }} />
        ))}
      </div>
    )
  }

  return (
    <div className="all-records">
      <ConfirmModal
        show={!!deleteTarget}
        name={deleteTarget?.customerName || ''}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="records-header">
        <div>
          <h1 className="page-title">Semua Data Cucian</h1>
          <p className="page-subtitle">Total {total} record</p>
        </div>
      </div>

      <div className="filter-bar">
        <div className="search-wrap">
          <IconSearch />
          <input
            type="text"
            placeholder="Cari nama / no HP..."
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setPage(1) }}
        >
          <option value="">Semua Status</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={filterService}
          onChange={(e) => { setFilterService(e.target.value); setPage(1) }}
        >
          <option value="">Semua Layanan</option>
          {SERVICE_TYPES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th className="col-no">No</th>
              <th>Tanggal</th>
              <th>Nama</th>
              <th>HP</th>
              <th>Layanan</th>
              <th>Merk</th>
              <th className="col-qty">Qty</th>
              <th>Total</th>
              <th>Status</th>
              <th className="col-actions">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={10}>
                  <div className="empty-state">
                    <div className="empty-state-icon">📋</div>
                    <p className="empty-state-text">Tidak ada data</p>
                  </div>
                </td>
              </tr>
            ) : (
              records.map((r, idx) => (
                <tr key={r.id} className={editing === r.id ? 'row-editing' : ''}>
                  <td className="col-no">{(page - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                  <td>
                    {editing === r.id ? (
                      <input type="date" name="tanggal" value={editForm.tanggal} onChange={handleEditChange} className="edit-inline" />
                    ) : (
                      r.tanggal
                    )}
                  </td>
                  <td className="cell-name">
                    {editing === r.id ? (
                      <input type="text" name="customerName" value={editForm.customerName} onChange={handleEditChange} className="edit-inline" />
                    ) : (
                      r.customerName
                    )}
                  </td>
                  <td>
                    {editing === r.id ? (
                      <input type="text" name="customerPhone" value={editForm.customerPhone} onChange={handleEditChange} className="edit-inline" />
                    ) : (
                      r.customerPhone || '-'
                    )}
                  </td>
                  <td>
                    {editing === r.id ? (
                      <select name="serviceType" value={editForm.serviceType} onChange={handleEditChange} className="edit-inline">
                        {SERVICE_TYPES.map((t) => (<option key={t} value={t}>{t}</option>))}
                      </select>
                    ) : (
                      r.serviceType
                    )}
                  </td>
                  <td>
                    {editing === r.id ? (
                      <input type="text" name="shoeBrand" value={editForm.shoeBrand} onChange={handleEditChange} className="edit-inline" />
                    ) : (
                      r.shoeBrand || '-'
                    )}
                  </td>
                  <td className="col-qty">
                    {editing === r.id ? (
                      <input type="number" name="quantity" min="1" value={editForm.quantity} onChange={handleEditChange} className="edit-inline edit-qty" />
                    ) : (
                      r.quantity
                    )}
                  </td>
                  <td className="cell-money">Rp {(r.totalHarga || 0).toLocaleString('id-ID')}</td>
                  <td>
                    {editing === r.id ? (
                      <select name="status" value={editForm.status} onChange={handleEditChange} className="edit-inline">
                        {STATUS_OPTIONS.map((s) => (<option key={s} value={s}>{s}</option>))}
                      </select>
                    ) : (
                      <span className={`status-badge status-${r.status}`}>{r.status}</span>
                    )}
                  </td>
                  <td className="col-actions">
                    {editing === r.id ? (
                      <div className="action-group">
                        <button className="btn-icon btn-icon-save" onClick={() => saveEdit(r.id)} title="Simpan">
                          <IconSave />
                        </button>
                        <button className="btn-icon btn-icon-cancel" onClick={cancelEdit} title="Batal">
                          <IconCancel />
                        </button>
                      </div>
                    ) : (
                      <div className="action-group">
                        <button className="btn-icon btn-icon-edit" onClick={() => startEdit(r)} title="Edit">
                          <IconEdit />
                        </button>
                        <button className="btn-icon btn-icon-delete" onClick={() => setDeleteTarget(r)} title="Hapus">
                          <IconDelete />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <IconChevronLeft /> Sebelumnya
          </button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`page-num ${p === page ? 'active' : ''}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="page-btn" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            Selanjutnya <IconChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}
