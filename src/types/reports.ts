export type ReportCategoryRow = {
  category: string;
  transactionCount: number;
  amountCents: number;
  sharePercent: number;
};

export type ReportDailyPoint = {
  day: string;
  grossCents: number;
  netCents: number;
  orders: number;
};

export type ReportMerchantRow = {
  merchant: string;
  orders: number;
  revenueCents: number;
  refundsCents: number;
};

export type ReportHourlyRow = {
  hour: string;
  volume: number;
  latencyMs: number;
};

export type ReportMonthlyRow = { month: string; amount: number };

export type ReportsOverviewResponse = {
  summary: {
    totalGrossCents: number;
    totalNetCents: number;
    totalOrders: number;
    avgOrderValueCents: number;
    periodLabel: string;
  };
  chart: { labels: string[]; datasets: { label: string; data: number[] }[] };
};

export type ReportTableSection =
  | "monthly"
  | "daily"
  | "categories"
  | "merchants"
  | "hourly";

export type ReportsTableResponse =
  | {
      section: "monthly";
      items: ReportMonthlyRow[];
      total: number;
      page: number;
      pageSize: number;
    }
  | {
      section: "daily";
      items: ReportDailyPoint[];
      total: number;
      page: number;
      pageSize: number;
    }
  | {
      section: "categories";
      items: ReportCategoryRow[];
      total: number;
      page: number;
      pageSize: number;
    }
  | {
      section: "merchants";
      items: ReportMerchantRow[];
      total: number;
      page: number;
      pageSize: number;
    }
  | {
      section: "hourly";
      items: ReportHourlyRow[];
      total: number;
      page: number;
      pageSize: number;
    };
