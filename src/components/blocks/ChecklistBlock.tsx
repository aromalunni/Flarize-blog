'use client';

// CSS: .checklist, .checklist-item, .checklist-box, .checklist-item.checked
interface CheckItem { text: string; }

export default function ChecklistBlock({ heading, items }: { heading?: string; items?: CheckItem[] }) {
  if (!items?.length) return null;

  function toggle(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.classList.toggle('checked');
  }

  return (
    <div className="checklist">
      {heading && <h4>{heading}</h4>}
      {items.map((item, i) => (
        <div key={i} className="checklist-item" onClick={toggle}>
          <div className="checklist-box">✓</div>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
