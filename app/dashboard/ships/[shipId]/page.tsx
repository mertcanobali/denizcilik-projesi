import { query } from "@/lib/db";
import { OverviewAreaChart } from "@/components/Charts";
import { notFound } from "next/navigation";
import { Ship, Activity, Gauge, Navigation } from "lucide-react";

export default async function ShipDetailPage({
  params,
}: {
  params: { shipId: string };
}) {
  const { shipId } = params;

  // 1. Gemi bilgilerini getir
  const shipRes = await query("SELECT * FROM ships WHERE id = $1", [shipId]);
  const ship = shipRes.rows[0];
  if (!ship) notFound();

  // 2. Son 7 günlük grafik verisi (Trend Analizi)
  const chartRes = await query(
    `
    SELECT 
      report_date,
      (report_data->'main_engine'->>'rpm')::numeric as rpm,
      (report_data->'navigation_ops'->>'speed')::numeric as speed
    FROM ship_reports 
    WHERE ship_id = $1 
    AND report_date > CURRENT_DATE - INTERVAL '7 days'
    ORDER BY report_date ASC`,
    [shipId],
  );

  const chartData = chartRes.rows.map((r) => ({
    name: new Date(r.report_date).toLocaleDateString("tr-TR", {
      weekday: "short",
    }),
    RPM: r.rpm,
    Hız: r.speed,
  }));

  // 3. En güncel tek raporu getir (Alt kısımdaki detay kartı için)
  const latestReportRes = await query(
    `
    SELECT * FROM ship_reports 
    WHERE ship_id = $1 
    ORDER BY report_date DESC 
    LIMIT 1
  `,
    [shipId],
  );

  const latest = latestReportRes.rows[0];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Üst Başlık */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Ship size={20} />
            <span className="text-sm font-bold uppercase tracking-wider">
              Filo Yönetimi
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {ship.ship_name}
          </h1>
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-sm">Son Güncelleme</p>
          <p className="font-mono font-medium">
            {latest
              ? new Date(latest.report_date).toLocaleString("tr-TR")
              : "Veri Yok"}
          </p>
        </div>
      </div>

      {/* 1 Haftalık Grafik Alanı */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Activity className="text-red-500" size={20} /> Haftalık Performans
            Trendi
          </h3>
        </div>
        <div className="h-[350px] w-full">
          <OverviewAreaChart data={chartData} />
        </div>
      </div>

      {/* En Güncel Veri Kartları (Grid) */}
      {latest && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
            <Gauge className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10" />
            <p className="text-slate-400 text-sm font-medium">
              Ana Makine Devri
            </p>
            <h4 className="text-3xl font-bold mt-2">
              {latest.report_data.main_engine?.rpm}{" "}
              <span className="text-lg font-normal opacity-60">RPM</span>
            </h4>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <Navigation className="text-blue-500 mb-2" size={24} />
            <p className="text-slate-500 text-sm font-medium">Anlık Hız</p>
            <h4 className="text-3xl font-bold text-slate-900 mt-2">
              {latest.report_data.navigation_ops?.speed}{" "}
              <span className="text-lg font-normal text-slate-400">Knots</span>
            </h4>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <Activity className="text-orange-500 mb-2" size={24} />
            <p className="text-slate-500 text-sm font-medium">Draft / Trim</p>
            <h4 className="text-2xl font-bold text-slate-900 mt-2">
              {latest.report_data.navigation_ops?.draft_trim}
            </h4>
          </div>
        </div>
      )}

      {/* Rapor Detay Listesi (Tablo) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Geçmiş Kayıtlar</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs uppercase tracking-widest border-b">
              <th className="px-6 py-4 font-semibold">Tarih</th>
              <th className="px-6 py-4 font-semibold">M/E RPM</th>
              <th className="px-6 py-4 font-semibold">Hız</th>
              <th className="px-6 py-4 font-semibold">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {chartRes.rows.reverse().map((r, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-700">
                  {new Date(r.report_date).toLocaleDateString("tr-TR")}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{r.rpm}</td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {r.speed} kts
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-md uppercase">
                    Normal
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
