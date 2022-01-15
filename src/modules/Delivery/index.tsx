import React from "react";
import { Text } from "react-native";
import { Colors } from "../../constants/styles";

export default function Delivery() {
  return (
    <Text
      style={{
        backgroundColor: Colors.primary100,
        padding: 15,
        color: "#fff",
        borderRadius: 10,
      }}
    >
      24h delivery
    </Text>
  );
}
