import { create } from "zustand";

export const useThemeStore = create((set) => ({
  activeTheme: {},
  setActiveTheme: (theme) => {
    set({activeTheme: theme})
  },
}));
