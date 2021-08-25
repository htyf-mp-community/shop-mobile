import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../../components/Button/Button";
import { Colors } from "../../constants/styles";

export default function Checkout({ route }: any) {
  const { cart, total } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>total ${total}</Text>

      <Button
        callback={() => {}}
        text="Pay"
        style={{
          margin: 25,
          backgroundColor: Colors.secondary,
          color: Colors.text,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: 25,
    fontFamily: "PoppinsBold",
    color: Colors.text,
    padding: 10,
  },
});
