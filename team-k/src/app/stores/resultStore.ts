import { create } from "zustand";
import { DiagnosisResult } from "../types/DiagnosisResult";

interface ResultState {
  result: DiagnosisResult | string | null;
  setResult: (data: DiagnosisResult | string | null) => void;
}

export const useResultStore = create<ResultState>((set) => ({
  result: null,
  setResult: (data) => set({ result: data }),
}));
