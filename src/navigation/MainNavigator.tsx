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
import { RootStackParams } from "../@types/types";
import Checkout from "./Screens/Checkout";
import SearchResults from "./Screens/SearchResults";
import CreateReview from "./Screens/Reviews/CreateReview";
import ProductReviews from "./Screens/Reviews/ProductReviews";
import useCheckToken from "../hooks/useCheckToken";
import Landing from "./Screens/Landing";
import AccountSettings from "./Screens/AccountSettings";
import PurchaseHistory from "./Screens/PurchaseHistory";
import MyReviews from "./Screens/MyReviews";
import SearchScreen from "./Screens/Search";
import {
  cartScreenOptions,
  checkOutScreenOptions,
  defaultStackOptions,
  detailsScreenOptions,
  horizontalAnimation,
} from "./options";

export const Stack = createSharedElementStackNavigator<RootStackParams>();

export default function MainNavigator(): JSX.Element {
  const { ReadUser } = useUser();
  const { token, isLoggedIn, name } = useCheckToken();

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
        screenOptions={defaultStackOptions}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={cartScreenOptions}
            />
            <Stack.Screen
              component={User}
              name="User"
              options={{
                headerTitleAlign: "center",
                headerTitle: name.split("@")[0],
                presentation: "modal",
              }}
            />
            <Stack.Screen
              component={ProductDetails}
              name="Details"
              options={detailsScreenOptions}
              sharedElements={({ params }) => {
                const { prod_id, sharedID } = params;
                return ["prod_id." + prod_id + sharedID];
              }}
            />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={checkOutScreenOptions}
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
                ...horizontalAnimation,
              })}
            />
            <Stack.Screen
              name="ProductReviews"
              component={ProductReviews}
              options={({ route: { params } }) => ({
                title: `Rate product: ${params.prod_name}`,
                ...horizontalAnimation,
              })}
            />
            <Stack.Screen
              name="MyReviews"
              component={MyReviews}
              options={{
                ...horizontalAnimation,
                title: "My reviews",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="AccountSettings"
              component={AccountSettings}
              options={{
                ...horizontalAnimation,
                headerTitle: "Account Settings",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                ...horizontalAnimation,
                headerTitleAlign: "center",
                headerTitle: "Searched Phrase",
              }}
            />
            <Stack.Screen
              name="PurchaseHistory"
              component={PurchaseHistory}
              options={{
                headerTitle: "Purchase history",
                headerTitleAlign: "center",
                ...horizontalAnimation,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{ headerShown: false, ...horizontalAnimation }}
            />
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false, ...horizontalAnimation }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
