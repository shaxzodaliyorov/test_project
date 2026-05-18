import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "@/locales/en";
import { ru } from "@/locales/ru";
import { uz } from "@/locales/uz";
import { resolveInitialUiLocale } from "@/utils/resolve-initial-ui-locale";

const defaultNS = "common" as const;

const namespaces = [
  "common",
  "nav",
  "settings",
  "auth",
  "dashboard",
  "users",
  "payments",
  "reports",
  "validation",
  "errors",
] as const;

void i18n.use(initReactI18next).init({
  resources: {
    en,
    ru,
    uz,
  },
  lng: resolveInitialUiLocale(),
  fallbackLng: "uz",
  defaultNS,
  ns: [...namespaces],
  interpolation: { escapeValue: false },
});

export default i18n;
