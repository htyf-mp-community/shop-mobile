import React from "react";
import { View } from "react-native";
import { usePersonalContext } from "../PersonalProvider/index";
import Input from "../../../components/Input/Input";
import { Colors } from "../../../constants/styles";

export default function Address() {
  const {
    address: { city, setCity, setNumber, setStreet, number, street },
  } = usePersonalContext();
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Input
        labelStyle={{ color: Colors.text }}
        name="City"
        value={city}
        setValue={setCity}
        placeholder="South Kaitlinchester, TN 85978"
        placeholderColor={Colors.text}
      />
      <Input
        labelStyle={{ color: Colors.text }}
        name="Home number"
        value={number}
        setValue={setNumber}
        placeholder="1549"
        placeholderTextColor={"#fff"}
      />
      <Input
        labelStyle={{ color: Colors.text }}
        name="Street"
        value={street}
        setValue={setStreet}
        placeholder="1549 Elvera Skyway"
        placeholderColor={Colors.text}
      />
    </View>
  );
}
