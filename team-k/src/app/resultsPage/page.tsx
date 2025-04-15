"use client";
import { useEffect, useState } from "react";
import "@/utils/i18n";
import { Trans, useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useDiseaseStore } from "../stores/diseaseStore";
// import Image from "next/image";
import Link from "next/link";

export default function SympInput() {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [diseaseList, setDiseaseList] = useState<string | string[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    const diseaseList = useDiseaseStore.getState().diseaseList;
  
    if (!diseaseList) {
      console.warn("No disease list found — user may have refreshed or landed directly.");
      // Optional: redirect back or show an error
      // router.push('/someFallbackPage');

      setDiseaseList([]);
    } else {
      // do something with diseaseList (or store it in local state)
      console.log("Disease list:", diseaseList);
      setDiseaseList(diseaseList);
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
      <main className="grid grid-cols-1 sm:grid-cols-1 gap-6 items-center w-full max-w-4xl">

      {diseaseList ? (
        Object.values(diseaseList).map((diseaseKey) => {
          if (!diseaseKey) return null;

          return (
            <div key={diseaseKey as string} className="p-4 border rounded-md shadow-md w-full">
              <h3 className="text-lg sm:text-xl font-bold">
                {t(`${diseaseKey}.name`, { defaultValue: "Unknown Disease" })}
              </h3>
              <br />
              <p className="text-sm sm:text-base">
                <strong>{t("symptoms")}:</strong>{" "}
                <Trans
                  i18nKey={`${diseaseKey}.symptoms`}
                  defaults="<ul><li>No symptoms available</li></ul>"
                  components={{ ul: <ul className="ml-4 list-disc" />, li: <li /> }}
                />
              </p>
              <br />
              <p className="text-sm sm:text-base">
                <strong>{t("treatment")}:</strong>{" "}
                {t(`${diseaseKey}.treatment`, { defaultValue: "No treatment available" })}
              </p>
            </div>
          );
        })
      ) : (
        <p>{t("noDiseasesFound")}</p>
      )}


        
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
