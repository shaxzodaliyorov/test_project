import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/protected-route/protected-route";
import { MainLayout } from "@/components/main-layout/main-layout";
import { GuestLayout } from "@/pages/login/components/guest-layout";
import { AdminUsersPage } from "@/pages/admin-users/admin-users-page";
import { DashboardPage } from "@/pages/dashboard/dashboard-page";
import { ForbiddenPage } from "@/pages/forbidden/forbidden-page";
import { LoginPage } from "@/pages/login/login-page";
import { NotFoundPage } from "@/pages/not-found/not-found-page";
import { PATHS } from "@/routes/paths";
import type { AppRouteHandle } from "@/types/app-route-handle";
import { AccountPage } from "@/pages/account/account-page";

const adminUsersRoute = {
  path: PATHS.ADMIN_USERS,
  element: <AdminUsersPage />,
  handle: { roles: ["admin"] } satisfies AppRouteHandle,
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
          { path: PATHS.DASHBOARD, element: <DashboardPage /> },
          { path: PATHS.ACCOUNT, element: <AccountPage /> },
          adminUsersRoute,
          {
            path: PATHS.ROOT,
            element: <Navigate to={PATHS.DASHBOARD} replace />,
          },
        ],
      },
    ],
  },
  { path: PATHS.FORBIDDEN, element: <ForbiddenPage /> },
  { path: PATHS.NOT_FOUND, element: <NotFoundPage /> },
  { path: "*", element: <Navigate to={PATHS.DASHBOARD} replace /> },
]);
