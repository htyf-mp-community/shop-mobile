import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Dimensions } from "react-native";
import Button from "../components/Button/Button";
import { Colors } from "../constants/styles";

const { width } = Dimensions.get("screen");

interface IPurchaseProps {
  cart: any[];
}

export default function Purchase({ cart }: IPurchaseProps) {
  const navigation = useNavigation<any>();
  const totalPrice =
    cart.length > 1
      ? cart
          .map(({ price }) => Number(price))
          .reduce((a, b) => a + b)
          .toFixed(2)
      : cart.map(({ price }) => price)[0];

  function PurchaseProduct() {
    navigation.navigate("Checkout", { cart, total: totalPrice });
  }

  return (
    <View style={{ width, alignItems: "center", padding: 10, bottom: 5 }}>
      <Button
        text={"Check out, total: $" + totalPrice}
        callback={PurchaseProduct}
        style={{
          backgroundColor: Colors.secondary,
          color: Colors.text,
          width: width * 0.9,
        }}
      />
    </View>
  );
}
