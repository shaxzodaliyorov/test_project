import { PATHS } from "@/routes/paths";

export function resolveDocumentTitleKey(pathname: string): string | undefined {
  switch (pathname) {
    case PATHS.LOGIN:
      return "auth:documentTitle";
    case PATHS.DASHBOARD:
      return "nav:dashboard";
    case PATHS.USERS:
      return "users:title";
    case PATHS.PAYMENTS:
      return "payments:title";
    case PATHS.REPORTS:
      return "reports:title";
    case PATHS.SETTINGS:
      return "settings:pageTitle";
    case PATHS.FORBIDDEN:
      return "common:forbiddenDocumentTitle";
    default:
      return undefined;
  }
}
