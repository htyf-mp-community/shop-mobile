import React from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import Input from "../../../components/Input/Input";
import { Colors } from "../../../constants/styles";

export default function Payment() {
  const [card, setCard] = useState("");

  return (
    <View style={{ padding: 10 }}>
      <Text
        style={{ fontSize: 25, fontFamily: "PoppinsBold", color: Colors.text }}
      >
        Payment
      </Text>
      <View>
        <Input
          value={card}
          setValue={setCard}
          placeholder="0000-0000-0000-0000"
          placeholderColor={Colors.text}
          keyboardType="numeric"
          style={{
            color: Colors.text,
            borderColor: Colors.text,
            borderWidth: 0.5,
          }}
          {...{ textContentType: "creditCardNumber", maxLength: 19 }}
        />
      </View>
    </View>
  );
}
