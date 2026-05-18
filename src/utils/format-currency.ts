import type { UiLocale } from "@/constants/ui-languages";
import { useAuthStore } from "@/hooks/auth-store";
import { useUiPreferencesStore } from "@/hooks/ui-preferences-store";

function intlLocaleForUi(ui: UiLocale): string {
  if (ui === "uz") return "uz-UZ";
  if (ui === "ru") return "ru-RU";
  return "en-US";
}

/** Ba’zi locale’lar `Intl` da `$ 71` kabi belgi va raqam orasiga bo‘sh joy qo‘shadi — olib tashlash. */
export function normalizeCurrencySpacing(formatted: string): string {
  return formatted.replace(
    /^(-?)(\p{Sc})[\s\u00A0\u202F\u2009]+(?=\d)/u,
    "$1$2",
  );
}

export type FormatCurrencyMinorUnitsOptions = {
  currency?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
};

export function formatCurrencyMinorUnits(
  minorUnits: number,
  options?: FormatCurrencyMinorUnitsOptions,
): string {
  const currency =
    options?.currency ??
    useAuthStore.getState().user?.preferredCurrency ??
    useUiPreferencesStore.getState().currency ??
    "USD";
  const uiLocale = useUiPreferencesStore.getState().locale;
  const maximumFractionDigits = options?.maximumFractionDigits ?? 0;
  const minimumFractionDigits = options?.minimumFractionDigits ?? 0;
  try {
    const raw = new Intl.NumberFormat(intlLocaleForUi(uiLocale), {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits,
      minimumFractionDigits,
    }).format(minorUnits / 100);
    return normalizeCurrencySpacing(raw);
  } catch {
    const fallback = `${(minorUnits / 100).toFixed(maximumFractionDigits)} ${currency}`;
    return normalizeCurrencySpacing(fallback);
  }
}
