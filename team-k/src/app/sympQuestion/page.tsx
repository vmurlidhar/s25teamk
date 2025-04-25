"use client";
import { useEffect, useState } from "react";
import "@/utils/i18n";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useResultStore } from "../stores/resultStore";
import { useDiseaseStore } from "../stores/diseaseStore";
import Image from "next/image";
import Link from "next/link";
import { DiagnosisResult } from "../types/DiagnosisResult";

export default function SympInput() {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string | null>("");
  const [symptomAnswers, setSymptomAnswers] = useState<
    { symptom: string; answer: boolean }[]
  >([]);
  const [currentSymptomIndex, setCurrentSymptomIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [diseaseList, setDiseaseList] = useState<string[] | string | null>(
    null
  );
  function isDiagnosisResult(obj: unknown): obj is DiagnosisResult {
    return (
      typeof obj === "object" &&
      obj !== null &&
      "symptoms" in obj &&
      Array.isArray((obj as DiagnosisResult).symptoms) &&
      "userInput" in obj &&
      typeof (obj as DiagnosisResult).userInput === "string"
    );
  }

  useEffect(() => {
    const storeData = useResultStore.getState().result;

    if (isDiagnosisResult(storeData)) {
      if (storeData?.symptoms) {
        console.log("Unfiltered:" + storeData.symptoms);

        const validSymptoms = storeData.symptoms.filter(
          (symptom) => t(symptom, { defaultValue: "" }) !== ""
        );
        setSymptoms(validSymptoms);
        setUserInput(storeData.userInput);
        console.log("Filtered:" + symptoms);
      } else {
        console.warn("No result found in store. Did user land here directly?");
        // Optionally redirect or show a fallback
      }
    }
  }, [t]);

  // useEffect(() => {
  //   if (diseaseList !== null) {
  //     router.push(`/resultsPage?output=${encodeURIComponent(JSON.stringify(diseaseList))}`);
  //   }
  // }, [diseaseList, router]);

  useEffect(() => {
    if (diseaseList !== null) {
      useDiseaseStore.getState().setDiseaseList(diseaseList);
      router.push("/resultsPage");
    }
  }, [diseaseList, router]);

  const handleAnswer = async (answer: boolean) => {
    const symptom = symptoms[currentSymptomIndex];
    const newAnswers = [...symptomAnswers, { symptom, answer }];
    setSymptomAnswers(newAnswers);

    if (currentSymptomIndex < symptoms.length - 1) {
      setCurrentSymptomIndex(currentSymptomIndex + 1);
    } else {
      // Last question answered, make diagnosis request
      setLoading(true);
      try {
        const res = await fetch("/api/final_diagnose", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: JSON.stringify({ symptomAnswers: newAnswers, userInput }),
          }),
        });

        const data = await res.json();
        setDiseaseList(data); // this will trigger redirect via the useEffect
      } catch (err) {
        setDiseaseList("Error contacting the server.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-col items-center min-h-screen p-6 sm:p-12 gap-10 font-[family-name:var(--font-geist-sans)]">
      <button
        onClick={() => router.push("/")}
        className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-base h-12 px-5"
      >
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
            <div className="flex flex-col items-center sm:items-start gap-4 w-full">
              <h3 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
                {t(symptoms[currentSymptomIndex])}
              </h3>
              <div className="mt-4 flex gap-4 justify-center sm:justify-start">
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
          ) : loading ? (
            <div className="flex flex-col items-center justify-center gap-4 mt-6">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-white" />
              <p className="text-lg text-white">
                {t("loading", { defaultValue: "Loading..." })}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-xl sm:text-2xl font-bold text-center">
                {t("sorryNoSymptoms")}
              </h3>
            </div>
          )}
        </div>
      </main>
      <div className="flex flex-row gap-4">
        <div
          onMouseOverCapture={() => i18n.changeLanguage("en")}
          className="w-full sm:w-auto"
        >
          <button onClick={() => i18n.changeLanguage("en")}>
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              English
            </a>
          </button>
        </div>

        <div
          onMouseOverCapture={() => i18n.changeLanguage("es")}
          className="w-full sm:w-auto"
        >
          <button onClick={() => i18n.changeLanguage("es")}>
            <a className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Español
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
