"use client";
import { useEffect, useState } from "react";
import "@/utils/i18n";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "@/utils/i18n";
import Image from "next/image";

export default function SympInput() {
  const {t} = useTranslation();
  const [isClient, setIsClient] = useState(false);

  // Ensure we are on the client before rendering translations
  useEffect(() => {setIsClient(true); }, []);

  // Prevents mismatch during hydration
  if (!isClient) return null;

  return (
    <div>
        <h1>symp input page</h1>
        {t('welcomeMessage')}
    </div>
    
  );
}
