import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Dimensions } from "react-native";
import Button from "../components/Button/Button";

const { width } = Dimensions.get("screen");

interface IPurchaseProps {
  cart: any[];
}

export default function Purchase({ cart }: IPurchaseProps) {
  const navigation = useNavigation<any>();
  const ids = cart.map(({ prod_id, ammount }) => ({ prod_id, ammount }));
  const totalPrice =
    cart.length > 1
      ? cart
          .map(({ price }) => Number(price))
          .reduce((a, b) => a + b)
          .toFixed(2)
      : cart.map(({ price }) => price)[0];

  function PurchaseProduct() {
    navigation.navigate("Checkout", { cart: ids });
  }

  return (
    <View style={{ width, alignItems: "center", padding: 10, bottom: 90 }}>
      <Button
        text={"Check out, total: $" + totalPrice}
        callback={PurchaseProduct}
        style={{ backgroundColor: "green", color: "white", width: width * 0.9 }}
      />
    </View>
  );
}
