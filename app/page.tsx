import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white shadow-sm sticky top-0 z-50">
        <div className="">
          <img src="public/gemil" alt="" />
        </div>
        <div className="space-x-8 font-medium text-slate-600">
          <a href="#features" className="hover:text-blue-600 transition">Özellikler</a>
          <a href="#about" className="hover:text-blue-600 transition">Hakkımızda</a>
          <Link href="/login" className="bg-blue-900 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition shadow-lg">
            Giriş Yap
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-24 px-8 flex flex-col items-center text-center bg-gradient-to-b from-white to-slate-100">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 max-w-4xl leading-tight">
          Gemi ve Kara Ofisi Arasında <span className="text-blue-700">Akıllı Teknik İletişim</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600 max-w-2xl leading-relaxed">
          Sistematik ve sürdürülebilir bir altyapı ile gemi verilerini anlık izleyin, 
          performans trendlerini analiz edin ve arızaları henüz oluşmadan durdurun.
        </p>
        <div className="mt-10 flex gap-4">
          <Link href="/register" className="bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-800 shadow-xl transition-all hover:scale-105">
            Hemen Başlayın
          </Link>
          <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white transition-all">
            Demoyu İzle
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="text-4xl mb-4 text-blue-600">📊</div>
            <h3 className="text-xl font-bold mb-3">Performans Analizi</h3>
            <p className="text-slate-600">Ana ve yardımcı makinelerin performans trendlerini merkezi bir platformdan izleyin.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="text-4xl mb-4 text-blue-600">🚨</div>
            <h3 className="text-xl font-bold mb-3">Erken Arıza Tespiti</h3>
            <p className="text-slate-600">Kritik parametre sapmalarını yakalayarak plansız duruşların önüne geçin.</p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="text-4xl mb-4 text-blue-600">📱</div>
            <h3 className="text-xl font-bold mb-3">Dijital Raporlama</h3>
            <p className="text-slate-600">Manuel raporlama yükünü azaltın, hata payını minimize edin.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 text-center text-slate-500">
        <p>&copy; 2026 Shiplytics - Modern Denizcilik Yönetimi</p>
      </footer>
    </div>
  );
}