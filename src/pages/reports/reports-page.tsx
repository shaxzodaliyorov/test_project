import { useTranslation } from "react-i18next";
import { Alert, Button, Select, Tabs, Typography } from "antd";
import { useCompactLayout } from "@/hooks/use-compact-layout";
import { useReportsPage } from "@/hooks/use-reports-page";
import { ReportsCategoriesTab } from "./reports-categories-tab";
import { ReportsDailyTab } from "./reports-daily-tab";
import { ReportsHourlyTab } from "./reports-hourly-tab";
import { ReportsMerchantsTab } from "./reports-merchants-tab";
import { ReportsMonthlyTab } from "./reports-monthly-tab";
import { ReportsOverviewChart } from "./reports-overview-chart";
import { ReportsSummaryTab } from "./reports-summary-tab";
import {
  reportsPageStack,
  reportsPageStackCompact,
  reportsPeriodColumn,
  reportsPeriodLabelCompact,
  reportsPeriodRow,
  reportsPeriodSelectCompact,
  reportsPeriodSelectDesktop,
  reportsTitle,
  reportsTitleCompact,
} from "./reports-page.styles";

export function ReportsPage() {
  const { t } = useTranslation(["reports", "common"]);
  const isCompact = useCompactLayout();
  const r = useReportsPage();

  const tabItems = [
    {
      key: "summary",
      label: t("reports:tabSummary"),
      children: (
        <ReportsSummaryTab overview={r.overview} loading={r.summaryLoading} />
      ),
    },
    {
      key: "monthly",
      label: t("reports:tabMonthly"),
      children: (
        <ReportsMonthlyTab
          filter={r.monthly}
          onFilterChange={r.setMonthly}
          data={r.monthlyData}
          loading={r.monthlyLoading}
        />
      ),
    },
    {
      key: "daily",
      label: t("reports:tabDaily"),
      children: (
        <ReportsDailyTab
          filter={r.daily}
          onFilterChange={r.setDaily}
          data={r.dailyData}
          loading={r.dailyLoading}
        />
      ),
    },
    {
      key: "categories",
      label: t("reports:tabCategories"),
      children: (
        <ReportsCategoriesTab
          filter={r.categories}
          onFilterChange={r.setCategories}
          data={r.categoriesData}
          loading={r.categoriesLoading}
        />
      ),
    },
    {
      key: "merchants",
      label: t("reports:tabMerchants"),
      children: (
        <ReportsMerchantsTab
          filter={r.merchants}
          onFilterChange={r.setMerchants}
          data={r.merchantsData}
          loading={r.merchantsLoading}
        />
      ),
    },
    {
      key: "hourly",
      label: t("reports:tabHourly"),
      children: (
        <ReportsHourlyTab
          filter={r.hourly}
          onFilterChange={r.setHourly}
          data={r.hourlyData}
          loading={r.hourlyLoading}
        />
      ),
    },
  ];

  return (
    <div style={isCompact ? reportsPageStackCompact : reportsPageStack}>
      {isCompact ? (
        <>
          <Typography.Title level={4} style={reportsTitleCompact}>
            {t("reports:title")}
          </Typography.Title>
          <div style={reportsPeriodColumn}>
            <Typography.Text type="secondary" style={reportsPeriodLabelCompact}>
              {t("common:period")}
            </Typography.Text>
            <Select
              style={reportsPeriodSelectCompact}
              value={r.range || "default"}
              onChange={r.onRangeChange}
              options={r.rangeOptions}
            />
          </div>
        </>
      ) : (
        <>
          <Typography.Title level={2} style={reportsTitle}>
            {t("reports:title")}
          </Typography.Title>
          <div style={reportsPeriodRow}>
            <Typography.Text type="secondary">
              {t("common:period")}:{" "}
            </Typography.Text>
            <Select
              style={reportsPeriodSelectDesktop}
              value={r.range || "default"}
              onChange={r.onRangeChange}
              options={r.rangeOptions}
            />
          </div>
        </>
      )}

      <ReportsOverviewChart
        chart={r.overview?.chart}
        fetching={r.overviewFetching}
        compact={isCompact}
      />

      {r.showOverviewError || r.showTableError ? (
        <Alert
          type="error"
          showIcon
          message={t("reports:loadError")}
          description={r.errorDescription}
          action={
            <Button size="small" onClick={() => void r.refetchAll()}>
              {t("common:retry")}
            </Button>
          }
        />
      ) : null}

      <Tabs
        activeKey={r.activeTab}
        onChange={r.onTabChange}
        items={tabItems}
        destroyOnHidden={false}
        size={isCompact ? "small" : "middle"}
      />
    </div>
  );
}
