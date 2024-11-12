import { Plan } from "@/types";
import { create } from "zustand";

interface PlanState {
  plans: Plan[];
  setPlans: (plans: Plan[]) => void;
}

const initialPlans: Plan[] = [
  {
    plan_id: 1,
    name: "Basic",
    discount_rate: 10,
    start_date: "2022-01-01",
    end_date: "2022-12-31",
    plan_type: "SUBSCRIPTION",
    plan_status: "ACTIVE",
  },
  {
    plan_id: 2,
    name: "Premium",
    discount_rate: 15,
    start_date: "2022-01-01",
    end_date: "2022-12-31",
    plan_type: "SUBSCRIPTION",
    plan_status: "ACTIVE",
  },
];

export const planStore = create<PlanState>((set) => ({
  plans: [...initialPlans],
  setPlans: (newPlans) => set({ plans: newPlans }),
}));
