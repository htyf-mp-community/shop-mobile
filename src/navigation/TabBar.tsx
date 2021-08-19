import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Colors } from "../constants/styles";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export default function TabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/home.png")} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: 60,
    backgroundColor: Colors.primary,
    borderColor: "#000",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    transform: [{ scale: 0.6 }],
  },
});
