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
  callback: () => void;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  fontStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  variant?: "primary" | "secondary" | "ternary";
}

const VARIANTS = {
  primary: "#FF0056",
  secondary: Colors.primary,
  ternary: Colors.secondary,
};

export default function Button({
  text,
  callback,
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
    backgroundColor: "#FF0056",
    borderRadius: radius.small,
    padding: 12,
  },
  text: {
    fontSize: 20,
  },
});
