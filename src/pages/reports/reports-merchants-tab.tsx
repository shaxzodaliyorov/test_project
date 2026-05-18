import type { Dispatch, SetStateAction } from "react";
import { Input, Space, Table } from "antd";
import type { ReportMerchantRow, ReportsTableResponse } from "@/types/reports";
import type { PagedFilter } from "@/constants/reports-paged-filter";
import { reportsShowTotal } from "./reports-format";
import { reportsColumnsMerchant } from "./reports-table-columns";

type MerchantsTable = Extract<ReportsTableResponse, { section: "merchants" }>;

type ReportsMerchantsTabProps = {
  filter: PagedFilter;
  onFilterChange: Dispatch<SetStateAction<PagedFilter>>;
  data: MerchantsTable | null;
  loading: boolean;
};

export function ReportsMerchantsTab({
  filter,
  onFilterChange,
  data,
  loading,
}: ReportsMerchantsTabProps) {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input.Search
        allowClear
        placeholder="Merchant nomi yoki buyurtmalar"
        value={filter.search}
        onChange={(e) => {
          onFilterChange((s) => ({ ...s, search: e.target.value, page: 1 }));
        }}
      />
      <Table<ReportMerchantRow>
        rowKey="merchant"
        loading={loading}
        dataSource={data?.items ?? []}
        size="small"
        columns={reportsColumnsMerchant}
        pagination={{
          current: filter.page,
          pageSize: filter.pageSize,
          total: data?.total ?? 0,
          showSizeChanger: false,
          showTotal: reportsShowTotal(),
          onChange: (p) => onFilterChange((s) => ({ ...s, page: p })),
        }}
      />
    </Space>
  );
}
