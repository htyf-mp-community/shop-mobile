import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useUser } from "@utils/context/UserContext";
import { useEffect } from "react";
import { UploadExpoTokenToServer } from "@utils/notifications/MainNotifications";
import useNotifications from "@utils/notifications/MainNotifications";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import type { RootStackParams } from "../@types/types";
import useCheckToken from "utils/hooks/useCheckToken";
import * as Screen from "./Screens";
import * as Option from "./options";
import { StatusBar } from "expo-status-bar";
import useColorTheme from "@utils/context/ThemeContext";

const Stack = createSharedElementStackNavigator<RootStackParams>();

export default function MainNavigator(): JSX.Element {
  const { ReadUser } = useUser();
  const { token, isLoggedIn, name } = useCheckToken();
  const { expoPushToken } = useNotifications();

  useEffect(() => {
    ReadUser();
  }, []);

  useEffect(() => {
    if (typeof expoPushToken !== "undefined") {
      UploadExpoTokenToServer(token, expoPushToken);
    }
  }, [expoPushToken]);

  const { theme, current } = useColorTheme();

  return (
    <>
      <StatusBar backgroundColor={theme.primary} />
      <NavigationContainer theme={current === "dark" ? DarkTheme : undefined}>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            ...Option.defaultStackOptions,
            headerStyle: { backgroundColor: theme.primary },
            headerTintColor: theme.text,
          }}
        >
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="Home"
                component={Screen.Home}
                options={Option.homeScreenOptions}
              />
              <Stack.Screen
                name="Cart"
                component={Screen.Cart}
                options={Option.cartScreenOptions}
              />
              <Stack.Screen
                component={Screen.User}
                name="User"
                options={() => Option.userScreenOptions(name)}
              />
              <Stack.Screen
                component={Screen.ProductDetails}
                name="Details"
                options={Option.detailsScreenOptions}
                sharedElements={({ params }) => {
                  const { prod_id, sharedID } = params;

                  if (sharedID) {
                    return ["prod_id." + prod_id + sharedID];
                  }
                }}
              />
              <Stack.Screen
                name="Checkout"
                component={Screen.Checkout}
                options={Option.checkOutScreenOptions}
              />
              <Stack.Screen
                name="SearchResults"
                component={Screen.SearchResults}
                options={({ route }) => ({
                  title: `Search Results: ${route.params.length}`,
                })}
              />
              <Stack.Screen
                name="CreateReview"
                component={Screen.CreateReview}
                sharedElements={(route) => {
                  const { prod_id, sharedID } = route.params;
                  return ["prod_id." + prod_id + sharedID];
                }}
                options={Option.createReviewOptions}
              />
              <Stack.Screen
                name="ProductReviews"
                component={Screen.ProductReviews}
                options={Option.productReviewsOption}
              />
              <Stack.Screen
                name="MyReviews"
                component={Screen.MyReviews}
                options={Option.myReviewsOption}
              />
              <Stack.Screen
                name="AccountSettings"
                component={Screen.AccountSettings}
                options={Option.accountSettingsOption}
              />
              <Stack.Screen
                name="Search"
                component={Screen.SearchScreen}
                options={Option.searchOptions}
              />
              <Stack.Screen
                name="PurchaseHistory"
                component={Screen.PurchaseHistory}
                options={Option.purchaseHistoryOption}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Auth"
                component={Screen.Auth}
                options={Option.authOptions}
              />
              <Stack.Screen
                name="Landing"
                component={Screen.Landing}
                options={Option.landingOptions}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
