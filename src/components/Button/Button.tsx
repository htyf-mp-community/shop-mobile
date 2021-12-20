import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, radius } from "../../constants/styles";

interface ButtonProps {
  text?: string;
  callback: () => void;
  icon?: React.ReactNode;
  style?: any;
  disabled?: boolean;
  fontStyle?: any;
  iconStyle?: any;
  variant?: "primary" | "secondary" | "ternary";
}

const VARIANTS = {
  primary: "#FF0056",
  secondary: Colors.primary,
  ternary: Colors.secondary,
};

export default function Button({
  text = "",
  callback,
  icon,
  style,
  disabled = false,
  fontStyle = {},
  iconStyle = {},
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={callback}
      activeOpacity={0.8}
      disabled={disabled}
      style={[{ backgroundColor: VARIANTS[variant] }, styles.button, style]}
      {...rest}
    >
      {text !== "" && (
        <Text
          style={[styles.text, { color: style?.color || "#fff" }, fontStyle]}
        >
          {text}
        </Text>
      )}
      <View>{icon}</View>
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
