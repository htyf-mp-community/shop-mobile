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

const Stack = createSharedElementStackNavigator();

const MainNavigator = () => {
  const { setUser, ReadUser, user } = useUser();

  useEffect(() => {
    (async () => {
      const res: any = await ReadUser();
      if (res !== null) {
        const raw = JSON.parse(res);

        setUser(raw);
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
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen component={User} name="User" />
            <Stack.Screen
              component={ProductDetails}
              name="Details"
              options={{ presentation: "modal" }}
              sharedElements={(route) => {
                const { prod_id } = route.params;
                return ["prod_id." + prod_id];
              }}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={Auth} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
