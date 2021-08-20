import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { UserContextProvider } from "./src/context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";

import * as Notification from "expo-notifications";
import useNotifications from "./src/notifications/MainNotifications";
import { useEffect } from "react";

import { UploadExpoTokenToServer } from "./src/notifications/MainNotifications";

const client = new QueryClient({});

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const { expoPushToken } = useNotifications();

  useEffect(() => {
    if (expoPushToken) {
      UploadExpoTokenToServer(expoPushToken);
    }
  }, [expoPushToken]);

  return (
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <MainNavigator />
      </UserContextProvider>
    </QueryClientProvider>
  );
}
