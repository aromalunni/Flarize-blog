// Strapi schema: { type: 'tip'|'warning'|'insight'|'brand', content: string (richtext) }
// CSS has: .c-insight, .c-warning, .c-tip, .c-danger AND .callout-insight, .callout-warning, .callout-tip
export default function CalloutBlock({ type, content }: { type?: string; content?: string }) {
  if (!content) return null;
  const cls = type === 'warning' ? 'c-warning'
    : type === 'tip' ? 'c-tip'
    : type === 'danger' ? 'c-danger'
    : 'c-insight'; // 'insight' and 'brand' both map to c-insight
  return (
    <div className={`callout ${cls}`}>
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
