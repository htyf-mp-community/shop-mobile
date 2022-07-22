import React from "react";
import { Provider } from "react-redux";
import store from "redux/store";
import { ThemeContextProvider } from "../context/ThemeContext";
import { UserContextProvider } from "../context/UserContext";
import { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { API } from "constants/routes";

interface AppProvidersProps {
  children: ReactNode;
  onSplashScreen: () => void;
}

function merge(existing: any[] = [], incoming: any[] = [], key: string) {
  if (incoming.length === 0) return existing;

  const index = existing.findIndex((r) => r[key] === (incoming?.[0][key] || 0));

  if (index === -1) return [...existing, ...incoming];

  return existing;
}

export const client = new ApolloClient({
  uri: API + "/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          ratings: {
            keyArgs: false,
            merge: (ex, inc) => merge(ex, inc, "rating_id"),
          },
          history: {
            keyArgs: false,
            merge: (ex, inc) => merge(ex, inc, "payment_id"),
          },
        },
      },
    },
  }),
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
