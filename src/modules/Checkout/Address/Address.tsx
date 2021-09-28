import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { usePersonalContext } from "../PersonalProvider/index";
import Input from "../../../components/Input/Input";
import { Colors } from "../../../constants/styles";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export default function Address() {
  const {
    address: { city, setCity, setNumber, setStreet, number, street },
  } = usePersonalContext();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Address</Text>
      <View style={styles.form}>
        <Input
          value={city}
          setValue={setCity}
          placeholder="city"
          style={styles.input}
          placeholderColor={Colors.text}
        />
        <Input
          value={number}
          setValue={setNumber}
          placeholder="home number"
          style={styles.input}
          placeholderColor={Colors.text}
        />
        <Input
          value={street}
          setValue={setStreet}
          placeholder="street"
          style={styles.input}
          placeholderColor={Colors.text}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    padding: 10,
  },
  text: {
    color: Colors.text,
    fontFamily: "PoppinsBold",
    fontSize: 25,
  },
  form: {
    alignItems: "flex-start",
  },
  input: {
    color: Colors.text,
    borderColor: Colors.text,
    borderWidth: 0.5,
  },
});
