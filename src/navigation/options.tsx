import { RouteProp } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { Platform, Pressable } from "react-native";
import { RootStackParams, ScreenNavigationProps } from "../@types/types";
import { AntDesign } from "@expo/vector-icons";

const HEADER = {
  android: true,
  ios: false,
  windows: true,
  macos: true,
  web: false,
};

const horizontalAnimation: StackNavigationOptions = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export const defaultStackOptions: StackNavigationOptions = {
  headerShown: HEADER[Platform.OS],
};

export const detailsScreenOptions = ({
  route,
  navigation,
}: ScreenNavigationProps<"Details">): StackNavigationOptions => ({
  ...defaultStackOptions,
  headerTitle: route.params.title.split("").slice(0, 20).join(""),
  headerTitleAlign: "center",
  detachPreviousScreen: false,
  transitionSpec: {
    open: { animation: "timing", config: { duration: 200 } },
    close: { animation: "timing", config: { duration: 200 } },
  },
  headerRight: ({ tintColor }) => (
    <Pressable
      style={{ marginRight: 15 }}
      onPress={() => navigation?.navigate("Cart")}
    >
      <AntDesign name="shoppingcart" size={24} color={tintColor} />
    </Pressable>
  ),
});

export const checkOutScreenOptions: StackNavigationOptions = {
  presentation: "modal",
  headerTitleAlign: "center",
};

export const userScreenOptions = (name: string): StackNavigationOptions => ({
  headerTitleAlign: "center",
  headerTitle: name.split("@")[0],
  // presentation: "modal",
});

export const homeScreenOptions: StackNavigationOptions = { headerShown: false };

export const cartScreenOptions: StackNavigationOptions = {};

export const createReviewOptions = ({
  route: { params },
}: {
  route: RouteProp<RootStackParams, "CreateReview">;
}): StackNavigationOptions => ({
  title: `Rate product: ${params.prod_name}`,
  ...horizontalAnimation,
});

export const productReviewsOption = ({
  route: { params },
}: {
  route: RouteProp<RootStackParams, "ProductReviews">;
}): StackNavigationOptions => ({
  title: `Rate: ${params.prod_name}`,
  ...horizontalAnimation,
});

export const myReviewsOption: StackNavigationOptions = {
  title: "My reviews",
  headerTitleAlign: "center",
  ...horizontalAnimation,
};

export const accountSettingsOption: StackNavigationOptions = {
  headerShown: false,
  ...horizontalAnimation,
};

export const searchOptions: StackNavigationOptions = {
  headerShown: false,
  ...horizontalAnimation,
};

export const purchaseHistoryOption: StackNavigationOptions = {
  headerTitle: "Purchase history",
  headerTitleAlign: "center",
  ...horizontalAnimation,
};

export const authOptions: StackNavigationOptions = {
  headerShown: false,
  ...horizontalAnimation,
};

export const landingOptions: StackNavigationOptions = {
  ...authOptions,
  animationTypeForReplace: "pop",
};
