import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { RootStackParams } from "../../../@types/types";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";

const Stack = createSharedElementStackNavigator<RootStackParams>();

export default function Auth() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    >
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
