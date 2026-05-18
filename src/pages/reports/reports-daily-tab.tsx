import type { Dispatch, SetStateAction } from "react";
import { Input, Space, Table } from "antd";
import type { ReportDailyPoint, ReportsTableResponse } from "@/types/reports";
import type { PagedFilter } from "@/constants/reports-paged-filter";
import { reportsShowTotal } from "./reports-format";
import { reportsColumnsDaily } from "./reports-table-columns";

type DailyTable = Extract<ReportsTableResponse, { section: "daily" }>;

type ReportsDailyTabProps = {
  filter: PagedFilter;
  onFilterChange: Dispatch<SetStateAction<PagedFilter>>;
  data: DailyTable | null;
  loading: boolean;
};

export function ReportsDailyTab({
  filter,
  onFilterChange,
  data,
  loading,
}: ReportsDailyTabProps) {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input.Search
        allowClear
        placeholder="Sana yoki buyurtmalar soni bo‘yicha"
        value={filter.search}
        onChange={(e) => {
          onFilterChange((s) => ({ ...s, search: e.target.value, page: 1 }));
        }}
      />
      <Table<ReportDailyPoint>
        rowKey="day"
        loading={loading}
        dataSource={data?.items ?? []}
        size="small"
        columns={reportsColumnsDaily}
        scroll={{ x: 640 }}
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
