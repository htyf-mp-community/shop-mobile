import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/styles";
import { notUndefined } from "../functions/typecheckers";

type Variant = "light" | "dark";

interface ThemeContextType {
  theme: typeof Colors;
  current: Variant;
  onThemeChange: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: Colors,
  current: "dark",
  onThemeChange: () => {},
});

const THEMES = {
  dark: Colors,
  light: {
    ...Colors,
    text: "#000",
    primary: "#fff",
    primary100: "#B1BDC5",
  },
};

const KEY = "SHOP_CURRENT_THEME";

export const ThemeContextProvider: React.FC = ({ children }) => {
  const colorScheme = useColorScheme()! as Variant;
  const [{ theme, current }, setTheme] = useState<{
    theme: typeof THEMES.dark;
    current: Variant;
  }>({
    //theme: THEMES[colorScheme],
    theme: THEMES["light"],
    current: "light",
  });

  useEffect(() => {
    (async () => {
      try {
        const storage = await AsyncStorageLib.getItem(KEY)!;
        if (storage !== null && notUndefined(storage)) {
          const { theme } = JSON.parse(storage!) as { theme: Variant };
          setTheme({
            current: theme,
            theme: THEMES[theme],
          });
        }
      } catch (error) {}
    })();
  }, []);

  async function onSaveTheme(theme: string) {
    try {
      await AsyncStorageLib.setItem(KEY, JSON.stringify({ theme }));
    } catch (error) {}
  }

  function onThemeChange() {
    setTheme(({ current }) => {
      if (current === "dark") {
        onSaveTheme("light");
        return { current: "light", theme: THEMES["light"] };
      } else {
        onSaveTheme("dark");
        return { current: "dark", theme: THEMES["dark"] };
      }
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, current, onThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useColorTheme(): ThemeContextType {
  return useContext(ThemeContext);
}
