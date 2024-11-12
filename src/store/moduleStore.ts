import { Module } from "@/types";
import { create } from "zustand";

interface ModuleState {
  modules: Module[];
  setModules: (modules: Module[]) => void;
}

const initalModules: Module[] = [
  {
    module_id: 1,
    name: "Power BI",
    price: 200000.0,
    product_id: 1,
    module_status: "ACTIVE",
  },
  {
    module_id: 2,
    name: "Interactive Dashboard",
    price: 400000.0,
    product_id: 1,
    module_status: "ACTIVE",
  },
];

export const moduleStore = create<ModuleState>((set) => ({
  modules: [...initalModules],
  setModules: (newModules) => set({ modules: newModules }),
}));
