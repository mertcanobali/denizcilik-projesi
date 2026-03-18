"use client";

export function FluidForm() {
  return (
    <div className="border rounded p-4 bg-white shadow-sm space-y-4">
      <h3 className="font-semibold text-lg border-b pb-2">Akışkan Verileri</h3>
      <p className="text-sm text-gray-500">Yakıt (HFO/MGO), Yağ (LO) ve Su (FW) Tüketimleri</p>
      
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">HFO (MT)</label>
            <input type="number" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">MGO (MT)</label>
            <input type="number" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">LO (Litre)</label>
            <input type="number" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">FW (MT)</label>
            <input type="number" className="w-full border rounded p-2" />
          </div>
        </div>
        <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Kaydet
        </button>
      </form>
    </div>
  );
}
