import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, Form, Input } from "antd";
import type { UserFormValues } from "@/types/admin-user-form";
import {
  createEmailRules,
  createFirstNameRules,
  createLastNameRules,
  createPasswordRulesCreate,
  createPasswordRulesEdit,
  createRolesRules,
} from "@/validators/admin-user-form-validation";

const checkboxGroupStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 8,
};

type AdminUserFormFieldsProps = {
  mode: "create" | "edit";
  roleOptions: { label: string; value: string }[];
};

export function AdminUserFormFields({ mode, roleOptions }: AdminUserFormFieldsProps) {
  const { t } = useTranslation(["validation", "users"]);
  const optionsForRoles = roleOptions.filter((o) => o.value !== "admin");
  const allowedSlugs = optionsForRoles.map((o) => o.value);

  const firstNameRules = useMemo(() => createFirstNameRules(t), [t]);
  const lastNameRules = useMemo(() => createLastNameRules(t), [t]);
  const emailRules = useMemo(() => createEmailRules(t), [t]);
  const passwordRulesCreate = useMemo(() => createPasswordRulesCreate(t), [t]);
  const passwordRulesEdit = useMemo(() => createPasswordRulesEdit(t), [t]);
  const rolesRuleList = useMemo(
    () => createRolesRules(t, allowedSlugs, mode),
    [t, allowedSlugs, mode],
  );

  return (
    <>
      <Form.Item<UserFormValues> name="firstName" label={t("users:firstName")} rules={firstNameRules}>
        <Input autoComplete="given-name" />
      </Form.Item>
      <Form.Item<UserFormValues> name="lastName" label={t("users:lastName")} rules={lastNameRules}>
        <Input autoComplete="family-name" />
      </Form.Item>
      <Form.Item<UserFormValues> name="email" label={t("users:email")} rules={emailRules}>
        <Input autoComplete="email" />
      </Form.Item>
      {mode === "create" ? (
        <Form.Item<UserFormValues> name="password" label={t("users:password")} rules={passwordRulesCreate}>
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      ) : (
        <Form.Item<UserFormValues>
          name="password"
          label={t("users:newPassword")}
          extra={t("users:newPasswordExtra")}
          rules={passwordRulesEdit}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      )}
      <Form.Item<UserFormValues>
        name="roles"
        label={t("users:roles")}
        rules={rolesRuleList}
      >
        <Checkbox.Group options={optionsForRoles} style={checkboxGroupStyle} />
      </Form.Item>
    </>
  );
}
