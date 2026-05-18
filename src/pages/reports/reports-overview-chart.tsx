import { useMemo } from "react";
import { Card, Spin } from "antd";
import type { ReportsOverviewResponse } from "@/types/reports";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { buildReportChartRows, REPORT_CHART_SERIES_KEY } from "./reports-chart-data";
import { formatMoney } from "./reports-format";

const LINE_COLORS = ["#1677ff", "#13c2c2", "#722ed1", "#fa8c16"];

type ReportsOverviewChartProps = {
  chart: ReportsOverviewResponse["chart"] | undefined;
  /** Overview qayta yuklanganda (masalan, `range` o‘zgarganda) */
  fetching: boolean;
};

export function ReportsOverviewChart({ chart, fetching }: ReportsOverviewChartProps) {
  const rows = useMemo(() => buildReportChartRows(chart), [chart]);
  const datasets = chart?.datasets ?? [];
  const showChart = rows.length > 0;

  return (
    <Card size="small" title="Oy bo‘yicha daromad">
      <Spin spinning={fetching && !showChart}>
        {showChart ? (
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={rows}
                margin={{ top: 8, right: 12, left: 4, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  angle={-28}
                  textAnchor="end"
                  height={52}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => formatMoney(Number(v))}
                  width={76}
                />
                <Tooltip
                  formatter={(value) => formatMoney(Number(value))}
                  labelFormatter={(label) => `Oy: ${label}`}
                />
                <Legend />
                {datasets.map((ds, i) => (
                  <Line
                    key={ds.label}
                    type="monotone"
                    dataKey={REPORT_CHART_SERIES_KEY(i)}
                    name={ds.label}
                    stroke={LINE_COLORS[i % LINE_COLORS.length]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : fetching ? null : (
          <div style={{ color: "var(--ant-color-text-secondary)", fontSize: 13 }}>
            Grafik uchun ma’lumot yo‘q.
          </div>
        )}
      </Spin>
    </Card>
  );
}
