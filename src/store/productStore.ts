import { Product } from "@/types";
import { create } from "zustand";

interface ProductState {
  products: Product[];
  setPlans: (plans: Product[]) => void;
}

const initalProducts: Product[] = [
  {
    product_id: 1,
    product_code: "AHIS",
    product_name: "Precision Insights Studio",
    description:
      "Precision Insights Studio is a powerful analytics tool that helps you make data-driven decisions.",
    product_status: "ACTIVE",
  },
];

export const productStore = create<ProductState>((set) => ({
  products: [...initalProducts],
  setPlans: (newProducts) => set({ products: newProducts }),
}));
