import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./locales"; // the translations

// Read language from localStorage (if available)
const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") || "en" : "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, 
    interpolation: {
      escapeValue: false
    },
    fallbackLng: 'en'
  });

// Function to change and persist language
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  if (typeof window !== "undefined") {
    localStorage.setItem("language", lng);
  }
};

export default i18n;
