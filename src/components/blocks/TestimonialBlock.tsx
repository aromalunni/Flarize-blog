// Strapi can send:
// 1. { testimonial: { quote, customerName, systemSize, location, ... } } (relation to testimonials collection)
// 2. { quote, customerName, detail } (inline on the block itself from mock data)
// CSS: .testimonial, .testimonial blockquote, .t-name, .t-detail
export default function TestimonialBlock({ testimonial, quote, customerName, detail }: {
  testimonial?: any; quote?: string; customerName?: string; detail?: string;
}) {
  const q = quote || testimonial?.quote;
  const name = customerName || testimonial?.customerName;
  const det = detail || testimonial?.detail ||
    [testimonial?.systemSize, testimonial?.location, testimonial?.installDate].filter(Boolean).join(' · ');

  if (!q) return null;

  return (
    <div className="testimonial">
      <blockquote>&ldquo;{q}&rdquo;</blockquote>
      {name && <div className="t-name">{name}</div>}
      {det && <div className="t-detail">{det}</div>}
    </div>
  );
}
