import { StackNavigationOptions } from "@react-navigation/stack";
import { Platform } from "react-native";
import { ScreenNavigationProps } from "../@types/types";
import { Colors } from "../constants/styles";

const HEADER = {
  android: true,
  ios: false,
  windows: true,
  macos: true,
  web: false,
};

export const defaultStackOptions: StackNavigationOptions = {
  headerShown: HEADER[Platform.OS],
  headerStyle: { backgroundColor: Colors.primary },
  headerTintColor: Colors.text,
};

export const detailsScreenOptions = ({
  route,
}: Pick<
  ScreenNavigationProps<"Details">,
  "route"
>): StackNavigationOptions => ({
  ...defaultStackOptions,
  headerTitle: route.params.title.split("").slice(0, 25).join(""),
  headerTitleAlign: "center",
  presentation: "modal",
  detachPreviousScreen: false,
  transitionSpec: {
    open: { animation: "timing", config: { duration: 200 } },
    close: { animation: "timing", config: { duration: 200 } },
  },
});

export const checkOutScreenOptions: StackNavigationOptions = {
  gestureEnabled: true,
  gestureDirection: "vertical",
  gestureResponseDistance: 200,
  presentation: "modal",
  headerTitleAlign: "center",
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

export const cartScreenOptions: StackNavigationOptions = {
  presentation: "modal",
};
