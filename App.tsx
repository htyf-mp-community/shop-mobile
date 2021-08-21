import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { UserContextProvider } from "./src/context/UserContext";

import * as Notification from "expo-notifications";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <UserContextProvider>
      <MainNavigator />
    </UserContextProvider>
  );
}
