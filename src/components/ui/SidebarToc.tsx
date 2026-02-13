'use client';
import { useEffect, useState } from 'react';

interface TocItem { id: string; text: string; }

// CSS: .sidebar, .sidebar-inner, .sidebar-inner h5, .sidebar-inner a, .sidebar-inner a.active, .sidebar-section
export default function SidebarToc({ items, quickLinks }: {
  items: TocItem[];
  quickLinks?: { text: string; url: string; }[];
}) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handler = () => {
      const sections = items.map(i => document.getElementById(i.id)).filter(Boolean);
      let current = '';
      sections.forEach(s => {
        if (s && window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      setActiveId(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler(); // run once on mount
    return () => window.removeEventListener('scroll', handler);
  }, [items]);

  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <h5>On This Page</h5>
        {items.map(item => (
          <a key={item.id} href={`#${item.id}`} className={activeId === item.id ? 'active' : ''}>
            {item.text}
          </a>
        ))}
        {quickLinks && quickLinks.length > 0 && (
          <div className="sidebar-section">
            <h5>Quick Links</h5>
            {quickLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.text} ↗
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
