import React from "react";
import { Provider } from "react-redux";
import store from "redux/store";

import { ThemeContextProvider } from "../context/ThemeContext";
import { UserContextProvider } from "../context/UserContext";
import { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Apollo client crashes Reanimated
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { API } from "constants/routes";

interface AppProvidersProps {
  children: ReactNode;
  onSplashScreen: () => void;
}
const client = new ApolloClient({
  uri: API + "/graphql",
  cache: new InMemoryCache(),
});

export default function AppProviders({
  children,
  onSplashScreen,
}: AppProvidersProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ThemeContextProvider>
            <UserContextProvider onSplashScreen={onSplashScreen}>
              {children}
            </UserContextProvider>
          </ThemeContextProvider>
        </ApolloProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
