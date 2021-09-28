import React from "react";
import { View } from "react-native";
import Address from "./Address/Address";
import Payment from "./PaymentComponent/Payment";
import Phone from "./PhoneComponent/Phone";

export default function Personals() {
  return (
    <View>
      <Address />
      <Phone />
      <Payment />
    </View>
  );
}
