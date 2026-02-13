'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          <span className="mark">F</span>Flarize
        </Link>
        <div className="nav-links">
          <Link href="/residential">Residential</Link>
          <Link href="/commercial">Commercial</Link>
          <Link href="/projects">Our Projects</Link>
          <Link href="/blog" className="active">Blog</Link>
          <Link href="/about">About Us</Link>
        </div>
        <button className="nav-cta">Book Consultation</button>
      </div>
    </nav>
  );
}
