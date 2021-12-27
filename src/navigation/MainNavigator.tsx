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
import { RootStackParams } from "../@types/types";
import Checkout from "./Screens/Checkout";
import SearchResults from "./Screens/SearchResults";
import CreateReview from "./Screens/Reviews/CreateReview";
import ProductReviews from "./Screens/Reviews/ProductReviews";
import useCheckToken from "../hooks/useCheckToken";
import Landing from "./Screens/Landing";

import MyReviews from "./Screens/MyReviews";

export const Stack = createSharedElementStackNavigator<RootStackParams>();

export default function MainNavigator(): JSX.Element {
  const { ReadUser } = useUser();
  const { token, isLoggedIn } = useCheckToken();

  useEffect(() => {
    ReadUser();
  }, []);
  const { expoPushToken } = useNotifications();

  useEffect(() => {
    if (typeof expoPushToken !== "undefined") {
      UploadExpoTokenToServer(token, expoPushToken);
    }
  }, [expoPushToken]);

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
              options={({ route }) => ({
                title: route.params.title,
                headerTitleAlign: "center",
                gestureEnabled: true,
                gestureDirection: "vertical",
                gestureResponseDistance: 100,
                presentation: "modal",
                headerShown: true,
                headerStyle: { backgroundColor: Colors.primary },
                headerTintColor: "white",
              })}
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
                headerTitleAlign: "center",
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
              options={({ route: { params } }) => ({
                title: `Rate product: ${params.prod_name}`,
              })}
            />
            <Stack.Screen name="MyReviews" component={MyReviews} />
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
