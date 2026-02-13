import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedPosts, getStrapiMedia, formatDate, getHomepage } from '@/lib/strapi';

const FALLBACK_HERO = {
  title: 'Elevate Your Everyday with Solar',
  highlightText: "India's First Solar Booking Platform",
  subtitle: "Stop paying high electricity bills. Get ₹78,000 government subsidy and switch to solar with Kerala's most trusted installation partner.",
  ctaText: 'Book Free Consultation →',
  ctaLink: '/contact',
  secondaryCtaText: 'Read Our Blog',
  secondaryCtaLink: '/blog',
};

const FALLBACK_STATS = [
  { value: '500+', label: 'Installations', suffix: '' },
  { value: '8', label: 'Years Experience', suffix: '+' },
  { value: '₹78K', label: 'Max Subsidy', suffix: '' },
  { value: '4.9', label: 'Google Rating', suffix: '★' },
];

const FALLBACK_FEATURES = [
  { icon: '🛡', title: 'Lifetime Support', description: "We don't disappear after installation. Flarize maintains your relationship — warranty claims, performance checks, cleaning." },
  { icon: '⚡', title: 'Certified Installers', description: 'Every installer is MNRE-certified and matched to your project via our algorithm.' },
  { icon: '📋', title: 'End-to-End Process', description: 'From subsidy application to KSEB net meter — we handle every step.' },
  { icon: '💰', title: '₹78,000 Subsidy Help', description: 'We handle your PM Surya Ghar application and ensure you get maximum subsidy benefit.' },
];

const FALLBACK_SERVICES = [
  { title: 'Residential Solar', description: '1kW to 10kW rooftop systems for homes. Net metering, subsidy assistance, and lifetime support.', link: '/residential' },
  { title: 'Commercial Solar', description: '10kW to 500kW systems for businesses and institutions. Maximize savings with accelerated depreciation.', link: '/commercial' },
];

