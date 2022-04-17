import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";
import { Colors, radius } from "@constants/styles";
import Ripple, { RippleProps } from "react-native-material-ripple";
import Badge from "components/Badge";

import Color from "color";

const VARIANTS = {
  primary: "#FF0056",
  secondary: Colors.primary,
  ternary: Colors.secondary,
  disabled: "#131d33",
  text: "transparent",
};

const BUTTON_SIZE = {
  xs: {
    padding: 2.5,
  },
  sm: {
    padding: 5,
  },
  md: {
    padding: 10,
  },
  xl: {
    padding: 15,
  },
};

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

  disabled?: boolean;
}

/**
 * Custom button Component with touch animation
 * @param {String} text text shown inside the button
 * @param {Function} callback function that exectutes on button click
 * @param {ReactNode} icon  icon passed as Component
 * @param {StyleProp<ViewStyle>} style styling for entire button
 * @param {StyleProp<TextStyle>} fontStyle styling for text inside button
 * @param {StyleProp<ViewStyle>} iconStyle styling for icon passed as ICON props
 * @param {"primary" | "secondary" | "ternary"} variant style of the button
 **/

export default function Button({
  text,
  callback = () => {},
  icon,
  style,
  fontStyle,
  iconStyle,
  variant = "text",
  badge,
  size = "md",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <Ripple
      rippleColor="#fff"
      rippleCentered
      onPress={callback}
      disabled={disabled}
      style={[
        {
          backgroundColor: !disabled
            ? VARIANTS[variant]
            : Color(VARIANTS[variant]).alpha(0.15).string(),
          ...BUTTON_SIZE[size],
        },
        styles.button,
        style,
      ]}
      {...rest}
    >
      {!!badge && <Badge amount={badge} left />}
      {typeof text !== "undefined" && (
        <Text
          style={[
            styles.text,
            {
              color: Color("#fff")
                .alpha(disabled ? 0.5 : 1)
                .string(),
            },
            fontStyle,
          ]}
        >
          {text}
        </Text>
      )}
      <View style={iconStyle}>{icon}</View>
    </Ripple>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    borderRadius: radius.small,
    position: "relative",
  },
  text: {
    fontSize: 20,
  },
});
