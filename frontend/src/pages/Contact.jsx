import { useState } from 'react'
import axios from 'axios'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:10000/api/contact', form)
      setStatus('Message sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error(err)
      setStatus('Error sending message')
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: '#8f6e1bff',
      minHeight: '80vh'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '2rem'
      }}>Contact</h1>
      <form onSubmit={submit} style={{ maxWidth: 600 }}>
        <div>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handle} required />
        </div>
        <div>
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handle} required />
        </div>
        <div>
          <label>Message</label>
          <textarea name="message" value={form.message} onChange={handle} required />
        </div>
        <button type="submit">Send</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  )
}
