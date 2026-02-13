// Strapi schema: { stats: [{ value: string, label: string, color?: string }] }
// CSS: .stats .stats-3 .stats-4 .stat .num .lbl (from doc2 appended CSS)
interface Stat {
  value: string;
  label: string;
  color?: string;
}

export default function StatRowBlock({ stats }: { stats?: Stat[] }) {
  if (!stats?.length) return null;
  const cls = stats.length >= 4 ? 'stats-4' : 'stats-3';

  return (
    <div className={`stats ${cls}`}>
      {stats.map((s, i) => (
        <div key={i} className="stat">
          <div className="num">{s.value}</div>
          <div className="lbl">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
