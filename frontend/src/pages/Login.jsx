import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:10000/api/auth/login', form)
      login(res.data.token)
      navigate('/')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit} style={{ maxWidth: 400 }}>
        <div>
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handle} required />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handle} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}