export function ShipCard({ 
  ship 
}: { 
  ship: { id: string; name: string; status: string; type: string }
}) {
  return (
    <div className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition">
      <h3 className="text-lg font-bold">{ship.name}</h3>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">{ship.type}</span>
        <span className="text-sm font-medium px-2 py-1 rounded bg-green-100 text-green-800">
          {ship.status}
        </span>
      </div>
      <div className="mt-4 flex justify-end">
        <a href={`/ships/${ship.id}`} className="text-blue-600 hover:underline text-sm font-medium">
          Detayları Gör &rarr;
        </a>
      </div>
    </div>
  );
}
