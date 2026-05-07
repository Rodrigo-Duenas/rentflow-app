import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const LANG: string = import.meta.env.VITE_LANG ?? "es-ES";

type AvailableLanguages = "en" | "es-ES" | "es-CO" | "es-MX";

type TranslationModule = Record<string, unknown>;

type TranslationsMap = Record<
  AvailableLanguages,
  () => Promise<{ default: TranslationModule } | TranslationModule>
>;

const translationsMap: TranslationsMap = {
  en: () => import("@assets/i18n/en.json"),
  "es-ES": () => import("@assets/i18n/es-ES.json"),
  "es-CO": () => import("@assets/i18n/es-CO.json"),
  "es-MX": () => import("@assets/i18n/es-MX.json"),
};

const resourceLoader =
  translationsMap[LANG as AvailableLanguages] ?? translationsMap["es-ES"];

const loadedTranslation = await resourceLoader();
const translation: TranslationModule =
  loadedTranslation &&
  typeof loadedTranslation === "object" &&
  "default" in loadedTranslation
    ? (loadedTranslation as { default: TranslationModule }).default
    : (loadedTranslation as TranslationModule);

const resources = {
  [LANG]: {
    translation,
  },
};

function syncDocumentLang(lng: string) {
  document.documentElement.lang = lng;
}

await i18n.use(initReactI18next).init({
  debug: import.meta.env.DEV,
  lng: LANG,
  fallbackLng: "es-ES",
  interpolation: {
    escapeValue: false,
  },
  resources,
});

syncDocumentLang(i18n.language);
i18n.on("languageChanged", syncDocumentLang);

export default i18n;
