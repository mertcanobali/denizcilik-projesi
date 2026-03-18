"use client";

// import { useForm } from "react-hook-form";

export function MainEngineForm() {
  return (
    <div className="border rounded p-4 bg-white shadow-sm space-y-4">
      <h3 className="font-semibold text-lg border-b pb-2">M/E Parametreleri</h3>
      <p className="text-sm text-gray-500">M/E RPM, Sıcaklık girişleri</p>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">M/E RPM</label>
          <input type="number" className="w-full border rounded p-2" placeholder="Örn: 105" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Egzoz Sıcaklığı (°C)</label>
          <input type="number" className="w-full border rounded p-2" placeholder="Örn: 350" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Kaydet
        </button>
      </form>
    </div>
  );
}
