import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";
import { Colors, radius } from "../../constants/styles";

interface ButtonProps extends TouchableOpacityProps {
  text?: string;
  callback?: () => void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  variant?: "primary" | "secondary" | "ternary" | "disabled";
}

const VARIANTS = {
  primary: "#FF0056",
  secondary: Colors.primary,
  ternary: Colors.secondary,
  disabled: "#131d33",
};

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
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={callback}
      activeOpacity={0.8}
      style={[{ backgroundColor: VARIANTS[variant] }, styles.button, style]}
      {...rest}
    >
      {typeof text !== "undefined" && (
        <Text style={[styles.text, { color: "#fff" }, fontStyle]}>{text}</Text>
      )}
      <View style={iconStyle}>{icon}</View>
    </TouchableOpacity>
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
