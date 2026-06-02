import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Admin Error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: 40, textAlign: 'center', fontFamily: 'Inter, sans-serif',
          color: '#475569', maxWidth: 500, margin: '60px auto'
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ color: '#112B3C', margin: '0 0 8px' }}>Terjadi Kesalahan</h2>
          <p style={{ margin: '0 0 24px', fontSize: '0.9rem' }}>
            {this.state.error?.message || 'Silakan refresh halaman'}
          </p>
          <button onClick={() => window.location.reload()}
            style={{
              padding: '10px 24px', background: '#D4A853', border: 'none',
              borderRadius: 8, fontSize: '0.9rem', fontWeight: 600,
              color: '#112B3C', cursor: 'pointer'
            }}>
            Refresh Halaman
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
