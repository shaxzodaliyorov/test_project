import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, Select, Space, Tabs, Typography } from "antd";
import { REPORTS_RANGE_VALUES } from "@/constants/reports-range-options";
import { useReportsPage } from "@/hooks/use-reports-page";
import { ReportsCategoriesTab } from "./reports-categories-tab";
import { ReportsDailyTab } from "./reports-daily-tab";
import { ReportsHourlyTab } from "./reports-hourly-tab";
import { ReportsMerchantsTab } from "./reports-merchants-tab";
import { ReportsMonthlyTab } from "./reports-monthly-tab";
import { ReportsOverviewChart } from "./reports-overview-chart";
import { ReportsSummaryTab } from "./reports-summary-tab";

const RANGE_LABEL_NS: Record<(typeof REPORTS_RANGE_VALUES)[number], string> = {
  default: "reports:rangeDefault",
  "12m": "reports:range12m",
  "30d": "reports:range30d",
};

export function ReportsPage() {
  const { t } = useTranslation(["reports", "common"]);
  const r = useReportsPage();

  const rangeOptions = useMemo(
    () =>
      REPORTS_RANGE_VALUES.map((value) => ({
        value,
        label: t(RANGE_LABEL_NS[value]),
      })),
    [t],
  );

  const tabItems = [
      {
        key: "summary",
        label: t("reports:tabSummary"),
        children: (
          <ReportsSummaryTab overview={r.overview} spinning={r.summarySpinning} />
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
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", display: "flex" }}
    >
      <Typography.Title level={2} style={{ margin: 0 }}>
        {t("reports:title")}
      </Typography.Title>

      <Space
        wrap
        align="center"
        style={{ width: "100%", justifyContent: "flex-end" }}
      >
        <Typography.Text type="secondary">
          {t("common:period")}:{" "}
        </Typography.Text>
        <Select
          style={{ minWidth: 200 }}
          value={r.range || "default"}
          onChange={r.onRangeChange}
          options={rangeOptions}
        />
      </Space>

      <ReportsOverviewChart chart={r.overview?.chart} fetching={r.overviewFetching} />

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
      />
    </Space>
  );
}
