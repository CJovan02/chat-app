import { create } from 'zustand';

type Theme = 'light' | 'dark' | 'system';

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const STORAGE_KEY = 'vite-ui-theme';

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (localStorage.getItem(STORAGE_KEY) as Theme) ?? 'system',
  setTheme: (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    set({ theme });
  },
}));
