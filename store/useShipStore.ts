// Zustand kurulduğunda kullanılabilir:
// import { create } from "zustand";
// import { Ship } from "../types/ship";

// interface ShipState {
//   selectedShip: Ship | null;
//   setSelectedShip: (ship: Ship | null) => void;
//   fleetStatus: string;
//   setFleetStatus: (status: string) => void;
// }

// export const useShipStore = create<ShipState>((set) => ({
//   selectedShip: null,
//   setSelectedShip: (ship) => set({ selectedShip: ship }),
//   fleetStatus: "idle",
//   setFleetStatus: (status) => set({ fleetStatus: status }),
// }));

export const useShipStore = () => {};
