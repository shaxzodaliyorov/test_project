import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/protected-route/protected-route";
import { MainLayout } from "@/components/main-layout/main-layout";
import { useAuthStore } from "@/hooks/auth-store";
import { AdminUsersPage } from "@/pages/admin-users/admin-users-page";
import { DashboardPage } from "@/pages/dashboard/dashboard-page";
import { ForbiddenPage } from "@/pages/forbidden/forbidden-page";
import { LoginPage } from "@/pages/login/login-page";
import { PATHS } from "@/routes/paths";
import type { AppRouteHandle } from "@/types/app-route-handle";
import { PaymentsPage } from "@/pages/payments/payments-page";
import { ReportsPage } from "@/pages/reports/reports-page";
import { SettingsPage } from "@/pages/settings/settings-page";
import { PERMISSIONS } from "@/constants/permissions";
import { GuestLayout } from "@/pages/login/guest-layout";
import { postLoginPath } from "@/utils/post-login-path";

function AuthenticatedHomeRedirect() {
  const user = useAuthStore((s) => s.user);
  return (
    <Navigate to={user ? postLoginPath(user) : PATHS.SETTINGS} replace />
  );
}

const usersRoute = {
  path: PATHS.USERS,
  element: <AdminUsersPage />,
  handle: { permissions: [PERMISSIONS.USERS_READ] } satisfies AppRouteHandle,
};

const paymentsRoute = {
  path: PATHS.PAYMENTS,
  element: <PaymentsPage />,
  handle: { permissions: [PERMISSIONS.PAYMENTS_READ] } satisfies AppRouteHandle,
};

const reportsRoute = {
  path: PATHS.REPORTS,
  element: <ReportsPage />,
  handle: { permissions: [PERMISSIONS.REPORTS_READ] } satisfies AppRouteHandle,
};

const settingsRoute = {
  path: PATHS.SETTINGS,
  element: <SettingsPage />,
  handle: {} satisfies AppRouteHandle,
};

export const appRouter = createBrowserRouter([
  {
    path: PATHS.LOGIN,
    element: <GuestLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: PATHS.DASHBOARD,
            element: <DashboardPage />,
            handle: {
              permissions: [PERMISSIONS.DASHBOARD_READ],
            } satisfies AppRouteHandle,
          },
          usersRoute,
          paymentsRoute,
          reportsRoute,
          settingsRoute,
          {
            path: PATHS.FORBIDDEN,
            element: <ForbiddenPage />,
            handle: {} satisfies AppRouteHandle,
          },
          {
            path: PATHS.ROOT,
            element: <AuthenticatedHomeRedirect />,
          },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to={PATHS.DASHBOARD} replace /> },
]);
