import type { DashboardActivityRange } from "@/types/dashboard";

export const DASHBOARD_ACTIVITY_RANGE_OPTIONS: {
  label: string;
  value: DashboardActivityRange;
}[] = [
  { value: "week", label: "Haftalik" },
  { value: "month", label: "Oylik" },
  { value: "year", label: "Yillik" },
];
