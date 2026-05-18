import { useTranslation } from "react-i18next";
import {
  Alert,
  Button,
  Empty,
  Input,
  Pagination,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import type { Payment } from "@/types/payment";
import { DataTableSkeleton } from "@/components/skeletons/data-table-skeleton";
import { ListCardSkeletonList } from "@/components/skeletons/list-card-skeleton-list";
import { useCompactLayout } from "@/hooks/use-compact-layout";
import { usePaymentsPage } from "@/hooks/use-payments-page";
import { PaymentCard } from "./payment-card";
import {
  paymentsCardList,
  paymentsFullWidth,
  paymentsPageStack,
  paymentsPageStackCompact,
  paymentsPaginationCompact,
  paymentsSearchDesktop,
  paymentsSelectDesktop,
  paymentsSpaceFullWidth,
  paymentsTitle,
  paymentsTitleCompact,
  paymentsToolbarColumn,
} from "./payments-page.styles";

export function PaymentsPage() {
  const { t } = useTranslation(["payments", "common"]);
  const isCompact = useCompactLayout();
  const p = usePaymentsPage();
  const isFetching = p.query.isFetching;
  const columnCount = p.columns.length;

  return (
    <div style={isCompact ? paymentsPageStackCompact : paymentsPageStack}>
      {isCompact ? (
        <>
          <Typography.Title level={4} style={paymentsTitleCompact}>
            {t("payments:title")}
          </Typography.Title>
          <div style={paymentsToolbarColumn}>
            <Input.Search
              allowClear
              placeholder={t("payments:searchPlaceholder")}
              value={p.search}
              onChange={(e) => p.setSearch(e.target.value)}
              style={paymentsFullWidth}
            />
            <Select
              allowClear
              placeholder={t("payments:statusPlaceholder")}
              value={p.status === "" ? undefined : p.status}
              options={p.statusOptions}
              onChange={(v) => p.setStatus(v ?? "")}
              style={paymentsFullWidth}
            />
          </div>
        </>
      ) : (
        <>
          <Typography.Title level={2} style={paymentsTitle}>
            {t("payments:title")}
          </Typography.Title>
          <Space wrap style={paymentsSpaceFullWidth} size="middle">
            <Input.Search
              allowClear
              placeholder={t("payments:searchPlaceholder")}
              style={paymentsSearchDesktop}
              value={p.search}
              onChange={(e) => p.setSearch(e.target.value)}
            />
            <Select
              style={paymentsSelectDesktop}
              allowClear
              placeholder={t("payments:statusPlaceholder")}
              value={p.status === "" ? undefined : p.status}
              options={p.statusOptions}
              onChange={(v) => p.setStatus(v ?? "")}
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
        isFetching ? (
          <ListCardSkeletonList count={p.pageSize} variant="payment" />
        ) : p.items.length === 0 ? (
          p.query.isError ? null : (
            <Empty description={p.emptyDescription} />
          )
        ) : (
          <>
            <div style={paymentsCardList}>
              {p.items.map((row, index) => (
                <PaymentCard
                  key={row.id}
                  payment={row}
                  index={(p.page - 1) * p.pageSize + index + 1}
                  statusLabel={p.statusLabels[row.status]}
                  t={t}
                />
              ))}
            </div>
            {p.total > 0 ? (
              <Pagination
                {...p.paginationConfig}
                size="small"
                style={paymentsPaginationCompact}
              />
            ) : null}
          </>
        )
      ) : isFetching ? (
        <DataTableSkeleton columnCount={columnCount} rowCount={p.pageSize} />
      ) : (
        <Table<Payment>
          rowKey="id"
          dataSource={p.items}
          scroll={{ x: 1480 }}
          columns={p.columns}
          locale={{
            emptyText: p.query.isError ? (
              <></>
            ) : (
              <Empty description={p.emptyDescription} />
            ),
          }}
          pagination={p.paginationConfig}
        />
      )}
    </div>
  );
}
