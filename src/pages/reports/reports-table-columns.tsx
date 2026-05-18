import type { ColumnsType } from "antd/es/table";
import type {
  ReportCategoryRow,
  ReportDailyPoint,
  ReportHourlyRow,
  ReportMerchantRow,
  ReportMonthlyRow,
} from "@/types/reports";
import { formatMoney } from "./reports-format";

export const reportsColumnsMonthly: ColumnsType<ReportMonthlyRow> = [
  { title: "Oy", dataIndex: "month", key: "month" },
  {
    title: "Summa",
    dataIndex: "amount",
    key: "amount",
    render: (v: number) => formatMoney(v),
  },
];

export const reportsColumnsDaily: ColumnsType<ReportDailyPoint> = [
  { title: "Sana", dataIndex: "day", key: "day" },
  { title: "Buyurtmalar", dataIndex: "orders", key: "orders" },
  {
    title: "Brutto",
    dataIndex: "grossCents",
    key: "grossCents",
    render: (v: number) => formatMoney(v),
  },
  {
    title: "Netto",
    dataIndex: "netCents",
    key: "netCents",
    render: (v: number) => formatMoney(v),
  },
];

export const reportsColumnsCategory: ColumnsType<ReportCategoryRow> = [
  {
    title: "Kategoriya",
    dataIndex: "category",
    key: "category",
    ellipsis: true,
    width: 200,
  },
  {
    title: (
      <span style={{ whiteSpace: "nowrap" }}>Tranzaksiyalar</span>
    ),
    dataIndex: "transactionCount",
    key: "transactionCount",
    width: 152,
    align: "right",
  },
  {
    title: "Summa",
    dataIndex: "amountCents",
    key: "amountCents",
    width: 220,
    align: "right",
    render: (v: number) => (
      <span style={{ whiteSpace: "nowrap" }}>{formatMoney(v)}</span>
    ),
  },
  {
    title: "Ulush %",
    dataIndex: "sharePercent",
    key: "sharePercent",
    width: 96,
    align: "right",
  },
];

export const reportsColumnsMerchant: ColumnsType<ReportMerchantRow> = [
  { title: "Merchant", dataIndex: "merchant", key: "merchant", ellipsis: true },
  { title: "Buyurtmalar", dataIndex: "orders", key: "orders", width: 110 },
  {
    title: "Daromad",
    dataIndex: "revenueCents",
    key: "revenueCents",
    render: (v: number) => formatMoney(v),
  },
  {
    title: "Qaytarishlar",
    dataIndex: "refundsCents",
    key: "refundsCents",
    render: (v: number) => formatMoney(v),
  },
];

export const reportsColumnsHourly: ColumnsType<ReportHourlyRow> = [
  {
    title: "Vaqt (UTC)",
    dataIndex: "hour",
    key: "hour",
    width: 220,
    render: (v: string) => new Date(v).toLocaleString(),
  },
  { title: "Hajm", dataIndex: "volume", key: "volume", width: 100 },
  {
    title: "Kechikish ms",
    dataIndex: "latencyMs",
    key: "latencyMs",
    width: 120,
  },
];
