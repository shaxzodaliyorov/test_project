import { Form, Modal } from "antd";
import type { FormInstance } from "antd/es/form";
import { useTranslation } from "react-i18next";
import { AdminUserFormFields } from "./admin-user-form-fields";
import type { UserFormValues } from "@/types/admin-user-form";

export type AdminUserCreateModalProps = {
  open: boolean;
  form: FormInstance<UserFormValues>;
  roleOptions: { label: string; value: string }[];
  confirmLoading: boolean;
  onCancel: () => void;
  onSubmit: () => void;
};

export function AdminUserCreateModal({
  open,
  form,
  roleOptions,
  confirmLoading,
  onCancel,
  onSubmit,
}: AdminUserCreateModalProps) {
  const { t } = useTranslation("users");

  return (
    <Modal
      title={t("newUserTitle")}
      open={open}
      onCancel={onCancel}
      okText={t("create")}
      confirmLoading={confirmLoading}
      onOk={() => void onSubmit()}
      destroyOnHidden
      width={480}
    >
      <Form<UserFormValues> form={form} layout="vertical" requiredMark>
        <AdminUserFormFields mode="create" roleOptions={roleOptions} />
      </Form>
    </Modal>
  );
}
