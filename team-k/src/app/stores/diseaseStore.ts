import { create } from "zustand";

interface DiseaseData {
  // replace `any` with the actual type if known
  diseaseList: string[] | string | null;
  setDiseaseList: (data: string[] | string | null) => void;
}

export const useDiseaseStore = create<DiseaseData>((set) => ({
  diseaseList: null,
  setDiseaseList: (data) => set({ diseaseList: data }),
}));
