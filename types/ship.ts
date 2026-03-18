export interface Ship {
  id: string;
  name: string;
  type: string; // "Bulk Carrier", "Oil Tanker", vb.
  imoNumber?: string;
  status: "active" | "maintenance" | "idle";
  yearBuilt?: number;
  dwt?: number; // Deadweight
}
