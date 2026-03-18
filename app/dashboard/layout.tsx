import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';
import { Anchor, BarChart3, Ship as ShipIcon, FileText, Settings, LogOut, Search, Bell } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  
  if (!session) {
    redirect('/login');
  }
  
  const payload = await decrypt(session);
  const companyName = payload?.name || 'Şirket Paneli';

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-full shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative z-20">
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/30 text-white">
            <Anchor className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold ml-3 tracking-tight text-slate-900">Shiplytics</span>
        </div>

        <div className="px-6 py-6 border-b border-slate-100/60 bg-slate-50/50">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Aktif Şirket</p>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {companyName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-slate-800 truncate leading-tight w-40" title={companyName as string}>{companyName}</p>
              <p className="text-xs text-green-600 font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                Bağlı
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Panel</p>
          
          <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors group">
            <BarChart3 className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="font-medium">Genel Bakış</span>
          </Link>

          <Link href="/dashboard/ships" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-colors group">
            <ShipIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="font-medium">Donanma (Gemiler)</span>
          </Link>

          <Link href="/dashboard/reports" className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-700 shadow-sm shadow-blue-900/5 group">
            <div className="relative">
              <FileText className="w-5 h-5 text-blue-600" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
            </div>
            <span className="font-semibold">Günlük Raporlar</span>
          </Link>

        </nav>

        <div className="p-4 border-t border-slate-200">
          <Link href="/dashboard/settings" className="flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 transition-colors">
            <Settings className="w-5 h-5 text-slate-400" />
            <span className="font-medium">Ayarlar</span>
          </Link>
          <form action="/api/auth/logout" method="POST" className="mt-1">
            <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-red-50 text-slate-600 hover:text-red-600 transition-colors">
              <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
              <span className="font-medium">Çıkış Yap</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col h-full bg-slate-50/50 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-200/[0.04] bg-[bottom_1px_center] pointer-events-none"></div>
        
        {/* Navbar */}
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center bg-slate-100/80 rounded-full px-4 py-2 w-96 border border-slate-200/50 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Gemi veya rapor ara..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
          </div>

          <div className="flex items-center space-x-5">
            <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
              <Bell className="w-5 h-5" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800 leading-tight">Canlı Veri</p>
              <p className="text-xs text-slate-500">Mobil API Aktif</p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative z-0">
          {children}
        </div>
      </main>
    </div>
  );
}
