import { query } from '../../../../lib/db';
import Link from 'next/link';

export default async function ReportPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  const viewMap: { [key: string]: string } = {
  "1": "view_ventas_categoria",
  "2": "view_ranking_clientes",
  "3": "view_stock_alerta",
  "4": "view_ventas_mensuales",
  "5": "view_monitor_estatus"
};

  const viewName = viewMap[id];
  
  if (!viewName) return <div className="p-20 text-center font-bold">Reporte no válido.</div>;

  const result = await query(`SELECT * FROM ${viewName} LIMIT 20`);
  const rows = result.rows;
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <main className="min-h-screen bg-white p-10 text-slate-900">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline font-bold mb-6 block uppercase tracking-tight">
          ← Volver al Dashboard
        </Link>
        
        <header className="mb-10 border-b-4 border-slate-900 pb-6">
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em]">Data Warehouse</span>
          <h1 className="text-4xl font-black text-slate-900 uppercase mt-2">
            {viewName.replace('view_', '').replace(/_/g, ' ')}
          </h1>
        </header>

        <div className="bg-white rounded-2xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                {columns.map(col => (
                  <th key={col} className="p-5 text-xs font-black uppercase tracking-widest">{col.replace(/_/g, ' ')}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-blue-50 transition-colors">
                  {columns.map(col => (
                    <td key={col} className="p-5 text-sm font-bold text-slate-700">{String(row[col])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}