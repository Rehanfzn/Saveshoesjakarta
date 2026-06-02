import { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  IconDashboard, IconAdd, IconList, IconReport, IconLogout, IconClock,
} from './icons'
import './AdminLayout.css'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: IconDashboard },
  { to: '/admin/tambah', label: 'Tambah Data', icon: IconAdd },
  { to: '/admin/data', label: 'Semua Data', icon: IconList },
  { to: '/admin/laporan', label: 'Laporan', icon: IconReport },
]

function Breadcrumb() {
  const location = useLocation()
  const paths = location.pathname.split('/').filter(Boolean)
  const labels = {
    admin: 'Dashboard',
    tambah: 'Tambah Data',
    data: 'Semua Data',
    laporan: 'Laporan',
  }
  return (
    <div className="breadcrumb">
      {paths.map((p, i) => (
        <span key={p} className="breadcrumb-item">
          {i > 0 && <span className="breadcrumb-sep">/</span>}
          <span className={i === paths.length - 1 ? 'breadcrumb-current' : ''}>
            {labels[p] || p}
          </span>
        </span>
      ))}
    </div>
  )
}

function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="header-clock">
      <IconClock />
      {time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
    </span>
  )
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in')
    navigate('/admin/login')
  }

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">SS</div>
          <div className="sidebar-brand-text">
            <h2>Save Shoes</h2>
            <p>Admin Panel</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sidebar-icon"><Icon /></span>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="btn-logout" onClick={handleLogout}>
            <IconLogout />
            Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <button className="hamburger" onClick={() => setSidebarOpen(true)}>
              <span /><span /><span />
            </button>
            <Breadcrumb />
          </div>
          <div className="header-right">
            <Clock />
            <div className="header-avatar">A</div>
          </div>
        </header>
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
