import React from "react";
import { Text, View, ViewStyle, StyleProp, TextStyle } from "react-native";
import Ripple, { RippleProps } from "react-native-material-ripple";
import Badge from "components/ui/Badge";
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
  /** Function called on onPress event */
  callback?: () => void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Styles applied to button's text */
  fontStyle?: StyleProp<TextStyle>;
  /** Styles applied to icon's container */
  iconStyle?: StyleProp<ViewStyle>;
  /** DEPRECATED Style variants of button component */
  variant?: keyof typeof VARIANTS;
  /** Floating element to display number */
  badge?: number;
  size?: keyof typeof BUTTON_SIZE;
  borderRadius?: keyof typeof BUTTON_BORDER_RADIUS;
  disabled?: boolean;
  /**  Style variants of button component */
  type?: keyof typeof BUTTON_TYPES;
  /** Color variants of button */
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
