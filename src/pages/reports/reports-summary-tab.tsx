import { useTranslation } from "react-i18next";
import { Descriptions, Space, Spin } from "antd";
import type { ReportsOverviewResponse } from "@/types/reports";
import { formatMoney } from "./reports-format";

type ReportsSummaryTabProps = {
  overview: ReportsOverviewResponse | undefined;
  spinning: boolean;
};

export function ReportsSummaryTab({ overview, spinning }: ReportsSummaryTabProps) {
  const { t } = useTranslation("reports");

  return (
    <Spin spinning={spinning}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {overview ? (
          <Descriptions bordered size="small" column={{ xs: 1, sm: 2, md: 3 }}>
            <Descriptions.Item label={t("summaryPeriod")}>
              {overview.summary.periodLabel}
            </Descriptions.Item>
            <Descriptions.Item label={t("summaryOrders")}>
              {overview.summary.totalOrders}
            </Descriptions.Item>
            <Descriptions.Item label={t("summaryAvgCheck")}>
              {formatMoney(overview.summary.avgOrderValueCents)}
            </Descriptions.Item>
            <Descriptions.Item label={t("summaryGross")}>
              {formatMoney(overview.summary.totalGrossCents)}
            </Descriptions.Item>
            <Descriptions.Item label={t("summaryNet")}>
              {formatMoney(overview.summary.totalNetCents)}
            </Descriptions.Item>
          </Descriptions>
        ) : null}
      </Space>
    </Spin>
  );
}
