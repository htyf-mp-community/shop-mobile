import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { FontBasic, radius } from "../../constants/styles";

type TButton = {
  text?: string;
  callback: () => void;
  icon?: any;
  style?: any;
};

export default function Button({ text = "", callback, icon, style }: TButton) {
  return (
    <TouchableOpacity
      onPress={callback}
      activeOpacity={0.6}
      style={[styles.button, style]}
    >
      {text !== "" && <Text style={styles.text}>{text}</Text>}
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
    ...FontBasic,
    fontSize: 20,
  },
  icon: {},
});
