import { DownOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import { Link, Navigate, Outlet } from "react-router-dom";
import { MainLayoutBottomNav } from "./main-layout-bottom-nav";
import {
  mainLayoutHeaderBar,
  mainLayoutHeaderBarCompact,
  mainLayoutHeaderBrand,
  mainLayoutHeaderBrandCompact,
  mainLayoutHeaderBrandRow,
  mainLayoutHeaderRight,
  mainLayoutInner,
  mainLayoutMenu,
  mainLayoutShell,
  mainLayoutSider,
  mainLayoutSiderBrand,
  mainLayoutSiderBrandRow,
  mainLayoutSiderBrandTitle,
  mainLayoutSiderInner,
  mainLayoutUserTrigger,
  mainLayoutUserAvatar,
  mainLayoutUserTriggerChevron,
  mainLayoutUserTriggerName,
} from "./main-layout.styles";
import { useMainLayout } from "@/hooks/use-main-layout";
import { PATHS } from "@/routes/paths";
import { initialsFromName } from "@/utils/initials-from-name";

const { Header, Content, Sider } = Layout;

function TaskSidebarMark({ size = 36 }: { size?: number }) {
  const icon = Math.round(size * 0.52);
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: 10,
        background: "var(--accent)",
        color: "#fff",
        flexShrink: 0,
      }}
    >
      <svg width={icon} height={icon} viewBox="0 0 24 24" fill="none">
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function MainLayout() {
  const { t } = useTranslation(["nav", "common"]);
  const layout = useMainLayout();

  if (layout.hasNoPermissions) {
    return <Navigate to={PATHS.FORBIDDEN} replace />;
  }

  return (
    <Layout style={mainLayoutShell}>
      {!layout.isCompactNav ? (
        <Sider width={232} theme="light" style={mainLayoutSider}>
          <div style={mainLayoutSiderInner}>
            <Link
              to={PATHS.DASHBOARD}
              aria-label={t("nav:taskAria")}
              style={{
                ...mainLayoutSiderBrand,
                display: "block",
                width: "100%",
                boxSizing: "border-box",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span style={mainLayoutSiderBrandRow}>
                <TaskSidebarMark />
                <span style={mainLayoutSiderBrandTitle}>TASK</span>
              </span>
            </Link>
            <Menu
              mode="inline"
              selectedKeys={[layout.location.pathname]}
              items={layout.menuItems}
              onClick={({ key }) => layout.navigateTo(String(key))}
              style={mainLayoutMenu}
            />
          </div>
        </Sider>
      ) : null}
      <Layout style={mainLayoutInner}>
        <Header
          style={
            layout.isCompactNav
              ? mainLayoutHeaderBarCompact
              : mainLayoutHeaderBar
          }
        >
          {layout.isCompactNav ? (
            <Link
              to={PATHS.DASHBOARD}
              aria-label={t("nav:taskAria")}
              style={{
                ...mainLayoutHeaderBrandRow,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <TaskSidebarMark size={32} />
              <span style={mainLayoutHeaderBrandCompact}>TASK</span>
            </Link>
          ) : (
            <Typography.Title level={4} style={mainLayoutHeaderBrand}>
              {t("nav:headerBrand")}
            </Typography.Title>
          )}
          {!layout.isCompactNav ? (
            <div style={mainLayoutHeaderRight}>
              <Dropdown
                menu={{
                  items: layout.userMenuItems,
                  onClick: ({ key }) => {
                    if (key === "logout") {
                      layout.handleLogoutClick();
                    }
                  },
                }}
                trigger={["click"]}
              >
                <Button
                  type="default"
                  style={mainLayoutUserTrigger}
                  aria-label={layout.user?.name ?? t("nav:logout")}
                >
                  <Space size={10} align="center" style={{ width: "100%" }}>
                    <Avatar size={28} style={mainLayoutUserAvatar}>
                      {initialsFromName(layout.user?.name)}
                    </Avatar>
                    <span style={mainLayoutUserTriggerName}>
                      {layout.user?.name}
                    </span>
                    <DownOutlined style={mainLayoutUserTriggerChevron} />
                  </Space>
                </Button>
              </Dropdown>
            </div>
          ) : null}
        </Header>
        <Content style={layout.contentStyle}>
          <Outlet />
        </Content>
      </Layout>
      {layout.isCompactNav ? (
        <MainLayoutBottomNav items={layout.navItems} />
      ) : null}
    </Layout>
  );
}
