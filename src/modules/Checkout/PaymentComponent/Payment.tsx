import React from "react";
import { Text, View } from "react-native";
import { usePersonalContext } from "../PersonalProvider/index";
import Input from "../../../components/Input/Input";
import { Colors } from "../../../constants/styles";

export default function Payment() {
  const { card, setCard } = usePersonalContext();

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
          {...{ textContentType: "creditCardNumber", maxLength: 19 }}
        />
      </View>
    </View>
  );
}
