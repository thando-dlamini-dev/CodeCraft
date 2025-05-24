import { create } from 'zustand';

const useThemeStore = create((set) => ({
  isDarkMode: true,
  
  toggleTheme: () => {
    // Update state
    set((state) => ({ isDarkMode: !state.isDarkMode })); 
  },
    
}));

export default useThemeStore;