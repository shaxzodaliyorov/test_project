import type { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Input, Space, Table } from "antd";
import type { ReportDailyPoint, ReportsTableResponse } from "@/types/reports";
import type { PagedFilter } from "@/constants/reports-paged-filter";
import { paginationShowTotal } from "@/utils/pagination-show-total";
import { buildReportsColumnsDaily } from "./reports-table-columns";

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
  const { t } = useTranslation(["reports", "common"]);
  const columns = useMemo(() => buildReportsColumnsDaily(t), [t]);
  const showTotal = useMemo(() => paginationShowTotal(t), [t]);

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Input.Search
        allowClear
        placeholder={t("reports:searchDaily")}
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
