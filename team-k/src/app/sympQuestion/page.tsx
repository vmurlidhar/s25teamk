"use client";
import { useEffect, useState } from "react";
import "@/utils/i18n";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SympInput() {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [text, setText] = useState("");
  const maxChars = 80;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setText(e.target.value);
    }
  };

  return (
    

    <div className="flex flex-col items-center min-h-screen p-6 sm:p-12 gap-10 font-[family-name:var(--font-geist-sans)]">
      <button onClick={() => router.push("/")}
        className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-base h-12 px-5">
        <Link href="/">{t("home")}</Link>
      </button>

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
          <h3 className="text-xl sm:text-2xl font-bold">{t("enterSymptoms")}</h3>

          <textarea
            value={text}
            onChange={handleChange}
            maxLength={maxChars}
            placeholder="Type here..."
            className="border rounded-lg p-3 w-full sm:w-80 min-h-[150px] resize-y text-lg text-black"
          />
          <p className="mt-2 text-gray-500 text-sm">
            {text.length}/{maxChars} {t("characters")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center sm:justify-start">
            <button onClick={() => i18n.changeLanguage("en")}
              className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-base h-12 px-5 w-full sm:w-auto">
              <Link href="/sympInput">I'm hereeeeeeeeeeee</Link>
            </button>
            
            <button onClick={() => i18n.changeLanguage("es")}
              className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-base h-12 px-5 w-full sm:w-auto">
              <Link href="/sympInput">Español</Link>
            </button>
          </div>

          <button className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-base h-12 px-5 w-full sm:w-auto">
            <Link href="">{t("submit")}</Link>
          </button>
        </div>
      </main>
      <div className="flex flex-row gap-4">
        <button onClick={() => i18n.changeLanguage("en")}>
          <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          href="/sympInput">
            English
          </a>
        </button>

        <button onClick={() => i18n.changeLanguage("es")}>
          <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/sympInput">
              Español
          </a>
        </button>
      </div>
    </div>
  );
}
