import Link from 'next/link';

export default function Dashboard() {
  const reports = [
    { id: 1, name: 'Ventas por Categoria', desc: 'Analisis de ingresos por rubro.', color: 'border-blue-600' },
    { id: 2, name: 'Ranking de Clientes', desc: 'Usuarios con mayor volumen de compra.', color: 'border-slate-800' },
    { id: 3, name: 'Alertas de Stock', desc: 'Productos con inventario bajo.', color: 'border-red-600' },
    { id: 4, name: 'Ventas Mensuales', desc: 'Historico de facturacion por mes.', color: 'border-emerald-600' },
    { id: 5, name: 'Monitor de Pedidos', desc: 'Estatus de ordenes actuales.', color: 'border-amber-600' },
  ];

  return (
    <main className="min-h-screen p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-200 pb-8">
          <h1 className="text-3xl font-bold tracking-tight">Gestion de Reportes</h1>
          <p className="text-slate-500 mt-2 font-medium">Panel Administrativo - Tarea 6</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((r) => (
            <Link key={r.id} href={`/reports/${r.id}`} className="group">
              <div className={`h-full bg-white border-t-4 ${r.color} p-6 shadow-sm hover:shadow-md transition-all`}>
                <h2 className="text-xl font-semibold group-hover:text-blue-700">{r.name}</h2>
                <p className="text-slate-500 text-sm mt-3">{r.desc}</p>
                <div className="mt-6 text-xs font-bold text-blue-600 uppercase tracking-wider">Consultar →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}