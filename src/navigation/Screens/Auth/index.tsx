import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { RootStackParams } from "../../../@types/types";
import useColorTheme from "../../../context/ThemeContext";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";

const Stack = createSharedElementStackNavigator<RootStackParams>();

export default function Auth() {
  const { theme } = useColorTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
        headerTitle: "",
        headerStyle: {
          backgroundColor: theme.primary,
        },
      }}
    >
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Sign up",
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "Log in",
        }}
      />
    </Stack.Navigator>
  );
}
