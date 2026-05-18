import type { CSSProperties } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Button,
  Empty,
  Input,
  Pagination,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Typography,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Payment, PaymentStatus } from "@/types/payment";
import { useCompactLayout } from "@/hooks/use-compact-layout";
import { usePaymentsPage } from "@/hooks/use-payments-page";
import { formatCurrencyMinorUnits } from "@/utils/format-currency";
import { PaymentCard } from "./payment-card";

const STATUS_TAG_COLOR: Record<PaymentStatus, string> = {
  pending: "gold",
  paid: "green",
  failed: "red",
};

const paymentsPageStack: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 24,
  textAlign: "left",
};

const paymentsPageStackCompact: CSSProperties = {
  ...paymentsPageStack,
  gap: 16,
};

const paymentsCardList: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: "100%",
};

export function PaymentsPage() {
  const { t } = useTranslation(["payments", "common"]);
  const isCompact = useCompactLayout();
  const p = usePaymentsPage();

  const statusLabels = useMemo(
    () => ({
      pending: t("payments:statusPending"),
      paid: t("payments:statusPaid"),
      failed: t("payments:statusFailed"),
    }),
    [t],
  );

  const statusOptions = useMemo(
    () =>
      (["pending", "paid", "failed"] as const).map((value) => ({
        value,
        label: statusLabels[value],
      })),
    [statusLabels],
  );

  const emptyDescription = useMemo(
    () =>
      p.search.trim() || p.status
        ? t("payments:emptySearch")
        : t("payments:emptyDefault"),
    [p.search, p.status, t],
  );

  const columns: ColumnsType<Payment> = useMemo(
    () => [
      {
        title: t("payments:colNo"),
        key: "index",
        width: 56,
        fixed: "left",
        align: "center",
        render: (_, __, index) => (p.page - 1) * p.pageSize + index + 1,
      },
      {
        title: t("payments:colId"),
        dataIndex: "id",
        key: "id",
        width: 120,
        fixed: "left",
      },
      {
        title: t("payments:colAmount"),
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
        title: t("payments:colFee"),
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
        title: t("payments:colStatus"),
        dataIndex: "status",
        key: "status",
        width: 130,
        render: (status: PaymentStatus) => (
          <Tag color={STATUS_TAG_COLOR[status]}>
            {statusLabels[status] ?? status}
          </Tag>
        ),
      },
      {
        title: t("payments:colMethod"),
        dataIndex: "method",
        key: "method",
        width: 120,
      },
      {
        title: t("payments:colCategory"),
        dataIndex: "category",
        key: "category",
        width: 120,
      },
      {
        title: t("payments:colMerchant"),
        dataIndex: "merchantName",
        key: "merchantName",
        width: 140,
      },
      {
        title: t("payments:colCustomer"),
        dataIndex: "customerEmail",
        key: "customerEmail",
        ellipsis: true,
        width: 200,
      },
      {
        title: t("payments:colRef"),
        dataIndex: "externalRef",
        key: "externalRef",
        width: 160,
      },
      {
        title: t("payments:colCity"),
        dataIndex: "city",
        key: "city",
        width: 100,
      },
      {
        title: t("payments:colCreated"),
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        render: (v: string) => new Date(v).toLocaleString(),
      },
    ],
    [t, p.page, p.pageSize, statusLabels],
  );

  const paginationConfig = {
    current: p.page,
    pageSize: p.pageSize,
    total: p.total,
    showSizeChanger: false as const,
    showTotal: p.showTotal,
    onChange: p.onPaginationChange,
  };

  return (
    <div style={isCompact ? paymentsPageStackCompact : paymentsPageStack}>
      {isCompact ? (
        <>
          <Typography.Title level={4} style={{ margin: 0, fontSize: 18 }}>
            {t("payments:title")}
          </Typography.Title>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              width: "100%",
            }}
          >
            <Input.Search
              allowClear
              placeholder={t("payments:searchPlaceholder")}
              value={p.search}
              onChange={(e) => {
                p.setSearch(e.target.value);
              }}
              style={{ width: "100%" }}
            />
            <Select
              allowClear
              placeholder={t("payments:statusPlaceholder")}
              value={p.status === "" ? undefined : p.status}
              options={statusOptions}
              onChange={(v) => {
                p.setStatus(v ?? "");
              }}
              style={{ width: "100%" }}
            />
          </div>
        </>
      ) : (
        <>
          <Typography.Title level={2} style={{ margin: 0 }}>
            {t("payments:title")}
          </Typography.Title>
          <Space wrap style={{ width: "100%" }} size="middle">
            <Input.Search
              allowClear
              placeholder={t("payments:searchPlaceholder")}
              style={{ maxWidth: 420, minWidth: 200 }}
              value={p.search}
              onChange={(e) => {
                p.setSearch(e.target.value);
              }}
            />
            <Select
              style={{ minWidth: 180 }}
              allowClear
              placeholder={t("payments:statusPlaceholder")}
              value={p.status === "" ? undefined : p.status}
              options={statusOptions}
              onChange={(v) => {
                p.setStatus(v ?? "");
              }}
            />
          </Space>
        </>
      )}

      {p.query.isError ? (
        <Alert
          type="error"
          showIcon
          message={t("common:loadFailed")}
          description={p.errorDescription}
          action={
            <Button size="small" onClick={() => void p.refetch()}>
              {t("common:retry")}
            </Button>
          }
        />
      ) : null}

      {isCompact ? (
        <Spin spinning={p.query.isFetching}>
          {p.items.length === 0 && !p.query.isFetching ? (
            p.query.isError ? null : (
              <Empty description={emptyDescription} />
            )
          ) : (
            <>
              <div style={paymentsCardList}>
                {p.items.map((row, index) => (
                  <PaymentCard
                    key={row.id}
                    payment={row}
                    index={(p.page - 1) * p.pageSize + index + 1}
                    statusLabel={statusLabels[row.status]}
                    t={t}
                  />
                ))}
              </div>
              {p.total > 0 ? (
                <Pagination
                  {...paginationConfig}
                  size="small"
                  style={{ marginTop: 4 }}
                />
              ) : null}
            </>
          )}
        </Spin>
      ) : (
        <Table<Payment>
          rowKey="id"
          loading={p.query.isFetching}
          dataSource={p.items}
          scroll={{ x: 1480 }}
          columns={columns}
          locale={{
            emptyText: p.query.isError ? (
              <></>
            ) : (
              <Empty description={emptyDescription} />
            ),
          }}
          pagination={paginationConfig}
        />
      )}
    </div>
  );
}
