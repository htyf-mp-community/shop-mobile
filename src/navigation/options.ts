import { StackNavigationOptions } from "@react-navigation/stack";
import { ScreenNavigationProps } from "../@types/types";
import { Colors } from "../constants/styles";

export const defaultStackOptions: StackNavigationOptions = {
  headerShown: true,
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
  headerTitle: route.params.title,
  headerTitleAlign: "center",
  gestureEnabled: true,
  gestureDirection: "vertical",
  gestureResponseDistance: 100,
  presentation: "modal",
});

export const checkOutScreenOptions: StackNavigationOptions = {
  gestureEnabled: true,
  gestureDirection: "vertical",
  gestureResponseDistance: 200,
  presentation: "modal",
  headerTitleAlign: "center",
};

export const cartScreenOptions: StackNavigationOptions = {
  gestureEnabled: true,
  gestureDirection: "vertical",
  gestureResponseDistance: 200,
  presentation: "modal",
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
