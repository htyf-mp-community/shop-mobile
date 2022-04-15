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

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      style={{ flex: 1, backgroundColor: theme.primary }}
    >
      <Avatar />

      <Button
        text="Purchase history"
        style={{
          margin: 10,
          backgroundColor: theme.primary100,
          padding: 15,
          marginTop: 20,
        }}
        callback={() => {
          navigation.navigate("PurchaseHistory");
        }}
      />

      <Button
        text="My reviews"
        style={{ margin: 10, backgroundColor: theme.primary100, padding: 15 }}
        callback={() => {
          navigation.navigate("MyReviews");
        }}
      />
      <Button
        text="Account settings"
        style={{ margin: 10, backgroundColor: theme.primary100, padding: 15 }}
        callback={() => {
          navigation.navigate("AccountSettings");
        }}
      />
      <Settings />
    </Animated.ScrollView>
  );
}
