import { Form, Modal } from "antd";
import type { FormInstance } from "antd/es/form";
import { useTranslation } from "react-i18next";
import { useCompactLayout } from "@/hooks/use-compact-layout";
import { AdminUserFormFields } from "./admin-user-form-fields";
import type { UserFormValues } from "@/types/admin-user-form";

type AdminUserCreateModalProps = {
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
  const isCompact = useCompactLayout();

  return (
    <Modal
      title={t("newUserTitle")}
      open={open}
      onCancel={onCancel}
      okText={t("create")}
      confirmLoading={confirmLoading}
      onOk={() => void onSubmit()}
      destroyOnHidden
      centered={!isCompact}
      width={isCompact ? "100%" : 480}
      style={
        isCompact
          ? {
              top: 0,
              margin: 0,
              padding: 0,
              maxWidth: "100vw",
            }
          : undefined
      }
      styles={
        isCompact
          ? {
              wrapper: {
                alignItems: "flex-start",
              },
              root: {
                width: "100vw",
                maxWidth: "100vw",
                height: "100dvh",
                maxHeight: "100dvh",
                margin: 0,
                padding: 0,
                top: 0,
              },
              container: {
                width: "100%",
                maxWidth: "100%",
                height: "100%",
                maxHeight: "100%",
                margin: 0,
                borderRadius: 0,
                display: "flex",
                flexDirection: "column",
              },
              body: {
                flex: 1,
                overflowY: "auto",
              },
              footer: {
                flexShrink: 0,
                paddingBottom: "max(12px, env(safe-area-inset-bottom, 0px))",
              },
            }
          : undefined
      }
    >
      <Form<UserFormValues> form={form} layout="vertical" requiredMark>
        <AdminUserFormFields mode="create" roleOptions={roleOptions} />
      </Form>
    </Modal>
  );
}
