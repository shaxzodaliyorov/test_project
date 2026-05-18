import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReportTableSection, ReportsOverviewResponse, ReportsTableResponse } from "@/types/reports";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { apiGet } from "@/utils/http-client";
import {
  REPORTS_CATEGORIES_INITIAL,
  REPORTS_DAILY_INITIAL,
  REPORTS_HOURLY_INITIAL,
  REPORTS_INITIAL_PAGED,
  type PagedFilter,
} from "@/constants/reports-paged-filter";

export type ReportsRangeParam = "" | "30d" | "12m";

function reportsOverviewUrl(range: ReportsRangeParam): string {
  const p = new URLSearchParams();
  p.set("part", "overview");
  if (range) p.set("range", range);
  return `/api/reports?${p.toString()}`;
}

function reportsTableUrl(
  range: ReportsRangeParam,
  section: ReportTableSection,
  page: number,
  pageSize: number,
  search: string,
): string {
  const p = new URLSearchParams();
  p.set("part", "table");
  p.set("section", section);
  p.set("page", String(page));
  p.set("pageSize", String(pageSize));
  if (range) p.set("range", range);
  const t = search.trim();
  if (t) p.set("search", t);
  return `/api/reports?${p.toString()}`;
}

function tableSectionFromTab(tab: string): ReportTableSection | null {
  if (tab === "monthly") return "monthly";
  if (tab === "daily") return "daily";
  if (tab === "categories") return "categories";
  if (tab === "merchants") return "merchants";
  if (tab === "hourly") return "hourly";
  return null;
}

export function useReportsPage() {
  const [range, setRange] = useState<ReportsRangeParam>("");
  const [activeTab, setActiveTab] = useState("summary");

  const [monthly, setMonthly] = useState<PagedFilter>({ ...REPORTS_INITIAL_PAGED });
  const [daily, setDaily] = useState<PagedFilter>({ ...REPORTS_DAILY_INITIAL });
  const [categories, setCategories] = useState<PagedFilter>({
    ...REPORTS_CATEGORIES_INITIAL,
  });
  const [merchants, setMerchants] = useState<PagedFilter>({ ...REPORTS_INITIAL_PAGED });
  const [hourly, setHourly] = useState<PagedFilter>({ ...REPORTS_HOURLY_INITIAL });

  const resetPagesOnly = useCallback(() => {
    setMonthly((s) => ({ ...s, page: 1 }));
    setDaily((s) => ({ ...s, page: 1 }));
    setCategories((s) => ({ ...s, page: 1 }));
    setMerchants((s) => ({ ...s, page: 1 }));
    setHourly((s) => ({ ...s, page: 1 }));
  }, []);

  const tableSection = useMemo(
    () => tableSectionFromTab(activeTab),
    [activeTab],
  );

  const tablePaging = useMemo(() => {
    switch (activeTab) {
      case "monthly":
        return monthly;
      case "daily":
        return daily;
      case "categories":
        return categories;
      case "merchants":
        return merchants;
      case "hourly":
        return hourly;
      default:
        return null;
    }
  }, [activeTab, monthly, daily, categories, merchants, hourly]);

  const tableSearchRaw = tablePaging?.search ?? "";
  const debouncedTableSearch = useDebouncedValue(tableSearchRaw, 350);

  const overviewQuery = useQuery({
    queryKey: ["reports", "overview", range],
    queryFn: () => apiGet<ReportsOverviewResponse>(reportsOverviewUrl(range)),
  });

  const tableQuery = useQuery({
    queryKey: [
      "reports",
      "table",
      range,
      tableSection,
      tablePaging?.page,
      tablePaging?.pageSize,
      debouncedTableSearch,
    ],
    enabled: Boolean(tableSection && tablePaging),
    queryFn: () =>
      apiGet<ReportsTableResponse>(
        reportsTableUrl(
          range,
          tableSection!,
          tablePaging!.page,
          tablePaging!.pageSize,
          debouncedTableSearch,
        ),
      ),
  });

  useEffect(() => {
    const d = tableQuery.data;
    if (!d || !tableSection || d.section !== tableSection) return;

    const { page, pageSize } = d;
    const patch = (prev: PagedFilter) =>
      prev.page === page && prev.pageSize === pageSize
        ? prev
        : { ...prev, page, pageSize };

    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      switch (d.section) {
        case "monthly":
          setMonthly(patch);
          break;
        case "daily":
          setDaily(patch);
          break;
        case "categories":
          setCategories(patch);
          break;
        case "merchants":
          setMerchants(patch);
          break;
        case "hourly":
          setHourly(patch);
          break;
        default:
          break;
      }
    });
    return () => {
      cancelled = true;
    };
  }, [tableQuery.data, tableSection]);

  const overview = overviewQuery.data;

  const overviewError =
    overviewQuery.error instanceof Error
      ? overviewQuery.error.message
      : String(overviewQuery.error ?? "");
  const tableError =
    tableQuery.error instanceof Error
      ? tableQuery.error.message
      : String(tableQuery.error ?? "");

  const onTabChange = useCallback(
    (key: string) => {
      setActiveTab(key);
      resetPagesOnly();
    },
    [resetPagesOnly],
  );

  const onRangeChange = useCallback(
    (value: string) => {
      const next = (value === "default" ? "" : value) as ReportsRangeParam;
      setRange(next);
      resetPagesOnly();
    },
    [resetPagesOnly],
  );

  const refetchAll = useCallback(() => {
    void overviewQuery.refetch();
    void tableQuery.refetch();
  }, [overviewQuery, tableQuery]);

  const monthlyLoading = activeTab === "monthly" && tableQuery.isFetching;
  const dailyLoading = activeTab === "daily" && tableQuery.isFetching;
  const categoriesLoading = activeTab === "categories" && tableQuery.isFetching;
  const merchantsLoading = activeTab === "merchants" && tableQuery.isFetching;
  const hourlyLoading = activeTab === "hourly" && tableQuery.isFetching;

  const monthlyData =
    tableQuery.data?.section === "monthly" ? tableQuery.data : null;
  const dailyData =
    tableQuery.data?.section === "daily" ? tableQuery.data : null;
  const categoriesData =
    tableQuery.data?.section === "categories" ? tableQuery.data : null;
  const merchantsData =
    tableQuery.data?.section === "merchants" ? tableQuery.data : null;
  const hourlyData =
    tableQuery.data?.section === "hourly" ? tableQuery.data : null;

  const showOverviewError = overviewQuery.isError;
  const showTableError = Boolean(tableSection) && tableQuery.isError;
  const errorDescription = showOverviewError
    ? overviewError
    : showTableError
      ? tableError
      : "";

  const summarySpinning = activeTab === "summary" && overviewQuery.isFetching;
  const overviewFetching = overviewQuery.isFetching;

  return {
    range,
    activeTab,
    onTabChange,
    onRangeChange,
    overview,
    overviewFetching,
    summarySpinning,
    monthly,
    setMonthly,
    monthlyData,
    monthlyLoading,
    daily,
    setDaily,
    dailyData,
    dailyLoading,
    categories,
    setCategories,
    categoriesData,
    categoriesLoading,
    merchants,
    setMerchants,
    merchantsData,
    merchantsLoading,
    hourly,
    setHourly,
    hourlyData,
    hourlyLoading,
    refetchAll,
    showOverviewError,
    showTableError,
    errorDescription,
  };
}
