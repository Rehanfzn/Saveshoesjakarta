import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import { getAllRecords } from '../api/records'
import { IconDownload } from './icons'
import './Reports.css'

function toRp(n) {
  return (n || 0).toLocaleString('id-ID')
}

export default function Reports() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState(
    format(new Date(), 'yyyy-MM-01')
  )
  const [endDate, setEndDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  )

  const abortRef = useRef(null)

  useEffect(() => {
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    getAllRecords({ startDate, endDate }).then((data) => {
      if (!controller.signal.aborted) {
        setRecords(data.records)
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
  }, [startDate, endDate])

  const filtered = records
  const totalShoes = filtered.reduce((s, r) => s + (r.quantity || 0), 0)
  const totalRevenue = filtered.reduce((s, r) => s + (r.totalHarga || 0), 0)
  const totalTransactions = filtered.length
  const avgPerTrans = totalTransactions > 0 ? Math.round(totalRevenue / totalTransactions) : 0

  const serviceSummary = {}
  filtered.forEach((r) => {
    const s = r.serviceType || 'Lainnya'
    if (!serviceSummary[s]) {
      serviceSummary[s] = { count: 0, qty: 0, revenue: 0 }
    }
    serviceSummary[s].count++
    serviceSummary[s].qty += r.quantity || 0
    serviceSummary[s].revenue += r.totalHarga || 0
  })

  const sortedByDate = [...filtered].sort((a, b) => {
    if (a.tanggal < b.tanggal) return 1
    if (a.tanggal > b.tanggal) return -1
    return 0
  })

  const exportCSV = () => {
    const header = ['Tanggal,Nama,No HP,Layanan,Merk,Jenis,Qty,Harga Satuan,Total,Status,Catatan']
    const rows = filtered.map((r) =>
      [
        r.tanggal,
        `"${r.customerName || ''}"`,
        `"${r.customerPhone || ''}"`,
        `"${r.serviceType || ''}"`,
        `"${r.shoeBrand || ''}"`,
        `"${r.shoeType || ''}"`,
        r.quantity || 0,
        r.hargaSatuan || 0,
        r.totalHarga || 0,
        `"${r.status || ''}"`,
        `"${(r.catatan || '').replace(/"/g, '""')}"`,
      ].join(',')
    )
    const csv = [...header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `laporan_${startDate}_${endDate}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="reports">
      <h1 className="page-title">Laporan</h1>
      <p className="page-subtitle">Rekap data cucian per periode</p>

      <div className="report-filters-card">
        <div className="report-filters">
          <div className="filter-group">
            <label>Dari Tanggal</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Sampai Tanggal</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button className="btn-export" onClick={exportCSV} disabled={filtered.length === 0}>
            <IconDownload /> Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Memuat data...</div>
      ) : (
        <>
          <div className="report-summary">
            <div className="summary-card">
              <span className="summary-label">Total Transaksi</span>
              <span className="summary-value">{totalTransactions}</span>
            </div>
            <div className="summary-card">
              <span className="summary-label">Total Sepatu</span>
              <span className="summary-value">{totalShoes}</span>
            </div>
            <div className="summary-card">
              <span className="summary-label">Total Pendapatan</span>
              <span className="summary-value">Rp {toRp(totalRevenue)}</span>
            </div>
            <div className="summary-card">
              <span className="summary-label">Rata-rata per Transaksi</span>
              <span className="summary-value">Rp {toRp(avgPerTrans)}</span>
            </div>
          </div>

          <div className="report-section">
            <h3>Ringkasan per Layanan</h3>
            <div className="table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Layanan</th>
                    <th>Transaksi</th>
                    <th>Total Sepatu</th>
                    <th>Total Pendapatan</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(serviceSummary).length === 0 ? (
                    <tr>
                      <td colSpan={4}>
                        <div className="empty-state">
                          <p className="empty-state-text">Tidak ada data</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    Object.entries(serviceSummary).map(([service, data]) => (
                      <tr key={service}>
                        <td className="cell-name">{service}</td>
                        <td>{data.count}</td>
                        <td>{data.qty}</td>
                        <td className="cell-money">Rp {toRp(data.revenue)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="report-section">
            <h3>Detail Transaksi</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Nama</th>
                    <th>HP</th>
                    <th>Layanan</th>
                    <th>Merk</th>
                    <th className="col-qty">Qty</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedByDate.length === 0 ? (
                    <tr>
                      <td colSpan={8}>
                        <div className="empty-state">
                          <div className="empty-state-icon">📊</div>
                          <p className="empty-state-text">Tidak ada data di periode ini</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    sortedByDate.map((r) => (
                      <tr key={r.id}>
                        <td>{r.tanggal}</td>
                        <td className="cell-name">{r.customerName}</td>
                        <td>{r.customerPhone || '-'}</td>
                        <td>{r.serviceType}</td>
                        <td>{r.shoeBrand || '-'}</td>
                        <td className="col-qty">{r.quantity}</td>
                        <td className="cell-money">Rp {toRp(r.totalHarga)}</td>
                        <td>
                          <span className={`status-badge status-${r.status}`}>{r.status}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
