import type { Dispatch, SetStateAction } from "react";
import { Input, Space, Table } from "antd";
import type { ReportCategoryRow, ReportsTableResponse } from "@/types/reports";
import type { PagedFilter } from "@/constants/reports-paged-filter";
import { reportsShowTotal } from "./reports-format";
import { reportsColumnsCategory } from "./reports-table-columns";

type CategoriesTable = Extract<ReportsTableResponse, { section: "categories" }>;

type ReportsCategoriesTabProps = {
  filter: PagedFilter;
  onFilterChange: Dispatch<SetStateAction<PagedFilter>>;
  data: CategoriesTable | null;
  loading: boolean;
};

export function ReportsCategoriesTab({
  filter,
  onFilterChange,
  data,
  loading,
}: ReportsCategoriesTabProps) {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input.Search
        allowClear
        placeholder="Kategoriya yoki tranzaksiya soni"
        value={filter.search}
        onChange={(e) => {
          onFilterChange((s) => ({ ...s, search: e.target.value, page: 1 }));
        }}
      />
      <Table<ReportCategoryRow>
        rowKey="category"
        loading={loading}
        dataSource={data?.items ?? []}
        size="small"
        columns={reportsColumnsCategory}
        scroll={{ y: 400, x: 720 }}
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
