import { create } from 'zustand';

interface ResultState {
  result: any;
  setResult: (data: any) => void;
}

export const useResultStore = create<ResultState>((set) => ({
  result: null,
  setResult: (data) => set({ result: data }),
}));
