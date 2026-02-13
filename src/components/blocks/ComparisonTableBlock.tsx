export default function ComparisonTableBlock({ tableData }: { tableData?: any }) {
  if (!tableData) return null;
  let data = tableData;
  if (typeof tableData === 'string') {
    try { data = JSON.parse(tableData); } catch { return null; }
  }
  const headers = data.headers;
  const rawRows = data.rows;
  if (!headers || !rawRows) return null;
  function rowToCells(row: any): string[] {
    if (!row) return [];
    if (Array.isArray(row)) return row;
    const result: string[] = [];
    for (let i = 0; i < headers.length; i++) {
      result.push(String(row[headers[i]] || ''));
    }
    return result;
  }
  const tableRows: string[][] = [];
  for (let i = 0; i < rawRows.length; i++) {
    tableRows.push(rowToCells(rawRows[i]));
  }
  return (
    <div style={{ overflowX: 'auto', margin: '24px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e7e4df', borderRadius: '6px', overflow: 'hidden' }}>
        <thead>
          <tr>
            {headers.map(function(h: string, i: number) {
              return <th key={i} style={{ background: '#18160f', color: '#fff', padding: '12px 16px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px', textAlign: 'left' as const }}>{h}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {tableRows.map(function(cells: string[], ri: number) {
            return (
              <tr key={ri}>
                {cells.map(function(cell: string, ci: number) {
                  return <td key={ci} style={{ padding: '12px 16px', borderBottom: '1px solid #f0ede8', fontSize: '14px', color: ci === 0 ? '#18160f' : '#3d3a33', fontWeight: ci === 0 ? 600 : 400, background: '#fff' }} dangerouslySetInnerHTML={{ __html: cell }} />;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
