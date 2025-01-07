import { create } from 'zustand';
import { Language } from '../types';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'km',
  setLanguage: (language) => set({ language }),
}));