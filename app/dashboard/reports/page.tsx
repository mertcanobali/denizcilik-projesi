import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { FileText, Calendar, Info } from 'lucide-react';

export default async function ReportsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  const payload = await decrypt(session);

  const reports = await prisma.report.findMany({
    where: { ship: { companyId: payload.id as string } },
    include: { ship: true },
    orderBy: { reportDate: 'desc' },
    take: 50
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Günlük Raporlar</h1>
        <p className="text-slate-500 mt-1">Gemilerden gelen en son günlük teknik formlar ve seyir verileri.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100/60 overflow-hidden">
        {reports.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
              <Info className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Henüz Rapor Yok</h3>
            <p className="text-slate-500 max-w-sm mt-2">Gemilerdeki mobil uygulamalardan henüz veri gelmemiş. Veri akışı sağlandığında burada anlık olarak listelenecektir.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100/80">
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Gemi Adı</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Rapor Tarihi</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-slate-500">Teknik Veri (HFO, M/E vb.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                        {report.ship.name.charAt(0)}
                      </div>
                      {report.ship.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                      {new Date(report.reportDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      <pre className="p-3 bg-slate-50 rounded-xl text-xs overflow-x-auto border border-slate-100 max-w-md text-slate-700 font-mono">
                        {JSON.stringify(report.data, null, 2)}
                      </pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
