import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import Home from "./Screens/Home";
import Auth from "./Screens/Auth/Auth";
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
import { RootStackParams } from "../@types/types";
import Checkout from "./Screens/Checkout";
import SearchResults from "./Screens/SearchResults";
import CreateReview from "./Screens/Reviews/CreateReview";
import ProductReviews from "./Screens/Reviews/ProductReviews";
import useCheckToken from "../hooks/useCheckToken";
import Landing from "./Screens/Landing";

export const Stack = createSharedElementStackNavigator<RootStackParams>();

export default function MainNavigator() {
  const {
    ReadUser,
    user: { token, isLoggedIn },
  } = useUser();

  useEffect(() => {
    ReadUser();
  }, []);
  const { notification, expoPushToken } = useNotifications();
  useCheckToken();

  useEffect(() => {
    if (notification && expoPushToken) {
      UploadExpoTokenToServer(token);
    }
  }, [notification]);

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.text,
        }}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                gestureEnabled: true,
                gestureDirection: "vertical",
                gestureResponseDistance: 200,
                presentation: "modal",
              }}
            />
            <Stack.Screen component={User} name="User" />
            <Stack.Screen
              component={ProductDetails}
              name="Details"
              //@ts-ignore
              options={options}
              sharedElements={({ params }) => {
                const { prod_id, sharedID } = params;
                return ["prod_id." + prod_id + sharedID];
              }}
            />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{
                gestureEnabled: true,
                gestureDirection: "vertical",
                gestureResponseDistance: 200,
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="SearchResults"
              component={SearchResults}
              options={({ route }) => ({
                title: `Search Results: ${route.params.length}`,
              })}
            />
            <Stack.Screen
              name="CreateReview"
              component={CreateReview}
              sharedElements={(route) => {
                const { prod_id, sharedID } = route.params;
                return ["prod_id." + prod_id + sharedID];
              }}
              options={({ route: { params } }) => ({
                title: `Rate product: ${params.prod_name}`,
              })}
            />
            <Stack.Screen
              name="ProductReviews"
              component={ProductReviews}
              options={{
                presentation: "modal",
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
