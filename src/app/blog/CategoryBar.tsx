'use client';
import { useState } from 'react';
import type { BlogCategory } from '@/lib/strapi';

export default function CategoryBar({ categories, totalPosts }: {
  categories: BlogCategory[];
  totalPosts: number;
}) {
  const [active, setActive] = useState('all');
  return (
    <div className="cat-bar">
      <div className="cat-scroll">
        <div className="cat-inner">
          <button className={`cat-btn ${active === 'all' ? 'active' : ''}`} onClick={() => setActive('all')}>
            All Posts <span className="cat-count">{totalPosts}</span>
          </button>
          {categories.map(cat => (
            <button key={cat.slug} className={`cat-btn ${active === cat.slug ? 'active' : ''}`}
              onClick={() => setActive(cat.slug)}>
              {cat.icon && <>{cat.icon} </>}{cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
