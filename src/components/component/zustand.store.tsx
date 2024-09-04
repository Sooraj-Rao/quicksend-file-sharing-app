import { create } from "zustand";

type T_ZustandStore = {
  Ref: string;
  setRef: (Ref: string) => void;
};

export const useZustandStore = create<T_ZustandStore>((set) => ({
  Ref: "",
  setRef: (Ref) => set({ Ref }),
}));
