import React from "react";
import { Text, View, ViewStyle, StyleProp, TextStyle } from "react-native";
import Ripple, { RippleProps } from "react-native-material-ripple";
import Badge from "components/Badge";
import {
  BUTTON_BORDER_RADIUS,
  BUTTON_SIZE,
  BUTTON_TYPES,
  VARIANTS,
  styles,
} from "./assets";

import Color from "color";
import useColorTheme from "utils/context/ThemeContext";

interface ButtonProps extends RippleProps {
  text?: string;
  callback?: () => void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  variant?: keyof typeof VARIANTS;
  badge?: string | number;
  size?: keyof typeof BUTTON_SIZE;
  borderRadius?: keyof typeof BUTTON_BORDER_RADIUS;
  disabled?: boolean;
  type?: keyof typeof BUTTON_TYPES;
  color?: keyof typeof VARIANTS;
}

export default function Button({
  text,
  callback = () => {},
  icon,
  style,
  fontStyle,
  iconStyle,
  type = "text",
  variant = "text",
  badge,
  size = "md",
  disabled,
  borderRadius = "sm",
  color,
  ...rest
}: ButtonProps) {
  const mainColor = VARIANTS[color || variant];

  const disabledColor = Color(mainColor).alpha(0.15).string();

  const buttonStyle = {
    ...BUTTON_SIZE[size],
    ...BUTTON_TYPES[type](!disabled ? mainColor : disabledColor),
    borderRadius: BUTTON_BORDER_RADIUS[borderRadius],
  };

  const { theme } = useColorTheme();

  const textStyle = {
    color: Color(type === "outlined" ? mainColor : theme.text)
      .alpha(disabled ? 0.5 : 1)
      .string(),
  };

  return (
    <Ripple
      rippleColor="#fff"
      rippleCentered
      onPress={callback}
      disabled={disabled}
      style={[buttonStyle, styles.button, style]}
      {...rest}
    >
      {!!badge && <Badge amount={badge} left />}
      {typeof text !== "undefined" && (
        <Text style={[styles.text, textStyle, fontStyle]}>{text}</Text>
      )}
      <View style={iconStyle}>{icon}</View>
    </Ripple>
  );
}
