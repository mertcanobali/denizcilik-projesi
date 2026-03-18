"use client";

import { use, useState } from "react";
import { useReports } from "@/hooks/useReports";
import { MainEngineForm } from "@/components/forms/main-engine-form";
import { GeneratorForm } from "@/components/forms/generator-form";
import { FluidForm } from "@/components/forms/fluid-form";

export default function ShipDetailPage({
  params,
}: {
  params: Promise<{ shipId: string }>;
}) {
  const resolvedParams = use(params);
  const { shipId } = resolvedParams;
  const { reports, loading, error } = useReports(shipId);

  const [activeTab, setActiveTab] = useState<"overview" | "forms">("overview");

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Gemi Detay - {shipId}
        </h1>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === "overview" ? "bg-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Genel Durum
          </button>
          <button
            onClick={() => setActiveTab("forms")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition ${activeTab === "forms" ? "bg-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Veri Girişi
          </button>
        </div>
      </div>
      
      {activeTab === "overview" ? (
        <>
          <section className="mt-4">
            <h2 className="text-xl font-semibold mb-2">10 Günlük Karşılaştırma Grafikleri</h2>
            {loading ? (
              <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
            ) : error ? (
              <div className="text-red-500">Raporlar yüklenemedi: {error.message}</div>
            ) : (
              <div className="h-64 bg-gray-50 border border-dashed rounded flex flex-col items-center justify-center text-gray-500">
                <span>{reports.length > 0 ? "Grafikler (Recharts vs) buraya yüklenecek." : "Veri bulunamadı."}</span>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Günlük Veri Tablosu</h2>
            <div className="bg-white border rounded shadow-sm overflow-hidden">
               {/* Daily Data Sheet Dummy Table */}
               <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarih</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">M/E RPM</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jeneratör Yükü</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">HFO Tüketimi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reports.length > 0 ? reports.map(r => (
                      <tr key={r.id}>
                        <td className="px-6 py-4 text-sm text-gray-900">{r.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{r.mainEngine.rpm}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{r.generator.load} kW</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{r.fluids.hfo} MT</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">Tabloda gösterilecek veri yok.</td>
                      </tr>
                    )}
                  </tbody>
               </table>
            </div>
          </section>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MainEngineForm />
          <GeneratorForm />
          <FluidForm />
        </div>
      )}
    </div>
  );
}
