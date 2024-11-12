import { create } from "zustand";

interface StoreState {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedMenu: "dashboard",
  setSelectedMenu: (menu) => set({ selectedMenu: menu }),
}));
