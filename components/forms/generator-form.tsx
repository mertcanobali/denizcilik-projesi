"use client";

export function GeneratorForm() {
  return (
    <div className="border rounded p-4 bg-white shadow-sm space-y-4">
      <h3 className="font-semibold text-lg border-b pb-2">Jeneratör Verileri</h3>
      <p className="text-sm text-gray-500">Jeneratör yük ve egzoz verileri</p>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Yük (kW)</label>
          <input type="number" className="w-full border rounded p-2" placeholder="Örn: 400" />
        </div>
        <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Kaydet
        </button>
      </form>
    </div>
  );
}
