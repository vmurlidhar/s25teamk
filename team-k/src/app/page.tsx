"use client";
import { useEffect, useState } from "react";
import "@/utils/i18n";
import { useTranslation } from "react-i18next"; // Removed i18next import since it's not directly used
import Image from "next/image";
import Link from "next/link";  // Import Link from next/link

export default function Home() {
  const { t, i18n } = useTranslation(); // i18n is used here, so no need to remove it
  const [isClient, setIsClient] = useState(false);

  // Ensure we are on the client before rendering translations
  useEffect(() => { setIsClient(true); }, []);

  // Prevents mismatch during hydration
  if (!isClient) return null;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      <h1 className="text-7xl font-bold text-center w-full">{t('welcomeMessage')}</h1>

      <main className="grid grid-cols-2 gap-4 row-start-2 items-center">
        {/* Left Column */}
        <div className="flex justify-start">
          <Image
            src="/danielle.png"
            alt="Doctor Danielle"
            width={180}
            height={38}
            priority
          />
        </div>
        
        {/* Right Column */}
        <div className="flex flex-col gap-4 items-center justify-start min-w-[350px]">
          <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>{t('pickLanguage')}</h3>

          <div className="flex flex-row gap-4">
            <div onMouseOverCapture={() => i18n.changeLanguage('en')}>
              <button onClick={() => i18n.changeLanguage("en")}>
                <Link
                  href="/sympInput"
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                >
                  English
                </Link>
              </button>
            </div>
            
            <div onMouseOverCapture={() => i18n.changeLanguage('es')}>
              <button onClick={() => i18n.changeLanguage("es")}>
                <Link
                  href="/sympInput"
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
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
