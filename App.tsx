import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { UserContextProvider } from "./src/context/UserContext";

import * as Notification from "expo-notifications";

import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [loaded, error] = useFonts({
    PoppinsBold: require("./assets/fonts/Poppins-Bold.ttf"),
    PoppinsThin: require("./assets/fonts/Poppins-Thin.ttf"),
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
    PoppinsBlack: require("./assets/fonts/Poppins-Black.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <UserContextProvider>
      <MainNavigator />
    </UserContextProvider>
  );
}
