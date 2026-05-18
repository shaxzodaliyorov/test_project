import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/protected-route/protected-route";
import { MainLayout } from "@/components/main-layout/main-layout";
import { GuestLayout } from "@/pages/login/components/guest-layout";
import { AdminUsersPage } from "@/pages/admin-users/admin-users-page";
import { DashboardPage } from "@/pages/dashboard/dashboard-page";
import { ForbiddenPage } from "@/pages/forbidden/forbidden-page";
import { LoginPage } from "@/pages/login/login-page";
import { PATHS } from "@/routes/paths";
import type { AppRouteHandle } from "@/types/app-route-handle";
import { PaymentsPage } from "@/pages/payments/payments-page";
import { ReportsPage } from "@/pages/reports/reports-page";
import { PERMISSIONS } from "@/constants/permissions";

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
          {
            path: PATHS.ROOT,
            element: <Navigate to={PATHS.DASHBOARD} replace />,
          },
        ],
      },
    ],
  },
  { path: PATHS.FORBIDDEN, element: <ForbiddenPage /> },
  { path: "*", element: <Navigate to={PATHS.DASHBOARD} replace /> },
]);
