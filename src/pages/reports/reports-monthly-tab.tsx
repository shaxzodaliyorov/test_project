import type { Dispatch, SetStateAction } from "react";
import { Input, Space, Table } from "antd";
import type { ReportMonthlyRow, ReportsTableResponse } from "@/types/reports";
import type { PagedFilter } from "@/constants/reports-paged-filter";
import { reportsShowTotal } from "./reports-format";
import { reportsColumnsMonthly } from "./reports-table-columns";

type MonthlyTable = Extract<ReportsTableResponse, { section: "monthly" }>;

type ReportsMonthlyTabProps = {
  filter: PagedFilter;
  onFilterChange: Dispatch<SetStateAction<PagedFilter>>;
  data: MonthlyTable | null;
  loading: boolean;
};

export function ReportsMonthlyTab({
  filter,
  onFilterChange,
  data,
  loading,
}: ReportsMonthlyTabProps) {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input.Search
        allowClear
        placeholder="Oy bo‘yicha qidiruv (masalan: 2025-04)"
        value={filter.search}
        onChange={(e) => {
          onFilterChange((s) => ({ ...s, search: e.target.value, page: 1 }));
        }}
      />
      <Table<ReportMonthlyRow>
        rowKey="month"
        loading={loading}
        dataSource={data?.items ?? []}
        size="small"
        columns={reportsColumnsMonthly}
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
