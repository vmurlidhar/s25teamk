import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcomeMessage: "Welcome to NeuroChat!",
      pickLanguage: "Pick a language to begin:",
      home: "Return to start page",
      enterSymptoms: "Enter your symptoms",
      characters: "characters",
      submit: "Submit symptoms"
    }
  },
  es: {
    translation: {
      welcomeMessage: "¡Bienvenidos a NeuroChat!",
      pickLanguage: "Elige un idioma para empezar:",
      home: "Volver a la página de inicio",
      enterSymptoms: "Ingresa tus síntomas",
      characters: "caracteres",
      submit: "Enviar síntomas"
    }
  }
};

// Read language from localStorage (if available)
const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") || "en" : "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage, 
    interpolation: {
      escapeValue: false
    }
  });

// Function to change and persist language
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  if (typeof window !== "undefined") {
    localStorage.setItem("language", lng);
  }
};

export default i18n;
