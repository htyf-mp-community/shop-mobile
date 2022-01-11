import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { RootStackParams } from "../../../@types/types";
import { Colors } from "../../../constants/styles";
import LoginScreen from "./Login";
import RegisterScreen from "./Register";

const Stack = createSharedElementStackNavigator<RootStackParams>();

export default function Auth() {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
        headerTitle: "",
        headerStyle: {
          backgroundColor: Colors.primary,
        },
      }}
    >
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
