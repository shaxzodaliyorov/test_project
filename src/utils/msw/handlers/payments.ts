import { http, HttpResponse } from "msw";
import { API_ERROR_KEYS } from "@/constants/api-error-keys";
import type { CurrencyCode } from "@/constants/currencies";
import type { Payment, PaymentMethod, PaymentStatus } from "@/types/payment";
import { PERMISSIONS } from "@/constants/permissions";
import { convertUsdCentsToDisplayCurrency } from "@/utils/msw/convert-usd-cents-to-display-currency";
import { getUserFromAuthHeader } from "@/utils/msw/handlers/auth";
import { mswLatency } from "@/utils/msw/msw-latency";

function toUsdCents(p: Payment): {
  amountUsdCents: number;
  feeUsdCents: number;
} {
  if (p.currency === "EUR") {
    return {
      amountUsdCents: Math.round(p.amountCents * 1.08),
      feeUsdCents: Math.round(p.feeCents * 1.08),
    };
  }
  return { amountUsdCents: p.amountCents, feeUsdCents: p.feeCents };
}

function adaptPaymentToPreferredCurrency(
  p: Payment,
  preferred: CurrencyCode,
): Payment {
  const { amountUsdCents, feeUsdCents } = toUsdCents(p);
  if (preferred === "USD") {
    return {
      ...p,
      amountCents: amountUsdCents,
      feeCents: feeUsdCents,
      currency: "USD",
    };
  }
  return {
    ...p,
    amountCents: convertUsdCentsToDisplayCurrency(amountUsdCents, preferred),
    feeCents: convertUsdCentsToDisplayCurrency(feeUsdCents, preferred),
    currency: preferred,
  };
}

function parseIntParam(value: string | null, fallback: number): number {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isFinite(n) ? n : fallback;
}

const STATUSES: PaymentStatus[] = ["pending", "paid", "failed"];
const METHODS: PaymentMethod[] = ["card", "bank_transfer", "wallet"];
const CATEGORIES = [
  "Subscription",
  "Hardware",
  "SaaS",
  "Support",
  "Consulting",
  "Marketplace",
  "Logistics",
  "Advertising",
  "Travel",
  "Education",
] as const;
const MERCHANTS = [
  "Acme Cloud",
  "Globex Retail",
  "Initech Billing",
  "Umbrella Labs",
  "Stark Industries EU",
  "Wayne Logistics",
  "Hooli Payments",
  "Soylent Goods",
] as const;

function buildPayments(): Payment[] {
  const out: Payment[] = [];
  const n = 88;
  for (let i = 0; i < n; i += 1) {
    const status = STATUSES[i % STATUSES.length];
    const method = METHODS[i % METHODS.length];
    const category = CATEGORIES[i % CATEGORIES.length];
    const merchantName = MERCHANTS[i % MERCHANTS.length];
    const amountCents = 4999 + ((i * 1847 + 331) % 480_000);
    const feeCents = Math.round(amountCents * (0.012 + (i % 7) * 0.0015));
    const currency = "USD";
    const day = 1 + (i % 28);
    const month = (i % 12) + 1;
    const year = 2024 + (i % 2);
    const createdAt = new Date(
      Date.UTC(year, month - 1, day, 8 + (i % 10), (i * 17) % 60, 0),
    ).toISOString();
    const settledAt =
      status === "paid"
        ? new Date(
            new Date(createdAt).getTime() + (15 + (i % 120)) * 60 * 1000,
          ).toISOString()
        : null;
    const id = `pay-${String(i + 1).padStart(4, "0")}`;
    const customerEmail = `customer${(i % 240) + 1}@demo.mail`;
    const externalRef = `EXT-${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}-${String(i + 1).padStart(5, "0")}`;
    const city = [
      "Tashkent",
      "Samarkand",
      "Bukhara",
      "London",
      "Berlin",
      "Dubai",
    ][i % 6];
    const description = `${category} — ${merchantName} (#${i + 1}, ${method})`;
    out.push({
      id,
      amountCents,
      feeCents,
      currency,
      status,
      method,
      category,
      merchantName,
      customerEmail,
      externalRef,
      city,
      description,
      createdAt,
      settledAt,
    });
  }
  return out;
}

const ALL_PAYMENTS = buildPayments();

export const paymentsHandlers = [
  http.get("/api/payments", async ({ request }) => {
    await mswLatency();
    const user = getUserFromAuthHeader(request.headers.get("authorization"));
    if (!user) {
      return HttpResponse.json({ errorKey: API_ERROR_KEYS.HTTP_UNAUTHORIZED }, { status: 401 });
    }
    if (!user.permissions.includes(PERMISSIONS.PAYMENTS_READ)) {
      return HttpResponse.json({ errorKey: API_ERROR_KEYS.HTTP_FORBIDDEN }, { status: 403 });
    }
    const url = new URL(request.url);
    const pageRaw = Math.max(1, parseIntParam(url.searchParams.get("page"), 1));
    const pageSize = Math.min(
      100,
      Math.max(1, parseIntParam(url.searchParams.get("pageSize"), 10)),
    );
    const statusFilter = url.searchParams.get("status")?.trim().toLowerCase();
    const q = (
      url.searchParams.get("search") ??
      url.searchParams.get("q") ??
      ""
    )
      .trim()
      .toLowerCase();

    let filtered = [...ALL_PAYMENTS];
    if (statusFilter && STATUSES.includes(statusFilter as PaymentStatus)) {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }
    if (q) {
      filtered = filtered.filter(
        (p) =>
          p.id.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.merchantName.toLowerCase().includes(q) ||
          p.customerEmail.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.externalRef.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.method.toLowerCase().includes(q) ||
          p.status.toLowerCase().includes(q),
      );
    }
    const total = filtered.length;
    const maxPage = Math.max(1, Math.ceil(total / pageSize) || 1);
    const page = Math.min(pageRaw, maxPage);
    const start = Math.max(0, (page - 1) * pageSize);
    const preferred = user.preferredCurrency;
    const items = filtered
      .slice(start, start + pageSize)
      .map((p) => adaptPaymentToPreferredCurrency(p, preferred));
    return HttpResponse.json({ items, total, page, pageSize });
  }),
];
