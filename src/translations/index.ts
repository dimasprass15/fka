import { idTranslations } from "./id";
import { arTranslations } from "./ar";
import { enTranslations } from "./en";

export const translations = {
  ID: idTranslations,
  AR: arTranslations,
  EN: enTranslations,
};

export type TranslationKey = keyof typeof translations.ID;
export type LanguageCode = keyof typeof translations;
