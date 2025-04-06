// "use client";
// import { useEffect, useState } from "react";
// import "@/utils/i18n";
// import { useTranslation } from "react-i18next";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// export default function SympInput() {
//   const { t, i18n } = useTranslation();
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();
//   const [text, setText] = useState("");
//   const maxChars = 80;
//   const [result, setResult] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (result !== null) {
//       router.push(`/sympQuestion?output=${encodeURIComponent(JSON.stringify(result))}`);
//     }
//   }, [result, router]);

//   if (!isClient) return null;
  

//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     if (e.target.value.length <= maxChars) {
//       setText(e.target.value);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center min-h-screen p-6 sm:p-12 gap-10 font-[family-name:var(--font-geist-sans)]">
//       <button onClick={() => router.push("/")}
//         className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-base h-12 px-5">
//         <Link href="/">{t("home")}</Link>
//       </button>

//       <main className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center w-full max-w-4xl">
//         {/* Left Column */}
//         <div className="flex justify-center">
//           <Image
//             src="/danielle.png"
//             alt="Doctor Danielle"
//             width={180}
//             height={38}
//             priority
//           />
//         </div>

//         {/* Right Column */}
//         <div className="flex flex-col gap-4 items-center sm:items-start w-full">
//           <h3 className="text-xl sm:text-2xl font-bold">{t("enterSymptoms")}</h3>

//           <textarea
//             value={text}
//             onChange={handleChange}
//             maxLength={maxChars}
//             placeholder={t("typeHere")}
//             className="border rounded-lg p-3 w-full sm:w-80 min-h-[150px] resize-y text-lg text-black"
//           />
//           <p className="mt-2 text-gray-500 text-sm">
//             {text.length}/{maxChars} {t("characters")}
//           </p>

//           {/* <button>
//             <Link
//               href=""
//               className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             >
//               {t('submit')}
//             </Link>
//           </button> */}
//           <button onClick={async () => { {/* Submit user input button */}
//             setLoading(true);
//             setResult(null);

//             try {
//               const res = await fetch("/api/diagnose", {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ input: text }),
//               });

//               const data = await res.json();
//               console.log(data)

//               if (data.diseases && data.symptoms) {
//                 setResult(data); 
//                 // if (result != null) {
//                 //   router.push(`/sympQuestion?output=${encodeURIComponent(result)}`);
//                 // }
//               } else {
//                 setResult("Error: " + (data.error || "Unknown response format."));
//               }
              
//             } catch (err) {
//               setResult("Error contacting the server.");
//               console.log(err);
//             } finally {
//               setLoading(false);
//             }
//             }}>
//             <span className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
//               {loading ? "Loading..." : t('submit')}
//             </span>
//           </button>
//         </div>
//       </main>
//       <div className="flex flex-row gap-4">
//         <div onMouseOverCapture={() => i18n.changeLanguage('en')} className="w-full sm:w-auto">
//           <button onClick={() => i18n.changeLanguage("en")}>
//             <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="/sympInput">
//               English
//             </a>
//           </button>
//         </div>

//         <div onMouseOverCapture={() => i18n.changeLanguage('es')} className="w-full sm:w-auto">
//           <button onClick={() => i18n.changeLanguage("es")}>
//             <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//               href="/sympInput">
//                 Español
//             </a>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import "@/utils/i18n";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SympInput() {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string | null>("");
  const [symptomAnswers, setSymptomAnswers] = useState<{ symptom: string; answer: boolean }[]>([]);
  const [currentSymptomIndex, setCurrentSymptomIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [diseaseList, setDiseaseList] = useState<any | null>(null);

  const searchParams = useSearchParams();
  useEffect(() => {
    const output = searchParams.get("output");

    if (output) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(output));
        if (parsedData.symptoms) {
          setSymptoms(parsedData.symptoms);
          setUserInput(parsedData.userInput);
          sessionStorage.setItem("diagnosisResult", JSON.stringify(parsedData)); // Store in sessionStorage
        }
      } catch (error) {
        console.error("Error parsing output:", error);
      }
    } else {
      const storedData = sessionStorage.getItem("diagnosisResult");
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          if (parsedData.symptoms) {
            setSymptoms(parsedData.symptoms);
          }
        } catch (error) {
          console.error("Error parsing session storage data:", error);
        }
      }
    }
  }, [searchParams]);

  const handleAnswer = (answer: boolean) => {
    const symptom = symptoms[currentSymptomIndex];

    // Store the user's answer
    setSymptomAnswers([...symptomAnswers, { symptom, answer }]);

    // Move to the next symptom
    if (currentSymptomIndex < symptoms.length - 1) {
      setCurrentSymptomIndex(currentSymptomIndex + 1);
    } else {
      // All symptoms answered
      console.log("Final Answers:", symptomAnswers);
      setCurrentSymptomIndex(symptoms.length);
    }
  };

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
          {symptoms.length > 0 && currentSymptomIndex < symptoms.length ? (
            <div>
              {/* Show the current symptom */}
              <h3 className="text-xl sm:text-2xl font-bold">{t(symptoms[currentSymptomIndex])}</h3>

              {/* Yes / No buttons */}
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleAnswer(true)}
                  className="px-6 py-2 bg-green-500 text-white rounded-md"
                >
                  {t("yes")}
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="px-6 py-2 bg-red-500 text-white rounded-md"
                >
                  {t("no")}
                </button>
              </div>
            </div>
          ) : (
            // <h3 className="text-xl sm:text-2xl font-bold">End of array.</h3>
            <button onClick={async () => { {/* Submit user input button */}
              setLoading(true);
              setDiseaseList(null);

              try {
                const res = await fetch("/api/final_diagnose", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ input: {symptomAnswers, userInput} }),
                });

                const data = await res.json();
                console.log(data)
              } catch (err) {
                setDiseaseList("Error contacting the server.");
                console.log(err);
              } finally {
                setLoading(false);
              }
              }}>
              <span className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
                {loading ? "Loading..." : t('submit')}
              </span>
          </button>

          )}
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
