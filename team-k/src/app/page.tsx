"use client";
import { useEffect, useState } from "react";
import "@/utils/i18n";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-6 sm:p-20 gap-10 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl sm:text-7xl font-bold text-center w-full">{t('welcomeMessage')}</h1>
      <p className="text-sm sm:text-xl font-bold text-center">{t('privacyWarning')}</p>

      <main className="grid grid-cols-1 sm:grid-cols-2 gap-4 row-start-2 items-center w-full max-w-4xl">
        {/* Left Column */}
        <div className="flex justify-center sm:justify-start">
          <Image
            src="/danielle.png"
            alt="Doctor Danielle"
            width={180}
            height={38}
            priority
          />
        </div>
        <div className="flex flex-col gap-4 items-center justify-center min-w-[250px] sm:min-w-[350px] w-full">
          <h3 className="text-lg sm:text-2xl font-bold text-center">{t('pickLanguage')}</h3>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <div onMouseOverCapture={() => i18n.changeLanguage('en')} className="w-full sm:w-auto">
              <button onClick={() => i18n.changeLanguage("en")} className="w-full">
                <Link
                  href="/sympInput"
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
                >
                  English
                </Link>
              </button>
            </div>
            
            <div onMouseOverCapture={() => i18n.changeLanguage('es')} className="w-full sm:w-auto">
              <button onClick={() => i18n.changeLanguage("es")} className="w-full">
                <Link
                  href="/sympInput"
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
                >
                  Español
                </Link>
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
