import React from "react";
import Avatar from "../../../modules/User/Avatar/Avatar";
import Settings from "../../../modules/User/Settings/Settings";
import Button from "../../../components/Button/Button";
import { ScreenNavigationProps } from "../../../@types/types";
import useColorTheme from "@utils/context/ThemeContext";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { StyleProp, ViewStyle } from "react-native";

export default function User({
  navigation,
}: Required<ScreenNavigationProps<"User">>) {
  const { theme } = useColorTheme();

  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const buttonStyle: StyleProp<ViewStyle> = {
    margin: 10,
    backgroundColor: theme.primary100,
    padding: 15,
    justifyContent: "flex-start",
  };

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      style={{ flex: 1, backgroundColor: theme.primary }}
    >
      <Avatar />

      <Button
        text="Purchase history"
        style={[buttonStyle, { marginTop: 20 }]}
        callback={() => {
          navigation.navigate("PurchaseHistory");
        }}
      />

      <Button
        text="My reviews"
        style={buttonStyle}
        callback={() => {
          navigation.navigate("MyReviews");
        }}
      />
      <Button
        text="Account settings"
        style={buttonStyle}
        callback={() => {
          navigation.navigate("AccountSettings");
        }}
      />
      <Settings />
    </Animated.ScrollView>
  );
}
