import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{ 
      display: 'flex', 
      gap: '1rem', 
      padding: '1rem', 
      borderBottom: '1px solid #ddd',
      backgroundColor: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%'
    }}>
      <Link to="/">Home</Link>
      {isAuthenticated && (
        <>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/weather">Weather</Link>
          <Link to="/clock">Clock</Link>
        </>
      )}
      <div style={{ marginLeft: 'auto' }}>
        {!isAuthenticated ? (
          <>
            <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button 
            onClick={handleLogout}
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: '#0066cc'
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}
