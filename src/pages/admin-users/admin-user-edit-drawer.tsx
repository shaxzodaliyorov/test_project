import { Button, Drawer, Form, Space } from "antd";
import type { FormInstance } from "antd/es/form";
import { useTranslation } from "react-i18next";
import { useCompactLayout } from "@/hooks/use-compact-layout";
import { AdminUserFormFields } from "./admin-user-form-fields";
import type { UserFormValues } from "@/types/admin-user-form";
import type { User } from "@/types/user";

type AdminUserEditDrawerProps = {
  user: User | null;
  form: FormInstance<UserFormValues>;
  roleOptions: { label: string; value: string }[];
  loading: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export function AdminUserEditDrawer({
  user,
  form,
  roleOptions,
  loading,
  onClose,
  onSubmit,
}: AdminUserEditDrawerProps) {
  const { t } = useTranslation("users");
  const isCompact = useCompactLayout();

  return (
    <Drawer
      title={t("editUserTitle")}
      width={isCompact ? "100%" : 600}
      open={Boolean(user)}
      onClose={onClose}
      destroyOnHidden
      styles={
        isCompact
          ? {
              body: { paddingTop: 16 },
            }
          : {
              body: { padding: "24px 28px" },
            }
      }
      extra={
        <Space>
          <Button onClick={onClose}>{t("cancelDrawer")}</Button>
          <Button type="primary" loading={loading} onClick={() => void onSubmit()}>
            {t("save")}
          </Button>
        </Space>
      }
    >
      <Form<UserFormValues>
        form={form}
        layout="vertical"
        requiredMark
        size="large"
      >
        <AdminUserFormFields mode="edit" roleOptions={roleOptions} />
      </Form>
    </Drawer>
  );
}
