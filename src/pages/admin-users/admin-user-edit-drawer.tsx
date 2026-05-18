import { Button, Drawer, Form, Space } from "antd";
import type { FormInstance } from "antd/es/form";
import { useTranslation } from "react-i18next";
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

  return (
    <Drawer
      title={t("editUserTitle")}
      width={420}
      open={Boolean(user)}
      onClose={onClose}
      destroyOnHidden
      extra={
        <Space>
          <Button onClick={onClose}>{t("cancelDrawer")}</Button>
          <Button type="primary" loading={loading} onClick={() => void onSubmit()}>
            {t("save")}
          </Button>
        </Space>
      }
    >
      <Form<UserFormValues> form={form} layout="vertical" requiredMark>
        <AdminUserFormFields mode="edit" roleOptions={roleOptions} />
      </Form>
    </Drawer>
  );
}
