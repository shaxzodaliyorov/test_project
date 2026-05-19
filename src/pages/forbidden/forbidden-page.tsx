import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/hooks/auth-store";
import { PATHS } from "@/routes/paths";
import { postLoginPath } from "@/utils/post-login-path";

export function ForbiddenPage() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  return (
    <Result
      status="403"
      title={t("forbiddenTitle")}
      subTitle={t("forbiddenSubtitle")}
      extra={
        <Button
          type="primary"
          onClick={() =>
            void navigate(user ? postLoginPath(user) : PATHS.SETTINGS)
          }
        >
          {t("backToDashboard")}
        </Button>
      }
    />
  );
}
