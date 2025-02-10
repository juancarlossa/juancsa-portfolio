import { language } from "@/stores/language"; // Importa el store de idioma
import { useStore } from "@nanostores/react";

const languages = ["es", "en", "pl"] as const;
export type Language = 'en' | 'pl' | 'es'

export const translationsData = {
  h1: {
    es: "Bienvenido a mi portfolio",
    en: "I'm Juan, and this is my portfolio",
    pl: "Witaj w moim portfolio",
  },
  description: {
    es: "+4 años de experiencia como desarrollador de React. Ingeniero de software viviendo en Polonia. Especializado en Desarrollo Web y Unity. ¡Bienvenido!",
    en: "+4 years of experience as React developer. Spanish IT Engineer living in Poland. Specialized in Web & Unity Development. Feel free to watch my projects!",
    pl: "+4 lata doświadczenia jak programista Reacta. Hiszpański inżynier IT mieszkający w Polsce. Specjalizuje się w Web & Unity Development. Zapraszam do obejrzenia moich projektów!"
  },
  navItems: {
    es: ["Inicio", "Proyectos", "CV"],
    en: ["Home", "Projects", "Resume"],
    pl: ["Start", "Projekty", "CV"],
  },
} as const


export const translations = Object.fromEntries(
  languages.map((lang) => [
    lang,
    Object.fromEntries(Object.entries(translationsData).map(([key, value]) => [key, value[lang]])),
  ])
) as Record<typeof languages[number], Record<string, string>>;

export const translate = (key: string, index?: number): string => {
  const currentLanguage = language.get() as Language // Obtiene el idioma actual del store
  const langTranslations = translations[currentLanguage][key];

    if (Array.isArray(langTranslations) && index !== undefined) {
      return langTranslations[index] || key; // Devuelve la clave si el índice no existe
    }

    return langTranslations || key;
};

  export const t = (key: string, index?: number): string => {
    const currentLanguage = language.get() as Language
    const translation = translations[currentLanguage][key];

    // Si es un array, devolver el índice solicitado
    if (Array.isArray(translation) && index !== undefined) {
      return translation[index] || key; // Devuelve la clave si el índice no existe
    }

    return translation || key;
  }

export const useTranslations = () => {
  useStore(language); // Suscribe el componente a languageStore para re-renderizar al cambiar el idioma
  return translate; // Devuelve la función de traducción
};