import type { Dispatch, SetStateAction } from "react";
import { Input, Space, Table } from "antd";
import type { ReportHourlyRow, ReportsTableResponse } from "@/types/reports";
import type { PagedFilter } from "@/constants/reports-paged-filter";
import { reportsShowTotal } from "./reports-format";
import { reportsColumnsHourly } from "./reports-table-columns";

type HourlyTable = Extract<ReportsTableResponse, { section: "hourly" }>;

type ReportsHourlyTabProps = {
  filter: PagedFilter;
  onFilterChange: Dispatch<SetStateAction<PagedFilter>>;
  data: HourlyTable | null;
  loading: boolean;
};

export function ReportsHourlyTab({
  filter,
  onFilterChange,
  data,
  loading,
}: ReportsHourlyTabProps) {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input.Search
        allowClear
        placeholder="ISO vaqt, hajm yoki kechikish"
        value={filter.search}
        onChange={(e) => {
          onFilterChange((s) => ({ ...s, search: e.target.value, page: 1 }));
        }}
      />
      <Table<ReportHourlyRow>
        rowKey="hour"
        loading={loading}
        dataSource={data?.items ?? []}
        size="small"
        columns={reportsColumnsHourly}
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
