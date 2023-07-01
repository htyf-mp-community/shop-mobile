import { RouteProp } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import layout from "constants/layout";
import { Platform } from "react-native";
import { RootStackParams, ScreenNavigationProps } from "../@types/types";

const HEADER = {
  android: true,
  ios: false,
  windows: true,
  macos: true,
  web: false,
};

const defaultFadeInScreenAnimation: StackNavigationOptions = {
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0.8, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          translateY: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layout.screen.height / 2, 0],
          }),
        },
        {
          scale: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
          }),
        },
      ],
    },
  }),
};

export const horizontalAnimation: StackNavigationOptions = {
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

const horizontalAnimationFromLeft: StackNavigationOptions = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export const defaultStackOptions: StackNavigationOptions = {
  headerShown: HEADER[Platform.OS],
  cardStyle: {
    backgroundColor: "transparent",
  },
  ...defaultFadeInScreenAnimation,
};

export const auctionOptions: StackNavigationOptions = {
  ...defaultStackOptions,
  headerTitleAlign: "center",
  detachPreviousScreen: false,
  transitionSpec: {
    open: { animation: "timing", config: { duration: 200 } },
    close: { animation: "timing", config: { duration: 200 } },
  },
};

export const detailsScreenOptions = ({
  route,
}: ScreenNavigationProps<"Product">): StackNavigationOptions => ({
  ...defaultStackOptions,
  headerTitle: route?.params?.title?.split("").slice(0, 30).join(""),
  headerTitleAlign: "center",
  detachPreviousScreen: false,
  // transitionSpec: {
  //   open: { animation: "timing", config: { duration: 100 } },
  //   close: { animation: "timing", config: { duration: 100 } },
  // },

  ...(!route.params.isSharedAnimationUsed && horizontalAnimation),
});

export const checkOutScreenOptions: StackNavigationOptions = {
  presentation: "modal",
  headerTitleAlign: "center",
  headerShown: false,
};

export const userScreenOptions = (name: string): StackNavigationOptions => ({
  headerTitleAlign: "center",
  headerTitle: name,
  // presentation: "modal",
});

export const homeScreenOptions: StackNavigationOptions = {
  headerShown: false,
};

export const cartScreenOptions: StackNavigationOptions = {
  // ...horizontalAnimationFromLeft,
  ...defaultStackOptions,

  // detachPreviousScreen: true,
};

export const watchlistScreenOptions: StackNavigationOptions = {
  //  ...horizontalAnimationFromLeft,
};

export const createReviewOptions = ({
  route: { params },
}: {
  route: RouteProp<RootStackParams, "CreateReview">;
}): StackNavigationOptions => ({
  // ...horizontalAnimation,
  headerTitle: "",
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
};

export const accountSettingsOption: StackNavigationOptions = {
  headerShown: false,
};

export const searchOptions: StackNavigationOptions = {
  headerShown: false,
  ...horizontalAnimation,
};

export const purchaseHistoryOption: StackNavigationOptions = {
  headerTitle: "Purchase history",
  headerTitleAlign: "center",
};

export const authOptions: StackNavigationOptions = {
  headerShown: true,
  ...horizontalAnimation,
};

export const landingOptions: StackNavigationOptions = {
  ...authOptions,
  headerShown: false,
  animationTypeForReplace: "pop",
};
