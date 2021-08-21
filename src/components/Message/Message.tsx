import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Message({ message }: { message: string }) {
  return (
    <View style={styles.message}>
      <Text style={{ color: "white" }}>{message}</Text>
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
