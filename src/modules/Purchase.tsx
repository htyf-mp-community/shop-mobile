import React from "react";
import { View, Dimensions } from "react-native";
import Button from "../components/Button/Button";

const { width } = Dimensions.get("screen");

export default function Purchase() {
  return (
    <View style={{ width, alignItems: "center", padding: 10 }}>
      <Button
        text="Buy"
        callback={() => {}}
        style={{ backgroundColor: "green", color: "white", width: width * 0.9 }}
      />
    </View>
  );
}
