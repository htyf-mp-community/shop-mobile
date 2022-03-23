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

const VARIANTS = {
  primary: "#FF0056",
  secondary: Colors.primary,
  ternary: Colors.secondary,
  disabled: "#131d33",
  text: "transparent",
};

interface ButtonProps extends RippleProps {
  text?: string;
  callback?: () => void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  variant?: keyof typeof VARIANTS;
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
  ...rest
}: ButtonProps) {
  return (
    <Ripple
      rippleColor="#fff"
      rippleCentered
      onPress={callback}
      style={[{ backgroundColor: VARIANTS[variant] }, styles.button, style]}
      {...rest}
    >
      {typeof text !== "undefined" && (
        <Text style={[styles.text, { color: "#fff" }, fontStyle]}>{text}</Text>
      )}
      <View style={iconStyle}>{icon}</View>
    </Ripple>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    borderRadius: radius.small,
    padding: 12,
  },
  text: {
    fontSize: 20,
  },
});
