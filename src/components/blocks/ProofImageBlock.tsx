import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi';

export default function ProofImageBlock({ image, caption, size }: {
  image?: any; caption?: string; size?: string;
}) {
  if (!image?.url) return null;
  const src = getStrapiMedia(image.url);
  return (
    <figure style={{ margin: '28px 0 8px' }}>
      <div style={{
        borderRadius: 'var(--r-sm)', overflow: 'hidden',
        border: '1px solid var(--border)', background: 'var(--white)',
        maxWidth: size === 'small' ? '400px' : undefined,
      }}>
        <Image src={src} alt={image.alternativeText || caption || ''}
          width={image.width || 700} height={image.height || 400}
          style={{ width: '100%', height: 'auto' }} />
      </div>
      {caption && (
        <figcaption style={{
          fontSize: '12px', color: 'var(--text-l)',
          marginBottom: '28px', fontStyle: 'italic', textAlign: 'center', marginTop: '6px',
        }}>{caption}</figcaption>
      )}
    </figure>
  );
}
