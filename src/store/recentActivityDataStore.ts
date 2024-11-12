import { RecentActivityData } from "@/types";
import { create } from "zustand";

interface RecentActivityDataState {
  recentActivityData: RecentActivityData[];
  setRecentActivityData: (recentActivityData: RecentActivityData[]) => void;
}

const initalRecentActivityData: RecentActivityData[] = [
  {
    key: "1",
    type: "Plan",
    name: "Basic Plan",
    status: "ACTIVE",
    updated_at: "2024-01-01",
  },
  {
    key: "2",
    type: "Product",
    name: "Enterprise Suite",
    status: "ACTIVE",
    updated_at: "2024-01-01",
  },
];

export const recentActivityDataStore = create<RecentActivityDataState>(
  (set) => ({
    recentActivityData: [...initalRecentActivityData],
    setRecentActivityData: (newRecentActivityData) =>
      set({ recentActivityData: newRecentActivityData }),
  })
);
