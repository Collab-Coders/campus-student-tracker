import { create } from 'zustand';

interface StoreState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  isSidebarOpen: false,
  setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));