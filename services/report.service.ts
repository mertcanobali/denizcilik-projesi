import { Report } from "../types/report";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const reportService = {
  // Teknik raporları gönderme
  async submitReport(data: Report): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Rapor gönderim hatası.");
    return res.json();
  },

  // 10 günlük verileri çekme (Grafik vb. için)
  async getReportsByShipId(shipId: string, days: number = 10): Promise<Report[]> {
    const res = await fetch(`${API_BASE_URL}/reports?shipId=${shipId}&days=${days}`);
    if (!res.ok) throw new Error("Raporları getirme hatası.");
    return res.json();
  }
};
