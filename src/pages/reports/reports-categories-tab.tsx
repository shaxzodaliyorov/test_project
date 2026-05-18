import type { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Input, Space, Table } from "antd";
import type { ReportCategoryRow, ReportsTableResponse } from "@/types/reports";
import type { PagedFilter } from "@/constants/reports-paged-filter";
import { paginationShowTotal } from "@/utils/pagination-show-total";
import { buildReportsColumnsCategory } from "./reports-table-columns";

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
  const { t } = useTranslation(["reports", "common"]);
  const columns = useMemo(() => buildReportsColumnsCategory(t), [t]);
  const showTotal = useMemo(() => paginationShowTotal(t), [t]);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input.Search
        allowClear
        placeholder={t("reports:searchCategory")}
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
        columns={columns}
        scroll={{ y: 400, x: 900 }}
        pagination={{
          current: filter.page,
          pageSize: filter.pageSize,
          total: data?.total ?? 0,
          showSizeChanger: false,
          showTotal,
          onChange: (p) => onFilterChange((s) => ({ ...s, page: p })),
        }}
      />
    </Space>
  );
}
