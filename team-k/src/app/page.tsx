"use client";
import "@/utils/i18n";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export default function Home() {
  const {t} = useTranslation();

  return (
    <div>
      <div onClick={() => i18next.changeLanguage('en')}>English</div>
      <button onClick={() => i18next.changeLanguage('es')}>Español</button>
      <div></div>
      {t('testRes')}
    </div>
  )
}
