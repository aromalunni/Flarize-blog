import Link from 'next/link';
import Image from 'next/image';
import { getAllBlogPosts, getFeaturedPosts, getBlogCategories, getStrapiMedia, formatDate } from '@/lib/strapi';
import CategoryBar from './CategoryBar';

const CARD_STYLES = [
  { bg: 'ci-1', icon: '⚡' }, { bg: 'ci-2', icon: '🔑' }, { bg: 'ci-3', icon: '🌱' },
  { bg: 'ci-4', icon: '📊' }, { bg: 'ci-5', icon: '🏠' }, { bg: 'ci-6', icon: '☀️' },
  { bg: 'ci-7', icon: '💡' }, { bg: 'ci-8', icon: '🔧' }, { bg: 'ci-9', icon: '📋' },
];

function getTagClass(slug?: string): string {
  if (!slug) return 'tag-subsidy';
  if (slug.includes('subsidy') || slug.includes('cost') || slug.includes('saving')) return 'tag-subsidy';
  if (slug.includes('how') || slug.includes('guide')) return 'tag-guide';
  if (slug.includes('district') || slug.includes('local')) return 'tag-local';
  if (slug.includes('compare') || slug.includes('vs')) return 'tag-compare';
  if (slug.includes('news') || slug.includes('update')) return 'tag-urgent';
  return 'tag-subsidy';
}

export default async function BlogPage() {
  const [featured, allPosts, categories] = await Promise.all([
    getFeaturedPosts(),
    getAllBlogPosts(1, 12),
    getBlogCategories(),
  ]);

  const posts = allPosts.posts || [];
  const mainFeatured = featured[0] || posts[0];
  const sideFeatured = featured.slice(1, 4);
  const thumbClasses = ['st-1', 'st-2', 'st-3'];

  return (
    <>
      {/* Hero */}
      <div className="blog-hero">
        <div className="blog-hero-inner">
          <div>
            <h1>Solar <em>Knowledge Hub</em></h1>
            <p>Expert guides on subsidies, installation, and savings — built from 500+ Kerala installations.</p>
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search articles..." />
            <button>Search</button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <CategoryBar categories={categories} />

      {/* Featured Section */}
      <div className="section">
        <div className="section-label">Featured Guides</div>
        <div className="featured-grid anim-in visible">
          {mainFeatured && (
            <Link href={`/blog/${mainFeatured.slug}`} className="featured-main">
              <div className="feat-img">
                {mainFeatured.heroImage?.url ? (
                  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <Image
                      src={getStrapiMedia(mainFeatured.heroImage.url)}
                      alt={mainFeatured.heroImage.alternativeText || mainFeatured.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,.6))' }} />
                  </div>
                ) : (
                  <div className="feat-img-inner">
                    <svg viewBox="0 0 100 100" fill="none"><rect x="10" y="30" width="80" height="50" rx="3" stroke="white" strokeWidth="1.5"/></svg>
                  </div>
                )}
                <div className="feat-img-text">
                  {mainFeatured.category && <span className={`tag ${getTagClass(mainFeatured.category.slug)}`}>Pillar Guide</span>}
                  <h3>{mainFeatured.title}</h3>
                </div>
              </div>
              <div className="feat-body">
                {mainFeatured.subtitle && <div className="feat-excerpt">{mainFeatured.subtitle}</div>}
                <div className="feat-meta">
                  <span>{mainFeatured.author?.name || 'Flarize Team'}</span>
                  <span className="dot" />
                  <span className="mono">{mainFeatured.readTime || 8} min read</span>
                  <span className="dot" />
                  <span>{formatDate(mainFeatured.publishedDate)}</span>
                </div>
              </div>
            </Link>
          )}
          <div className="featured-side">
            {sideFeatured.map((post, i) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="side-card">
                <div className={`side-thumb ${thumbClasses[i] || 'st-1'}`} style={{ position: 'relative' }}>
                  {post.heroImage?.url ? (
                    <Image
                      src={getStrapiMedia(post.heroImage.url)}
                      alt={post.heroImage.alternativeText || post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="thumb-icon">{post.category?.icon || '₹'}</div>
                  )}
                </div>
                <div className="side-info">
                  <div className="feat-cat">{post.category?.name || 'Guide'}</div>
                  <h4>{post.title}</h4>
                  <div className="feat-meta">
                    <span className="mono">{post.readTime || 8} min</span>
                    <span className="dot" />
                    <span>{formatDate(post.publishedDate)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="newsletter">
        <div className="newsletter-inner anim-in visible">
          <div className="nl-text">
            <h3>Solar updates, straight to your inbox</h3>
            <p>Subsidy changes, KSEB updates, savings tips. No spam.</p>
          </div>
          <div className="nl-form">
            <input type="email" placeholder="Your email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Latest Articles */}
      <div className="section">
        <div className="section-label">Latest Articles</div>
        <div className="article-grid anim-stagger visible">
          {posts.map((post, i) => {
            const style = CARD_STYLES[i % CARD_STYLES.length];
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div className="article-card">
                  <div className="card-img">
                    {post.heroImage?.url ? (
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image
                          src={getStrapiMedia(post.heroImage.url)}
                          alt={post.heroImage.alternativeText || post.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <div className={`card-img-bg ${style.bg}`}>
                        <div className="card-pattern" />
                        <div className="card-icon">{style.icon}</div>
                      </div>
                    )}
                    {post.category && <span className={`tag ${getTagClass(post.category.slug)}`}>{post.category.name}</span>}
                  </div>
                  <div className="card-body">
                    <div className="feat-cat">{post.category?.name || 'Guide'}</div>
                    <h4>{post.title}</h4>
                    {post.subtitle && <div className="feat-excerpt">{post.subtitle}</div>}
                    <div className="feat-meta">
                      <span className="mono">{post.readTime || 8} min</span>
                      <span className="dot" />
                      <span>{formatDate(post.publishedDate)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="load-more"><button>Load more articles</button></div>
    </>
  );
}
