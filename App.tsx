import React from "react";
import MainNavigator from "./src/navigation";
import { UserContextProvider } from "./src/context/UserContext";
import * as Notification from "expo-notifications";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./src/constants/styles";
import { StatusBar } from "expo-status-bar";
import { ThemeContextProvider } from "./src/context/ThemeContext";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [loaded] = useFonts({
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <StatusBar backgroundColor={Colors.primary} style="dark" />
      <ThemeContextProvider>
        <UserContextProvider>
          <MainNavigator />
        </UserContextProvider>
      </ThemeContextProvider>
    </SafeAreaView>
  );
}
