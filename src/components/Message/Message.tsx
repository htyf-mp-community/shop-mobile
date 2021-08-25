import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/styles";

export default function Message({ message }: { message: string }) {
  return (
    <View style={styles.message}>
      <Text style={{ color: Colors.text }}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    padding: 10,
    position: "absolute",
    left: "50%",
  },
});
