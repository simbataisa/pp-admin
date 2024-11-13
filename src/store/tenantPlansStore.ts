import { TenantPlan } from "@/types";
import { create } from "zustand";

interface TenantPlanState {
  tenantPlans: TenantPlan[];
  setTenantPlans: (tenantPlans: TenantPlan[]) => void;
}

const initalTenantPlans: TenantPlan[] = [
  {
    tenant_id: 1,
    plan_id: 1,
    tenant_code: "AIA_HK",
    assigned_at: "2024-01-01",
  },
];

export const tenantPlansStore = create<TenantPlanState>((set) => ({
  tenantPlans: [...initalTenantPlans],
  setTenantPlans: (newTenantPlans) => set({ tenantPlans: newTenantPlans }),
}));
