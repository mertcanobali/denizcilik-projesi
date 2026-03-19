// components/home/Head.tsx
export default function Head() {
  return (
    <section className="relative py-20 px-8 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* SOL: Logo ve Altında Şirket Adı */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start space-y-4">
          <div className="w-32 h-32 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-white font-bold text-2xl">LOGO</span>
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">
            SHIPLYTICS
          </h2>
        </div>

        {/* SAĞ: Başlık ve Metin */}
        <div className="w-full md:w-2/3 text-center md:text-right">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Gemi ve Kara Ofisi Arasında <br />
            <span className="text-blue-700">Akıllı Teknik İletişim</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl ml-auto leading-relaxed">
            Sistematik ve sürdürülebilir bir altyapı ile gemi verilerini anlık
            izleyin, performans trendlerini analiz edin ve arızaları henüz
            oluşmadan durdurun.
          </p>
        </div>
      </div>
    </section>
  );
}
