import { useMemo } from "react";
import { Alert, Button, Input, Select, Space, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Payment, PaymentStatus } from "@/types/payment";
import { usePaymentsPage } from "@/hooks/use-payments-page";
import { formatCurrencyMinorUnits } from "@/utils/format-currency";

const STATUS_OPTIONS: { label: string; value: PaymentStatus }[] = [
  { label: "Kutilmoqda", value: "pending" },
  { label: "To‘langan", value: "paid" },
  { label: "Muvaffaqiyatsiz", value: "failed" },
];

const STATUS_TAG_COLOR: Record<PaymentStatus, string> = {
  pending: "gold",
  paid: "green",
  failed: "red",
};

function paymentStatusLabel(status: PaymentStatus): string {
  return STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

export function PaymentsPage() {
  const p = usePaymentsPage();

  const columns: ColumnsType<Payment> = useMemo(
    () => [
      {
        title: "№",
        key: "index",
        width: 56,
        fixed: "left",
        align: "center",
        render: (_, __, index) => (p.page - 1) * p.pageSize + index + 1,
      },
      { title: "ID", dataIndex: "id", key: "id", width: 120, fixed: "left" },
      {
        title: "Summa",
        key: "amount",
        width: 120,
        render: (_, row) =>
          formatCurrencyMinorUnits(row.amountCents, {
            currency: row.currency,
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
          }),
      },
      {
        title: "Komissiya",
        key: "fee",
        width: 100,
        render: (_, row) =>
          formatCurrencyMinorUnits(row.feeCents, {
            currency: row.currency,
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
          }),
      },
      {
        title: "Holat",
        dataIndex: "status",
        key: "status",
        width: 130,
        render: (status: PaymentStatus) => (
          <Tag color={STATUS_TAG_COLOR[status]}>{paymentStatusLabel(status)}</Tag>
        ),
      },
      { title: "Usul", dataIndex: "method", key: "method", width: 120 },
      {
        title: "Kategoriya",
        dataIndex: "category",
        key: "category",
        width: 120,
      },
      {
        title: "Merchant",
        dataIndex: "merchantName",
        key: "merchantName",
        width: 140,
      },
      {
        title: "Mijoz",
        dataIndex: "customerEmail",
        key: "customerEmail",
        ellipsis: true,
        width: 200,
      },
      {
        title: "Ref",
        dataIndex: "externalRef",
        key: "externalRef",
        width: 160,
      },
      { title: "Shahar", dataIndex: "city", key: "city", width: 100 },
      {
        title: "Yaratilgan",
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        render: (v: string) => new Date(v).toLocaleString(),
      },
    ],
    [p.page, p.pageSize],
  );

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ width: "100%", display: "flex" }}
    >
      <Typography.Title level={2} style={{ margin: 0 }}>
        To‘lovlar
      </Typography.Title>

      <Space wrap style={{ width: "100%" }} size="middle">
        <Input.Search
          allowClear
          placeholder="ID, mijoz, merchant, kategoriya, ref, shahar, usul, holat…"
          style={{ maxWidth: 420, minWidth: 200 }}
          value={p.search}
          onChange={(e) => {
            p.setSearch(e.target.value);
          }}
        />
        <Select
          style={{ minWidth: 180 }}
          allowClear
          placeholder="Holat (barchasi)"
          value={p.status === "" ? undefined : p.status}
          options={STATUS_OPTIONS}
          onChange={(v) => {
            p.setStatus(v ?? "");
          }}
        />
      </Space>

      {p.query.isError ? (
        <Alert
          type="error"
          showIcon
          message="Ma'lumot yuklanmadi"
          description={p.errorDescription}
          action={
            <Button size="small" onClick={() => void p.refetch()}>
              Qayta urinish
            </Button>
          }
        />
      ) : null}

      <Table<Payment>
        rowKey="id"
        loading={p.query.isFetching}
        dataSource={p.items}
        scroll={{ x: 1480 }}
        columns={columns}
        pagination={{
          current: p.page,
          pageSize: p.pageSize,
          total: p.total,
          showSizeChanger: false,
          showTotal: p.showTotal,
          onChange: p.onPaginationChange,
        }}
      />
    </Space>
  );
}
