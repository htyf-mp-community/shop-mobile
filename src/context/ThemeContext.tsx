import React, { createContext, useContext, useState } from "react";
import { Colors } from "../constants/styles";

import { Appearance } from "react-native";

interface ThemeContextType {
  theme: typeof Colors;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: Colors,
});

export default function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}

const THEMES = {
  dark: Colors,
  light: Colors,
};

export const ThemeContextProvider: React.FC = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(THEMES[colorScheme ?? "dark"]);

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
