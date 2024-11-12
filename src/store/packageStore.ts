import { Package } from "@/types";
import { create } from "zustand";

interface PackageState {
  packages: Package[];
  setPackages: (packages: Package[]) => void;
}

const initalPackages: Package[] = [
  {
    package_id: 1,
    name: "Basic",
    type: "SUBSCRIPTION",
    price: 200000,
    package_status: "ACTIVE",
    start_date: "2024-01-01",
    end_date: "2024-12-31",
    version: 1,
  },
  {
    package_id: 2,
    name: "Premium",
    type: "SUBSCRIPTION",
    price: 600000,
    package_status: "ACTIVE",
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    version: 1,
  },
];

export const packageStore = create<PackageState>((set) => ({
  packages: [...initalPackages],
  setPackages: (newPackages) => set({ packages: newPackages }),
}));
