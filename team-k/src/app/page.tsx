"use client";
import "@/utils/i18n";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Home() {
  const {t} = useTranslation();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      {/* Centered Heading */}
      <h1 className="text-7xl font-bold text-center w-full">{t('welcomeMessage')}</h1>

      <main className="grid grid-cols-2 gap-4 row-start-2 items-center">
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
        <div className="flex flex-col gap-4 items-center">
          <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>{t('pickLanguage')}</h3>

          <div className="flex flex-row gap-4">
            <div onMouseOverCapture={() => i18next.changeLanguage('en')}>
              <button>
                <a
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                  href="/sympInput.tsx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  English
                </a>
              </button>
            </div>
            
            <div onMouseOverCapture={() => i18next.changeLanguage('es')}>
              <button>
                <a
                  className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                  href="/sympInput.tsx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Español
                </a>
              </button>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
