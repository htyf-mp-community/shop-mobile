import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Dimensions } from "react-native";
import Button from "../../components/Button/Button";
import { Colors } from "../../constants/styles";
import { CalcTotalCartPrice } from "../../functions/CalcTotalCartPrice";

const { width } = Dimensions.get("screen");

interface IPurchaseProps {
  cart: any[];
}

export default function Purchase({ cart }: IPurchaseProps) {
  const navigation = useNavigation<any>();
  const totalPrice = CalcTotalCartPrice(cart);

  function PurchaseProduct() {
    navigation.navigate("Checkout", { cart, total: totalPrice });
  }

  return (
    <View style={{ width, alignItems: "center", padding: 10, bottom: 5 }}>
      <Button
        disabled={cart.length === 0}
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
