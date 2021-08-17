import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { UserContextProvider } from "./src/context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient({});

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <MainNavigator />
      </UserContextProvider>
    </QueryClientProvider>
  );
}
