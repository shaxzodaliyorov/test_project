import { Alert, Button, Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { DashboardPageSkeleton } from "@/components/skeletons/dashboard-page-skeleton";
import { useCompactLayout } from "@/hooks/use-compact-layout";
import { useDashboardPage } from "@/hooks/use-dashboard-page";
import { dashboardStatIcon } from "@/utils/dashboard-stat-icons";
import { pageTitleStyle } from "@/styles/page-layout.styles";
import { DashboardActivityChart } from "./dashboard-activity-chart";
import { DashboardStatTile } from "./dashboard-stat-tile";
import {
  dashboardPageStack,
  dashboardPageStackCompact,
  dashboardStatGrid,
  dashboardStatRow,
} from "./dashboard-page.styles";

export function DashboardPage() {
  const { t } = useTranslation(["dashboard", "common"]);
  const isCompact = useCompactLayout();
  const { me, dashboard, errorDescription, statTiles } = useDashboardPage();

  const dashboardLoading =
    me.isLoading || (dashboard.isFetching && !dashboard.data);

  if (dashboardLoading) {
    return (
      <div style={isCompact ? dashboardPageStackCompact : dashboardPageStack}>
        <Typography.Title level={isCompact ? 4 : 2} style={pageTitleStyle(isCompact)}>
          {t("dashboard:title")}
        </Typography.Title>
        <DashboardPageSkeleton compact={isCompact} />
      </div>
    );
  }

  const d = dashboard.data;

  return (
    <div style={isCompact ? dashboardPageStackCompact : dashboardPageStack}>
      <Typography.Title level={isCompact ? 4 : 2} style={pageTitleStyle(isCompact)}>
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

      {d ? (
        <div
          style={
            isCompact ? dashboardPageStackCompact : dashboardPageStack
          }
        >
          {isCompact ? (
            <div style={dashboardStatGrid}>
              {statTiles.map((tile) => (
                <DashboardStatTile
                  key={tile.key}
                  title={tile.title}
                  value={tile.value}
                  icon={dashboardStatIcon(tile.icon)}
                  iconColor={tile.iconColor}
                  compact
                />
              ))}
            </div>
          ) : (
            <Row gutter={[16, 16]} style={dashboardStatRow}>
              {statTiles.map((tile) => (
                <Col key={tile.key} xs={24} sm={12} md={8} lg={6}>
                  <DashboardStatTile
                    title={tile.title}
                    value={tile.value}
                    icon={dashboardStatIcon(tile.icon)}
                    iconColor={tile.iconColor}
                  />
                </Col>
              ))}
            </Row>
          )}
          <DashboardActivityChart activity={d.activity} compact={isCompact} />
        </div>
      ) : null}
    </div>
  );
}
