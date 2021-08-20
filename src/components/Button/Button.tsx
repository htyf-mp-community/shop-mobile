import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { radius } from "../../constants/styles";

type TButton = {
  text?: string;
  callback: () => void;
  icon?: any;
  style?: any;
  disabled?: boolean;
};

export default function Button({
  text = "",
  callback,
  icon,
  style,
  disabled = false,
}: TButton) {
  return (
    <TouchableOpacity
      onPress={callback}
      activeOpacity={0.6}
      style={[styles.button, style]}
      disabled={disabled}
    >
      {text !== "" && (
        <Text style={[styles.text, { color: style?.color || "black" }]}>
          {text}
        </Text>
      )}
      <View style={styles.icon}>{icon}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    backgroundColor: "#4A4C50",
    borderRadius: radius.small,
    padding: 12,
  },
  text: {
    fontSize: 20,
  },
  icon: {},
});
