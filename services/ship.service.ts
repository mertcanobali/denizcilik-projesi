import { Ship } from "../types/ship";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const shipService = {
  // Gemi Listesini Çekme
  async getShips(): Promise<Ship[]> {
    const res = await fetch(`${API_BASE_URL}/ships`);
    if (!res.ok) throw new Error("Ağ hatası: Gemiler getirilemedi.");
    return res.json();
  },

  // Tekil Gemi Çekme
  async getShipById(id: string): Promise<Ship> {
    const res = await fetch(`${API_BASE_URL}/ships/${id}`);
    if (!res.ok) throw new Error("Ağ hatası: Gemi detayları getirilemedi.");
    return res.json();
  }
};
