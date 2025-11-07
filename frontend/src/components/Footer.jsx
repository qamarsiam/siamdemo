export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #eee', padding: '1rem', textAlign: 'center' }}>
      <small>© {new Date().getFullYear()} My MERN App</small>
    </footer>
  )
}
