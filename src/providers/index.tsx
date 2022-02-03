import { Provider } from "react-redux";
import store from "../redux/store";

import { ThemeContextProvider } from "../context/ThemeContext";
import { UserContextProvider } from "../context/UserContext";
import { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeContextProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </ThemeContextProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
