// CSS from doc1: .cta-proof, .proof-stats, .proof-stat, .proof-num, .proof-label
// CSS from doc2: .proof-stat .num .lbl (different class names!)
// Using doc1 class names since they're more specific
interface Btn { text?: string; url?: string; style?: string; }

export default function ProofCtaBlock({ stats, description, primaryButton, secondaryButton }: {
  stats?: any[]; description?: string; primaryButton?: Btn; secondaryButton?: Btn;
}) {
  return (
    <div className="cta-proof">
      {stats && stats.length > 0 && (
        <div className="proof-stats">
          {stats.map((s: any, i: number) => (
            <div key={i} className="proof-stat">
              <div className="proof-num">{s.value}</div>
              <div className="proof-label">{s.label}</div>
            </div>
          ))}
        </div>
      )}
      {description && <p>{description}</p>}
      <div className="btn-group">
        {primaryButton?.text && (
          <a href={primaryButton.url || '/contact'} className="btn-dark">{primaryButton.text}</a>
        )}
        {secondaryButton?.text && (
          <a href={secondaryButton.url || '/blog'} className="btn-outline">{secondaryButton.text}</a>
        )}
      </div>
    </div>
  );
}
