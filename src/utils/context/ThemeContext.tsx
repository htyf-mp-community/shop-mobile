import AsyncStorageLib from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "@constants/styles";
import { notUndefined } from "@functions/typecheckers";

type Variant = "light" | "dark";

export interface ThemeContextType {
  theme: typeof Colors;
  current: Variant;
  onThemeChange: () => void;
  onSwitchTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: Colors,
  current: "dark",
  onThemeChange: () => {},
  onSwitchTheme: () => {},
});

const THEMES = {
  dark: Colors,
  light: {
    ...Colors,
    text: "#3B3B3B",
    primary: "#fff",
    primary100: "#DADDE2",
    primary200: "#B1BDC5",
    primary300: "#889FA5",
    secondary: "#4E2296",
  },
};

const KEY = "SHOP_CURRENT_THEME";

export const ThemeContextProvider: React.FC = ({ children }) => {
  const colorScheme = useColorScheme()! as Variant;

  const [{ theme, current }, setTheme] = useState<{
    theme: typeof THEMES.dark;
    current: Variant;
  }>({
    theme: THEMES[colorScheme],
    current: colorScheme,
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

  function onSwitchTheme(theme: "light" | "dark") {
    setTheme(() => {
      onSaveTheme(theme);

      return { current: theme, theme: THEMES[theme] };
    });
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
    <ThemeContext.Provider
      value={{ theme, current, onThemeChange, onSwitchTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default function useColorTheme(): ThemeContextType {
  return useContext(ThemeContext);
}
