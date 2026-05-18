import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { TableProps } from "antd";
import {
  Alert,
  Button,
  Empty,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { PERMISSIONS } from "@/constants/permissions";
import { getRoleSelectOptions } from "@/constants/role-options";
import { useAuthStore } from "@/hooks/auth-store";
import { useCanAccess } from "@/hooks/use-can-access";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useUsers } from "@/hooks/use-users";
import type { UserFormValues } from "@/types/admin-user-form";
import type { Role } from "@/types/role";
import type { User } from "@/types/user";
import { fullNameFromForm, splitStoredName } from "@/utils/admin-user-name";
import { paginationShowTotal } from "@/utils/pagination-show-total";
import { AdminUserCreateModal } from "./admin-user-create-modal";
import { AdminUserEditDrawer } from "./admin-user-edit-drawer";

function roleTagColor(role: Role): string | undefined {
  if (role === "admin") return "blue";
  if (role === "payment") return "green";
  if (role === "reports") return "gold";
  if (role === "users") return "purple";
  return undefined;
}

const ROLE_LABEL_KEY: Record<Role, string> = {
  admin: "users:roleAdmin",
  payment: "users:rolePayment",
  reports: "users:roleReports",
  users: "users:roleUsers",
};

export function AdminUsersPage() {
  const { t } = useTranslation(["users", "common"]);
  const canWrite = useCanAccess(PERMISSIONS.USERS_WRITE);
  const currentUserId = useAuthStore((s) => s.user?.id);

  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput, 280);
  const [prevDebouncedSearch, setPrevDebouncedSearch] =
    useState(debouncedSearch);

  const { listQuery, createMutation, updateMutation, deleteMutation } =
    useUsers({
      page,
      pageSize,
      search: debouncedSearch,
    });

  const [createOpen, setCreateOpen] = useState(false);
  const [createForm] = Form.useForm<UserFormValues>();
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editForm] = Form.useForm<UserFormValues>();

  const roleOptions = useMemo(() => getRoleSelectOptions(t), [t]);
  const showTotal = useMemo(() => paginationShowTotal(t), [t]);

  useEffect(() => {
    if (!editUser) return;
    const { firstName, lastName } = splitStoredName(editUser.name);
    editForm.setFieldsValue({
      firstName,
      lastName,
      email: editUser.email,
      roles: [...editUser.roles],
      password: undefined,
    });
  }, [editUser, editForm]);

  const openCreate = () => {
    createForm.resetFields();
    const slugs = roleOptions.map((o) => o.value).filter((s) => s !== "admin");
    const defaultRoles: Role[] = slugs.includes("reports")
      ? ["reports"]
      : slugs.includes("payment")
        ? ["payment"]
        : slugs.includes("users")
          ? ["users"]
          : slugs[0]
            ? [slugs[0] as Role]
            : [];
    createForm.setFieldsValue({
      roles: defaultRoles,
      firstName: "",
      lastName: "",
    });
    setCreateOpen(true);
  };

  const submitCreate = async () => {
    const v = await createForm.validateFields();
    await createMutation.mutateAsync({
      email: v.email.trim(),
      name: fullNameFromForm(v),
      password: v.password ?? "",
      roles: v.roles,
    });
    setCreateOpen(false);
    createForm.resetFields();
  };

  const submitEdit = async () => {
    if (!editUser) return;
    const v = await editForm.validateFields();
    const body: Partial<{
      email: string;
      name: string;
      password: string;
      roles: Role[];
    }> = {
      email: v.email.trim(),
      name: fullNameFromForm(v),
      roles: v.roles,
    };
    if (v.password?.trim()) body.password = v.password.trim();
    await updateMutation.mutateAsync({ id: editUser.id, body });
    setEditUser(null);
    editForm.resetFields();
  };

  const confirmDelete = useCallback(
    (row: User) => {
      Modal.confirm({
        title: t("users:deleteTitle"),
        content: t("users:deleteBody", { name: row.name, email: row.email }),
        okText: t("common:delete"),
        okButtonProps: { danger: true },
        cancelText: t("common:cancel"),
        onOk: () => deleteMutation.mutateAsync(row.id),
      });
    },
    [deleteMutation, t],
  );

  const emptyDescription = useMemo(
    () =>
      debouncedSearch.trim()
        ? t("users:emptySearch")
        : t("users:emptyDefault"),
    [debouncedSearch, t],
  );

  const errorDescription =
    listQuery.error instanceof Error
      ? listQuery.error.message
      : String(listQuery.error ?? t("common:unknownError"));

  const columns = useMemo<TableProps<User>["columns"]>(
    () => [
      {
        title: t("users:columnIndex"),
        key: "index",
        width: 56,
        align: "center" as const,
        render: (_: unknown, __: User, index: number) =>
          (page - 1) * pageSize + index + 1,
      },
      {
        title: t("users:columnName"),
        dataIndex: "name",
        key: "name",
        ellipsis: true,
      },
      {
        title: t("users:columnEmail"),
        dataIndex: "email",
        key: "email",
        ellipsis: true,
      },
      {
        title: t("users:columnRoles"),
        dataIndex: "roles",
        key: "roles",
        render: (roles: Role[]) => (
          <Space size={[4, 4]} wrap>
            {roles.length === 0 ? (
              <Tag color="default">{t("users:noRoleTag")}</Tag>
            ) : (
              roles.map((r) => (
                <Tag key={r} color={roleTagColor(r)}>
                  {t(ROLE_LABEL_KEY[r])}
                </Tag>
              ))
            )}
          </Space>
        ),
      },
      ...(canWrite
        ? [
            {
              title: t("users:columnActions"),
              key: "actions",
              width: 160,
              fixed: "right" as const,
              render: (_: unknown, row: User) => (
                <Space size="small">
                  <Button
                    type="link"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => setEditUser(row)}
                  >
                    {t("users:edit")}
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    danger
                    disabled={row.id === currentUserId}
                    icon={<DeleteOutlined />}
                    onClick={() => confirmDelete(row)}
                  >
                    {t("users:delete")}
                  </Button>
                </Space>
              ),
            },
          ]
        : []),
    ],
    [canWrite, confirmDelete, currentUserId, page, pageSize, t],
  );

  if (debouncedSearch !== prevDebouncedSearch) {
    setPrevDebouncedSearch(debouncedSearch);
    setPage(1);
  }

  if (listQuery.isSuccess && listQuery.data && listQuery.data.total > 0) {
    const lastPage = Math.max(1, Math.ceil(listQuery.data.total / pageSize));
    if (page > lastPage) {
      setPage(lastPage);
    }
  }

  const data = listQuery.data?.items ?? [];
  const total = listQuery.data?.total ?? 0;

  return (
    <>
      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%", display: "flex" }}
      >
        <Space
          align="center"
          style={{ width: "100%", justifyContent: "space-between" }}
          wrap
        >
          <Typography.Title level={2} style={{ margin: 0 }}>
            {t("users:title")}
          </Typography.Title>
          <Space wrap>
            <Input
              allowClear
              placeholder={t("users:searchPlaceholder")}
              prefix={<SearchOutlined style={{ color: "var(--text)" }} />}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ width: 280, maxWidth: "100%" }}
            />
            {canWrite ? (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openCreate}
              >
                {t("users:addUser")}
              </Button>
            ) : null}
          </Space>
        </Space>

        {listQuery.isError ? (
          <Alert
            type="error"
            showIcon
            message={t("users:loadError")}
            description={errorDescription}
            action={
              <Button size="small" onClick={() => void listQuery.refetch()}>
                {t("common:retry")}
              </Button>
            }
          />
        ) : null}

        <Table<User>
          rowKey="id"
          loading={listQuery.isLoading}
          dataSource={data}
          columns={columns}
          scroll={{ x: "max-content" }}
          locale={{
            emptyText: listQuery.isError ? (
              <></>
            ) : (
              <Empty description={emptyDescription} />
            ),
          }}
          pagination={{
            current: page,
            pageSize,
            total,
            showSizeChanger: false,
            showTotal,
            onChange: (p) => {
              setPage(p);
            },
          }}
        />
      </Space>

      <AdminUserCreateModal
        open={createOpen}
        form={createForm}
        roleOptions={roleOptions}
        confirmLoading={createMutation.isPending}
        onCancel={() => {
          setCreateOpen(false);
          createForm.resetFields();
        }}
        onSubmit={() => void submitCreate().catch(() => {})}
      />

      <AdminUserEditDrawer
        user={editUser}
        form={editForm}
        roleOptions={roleOptions}
        loading={updateMutation.isPending}
        onClose={() => {
          setEditUser(null);
          editForm.resetFields();
        }}
        onSubmit={() => void submitEdit().catch(() => {})}
      />
    </>
  );
}
