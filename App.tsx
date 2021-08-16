import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";

import { UserContextProvider } from "./src/context/UserContext";

export default function App() {
  return (
    <UserContextProvider>
      <MainNavigator />
    </UserContextProvider>
  );
}
