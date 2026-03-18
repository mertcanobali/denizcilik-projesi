import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { OverviewAreaChart, ShipsBarChart } from '@/components/Charts';
import { Ship, FileText, AlertTriangle, TrendingUp } from 'lucide-react';

export default async function DashboardOverview() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  const payload = await decrypt(session);

  // Veritabanından o şirkete ait gemileri ve raporları çek
  const ships = await prisma.ship.findMany({
    where: { companyId: payload.id as string },
    include: {
      _count: {
        select: { reports: true }
      }
    }
  });

  const totalShips = ships.length;
  const totalReports = ships.reduce((acc, ship) => acc + ship._count.reports, 0);

  // Örnek: Son 7 günün rapor yoğunluğu simülasyonu (Gerçek senaryoda veritabanı gruplanır)
  const chartData = [
    { name: 'Pzt', value: 12 },
    { name: 'Sal', value: 19 },
    { name: 'Çar', value: 15 },
    { name: 'Per', value: 22 },
    { name: 'Cum', value: 28 },
    { name: 'Cmt', value: 21 },
    { name: 'Paz', value: 18 },
  ];

  const barData = ships.map(s => ({
    shipName: s.name,
    raporSayisi: s._count.reports
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Filo Genel Bakış</h1>
        <p className="text-slate-500 mt-1">Donanmanızın genel performansı ve canlı veri akışı.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/60 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Ship className="w-16 h-16" /></div>
          <p className="text-sm font-semibold text-slate-500 mb-1">Toplam Gemi</p>
          <div className="text-4xl font-bold text-slate-800">{totalShips}</div>
          <p className="text-sm text-green-600 mt-2 font-medium flex items-center"><TrendingUp className="w-4 h-4 mr-1"/> Aktif</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/60 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><FileText className="w-16 h-16" /></div>
          <p className="text-sm font-semibold text-slate-500 mb-1">Gelen Raporlar</p>
          <div className="text-4xl font-bold text-slate-800">{totalReports}</div>
          <p className="text-sm text-blue-600 mt-2 font-medium flex items-center">Mobil API üzerinden</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/60 relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-orange-500 group-hover:scale-110 transition-transform"><AlertTriangle className="w-16 h-16" /></div>
          <p className="text-sm font-semibold text-slate-500 mb-1">Uyarılar</p>
          <div className="text-4xl font-bold text-slate-800">0</div>
          <p className="text-sm text-slate-400 mt-2 font-medium">Her şey normal</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/60">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Rapor Yoğunluğu (Son 7 Gün)</h3>
          <p className="text-sm text-slate-500 mb-4">Gemilerden gelen günlük rapor frekans trendi</p>
          <OverviewAreaChart data={chartData} />
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/60">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Gemi Bazlı Rapor Dağılımı</h3>
          <p className="text-sm text-slate-500 mb-4">Hangi gemiden ne kadar rapor alındığı</p>
          <ShipsBarChart data={barData} />
        </div>
      </div>
      
    </div>
  );
}
