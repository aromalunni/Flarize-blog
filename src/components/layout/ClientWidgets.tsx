'use client';
import { useEffect } from 'react';

export function ProgressBar() {
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement;
      const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      const bar = document.getElementById('progressBar');
      if (bar) bar.style.width = Math.min(p, 100) + '%';
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return <div className="progress-bar" id="progressBar" />;
}

export function StickyBar() {
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      const bar = document.getElementById('stickyBar');
      if (!bar) return;
      if (pct > 35 && pct < 90) bar.classList.add('visible');
      else bar.classList.remove('visible');
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div className="sticky-bar" id="stickyBar">
      <div className="sticky-bar-inner">
        <p>Your KSEB bill = <span>₹4,800/bimonth?</span> That&apos;s ₹28,800/year you could save</p>
        <button className="btn-brand" style={{ padding: '10px 20px', fontSize: '13px' }}>Calculate My Savings →</button>
      </div>
    </div>
  );
}

export function WhatsAppFloat() {
  return (
    <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer"
      className="wa-float" aria-label="Chat on WhatsApp">
      💬
    </a>
  );
}

export function ScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.anim-in, .anim-stagger').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return null;
}
