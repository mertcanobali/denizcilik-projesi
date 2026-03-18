// Zustand kurulduğunda kullanılabilir:
// import { create } from "zustand";

// interface AuthState {
//   user: { id: string; name: string; role: string } | null;
//   setUser: (user: any) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   setUser: (user) => set({ user }),
//   logout: () => set({ user: null }),
// }));

export const useAuthStore = () => {};
