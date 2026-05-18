import type { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Input, Space, Table } from "antd";
import type { ReportMonthlyRow, ReportsTableResponse } from "@/types/reports";
import type { PagedFilter } from "@/constants/reports-paged-filter";
import { paginationShowTotal } from "@/utils/pagination-show-total";
import { buildReportsColumnsMonthly } from "./reports-table-columns";

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
  const { t } = useTranslation(["reports", "common"]);
  const columns = useMemo(() => buildReportsColumnsMonthly(t), [t]);
  const showTotal = useMemo(() => paginationShowTotal(t), [t]);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input.Search
        allowClear
        placeholder={t("reports:searchMonthly")}
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
        columns={columns}
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
