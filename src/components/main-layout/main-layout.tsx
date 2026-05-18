import {
  BarChartOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Button,
  Dropdown,
  Grid,
  Layout,
  Menu,
  Modal,
  Space,
  Typography,
} from "antd";
import { useMemo } from "react";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { PERMISSIONS } from "@/constants/permissions";
import { useAuthStore } from "@/hooks/auth-store";
import { useCanAccess } from "@/hooks/use-can-access";
import {
  mainLayoutContentArea,
  mainLayoutContentAreaCompact,
  mainLayoutContentTableFriendly,
  mainLayoutHeaderBar,
  mainLayoutHeaderBrand,
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
  const navigate = useNavigate();
  const location = useLocation();
  const screens = Grid.useBreakpoint();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const canDashboard = useCanAccess(PERMISSIONS.DASHBOARD_READ);
  const canUsers = useCanAccess(PERMISSIONS.USERS_READ);
  const canPayments = useCanAccess(PERMISSIONS.PAYMENTS_READ);
  const canReports = useCanAccess(PERMISSIONS.REPORTS_READ);

  const menuItems: MenuProps["items"] = useMemo(
    () => [
      ...(canDashboard
        ? [
            {
              key: PATHS.DASHBOARD,
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
          ]
        : []),
      ...(canUsers
        ? [
            {
              key: PATHS.USERS,
              icon: <TeamOutlined />,
              label: "Users",
            },
          ]
        : []),
      ...(canPayments
        ? [
            {
              key: PATHS.PAYMENTS,
              icon: <CreditCardOutlined />,
              label: "Payments",
            },
          ]
        : []),
      ...(canReports
        ? [
            {
              key: PATHS.REPORTS,
              icon: <BarChartOutlined />,
              label: "Reports",
            },
          ]
        : []),
      {
        key: PATHS.SETTINGS,
        icon: <SettingOutlined />,
        label: "Settings",
      },
    ],
    [canDashboard, canUsers, canPayments, canReports],
  );

  const userMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        danger: true,
      },
    ],
    [],
  );

  const contentStyle = useMemo(() => {
    const compact = screens.md === false;
    return {
      ...mainLayoutContentArea,
      ...(compact ? mainLayoutContentAreaCompact : {}),
      ...(location.pathname === PATHS.USERS ||
      location.pathname === PATHS.PAYMENTS ||
      location.pathname === PATHS.REPORTS
        ? mainLayoutContentTableFriendly
        : {}),
    };
  }, [screens.md, location.pathname]);

  if (user && user.permissions.length === 0) {
    return <Navigate to={PATHS.FORBIDDEN} replace />;
  }

  return (
    <Layout style={mainLayoutShell}>
      <Sider width={232} theme="light" style={mainLayoutSider}>
        <div style={mainLayoutSiderInner}>
          <Link
            to={PATHS.DASHBOARD}
            aria-label="TASK — Dashboard"
            style={{
              ...mainLayoutSiderBrand,
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
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => {
              void navigate(String(key));
            }}
            style={mainLayoutMenu}
          />
        </div>
      </Sider>
      <Layout style={mainLayoutInner}>
        <Header style={mainLayoutHeaderBar}>
          <Typography.Title level={4} style={mainLayoutHeaderBrand}>
            TEST PROJECT
          </Typography.Title>
          <div style={mainLayoutHeaderRight}>
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: ({ key }) => {
                  if (key === "logout") {
                    Modal.confirm({
                      title: "Log out?",
                      content: "Are you sure you want to log out?",
                      okText: "OK",
                      cancelText: "Cancel",
                      onOk: () => {
                        logout();
                        void navigate(PATHS.LOGIN);
                      },
                    });
                  }
                },
              }}
              trigger={["click"]}
            >
              <Button type="default" style={mainLayoutUserTrigger}>
                <Space size={10} align="center" style={{ width: "100%" }}>
                  <Avatar size={28} style={mainLayoutUserAvatar}>
                    {initialsFromName(user?.name)}
                  </Avatar>
                  <span style={mainLayoutUserTriggerName}>{user?.name}</span>
                  <DownOutlined style={mainLayoutUserTriggerChevron} />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
