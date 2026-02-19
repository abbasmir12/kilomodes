import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '60vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link href="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  )
}
