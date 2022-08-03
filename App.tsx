import React, { useCallback, useEffect, useState } from "react";
import MainNavigator from "./src/navigation";
import { Colors } from "./src/constants/styles";
import AppProviders from "./src/utils/providers/index";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import * as Notification from "expo-notifications";
import { SafeAreaView } from "react-native-safe-area-context";

import { EvilIcons } from "@expo/vector-icons";
import { useUser } from "utils/context/UserContext";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function InitApp() {
  const { ReadUser } = useUser();

  useEffect(() => {
    ReadUser();
  }, []);

  return <MainNavigator />;
}

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
          PoppinsThin: require("./assets/fonts/Poppins-Thin.ttf"),
          PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
          PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
          PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
          PoppinsBlack: require("./assets/fonts/Poppins-Black.ttf"),
          ...EvilIcons.font,
        });
      } catch (error) {
        console.warn(error);
      } finally {
        setAppReady(true);
      }
    }
    prepare();
  }, []);

  const onSplashScreen = useCallback(async () => {
    try {
      if (appReady) {
        await SplashScreen.hideAsync();
      }
    } catch (error) {}
  }, [appReady]);

  if (!appReady) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <AppProviders onSplashScreen={onSplashScreen}>
        <InitApp />
      </AppProviders>
    </SafeAreaView>
  );
}