export default async function HomePage() {
  const [homepage, featured] = await Promise.all([
    getHomepage(),
    getFeaturedPosts(),
  ]);

  const hero = homepage?.hero || FALLBACK_HERO;
  const stats = homepage?.stats?.length ? homepage.stats : FALLBACK_STATS;
  const features = homepage?.features?.length ? homepage.features : FALLBACK_FEATURES;
  const services = homepage?.services?.length ? homepage.services : FALLBACK_SERVICES;
  const ctaSection = homepage?.ctaSection || null;
  const featuresHeading = homepage?.featuresHeading || 'Why Choose Flarize?';
  const servicesHeading = homepage?.servicesHeading || 'Our Solutions';
  const heroImage = hero.backgroundImage?.url ? getStrapiMedia(hero.backgroundImage.url) : null;

  return (
    <>
      <div className="cta-hard" style={{ borderRadius: 0, margin: 0, padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
        {heroImage && (
          <Image src={heroImage} alt={hero.title} fill style={{ objectFit: 'cover', opacity: 0.2 }} priority />
        )}
        {hero.highlightText && (
          <p className="mono" style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--brand-soft)', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
            {hero.highlightText}
          </p>
        )}
        <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(36px,6vw,64px)', fontWeight: 400, lineHeight: 1.1, marginBottom: '24px', maxWidth: '700px', margin: '0 auto 24px', position: 'relative', zIndex: 1, color: 'var(--white)', textAlign: 'left' }}>
          {hero.title}
        </h1>
        {hero.subtitle && (
          <p style={{ fontSize: '18px', color: '#a8a29e', maxWidth: '520px', marginBottom: '32px', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
            {hero.subtitle}
          </p>
        )}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <Link href={hero.ctaLink || '/contact'} className="btn-brand" style={{ padding: '14px 32px', fontSize: '16px' }}>
            {hero.ctaText || 'Book Free Consultation →'}
          </Link>
          {hero.secondaryCtaText && (
            <Link href={hero.secondaryCtaLink || '/blog'} className="btn-ghost" style={{ padding: '14px 32px', fontSize: '16px' }}>
              {hero.secondaryCtaText}
            </Link>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '48px', fontSize: '13px', color: '#78716c', position: 'relative', zIndex: 1 }}>
          <span>✓ KSEB Empanelled</span><span>✓ 500+ Installations</span><span>✓ 8 Years Experience</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#e7e4df', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        {stats.map((stat: any, i: number) => (
          <div key={i} style={{ background: 'var(--white)', padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: '36px', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1 }}>
              {stat.value}{stat.suffix || ''}
            </div>
            <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '8px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="section" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 24px' }}>
          <div className="section-label" style={{ marginBottom: '4px' }}>What We Offer</div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '32px', fontWeight: 400, marginBottom: '40px' }}>{featuresHeading}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {features.map((f: any, i: number) => (
              <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '8px', padding: '32px 24px' }}>
                {f.image?.url ? (
                  <Image src={getStrapiMedia(f.image.url)} alt={f.title} width={48} height={48} style={{ borderRadius: '8px', marginBottom: '16px' }} />
                ) : f.icon ? (
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
                ) : null}
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>{f.title}</h3>
                {f.description && <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: '4px' }}>Solutions</div>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '32px', fontWeight: 400, marginBottom: '40px' }}>{servicesHeading}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {services.map((s: any, i: number) => (
              <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
                {s.image?.url && (
                  <div style={{ position: 'relative', height: '200px' }}>
                    <Image src={getStrapiMedia(s.image.url)} alt={s.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>{s.title}</h3>
                  {s.description && <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>{s.description}</p>}
                  {s.link && <Link href={s.link} style={{ fontSize: '14px', fontWeight: 600, color: 'var(--brand)' }}>Learn more →</Link>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cta-hard" style={{ borderRadius: 0, margin: 0, padding: '64px 24px', textAlign: 'center', position: 'relative' }}>
        {ctaSection?.backgroundImage?.url && (
          <Image src={getStrapiMedia(ctaSection.backgroundImage.url)} alt={ctaSection.title} fill style={{ objectFit: 'cover', opacity: 0.15 }} />
        )}
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 400, color: 'var(--white)', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
          {ctaSection?.title || 'Ready to Go Solar?'}
        </h2>
        <p style={{ fontSize: '16px', color: '#a8a29e', maxWidth: '500px', margin: '0 auto 32px', position: 'relative', zIndex: 1 }}>
          {ctaSection?.description || 'Get a free consultation and find out how much you can save with solar energy.'}
        </p>
        <Link href={ctaSection?.buttonLink || '/contact'} className="btn-brand" style={{ padding: '16px 40px', fontSize: '16px', position: 'relative', zIndex: 1 }}>
          {ctaSection?.buttonText || 'Get Free Quote →'}
        </Link>
      </div>

      {featured.length > 0 && (
        <div className="section" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px', maxWidth: 'var(--max-w)', margin: '0 auto 24px', padding: '0 24px' }}>
            <div>
              <div className="section-label" style={{ marginBottom: '4px' }}>From the Blog</div>
              <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '28px', fontWeight: 400 }}>Latest Guides</h2>
            </div>
            <Link href="/blog" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--brand)' }}>View all posts →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '20px', maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 24px' }}>
            {featured.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div className="article-card">
                  {post.heroImage?.url && (
                    <div className="card-img">
                      <Image src={getStrapiMedia(post.heroImage.url)} alt={post.title} width={400} height={225} style={{ width: '100%', height: '100%', objectFit: 'cover' }} sizes="33vw" />
                    </div>
                  )}
                  <div className="card-body">
                    {post.category && <div className="feat-cat">{post.category.name}</div>}
                    <h4>{post.title}</h4>
                    <div className="feat-meta">
                      <span>{formatDate(post.publishedDate)}</span>
                      <span className="dot" />
                      <span className="mono">{post.readTime || 8} min</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
