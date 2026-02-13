import { Metadata } from 'next';
import Link from 'next/link';
import { getBlogCategories, getAllBlogPosts, formatDate } from '@/lib/strapi';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${slug.replace(/-/g, ' ')} — Flarize Blog` };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { posts } = await getAllBlogPosts(1, 20);
  const filtered = posts.filter(p => p.category?.slug === slug);

  return (
    <div className="section">
      <div className="section-label">{slug.replace(/-/g, ' ')}</div>
      <div className="article-grid">
        {filtered.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
            <div className="article-card">
              <div className="card-img">
                <div className="card-img-bg ci-1"><div className="card-pattern" /><div className="card-icon">⚡</div></div>
              </div>
              <div className="card-body">
                <div className="feat-cat">{post.category?.name || 'Guide'}</div>
                <h4>{post.title}</h4>
                <div className="feat-meta">
                  <span className="mono">{post.readTime || 8} min</span>
                  <span className="dot" />
                  <span>{formatDate(post.publishedDate)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
