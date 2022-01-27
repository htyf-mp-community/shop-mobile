import React, { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import Button from "../Button/Button";
import Input from "../Input/Input";

import { Feather } from "@expo/vector-icons";
import { Colors } from "../../constants/styles";
import useColorTheme from "../../context/ThemeContext";

export default function Newsletter() {
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState("");

  const { theme } = useColorTheme();
  return (
    <View
      style={{
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.primary,
        marginTop: 10,
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
