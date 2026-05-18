import {
  AppstoreOutlined,
  CreditCardOutlined,
  ShopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Alert, Button, Col, Row, Space, Spin, Typography, theme } from "antd";
import { useDashboard } from "@/hooks/use-dashboard";
import { useAuthSession } from "@/hooks/use-auth-session";
import { DashboardActivityChart } from "./dashboard-activity-chart";
import { DashboardStatTile } from "./dashboard-stat-tile";

export function DashboardPage() {
  const { t } = useTranslation(["dashboard", "common"]);
  const { token } = theme.useToken();
  const me = useAuthSession();
  const dashboard = useDashboard();

  if (me.isLoading) {
    return <Spin size="large" />;
  }

  const errorDescription =
    dashboard.error instanceof Error
      ? dashboard.error.message
      : String(dashboard.error ?? t("common:unknownError"));

  const d = dashboard.data;

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Typography.Title level={2} style={{ margin: 0 }}>
        {t("dashboard:title")}
      </Typography.Title>

      {dashboard.isError ? (
        <Alert
          type="error"
          showIcon
          message={t("dashboard:loadError")}
          description={errorDescription}
          action={
            <Button size="small" onClick={() => void dashboard.refetch()}>
              {t("common:retry")}
            </Button>
          }
        />
      ) : null}

      <Spin spinning={dashboard.isFetching && !d}>
        {d ? (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Row gutter={[16, 16]} style={{ width: "100%" }}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <DashboardStatTile
                  title={t("dashboard:statDemoUsers")}
                  value={d.stats.demoUsersTotal}
                  icon={<TeamOutlined />}
                  iconColor={token.colorPrimary}
                />
              </Col>
              {d.stats.demoPaymentRecords != null ? (
                <Col xs={24} sm={12} md={8} lg={6}>
                  <DashboardStatTile
                    title={t("dashboard:statPayments")}
                    value={d.stats.demoPaymentRecords}
                    icon={<CreditCardOutlined />}
                    iconColor={token.colorInfo}
                  />
                </Col>
              ) : null}
              {d.stats.demoReportCategories != null ? (
                <Col xs={24} sm={12} md={8} lg={6}>
                  <DashboardStatTile
                    title={t("dashboard:statReportCats")}
                    value={d.stats.demoReportCategories}
                    icon={<AppstoreOutlined />}
                    iconColor={token.colorSuccess}
                  />
                </Col>
              ) : null}
              {d.stats.demoReportMerchants != null ? (
                <Col xs={24} sm={12} md={8} lg={6}>
                  <DashboardStatTile
                    title={t("dashboard:statReportMerchants")}
                    value={d.stats.demoReportMerchants}
                    icon={<ShopOutlined />}
                    iconColor={token.colorWarning}
                  />
                </Col>
              ) : null}
            </Row>
            <DashboardActivityChart activity={d.activity} />
          </Space>
        ) : null}
      </Spin>
    </Space>
  );
}
