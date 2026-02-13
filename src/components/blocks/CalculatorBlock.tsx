'use client';
import { useState } from 'react';

// CSS: .cta-calc, .calc-row, .calc-input, .btn-brand, .stats .stat .num .lbl
export default function CalculatorBlock({ heading, description, placeholder }: {
  heading?: string; description?: string; placeholder?: string;
}) {
  const [bill, setBill] = useState('');
  const [result, setResult] = useState<{ annual: string; payback: string; lifetime: string } | null>(null);

  function calculate() {
    const b = parseInt(bill);
    if (!b || b < 100) return;
    const annual = Math.round((b / 2) * 12 * 0.75);
    const payback = (127000 / annual).toFixed(1);
    const lifetime = ((annual * 25) / 100000).toFixed(1);
    setResult({
      annual: '₹' + annual.toLocaleString('en-IN'),
      payback: payback + ' yrs',
      lifetime: '₹' + lifetime + 'L',
    });
  }

  return (
    <div className="cta-calc">
      <h4>{heading || 'See your actual savings in 30 seconds'}</h4>
      {description && <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '12px' }}>{description}</p>}
      <div className="calc-row">
        <input
          className="calc-input"
          type="number"
          inputMode="numeric"
          placeholder={placeholder || 'Your bimonthly KSEB bill (₹)'}
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />
        <button className="btn-brand" type="button" onClick={calculate}>Calculate My Savings →</button>
      </div>
      {result && (
        <div style={{ marginTop: '16px', padding: '16px', background: 'var(--white)', borderRadius: 'var(--r-sm)', border: '1px solid var(--green-border)' }}>
          <div className="stats stats-3">
            <div className="stat" style={{ background: 'var(--green-bg)' }}>
              <div className="num" style={{ color: 'var(--green)' }}>{result.annual}</div>
              <div className="lbl">Annual Savings</div>
            </div>
            <div className="stat" style={{ background: 'var(--green-bg)' }}>
              <div className="num" style={{ color: 'var(--green)' }}>{result.payback}</div>
              <div className="lbl">Payback Period</div>
            </div>
            <div className="stat" style={{ background: 'var(--green-bg)' }}>
              <div className="num" style={{ color: 'var(--green)' }}>{result.lifetime}</div>
              <div className="lbl">25-Year Savings</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
