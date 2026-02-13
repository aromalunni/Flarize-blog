'use client';

// CSS: .faq-section, .faq-item, .faq-q, .faq-q .icon, .faq-q.open .icon, .faq-a, .faq-a.open
interface FaqItem { question: string; answer: string; }

export default function FaqBlock({ heading, questions }: { heading?: string; questions?: FaqItem[] }) {
  if (!questions?.length) return null;

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = e.currentTarget;
    btn.classList.toggle('open');
    const answer = btn.nextElementSibling;
    if (answer) answer.classList.toggle('open');
  }

  return (
    <div className="faq-section">
      {heading && <h2>{heading}</h2>}
      {questions.map((q, i) => (
        <div key={i} className="faq-item">
          <button className="faq-q" type="button" onClick={toggle}>
            {q.question}
            <span className="icon">+</span>
          </button>
          <div className="faq-a">{q.answer}</div>
        </div>
      ))}
    </div>
  );
}
