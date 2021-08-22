import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Home from "./Screens/Home";
import Auth from "./Screens/Auth";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import Cart from "./Screens/Cart";
import { UploadExpoTokenToServer } from "../notifications/MainNotifications";
import useNotifications from "../notifications/MainNotifications";
import User from "./Screens/User";
import ProductDetails from "./Screens/ProductDetails";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import "react-native-gesture-handler";
import { Colors } from "../constants/styles";
import { options } from "./options";
import { RootStackParams, UserType } from "../@types/types";
import Checkout from "./Screens/Checkout";

const Stack = createSharedElementStackNavigator<RootStackParams>();

const MainNavigator = () => {
  const { setUser, ReadUser, user } = useUser();

  useEffect(() => {
    (async () => {
      const res: any = await ReadUser();
      if (res !== undefined) {
        setUser(res);
      }
    })();
  }, []);
  const { expoPushToken } = useNotifications();

  useEffect(() => {
    if (expoPushToken) {
      UploadExpoTokenToServer(user.token);
    }
  }, [expoPushToken]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
        }}
      >
        {user.token !== "" ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                gestureEnabled: true,
                gestureDirection: "vertical",
                gestureResponseDistance: 500,
                presentation: "modal",
                headerShown: true,
                headerStyle: { backgroundColor: Colors.primary },
                headerTintColor: "white",
              }}
            />
            <Stack.Screen component={User} name="User" />
            <Stack.Screen
              component={ProductDetails}
              name="Details"
              //@ts-ignore
              options={options}
              sharedElements={(route) => {
                const { prod_id, sharedID } = route.params;
                return ["prod_id." + prod_id + sharedID];
              }}
            />
            <Stack.Screen name="Checkout" component={Checkout} />
          </>
        ) : (
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: true }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
