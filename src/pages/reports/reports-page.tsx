import { Alert, Button, Select, Space, Tabs, Typography } from "antd";
import { REPORTS_RANGE_SELECT_OPTIONS } from "@/constants/reports-range-options";
import { useReportsPage } from "@/hooks/use-reports-page";
import { ReportsCategoriesTab } from "./reports-categories-tab";
import { ReportsDailyTab } from "./reports-daily-tab";
import { ReportsHourlyTab } from "./reports-hourly-tab";
import { ReportsMerchantsTab } from "./reports-merchants-tab";
import { ReportsMonthlyTab } from "./reports-monthly-tab";
import { ReportsOverviewChart } from "./reports-overview-chart";
import { ReportsSummaryTab } from "./reports-summary-tab";

export function ReportsPage() {
  const r = useReportsPage();

  const tabItems = [
    {
      key: "summary",
      label: "Xulosa",
      children: (
        <ReportsSummaryTab overview={r.overview} spinning={r.summarySpinning} />
      ),
    },
    {
      key: "monthly",
      label: "Oylik",
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
      label: "Kunlik",
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
      label: "Kategoriyalar",
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
      label: "Merchantlar",
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
      label: "Soatlik",
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
        Hisobotlar
      </Typography.Title>

      <Space
        wrap
        align="center"
        style={{ width: "100%", justifyContent: "flex-end" }}
      >
        <Typography.Text type="secondary">Davr: </Typography.Text>
        <Select
          style={{ minWidth: 200 }}
          value={r.range || "default"}
          onChange={r.onRangeChange}
          options={REPORTS_RANGE_SELECT_OPTIONS}
        />
      </Space>

      <ReportsOverviewChart chart={r.overview?.chart} fetching={r.overviewFetching} />

      {r.showOverviewError || r.showTableError ? (
        <Alert
          type="error"
          showIcon
          message="Ma'lumot yuklanmadi"
          description={r.errorDescription}
          action={
            <Button size="small" onClick={() => void r.refetchAll()}>
              Qayta urinish
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
