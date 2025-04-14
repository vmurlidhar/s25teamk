"use client";
import { useEffect, useState } from "react";
import "@/utils/i18n";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useDiseaseStore } from "../stores/diseaseStore";
import Image from "next/image";
import Link from "next/link";

export default function SympInput() {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const diseaseList = useDiseaseStore.getState().diseaseList;
  
    if (!diseaseList) {
      console.warn("No disease list found — user may have refreshed or landed directly.");
      // Optional: redirect back or show an error
      // router.push('/someFallbackPage');
    } else {
      // do something with diseaseList (or store it in local state)
      console.log("Disease list:", diseaseList);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    

    <div className="flex flex-col items-center min-h-screen p-6 sm:p-12 gap-10 font-[family-name:var(--font-geist-sans)]">
      <button onClick={() => router.push("/")}
        className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-base h-12 px-5">
        <Link href="/">{t("home")}</Link>
      </button>

      <p className="text-sm sm:text-xl font-bold text-center">{t('medicalAdviceWarning')}</p>
      <main className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center w-full max-w-4xl">

        {/* Left Column */}
        <div className="flex justify-center">
          <Image
            src="/danielle.png"
            alt="Doctor Danielle"
            width={180}
            height={38}
            priority
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4 items-center sm:items-start w-full">    
          
        </div>
      </main>
      <div className="flex flex-row gap-4">
      <div onMouseOverCapture={() => i18n.changeLanguage('en')} className="w-full sm:w-auto">
          <button onClick={() => i18n.changeLanguage("en")}>
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              English
            </a>
          </button>
        </div>

        <div onMouseOverCapture={() => i18n.changeLanguage('es')} className="w-full sm:w-auto">
          <button onClick={() => i18n.changeLanguage("es")}>
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
                Español
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
