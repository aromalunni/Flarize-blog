// CSS: .cta-hard, .cta-hard h4, .cta-hard p, .btn-brand, .btn-ghost
interface Btn { text?: string; url?: string; style?: string; }

export default function HardCtaBlock({ heading, description, primaryButton, secondaryButton, phoneNumber }: {
  heading?: string; description?: string; primaryButton?: Btn; secondaryButton?: Btn; phoneNumber?: string;
}) {
  return (
    <div className="cta-hard">
      <h4>{heading || 'Ready to stop paying high KSEB bills?'}</h4>
      <p>{description || 'Free consultation. Free site assessment. We handle all KSEB paperwork.'}</p>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {primaryButton?.text && (
          <a href={primaryButton.url || '/contact'} className="btn-brand" style={{ margin: '0 6px' }}>{primaryButton.text}</a>
        )}
        {secondaryButton?.text ? (
          <a href={secondaryButton.url || '#'} className="btn-ghost">{secondaryButton.text}</a>
        ) : phoneNumber ? (
          <a href={`tel:${phoneNumber}`} className="btn-ghost">Call: {phoneNumber}</a>
        ) : null}
      </div>
    </div>
  );
}
