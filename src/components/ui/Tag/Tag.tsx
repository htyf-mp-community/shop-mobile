import { Colors, Fonts } from "constants/styles";
import { ReactElement, ReactNode } from "react";
import { Text, View } from "react-native";
import Ripple from "react-native-material-ripple";

import Color from "color";
import Animated, { FadeInDown } from "react-native-reanimated";

export interface TagProps {
  text: string;
  leftIcon?: ReactNode | ReactElement;
  rightIcon?: ReactNode | ReactElement;
  backgroundColor?: string;
  fontColor?: string;
  onPress?: () => void;
  margin?: number | string;

  index?: number;
}

export default function Tag({
  onPress,
  text,
  leftIcon,
  rightIcon,
  index = 0,
  ...styles
}: TagProps) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 75)}>
      <Ripple
        onPress={onPress}
        style={{
          padding: 8,
          borderRadius: 5,
          backgroundColor: Color(Colors.secondary)
            .alpha(1 / index)
            .string(),
          paddingHorizontal: 15,
          margin: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ marginRight: 5 }}>{leftIcon}</View>
        <Text
          style={{
            color: styles.fontColor || "#fff",
            fontSize: 16,
            textTransform: "capitalize",
          }}
        >
          {text}
        </Text>
        <View style={{ marginLeft: 5 }}>{rightIcon}</View>
      </Ripple>
    </Animated.View>
  );
}
