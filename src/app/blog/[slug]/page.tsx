import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllBlogSlugs, formatDate } from '@/lib/strapi';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import SidebarToc from '@/components/ui/SidebarToc';

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.seo?.metaTitle || `${post.title} — Flarize Blog`,
    description: post.seo?.metaDescription || post.subtitle || '',
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const postType = post.postType || 'subsidy-cost';
  const isNews = postType === 'news-trending';

  // Extract h2 headings from rich-text blocks for TOC
  const tocItems = (post.body || [])
    .filter((b: any) => b.__component === 'blocks.rich-text' && b.content)
    .flatMap((b: any) => {
      const matches = b.content.match(/^## (.+)$/gm) || [];
      return matches.map((m: string) => {
        const text = m.replace('## ', '');
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
        return { id, text };
      });
    });

  // Badge color
  const badgeClass = postType === 'how-to' ? 'badge-blue'
    : postType === 'news-trending' ? 'badge-red' : 'badge-green';

  return (
    <>
      {/* Urgency Strip - subsidy posts */}
      {post.urgencyStrip && (
        <div className="urgency-strip">{post.urgencyStrip}</div>
      )}

      {/* News Hero (dark background) */}
      {isNews ? (
        <div className="hero-news">
          <div className="news-tag">🔴 Urgent Update</div>
          <h1 style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: 'clamp(26px,4vw,38px)',
            fontWeight: 400, lineHeight: 1.3, marginBottom: '12px',
            position: 'relative', color: 'var(--white)',
          }}>
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="post-subtitle" style={{
              maxWidth: '560px', margin: '0 auto 24px',
              color: '#a8a29e', position: 'relative',
            }}>
              {post.subtitle}
            </p>
          )}
          <div className="author-row" style={{ background: 'rgba(255,255,255,.05)' }}>
            <div className="author-avatar">
              {post.author?.name?.[0] || 'F'}
            </div>
            <div className="author-info">
              <div className="author-name" style={{ color: 'var(--white)' }}>
                {post.author?.name || 'Flarize Team'}
              </div>
              <div className="author-meta" style={{ color: '#78716c' }}>
                {post.updatedDate ? `Updated ${formatDate(post.updatedDate)}` : formatDate(post.publishedDate)}
                {' · '}{post.readTime || 8} min read
                {post.author?.credentialBadge && (
                  <span className={`badge ${badgeClass}`}>
                    ⚡ {post.author.credentialBadge}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Post Hero - white background */
        <div className="post-hero" style={{ background: 'var(--white)', borderBottom: '1px solid var(--border)' }}>
          <div className="post-hero-inner">
            <div className="breadcrumb">
              <Link href="/blog">Blog</Link>
              {post.category && (
                <> → <Link href={`/blog/category/${post.category.slug}`}>{post.category.name}</Link></>
              )}
            </div>
            <h1>{post.title}</h1>
            {post.subtitle && <p className="post-subtitle">{post.subtitle}</p>}
            <div className="author-row">
              <div className="author-avatar">
                {post.author?.name?.[0] || 'F'}
              </div>
              <div className="author-info">
                <div className="author-name">{post.author?.name || 'Flarize Team'}</div>
                <div className="author-meta">
                  {post.updatedDate ? `Updated ${formatDate(post.updatedDate)}` : formatDate(post.publishedDate)}
                  {' · '}{post.readTime || 8} min read
                  {post.author?.credentialBadge && (
                    <span className={`badge ${badgeClass}`}>✓ {post.author.credentialBadge}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Layout: Main + Sidebar */}
      <div className="post-layout">
        <div className="post-main">
          {/* Mobile TOC */}
          {tocItems.length > 0 && (
            <div className="mobile-toc">
              <h4>What&apos;s in this guide</h4>
              {tocItems.map((item: any) => (
                <a key={item.id} href={`#${item.id}`}>{item.text}</a>
              ))}
            </div>
          )}

          {/* Schema Strip */}
          {(postType === 'subsidy-cost' || postType === 'how-to') && (
            <div className="schema-strip">
              <span className="schema-icon">✓</span>
              <span>
                This guide is verified against official KSEB and MNRE data as of{' '}
                {formatDate(post.updatedDate || post.publishedDate)}. Updated monthly.
              </span>
            </div>
          )}

          {/* Dynamic Zone Content - THIS IS THE BODY */}
          <BlockRenderer blocks={post.body || []} />

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="related">
              <div className="section-label">Related Articles</div>
              <div className="related-grid">
                {post.relatedPosts.slice(0, 3).map((rp: any) => (
                  <Link key={rp.slug || rp.id} href={`/blog/${rp.slug}`} className="related-card">
                    <div className="feat-cat">{rp.category?.name || 'Guide'}</div>
                    <h4>{rp.title}</h4>
                    <div className="mono" style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                      {rp.readTime || 8} min
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Sidebar TOC */}
        {tocItems.length > 0 && <SidebarToc items={tocItems} />}
      </div>
    </>
  );
}
