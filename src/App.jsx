import React, { useState, useEffect, Suspense } from 'react'

const Library = React.lazy(() => import('music_library/Library'))

function App() {
  const [role, setRole] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      try {
        const parsed = JSON.parse(atob(token))
        setRole(parsed.role)
      } catch (err) {
        console.error('Invalid token', err)
        localStorage.removeItem('jwt')
      }
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('jwt')
    setRole(null)
  }

  return (
    <div style={{ fontFamily: 'Segoe UI', textAlign: 'center', padding: '30px' }}>
      {!role ? (
        <Login />
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <h2>🎧 Logged in as: <span style={{ color: '#1db954' }}>{role}</span></h2>
            <button onClick={logout} style={logoutBtnStyle}>Logout</button>
          </div>

          <Suspense fallback={<p>Loading Music Library...</p>}>
            <Library role={role} />
          </Suspense>
        </>
      )}
    </div>
  )
}

function Login() {
  const handleLogin = (role) => {
    const token = btoa(JSON.stringify({ role }))
    localStorage.setItem('jwt', token)
    window.location.reload()
  }

  return (
    <>
      <h1>🎵 Welcome to Music Library</h1>
      <p>Select your role:</p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => handleLogin('admin')} style={loginBtnStyle}>Login as Admin</button>
        &nbsp;&nbsp;
        <button onClick={() => handleLogin('user')} style={loginBtnStyle}>Login as User</button>
      </div>
    </>
  )
}

const loginBtnStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  margin: '5px',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#1db954',
  color: 'black',
  cursor: 'pointer'
}

const logoutBtnStyle = {
  padding: '8px 16px',
  backgroundColor: 'crimson',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px'
}

export default App
