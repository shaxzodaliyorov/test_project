import {
  DashboardOutlined,
  DownOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
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
import { useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
  mainLayoutSiderInner,
  mainLayoutUserTrigger,
  mainLayoutUserAvatar,
  mainLayoutUserTriggerChevron,
  mainLayoutUserTriggerName,
} from "./main-layout.styles";
import { PATHS } from "@/routes/paths";
import { initialsFromName } from "@/utils/initials-from-name";

const { Header, Content, Sider } = Layout;

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = Grid.useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const canUsers = useCanAccess(PERMISSIONS.USERS_READ);

  const menuItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: PATHS.DASHBOARD,
        icon: <DashboardOutlined />,
        label: "Dashboard",
      },
      ...(canUsers
        ? [
            {
              key: PATHS.ADMIN_USERS,
              icon: <TeamOutlined />,
              label: "Users",
            },
          ]
        : []),
    ],
    [canUsers],
  );

  const userMenuItems: MenuProps["items"] = useMemo(
    () => [
      {
        key: "account",
        icon: <UserOutlined />,
        label: "Account",
      },
      { type: "divider" },
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
      ...(location.pathname === PATHS.ADMIN_USERS
        ? mainLayoutContentTableFriendly
        : {}),
    };
  }, [screens.md, location.pathname]);

  return (
    <Layout style={mainLayoutShell}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        width={232}
        collapsedWidth={72}
        theme="light"
        style={mainLayoutSider}
      >
        <div style={mainLayoutSiderInner}>
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
                  if (key === "account") {
                    void navigate(PATHS.ACCOUNT);
                    return;
                  }
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
