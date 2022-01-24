import React from "react";
import { Text, View } from "react-native";
import { Colors } from "../../constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Delivery() {
  return (
    <View
      style={{
        backgroundColor: Colors.primary100,
        borderRadius: 5,
        alignItems: "center",
        flexDirection: "row",
        padding: 8,
        width: 75,
        justifyContent: "center",
      }}
    >
      <MaterialCommunityIcons
        name="truck-delivery"
        size={24}
        color="white"
        style={{ marginRight: 5 }}
      />
      <Text
        style={{
          color: "#fff",
          fontWeight: "bold",
          fontFamily: "PoppinsMedium",
          fontSize: 16,
        }}
      >
        24h
      </Text>
    </View>
  );
}
