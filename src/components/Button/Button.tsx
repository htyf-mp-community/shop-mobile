import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { radius } from "../../constants/styles";

type TButtonProps = {
  text?: string;
  callback: () => void;
  icon?: React.ReactNode;
  style?: any;
  disabled?: boolean;
  fontStyle?: any;
};

export default function Button({
  text = "",
  callback,
  icon,
  style,
  disabled = false,
  fontStyle = {},
}: TButtonProps) {
  return (
    <TouchableOpacity
      onPress={callback}
      activeOpacity={0.6}
      disabled={disabled}
      style={[styles.button, style]}
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
