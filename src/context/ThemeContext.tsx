import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/styles";

interface ThemeContextType {
  theme: typeof Colors;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: Colors,
});

const THEMES = {
  dark: Colors,
  light: {
    ...Colors,
    text: "#000",
    primary: "#fff",
  },
};

export const ThemeContextProvider: React.FC = ({ children }) => {
  const colorScheme = useColorScheme() as "light" | "dark";

  return (
    <ThemeContext.Provider value={{ theme: THEMES[colorScheme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useColorTheme(): typeof Colors {
  const { theme } = useContext(ThemeContext);
  return theme;
}
