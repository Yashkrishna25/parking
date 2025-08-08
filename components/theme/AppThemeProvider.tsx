import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIMARY_BLUE = '#0039a6';

const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: PRIMARY_BLUE,
    secondary: '#ffffff',
    background: '#f5f7fb',
    surface: '#ffffff',
  },
  roundness: 16,
};

const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: PRIMARY_BLUE,
    secondary: '#1c1f24',
    background: '#0f1217',
    surface: '#151922',
  },
  roundness: 16,
};

interface ThemeContextValue {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  paperTheme: MD3Theme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('theme');
      if (stored) setIsDarkTheme(stored === 'dark');
    })();
  }, []);

  const toggleTheme = async () => {
    const next = !isDarkTheme;
    setIsDarkTheme(next);
    await AsyncStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const paperTheme = useMemo(() => (isDarkTheme ? darkTheme : lightTheme), [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, paperTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within AppThemeProvider');
  return ctx;
};

export const neumorphicShadow = (isDark: boolean) => ({
  shadowColor: isDark ? '#000' : '#5a6c85',
  shadowOpacity: 0.15,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 6 },
  elevation: 6,
});