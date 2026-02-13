import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      maxWidth: 'var(--max-post)', margin: '0 auto', padding: '80px 24px', textAlign: 'center',
    }}>
      <h1 style={{
        fontFamily: "'DM Serif Display',serif", fontSize: '64px', color: 'var(--brand)', marginBottom: '8px',
      }}>404</h1>
      <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Page not found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/" className="btn-brand">Go Home</Link>
        <Link href="/blog" className="btn-outline">Browse Blog</Link>
      </div>
    </div>
  );
}
