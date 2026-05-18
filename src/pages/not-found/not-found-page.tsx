import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/routes/paths";

export function NotFoundPage() {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title={t("notFoundTitle")}
      subTitle={t("notFoundSubtitle")}
      extra={
        <Button type="primary" onClick={() => void navigate(PATHS.DASHBOARD)}>
          {t("backToDashboard")}
        </Button>
      }
    />
  );
}
