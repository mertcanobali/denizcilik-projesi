import { query } from "@/lib/db";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { Ship, FileText, Activity } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return <div>Lütfen giriş yapın.</div>;

  const payload = await decrypt(session);
  const companyId = payload.id;

  // Şirkete ait gemileri ve her geminin rapor sayısını çek
  const shipsRes = await query(
    `
    SELECT s.id, s.ship_name, COUNT(r.id) as report_count 
    FROM ships s 
    LEFT JOIN ship_reports r ON s.id = r.ship_id 
    WHERE s.company_id = $1 
    GROUP BY s.id`,
    [companyId],
  );
  const ships = shipsRes.rows;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Hoş Geldiniz, {payload.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ships.map((ship) => (
          <Link href={`/dashboard/ships/${ship.id}`} key={ship.id}>
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-pointer">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {ship.ship_name}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Toplam {ship.report_count} Rapor
                  </p>
                </div>
                <Ship className="text-blue-500 w-8 h-8" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
