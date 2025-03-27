"use client";
import { useEffect, useState } from "react";
import "@/utils/i18n";
import { useTranslation } from "react-i18next"; // Removed i18next import
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link

export default function SympInput() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false); // State to track client status
  const router = useRouter(); // Next.js router hook
  const [text, setText] = useState(""); // State to track input in text box
  const maxChars = 80;
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Ensure we are on the client before rendering translations
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevents mismatch during hydration
  if (!isClient) return null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxChars) {
      setText(e.target.value);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      <button onClick={() => router.push("/")}>
        <Link
          href="/"
          className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          {t('home')}
        </Link>
      </button>

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
          <h3 style={{ fontSize: "24px", fontWeight: "bold" }}>{t('enterSymptoms')}</h3>

          <textarea
            value={text}
            onChange={handleChange}
            maxLength={maxChars}
            placeholder="Type here..."
            className="border rounded-lg p-2 w-80 min-h-[150px] resize-y text-lg text-black"
          />
          <p className="mt-2 text-gray-500">
            {text.length}/{maxChars} {t('characters')}
          </p>

          {/* <button>
            <Link
              href=""
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              {t('submit')}
            </Link>
          </button> */}
          <button onClick={async () => { {/* Submit user input button */}
            setLoading(true);
            setResult(null);

            try {
              const res = await fetch("/api/diagnose", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ input: text }),
              });

              const data = await res.json();
              console.log(data)

              if (data.output) {
                setResult(data.output); 
              } else if (data.response?.output) {
                setResult(data.response.output); 
              } else {
                setResult("Error: " + (data.error || "Unknown response format."));
              }
            } catch (err) {
              setResult("Error contacting the server.");
              console.log(err);
            } finally {
              setLoading(false);
            }
            }}>
            <span className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              {loading ? "Loading..." : t('submit')}
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
