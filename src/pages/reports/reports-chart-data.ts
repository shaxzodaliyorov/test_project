import type { ReportsOverviewResponse } from "@/types/reports";

/** Recharts `Line` uchun `dataKey`: s0, s1, … */
export const REPORT_CHART_SERIES_KEY = (index: number) => `s${index}`;

export type ReportChartRow = {
  name: string;
} & Record<string, string | number>;

export function buildReportChartRows(
  chart: ReportsOverviewResponse["chart"] | undefined,
): ReportChartRow[] {
  if (!chart?.labels?.length) return [];
  const { labels, datasets } = chart;
  return labels.map((label, i) => {
    const row: ReportChartRow = { name: label };
    for (let j = 0; j < datasets.length; j += 1) {
      row[REPORT_CHART_SERIES_KEY(j)] = datasets[j]?.data[i] ?? 0;
    }
    return row;
  });
}
