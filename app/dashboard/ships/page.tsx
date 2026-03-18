import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { Ship } from 'lucide-react';

export default async function ShipsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  const payload = await decrypt(session);

  const ships = await prisma.ship.findMany({
    where: { companyId: payload.id as string },
    include: { _count: { select: { reports: true } } }
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Donanma (Gemiler)</h1>
        <p className="text-slate-500 mt-1">Şirketinize kayıtlı aktif gemilerin listesi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ships.length === 0 && (
          <p className="text-slate-500">Kayıtlı geminiz bulunmamaktadır.</p>
        )}
        {ships.map(ship => (
          <div key={ship.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className="bg-blue-50 p-4 rounded-xl text-blue-600">
              <Ship className="w-8 h-8"/>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{ship.name}</h3>
              <p className="text-sm text-slate-500">IMO: {ship.imoNumber || 'Bilinmiyor'}</p>
              <p className="text-xs font-semibold text-blue-600 mt-1">{ship._count.reports} Rapor İletildi</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
