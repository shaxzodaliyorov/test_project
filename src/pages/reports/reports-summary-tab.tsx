import { useTranslation } from "react-i18next";
import { Descriptions, Space } from "antd";
import { ReportsSummarySkeleton } from "@/components/skeletons/reports-summary-skeleton";
import type { ReportsOverviewResponse } from "@/types/reports";
import { formatMoney } from "./reports-format";

type ReportsSummaryTabProps = {
  overview: ReportsOverviewResponse | undefined;
  loading: boolean;
};

export function ReportsSummaryTab({ overview, loading }: ReportsSummaryTabProps) {
  const { t } = useTranslation("reports");

  if (loading) {
    return <ReportsSummarySkeleton />;
  }

  return (
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
  );
}
