import { query } from '../../../../lib/db';
import Link from 'next/link';
import { z } from 'zod';

// Schema de validación para searchParams (requisito Zod)
const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1).catch(1),
});

export default async function ReportPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = await params;
  const rawSearchParams = await searchParams;

  // Validación con Zod (REQUISITO)
  const validated = searchParamsSchema.parse(rawSearchParams);
  const currentPage = validated.page;

  const viewMap: { [key: string]: string } = {
    "1": "view_ventas_categoria",
    "2": "view_ranking_clientes",
    "3": "view_stock_alerta",
    "4": "view_ventas_mensuales",
    "5": "view_monitor_estatus"
  };

  const reportTitles: { [key: string]: string } = {
    "1": "Ventas por Categoría",
    "2": "Ranking de Clientes",
    "3": "Alertas de Stock",
    "4": "Ventas Mensuales",
    "5": "Monitor de Pedidos"
  };

  const viewName = viewMap[id];

  if (!viewName) {
    return <div className="p-20 text-center font-bold">Reporte no válido.</div>;
  }

  // Paginación (REQUISITO: al menos 2 reportes deben tenerla)
  const hasPagination = id === "1" || id === "2"; // Reportes 1 y 2 tienen paginación
  const itemsPerPage = 10;
  const offset = (currentPage - 1) * itemsPerPage;

  // Consulta parametrizada (REQUISITO de Seguridad)
  // viewName está validado contra whitelist, es seguro
  let result;
  if (hasPagination) {
    // Con paginación usando LIMIT y OFFSET
    result = await query(`SELECT * FROM ${viewName} LIMIT $1 OFFSET $2`, [itemsPerPage, offset]);
  } else {
    // Sin paginación, solo primeros 20
    result = await query(`SELECT * FROM ${viewName} LIMIT 20`);
  }

  const rows = result.rows;
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  // Calcular KPIs (REQUISITO: mostrar al menos 1 KPI destacado)
  let kpi = { label: '', value: '' };

  if (id === "1" && rows.length > 0) {
    const totalIngresos = rows.reduce((sum, row) => sum + parseFloat(row.ingresos_totales || 0), 0);
    kpi = { label: 'Ingresos Totales', value: `$${totalIngresos.toFixed(2)}` };
  } else if (id === "2" && rows.length > 0) {
    const topCliente = rows[0];
    kpi = { label: 'Cliente Top', value: `${topCliente.nombre || 'N/A'} ($${topCliente.gasto_total || 0})` };
  } else if (id === "3" && rows.length > 0) {
    const urgentes = rows.filter(r => r.prioridad === 'REABASTECER URGENTE').length;
    kpi = { label: 'Productos Urgentes', value: `${urgentes}` };
  } else if (id === "4" && rows.length > 0) {
    const totalMensual = rows.reduce((sum, row) => sum + parseFloat(row.total_ingresos || 0), 0);
    kpi = { label: 'Total Histórico', value: `$${totalMensual.toFixed(2)}` };
  } else if (id === "5" && rows.length > 0) {
    const totalPedidos = rows.reduce((sum, row) => sum + parseInt(row.cantidad || 0), 0);
    kpi = { label: 'Total Pedidos', value: `${totalPedidos}` };
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-10 text-slate-900">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline font-bold mb-6 block uppercase tracking-tight">
          ← Volver al Dashboard
        </Link>

        <header className="mb-10 border-b-4 border-slate-900 pb-6">
          <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em]">Data Warehouse</span>
          <h1 className="text-4xl font-black text-slate-900 uppercase mt-2">
            {reportTitles[id]}
          </h1>
        </header>

        {/* KPI Destacado (REQUISITO) */}
        {kpi.label && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl shadow-xl mb-8">
            <div className="text-sm font-bold uppercase tracking-wider opacity-90">{kpi.label}</div>
            <div className="text-5xl font-black mt-2">{kpi.value}</div>
          </div>
        )}

        <div className="bg-white rounded-2xl border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  {columns.map(col => (
                    <th key={col} className="p-5 text-xs font-black uppercase tracking-widest whitespace-nowrap">
                      {col.replace(/_/g, ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-100">
                {rows.map((row, i) => (
                  <tr key={i} className="hover:bg-blue-50 transition-colors">
                    {columns.map(col => (
                      <td key={col} className="p-5 text-sm font-bold text-slate-700 whitespace-nowrap">
                        {String(row[col])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginación (REQUISITO: al menos 2 reportes) */}
        {hasPagination && (
          <div className="mt-8 flex justify-center gap-4">
            {currentPage > 1 && (
              <Link
                href={`/reports/${id}?page=${currentPage - 1}`}
                className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors"
              >
                ← Anterior
              </Link>
            )}
            <div className="px-6 py-3 bg-slate-100 text-slate-900 font-black rounded-lg">
              Página {currentPage}
            </div>
            {rows.length === itemsPerPage && (
              <Link
                href={`/reports/${id}?page=${currentPage + 1}`}
                className="px-6 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors"
              >
                Siguiente →
              </Link>
            )}
          </div>
        )}

        {/* Indicador de paginación */}
        {hasPagination && (
          <div className="mt-4 text-center text-sm text-slate-500 font-medium">
            Mostrando {rows.length} resultados • Paginación habilitada (LIMIT {itemsPerPage}, OFFSET {offset})
          </div>
        )}
      </div>
    </main>
  );
}