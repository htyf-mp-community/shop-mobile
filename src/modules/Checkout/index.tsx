import React from "react";
import { View, StyleSheet } from "react-native";
import Address from "./Address/Address";
import Payment from "./PaymentComponent/Payment";
import Phone from "./PhoneComponent/Phone";

export default function Personals() {
  return (
    <View style={styles.container}>
      <Address />
      <Phone />
      <Payment />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
