import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../api/records'
import './AdminLogin.css'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      setError('Username atau password salah')
      return
    }
    sessionStorage.setItem('admin_logged_in', 'true')
    navigate('/admin')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Save Shoes Jakarta</h1>
          <p>Admin Panel</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
