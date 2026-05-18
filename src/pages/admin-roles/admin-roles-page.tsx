import { Alert, Button, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRolesList, type RoleOption } from "@/hooks/use-roles";

export function AdminRolesPage() {
  const listQuery = useRolesList();

  const errorDescription =
    listQuery.error instanceof Error
      ? listQuery.error.message
      : String(listQuery.error ?? "Unknown error");

  const columns: ColumnsType<RoleOption> = [
    {
      title: "Qiymat (slug)",
      dataIndex: "value",
      key: "value",
      width: 200,
    },
    {
      title: "Ko‘rsatma nomi",
      dataIndex: "label",
      key: "label",
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%", display: "flex" }}>
      <Typography.Title level={2} style={{ margin: 0 }}>
        Roles
      </Typography.Title>

      <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
        Rol katalogi backenddan statik keladi (o‘zgartirib bo‘lmaydi).
      </Typography.Paragraph>

      {listQuery.isError ? (
        <Alert
          type="error"
          showIcon
          message="Rollarni yuklash muvaffaqiyatsiz"
          description={errorDescription}
          action={
            <Button size="small" onClick={() => void listQuery.refetch()}>
              Qayta urinish
            </Button>
          }
        />
      ) : null}

      <Table<RoleOption>
        rowKey="value"
        loading={listQuery.isLoading}
        dataSource={listQuery.data?.items ?? []}
        columns={columns}
        pagination={false}
      />
    </Space>
  );
}
