import { query } from "@/lib/db";

export async function getCompanyReports(companyId: string) {
  const sql = `
    SELECT 
      sr.id,
      s.ship_name,
      sr.report_data,
      sr.created_at
    FROM ship_reports sr
    JOIN ships s ON sr.ship_id = s.id
    WHERE s.company_id = $1
    ORDER BY sr.created_at DESC
  `;

  try {
    const res = await query(sql, [companyId]);
    return res.rows; // Veri tabanından gelen satırlar
  } catch (err) {
    console.error("Veri çekme hatası:", err);
    return [];
  }
}
