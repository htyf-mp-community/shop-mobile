import React, { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Button from "../Button/Button";
import Input from "../Input/Input";

import { Feather } from "@expo/vector-icons";

export default function Newsletter() {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  return (
    <View
      style={{
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#000000",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Input
        value={email}
        setValue={setEmail}
        placeholder="Join our newsletter"
        placeholderTextColor={"#fff"}
        style={{
          width: width * 0.8,
          color: "#fff",
        }}
      />
      <Button
        icon={<Feather name="send" size={24} color="#fff" />}
        callback={() => {}}
        style={{
          width: width * 0.15,
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      />
    </View>
  );
}