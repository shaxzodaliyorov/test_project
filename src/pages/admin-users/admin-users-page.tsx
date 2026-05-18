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
import { PERMISSIONS } from "@/constants/permissions";
import { useAuthStore } from "@/hooks/auth-store";
import { useCanAccess } from "@/hooks/use-can-access";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useUsers } from "@/hooks/use-users";
import { AdminUserCreateModal } from "./admin-user-create-modal";
import { AdminUserEditDrawer } from "./admin-user-edit-drawer";
import type { UserFormValues } from "./admin-user-form-types";
import type { Role } from "@/types/role";
import type { User } from "@/types/user";

export function AdminUsersPage() {
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

  useEffect(() => {
    if (!editUser) return;
    editForm.setFieldsValue({
      name: editUser.name,
      email: editUser.email,
      roles: [...editUser.roles],
      password: undefined,
    });
  }, [editUser, editForm]);

  const openCreate = () => {
    createForm.resetFields();
    createForm.setFieldsValue({ roles: ["user"] });
    setCreateOpen(true);
  };

  const submitCreate = async () => {
    const v = await createForm.validateFields();
    await createMutation.mutateAsync({
      email: v.email.trim(),
      name: v.name.trim(),
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
      name: v.name.trim(),
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
        title: "Delete user?",
        content: `This will permanently remove ${row.name} (${row.email}).`,
        okText: "Delete",
        okButtonProps: { danger: true },
        cancelText: "Cancel",
        onOk: () => deleteMutation.mutateAsync(row.id),
      });
    },
    [deleteMutation],
  );

  const emptyDescription = useMemo(
    () =>
      debouncedSearch.trim()
        ? "No users match your search."
        : "No users to display.",
    [debouncedSearch],
  );

  const errorDescription =
    listQuery.error instanceof Error
      ? listQuery.error.message
      : String(listQuery.error ?? "Unknown error");

  const columns = useMemo<TableProps<User>["columns"]>(
    () => [
      {
        title: "#",
        key: "index",
        width: 56,
        align: "center" as const,
        render: (_: unknown, __: User, index: number) =>
          (page - 1) * pageSize + index + 1,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ellipsis: true,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        ellipsis: true,
      },
      {
        title: "Roles",
        dataIndex: "roles",
        key: "roles",
        render: (roles: Role[]) => (
          <Space size={[4, 4]} wrap>
            {roles.map((r) => (
              <Tag key={r} color={r === "admin" ? "blue" : "default"}>
                {r}
              </Tag>
            ))}
          </Space>
        ),
      },
      ...(canWrite
        ? [
            {
              title: "Actions",
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
                    Edit
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    danger
                    disabled={row.id === currentUserId}
                    icon={<DeleteOutlined />}
                    onClick={() => confirmDelete(row)}
                  >
                    Delete
                  </Button>
                </Space>
              ),
            },
          ]
        : []),
    ],
    [canWrite, currentUserId, confirmDelete, page],
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
            Users
          </Typography.Title>
          <Space wrap>
            <Input
              allowClear
              placeholder="Search by name or email"
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
                Add user
              </Button>
            ) : null}
          </Space>
        </Space>

        {listQuery.isError ? (
          <Alert
            type="error"
            showIcon
            message="Failed to load users"
            description={errorDescription}
            action={
              <Button size="small" onClick={() => void listQuery.refetch()}>
                Retry
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
            showTotal: (t, range) => `${range[0]}-${range[1]} of ${t}`,
            onChange: (p) => {
              setPage(p);
            },
          }}
        />
      </Space>

      <AdminUserCreateModal
        open={createOpen}
        form={createForm}
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
