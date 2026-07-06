import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      isSidebarOpen: false,
      setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    }),
    {
      name: 'campus-hub-preferences',
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
    }
  )
);