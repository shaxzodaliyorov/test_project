export function formatMoney(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function reportsShowTotal() {
  return (total: number, range: [number, number]) =>
    total === 0 ? "0 ta" : `${range[0]}-${range[1]} / ${total}`;
}
