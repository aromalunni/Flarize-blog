import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="nav-logo"><span className="mark">F</span>Flarize</div>
          <p>Kerala&apos;s solar booking platform. Helping homes and businesses switch to clean energy with zero hassle.</p>
        </div>
        <div className="footer-col">
          <h4>Solutions</h4>
          <Link href="#">Residential Solar</Link>
          <Link href="#">Commercial Solar</Link>
          <Link href="#">Group Purchase</Link>
          <Link href="#">EMI Options</Link>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <Link href="/blog">Blog</Link>
          <Link href="#">Solar Calculator</Link>
          <Link href="#">Subsidy Guide</Link>
          <Link href="#">Our Projects</Link>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <Link href="#">About Us</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Careers</Link>
          <Link href="#">Partner Program</Link>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 Flarize Technologies. All rights reserved. · KSEB Empanelled · ISO Certified · Startup India
      </div>
    </footer>
  );
}
