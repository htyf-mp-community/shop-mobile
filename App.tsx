import React from "react";
import { Colors } from "./src/constants/styles";
import AppProviders from "./src/utils/providers/index";
import * as SplashScreen from "expo-splash-screen";
import * as Notification from "expo-notifications";
import { SafeAreaView } from "react-native-safe-area-context";

import InitApp from "index";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <AppProviders>
        <InitApp />
      </AppProviders>
    </SafeAreaView>
  );
}
