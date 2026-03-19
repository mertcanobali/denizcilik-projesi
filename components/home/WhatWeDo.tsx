// components/home/WhatWeDo.tsx
export default function WhatWeDo() {
  const features = [
    {
      icon: "📊",
      title: "Performans Analizi",
      desc: "Makinelerin performans trendlerini merkezi platformdan izleyin.",
    },
    {
      icon: "🚨",
      title: "Erken Arıza Tespiti",
      desc: "Kritik sapmaları yakalayarak plansız duruşların önüne geçin.",
    },
    {
      icon: "📱",
      title: "Dijital Raporlama",
      desc: "Manuel raporlama yükünü ve hata payını minimize edin.",
    },
  ];

  return (
    <section id="features" className="py-20 px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
        Neler Yapıyoruz?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-black">{f.title}</h3>
            <p className="text-black text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
