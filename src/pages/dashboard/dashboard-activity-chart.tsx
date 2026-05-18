import { useTranslation } from "react-i18next";
import { Card, Empty, Flex, Select, Typography } from "antd";
import { Column } from "@ant-design/plots";
import type { DashboardActivityByRange, DashboardActivityRange } from "@/types/dashboard";
import { useDashboardActivityChart } from "@/hooks/use-dashboard-activity-chart";
import {
  dashboardActivityChartBody,
  dashboardActivityChartDescription,
  dashboardActivityChartFlex,
  dashboardActivityChartHeader,
  dashboardActivityChartPlot,
  dashboardActivityChartSelect,
  dashboardActivityChartTitle,
  dashboardActivityChartWidth,
} from "./dashboard-activity-chart.styles";

type DashboardActivityChartProps = {
  activity: DashboardActivityByRange;
  compact?: boolean;
};

export function DashboardActivityChart({
  activity,
  compact = false,
}: DashboardActivityChartProps) {
  const { t } = useTranslation("dashboard");
  const c = useDashboardActivityChart(activity);

  return (
    <Card
      size="small"
      variant="outlined"
      style={dashboardActivityChartWidth}
      styles={{ body: dashboardActivityChartBody(c.token, compact) }}
    >
      <Flex vertical gap={c.token.marginMD} style={dashboardActivityChartFlex}>
        <div style={dashboardActivityChartHeader(c.token)}>
          <Typography.Title
            level={5}
            style={dashboardActivityChartTitle(c.token, compact)}
          >
            {t("activityTitle")}
          </Typography.Title>
          <Typography.Text
            type="secondary"
            style={dashboardActivityChartDescription(c.token, compact)}
          >
            {c.rangeDescription[c.range]}
          </Typography.Text>
          <Select<DashboardActivityRange>
            size={compact ? "small" : "middle"}
            style={dashboardActivityChartSelect(compact)}
            value={c.range}
            onChange={c.setRange}
            options={c.rangeOptions}
          />
        </div>

        {c.data.length > 0 ? (
          <div style={dashboardActivityChartPlot(compact)}>
            <Column
              key={c.range}
              data={c.data}
              xField="period"
              yField="value"
              height={compact ? 220 : 300}
              autoFit
              style={{ fill: c.token.colorPrimary }}
              axis={{
                x: {
                  labelAutoRotate: c.tiltXLabels,
                },
                y: {
                  title: false,
                  labelFormatter: c.formatYAxisLabel,
                },
              }}
              interaction={{ elementHighlight: { background: true } }}
            />
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={t("emptyChart")}
          />
        )}
      </Flex>
    </Card>
  );
}
