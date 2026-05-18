import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Empty, Flex, Select, theme, Typography } from "antd";
import { Column } from "@ant-design/plots";
import { DASHBOARD_ACTIVITY_RANGE_VALUES } from "@/constants/dashboard-activity-range-options";
import type {
  DashboardActivityByRange,
  DashboardActivityRange,
} from "@/types/dashboard";

type DashboardActivityChartProps = {
  activity: DashboardActivityByRange;
  compact?: boolean;
};

export function DashboardActivityChart({
  activity,
  compact = false,
}: DashboardActivityChartProps) {
  const { t } = useTranslation("dashboard");
  const { token } = theme.useToken();
  const [range, setRange] = useState<DashboardActivityRange>("week");

  const rangeDescription = useMemo(
    () => ({
      week: t("rangeWeekDesc"),
      month: t("rangeMonthDesc"),
      year: t("rangeYearDesc"),
    }),
    [t],
  );

  const rangeOptions = useMemo(
    () =>
      DASHBOARD_ACTIVITY_RANGE_VALUES.map((value) => ({
        value,
        label:
          value === "week"
            ? t("rangeWeek")
            : value === "month"
              ? t("rangeMonth")
              : t("rangeYear"),
      })),
    [t],
  );

  const data = activity[range];

  const tiltXLabels = useMemo(() => data.length > 8, [data.length]);

  return (
    <Card
      size="small"
      variant="outlined"
      style={{ width: '100%' }}
      styles={{
        body: {
          padding: compact ? token.paddingSM : token.paddingMD,
          background: token.colorFillQuaternary,
        },
      }}
    >
      <Flex vertical gap={token.marginMD} style={{ width: "100%" }}>
        <div
          style={{
            paddingBottom: token.paddingSM,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Typography.Title
            level={5}
            style={{
              margin: 0,
              marginBottom: token.marginSM,
              fontSize: compact ? 14 : undefined,
            }}
          >
            {t("activityTitle")}
          </Typography.Title>
          <Typography.Text
            type="secondary"
            style={{
              display: "block",
              marginBottom: token.marginSM,
              fontSize: compact ? 11 : token.fontSizeSM,
            }}
          >
            {rangeDescription[range]}
          </Typography.Text>
          <Select<DashboardActivityRange>
            size={compact ? "small" : "middle"}
            style={{ width: "100%", maxWidth: compact ? undefined : 320 }}
            value={range}
            onChange={setRange}
            options={rangeOptions}
          />
        </div>

        {data.length > 0 ? (
          <div
            style={{
              width: "100%",
              minWidth: 0,
              height: compact ? 220 : 300,
            }}
          >
            <Column
              key={range}
              data={data}
              xField="period"
              yField="value"
              height={compact ? 220 : 300}
              autoFit
              style={{ fill: token.colorPrimary }}
              axis={{
                x: {
                  labelAutoRotate: tiltXLabels,
                },
                y: {
                  title: false,
                  labelFormatter: (v: string | number) =>
                    typeof v === "number" && v >= 1000
                      ? `${Math.round(v / 1000)}k`
                      : String(v),
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
