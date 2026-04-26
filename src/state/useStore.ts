import { create } from 'zustand';
import {
  Medication,
  Vitals,
  Wearable,
  mockHealthScore,
  mockMedications,
  mockVitals,
  mockWearables,
} from '../data/mocks';

type Store = {
  healthScore: number;
  vitals: Vitals;
  wearables: Wearable[];
  medications: Medication[];

  selectedMood: string | null;
  setMood: (id: string) => void;

  setHealthScore: (n: number) => void;
};

export const useStore = create<Store>((set) => ({
  healthScore: mockHealthScore,
  vitals: mockVitals,
  wearables: mockWearables,
  medications: mockMedications,

  selectedMood: null,
  setMood: (id) => set({ selectedMood: id }),

  setHealthScore: (n) => set({ healthScore: n }),
}));
