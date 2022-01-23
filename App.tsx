import React from "react";
import MainNavigator from "./src/navigation";
import { UserContextProvider } from "./src/context/UserContext";
import * as Notification from "expo-notifications";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "./src/constants/styles";
import { ThemeContextProvider } from "./src/context/ThemeContext";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
        <Provider store={store}>
          <ThemeContextProvider>
            <UserContextProvider>
              <MainNavigator />
            </UserContextProvider>
          </ThemeContextProvider>
        </Provider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
