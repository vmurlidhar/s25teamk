"use client";
import "@/utils/i18n";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Home() {
  const {t} = useTranslation();

  return (
    <div>
        <h1>symp input page</h1>
        {t('welcomeMessage')}
    </div>
    
  );
}
