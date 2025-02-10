import { type Language } from "@/locale/translations";
import { useStore } from '@nanostores/react';
import { language } from "@/stores/language";

interface LangProps {
  name: string
  label: Language
}

const langItems: LangProps[] = [
  { name: "ES", label: "es" },
  { name: "EN", label: "en" },
  { name: "PL", label: "pl" },
];

export function LanguageButtons () {
  const $language = useStore(language)
  const activeLanguage = 'bg-violet-300 hover:bg-violet-200 dark:bg-slate-600 dark:hover:bg-slate-700  rounded px-2 py-1 font-semibold text-base'
  const noActiveLanguage = 'rounded px-2 py-1 font-semibold text-base'

  function changeLanguage (label: Language) {
    language.set(label)
    localStorage.setItem('language', label)
    console.log(language.value)
  }

  return (
    <div className="flex gap-x-1">
      {
        langItems.map((item, index) => {

          return (
            <button key={index} onClick={() => changeLanguage(item.label)}>
              <div className={$language == item.label ? activeLanguage : noActiveLanguage}>
                <p className="pt-0.5 text-base font-semibold">{item.name}</p>
              </div>
            </button>
          );
        })
      }
    </div>
  )
}