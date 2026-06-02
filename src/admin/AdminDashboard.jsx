import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'
import { getRecordsSummary, SERVICE_TYPES } from '../api/records'
import { IconShoe, IconMoney, IconPeople, IconChart, IconPlus } from './icons'
import './AdminDashboard.css'

function toRp(n) {
  return (n || 0).toLocaleString('id-ID')
}

function SkeletonCards() {
  return (
    <div className="stats-grid">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="stat-card-skeleton skeleton" />
      ))}
    </div>
  )
}

function SkeletonSection() {
  return (
    <div className="dashboard-grid">
      <div className="dash-card">
        <div className="skeleton" style={{ height: 20, width: '60%', marginBottom: 20 }} />
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton skeleton-bar" />
        ))}
      </div>
      <div className="dash-card">
        <div className="skeleton" style={{ height: 20, width: '50%', marginBottom: 20 }} />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton skeleton-row" />
        ))}
      </div>
    </div>
  )
}

function DonutChart({ data }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1
  let cumulative = 0
  const segments = Object.entries(data).map(([label, value]) => {
    const start = cumulative
    cumulative += (value / total) * 360
    return { label, value, start, end: cumulative }
  })

  const COLORS = { Diproses: '#f59e0b', Selesai: '#10b981', Diambil: '#3b82f6' }

  return (
    <div className="donut-wrapper">
      <div className="donut">
        <svg viewBox="0 0 36 36" className="donut-svg">
          {segments.map((s) => {
            const [startX, startY] = polarToCartesian(18, 18, 15.5, s.start)
            const [endX, endY] = polarToCartesian(18, 18, 15.5, s.end)
            const largeArc = s.end - s.start > 180 ? 1 : 0
            return (
              <path
                key={s.label}
                d={`M ${startX} ${startY} A 15.5 15.5 0 ${largeArc} 1 ${endX} ${endY}`}
                fill="none"
                stroke={COLORS[s.label] || '#94a3b8'}
                strokeWidth="3"
                strokeLinecap="round"
              />
            )
          })}
        </svg>
        <div className="donut-center">
          <span className="donut-total">{total}</span>
          <span className="donut-label">Total</span>
        </div>
      </div>
      <div className="donut-legend">
        {segments.map((s) => (
          <div key={s.label} className="donut-legend-item">
            <span className="donut-dot" style={{ background: COLORS[s.label] }} />
            <span className="donut-legend-label">{s.label}</span>
            <span className="donut-legend-value">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true
    loadData()
    return () => { mounted = false }

    async function loadData() {
      setLoading(true)
      try {
        const data = await getRecordsSummary()
        if (mounted) setSummary(data)
      } catch (err) {
        if (mounted) console.error('Failed to load summary:', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
  }, [])

  if (loading) {
    return (
      <div className="dashboard">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Memuat data...</p>
        <SkeletonCards />
        <SkeletonSection />
      </div>
    )
  }

  if (!summary) {
    return (
      <div className="dashboard">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Gagal memuat data. Pastikan server aktif.</p>
      </div>
    )
  }

  const {
    todayShoes,
    todayRevenue,
    todayCustomers,
    avgPerCust,
    revenueTrend,
    revenueByService,
    statusCount,
    recentRecords,
  } = summary

  const currentDate = format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id })

  const maxRevenue = Object.keys(revenueByService).length > 0
    ? Math.max(...Object.values(revenueByService), 1)
    : 1

  return (
    <div className="dashboard">
      <div className="dash-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">{currentDate}</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/admin/tambah')}>
          <IconPlus /> Tambah Data
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card gradient-blue">
          <div className="stat-icon-wrap"><IconShoe /></div>
          <div className="stat-info">
            <span className="stat-value">{todayShoes}</span>
            <span className="stat-label">Sepatu Hari Ini</span>
          </div>
        </div>
        <div className="stat-card gradient-green">
          <div className="stat-icon-wrap"><IconMoney /></div>
          <div className="stat-info">
            <span className="stat-value">Rp {toRp(todayRevenue)}</span>
            <span className="stat-label">
              Pendapatan Hari Ini
              {revenueTrend !== 0 && (
                <span className={`stat-trend ${revenueTrend > 0 ? 'up' : 'down'}`}>
                  {revenueTrend > 0 ? '↑' : '↓'} {Math.abs(revenueTrend)}%
                </span>
              )}
            </span>
          </div>
        </div>
        <div className="stat-card gradient-purple">
          <div className="stat-icon-wrap"><IconPeople /></div>
          <div className="stat-info">
            <span className="stat-value">{todayCustomers}</span>
            <span className="stat-label">Pelanggan Hari Ini</span>
          </div>
        </div>
        <div className="stat-card gradient-orange">
          <div className="stat-icon-wrap"><IconChart /></div>
          <div className="stat-info">
            <span className="stat-value">Rp {toRp(avgPerCust)}</span>
            <span className="stat-label">Rata-rata per Transaksi</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dash-card">
          <h3>Pendapatan per Layanan</h3>
          {Object.keys(revenueByService).length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📊</div>
              <p className="empty-state-text">Belum ada transaksi hari ini</p>
              <button className="btn-primary" onClick={() => navigate('/admin/tambah')}>
                <IconPlus /> Input Data
              </button>
            </div>
          ) : (
            <div className="revenue-chart">
              {SERVICE_TYPES.map((service) => {
                const rev = revenueByService[service] || 0
                const pct = (rev / maxRevenue) * 100
                return (
                  <div key={service} className="chart-row">
                    <div className="chart-row-header">
                      <span className="chart-row-label">{service}</span>
                      <span className="chart-row-value">Rp {toRp(rev)}</span>
                    </div>
                    <div className="chart-track">
                      <div
                        className="chart-fill"
                        style={{ width: rev > 0 ? `${Math.max(pct, 4)}%` : '0%' }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="dash-card">
          <h3>Status Transaksi Hari Ini</h3>
          {todayCustomers === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <p className="empty-state-text">Belum ada transaksi</p>
            </div>
          ) : (
            <DonutChart data={statusCount} />
          )}
        </div>
      </div>

      <div className="dash-card" style={{ marginTop: 20 }}>
        <h3>Transaksi Terbaru</h3>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Layanan</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
                <th>Waktu</th>
              </tr>
            </thead>
            <tbody>
              {recentRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    <div className="empty-state">
                      <div className="empty-state-icon">📭</div>
                      <p className="empty-state-text">Belum ada transaksi</p>
                    </div>
                  </td>
                </tr>
              ) : (
                recentRecords.map((r) => (
                  <tr key={r.id}>
                    <td className="cell-name">{r.customer_name}</td>
                    <td>{r.service_type}</td>
                    <td>{r.quantity}</td>
                    <td className="cell-money">Rp {toRp(r.total_harga)}</td>
                    <td>
                      <span className={`status-badge status-${r.status}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="cell-time">
                      {(() => {
                        try {
                          return r.created_at ? format(new Date(r.created_at), 'HH:mm') : '-'
                        } catch { return '-' }
                      })()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
